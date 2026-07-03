import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

const DEBOUNCE_MS = 450;
const CLOCK_SKEW_MS = 1000;

let databaseRef = null;
let pushTimer = null;
let applyingRemote = false;
let statusHandler = null;
let hydrated = false;
let lastRemoteState = null;
let queuedLocalState = null;

function normalizeTimestamp(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function checkedCountFrom(payload) {
  if (!payload || !payload.checked || typeof payload.checked !== "object") return 0;
  return Object.values(payload.checked).filter(Boolean).length;
}

function optionIntentCountFrom(payload) {
  if (!payload || typeof payload !== "object") return 0;
  let count = 0;
  if (payload.hideDone === false) count += 1;
  if (payload.controlsVisible === true) count += 1;
  if (Array.isArray(payload.openSections) && payload.openSections.length > 1) count += 1;
  if (payload.expanded && typeof payload.expanded === "object" && Object.values(payload.expanded).some(Boolean)) count += 1;
  return count;
}

function hasUsefulState(payload) {
  return checkedCountFrom(payload) > 0 || optionIntentCountFrom(payload) > 0;
}

function normalizeState(state = {}) {
  return {
    version: Number(state.version || 0),
    updatedAt: normalizeTimestamp(state.updatedAt || Date.now()),
    checked: state.checked && typeof state.checked === "object" ? state.checked : {},
    filter: typeof state.filter === "string" ? state.filter : "all",
    query: typeof state.query === "string" ? state.query : "",
    hideDone: state.hideDone !== false,
    openSections: Array.isArray(state.openSections) ? state.openSections : [],
    expanded: state.expanded && typeof state.expanded === "object" ? state.expanded : {},
    controlsVisible: state.controlsVisible === true,
    forceResetAt: normalizeTimestamp(state.forceResetAt || 0)
  };
}

function stableComparable(state) {
  const clean = normalizeState(state);
  delete clean.updatedAt;
  return JSON.stringify(clean);
}

function isExplicitNewerReset(local, remote) {
  return normalizeTimestamp(local.forceResetAt) > normalizeTimestamp(remote?.forceResetAt || 0);
}

function localShouldReplaceRemote(local, remote, options = {}) {
  const localState = normalizeState(local);
  const remoteState = remote ? normalizeState(remote) : null;

  if (!remoteState) return hasUsefulState(localState) || options.forceReset === true;
  if (options.forceReset === true || isExplicitNewerReset(localState, remoteState)) return true;

  if (!hasUsefulState(localState)) return false;

  const localTime = normalizeTimestamp(localState.updatedAt);
  const remoteTime = normalizeTimestamp(remoteState.updatedAt);

  return localTime > remoteTime + CLOCK_SKEW_MS;
}

function emit(status, label) {
  if (typeof statusHandler === "function") statusHandler(status, label);
}

function writeState(payload, options = {}) {
  if (!databaseRef) return;

  const finalPayload = normalizeState({
    ...payload,
    updatedAt: Date.now()
  });

  const remoteCount = checkedCountFrom(lastRemoteState);
  const localCount = checkedCountFrom(finalPayload);
  const forceReset = options.forceReset === true || isExplicitNewerReset(finalPayload, lastRemoteState);

  if (!forceReset && remoteCount > 0 && localCount === 0) {
    emit("synced", "Nuvem preservada");
    console.warn("[Checklist Cloud] Escrita vazia bloqueada para preservar progresso remoto.");
    return;
  }

  if (lastRemoteState && stableComparable(lastRemoteState) === stableComparable(finalPayload)) {
    emit("synced", "Nuvem ativa");
    return;
  }

  set(databaseRef, finalPayload)
    .then(() => emit("synced", "Nuvem ativa"))
    .catch(error => {
      emit("error", "Falha");
      console.warn("[Checklist Cloud] Falha ao salvar no RTDB:", error);
    });
}

async function initCloudSync({ getLocalState, applyRemoteState, pushIfRemoteEmpty, onStatus } = {}) {
  statusHandler = onStatus;

  try {
    if (!window.FIREBASE_CONFIG || !window.CHECKLIST_CLOUD_PATH) {
      emit("local", "Local");
      console.warn("[Checklist Cloud] Firebase config ausente.");
      return false;
    }

    const app = initializeApp(window.FIREBASE_CONFIG);
    const db = getDatabase(app);
    databaseRef = ref(db, window.CHECKLIST_CLOUD_PATH);

    emit("connecting", "Conectando");

    onValue(databaseRef, snapshot => {
      const rawRemote = snapshot.val();
      const remote = rawRemote ? normalizeState(rawRemote) : null;
      const local = normalizeState(typeof getLocalState === "function" ? getLocalState() : {});

      hydrated = true;
      lastRemoteState = remote;

      if (!remote) {
        if (localShouldReplaceRemote(queuedLocalState || local, null, queuedLocalState?.options || {})) {
          emit("empty", "Criando nuvem");
          writeState((queuedLocalState && queuedLocalState.payload) || local, (queuedLocalState && queuedLocalState.options) || {});
        } else if (typeof pushIfRemoteEmpty === "function") {
          pushIfRemoteEmpty();
        } else {
          emit("synced", "Nuvem pronta");
        }
        queuedLocalState = null;
        return;
      }

      if (queuedLocalState && localShouldReplaceRemote(queuedLocalState.payload, remote, queuedLocalState.options)) {
        emit("syncing", "Enviando local");
        writeState(queuedLocalState.payload, queuedLocalState.options);
        queuedLocalState = null;
        return;
      }

      if (localShouldReplaceRemote(local, remote)) {
        emit("syncing", "Enviando local");
        writeState(local, {});
        return;
      }

      queuedLocalState = null;
      applyingRemote = true;
      if (typeof applyRemoteState === "function") applyRemoteState(remote);
      applyingRemote = false;
      emit("synced", "Nuvem ativa");
    }, error => {
      emit("error", "Falha");
      console.warn("[Checklist Cloud] Falha ao ouvir RTDB:", error);
    });

    return true;
  } catch (error) {
    emit("error", "Falha");
    console.warn("[Checklist Cloud] Falha ao inicializar:", error);
    return false;
  }
}

function pushCloudState(state, options = {}) {
  if (!databaseRef || applyingRemote) return;

  const payload = normalizeState({
    ...state,
    updatedAt: normalizeTimestamp(state.updatedAt) || Date.now()
  });

  window.clearTimeout(pushTimer);

  if (!hydrated) {
    queuedLocalState = { payload, options };
    emit("connecting", "Aguardando nuvem");
    return;
  }

  pushTimer = window.setTimeout(() => {
    if (localShouldReplaceRemote(payload, lastRemoteState, options)) {
      writeState(payload, options);
    } else {
      emit("synced", "Nuvem ativa");
    }
  }, options.immediate ? 0 : DEBOUNCE_MS);
}

window.ChecklistCloud = {
  init: initCloudSync,
  push: pushCloudState
};

window.dispatchEvent(new CustomEvent("checklist-cloud-ready"));

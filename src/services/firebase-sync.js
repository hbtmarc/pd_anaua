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

function emit(status, label) {
  if (typeof statusHandler === "function") statusHandler(status, label);
}

function shouldBlockEmptyOverwrite(payload, options = {}) {
  const remoteCount = checkedCountFrom(lastRemoteState);
  const localCount = checkedCountFrom(payload);
  const forceReset = options.forceReset === true || isExplicitNewerReset(payload, lastRemoteState);
  return !forceReset && remoteCount > 0 && localCount === 0;
}

function writeState(payload, options = {}) {
  if (!databaseRef) return;

  const finalPayload = normalizeState({
    ...payload,
    updatedAt: Date.now()
  });

  if (shouldBlockEmptyOverwrite(finalPayload, options)) {
    emit("synced", "Nuvem preservada");
    console.warn("[Checklist Cloud] Escrita vazia bloqueada para preservar progresso remoto.");
    return;
  }

  if (lastRemoteState && stableComparable(lastRemoteState) === stableComparable(finalPayload)) {
    emit("synced", "Nuvem ativa");
    return;
  }

  set(databaseRef, finalPayload)
    .then(() => {
      lastRemoteState = finalPayload;
      emit("synced", "Nuvem ativa");
    })
    .catch(error => {
      emit("error", "Falha");
      console.warn("[Checklist Cloud] Falha ao salvar no RTDB:", error);
    });
}

function localIsNewerThanRemote(local, remote) {
  if (!remote) return hasUsefulState(local);
  const localReset = normalizeTimestamp(local.forceResetAt);
  const remoteReset = normalizeTimestamp(remote.forceResetAt);
  if (localReset > remoteReset) return true;
  if (remoteReset > localReset) return false;
  return hasUsefulState(local) && normalizeTimestamp(local.updatedAt) > normalizeTimestamp(remote.updatedAt) + CLOCK_SKEW_MS;
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
      const remote = snapshot.val() ? normalizeState(snapshot.val()) : null;
      const local = normalizeState(typeof getLocalState === "function" ? getLocalState() : {});

      hydrated = true;
      lastRemoteState = remote;

      if (queuedLocalState) {
        if (queuedLocalState.options?.forceReset || localIsNewerThanRemote(queuedLocalState.payload, remote)) {
          emit("syncing", "Enviando local");
          const queued = queuedLocalState;
          queuedLocalState = null;
          writeState(queued.payload, queued.options);
          return;
        }
        queuedLocalState = null;
      }

      if (!remote) {
        if (hasUsefulState(local)) {
          emit("empty", "Criando nuvem");
          writeState(local, {});
        } else if (typeof pushIfRemoteEmpty === "function") {
          pushIfRemoteEmpty();
        } else {
          emit("synced", "Nuvem pronta");
        }
        return;
      }

      if (localIsNewerThanRemote(local, remote)) {
        emit("syncing", "Enviando local");
        writeState(local, {});
        return;
      }

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

  const delay = options.immediate ? 0 : DEBOUNCE_MS;
  pushTimer = window.setTimeout(() => writeState(payload, options), delay);
}

window.ChecklistCloud = {
  init: initCloudSync,
  push: pushCloudState
};

window.dispatchEvent(new CustomEvent("checklist-cloud-ready"));

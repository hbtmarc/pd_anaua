import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

const DEBOUNCE_MS = 450;

let databaseRef = null;
let pushTimer = null;
let applyingRemote = false;
let statusHandler = null;
let hasRemoteSnapshot = false;
let lastRemoteState = null;
let pendingBeforeHydration = null;

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

function emit(status, label) {
  if (typeof statusHandler === "function") statusHandler(status, label);
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
      const local = normalizeState(typeof getLocalState === "function" ? getLocalState() : {});
      hasRemoteSnapshot = true;

      if (!rawRemote) {
        lastRemoteState = null;
        if (hasUsefulState(local)) {
          emit("empty", "Criando nuvem");
          if (typeof pushIfRemoteEmpty === "function") pushIfRemoteEmpty();
        } else if (pendingBeforeHydration && hasUsefulState(pendingBeforeHydration.state)) {
          emit("empty", "Criando nuvem");
          pushCloudState(pendingBeforeHydration.state, { immediate: true, forceReset: false });
        } else {
          emit("synced", "Nuvem pronta");
        }
        pendingBeforeHydration = null;
        return;
      }

      const remote = normalizeState(rawRemote);
      lastRemoteState = remote;
      pendingBeforeHydration = null;

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

  if (!hasRemoteSnapshot) {
    pendingBeforeHydration = { state: payload, options };
    emit("connecting", "Aguardando nuvem");
    return;
  }

  const remoteCount = checkedCountFrom(lastRemoteState);
  const localCount = checkedCountFrom(payload);
  const forceReset = options.forceReset === true || normalizeTimestamp(payload.forceResetAt) > 0;

  if (!forceReset && remoteCount > 0 && localCount === 0) {
    emit("synced", "Nuvem preservada");
    console.warn("[Checklist Cloud] Escrita vazia bloqueada para preservar progresso remoto.");
    return;
  }

  if (lastRemoteState && stableComparable(lastRemoteState) === stableComparable(payload)) {
    emit("synced", "Nuvem ativa");
    return;
  }

  window.clearTimeout(pushTimer);

  const write = () => {
    const finalPayload = normalizeState({
      ...payload,
      updatedAt: Date.now()
    });

    set(databaseRef, finalPayload)
      .then(() => emit("synced", "Nuvem ativa"))
      .catch(error => {
        emit("error", "Falha");
        console.warn("[Checklist Cloud] Falha ao salvar no RTDB:", error);
      });
  };

  if (options.immediate) write();
  else pushTimer = window.setTimeout(write, DEBOUNCE_MS);
}

window.ChecklistCloud = {
  init: initCloudSync,
  push: pushCloudState
};

window.dispatchEvent(new CustomEvent("checklist-cloud-ready"));

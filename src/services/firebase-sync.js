import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

const DEBOUNCE_MS = 450;

let databaseRef = null;
let pushTimer = null;
let applyingRemote = false;
let statusHandler = null;

function normalizeTimestamp(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
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
    controlsVisible: state.controlsVisible === true
  };
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
      const remote = snapshot.val();
      const local = normalizeState(typeof getLocalState === "function" ? getLocalState() : {});

      if (!remote) {
        emit("empty", "Criando nuvem");
        if (typeof pushIfRemoteEmpty === "function") pushIfRemoteEmpty();
        return;
      }

      const normalizedRemote = normalizeState(remote);
      const remoteTime = normalizeTimestamp(normalizedRemote.updatedAt);
      const localTime = normalizeTimestamp(local.updatedAt);

      if (remoteTime > localTime) {
        applyingRemote = true;
        if (typeof applyRemoteState === "function") applyRemoteState(normalizedRemote);
        applyingRemote = false;
        emit("synced", "Nuvem ativa");
        return;
      }

      if (localTime > remoteTime + 1000) {
        pushCloudState(local, { immediate: true });
        return;
      }

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

  window.clearTimeout(pushTimer);

  const write = () => {
    const payload = normalizeState({
      ...state,
      updatedAt: normalizeTimestamp(state.updatedAt) || Date.now()
    });

    set(databaseRef, payload)
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

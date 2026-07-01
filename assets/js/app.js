/**
 * Anauá — Assistente de Campo Offline
 * Navegação, painel agora, shots acionáveis, contingências, relatório e PWA.
 */
(function () {
  "use strict";

  var PLAN = window.ANAUA_PLAN || {};
  var STORAGE_KEY = "anaua-pd-checklist";
  var FIELD_KEY = "anaua-field-state-v1";
  var FOCUS_KEY = "anaua-focus-mode";
  var currentBlockId = "";
  var currentQuestionIndex = -1;
  var currentShotFilter = "all";

  function $(id) {
    return document.getElementById(id);
  }

  function loadFieldState() {
    try {
      return JSON.parse(localStorage.getItem(FIELD_KEY)) || { shots: {}, checklist: {} };
    } catch (_err) {
      return { shots: {}, checklist: {} };
    }
  }

  function saveFieldState(state) {
    try {
      localStorage.setItem(FIELD_KEY, JSON.stringify(state));
    } catch (_err) {
      /* localStorage unavailable */
    }
  }

  function getShotState(shotId) {
    var state = loadFieldState();
    return state.shots[shotId] || { status: "pendente", note: "" };
  }

  function setShotStatus(shotId, status) {
    var state = loadFieldState();
    state.shots[shotId] = state.shots[shotId] || { status: "pendente", note: "" };
    state.shots[shotId].status = status;
    saveFieldState(state);
    renderAssistant();
  }

  function setShotNote(shotId, note) {
    var state = loadFieldState();
    state.shots[shotId] = state.shots[shotId] || { status: "pendente", note: "" };
    state.shots[shotId].note = note.slice(0, 180);
    saveFieldState(state);
  }

  function getBlockById(id) {
    return (PLAN.blocosOperacionais || []).find(function (block) {
      return block.id === id;
    }) || (PLAN.blocosOperacionais || [])[0];
  }

  function statusLabel(status) {
    return {
      pendente: "Pendente",
      feito: "Feito",
      repetir: "Revisar",
      descartado: "Cortar"
    }[status] || status;
  }

  function shotStatusLabel(status) {
    return {
      pendente: "Pendente",
      feito: "Captado",
      repetir: "Refazer",
      descartado: "Cortar"
    }[status] || status;
  }

  function blockShortTitle(title) {
    return title
      .replace("Sábado · ", "")
      .replace("Domingo · ", "")
      .replace("Sexta · ", "")
      .replace(" / ", " / ");
  }

  function getLikelyBlock() {
    var now = new Date();
    var blocks = PLAN.blocosOperacionais || [];
    var match = blocks.find(function (block) {
      if (!block.inicio || !block.fim) return false;
      return now >= new Date(block.inicio) && now <= new Date(block.fim);
    });
    return match || getBlockById("preparacao");
  }

  function getBlockShots(block) {
    var related = block && block.shotsRelacionados ? block.shotsRelacionados : [];
    return (PLAN.shots || []).filter(function (shot) {
      return related.indexOf(shot.id) !== -1;
    });
  }

  function computeProgress() {
    var shots = PLAN.shots || [];
    var captured = 0;
    var repeat = 0;
    var capturedA = 0;
    var totalA = 0;

    shots.forEach(function (shot) {
      var status = getShotState(shot.id).status;
      if (status === "feito") captured++;
      if (status === "repetir") repeat++;
      if (shot.prioridade === "A") {
        totalA++;
        if (status === "feito" || status === "descartado") capturedA++;
      }
    });

    return {
      total: shots.length,
      captured: captured,
      repeat: repeat,
      generalPercent: shots.length ? Math.round((captured / shots.length) * 100) : 0,
      priorityPercent: totalA ? Math.round((capturedA / totalA) * 100) : 0
    };
  }

  function hasPendingPriorityA(block) {
    return getBlockShots(block).some(function (shot) {
      return shot.prioridade === "A" && getShotState(shot.id).status === "pendente";
    });
  }

  function initNavigation() {
    var toggle = $("nav-toggle");
    var nav = $("nav-principal");
    if (!toggle || !nav) return;

    function setOpen(isOpen) {
      toggle.setAttribute("aria-expanded", String(isOpen));
      nav.classList.toggle("is-open", isOpen);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) setOpen(false);
    });
  }

  function initScrollProgress() {
    var bar = $("scroll-progress-bar");
    if (!bar) return;
    var ticking = false;
    function update() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + "%";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  function initLegacyChecklist() {
    var fieldset = $("checklist-fieldset");
    var progressEl = $("checklist-progress");
    var clearBtn = $("checklist-clear");
    if (!fieldset) return;
    var checkboxes = fieldset.querySelectorAll('input[type="checkbox"]');

    function loadState() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      } catch (_err) {
        return {};
      }
    }

    function saveState(state) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (_err) {}
    }

    function updateItemVisual(checkbox) {
      var label = checkbox.closest(".checklist__item");
      if (label) label.classList.toggle("is-complete", checkbox.checked);
    }

    function updateProgress() {
      if (!progressEl) return;
      var done = 0;
      checkboxes.forEach(function (cb) {
        if (cb.checked) done++;
      });
      var percent = checkboxes.length ? Math.round((done / checkboxes.length) * 100) : 0;
      progressEl.textContent = done + " de " + checkboxes.length + " concluídos · " + percent + "%";
    }

    function applyState() {
      var state = loadState();
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = Boolean(state[checkbox.value]);
        updateItemVisual(checkbox);
      });
      updateProgress();
    }

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        var state = loadState();
        state[checkbox.value] = checkbox.checked;
        saveState(state);
        updateItemVisual(checkbox);
        updateProgress();
      });
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        if (!window.confirm("Limpar todos os itens do checklist?")) return;
        saveState({});
        checkboxes.forEach(function (checkbox) {
          checkbox.checked = false;
          updateItemVisual(checkbox);
        });
        updateProgress();
      });
    }
    applyState();
  }

  function renderNow(block) {
    $("now-block-title").textContent = block.titulo;
    $("now-block-window").textContent = block.janela;
    $("now-next-step").textContent = block.proximoPasso;
    $("now-priority").textContent = block.prioridade;
    $("now-capture-first").textContent = block.captarPrimeiro;
    $("now-cut").textContent = block.cortarSeApertar;
    $("now-risk").textContent = (block.riscos || []).join("; ");
  }

  function renderProgress(block) {
    var progress = computeProgress();
    $("progress-general").textContent = progress.generalPercent + "%";
    $("progress-a").textContent = progress.priorityPercent + "%";
    $("progress-captured").textContent = String(progress.captured);
    $("progress-repeat").textContent = String(progress.repeat);
    $("priority-alert").hidden = !hasPendingPriorityA(block);
  }

  function renderBlockFilter(block) {
    var select = $("block-filter");
    if (!select || select.options.length) return;
    (PLAN.blocosOperacionais || []).forEach(function (item) {
      var option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.titulo;
      select.appendChild(option);
    });
    select.addEventListener("change", function () {
      currentBlockId = select.value;
      renderAssistant();
    });
    select.value = block.id;
  }

  function renderBlockSwitcher(activeBlock) {
    var root = $("block-switcher");
    if (!root || root.children.length) return;
    (PLAN.blocosOperacionais || []).forEach(function (item) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "block-option";
      button.setAttribute("data-block-id", item.id);
      button.innerHTML =
        '<span class="block-option__meta">' + item.prioridade + '</span>' +
        '<strong>' + blockShortTitle(item.titulo) + '</strong>' +
        '<small>' + item.janela + '</small>';
      button.addEventListener("click", function () {
        currentBlockId = item.id;
        renderAssistant();
      });
      root.appendChild(button);
    });
    updateBlockSwitcher(activeBlock);
  }

  function updateBlockSwitcher(activeBlock) {
    document.querySelectorAll("[data-block-id]").forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-block-id") === activeBlock.id);
    });
  }

  function checklistItemsForBlock(block) {
    return [
      ["captar", "Captar primeiro: " + block.captarPrimeiro],
      ["nao-sair", "Não sair sem: " + (block.naoSairSem || []).join(", ")],
      ["equip", "Kit/equipamento: " + (block.equipamentos || []).join(", ")],
      ["risco", "Controlar risco: " + (block.riscos || []).join(", ")],
      ["backup", block.id === "preparacao" ? "Preparar mídia e espaço antes de sair" : "Marcar notas rápidas e preservar mídia"]
    ];
  }

  function renderOperationalChecklist(block) {
    var root = $("operational-checklist");
    if (!root) return;
    var state = loadFieldState();
    root.innerHTML = "";
    checklistItemsForBlock(block).forEach(function (item) {
      var key = block.id + ":" + item[0];
      var status = state.checklist[key] || "pendente";
      var row = document.createElement("article");
      row.className = "op-check op-check--" + status;
      row.innerHTML =
        '<div class="op-check__copy"><span>' + statusLabel(status) + '</span><p>' + item[1] + '</p></div>' +
        '<div class="segmented" role="group" aria-label="Status do checklist"></div>';
      var group = row.querySelector(".segmented");
      ["pendente", "feito", "repetir", "descartado"].forEach(function (option) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = statusLabel(option);
        btn.className = status === option ? "is-active" : "";
        btn.addEventListener("click", function () {
          var next = loadFieldState();
          next.checklist[key] = option;
          saveFieldState(next);
          renderAssistant();
        });
        group.appendChild(btn);
      });
      root.appendChild(row);
    });
  }

  function shotPassesFilter(shot) {
    var status = getShotState(shot.id).status;
    if (currentShotFilter === "all") return true;
    if (currentShotFilter === "A") return shot.prioridade === "A";
    return status === currentShotFilter;
  }

  function renderShots(block) {
    var root = $("action-shot-list");
    if (!root) return;
    root.innerHTML = "";
    getBlockShots(block).filter(shotPassesFilter).forEach(function (shot) {
      var shotState = getShotState(shot.id);
      var card = document.createElement("article");
      card.className = "action-shot action-shot--" + shotState.status;
      card.innerHTML =
        '<div class="action-shot__head"><span>' + shot.id + '</span><div><strong>' + shot.nome + '</strong><small>Prioridade ' + shot.prioridade + ' · ' + shot.formato + '</small></div></div>' +
        '<p>' + shot.funcao + ' ' + shot.execucao + '</p>' +
        '<p class="action-shot__risk"><strong>Risco:</strong> ' + shot.risco + '</p>' +
        '<p class="action-shot__reels">Ajuda nos Reels: ' + shot.reelsRelacionados.join(", ") + '</p>' +
        '<div class="shot-actions"></div>' +
        '<label class="shot-note">Nota de campo <textarea maxlength="180" rows="2" placeholder="Ex.: áudio ruim, refazer com menos vento, usar como capa...">' + (shotState.note || "") + '</textarea></label>';
      var actions = card.querySelector(".shot-actions");
      [
        "feito",
        "repetir",
        "descartado",
        "pendente"
      ].forEach(function (statusOption) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = shotStatusLabel(statusOption);
        btn.className = shotState.status === statusOption ? "is-active" : "";
        btn.addEventListener("click", function () {
          setShotStatus(shot.id, statusOption);
        });
        actions.appendChild(btn);
      });
      card.querySelector("textarea").addEventListener("input", function (event) {
        setShotNote(shot.id, event.target.value);
      });
      root.appendChild(card);
    });
    if (!root.children.length) {
      root.innerHTML = '<p class="empty-state">Nenhum shot neste filtro.</p>';
    }
  }

  function renderContingencies() {
    var buttons = $("contingency-buttons");
    var result = $("contingency-result");
    if (!buttons || buttons.children.length) return;
    (PLAN.contingencias || []).forEach(function (item) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.innerHTML = '<strong>' + item.rotulo + '</strong><span>' + item.resposta.split(".")[0] + '.</span>';
      btn.addEventListener("click", function () {
        result.innerHTML =
          '<h4>' + item.rotulo + '</h4>' +
          '<p><strong>Resposta:</strong> ' + item.resposta + '</p>' +
          '<p><strong>Proteger:</strong> ' + item.proteger + '</p>' +
          '<p><strong>Cortar:</strong> ' + item.cortar + '</p>' +
          '<p><strong>Equipamento mínimo:</strong> ' + item.equipamentoMinimo + '</p>' +
          '<p><strong>Evitar:</strong> ' + item.risco + '</p>';
      });
      buttons.appendChild(btn);
    });
  }

  function showQuestion(index) {
    var questions = PLAN.perguntasDepoimento || [];
    if (!questions.length) return;
    currentQuestionIndex = (index + questions.length) % questions.length;
    $("question-display").textContent = questions[currentQuestionIndex].pergunta;
  }

  function renderQuestions() {
    var root = $("question-buttons");
    if (!root || root.children.length) return;
    (PLAN.perguntasDepoimento || []).forEach(function (item, index) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.innerHTML = '<strong>' + item.rotulo + '</strong><span>' + item.pergunta + '</span>';
      btn.addEventListener("click", function () {
        showQuestion(index);
      });
      root.appendChild(btn);
    });
    $("next-question").addEventListener("click", function () {
      showQuestion(currentQuestionIndex + 1);
    });
  }

  function generateReport() {
    var block = getBlockById(currentBlockId);
    var progress = computeProgress();
    var state = loadFieldState();
    var pendingA = (PLAN.shots || []).filter(function (shot) {
      return shot.prioridade === "A" && getShotState(shot.id).status === "pendente";
    });
    var repeat = (PLAN.shots || []).filter(function (shot) {
      return getShotState(shot.id).status === "repetir";
    });
    var notes = (PLAN.shots || []).filter(function (shot) {
      return getShotState(shot.id).note;
    });
    var checklistPending = checklistItemsForBlock(block).filter(function (item) {
      return (state.checklist[block.id + ":" + item[0]] || "pendente") === "pendente";
    });
    var backup = getShotState("26").status === "feito" ? "Foleys/controle marcados como captados" : "Verificar foleys, mídia e backup antes de sair";

    return [
      "Resumo de campo — Anauá",
      "Gerado em: " + new Date().toLocaleString("pt-BR"),
      "Bloco atual: " + block.titulo + " (" + block.janela + ")",
      "Progresso geral: " + progress.generalPercent + "% · Prioridade A: " + progress.priorityPercent + "%",
      "Shots captados: " + progress.captured + " · Repetir: " + progress.repeat,
      "Shots A pendentes: " + (pendingA.length ? pendingA.map(function (s) { return s.id + " " + s.nome; }).join("; ") : "nenhum"),
      "Shots a repetir: " + (repeat.length ? repeat.map(function (s) { return s.id + " " + s.nome; }).join("; ") : "nenhum"),
      "Notas: " + (notes.length ? notes.map(function (s) { return s.id + " " + s.nome + ": " + getShotState(s.id).note; }).join(" | ") : "nenhuma"),
      "Checklist pendente do bloco: " + (checklistPending.length ? checklistPending.map(function (i) { return i[1]; }).join(" | ") : "nenhum"),
      "Status backup: " + backup,
      "Próxima ação sugerida: " + block.proximoPasso
    ].join("\n");
  }

  function initReport() {
    var output = $("report-output");
    var shareBtn = $("share-report");
    var status = $("share-status");
    $("generate-report").addEventListener("click", function () {
      output.value = generateReport();
    });
    $("copy-report").addEventListener("click", function () {
      if (!output.value) output.value = generateReport();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(output.value).then(function () {
          status.textContent = "Resumo copiado.";
        }).catch(function () {
          output.focus();
          output.select();
          status.textContent = "Selecione e copie o texto.";
        });
      } else {
        output.focus();
        output.select();
        status.textContent = "Selecione e copie o texto.";
      }
    });
    if (!navigator.share) {
      shareBtn.disabled = true;
      status.textContent = "Compartilhamento nativo indisponível neste navegador.";
    }
    shareBtn.addEventListener("click", function () {
      if (!navigator.share) return;
      if (!output.value) output.value = generateReport();
      navigator.share({ title: "Resumo de campo Anauá", text: output.value }).catch(function () {});
    });
  }

  function initFocusMode() {
    var btn = $("focus-mode-toggle");
    if (!btn) return;
    function apply(isOn) {
      document.body.classList.toggle("is-focus-mode", isOn);
      btn.setAttribute("aria-pressed", String(isOn));
      btn.textContent = isOn ? "Sair do Foco" : "Modo Foco";
      try {
        localStorage.setItem(FOCUS_KEY, isOn ? "1" : "0");
      } catch (_err) {}
    }
    apply(localStorage.getItem(FOCUS_KEY) === "1");
    btn.addEventListener("click", function () {
      apply(!document.body.classList.contains("is-focus-mode"));
    });
  }

  function initShotFilters() {
    document.querySelectorAll("[data-shot-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentShotFilter = btn.getAttribute("data-shot-filter");
        document.querySelectorAll("[data-shot-filter]").forEach(function (item) {
          item.classList.toggle("is-active", item === btn);
        });
        renderAssistant();
      });
    });
  }

  function renderAssistant() {
    if (!PLAN.blocosOperacionais) return;
    var likely = getLikelyBlock();
    if (!currentBlockId) currentBlockId = likely.id;
    var block = getBlockById(currentBlockId);
    var select = $("block-filter");
    if (select) select.value = block.id;
    updateBlockSwitcher(block);
    renderNow(block);
    renderProgress(block);
    renderOperationalChecklist(block);
    renderShots(block);
  }

  function initAssistant() {
    if (!$("agora") || !PLAN.blocosOperacionais) return;
    var likely = getLikelyBlock();
    currentBlockId = likely.id;
    renderBlockFilter(likely);
    renderBlockSwitcher(likely);
    initShotFilters();
    renderContingencies();
    renderQuestions();
    initReport();
    initFocusMode();
    renderAssistant();
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("service-worker.js").catch(function () {});
    });
  }

  function init() {
    initNavigation();
    initScrollProgress();
    initLegacyChecklist();
    initAssistant();
    registerServiceWorker();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

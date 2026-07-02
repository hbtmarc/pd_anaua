/**
 * AnauÃ¡ â€” Assistente de Campo Offline
 * NavegaÃ§Ã£o, painel agora, shots acionÃ¡veis, contingÃªncias, relatÃ³rio e PWA.
 */
(function () {
  "use strict";

  var PLAN = window.ANAUA_PLAN || {};
  var STORAGE_KEY = "anaua-pd-checklist";
  var FIELD_KEY = "anaua-field-state-v1";
  var FOCUS_KEY = "anaua-focus-mode";
  var VIEW_KEY = "anaua-active-view";
  var BLOCK_KEY = "anaua-current-block";
  var SHOT_FILTER_KEY = "anaua-shot-filter";
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

  function savePreference(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (_err) {}
  }

  function loadPreference(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (_err) {
      return fallback;
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

  function setCurrentBlock(blockId) {
    currentBlockId = blockId;
    savePreference(BLOCK_KEY, currentBlockId);
    renderAssistant();
  }

  function moveBlock(delta) {
    var blocks = PLAN.blocosOperacionais || [];
    if (!blocks.length) return;
    var index = blocks.findIndex(function (block) {
      return block.id === currentBlockId;
    });
    if (index < 0) index = 0;
    var next = (index + delta + blocks.length) % blocks.length;
    setCurrentBlock(blocks[next].id);
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
      .replace("SÃ¡bado Â· ", "")
      .replace("Domingo Â· ", "")
      .replace("Sexta Â· ", "")
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

  function computeBlockChecklistProgress(block) {
    var state = loadFieldState();
    var items = checklistItemsForBlock(block);
    var done = items.filter(function (item) {
      var status = state.checklist[block.id + ":" + item[0]] || "pendente";
      return status === "feito" || status === "descartado";
    }).length;
    return {
      done: done,
      total: items.length,
      percent: items.length ? Math.round((done / items.length) * 100) : 0
    };
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
      progressEl.textContent = done + " de " + checkboxes.length + " conclu\u00eddos \u00b7 " + percent + "%";
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
    if ($("side-block-title")) $("side-block-title").textContent = blockShortTitle(block.titulo);
    if ($("side-block-window")) $("side-block-window").textContent = block.janela;
    if ($("side-next-step")) $("side-next-step").textContent = block.proximoPasso;
  }

  function renderProgress(block) {
    var progress = computeProgress();
    $("progress-general").textContent = progress.generalPercent + "%";
    $("progress-a").textContent = progress.priorityPercent + "%";
    $("progress-captured").textContent = String(progress.captured);
    $("progress-repeat").textContent = String(progress.repeat);
    $("priority-alert").hidden = !hasPendingPriorityA(block);
    if ($("side-progress-general")) $("side-progress-general").textContent = progress.generalPercent + "%";
    if ($("side-progress-a")) $("side-progress-a").textContent = progress.priorityPercent + "%";
    if ($("side-captured")) $("side-captured").textContent = String(progress.captured);
    if ($("side-repeat")) $("side-repeat").textContent = String(progress.repeat);
    if ($("side-alert")) {
      $("side-alert").textContent = hasPendingPriorityA(block)
        ? "Prioridade A pendente neste bloco. Resolver antes de sair."
        : "Sem alerta cr\u00edtico neste bloco.";
    }
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
      setCurrentBlock(select.value);
    });
    select.value = block.id;
    if ($("block-prev")) {
      $("block-prev").addEventListener("click", function () {
        moveBlock(-1);
      });
    }
    if ($("block-next")) {
      $("block-next").addEventListener("click", function () {
        moveBlock(1);
      });
    }
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
        '<small>' + item.janela + '</small>' +
        '<em data-block-progress="' + item.id + '">0%</em>';
      button.addEventListener("click", function () {
        setCurrentBlock(item.id);
      });
      root.appendChild(button);
    });
    updateBlockSwitcher(activeBlock);
  }

  function updateBlockSwitcher(activeBlock) {
    document.querySelectorAll("[data-block-id]").forEach(function (button) {
      var id = button.getAttribute("data-block-id");
      var block = getBlockById(id);
      var progress = block ? computeBlockChecklistProgress(block) : { percent: 0 };
      var progressEl = button.querySelector("[data-block-progress]");
      button.classList.toggle("is-active", id === activeBlock.id);
      if (progressEl) progressEl.textContent = progress.percent + "%";
    });
  }

  function renderDayChips(activeBlock) {
    var root = $("block-day-chips");
    if (!root) return;
    var chips = [
      ["preparacao", "Prepara\u00e7\u00e3o"],
      ["sexta-embarques", "Sexta"],
      ["sabado-cafe", "S\u00e1bado"],
      ["domingo-vale", "Domingo"],
      ["retorno", "Retorno"]
    ];
    if (!root.children.length) {
      chips.forEach(function (chip) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "block-day-chip";
        btn.setAttribute("data-day-block", chip[0]);
        btn.textContent = chip[1];
        btn.addEventListener("click", function () {
          setCurrentBlock(chip[0]);
        });
        root.appendChild(btn);
      });
    }
    root.querySelectorAll("[data-day-block]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-day-block") === activeBlock.id);
    });
  }

  function checklistItemsForBlock(block) {
    return [
      ["captar", "Captar primeiro: " + block.captarPrimeiro],
      ["nao-sair", "N\u00e3o sair sem: " + (block.naoSairSem || []).join(", ")],
      ["equip", "Kit/equipamento: " + (block.equipamentos || []).join(", ")],
      ["risco", "Controlar risco: " + (block.riscos || []).join(", ")],
      ["backup", block.id === "preparacao" ? "Preparar m\u00eddia e espa\u00e7o antes de sair" : "Marcar notas r\u00e1pidas e preservar m\u00eddia"]
    ];
  }

  function renderOperationalChecklist(block) {
    var root = $("operational-checklist");
    if (!root) return;
    var state = loadFieldState();
    var progress = computeBlockChecklistProgress(block);
    var progressEl = $("checklist-block-progress");
    var items = checklistItemsForBlock(block).map(function (item) {
      var key = block.id + ":" + item[0];
      return {
        key: key,
        text: item[1],
        status: state.checklist[key] || "pendente"
      };
    });
    var activeItems = items.filter(function (item) {
      return item.status !== "feito" && item.status !== "descartado";
    });
    var doneItems = items.filter(function (item) {
      return item.status === "feito" || item.status === "descartado";
    });

    if (progressEl) {
      progressEl.textContent = progress.done + " de " + progress.total + " resolvidos \u00b7 " + progress.percent + "%";
    }

    function setChecklistStatus(key, option) {
      var next = loadFieldState();
      next.checklist[key] = option;
      saveFieldState(next);
      renderAssistant();
    }

    function renderItem(item) {
      var row = document.createElement("article");
      row.className = "op-check op-check--" + item.status;
      row.innerHTML =
        '<div class="op-check__copy"><span>' + statusLabel(item.status) + '</span><p>' + item.text + '</p></div>' +
        '<div class="op-check__actions">' +
          '<button class="btn-mini btn-mini--primary" type="button" data-check-action="feito">Feito</button>' +
          '<button class="btn-mini btn-mini--muted" type="button" data-check-action="repetir">Revisar</button>' +
          '<button class="btn-mini btn-mini--muted" type="button" data-check-action="descartado">Cortar</button>' +
          '<button class="btn-mini btn-mini--ghost" type="button" data-check-action="pendente">Pendente</button>' +
        '</div>';
      row.querySelectorAll("[data-check-action]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          setChecklistStatus(item.key, btn.getAttribute("data-check-action"));
        });
      });
      return row;
    }

    root.innerHTML = "";
    activeItems.forEach(function (item) {
      root.appendChild(renderItem(item));
    });
    if (doneItems.length) {
      var details = document.createElement("details");
      details.className = "done-group";
      details.innerHTML = '<summary>Conclu\u00eddos (' + doneItems.length + ')</summary>';
      doneItems.forEach(function (item) {
        details.appendChild(renderItem(item));
      });
      root.appendChild(details);
    }
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
      var priorityPending = shot.prioridade === "A" && shotState.status === "pendente";
      var notePreview = shotState.note ? '<p class="shot-note-preview">Nota: ' + shotState.note + '</p>' : "";
      card.className = "action-shot action-shot--" + shotState.status + (priorityPending ? " action-shot--priority-pending" : "");
      card.innerHTML =
        '<div class="shot-card__top">' +
          '<span class="shot-number">' + shot.id + '</span>' +
          '<div class="shot-main"><strong>' + shot.nome + '</strong><small>' + shot.funcao + '</small></div>' +
          '<div class="shot-card__badges">' +
            '<span class="priority-chip priority-chip--' + shot.prioridade.toLowerCase() + '">Prioridade ' + shot.prioridade + '</span>' +
            '<span class="status-chip status-chip--' + shotState.status + '">' + shotStatusLabel(shotState.status) + '</span>' +
          '</div>' +
          '<button class="btn-mini btn-mini--primary shot-primary-action" type="button" data-shot-action="feito">' + (shotState.status === "feito" ? "Captado" : "Marcar captado") + '</button>' +
        '</div>' +
        '<div class="shot-card__meta">' +
          '<span><strong>Reels</strong> ' + shot.reelsRelacionados.join(", ") + '</span>' +
          '<span><strong>Formato</strong> ' + shot.formato + '</span>' +
        '</div>' +
        '<details class="shot-details">' +
          '<summary>Ver execução, risco e nota</summary>' +
          '<div class="shot-details__body">' +
            '<p><strong>Execução:</strong> ' + shot.execucao + '</p>' +
            '<p class="action-shot__risk"><strong>Risco:</strong> ' + shot.risco + '</p>' +
            notePreview +
            '<label class="shot-note">Nota de campo<textarea maxlength="180" rows="2" placeholder="Ex.: \u00e1udio ruim, refazer com menos vento, usar como capa...">' + (shotState.note || "") + '</textarea></label>' +
            '<div class="shot-actions">' +
              '<button type="button" data-shot-action="repetir">Refazer</button>' +
              '<button type="button" data-shot-action="descartado">Cortar</button>' +
              '<button type="button" data-shot-action="pendente">Pendente</button>' +
            '</div>' +
          '</div>' +
        '</details>';
      card.querySelectorAll("[data-shot-action]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          setShotStatus(shot.id, btn.getAttribute("data-shot-action"));
        });
      });
      var textarea = card.querySelector("textarea");
      if (textarea) {
        textarea.addEventListener("input", function (event) {
          setShotNote(shot.id, event.target.value);
        });
      }
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
          '<p><strong>Equipamento m\u00ednimo:</strong> ' + item.equipamentoMinimo + '</p>' +
          '<p><strong>Evitar:</strong> ' + item.risco + '</p>';
      });
      buttons.appendChild(btn);
    });
  }

  function viewForHash() {
    return {
      "#agora": "agora",
      "#checklist-bloco": "checklist",
      "#shots-operacionais": "shots",
      "#contingencia": "emergencia",
      "#relatorio": "relatorio"
    }[window.location.hash] || "";
  }

  function hashForView(view) {
    return {
      agora: "#agora",
      checklist: "#checklist-bloco",
      shots: "#shots-operacionais",
      emergencia: "#contingencia",
      relatorio: "#relatorio"
    }[view] || "#agora";
  }

  function setActiveView(view, options) {
    var valid = ["agora", "checklist", "shots", "emergencia", "relatorio"];
    if (valid.indexOf(view) === -1) view = "agora";
    document.querySelectorAll("[data-view-panel]").forEach(function (panel) {
      panel.classList.toggle("is-active", panel.getAttribute("data-view-panel") === view);
    });
    document.querySelectorAll("[data-view]").forEach(function (control) {
      control.classList.toggle("is-active", control.getAttribute("data-view") === view);
    });
    savePreference(VIEW_KEY, view);
    if (options && options.updateHash && history.replaceState) {
      history.replaceState(null, "", hashForView(view));
    }
  }

  function initFieldViews() {
    document.querySelectorAll("[data-view]").forEach(function (control) {
      control.addEventListener("click", function (event) {
        var view = control.getAttribute("data-view");
        if (!view) return;
        event.preventDefault();
        setActiveView(view, { updateHash: true });
        var field = $("agora");
        if (field && window.innerWidth < 900) {
          field.scrollIntoView({ block: "start" });
        }
      });
    });
    window.addEventListener("hashchange", function () {
      var view = viewForHash();
      if (view) setActiveView(view);
    });
    setActiveView(viewForHash() || loadPreference(VIEW_KEY, "agora"));
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
    var backup = getShotState("26").status === "feito" ? "Foleys/controle marcados como captados" : "Verificar foleys, m\u00eddia e backup antes de sair";
    function listOrNone(items, mapFn) {
      return items.length ? items.map(function (item) {
        return "- " + mapFn(item);
      }).join("\n") : "- Nenhum";
    }

    return [
      "ANAU\u00c1 — RESUMO DE CAMPO",
      "Gerado em: " + new Date().toLocaleString("pt-BR"),
      "",
      "BLOCO ATUAL",
      block.titulo,
      "Janela: " + block.janela,
      "Pr\u00f3xima a\u00e7\u00e3o: " + block.proximoPasso,
      "",
      "PROGRESSO",
      "- Geral: " + progress.generalPercent + "%",
      "- Prioridade A: " + progress.priorityPercent + "%",
      "- Shots captados: " + progress.captured,
      "- Shots para repetir: " + progress.repeat,
      "",
      "PRIORIDADE A PENDENTE",
      listOrNone(pendingA, function (shot) {
        return shot.id + " — " + shot.nome;
      }),
      "",
      "SHOTS A REPETIR",
      listOrNone(repeat, function (shot) {
        return shot.id + " — " + shot.nome;
      }),
      "",
      "NOTAS DE CAMPO",
      listOrNone(notes, function (shot) {
        return shot.id + " — " + shot.nome + ": " + getShotState(shot.id).note;
      }),
      "",
      "CHECKLIST PENDENTE DO BLOCO",
      listOrNone(checklistPending, function (item) {
        return item[1];
      }),
      "",
      "BACKUP / CONTROLE",
      "- " + backup
    ].join("\n");
  }

  function initReport() {
    var output = $("report-output");
    var shareBtn = $("share-report");
    var status = $("share-status");
    output.value = generateReport();
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
      status.textContent = "Compartilhamento nativo indispon\u00edvel neste navegador.";
    }
    shareBtn.addEventListener("click", function () {
      if (!navigator.share) return;
      if (!output.value) output.value = generateReport();
      navigator.share({ title: "Resumo de campo Anau\u00e1", text: output.value }).catch(function () {});
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
    currentShotFilter = loadPreference(SHOT_FILTER_KEY, "all");
    document.querySelectorAll("[data-shot-filter]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-shot-filter") === currentShotFilter);
      btn.addEventListener("click", function () {
        currentShotFilter = btn.getAttribute("data-shot-filter");
        savePreference(SHOT_FILTER_KEY, currentShotFilter);
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
    renderDayChips(block);
    renderNow(block);
    renderProgress(block);
    renderOperationalChecklist(block);
    renderShots(block);
    if ($("report-output")) $("report-output").value = generateReport();
  }

  function initAssistant() {
    if (!$("agora") || !PLAN.blocosOperacionais) return;
    var likely = getLikelyBlock();
    currentBlockId = loadPreference(BLOCK_KEY, likely.id);
    renderBlockFilter(likely);
    renderBlockSwitcher(likely);
    renderDayChips(likely);
    initFieldViews();
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

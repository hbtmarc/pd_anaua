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
  var VIEW_KEY = "anaua-active-view";
  var BLOCK_KEY = "anaua-current-block";
  var SHOT_FILTER_KEY = "anaua-shot-filter";
  var currentBlockId = "";
  var currentQuestionIndex = -1;
  var currentShotFilter = "all";
  var noteSaveTimers = {};

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function setText(id, value) {
    var el = $(id);
    if (el) el.textContent = value;
  }

  function shortText(value, limit) {
    var text = String(value || "");
    return text.length > limit ? text.slice(0, limit - 1).trim() + "…" : text;
  }

  function showToast(message, type) {
    var region = $("toast-region");
    if (!region) return;
    var toast = document.createElement("p");
    toast.className = "toast" + (type ? " toast--" + type : "");
    toast.textContent = message;
    region.appendChild(toast);
    window.setTimeout(function () {
      toast.classList.add("is-leaving");
      window.setTimeout(function () {
        toast.remove();
      }, 220);
    }, 2200);
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
    showToast(shotStatusLabel(status));
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
      descartado: "Cortado"
    }[status] || status;
  }

  function shotStatusLabel(status) {
    return {
      pendente: "Pendente",
      feito: "Captado",
      repetir: "Refazer",
      descartado: "Cortado"
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

  function computeBlockShotProgress(block) {
    var shots = getBlockShots(block);
    var captured = shots.filter(function (shot) {
      return getShotState(shot.id).status === "feito";
    }).length;
    var repeat = shots.filter(function (shot) {
      return getShotState(shot.id).status === "repetir";
    }).length;
    var pendingA = shots.filter(function (shot) {
      return shot.prioridade === "A" && getShotState(shot.id).status === "pendente";
    }).length;

    return {
      total: shots.length,
      captured: captured,
      repeat: repeat,
      pendingA: pendingA,
      percent: shots.length ? Math.round((captured / shots.length) * 100) : 0
    };
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
    var blockProgress = computeBlockShotProgress(block);
    var statusText = blockProgress.total
      ? blockProgress.captured + " de " + blockProgress.total + " shots captados neste bloco"
      : "Bloco sem shot relacionado";

    setText("now-block-title", block.titulo);
    setText("now-block-window", block.janela);
    setText("now-next-step", block.proximoPasso);
    setText("now-priority", block.prioridade);
    setText("now-capture-first", block.captarPrimeiro);
    setText("now-cut", block.cortarSeApertar);
    setText("now-risk", (block.riscos || []).join("; "));
    setText("now-equipment", (block.equipamentos || []).join(" + "));
    setText("now-status", statusText);
    setText("current-block-summary", blockShortTitle(block.titulo) + " · " + block.janela);
    setText("block-current-label", blockShortTitle(block.titulo));
    setText("side-block-title", blockShortTitle(block.titulo));
    setText("side-block-window", block.janela);
    setText("side-next-step", block.proximoPasso);
  }

  function renderProgress(block) {
    var progress = computeProgress();
    var pendingA = hasPendingPriorityA(block);
    setText("progress-general", progress.generalPercent + "%");
    setText("progress-a", progress.priorityPercent + "%");
    setText("progress-captured", String(progress.captured));
    setText("progress-repeat", String(progress.repeat));
    if ($("priority-alert")) $("priority-alert").hidden = !pendingA;
    setText("side-progress-general", progress.generalPercent + "%");
    setText("side-progress-a", progress.priorityPercent + "%");
    setText("side-captured", String(progress.captured));
    setText("side-repeat", String(progress.repeat));
    if ($("side-alert")) {
      $("side-alert").textContent = pendingA
        ? "Prioridade A pendente neste bloco. Resolver antes de sair."
        : "Sem alerta crítico neste bloco.";
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
      var progress = computeBlockShotProgress(item);
      var button = document.createElement("button");
      button.type = "button";
      button.className = "block-option";
      button.setAttribute("data-block-id", item.id);
      button.innerHTML =
        '<span class="block-option__meta">' + escapeHtml(item.prioridade) + '</span>' +
        '<strong>' + escapeHtml(blockShortTitle(item.titulo)) + '</strong>' +
        '<small>' + escapeHtml(item.janela) + '</small>' +
        '<em data-block-progress="' + item.id + '">' + progress.percent + "%</em>";
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
      var progress = block ? computeBlockShotProgress(block) : { percent: 0 };
      var progressEl = button.querySelector("[data-block-progress]");
      button.classList.toggle("is-active", id === activeBlock.id);
      button.setAttribute("aria-pressed", String(id === activeBlock.id));
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
    var pendingItems = items.filter(function (item) {
      return item.status === "pendente";
    });
    var reviewItems = items.filter(function (item) {
      return item.status === "repetir";
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
      showToast(statusLabel(option));
      renderAssistant();
    }

    function renderItem(item) {
      var row = document.createElement("article");
      var primary = item.status === "feito" || item.status === "descartado"
        ? ["pendente", item.status === "feito" ? "Reabrir" : "Restaurar"]
        : ["feito", item.status === "repetir" ? "Resolver" : "Feito"];
      row.className = "op-check op-check--" + item.status;
      row.innerHTML =
        '<div class="op-check__copy">' +
          '<span class="status-chip status-chip--' + item.status + '">' + escapeHtml(statusLabel(item.status)) + '</span>' +
          '<p>' + escapeHtml(item.text) + '</p>' +
        '</div>' +
        '<div class="op-check__actions">' +
          '<button class="btn-mini btn-mini--primary" type="button" data-check-action="' + primary[0] + '">' + primary[1] + '</button>' +
          '<details class="item-more">' +
            '<summary aria-label="Ações secundárias">...</summary>' +
            '<div class="item-more__menu">' +
              '<button type="button" data-check-action="repetir">Revisar</button>' +
              '<button type="button" data-check-action="descartado">Cortar</button>' +
              '<button type="button" data-check-action="pendente">Voltar para pendente</button>' +
            '</div>' +
          '</details>' +
        '</div>';
      row.querySelectorAll("[data-check-action]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          setChecklistStatus(item.key, btn.getAttribute("data-check-action"));
        });
      });
      return row;
    }

    root.innerHTML = "";

    function renderGroup(title, itemsToRender, isCollapsed) {
      var group = document.createElement(isCollapsed ? "details" : "section");
      group.className = "check-group" + (isCollapsed ? " check-group--done" : "");
      if (isCollapsed) {
        group.innerHTML = '<summary>' + title + ' (' + itemsToRender.length + ')</summary>';
      } else {
        group.innerHTML = '<h4>' + title + ' (' + itemsToRender.length + ')</h4>';
      }
      if (itemsToRender.length) {
        itemsToRender.forEach(function (item) {
          group.appendChild(renderItem(item));
        });
      } else if (!isCollapsed) {
        group.insertAdjacentHTML("beforeend", '<p class="empty-state">Nenhum item nesta lista.</p>');
      }
      root.appendChild(group);
    }

    renderGroup("Pendentes", pendingItems, false);
    renderGroup("Revisar", reviewItems, false);
    if (doneItems.length) {
      renderGroup("Mostrar concluídos", doneItems, true);
    }
  }

  function shotPassesFilter(shot) {
    var status = getShotState(shot.id).status;
    if (currentShotFilter === "all") return true;
    if (currentShotFilter === "A") return shot.prioridade === "A";
    return status === currentShotFilter;
  }

  function getShotPrimaryAction(status) {
    if (status === "feito") return { label: "Ver", status: "", opensDetails: true };
    if (status === "repetir") return { label: "Refazer", status: "pendente" };
    if (status === "descartado") return { label: "Restaurar", status: "pendente" };
    return { label: "Captado", status: "feito" };
  }

  function renderShots(block) {
    var root = $("action-shot-list");
    if (!root) return;
    root.innerHTML = "";
    getBlockShots(block).filter(shotPassesFilter).forEach(function (shot) {
      var shotState = getShotState(shot.id);
      var primaryAction = getShotPrimaryAction(shotState.status);
      var card = document.createElement("article");
      var priorityPending = shot.prioridade === "A" && shotState.status === "pendente";
      var notePreview = shotState.note ? '<p class="shot-note-preview">Nota: ' + escapeHtml(shortText(shotState.note, 92)) + '</p>' : "";
      card.className = "action-shot action-shot--" + shotState.status + (priorityPending ? " action-shot--priority-pending" : "");
      card.innerHTML =
        '<div class="shot-card__top">' +
          '<span class="shot-number">' + escapeHtml(shot.id) + '</span>' +
          '<div class="shot-main"><strong>' + escapeHtml(shot.nome) + '</strong><small>' + escapeHtml(shot.funcao) + '</small></div>' +
          '<div class="shot-card__badges">' +
            '<span class="priority-chip priority-chip--' + escapeHtml(shot.prioridade.toLowerCase()) + '">Prioridade ' + escapeHtml(shot.prioridade) + '</span>' +
            '<span class="status-chip status-chip--' + escapeHtml(shotState.status) + '">' + escapeHtml(shotStatusLabel(shotState.status)) + '</span>' +
          '</div>' +
          '<span class="action-shot__reels">' + escapeHtml(shot.reelsRelacionados.join(", ")) + '</span>' +
          '<button class="btn-mini btn-mini--primary shot-primary-action" type="button" data-shot-primary>' + primaryAction.label + '</button>' +
        '</div>' +
        '<div class="shot-card__meta">' +
          '<span><strong>Reels</strong> ' + escapeHtml(shot.reelsRelacionados.join(", ")) + '</span>' +
          '<span><strong>Formato</strong> ' + escapeHtml(shot.formato) + '</span>' +
        '</div>' +
        notePreview +
        '<details class="shot-details">' +
          '<summary>Detalhes</summary>' +
          '<div class="shot-details__body">' +
            '<p><strong>Execução:</strong> ' + escapeHtml(shot.execucao) + '</p>' +
            '<p class="action-shot__risk"><strong>Risco:</strong> ' + escapeHtml(shot.risco) + '</p>' +
            '<label class="shot-note">Nota de campo<textarea maxlength="180" rows="2" placeholder="Ex.: áudio ruim, refazer com menos vento, usar como capa...">' + escapeHtml(shotState.note || "") + '</textarea><small class="shot-note-status" aria-live="polite"></small></label>' +
            '<div class="shot-actions">' +
              '<button type="button" data-shot-action="repetir">Refazer</button>' +
              '<button type="button" data-shot-action="descartado">Cortar</button>' +
              '<button type="button" data-shot-action="pendente">Pendente</button>' +
            '</div>' +
          '</div>' +
        '</details>';
      var details = card.querySelector(".shot-details");
      var primary = card.querySelector("[data-shot-primary]");
      if (primary) {
        primary.addEventListener("click", function () {
          if (primaryAction.opensDetails && details) {
            details.open = true;
            details.scrollIntoView({ block: "nearest" });
            return;
          }
          setShotStatus(shot.id, primaryAction.status);
        });
      }
      card.querySelectorAll("[data-shot-action]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          setShotStatus(shot.id, btn.getAttribute("data-shot-action"));
        });
      });
      var textarea = card.querySelector("textarea");
      var noteStatus = card.querySelector(".shot-note-status");
      if (textarea) {
        textarea.addEventListener("input", function (event) {
          if (noteStatus) noteStatus.textContent = "salvando...";
          window.clearTimeout(noteSaveTimers[shot.id]);
          noteSaveTimers[shot.id] = window.setTimeout(function () {
            setShotNote(shot.id, event.target.value);
            if (noteStatus) noteStatus.textContent = "salvo";
            updateReportOutput();
            showToast("Nota salva");
          }, 450);
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

    function renderResult(item) {
      if (!item || !result) {
        if (result) result.innerHTML = '<p class="empty-state">Escolha uma situação para ver a resposta rápida.</p>';
        return;
      }
      result.innerHTML =
        '<h4>' + escapeHtml(item.rotulo) + '</h4>' +
        '<div class="contingency-result__grid">' +
          '<p><strong>O que fazer agora</strong>' + escapeHtml(item.resposta) + '</p>' +
          '<p><strong>Proteger</strong>' + escapeHtml(item.proteger) + '</p>' +
          '<p><strong>Cortar</strong>' + escapeHtml(item.cortar) + '</p>' +
          '<p><strong>Kit mínimo</strong>' + escapeHtml(item.equipamentoMinimo) + '</p>' +
          '<p><strong>Evitar</strong>' + escapeHtml(item.risco) + '</p>' +
        '</div>';
    }

    (PLAN.contingencias || []).forEach(function (item) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-contingency-id", item.id);
      btn.innerHTML = '<strong>' + escapeHtml(item.rotulo) + '</strong><span>' + escapeHtml(item.resposta.split(".")[0]) + '.</span>';
      btn.addEventListener("click", function () {
        buttons.querySelectorAll("[data-contingency-id]").forEach(function (control) {
          control.classList.toggle("is-active", control === btn);
        });
        renderResult(item);
      });
      buttons.appendChild(btn);
    });
    renderResult(null);
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
      if (view) {
        setActiveView(view);
        var field = $("agora");
        if (field) field.scrollIntoView({ block: "start" });
      }
    });
    var initialView = viewForHash();
    setActiveView(initialView || loadPreference(VIEW_KEY, "agora"));
    if (initialView && $("agora")) {
      window.setTimeout(function () {
        $("agora").scrollIntoView({ block: "start" });
      }, 0);
    }
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

  function updateReportOutput() {
    var text = generateReport();
    var output = $("report-output");
    var preview = $("report-preview");
    if (output) output.value = text;
    if (preview) preview.textContent = text;
    return text;
  }

  function initReport() {
    var output = $("report-output");
    var preview = $("report-preview");
    var shareBtn = $("share-report");
    var status = $("share-status");
    if (!output) return;
    if (preview) preview.textContent = output.value;
    updateReportOutput();
    document.querySelectorAll("#generate-report, [data-generate-report]").forEach(function (button) {
      button.addEventListener("click", function () {
        setActiveView("relatorio", { updateHash: true });
        updateReportOutput();
        if (status) status.textContent = "Resumo gerado.";
        showToast("Resumo gerado");
      });
    });
    $("copy-report").addEventListener("click", function () {
      if (!output.value) updateReportOutput();
      function selectFallback() {
        var fallback = output.closest("details");
        if (fallback) fallback.open = true;
        output.focus();
        output.select();
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(output.value).then(function () {
          if (status) status.textContent = "Resumo copiado.";
          showToast("Resumo copiado", "success");
        }).catch(function () {
          selectFallback();
          if (status) status.textContent = "Selecione e copie o texto.";
          showToast("Falha ao copiar", "error");
        });
      } else {
        selectFallback();
        if (status) status.textContent = "Selecione e copie o texto.";
      }
    });
    if (shareBtn && !navigator.share) {
      shareBtn.disabled = true;
      if (status) status.textContent = "Compartilhamento nativo indisponível neste navegador.";
    }
    if (shareBtn) shareBtn.addEventListener("click", function () {
      if (!navigator.share) return;
      if (!output.value) updateReportOutput();
      navigator.share({ title: "Resumo de campo Anauá", text: output.value }).then(function () {
        showToast("Resumo compartilhado");
      }).catch(function () {
        showToast("Compartilhamento cancelado");
      });
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

  function initLocalDataControls() {
    var clearBtn = $("local-data-clear");
    if (!clearBtn) return;
    clearBtn.addEventListener("click", function () {
      if (!window.confirm("Limpar status, notas, bloco, filtros e modo foco deste navegador?")) return;
      try {
        [
          FIELD_KEY,
          FOCUS_KEY,
          STORAGE_KEY,
          BLOCK_KEY,
          VIEW_KEY,
          SHOT_FILTER_KEY
        ].forEach(function (key) {
          localStorage.removeItem(key);
        });
      } catch (_err) {}
      showToast("Dados locais limpos");
      window.setTimeout(function () {
        window.location.reload();
      }, 350);
    });
  }

  function initAppStatus() {
    var status = $("app-status");
    if (!status) return;

    function renderStatus(isReady) {
      if (!navigator.onLine) {
        status.textContent = "offline pronto";
        status.classList.add("is-offline");
        return;
      }
      status.textContent = isReady ? "online · offline pronto" : "online";
      status.classList.remove("is-offline");
    }

    renderStatus(false);
    window.addEventListener("online", function () {
      renderStatus(Boolean(navigator.serviceWorker && navigator.serviceWorker.controller));
    });
    window.addEventListener("offline", function () {
      renderStatus(true);
    });
    if (navigator.serviceWorker && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready.then(function () {
        renderStatus(true);
      }).catch(function () {});
    }
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
    updateReportOutput();
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
    initLocalDataControls();
    initAppStatus();
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

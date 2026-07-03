# Anauá STL — Checklist v34

Correção da persistência dos checkboxes internos dos cards.

## Problema corrigido

O HTML dos checkboxes internos usa a classe `.bullet-input`, mas o JavaScript anterior estava escutando uma classe antiga (`.summary-check-input`). Resultado: o checkbox mudava visualmente na tela, mas não atualizava `state.checked`, não concluía o card e não subia para o RTDB.

## Correções

- Listener corrigido para `.bullet-input`.
- Adicionado fallback delegado em `sectionsContainer` para impedir erro semelhante no futuro.
- Ao marcar qualquer checkbox interno:
  - atualiza `state.checked`;
  - recalcula conclusão do card;
  - recalcula conclusão da seção;
  - salva no `localStorage`;
  - envia imediatamente para o Firebase RTDB.
- Card fica concluído automaticamente quando todos os checkboxes internos estão marcados.
- Escrita no RTDB agora é imediata para ações do usuário, sem depender de debounce.
- Navegador vazio continua bloqueado contra apagar progresso remoto.
- Adicionado favicon para evitar 404.
- Adicionado neutralizador de service worker antigo e limpeza de caches legados.

## Mantido

- `localStorage`: `checklist_stl`
- Firebase path: `/checklist_stl/shared/state`
- Mapa de energia: `#/energia`

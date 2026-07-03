# Anauá STL — Checklist v32

Correção de sincronização multi-navegador.

## Problema corrigido

Na v31, um navegador limpo podia entrar antes de hidratar o estado remoto e publicar um estado local vazio/default. Isso fazia o RTDB voltar para zero ou entrar em alternância de `checked` e `controlsVisible`.

## Solução

- O cliente agora espera o primeiro snapshot do RTDB antes de permitir qualquer escrita.
- Se existir estado remoto, o RTDB vira a fonte da verdade inicial.
- Um navegador vazio não pode sobrescrever progresso remoto.
- Escritas com `checked` vazio são bloqueadas quando já existe progresso remoto, salvo reset explícito.
- Preferências/opções continuam sendo persistidas depois que o usuário altera:
  - `hideDone`;
  - `controlsVisible`;
  - seções abertas;
  - detalhes expandidos.
- Reset e "Limpar tudo" continuam funcionando porque enviam intenção explícita de reset.

## Mantido

- `localStorage`: `checklist_stl`
- RTDB path: `/checklist_stl/shared/state`
- Mapa de energia: `#/energia`
- Seção concluída com fundo verde e texto branco.

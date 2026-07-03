# Anauá STL — Checklist v30

Versão com sincronização Firebase Realtime Database sem Auth.

## O que mudou

- O estado do checklist sincroniza em:
  `/checklist_stl/shared/state`
- O `localStorage` continua como cache/fallback:
  `checklist_stl`
- A primeira execução cria automaticamente a estrutura no RTDB.
- Se o RTDB estiver vazio, o estado local sobe para a nuvem.
- Se o RTDB tiver estado mais recente, ele aplica no site.
- Badge no header mostra:
  - Local;
  - Conectando;
  - Sincronizando;
  - Nuvem ativa;
  - Falha.
- Lógica de card completo corrigida:
  quando todos os checkboxes de um card estão marcados, o card fica completo automaticamente.
- Mantido o mapa de energia em:
  `#/energia`

## Firebase

Configuração usada:
- Projeto: `planodiretor-marc35`
- RTDB: `https://planodiretor-marc35-default-rtdb.firebaseio.com`
- Caminho: `checklist_stl/shared/state`

## Publicação

Publicar todo o conteúdo no GitHub Pages.
Não precisa criar manualmente nó no banco.
A primeira gravação cria a estrutura.

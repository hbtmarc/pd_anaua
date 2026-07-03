# Anauá STL — Checklist v31

Correções sobre sincronização, Live Server e estado visual de seção.

## Mudanças

- Seção concluída agora inverte visualmente:
  - fundo verde;
  - textos brancos;
  - barra de progresso branca;
  - destaque forte para diferenciar do restante.
- Sincronização RTDB ficou mais inteligente:
  - estado vazio de outro navegador não apaga progresso local;
  - se local tem mais itens marcados que a nuvem, local sobe para o Firebase;
  - se nuvem tem mais itens marcados que local, nuvem aplica no site;
  - se o total marcado empatar, o mais recente vence.
- Primeira gravação continua criando automaticamente:
  `/checklist_stl/shared/state`
- localStorage mantido:
  `checklist_stl`
- Mapa de energia mantido:
  `#/energia`

## Correção do Live Server/Five Server

O erro 403 "Can't access files outside of root" ocorre quando o servidor foi aberto em uma raiz diferente e você tenta acessar `D:/...` pela URL.

Forma correta:
1. Abrir a pasta do projeto como workspace/root no Cursor/VS Code.
2. Clicar com o botão direito na pasta do projeto ou no `index.html`.
3. Usar Open with Five Server / Go Live.
4. A URL deve ficar parecida com:
   `http://127.0.0.1:5500/index.html`
   ou
   `http://127.0.0.1:5500/`

Não usar:
`http://127.0.0.1:5500/d:/...`

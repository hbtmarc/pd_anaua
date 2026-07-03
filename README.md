# Anauá STL — Checklist v33

Correção definitiva do ciclo Chrome/Firefox/GitHub Pages.

## O que foi corrigido

- Marcação feita no Chrome não desaparece mais após Ctrl+Shift+R se o `localStorage` estiver mais recente que o RTDB.
- Navegador limpo não zera o RTDB.
- O Firebase só recebe escrita depois do primeiro snapshot remoto.
- Se o local for mais novo que a nuvem, o local sobe para o Firebase.
- Se a nuvem for mais nova, a nuvem hidrata o navegador.
- Escrita vazia continua bloqueada quando já existe progresso remoto.
- Reset e Limpar Tudo continuam permitidos por intenção explícita.

## Regra de sincronização

1. Aguardar primeiro snapshot do RTDB.
2. Comparar `updatedAt`.
3. Estado local mais recente vence e sobe.
4. Estado remoto mais recente vence e aplica.
5. Navegador vazio nunca apaga progresso remoto.
6. Preferências como `hideDone`, `controlsVisible`, `openSections` e `expanded` persistem depois da primeira alteração real.

## Mantido

- `localStorage`: `checklist_stl`
- Firebase path: `/checklist_stl/shared/state`
- Visual verde/branco para seção concluída.
- Mapa de energia: `#/energia`

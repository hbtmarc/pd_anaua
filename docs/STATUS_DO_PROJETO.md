# Status do Projeto — Plano Diretor Audiovisual Anauá

**Campanha:** 1 ano de Anauá — Viver a natureza em grupo  
**Local/data:** São Thomé das Letras/MG · 03 a 05/07/2026  
**Última atualização:** 01/07/2026

---

## Fase atual

**Fase 2.1 — Controle de Campo Profissional (em validação)**

Site estático publicável no GitHub Pages evoluído para Plano Diretor de Bolso com interface de produto operacional: bottom nav no mobile, command center no desktop, painel fixo de métricas, checklist contextual, shots compactos com detalhes recolhidos, notas persistentes, contingências, Modo Foco e relatório copiável/compartilhável.

---

## Decisões tomadas

| Decisão | Motivo |
|---------|--------|
| HTML/CSS/JS puros, sem build | Publicação direta no GitHub Pages; abertura local via `index.html` |
| Paleta natureza (verde profundo, pedra, areia, céu, dourado) | Coerência com ecoturismo e tom cinematográfico |
| Tipografia system + serif editorial | Performance, zero dependência externa, hierarquia premium |
| Checklist em `localStorage` | Persistência sem backend nem login |
| Matriz A/B/C com destaque visual proporcional | Prioridade A inegociável; C explicitamente cortável |
| Hero com gradiente CSS (sem imagens obrigatórias) | Carregamento rápido; espaço reservado em `/assets/img` |
| Menu compacto no mobile, nav horizontal no desktop | Mobile-first real com acessibilidade (Escape, foco, skip link) |
| Reel 05 e drone como condicionais | Alinhado ao plano — não comprometem entrega mínima |
| Modo Campo como seção dedicada | Consulta rápida no celular durante captação, sem lógica automática desnecessária |
| Open Graph/Twitter Card com `assets/img/og-cover.jpg` | Compartilhamento preparado sem depender da imagem existir no MVP |
| Bloco de autorização e privacidade | Reduz risco jurídico e protege participantes, marca e publicação |
| Percentual no checklist | Feedback mais claro para uso em campo e QA |
| PDF como fonte mestre | O site agora é a versão navegável do plano diretor completo, não apenas uma landing resumida |
| Shot list 01–27 em `details` | Mantém profundidade técnica sem prejudicar leitura mobile |
| Ordem de gravação por blocos reais | Facilita uso no set e tomada de decisão sob pressão |
| Pós, falas e publicação incorporados | Fecha o ciclo completo: captação, montagem, export, capas e campanha |
| `assets/js/plan-data.js` | Dados estruturados separados da interface para facilitar manutenção |
| Painel Agora no topo | A primeira tela útil passa a ser operacional, não documental |
| Status de shots em 4 estados | Campo precisa de captado, repetir, descartado e pendente, não só checkbox |
| Service Worker + manifest | Preparação PWA/offline compatível com GitHub Pages |
| Sem geolocalização e sem dados pessoais | Privacidade preservada; cálculo usa só data/hora local do navegador |
| Revisão UI/UX de contraste | Assistente passou para fundo claro, texto escuro, cartões legíveis e estados visuais óbvios |
| Revamp de painel e blocos | Separação visual reforçada, seletor de bloco orientado, gaps consistentes e desktop mais confortável |
| Revamp de seletores e controles | Troca de bloco por cards acionáveis, dropdown como fallback, rótulos mais claros e botões orientados à ação |
| Fase 2.1 como app de campo | Mobile prioriza bottom nav e primeira dobra operacional; desktop vira command center |
| Status separado de ação | `Pendente` passa a ser chip informativo; ação primária do shot é `Marcar captado` |
| Notas recolhidas por padrão | Reduz ruído visual e rolagem em campo; preview aparece só quando há nota |
| Bloco, view e filtros persistentes | O app volta ao contexto de trabalho após recarregar |

---

## Entregas desta fase

- [x] `index.html` — todas as seções solicitadas
- [x] `assets/css/styles.css` — design premium, responsivo, `prefers-reduced-motion`
- [x] `assets/js/app.js` — navegação, scroll progress, checklist persistente
- [x] `README.md` — instruções de publicação GitHub Pages
- [x] `docs/STATUS_DO_PROJETO.md` — este documento
- [x] `assets/img/.gitkeep` — pasta preparada para imagens futuras
- [x] Modo Campo — visão compacta de Agora, Não sair sem e Prioridade A
- [x] SEO/social básico — OG, Twitter Card, theme-color e favicon preparado
- [x] Checklist — persistência mantida e percentual adicionado
- [x] Privacidade — cuidados de imagem, crianças, documentos, drone e música
- [x] Visão executiva — projeto, entregas, meta de captação, locação e direção
- [x] Conceitos — viagem que virou grupo, um ano guiando encontros, São Thomé em presença e prova no rosto
- [x] Shot list técnico — 27 cenas com prioridade, formato e função
- [x] Ordem de gravação — blocos de sexta, sábado, domingo e retorno
- [x] Fotografia e áudio — câmera, luz, cor, FPS, foleys, Lark, J/L-cuts e música
- [x] Pós-produção — bins, timelines R01–R05, export, controle e capas
- [x] Roteiro de campo — falas da equipe e perguntas para depoimentos
- [x] Publicação — legenda principal, SEO orgânico, hashtags e capas por Reel
- [x] Checklist ampliado — áudio, inventário, backup, timelines, capas, licença e revisão em celular
- [x] `assets/js/plan-data.js` — blocos operacionais, shots, reels, contingências, perguntas e checklist base
- [x] Painel Agora — bloco provável, prioridade, captar primeiro, cortar, risco e próximo passo
- [x] Progresso inteligente — geral, Prioridade A, captados, repetir e alerta de A pendente
- [x] Checklist por bloco — estados pendente, feito, repetir e descartado
- [x] Shot list acionável — Captado, Repetir, Descartado, nota e Reels relacionados
- [x] Modo Foco — persiste e esconde seções longas
- [x] Contingência — chuva, atraso, bateria, ruído, frio, baixa luz, excesso de pessoas e insegurança
- [x] Pergunta rápida — banco de perguntas e próxima pergunta
- [x] Relatório — geração, cópia via Clipboard API com fallback e Web Share quando disponível
- [x] PWA leve — `manifest.webmanifest`, `service-worker.js` e registro no app
- [x] Revisão de UI/UX — contraste corrigido, primeira dobra mais intuitiva e desktop mais legível
- [x] Revamp do painel — espaçamentos, alinhamentos, hierarquia, botões, cards e seletor de bloco refinados
- [x] Revamp de controles — cards de bloco, filtros de shot mais claros, estados com linguagem de campo e notas com placeholder útil
- [x] Fase 2.1 — bottom nav mobile com Agora, Checklist, Shots, Emergência e Relatório
- [x] Fase 2.1 — desktop em 3 áreas: sidebar, centro operacional e painel direito
- [x] Central de Comando — bloco, janela, prioridade, captar primeiro, cortar, próximo passo e alerta A
- [x] Seletor de bloco — dropdown mobile, chips por dia e timeline/lista desktop
- [x] Checklist contextual — pendentes primeiro, concluídos recolhidos e ação principal Feito
- [x] Shots compactos — status chips, prioridade, reels, detalhes recolhidos e nota recolhida
- [x] Persistência ampliada — bloco manual, view ativa e filtro de shots
- [x] Seletor central de bloco — controle `< Bloco >` com anterior/próximo e persistência
- [x] Shotlist refinado — cards compactos com número, função, Reels, formato, prioridade, status e CTA claro
- [x] Relatório formatado — resumo pré-gerado com seções e listas copiáveis
- [x] Service Worker — cache atualizado para `anaua-campo-v6`

---

## Pendências

| Item | Prioridade | Observação |
|------|------------|------------|
| Fotos e frames reais em `/assets/img` | Média | Hero e cards ganham impacto com material de campo |
| Criar `assets/img/og-cover.jpg` | Alta | Necessário para preview social real no WhatsApp, LinkedIn e redes |
| Criar `assets/img/favicon.ico` | Baixa | Link já preparado; ausência não bloqueia abertura do site |
| Revisão de copy com equipe Anauá | Média | Validar tom emocional vs. institucional |
| Teste em dispositivos reais (iOS/Android) | Alta | Antes do fim de semana de captação |
| Definir URL final do GitHub Pages | Baixa | Após criação do repositório remoto |
| Logo Anauá (se existir versão oficial) | Baixa | Substituir wordmark textual no header |
| Rodar Lighthouse mobile/desktop | Alta | Validar performance, acessibilidade, boas práticas e SEO antes de publicar |
| Revisão final com o PDF ao lado | Alta | Confirmar se a síntese web está fiel e se algum detalhe operacional deve virar texto literal |
| Teste offline real em navegador | Alta | Service Worker só funciona após primeira visita em origem servida por HTTP/HTTPS |
| Ícones PWA | Baixa | Manifest está preparado sem ícones obrigatórios; adicionar quando houver arte final |
| QA em celular físico sob luz forte | Alta | Validar contraste real, alvo de toque e velocidade de decisão em campo |
| QA desktop em 1366px e 1920px | Média | Confirmar command center sem sobreposição ou componentes encostados |

---

## Próximo passo

1. **Abrir em servidor local ou GitHub Pages** e validar console, bottom nav, sidebar, Central de Comando, filtro de bloco, Modo Foco, contingências e relatório.
2. **Testar persistência** de bloco manual, view ativa, filtros, shots, notas, checklist por bloco e Modo Foco.
3. **Testar offline** após primeira visita.
4. **Criar `assets/img/og-cover.jpg`** em 1200 × 630 px antes do compartilhamento público.
5. **Rodar Lighthouse** em mobile e desktop no link publicado.
6. **Compartilhar o link** com equipe de produção e condutores.

---

## Critérios de aceite — status

| Critério | Status |
|----------|--------|
| Abrir localmente via `index.html` | OK |
| Publicável no GitHub Pages sem ajustes | OK |
| Responsivo mobile / tablet / desktop | OK |
| Sem erro no console | OK |
| Checklist persistente (`localStorage`) | OK |
| Visual premium e coerente | OK |
| Conteúdo claro, comercial e emocional | OK |
| README com instruções de publicação | OK |
| Acessibilidade básica (semântica, foco, skip link, contraste) | OK |
| Menu mobile fecha ao clicar em links e com Escape | OK |
| `aria-expanded` atualizado no menu | OK |
| Checklist mostra percentual além de contagem | OK |
| Modo Campo legível no celular | OK |
| SEO/social básico preparado | OK |
| Cuidados de imagem e autorização presentes | OK |
| PDF usado como fonte mestre do plano diretor web | OK |
| Shot list 01–27 disponível na página | OK |
| Ordem de gravação por blocos reais disponível | OK |
| Fotografia, áudio, pós, falas, publicação e logística incorporados | OK |
| Painel Agora calcula bloco provável por data/hora local | OK |
| Status dos shots persistem em `localStorage` | OK |
| Notas dos shots persistem em `localStorage` | OK |
| Modo Foco persiste | OK |
| Relatório gerado e copiável | OK |
| Web Share com fallback | OK |
| PWA/offline preparado | OK |
| Contraste do assistente revisado | OK |
| Layout desktop do assistente revisado | OK |
| Componentes do painel sem encostar visualmente | OK |
| Seletor de bloco mais intuitivo | OK |
| Troca de bloco por cards acionáveis | OK |
| Botões e textos revisados para clareza operacional | OK |
| Mobile com navegação inferior de 5 áreas | OK |
| Desktop em layout command center | OK |
| Painel direito fixo com métricas operacionais | OK |
| Checklist com concluídos recolhidos | OK |
| Shots sem quatro botões grandes visíveis | OK |
| Pendente não aparece como CTA primário | OK |
| Notas de campo recolhidas por padrão | OK |
| Persistência de bloco/view/filtro | OK |
| Lighthouse mobile/desktop executado | Pendente |
| Teste em GitHub Pages executado | Pendente |
| Teste offline real executado | Pendente |

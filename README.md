# 1 ano de Anauá — Plano Diretor Audiovisual

Plano Diretor de Bolso e assistente de campo offline para a campanha audiovisual da **Anauá Ecoturismo** — *Viver a natureza em grupo* em São Thomé das Letras/MG (03 a 05/07/2026).

O conteúdo foi consolidado a partir de `docs/Plano_Diretor_Anaua_1_Ano_Sao_Thome.pdf`, tratado como fonte mestre do projeto.

## Fase atual

**Fase 2.1 — Controle de Campo Profissional.** A seção operacional foi reorganizada como app de campo: bottom nav no mobile, command center no desktop, checklist contextual, shots compactos, emergência e relatório em telas próprias.

## Stack

- HTML, CSS e JavaScript puros
- Sem backend, sem build obrigatório
- Compatível com GitHub Pages
- Caminhos relativos
- Persistência local via `localStorage`
- PWA leve com `manifest.webmanifest` e `service-worker.js`
- SEO/social básico com Open Graph, Twitter Card, `theme-color` e favicon preparado

## Estrutura

```
/
  index.html
  README.md
  assets/
    css/styles.css
    js/plan-data.js
    js/app.js
    img/          ← espaço reservado para favicon e imagem social
  docs/
    STATUS_DO_PROJETO.md
  manifest.webmanifest
  service-worker.js
```

## Visualizar localmente

Abra `index.html` diretamente no navegador ou sirva com um servidor estático:

```bash
# Python 3
python -m http.server 8080

# Node (npx, sem instalar)
npx serve .
```

Acesse `http://localhost:8080`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie este projeto.
2. No repositório, vá em **Settings → Pages**.
3. Em **Source**, selecione **Deploy from a branch**.
4. Escolha a branch `main` (ou `master`) e a pasta **`/ (root)`**.
5. Salve. Em alguns minutos o site estará em:
   `https://<seu-usuario>.github.io/<nome-do-repo>/`

### Entrada principal

O GitHub Pages servirá automaticamente `/index.html` como página inicial.

### Checklist

O checklist, bloco selecionado, view ativa, filtros, status dos shots, notas e Modo Foco persistem no `localStorage` do navegador. Não há login, backend, Firebase ou Supabase.

### Usar em campo

1. Abra a página antes da viagem com internet para instalar o cache offline.
2. No celular, use a navegação inferior: **Agora**, **Checklist**, **Shots**, **Emergência** e **Relatório**.
3. Ative **Modo Foco** para esconder o documento longo.
4. Selecione o bloco operacional no dropdown ou nos chips por dia.
5. Marque shots pela ação principal **Marcar captado**; use **Detalhes** para refazer, cortar, voltar pendente ou adicionar nota.
6. Use **Emergência** para chuva, atraso, bateria baixa, ruído, frio, baixa luz, excesso de pessoas ou insegurança.
7. Gere e copie o resumo em **Relatório do campo**.

### Instalar/adicionar à tela inicial

Em navegadores compatíveis, abra o site publicado no GitHub Pages e use **Adicionar à tela inicial**. O app usa manifest e service worker, então deve abrir offline após a primeira visita bem-sucedida.

### Limpar dados locais

No navegador, limpe os dados do site ou execute no console:

```js
localStorage.removeItem("anaua-field-state-v1");
localStorage.removeItem("anaua-focus-mode");
localStorage.removeItem("anaua-pd-checklist");
localStorage.removeItem("anaua-current-block");
localStorage.removeItem("anaua-active-view");
localStorage.removeItem("anaua-shot-filter");
```

## SEO e compartilhamento

O HTML já aponta para:

- `assets/img/og-cover.jpg` como imagem Open Graph/Twitter Card.
- `assets/img/favicon.ico` como favicon.

Antes da publicação final, coloque uma imagem `og-cover.jpg` em `assets/img/` com proporção recomendada de **1200 × 630 px**. Ela deve mostrar a Anauá ou a experiência em São Thomé de forma reconhecível, com boa leitura em miniatura e sem texto pequeno.

## Seções do site

- Hero com CTAs
- Central de Comando com cálculo de bloco provável
- Navegação inferior mobile para Agora, Checklist, Shots, Emergência e Relatório
- Sidebar e painel fixo no desktop
- Progresso geral, progresso A, captados e repetir
- Checklist operacional por bloco com pendentes primeiro e concluídos recolhidos
- Shot list acionável compacta com detalhes e nota recolhidos
- Modo Foco persistente
- Emergência/contingência
- Pergunta rápida
- Relatório copiável/compartilhável
- Visão executiva do plano diretor
- Manifesto
- Conceitos de direção
- Matriz de entregas (5 reels)
- Ganchos e função editorial por Reel
- Estrutura narrativa do Reel principal
- Modo Campo para consulta rápida no celular
- Não sair sem
- Prioridades de captação (A / B / C)
- Shot list técnico 01–27
- Ordem de gravação por bloco real
- Cuidados de imagem e autorização
- Equipamentos
- Fotografia e áudio
- Pós-produção
- Roteiro de oratória e perguntas de depoimento
- Publicação, legenda, SEO orgânico e capas
- Checklist interativo
- Riscos e correções de direção

## Checklist de validação QA

- Abrir `index.html` localmente no navegador.
- Testar desktop e mobile, incluindo menu, rolagem e leitura do Modo Campo.
- Testar Central de Comando, bottom nav mobile, sidebar desktop, filtro de bloco, Modo Foco, contingências e relatório.
- Conferir se as seções do plano cobrem: visão, Reels, narrativa, shot list, ordem de gravação, áudio/foto, pós, publicação, logística, checklist e riscos.
- Testar navegação por teclado: skip link, menu, links, botões e checkboxes.
- Marcar bloco, view, filtros, shots/status/notas, recarregar a página e validar persistência no `localStorage`.
- Usar “Limpar checklist” e confirmar que há confirmação antes de apagar.
- Publicar/testar no GitHub Pages com caminhos relativos.
- Visitar uma vez online e testar abertura offline após o service worker instalar.
- Rodar Lighthouse em mobile e desktop, validando Performance, Accessibility, Best Practices e SEO.

## Licença

Consulte o arquivo `LICENSE` do repositório.

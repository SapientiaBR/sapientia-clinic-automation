# DESIGN.md — Secretária Invisível

Contrato visual do projeto e fonte da verdade dos tokens. Versionado, lido por
agentes e humanos antes de qualquer trabalho de UI.

## Dois design systems neste projeto

São **duas marcas diferentes**, não duas propostas para a mesma. Cada pasta
pertence a uma:

| | [`design-system-2/`](design-system-2/README.md) | [`design-system/`](design-system/README.md) |
| --- | --- | --- |
| Dono | **Secretária Invisível** — o produto | **Sapient.IA** — a agência |
| Cor | Teal `#0FB5A3` | Roxo `#7c3aed` → ciano `#06b6d4` |
| Origem | Estrutura "docshield" sobre a cor que o produto já tinha | O site da agência, sapientiabr.cloud |
| Fundo | Claro | Escuro por padrão, claro alternável |
| Estado | **É o tema do site** | Espelho da marca-mãe |

O mapa prático de cada um está no `README.md` da respectiva pasta.

**O roxo é da agência e não vai no produto.** A Sapient.IA faz a Secretária
Invisível, mas o produto tem identidade própria. `design-system/` existe aqui
para manter rodapé, assinatura e material co-branded coerentes — e para deixar
explícito o que *não* deve vazar. Já houve uma branch
(`feat/docshield-redesign`, commit `110322a`) que pintou o produto de roxo;
não a tome como referência.

### A alternativa Emerald, avaliada e não adotada

[`design-system-emerald/`](design-system-emerald/README.md) guarda o export do
Claude Design: Emerald `#006851`, 27 componentes próprios, tokens e
guidelines, escopado em `.ds-root` e demonstrável em `/design-system-showcase`.

Chegou a ser aplicado num site inteiro para comparação lado a lado — branch
`feat/site-emerald`, que trocava cor, raio, peso de display, escala de corpo,
duração e easing. **A decisão foi manter o teal.**

A biblioteca continua útil: quase toda ela é vocabulário de painel
(`AgendaDay`, `AppointmentCard`, `MetricCard`, `ScoreDonut`, `TrendChart`,
`SidebarNav`, `TopBar`), não de landing. É material para o painel da
Secretária Invisível, não para esta página.

## Regras (não negociáveis)

1. **Componente novo sai de uma biblioteca, não é escrito solto.** Para a
   landing, verifique `src/components/ui/` (shadcn/ui) — a maioria do que se
   precisa já existe e só falta consumir com os tokens certos. Para o futuro
   painel, `design-system-emerald/components/` tem os 27 do export.
   `design-system/` é da agência: não tire componente de lá para o produto.
2. **Nenhum valor de cor, fonte, espaçamento ou raio vai hardcoded no
   código.** Use os tokens (`var(--token)` ou a classe Tailwind equivalente).
   Há uma regra de lint (`no-restricted-syntax`, nível `warn`) em
   `eslint.config.js` que sinaliza hex e px soltos em `src/**`.
3. **Toda mudança de token entra aqui (ou no README do sistema específico)
   antes de entrar no código.** Este arquivo — não um componente, não um
   comentário — é a fonte da verdade.

## O export Emerald em detalhe

As seções abaixo descrevem o **export do Claude Design**, hoje em
[`design-system-emerald/`](design-system-emerald/README.md) — não o sistema
do site. O sistema em uso (teal) está documentado em
[`design-system-2/README.md`](design-system-2/README.md) e vive em
`src/design/tokens.css`.

### Proveniência

Este design system veio de um export do Claude Design ("Claude Design
export", pasta `design-system-export/`, já removida após a triagem) para o
produto **Secretária Invisível** (Sapient.IA): recepcionista de IA no
WhatsApp para clínicas médicas. Construído a partir de um board de identidade
de marca de 18 pranchas (paleta, tipografia, dashboard, etc. — ver a seção
"Fontes" do antigo `readme.md`, cujo conteúdo está reproduzido abaixo). A
logomarca de referência pertence a outra empresa e **não foi reproduzida**;
só o sistema visual (cor, tipo, espaçamento, raio, sombra, composição) foi
aproveitado. A marca em si (`assets/logo-si-mark.png`) é a da Secretária
Invisível.

### Tokens

Fonte: `design-system-emerald/tokens/*.css`. **Escopados em `.ds-root`, não em
`:root`** — ver "Por que escopado" abaixo antes de promover isso para o site
inteiro.

| Grupo | Arquivo | Contém |
|---|---|---|
| Cor | `tokens/colors.css` | Paleta core, rampa emerald, neutros, status, superfícies, ações, gradientes. Light + `.dark` |
| Tipografia | `tokens/typography.css` | Escala, pesos, tracking, leading, "roles" compostos (`--type-h1`, etc.) |
| Espaçamento | `tokens/spacing.css` | Escala 4px + constantes de layout (`--content-max`, `--sidebar-w`) |
| Raio | `tokens/radius.css` | `--radius-xs` (6px) … `--radius-3xl` (32px), `--radius-pill`, `--radius-circle` |
| Elevação | `tokens/elevation.css` | Sombras (`--shadow-*`), blur, scrim. Light + `.dark` |
| Movimento | `tokens/motion.css` | Durações, easings, `--transition-control` |
| Fonte | `tokens/fonts.css` | `@font-face` Switzer + `--font-sans` / `--font-display` / `--font-mono` |

#### Paleta (light)

| Nome | Hex | Papel |
|---|---|---|
| Emerald Green | `#006851` | Primária — CTAs, painéis de destaque |
| Medical Mint | `#DBF9F1` | Superfície secundária — nav ativa, bolhas de saída, painéis de insight |
| Moody Black | `#292929` | Tinta — todo o corpo de texto |
| Ghost White | `#F8F9FE` | Fundo de página |

Rampa completa, neutros e acentos de status: `tokens/colors.css`.

#### Tipografia

Fonte de exibição e corpo: **Switzer** (self-hosted, `ITF Free Font License
2.0`, self-hosting explicitamente permitido — arquivos em
`design-system-emerald/assets/fonts/`). O export original pedia "Neue Montreal"
(paga, sem binário fornecido) com Schibsted Grotesk como fallback livre;
Switzer foi escolhida no lugar por já estar em uso nesta mesma família de
produtos (`sapientiabr.cloud`) — ver `tokens/fonts.css`.

#### Tema escuro

**Não existe no export original** (ele é light-only — ver o antigo
`readme.md`). O bloco `.ds-root.dark` em `tokens/colors.css` e
`tokens/elevation.css` foi derivado para esta tarefa (mesma família de matiz,
clareado para contraste). Tratem como ponto de partida, não como decisão de
marca validada.

#### Por que escopado em `.ds-root`, e não em `:root`

Enquanto este design system era integrado (a partir do export do Claude
Design), **outro processo construía `design-system-2/` na mesma branch, ao
vivo** — três commits (`07a853b`, `77952aa`, `74587ea`) tocando
`tailwind.config.ts`, `src/index.css` e as ~20 seções de
`src/components/landing/`. Os dois são sistemas legítimos e paralelos para o
mesmo produto (ver "Dois design systems", acima) — não um conflito a
resolver, mas dois candidatos que não deviam pisar um no outro enquanto
ambos ainda estavam sendo construídos.

Por isso os tokens deste sistema (Emerald) vivem escopados em `.ds-root`
(aplicado pela rota `/design-system-showcase` e por qualquer novo componente
que os consuma) em vez de em `:root` — zero conflito com `design-system-2`,
que continuou podendo evoluir livremente em `:root`/global, e a biblioteca
Emerald continua real, testável e completa por conta própria.

**A decisão foi tomada:** os dois foram vistos lado a lado, em dois sites
servidos em paralelo, e o teal ficou. O escopo em `.ds-root` continua sendo o
certo para o Emerald — ele não é o tema do site, e promovê-lo a `:root`
vazaria para a página inteira.

## Histórico de identidade visual

Múltiplas iterações de marca passaram por este projeto. Nenhuma foi apagada;
seguem registradas aqui para quem chegar depois não repetir exploração já
feita.

1. **`BRAND_SYSTEM.md`** (raiz, abril/2026) — sistema roxo/cyan (`#7c3aed` →
   `#06b6d4`) da Sapient.IA enquanto agência, fontes Sora + DM Sans +
   JetBrains Mono, destaque itálico+gradiente em headings. Parece ser o
   sistema de marca guarda-chuva usado por outros produtos da Sapient.IA
   (`sapientiabr`, `hoje-tem`), não específico da Secretária Invisível.
   Mantido intacto, com nota apontando para cá.
2. **Exploração Stitch/Google Labs** (`design-system.md` /
   `design-system-utf8.md`, raiz) — brief inicial "Medical Blue" (`#3B82F6`),
   neumorfismo, fontes Figtree + Noto Sans. Não chegou a ser implementado (não
   aparece nem no tema live nem no `BRAND_SYSTEM.md`). Conteúdo reproduzido
   abaixo; arquivos originais mantidos intactos, com nota apontando para cá.
3. **Tema live "premium healthtech"** (`src/index.css`, sem documento
   próprio até este arquivo) — teal `#0FB5A3`, DM Sans + Manrope via Google
   Fonts. É o que estava publicado antes desta tarefa.
4. **Export Emerald Green `#006851`** (Switzer, 27 componentes, do Claude
   Design) — chegou como `design-system/`, hoje em `design-system-emerald/`.
   Integrado como sistema *disponível e documentado* (rota
   `/design-system-showcase`) sem nunca ter substituído o tema live.
5. **Estrutura "docshield" sobre o teal** (commits `07a853b`/`77952aa`/
   `74587ea`, construído em paralelo ao item 4) — raio em pílula, família
   tipográfica única, display em peso regular com tracking apertado, sombra
   em vez de borda, aplicado à cor que o site já tinha (`#0FB5A3`), com
   Switzer self-hosted. Documentado em `design-system-2/`. **É o tema
   publicado.** Não confundir com a tentativa em `feat/docshield-redesign`
   (commit `110322a`), que aplicou a mesma estrutura com o roxo da Sapient.IA
   (item 1) em vez do verde do produto — o roxo da agência não deveria ter
   sido aplicado aqui.
6. **Comparação Emerald × teal e decisão** (15/09/2026) — o item 4 foi
   aplicado ao site inteiro na branch `feat/site-emerald`, servida em
   paralelo ao teal para julgamento lado a lado: cor, raio (10/14/16px), peso
   de display (500), escala de corpo (17/15/13/11px), durações (140/220ms) e
   `ChatBubble`/`ChatThread` nas conversas. **O teal ficou.** As pastas foram
   então renomeadas para refletir quem é dono do quê: `design-system/` passou
   a ser a Sapient.IA (agência), `design-system-2/` a Secretária Invisível
   (teal, o produto) e o export virou `design-system-emerald/`.

### Conteúdo arquivado — brief Stitch "Medical Blue"

> ### Pattern
> - **Name:** Social Proof-Focused · **CTA Placement:** Above fold ·
>   **Sections:** Hero > Features > CTA
>
> ### Style
> - **Name:** Neumorphism — Soft UI, embossed, debossed, convex, concave,
>   rounded (12–16px), monocromático
> - **Best for:** apps de saúde/bem-estar, meditação, fitness
> - **Performance:** boa · **Acessibilidade:** contraste baixo (assumido)
>
> ### Colors
> Primary `#3B82F6` · Secondary `#60A5FA` · CTA `#F97316` · Background
> `#F8FAFC` · Text `#1E293B` (notas: Medical Blue `#0077B6` + Trust White +
> Calm Green)
>
> ### Typography
> Heading **Figtree** · Body **Noto Sans**
>
> ### Avoid
> Neon brilhante, animação pesada, gradiente roxo/rosa "de IA"

(Arquivos originais: `design-system.md` — corrompido por encoding, mojibake
letra-a-letra — e `design-system-utf8.md` — versão legível. Ambos mantidos
intactos na raiz.)

## Biblioteca de componentes

O site **não tem biblioteca própria**: reusa `src/components/ui/` (shadcn/ui)
tokenizado pelos valores de `src/design/tokens.css`. Mapa em
[`design-system-2/README.md`](design-system-2/README.md).

Os 27 componentes do export Emerald (o mesmo número que existiam nele —
nenhum foi descartado) seguem em
[`design-system-emerald/`](design-system-emerald/README.md), com mapa, estados
por componente e instruções de como adicionar um novo. São vocabulário de
painel, não de landing.

## Lint de aderência

`design-system-emerald/lint/adherence.oxlintrc.json` é a config original do export
(oxlint), mantida como referência — descreve, por componente, exatamente
quais props e valores de enum são válidos (ex.: `<Button variant>` só aceita
`primary | secondary | outline | ghost | dark | inverse`). As regras
genéricas dela (nada de hex/px soltos, nada de import direto de internals)
foram portadas para `eslint.config.js`, que é o linter real deste projeto.

## HTMLs de referência visual

`design-system-emerald/reference/` — guidelines, slides, UI kits e demos de
componente do export original, preservados para abrir no navegador. Não são
componentes (os componentes reais estão em
`design-system-emerald/components/`). Mapa completo em
`design-system-emerald/README.md`.

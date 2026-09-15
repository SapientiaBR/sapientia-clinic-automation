# DESIGN.md — Secretária Invisível

Contrato visual do projeto e fonte da verdade dos tokens. Versionado, lido por
agentes e humanos antes de qualquer trabalho de UI.

## Dois design systems neste projeto

São **duas marcas diferentes**, não duas propostas para a mesma marca. Cada
pasta pertence a uma delas:

| | [`design-system/`](design-system/README.md) | [`design-system-2/`](design-system-2/README.md) |
| --- | --- | --- |
| Dono | **Sapient.IA** — a agência | **Secretária Invisível** — o produto |
| Cor | Roxo `#7c3aed` → ciano `#06b6d4` | Emerald Green `#006851` |
| Origem | O site da agência, sapientiabr.cloud | Export do Claude Design |
| Fundo | Escuro por padrão, claro alternável | Claro |
| Componentes | Nenhum próprio (shadcn tokenizado) | 27 componentes próprios |
| Ver em | sapientiabr.cloud | Rota `/design-system-showcase` |

O mapa prático de cada um está no `README.md` da respectiva pasta — este
arquivo é o contrato que cobre os dois.

**O roxo é da agência e não vai no produto.** A Sapient.IA é quem faz a
Secretária Invisível, mas o produto tem identidade própria (o emerald).
`design-system/` existe aqui para manter rodapé, assinatura e material
co-branded coerentes com a marca-mãe — e para deixar explícito o que *não*
deve vazar. Já houve uma branch (`feat/docshield-redesign`, commit `110322a`)
que pintou o produto de roxo; não a tome como referência.

### E o teal `#0FB5A3`?

Foi a cor do produto até 15/09/2026, e por um tempo esta pasta `design-system-2/`
documentava esse tema. Ele **não é mais** o sistema do produto — foi
substituído pelo emerald. Continua preservado, sem se perder:

- branch e tag **`backup/site-docshield-teal`**, commit `74587ea`
- os tokens seguem em `src/design/tokens.css` enquanto o site não migrar
- a estrutura que veio junto com ele (pílula dominante, Switzer, display em
  peso 400 com tracking negativo, sombra no lugar de borda) **permanece** —
  o que mudou foi só a cor

Ele nunca chegou a ser publicado: os commits que o criaram (`07a853b`,
`77952aa`, `74587ea`) estão em `feat/template-v2`, fora do `main`.

## Regras (não negociáveis)

1. **Componente novo sai de uma biblioteca, não é escrito solto.** Verifique
   primeiro `design-system-2/components/` (os 27 do produto) e depois
   `src/components/ui/` (shadcn/ui) — a maioria do que se precisa já existe e
   só falta consumir com os tokens certos. Não duplique nos dois lugares.
   `design-system/` é da agência: não tire componente de lá para o produto.
2. **Nenhum valor de cor, fonte, espaçamento ou raio vai hardcoded no
   código.** Use os tokens (`var(--token)` ou a classe Tailwind equivalente).
   Há uma regra de lint (`no-restricted-syntax`, nível `warn`) em
   `eslint.config.js` que sinaliza hex e px soltos em `src/**`.
3. **Toda mudança de token entra aqui (ou no README do sistema específico)
   antes de entrar no código.** Este arquivo — não um componente, não um
   comentário — é a fonte da verdade.

## Proveniência

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

## Tokens

Fonte: `design-system/tokens/*.css`. **Escopados em `.ds-root`, não em
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

### Paleta (light)

| Nome | Hex | Papel |
|---|---|---|
| Emerald Green | `#006851` | Primária — CTAs, painéis de destaque |
| Medical Mint | `#DBF9F1` | Superfície secundária — nav ativa, bolhas de saída, painéis de insight |
| Moody Black | `#292929` | Tinta — todo o corpo de texto |
| Ghost White | `#F8F9FE` | Fundo de página |

Rampa completa, neutros e acentos de status: `tokens/colors.css`.

### Tipografia

Fonte de exibição e corpo: **Switzer** (self-hosted, `ITF Free Font License
2.0`, self-hosting explicitamente permitido — arquivos em
`design-system/assets/fonts/`). O export original pedia "Neue Montreal"
(paga, sem binário fornecido) com Schibsted Grotesk como fallback livre;
Switzer foi escolhida no lugar por já estar em uso nesta mesma família de
produtos (`sapientiabr.cloud`) — ver `tokens/fonts.css`.

### Tema escuro

**Não existe no export original** (ele é light-only — ver o antigo
`readme.md`). O bloco `.ds-root.dark` em `tokens/colors.css` e
`tokens/elevation.css` foi derivado para esta tarefa (mesma família de matiz,
clareado para contraste). Tratem como ponto de partida, não como decisão de
marca validada.

### Por que escopado em `.ds-root`, e não em `:root`

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

**Isso é o estado atual, não a decisão final.** Qual dos dois sistemas — este
(Emerald, `design-system/`) ou o outro (`design-system-2/`, o que está
publicado hoje) — deveria virar o padrão definitivo do produto é uma decisão
de marca que alguém precisa tomar depois de ver os dois lado a lado, não algo
para resolver silenciosamente em um agente.

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
4. **`design-system/`** (Emerald Green `#006851`, Switzer) — este sistema,
   vindo do export do Claude Design, específico da Secretária Invisível, com
   biblioteca de 27 componentes. Integrado como sistema *disponível e
   documentado* (rota `/design-system-showcase`, ver acima) sem substituir o
   tema live.
5. **`design-system-2/`** (commits `07a853b`/`77952aa`/`74587ea`, construído
   em paralelo ao item 4) — estrutura da referência "docshield" (raio em
   pílula, família única, display em peso regular com tracking apertado,
   sombra em vez de borda) aplicada à cor que o site já tinha (`#0FB5A3`,
   teal/verde), com Switzer self-hosted também. **É o tema publicado hoje.**
   Não confundir com a tentativa em `feat/docshield-redesign` (commit
   `110322a`), que aplicou a mesma estrutura docshield com o roxo da
   Sapient.IA (item 1) em vez do verde do produto — essa branch não é este
   sistema e o roxo da agência não deveria ter sido aplicado aqui.

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

27 componentes portados do export (o mesmo número que existiam nele — nenhum
foi descartado). Ver o mapa completo, estados por componente e como adicionar
um novo em [`design-system/README.md`](design-system/README.md).

`design-system-2/` (o sistema publicado hoje) não tem biblioteca própria —
reusa `src/components/ui/` (shadcn/ui) tokenizado. Mapa em
[`design-system-2/README.md`](design-system-2/README.md).

## Lint de aderência

`design-system/lint/adherence.oxlintrc.json` é a config original do export
(oxlint), mantida como referência — descreve, por componente, exatamente
quais props e valores de enum são válidos (ex.: `<Button variant>` só aceita
`primary | secondary | outline | ghost | dark | inverse`). As regras
genéricas dela (nada de hex/px soltos, nada de import direto de internals)
foram portadas para `eslint.config.js`, que é o linter real deste projeto.

## HTMLs de referência visual

`design-system/reference/` — guidelines, slides, UI kits e demos de
componente do export original, preservados para abrir no navegador. Não são
componentes (os componentes reais estão em `design-system/components/`).
Mapa completo em `design-system/README.md`.

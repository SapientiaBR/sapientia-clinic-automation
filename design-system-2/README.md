# design-system-2/ — Secretária Invisível (o produto)

Este é o design system da **Secretária Invisível**: o que roda no site e o que
vai para produção. O da Sapient.IA, a agência, é o
[`design-system/`](../design-system/README.md) — roxo, e não se aplica aqui.

Cor **teal `#0FB5A3`**, a cor que o produto já tinha. A estrutura foi medida
de uma referência externa chamada "docshield": pílula como forma dominante,
família tipográfica única, display em peso regular com tracking negativo
forte, sombra no lugar de borda para separar superfícies. Docshield entrou só
como referência de estrutura — **a cor nunca mudou**.

## Onde os tokens de verdade moram

Esta pasta é **mapa e espelho**, não a fonte. Os arquivos que o site carrega:

| O quê | Onde |
| --- | --- |
| Cores, raios, sombras, tipografia, pontes de nomes antigos | `src/design/tokens.css` |
| `@font-face` da Switzer self-hosted | `src/design/fonts.css` |
| Binários da fonte | `src/design/fonts/*.woff2` |
| Mapeamento para o Tailwind | `tailwind.config.ts` |
| Utilitários derivados (`.headline-hero`, `.glass`, `.btn-turma`…) | `src/index.css` |

`tokens/tokens.css` aqui é cópia de leitura — o aviso está no topo dele.

## Paleta

| Nome | Hex | Papel |
| --- | --- | --- |
| Brand 500 | `#0FB5A3` | Primária — CTAs, links, destaque |
| Brand 600 | `#0A8C7E` | Hover, texto sobre fundo claro |
| Brand 800 | `#055449` | Painel escuro, faixa da turma |
| Brand 100 | `#D6F3EE` | Tinta de card, chips |
| Ink strong | `#1F2937` | Texto primário |
| Ink body | `#4B5563` | Texto secundário |
| Bg page | `#FFFFFF` | Fundo — o site é claro |

Rampa completa de 50 a 900 em `tokens/tokens.css`.

## Tipografia

**Switzer**, uma família só, self-hosted (ITF Free Font License 2.0 — uso
comercial e self-hosting liberados; os `.woff2` entram exatamente como
distribuídos, porque a licença trata subsetting como obra derivada).

Display em **peso 400** com tracking de `-0.04em`. Título grande em peso
regular fica arejado; em bold sobre fundo claro a página fecha.

## Forma e movimento

- Raio: pílula (`9999px`) para botões, chips e navbar; 20 / 28 / 40px para
  cartões
- Sombra no lugar de borda — `--shadow-card`, `--shadow-lift`, `--shadow-pill`
- Easing `cubic-bezier(0.22, 1, 0.36, 1)`, revelação por scroll com GSAP,
  scroll suave com Lenis

## Componentes

Não há biblioteca própria: usa os primitivos shadcn/ui de `src/components/ui/`,
tokenizados pelos valores acima. As seções da landing vivem em
`src/components/landing/` e consomem os tokens via classes Tailwind e as
utilities de `src/index.css`.

## A alternativa Emerald, que não foi adotada

Existe um export do Claude Design com paleta **Emerald `#006851`** e 27
componentes próprios, preservado em
[`../design-system-emerald/`](../design-system-emerald/README.md).

Chegou a ser aplicado num site inteiro para comparação — branch
`feat/site-emerald`, que troca cor, raio, peso de display, escala de corpo,
duração e easing, e usa `ChatBubble`/`ChatThread` nas conversas. **Não foi
escolhido.** O teal continua sendo a identidade do produto.

A biblioteca de 27 componentes segue útil: quase toda ela é vocabulário de
painel (`AgendaDay`, `AppointmentCard`, `MetricCard`, `ScoreDonut`,
`TrendChart`, `SidebarNav`, `Tabs`, `TopBar`), não de landing — material para
o painel da Secretária Invisível, não para esta página.

## Relação com o outro sistema

| | `design-system-2/` (este) | [`design-system/`](../design-system/README.md) |
| --- | --- | --- |
| Dono | Secretária Invisível, o produto | Sapient.IA, a agência |
| Cor | Teal `#0FB5A3` | Roxo `#7c3aed` → ciano `#06b6d4` |
| Fundo | Claro | Escuro por padrão, claro alternável |
| Estado | **É o tema do site** | Espelho da marca-mãe |
| Onde vive | este repositório | sapientiabr.cloud |

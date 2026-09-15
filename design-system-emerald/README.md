# design-system-emerald/ — avaliado, não adotado

Export do Claude Design para a Secretária Invisível, paleta **Emerald Green
`#006851`**, com 27 componentes próprios, tokens e guidelines.

**Não é o sistema do produto.** O sistema em uso é o
[`design-system-2/`](../design-system-2/README.md) — teal `#0FB5A3`. Esta
pasta fica como material avaliado e disponível, não como alternativa pendente.

## Por que está aqui

Foi aplicado num site inteiro para comparação lado a lado com o teal: branch
**`feat/site-emerald`**, servida em paralelo durante a avaliação. O que a
aplicação trocava, além da cor:

| | Teal (adotado) | Emerald (avaliado) |
| --- | --- | --- |
| Raio md / lg / xl | 20 / 28 / 40px | 10 / 14 / 16px |
| Peso do display | 400 | 500 |
| Tracking | −0,04em | −0,03em |
| Duração rápida / base | 350 / 700ms | 140 / 220ms |
| Escala de corpo | nove tamanhos avulsos | 17 / 15 / 13 / 11px |
| Conversas | balões próprios | `ChatBubble` / `ChatThread` |

A decisão foi manter o teal. A branch segue no repositório para quem quiser
rever a comparação.

## O que continua valendo aqui

A biblioteca de 27 componentes é quase toda **vocabulário de painel**, não de
landing page:

```text
core/        Avatar, Badge, Button, Card, Icon, IconButton, Logo, SectionLabel, Tag
forms/       Checkbox, Input, Radio, Select, Switch
navigation/  SidebarNav, Tabs, TopBar
data/        EmptySlot, InsightCard, ListRow, MetricCard, ScoreDonut, TrendChart
product/     AgendaDay, AppointmentCard, ChatBubble, ChatThread
```

`AgendaDay`, `AppointmentCard`, `MetricCard`, `ScoreDonut`, `TrendChart`,
`SidebarNav` e `TopBar` são peças de um painel — exatamente o "futuro painel"
que o `AGENTS.md` menciona. Se esse painel for construído, é daqui que os
componentes saem, e aí a questão da paleta volta a ser legítima.

## Mapa

```text
design-system-emerald/
├── tokens/         cor, tipografia, espaçamento, raio, elevação, movimento
│   └── index.css   barrel — tudo escopado em `.ds-root`
├── components/     os 27, em TSX
├── index.ts        barrel de componentes
├── assets/         logo-si-mark.png, Switzer (.woff2)
├── lint/           adherence.oxlintrc.json, do export original
└── reference/      HTMLs de referência visual; não são componentes
```

Demonstrável na rota `/design-system-showcase`.

## Proveniência

Export do Claude Design construído a partir de um board de identidade de 18
pranchas. A logomarca de referência do board pertence a outra empresa e **não
foi reproduzida** — só o sistema visual (cor, tipo, espaçamento, raio, sombra,
composição) foi aproveitado. A marca em `assets/logo-si-mark.png` é a da
Secretária Invisível.

A fonte nomeada no export original é paga e não veio com binários; o projeto
usa Switzer, que já estava self-hosted aqui.

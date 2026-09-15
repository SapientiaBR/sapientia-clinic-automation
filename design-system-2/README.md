# design-system-2/ — Secretária Invisível (o produto)

Este é o design system da **Secretária Invisível**. O da Sapient.IA, a
agência, é o [`design-system/`](../design-system/README.md) — roxo, e não
deve ser aplicado aqui.

Origem: export do Claude Design (`design-system-export`), paleta **Emerald
Green**. Contrato visual mais amplo em [`../DESIGN.md`](../DESIGN.md).

## Mapa

```text
design-system-2/
├── tokens/         CSS dos tokens, escopados em `.ds-root`
│   └── index.css   barrel — importe só este arquivo
├── components/     27 componentes em TSX
│   ├── core/       Avatar, Badge, Button, Card, Icon, IconButton, Logo, SectionLabel, Tag
│   ├── forms/      Checkbox, Input, Radio, Select, Switch
│   ├── navigation/ SidebarNav, Tabs, TopBar
│   ├── data/       EmptySlot, InsightCard, ListRow, MetricCard, ScoreDonut, TrendChart
│   └── product/    AgendaDay, AppointmentCard, ChatBubble, ChatThread
├── index.ts        barrel — re-exporta todos os componentes
├── assets/         logo-si-mark.png, Switzer (.woff2)
├── lint/           adherence.oxlintrc.json — do export original
└── reference/      HTMLs de referência visual; não são componentes
```

## Paleta

| Nome | Hex | Papel |
| --- | --- | --- |
| Emerald 700 | `#006851` | Cor primária — CTAs, links, destaque |
| Emerald 800/900 | `#00543F` / `#003D2F` | Hover, fundos escuros |
| Emerald 100 (mint) | `#DBF9F1` | Superfície lavada, chips |
| Teal | `#1BBFBA` | Acento, status |
| Gray 900 | `#292929` | Texto primário |
| Ghost | `#F8F9FE` | Fundo de seção |

Rampa emerald completa de 050 a 900, mais teal, slate e a escala de cinzas —
em `tokens/colors.css`.

Note que **este emerald não é o teal `#0FB5A3`** que o site usou até agora.
São verdes diferentes: `#006851` é mais escuro e mais fechado. A troca é
deliberada e é o que esta pasta define.

## Tipografia

**Switzer**, self-hosted. Mesma família e mesmo binário do sistema da agência —
os dois chegaram nela por caminhos independentes. Binários em `assets/`,
`@font-face` em `tokens/fonts.css`.

## Como usar

```tsx
import "@/../design-system-2/tokens/index.css"; // uma vez, no topo da árvore
import { Button, Card } from "@/../design-system-2";

function Foo() {
  return (
    <div className="ds-root">
      <Card title="Exemplo">
        <Button variant="primary">Continuar</Button>
      </Card>
    </div>
  );
}
```

Os tokens são escopados em `.ds-root` de propósito — ver `../DESIGN.md`
§ "Por que escopado em `.ds-root`" antes de promovê-los para `:root`.

## O que existia antes aqui

Até 15/09/2026 esta pasta guardava um espelho de leitura do tema teal
`#0FB5A3` com estrutura "docshield", que era o que rodava no localhost. Esse
tema não sumiu: está preservado na branch **`backup/site-docshield-teal`** e
na tag de mesmo nome, no commit `74587ea`. Os tokens dele continuam em
`src/design/tokens.css` enquanto o site não migrar.

Ele nunca chegou a ser publicado em secretariainvisivel.com.br — os três
commits que o criaram (`07a853b`, `77952aa`, `74587ea`) estão em
`feat/template-v2`, fora do `main`.

## Relação com o outro sistema

| | `design-system-2/` (este) | [`design-system/`](../design-system/README.md) |
| --- | --- | --- |
| Dono | Secretária Invisível, o produto | Sapient.IA, a agência |
| Cor | Emerald `#006851` | Roxo `#7c3aed` → ciano `#06b6d4` |
| Fundo | Claro | Escuro por padrão, claro alternável |
| Componentes | 27 próprios | nenhum (shadcn tokenizado) |
| Onde vive | este repositório | sapientiabr.cloud |

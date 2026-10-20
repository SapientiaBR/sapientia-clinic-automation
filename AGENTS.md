# AGENTS.md

Instruções para agentes de IA (Codex, Cursor, Claude Code via `CLAUDE.md` →
este arquivo, e outros) que editam este repositório.

## O projeto

Landing page + futuro painel da **Secretária Invisível** (Sapient.IA). React
18 + TypeScript + Vite + Tailwind CSS 3 + shadcn/ui. Ver
[`README.md`](README.md) para visão geral e comandos.

## Comandos

```sh
npm install
npm run dev      # vite --port 8080
npm run build
npm run lint     # eslint
npm run test     # vitest run
```

## Design system — leia antes de tocar em UI

**Duas marcas, duas pastas** (ver `DESIGN.md` § "Dois design systems"):

- [`design-system-2/`](design-system-2/README.md) — **o produto.** Teal
  `#0FB5A3`, estrutura "docshield", reusa `src/components/ui/`. **É o tema do
  site.** Os tokens de verdade estão em `src/design/tokens.css` e
  `tailwind.config.ts`; a pasta é espelho de leitura.
- [`design-system/`](design-system/README.md) — **a agência.** Roxo `#7c3aed`
  → ciano `#06b6d4`, espelho do sapientiabr.cloud. Serve para rodapé,
  assinatura e material co-branded. **Não aplique no produto.**

Há ainda [`design-system-emerald/`](design-system-emerald/README.md) — export
do Claude Design em Emerald `#006851`, com 27 componentes. Foi **avaliado e
não adotado** (comparação na branch `feat/site-emerald`). Não é alternativa
pendente; é material para o futuro painel, onde o vocabulário dele —
`AgendaDay`, `MetricCard`, `SidebarNav` — faz sentido.

- **Contrato:** [`DESIGN.md`](DESIGN.md).
- **Regra inegociável:** nenhum valor de cor, fonte, espaçamento ou raio
  hardcoded em `src/**`. Use `var(--token)` ou a classe Tailwind equivalente.
  Há lint (`no-restricted-syntax`, nível `warn`) sinalizando violações.

## Convenções

- Componentes de seção da landing: `src/components/landing/`. Primitivos de
  UI (shadcn): `src/components/ui/`. Providers/widgets globais:
  `src/components/global/`.
- Estado de interface compartilhado entre componentes distantes (a barra fixa
  do celular e o botão flutuante do WhatsApp): `src/lib/barraCelular.ts`, uma
  loja mínima com `useSyncExternalStore`. Os dois são montados em árvores
  diferentes (`App` e `Landing`), então um contexto exigiria um pai comum.
- Alias de import: `@/*` → `./src/*`.
- Idioma do conteúdo e da documentação deste repositório: português (pt-BR).

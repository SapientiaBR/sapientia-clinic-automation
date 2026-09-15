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

**Duas pastas, duas marcas diferentes** — não duas propostas para a mesma
(ver `DESIGN.md` § "Dois design systems"):

- [`design-system-2/`](design-system-2/README.md) — **o produto.** Emerald
  Green `#006851`, export do Claude Design, 27 componentes próprios,
  escopado em `.ds-root` (rota `/design-system-showcase`). **É o sistema da
  Secretária Invisível.**
- [`design-system/`](design-system/README.md) — **a agência.** Roxo `#7c3aed`
  → ciano `#06b6d4`, espelho do sapientiabr.cloud. Serve para rodapé,
  assinatura e material co-branded. **Não aplique no produto.**

- **Contrato e tokens (os dois):** [`DESIGN.md`](DESIGN.md).
- **Regra inegociável:** nenhum valor de cor, fonte, espaçamento ou raio
  hardcoded em `src/**`. Use `var(--token)` ou a classe Tailwind equivalente.
  Há lint (`no-restricted-syntax`, nível `warn`) sinalizando violações.
- **Tokens que o site carrega de fato:** `src/design/tokens.css` e
  `tailwind.config.ts`. As pastas de design system são referência; o que
  renderiza está em `src/`.
- **O teal `#0FB5A3` é história, não opção.** Foi a cor do produto até
  15/09/2026; está preservado na branch e tag `backup/site-docshield-teal`
  (commit `74587ea`). A *estrutura* que veio com ele — pílula, Switzer,
  display em peso 400 — continua valendo; só a cor mudou.

## Convenções

- Componentes de seção da landing: `src/components/landing/`. Primitivos de
  UI (shadcn): `src/components/ui/`. Providers/widgets globais:
  `src/components/global/`.
- Alias de import: `@/*` → `./src/*`.
- Idioma do conteúdo e da documentação deste repositório: português (pt-BR).

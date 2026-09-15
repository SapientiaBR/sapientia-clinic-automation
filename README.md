# Secretária Invisível

Landing page e futuro painel do cliente da **Secretária Invisível**, produto
da Sapient.IA: recepcionista de IA que atende, agenda e confirma consultas
no WhatsApp para clínicas médicas. Site em produção:
[secretariainvisivel.com.br](https://secretariainvisivel.com.br).

Projeto originalmente montado com [Lovable](https://lovable.dev) — o painel
do Lovable continua sendo um dos jeitos de editar este projeto (`.lovable/`).

## Stack

React 18 + TypeScript + Vite + Tailwind CSS 3 + shadcn/ui (Radix). Roteamento
com `react-router-dom`. Backend leve via Supabase + Drizzle (`supabase/`,
`drizzle/`).

## Rodando localmente

```sh
npm install
npm run dev        # servidor de desenvolvimento (porta 8080)
npm run build      # build de produção
npm run lint        # eslint
npm run test         # vitest
```

## Estrutura

```text
src/
├── components/
│   ├── landing/    seções da landing page (Hero, Pricing, FAQ, ...)
│   ├── global/      providers e widgets globais (cursor, WhatsApp flutuante, ...)
│   └── ui/           shadcn/ui — primitivos de UI (Button, Input, Card, ...)
├── pages/            rotas (Index, Medico, ThankYou, NotFound, DesignSystemShowcase)
└── integrations/      clientes externos (Supabase)
design-system/          design system Emerald (export do Claude Design) — ver design-system/README.md
design-system-2/        design system teal/docshield — o que está publicado hoje — ver design-system-2/README.md
```

## Design system

**Duas bibliotecas** — o projeto está entre duas direções visuais, ambas
documentadas, nenhuma apagada. Contrato completo e o porquê:
[`DESIGN.md`](DESIGN.md).

- [`design-system/`](design-system/README.md) — Emerald Green, 27
  componentes próprios, disponível na rota `/design-system-showcase`
  (todos os componentes, variantes, estados e os dois temas).
- [`design-system-2/`](design-system-2/README.md) — teal, estrutura
  "docshield", reusa `src/components/ui/`. **É o tema do site publicado.**

## Instruções para agentes

Convenções, comandos e o contrato de design system para agentes de IA que
editam este repositório: [`AGENTS.md`](AGENTS.md).

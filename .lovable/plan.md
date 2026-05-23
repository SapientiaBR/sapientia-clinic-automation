# Plano: Compactar cards da seção "Problema" no mobile

Objetivo: caber **3 cards + footnote** em uma única tela mobile (~844px de altura, descontando header).

## Mudanças em `Problems.tsx` (só mobile, desktop intacto)

### 1. Seção
- Reduzir padding vertical: `section-padding` → no mobile `py-12` (desktop mantém via `md:section-padding`).
- Header: reduzir `mb-14` → `mb-6 md:mb-14`.
- Headline mobile menor: já é `text-3xl`, ok. Subtítulo: encurtar margem `mt-5` → `mt-3 md:mt-5`.
- Parágrafo do header: esconder no mobile (`hidden md:block`) — economiza ~80px e o título já comunica.

### 2. Grid de cards
- Gap menor: `gap-6` → `gap-3 md:gap-6`.

### 3. Cada card (compacto no mobile)
- Padding: `p-7` → `p-4 md:p-7`.
- Ícone: `w-12 h-12 mb-5` → `w-9 h-9 mb-3 md:w-12 md:h-12 md:mb-5`; ícone size 22 → manter (lucide aceita prop, deixar como está, é OK visualmente).
- Número grande: `text-[52px]` → `text-[34px] md:text-[52px]`.
- Label: `text-[15px] mt-2` → `text-[13px] mt-1 md:text-[15px] md:mt-2`.
- Descrição: esconder no mobile (`hidden md:block`) — é o maior consumidor vertical. O número + label já entregam o ponto.

### 4. Footnote
- Margin: `mt-10` → `mt-5 md:mt-10`.
- Tamanho: já `text-[11px]`, manter.

### 5. Layout horizontal alternativo no card (opcional, não vou adotar)
Considerei colocar ícone + número lado a lado no mobile, mas perde impacto visual. A solução acima (ocultar descrição + reduzir paddings/tamanhos) é mais limpa e mantém hierarquia.

## Estimativa de altura mobile pós-mudança
- Header (h2 + eyebrow): ~140px
- 3 cards × ~110px + 2 gaps × 12px = ~354px
- Footnote: ~50px
- Padding seção (py-12 = 96px total): 96px
- **Total ≈ 640px** → cabe folgado em 844px de viewport (sobra para header fixo).

## Fora de escopo
- Sem mudar desktop.
- Sem mexer em animações GSAP (só altero classes Tailwind nos mesmos nós).
- Sem mudar copy.

## Arquivo afetado
- `src/components/landing/Problems.tsx`

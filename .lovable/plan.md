# Plano: Refinar cards mobile da seção "Problema"

Dois ajustes em `Problems.tsx`:

## 1. Footnote por trás do card

O sobreposição acontece porque o padding inferior da seção ficou curto e o `<p>` está colado nos cards. Ajustar:
- Wrapper da seção: `py-12` → `py-12 pb-16` no mobile (mantém desktop em `md:section-padding`).
- Footnote: `mt-5` → `mt-8 md:mt-10`.
- Garantir `position: relative` no `<p>` da footnote (adicionar `relative z-10`) para nunca ficar atrás de qualquer efeito de glow dos cards.

## 2. Layout do card no mobile

Trocar layout vertical empilhado por **layout horizontal compacto**: ícone à esquerda, número + label à direita, descrição embaixo ocupando a largura toda.

Estrutura nova (mobile only, desktop mantém vertical via `md:` resets):

```
[ícone]  63%
         podem desistir em 5 minutos
Até 63% dos pacientes não esperam mais que 5 min por
uma resposta antes de procurar outra clínica.
```

Detalhes:
- Card padding: `p-4 md:p-7`.
- Top row: `flex items-center gap-4 md:block`.
- Ícone: `w-11 h-11 shrink-0 mb-0 md:mb-5 md:w-12 md:h-12`.
- Número: `text-[28px] md:text-[52px]` e label: `text-[12px] md:text-[15px]`. Ambos dentro de um `<div className="flex-1 md:contents">` — no mobile ficam empilhados à direita do ícone, no desktop voltam ao fluxo normal abaixo do ícone.
- **Restaurar descrição** sem `hidden md:block`: `mt-3 text-[13px] md:text-sm leading-snug md:leading-relaxed text-[var(--text-muted)]`. Fica visível em mobile e desktop.

## 3. Estimativa nova de altura mobile
- Header (compacto, sem subtítulo): ~110px
- 3 cards × ~140px + 2 gaps × 12px = ~444px
- Footnote: ~60px
- Padding seção (py-12 + pb-16): ~112px
- **Total ≈ 726px** — ainda cabe em 844px com folga.

## Fora de escopo
- Desktop sem mudança visível além do que já estava (vertical, descrição visível).
- Sem mexer em animações ou copy.

## Arquivo afetado
- `src/components/landing/Problems.tsx`

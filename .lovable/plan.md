

# Watermark em Todas as Seções

Adicionar `<div className="logo-watermark" />` dentro de um container `absolute inset-0 pointer-events-none` em todas as seções que ainda não possuem. Também garantir `relative` na tag `<section>`.

## Seções que já têm
- Aggravation, Visualization, FinalCTA

## Seções a adicionar
1. **Hero.tsx** — adicionar dentro do div de background effects existente
2. **Problems.tsx** — adicionar wrapper de background + watermark (seção precisa de `relative`)
3. **Solutions.tsx** — adicionar wrapper de background + watermark
4. **HowItWorks.tsx** — adicionar wrapper de background + watermark
5. **FAQ.tsx** — adicionar wrapper de background + watermark
6. **SocialProof.tsx** — adicionar wrapper de background + watermark

Cada seção recebe um `<div className="absolute inset-0 pointer-events-none"><div className="logo-watermark" /></div>` e a section tag ganha `relative` se ainda não tiver.


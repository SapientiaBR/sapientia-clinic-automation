# Otimização Mobile + Remoção do Badge Lovable

## 1. Badge "Edit with Lovable" — JÁ REMOVIDO
Configuração de publish já foi atualizada (`hide_badge: true`). O badge somem do site publicado em ~30s. Nenhuma alteração de código necessária.

## 2. Performance Mobile

O viewport mobile atual é 647×1785 com devicePixelRatio 2.8125 — qualquer blur grande é renderizado em ~3x a resolução, o que trava scroll. Encontrei os principais gargalos:

### Gargalos identificados
- **8 "orbs" decorativos** com `blur-[140px]` a `blur-[180px]` em divs de 500-800px (Hero, SocialProof, Solutions, Visualization, LossCalculator, HowItWorks, FinalCTA, LeadForm). Cada um custa caro no compositor.
- **`.glass` / `.glass-card`** usa `backdrop-filter: blur(24px)` em vários cards (mockup do Hero, badges, etc).
- **Header fixo** com `backdrop-blur-2xl` (40px) repintado em cada scroll.
- **Animações infinitas** rodando sempre: `animate-float` (mockup do WhatsApp), `animate-ping` (badge do Hero), `animate-typing` (3 dots).

### Mudanças propostas

**a) Esconder os orbs de blur em telas <md (mobile/tablet pequeno)**
Adicionar `hidden md:block` em todos os 8 divs decorativos com `blur-[...]`. No mobile o efeito mal aparece e o custo é altíssimo.

**b) Desabilitar backdrop-filter no mobile**
Em `src/index.css`, dentro de `.glass` e na regra do header, envolver o `backdrop-filter` em `@media (min-width: 768px)`. Manter apenas o background semi-transparente no mobile.

**c) Pausar animações pesadas no mobile**
- `animate-float` do mockup WhatsApp: adicionar classe condicional para desabilitar abaixo de `md`.
- `animate-ping` do badge "Exclusivo para Clínicas": idem (manter só o ponto estático).
- Manter `animate-typing` (custo baixo, é só opacidade).

**d) `will-change` / `transform: translateZ(0)`**
Adicionar `transform: translateZ(0)` no header fixo para promover a layer e evitar repaint do conteúdo abaixo durante scroll.

### Resultado esperado
- Scroll fluido no mobile (sem janks ao passar pelas seções com orbs).
- Header sem lag ao scrollar.
- Visual desktop permanece idêntico.

## Arquivos alterados
- `src/index.css` — media query no `.glass` backdrop-filter
- `src/components/landing/Header.tsx` — backdrop-blur só em md+, translateZ
- `src/components/landing/Hero.tsx` — orbs `hidden md:block`, float só em md+, ping só em md+
- `src/components/landing/SocialProof.tsx`, `Solutions.tsx`, `Visualization.tsx`, `LossCalculator.tsx`, `HowItWorks.tsx`, `FinalCTA.tsx`, `LeadForm.tsx` — orbs `hidden md:block`

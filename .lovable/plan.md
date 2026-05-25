## Objetivo

Adicionar uma camada de motion premium e sutil sobre a LP atual, sem alterar copy, estrutura ou fluxo. Reaproveitar a infra existente (`src/lib/animations.ts`, `data-reveal`, GSAP + ScrollTrigger, `ScrollProgress`, `countUp/countTo`) e preencher as lacunas pedidas: parallax no hero, hover lift padronizado, sequência de mensagens no mockup, count-up em métricas, transição suave na calculadora, e respeito global a `prefers-reduced-motion`.

## Princípios (tokens de motion)

- Duração: 600–1000ms (`0.6s`–`1.0s`)
- Easing premium: `cubic-bezier(0.22, 1, 0.36, 1)` → registrar como `EASE_PREMIUM` em GSAP (`CustomEase`) e como `--ease-premium` em CSS
- Deslocamentos: 8–28px (substitui o `y: 60` atual por `y: 20–24` no desktop, `y: 12` no mobile)
- Blur de entrada: `filter: blur(6px) → blur(0)`
- Sem bounce, sem rotação > 2°, sem neon
- `prefers-reduced-motion: reduce` desativa tudo

## Mudanças por arquivo

### 1. `src/lib/animations.ts`
- Adicionar checagem global `prefersReducedMotion()` e curto-circuitar `revealOnScroll`, `countUp`, `countTo` (callback recebe valor final imediatamente).
- Registrar `EASE_PREMIUM = "cubic-bezier(0.22,1,0.36,1)"` (via `CustomEase.create`) e exportar.
- Atualizar `revealOnScroll`: `y: 20` (desktop) / `y: 12` (mobile), `duration: 0.8` / `0.7`, `filter: "blur(6px)"` → `blur(0)`, `stagger: 0.08` / `0.05`, `ease: EASE_PREMIUM`. Manter `once: true`, `fastScrollEnd: true`.
- Novo helper `parallaxY(el, { from, to, scrub })` para o hero (mobile-aware, desabilitado em `(max-width: 767px)` para evitar jank).
- Novo helper `hoverLift(el)` opcional (apenas adiciona/remove classes; o efeito real fica em CSS).

### 2. `src/index.css`
- Adicionar tokens:
  ```css
  :root {
    --ease-premium: cubic-bezier(0.22, 1, 0.36, 1);
    --dur-base: 700ms;
    --shadow-lift: 0 24px 60px rgba(70,55,35,0.14);
  }
  ```
- Utilities:
  - `.lift-card` → `transition: transform var(--dur-base) var(--ease-premium), box-shadow var(--dur-base) var(--ease-premium), border-color var(--dur-base) var(--ease-premium); will-change: transform;` + `:hover { transform: translateY(-4px); box-shadow: var(--shadow-lift); border-color: #DDBB8C; }`
  - `.reveal-init` (estado inicial opcional p/ evitar flash antes do GSAP montar)
- Reduced motion global:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
    }
    .lift-card:hover { transform: none; }
  }
  ```

### 3. `src/components/global/ScrollProgress.tsx`
- Garantir que a barra usa gradiente lavanda→ciano→bege (`#8A7CF6 → #22BFEA → #D4A76A`), altura 2px, posição fixa no topo do canvas, `z-index` acima do header. Suavizar com `transform: scaleX()` + `transition` em vez de re-render por pixel.

### 4. `src/components/landing/Hero.tsx`
- Adicionar parallax no `useEffect` com `gsap.matchMedia` (apenas `min-width: 768px`):
  - Curva orgânica bege: `yPercent: -8`, `scrub: 0.6`
  - Mockup WhatsApp: `yPercent: -4`
  - Mini-cards (`confirmado`, `3s`, `+14 consultas`, `online`): `y: -12 … -24` com velocidades distintas e `scrub: 0.8`
- Hero entry timeline (uma vez no mount): badge → headline (linhas com `SplitText` simples por span já existente ou stagger por palavra) → subhead → CTA → mockup, com `y: 20`, `blur(6px)→0`, `duration: 0.9`, `EASE_PREMIUM`, `stagger: 0.08`.
- Sequência de mensagens do mockup: cada bubble entra com `opacity 0 → 1`, `y: 8 → 0`, intervalo de ~450ms, usando timeline GSAP disparada após o hero entry (e re-disparada via IntersectionObserver caso saia/entre da viewport — apenas uma vez).
- Mini-cards flutuantes: animação contínua sutil `y: ±4px` com `yoyo: true`, `duration: 3.2`, `ease: "sine.inOut"`, desativada em mobile e em reduced-motion.

### 5. `src/components/landing/LossCalculator.tsx`
- Já usa `countTo`. Ajustar para `EASE_PREMIUM` e `duration: 0.7`. Garantir que o valor monetário tem `tabular-nums` para evitar reflow de largura.
- Trilha do slider: transição já em CSS — adicionar `transition: background var(--dur-base) var(--ease-premium)`.

### 6. Count-up em métricas
- Aplicar `countUp` (com IntersectionObserver/ScrollTrigger `once: true`) nos números-chave de:
  - `SocialProof.tsx` (estatísticas)
  - `Problems.tsx` (R$23.000, %)
  - `FinalCTA.tsx` (se houver número de garantia)
- Duração 1.4–1.8s, `EASE_PREMIUM`. Texto envolto por `<span data-countup data-target="23000" data-prefix="R$ ">`. Hook único `useCountUpOnView(ref, target)` em `src/hooks/useCountUpOnView.ts` para evitar duplicação.

### 7. Hover lift nos cards
- Substituir hovers atuais por classe `.lift-card` em:
  - `Solutions.tsx`, `Problems.tsx`, `Method.tsx`, `HowItWorks.tsx`, `SocialProof.tsx` (cards de testimonial), `FAQ.tsx` (itens), `Visualization.tsx`, `FinalCTA.tsx` (garantia).
- Remover hovers conflitantes (transform/scale agressivos) onde existirem.

### 8. Reveal padronizado
- Garantir `data-reveal` em headers de seção, eyebrows, primeiro parágrafo e grids de cards onde ainda não há. Não criar novos blocos; apenas anotar elementos existentes.

## Estrutura técnica

```text
src/
  index.css                       (tokens motion + .lift-card + reduced-motion global)
  hooks/
    useCountUpOnView.ts           (novo)
  lib/
    animations.ts                 (EASE_PREMIUM, parallaxY, reduced-motion guard)
  components/
    global/ScrollProgress.tsx     (gradiente lavanda→ciano→bege)
    landing/
      Hero.tsx                    (parallax, entry timeline, mensagens sequenciais, float mini-cards)
      LossCalculator.tsx          (easing premium + tabular-nums)
      SocialProof.tsx             (countUp)
      Problems.tsx                (countUp + lift-card)
      Solutions.tsx               (lift-card)
      Method.tsx                  (lift-card)
      HowItWorks.tsx              (lift-card)
      FAQ.tsx                     (lift-card sutil em itens)
      Visualization.tsx           (lift-card)
      FinalCTA.tsx                (lift-card + countUp se aplicável)
```

## Performance e acessibilidade

- Tudo gated por `prefers-reduced-motion` (CSS global + early return nos helpers GSAP).
- Parallax e float contínuo desabilitados em `(max-width: 767px)`.
- `will-change: transform` apenas em elementos com hover-lift ativo (não em todos os cards permanentes).
- ScrollTriggers `once: true` mantidos; nenhum novo listener de scroll JS fora do GSAP.
- Contadores usam `tabular-nums` para não causar reflow de layout.

## Fora do escopo

- Copy, estrutura de seções, rotas, lógica do formulário/Meta Pixel/n8n.
- Mudanças de paleta ou tipografia (apenas o gradiente da scroll bar é confirmado).

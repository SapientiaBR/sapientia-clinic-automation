## Objetivo

Alinhar todas as animações do site às novas regras: GSAP como motor único, Lenis governando o scroll, easings/durações/stagger padronizados e diferenciação clara desktop/mobile.

## Diagnóstico atual

- **framer-motion** é usado em 10 componentes (Hero, Problems, Solutions, Visualization, LossCalculator, FAQ, SocialProof, HowItWorks, LeadForm, FloatingWhatsApp).
- **Lenis** já existe (`LenisProvider`), mas roda isolado — não há ponte com `gsap.ticker`/`ScrollTrigger`.
- **`window.addEventListener('scroll')`** em `Header.tsx` (estado `scrolled`) e `ScrollProgress.tsx` (barra de progresso). Ambos precisam virar Lenis subscribers.
- **CSS transitions** para entradas: `animate-fade-in`, `transition-all`, hovers de cards. Hovers podem ficar; entradas de conteúdo viram GSAP.
- **`gsap` ainda não está instalado**.

## Mudanças

### 1. Setup
- Instalar `gsap` e `@gsap/react` (`useGSAP`).
- Atualizar `LenisProvider`:
  - Registrar `ScrollTrigger`.
  - Substituir o RAF próprio por `gsap.ticker.add` chamando `lenis.raf(time * 1000)`.
  - `gsap.ticker.lagSmoothing(0)`.
  - `ScrollTrigger.normalizeScroll(false)`.
  - Em `lenis.on('scroll', ScrollTrigger.update)`.
  - `ScrollTrigger.refresh()` após `document.fonts.ready` e em `window.load`.

### 2. Helpers compartilhados
- `src/lib/animations.ts`:
  - Constantes: `EASE = 'power3.out'`, `EASE_INOUT = 'power3.inOut'`, `STAGGER = 0.2`, `DURATION = 0.7`.
  - `revealUp(target, opts)` — preset `{ y: 60, opacity: 0 } → { y: 0, opacity: 1 }`.
  - `countUp(obj, to, opts)` — proxy `{ val: 0 }` + `onUpdate`.
- Hook `useReveal()` (wrapper sobre `useGSAP` + `matchMedia`) para padronizar entradas com `ScrollTrigger`.

### 3. Migração componente a componente
Para cada um dos 10 componentes:
- Remover imports de `framer-motion`.
- Trocar `motion.*` por elementos nativos com `ref`.
- Trocar `initial/whileInView/transition` por `useGSAP` + `ScrollTrigger` chamando `revealUp` com stagger 0.2s (0.1s no mobile via `matchMedia`).
- Tensão antes do primeiro reveal do Hero: delay 0.7s.
- Counters de `Problems.tsx` e `LossCalculator.tsx` reescritos com proxy GSAP (substitui `useCounter`/`useCountUp`).

### 4. Scroll listeners
- `Header.tsx`: usar `lenis.on('scroll', ({ scroll }) => setScrolled(scroll > 20))` via contexto exposto pelo `LenisProvider` (criar `useLenis()` hook simples).
- `ScrollProgress.tsx`: mesma fonte, calcular progresso a partir do evento do Lenis.

### 5. Mobile
- Em todos os reveals, `gsap.matchMedia()` com breakpoints `(min-width: 768px)` e `(max-width: 767px)`.
- Mobile: stagger ≤ 0.1s, sem `scrub`, sem `pin`. Retornar cleanup chamando `mm.revert()`.
- Manter o skip atual de `HowItWorks`/`Visualization` no mobile (já feito em `Index.tsx`).

### 6. Limpeza
- Remover `framer-motion` do `package.json` ao final.
- Remover hooks obsoletos: `useCountUp.ts`, `useScrollAnimation.ts` (substituídos pelos novos helpers).
- Manter `animate-fade-in`/`animate-accordion-*` apenas onde servem a UI primitives (menu mobile, Radix accordion) — esses não são "entrada de conteúdo".

## Detalhes técnicos

```text
LenisProvider
  ├─ new Lenis({ duration: 1.05, easing })
  ├─ ScrollTrigger.normalizeScroll(false)
  ├─ lenis.on('scroll', ScrollTrigger.update)
  ├─ gsap.ticker.add((t) => lenis.raf(t * 1000))
  └─ context.Provider value={lenis}
       ├─ useLenis() → Header (scrolled), ScrollProgress (progress)
       └─ useReveal() → cada section com ScrollTrigger start: 'top 80%'
```

Padrão por seção:
```ts
useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add('(min-width: 768px)', () => {
    gsap.from('[data-reveal]', {
      y: 60, opacity: 0, duration: 0.7, ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    });
  });
  mm.add('(max-width: 767px)', () => {
    gsap.from('[data-reveal]', {
      y: 30, opacity: 0, duration: 0.6, ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: ref.current, start: 'top 90%' },
    });
  });
  return () => mm.revert();
}, { scope: ref });
```

## Fora de escopo

- Pin sections / split text avançado (não há nenhuma hoje; regras ficam documentadas para uso futuro).
- Mudanças visuais/conteúdo. Refatoração é puramente de motor de animação.
- Reescrita do `LeadForm` (animações dele são triviais; só remover `motion.div` por `div`).

## Riscos

- Layout shift se `ScrollTrigger.refresh()` não rodar após fontes carregarem → mitigado no provider.
- `useGSAP` precisa de `scope` correto em cada componente para cleanup confiável.
- Header escutava `scroll` cedo (antes do Lenis montar). Garantir que `useLenis()` lida com `null` inicial.

# Rebuild — Secretária Invisível landing

Full visual + copy rebuild of `/` with new design system, new multi-step form, and 10 ordered sections. Preserve `/obrigado` routing, Meta Pixel, WhatsApp float, n8n webhook integration, and existing animation logic (scroll reveals, count-ups, parallax, chat stagger).

## Global setup

**Fonts** — add Cormorant Garamond, DM Sans, JetBrains Mono via Google Fonts in `index.html`. Wire Tailwind families: `font-display` (Cormorant), `font-sans` (DM Sans), `font-mono` (JetBrains).

**Tokens** — rewrite `src/index.css` with new palette (`--navy-0..3`, `--purple`, `--cyan`, `--neon`, `--grad`, `--grad-text`, `--text`, `--text-muted`, `--text-dim`). Update `tailwind.config.ts` with matching color keys. Replace existing purple/cyan tokens; remove unused accent ramp (coral/rose/amber/etc.) since new design only uses purple+cyan+neon.

**Global heading rule** — keep existing `h1 em, h2 em` gradient italic rule, retune to new `--grad-text`.

**Reusable primitives** (new under `src/components/ui/`):
- `Eyebrow` — JetBrains Mono 11px uppercase `// keyword` label
- `SectionTitle` — Cormorant Garamond, slot-based with `<em>` for keyword
- `PrimaryButton` / `GhostButton` — gradient + magnetic hover (mouse-follow lerp)
- `Card` — navy-2 bg + 1px gradient top accent + hover border glow

**Global UX layer** (new `src/components/global/`):
- `LenisProvider` — install `lenis`, mount once in `App.tsx`
- `ScrollProgress` — fixed top gradient line
- `CustomCursor` — desktop-only dot+trail
- Keep existing `FloatingWhatsApp` (verify link + green color), Header re-skinned

**Install**: `lenis` (smooth scroll). Framer Motion already present.

## Sections (replace `src/components/landing/*`)

1. **Hero** — refactor existing `Hero.tsx`. Keep WhatsApp chat stagger animation + counter. New copy ("R$23.000/mês" italic gradient, "Um produto Sapient.IA" line, badge with pulse dot). Add 4 floating notification cards around phone (Framer Motion slow-float, staggered delays). Background orbs + grid overlay.
2. **Problema** (replaces `Problems.tsx`) — 3 stat cards with count-up (63%, R$2.800, 34%), icons in glow circles, gradient top borders.
3. **Como Funciona** (replaces `HowItWorks.tsx`) — 3-step timeline with large translucent step numbers, mini phone mockup per step.
4. **Diferença Invisível** (replaces `Visualization.tsx`) — split-screen chaos vs calm; reuse existing animation, restyle to navy-2 cards.
5. **Recursos** (replaces `Solutions.tsx`) — 4-item bento grid with per-card hover micro-interactions.
6. **Formulário Multi-step** (replaces `LeadForm.tsx`) — new component, 3 steps:
   - Step 1: 4 option buttons → auto-advance, save `desafio`
   - Step 2: 4 option buttons → auto-advance, save `volume`, "← Voltar"
   - Step 3: nome + whatsapp inputs (zod validation, length caps), submit
   - Top progress bar (thin gradient, "Etapa X de 3"), AnimatePresence between steps
   - On submit: POST to existing n8n webhook with `{ nome, whatsapp, desafio, volume, origem: "landing-page-multistep" }`, redirect to `/obrigado` on success, inline error preserving state on failure
   - Footer line: LGPD/zero spam
7. **Calculadora ROI** (replaces `LossCalculator.tsx`) — 3 sliders (atendimentos 50–500, % perda 1–30, ticket editável default 250). Output `atendimentos × (perda/100) × ticket`, count-up via rAF, capped with `Math.min(result, atendimentos × ticket)`. Pulsing CTA scrolls to form.
8. **Depoimentos** (replaces `SocialProof.tsx`) — single Mariana Fogarolli card with parallax depth, big decorative quote glyph, gradient avatar.
9. **FAQ** — keep Radix accordion in `FAQ.tsx`, replace 6 Q&As verbatim, restyle items, "+/−" cyan icon. Update FAQ JSON-LD in `Index.tsx` to match new content.
10. **CTA Final** (new, replaces removed `FinalCTA`) — centered headline, large radial purple glow, primary CTA scrolling to form.

## Order (mobile-first)

`Index.tsx` order: Header → Hero → **LeadForm (form right after hero)** → Problema → Como Funciona → Diferença → Recursos → Calculadora → Depoimentos → FAQ → CTA Final → Footer. Lazy-load everything below the form via `React.lazy` + `Suspense` (preserves current pattern).

## Preserve

- `/obrigado` route + `ThankYou.tsx` untouched
- Meta Pixel `<noscript>` in `<body>` (per project memory) untouched
- WhatsApp link `https://wa.me/5511920795583`
- n8n webhook URL
- `react-helmet-async` `<HelmetProvider>` and per-route `<Helmet>`; update `<title>`, meta description, keywords on Index per spec; keep canonical, og:url, FAQ JSON-LD (refresh entities to new copy)
- `public/sitemap.xml`, `robots.txt`, `llms.txt` as-is
- Forbidden-phrase rules: avoid "sem fidelidade"/"sem multa"/"replace employees" — **note**: spec's FAQ "Como funciona o contrato?" answer contains "Sem fidelidade mínima". I'll soften to "Contrato mensal flexível, cancelamento por e-mail com 30 dias de antecedência." to honor the project memory constraint. Flagging for confirmation if you want the literal text instead.

## Technical notes

- Magnetic hover: small `useMagnetic` hook with `mousemove` + `requestAnimationFrame` lerp on transform.
- Scroll reveals: keep `useScrollAnimation` IntersectionObserver hook; wrap entries with Framer Motion `initial={{opacity:0, filter:'blur(8px)'}} whileInView={{opacity:1, filter:'blur(0)'}}`.
- Lenis: simple raf loop in provider, respects `prefers-reduced-motion`.
- Custom cursor + heavy orbs: gated to `lg:` and `(pointer: fine)` to protect mobile perf (consistent with current Hero pattern).
- Form: zod schema (nome 1–100, whatsapp 8–20 chars), no console logging of PII.

## Files

**Edit**: `index.html`, `src/index.css`, `tailwind.config.ts`, `src/App.tsx`, `src/main.tsx` (verify), `src/pages/Index.tsx`, `src/components/landing/Header.tsx`, `Hero.tsx`, `Problems.tsx`, `HowItWorks.tsx`, `Visualization.tsx`, `Solutions.tsx`, `LeadForm.tsx`, `LossCalculator.tsx`, `SocialProof.tsx`, `Founder.tsx` (remove from page), `FAQ.tsx`, `Footer.tsx`.

**New**: `src/components/landing/FinalCTA.tsx` (re-create), `src/components/global/{LenisProvider,ScrollProgress,CustomCursor}.tsx`, `src/components/ui/{Eyebrow,SectionTitle,MagneticButton,FloatCard}.tsx`, `src/hooks/useMagnetic.ts`.

**Install**: `lenis`.

**Delete**: none (keep `Founder.tsx` file unused in case of future use, or delete — say the word).

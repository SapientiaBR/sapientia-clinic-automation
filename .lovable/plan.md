## Objetivo

Subir o desempenho mobile (hoje 66 no PageSpeed, LCP 15,1s) priorizando iPhone. Focar no que os insights apontaram: entrega de imagens, render-blocking, JS legado e cache.

---

## 1. Imagem do hero (causa principal do LCP 15,1s)

A foto `hero-bg-doctor.png` tem **1,48 MB** em PNG. É a maior solicitação e a candidata a LCP no mobile mesmo escondida atrás de máscara.

- Converter o asset para **WebP otimizado** (qualidade ~78, ~150–250 KB) e re-upload via `lovable-assets`.
- No mobile, em vez de baixar a foto grande, usar uma **versão pequena dedicada** (max-width 480px, ~40 KB) — o desktop continua com a versão maior.
- Adicionar `<link rel="preload" as="image" ...>` no `index.html` apontando para a versão mobile, com `media="(max-width: 767px)"` e `fetchpriority="high"`.
- No `Hero.tsx`, trocar `background-image` por elemento `<img>` real (com `width`, `height`, `loading="eager"`, `decoding="async"`, `fetchpriority="high"`) posicionado absolutamente. Isso permite que o navegador descubra o LCP imediatamente (resolve "Descoberta de solicitações de LCP" e "Os elementos de imagem não têm width e height").

## 2. OG image e favicons

- Recomprimir `public/og-image.jpg` (35 KB já está ok, manter).
- Apple touch icon e android-chrome PNG (25 KB / 95 KB) já estão razoáveis — sem mudança.

## 3. Render-blocking (economia 490 ms)

A folha de estilo do Google Fonts é render-blocking.
- Trocar o `<link rel="stylesheet">` do Google Fonts por padrão **preload + onload swap** (`rel="preload" as="style" onload="this.rel='stylesheet'"`), com `<noscript>` de fallback.
- Reduzir pesos carregados: hoje carrega DM Sans 400/500/700 + italic 400 e Manrope 500/600/700/800. Cortar para **DM Sans 400/500 + Manrope 600/700/800** (o site não usa italic nem 500 do Manrope).

## 4. Cache / ciclos de vida (economia 162 KB)

- `public/_headers` (Lovable serve assets estáticos) — adicionar `Cache-Control: public, max-age=31536000, immutable` para `/assets/*`, `/favicons/*`, fontes e og-image. Arquivos com hash do Vite já podem ser long-cache; o `index.html` mantém `no-cache`.

## 5. JavaScript legado / não usado (306 KB + 13 KB)

- Em `vite.config.ts`, subir o `build.target` de `es2020` para `es2022` (Safari 16+, Chrome 94+) — reduz polyfills para iOS recentes, alvo principal.
- Code-split manual de libs pesadas no `Index.tsx`: garantir que `gsap/ScrollTrigger`, `lenis` e seções abaixo da dobra (Pricing, FAQ, LossCalculator, Visualization, RealConversations, VideoDemo, SocialProof) sejam **lazy** com `React.lazy` + `Suspense`. Hero, Header e PositioningStatement ficam síncronos.
- `CustomCursor` e `LenisProvider` já desligam em mobile/reduced-motion, mas o JS ainda é baixado. Importar ambos via `React.lazy` para que o bundle inicial mobile não os contenha.

## 6. Reflow forçado / DOM

- No `Hero.tsx`, remover o segundo `<div>` mobile com `background-image` separado — usaremos a mesma `<img>` com `srcset`/`sizes` responsivos.
- Conferir que `body { background-color: #EEF2F4 }` não cria layout extra.

## 7. Viewport / configuração mobile

- `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">` (mantém o atual + `viewport-fit=cover` para iPhone com notch).
- Adicionar `<meta name="apple-mobile-web-app-capable" content="yes">` e `<meta name="apple-mobile-web-app-status-bar-style" content="default">` para boa exibição quando adicionado à tela inicial do iPhone.
- Garantir `apple-touch-icon` apontado no `<head>` (`<link rel="apple-touch-icon" href="/apple-touch-icon.png">`) — hoje o arquivo existe mas não está linkado.

---

## Arquivos editados

- `src/components/landing/Hero.tsx` — `<img>` real com `srcset`/`sizes`, remover background-divs.
- `index.html` — viewport-fit, apple meta, apple-touch-icon link, preload da imagem hero, swap de fontes, lista de pesos reduzida.
- `src/assets/hero-bg-doctor-*.webp.asset.json` (novos) — versões mobile/desktop em WebP.
- `vite.config.ts` — `target: es2022`.
- `src/App.tsx` — lazy de `LenisProvider`, `CustomCursor`, `FloatingWhatsApp` e seções abaixo da dobra (via Index).
- `src/pages/Index.tsx` — lazy + Suspense nas seções abaixo da dobra.
- `public/_headers` — cache-control long para assets imutáveis.

---

## Fora de escopo

- Não mexer em copy, paleta, tipografia, layout das seções, animações de cards, formulário ou integrações (Pixel/Clarity/n8n).
- Não mexer em shadcn/ui.
- Não trocar Lenis/GSAP por outra lib — só lazy-load.

## Resultado esperado

LCP mobile de ~15s → abaixo de 2,5s (imagem hero ~250 KB → ~40 KB e descoberta imediata). FCP melhora pelo swap de fontes. TBT já está bom. Score mobile esperado: 90+.

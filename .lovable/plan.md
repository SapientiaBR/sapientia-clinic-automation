## Diagnóstico real (Mobile 67, LCP 4.5s, SI 10.5s, TBT 220ms)

O que tentamos antes **piorou** porque:

1. **Lazy loading agressivo virou waterfall.** Cada `lazy()` cria um chunk separado. Em 4G lento, baixar 12 chunks em série custa mais que um bundle único. O `Suspense fallback={null}` ainda força o React a montar/desmontar sob demanda durante scroll → "Minimize main-thread work 2.0s" e "6 long tasks".
2. **Google Fonts continua render-blocking 400ms** mesmo com truque `media="print"` — Lighthouse penaliza qualquer CSS externo no caminho crítico.
3. **LCP é o `<h1>` que usa Sora 700**, e a fonte chega da rede → 4.5s. Sem a fonte certa, swap atrasa o paint considerado "final".
4. **Forced reflow + 220ms TBT** vêm de animações no Hero: `animate-ping`, `animate-float`, `animate-typing`, blur de 140px em divs de 600px. Mesmo escondidas em `hidden md:block`, o `animate-ping` no badge e `animate-typing` rodam no mobile.
5. **Reduce unused JS 220 KiB** — `react-query`, `react-router`, radix-ui (Toast/Tooltip) ainda carregam cedo.

## Plano (mudança de rumo)

### 1. Eliminar Google Fonts do caminho crítico — usar font stack do sistema para o LCP
- Trocar `font-display` family no Tailwind para usar **system-ui / -apple-system / Segoe UI / Roboto** como `font-display`. O H1 renderiza instantaneamente (0ms de fonte) → LCP cai para perto do FCP (~2.7s → ~2.5s).
- Manter Google Fonts opcional só para o body via `<link>` com `media="print" onload`, mas **sem peso 700 do Sora** (não é mais necessário).
- Remove os 400ms de render-blocking completamente.

### 2. Reverter lazy loading da landing
- `Index.tsx`: voltar a importar **estaticamente** Problems, Solutions, Visualization, LossCalculator, HowItWorks, Founder, FAQ, FinalCTA, LeadForm, Footer.
- Motivo: o usuário **vai rolar a página**. 12 chunks em waterfall em 4G = pior que 1 bundle. Vite/Rollup já faz tree-shaking.
- Mantém lazy só de `ThankYou` e `NotFound` (rotas separadas) e do `DeferredUI`.

### 3. Cortar animações caras no mobile (`Hero.tsx`)
- Remover `animate-ping` do badge no mobile (esconder span com `hidden sm:inline-flex`).
- Remover `animate-typing` (3 dots) no mobile — substituir por dots estáticos.
- Remover `animate-float` no mobile (já está `md:animate-float`, ok — manter).
- Reduzir blur dos backgrounds de 140px → 100px e mover para `hidden lg:block` (já está `hidden md:block`, mudar para lg).

### 4. Throttle / fix forced reflow
- Verificar `useScrollAnimation` hook — se usa `IntersectionObserver` está ok. Se lê `getBoundingClientRect` em scroll, trocar por IO.
- (vou ler o hook antes de decidir)

### 5. Reduzir unused JS
- Remover `QueryClientProvider` de `App.tsx` se a landing não usa react-query (verificar). Economia ~30 KiB.
- `DeferredUI` já está lazy — manter.

### 6. Image sem width/height
- Lighthouse aponta — checar logo no Header (já tem) e demais `<img>` em Founder, SocialProof.

## Arquivos a editar

- `tailwind.config.ts` — font stack do sistema para `font-display`
- `index.html` — simplificar fontes (ou remover completamente)
- `src/pages/Index.tsx` — reverter lazy loading
- `src/components/landing/Hero.tsx` — remover animate-ping/typing no mobile, blur lg only
- `src/App.tsx` — possivelmente remover QueryClientProvider
- `src/hooks/useScrollAnimation.ts` — verificar/garantir IntersectionObserver
- Imagens em `Founder.tsx`, `SocialProof.tsx` — adicionar width/height

## Validação

Rodar PageSpeed após publicar. Metas realistas desta vez:
- Mobile Performance ≥ 85
- LCP < 3.0s (com fonte do sistema, deve ir perto do FCP)
- Speed Index < 6s
- TBT < 150ms

Se ainda ruim, próximo passo é **inlinear CSS crítico** e gerar bundle único sem code-splitting.

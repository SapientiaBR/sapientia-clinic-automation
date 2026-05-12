## Diagnóstico do novo PageSpeed

| Métrica | Mobile | Desktop |
|---|---|---|
| Performance | 74 | 82 |
| LCP | 4.1s 🔴 | 0.8s ✅ |
| Speed Index | 7.9s 🔴 | 1.9s 🟡 |
| CLS | 0.032 ✅ | **0.252 🔴** |
| TBT | 30ms ✅ | 100ms ✅ |

Principais culpados apontados pelo relatório:
- **Render blocking 750ms** → CSS do Google Fonts ainda bloqueia o paint inicial no mobile
- **LCP breakdown** → o `<h1>` depende da fonte Sora, que chega tarde
- **Reduce unused JS 240 KiB** → `react-query`, `Toaster`, `Sonner`, `TooltipProvider` carregam no bundle inicial e não são usados na landing
- **Layout shift 0.252 (desktop)** → swap de fonte (Sora/DM Sans com métricas diferentes do fallback) + animações `translate-y-6` em elementos sem altura reservada
- **Forced reflow / long tasks** → listener de scroll no `Header` faz `setState` a cada scroll
- **Image elements sem width/height** → mockup WhatsApp e blocos do Hero

## Plano

### 1. Auto-host de UMA fonte crítica e elimina render-blocking (`index.html`)
- Trocar o CSS do Google Fonts por `<link rel="preload" as="font" type="font/woff2" crossorigin>` direto no arquivo `.woff2` da Sora 700 (peso usado no H1) → corta os 750ms.
- Manter o resto (DM Sans, Sora 600) atrás do `preload as="style"` já existente, mas adicionar `media="print" onload="this.media='all'"` (técnica mais confiável que `onload=this.rel='stylesheet'` em alguns browsers).
- Adicionar `@font-face` com `font-display: swap` + `size-adjust`/`ascent-override` aproximados para reduzir o CLS do swap.

### 2. Reduzir JS inicial (`src/App.tsx` + `src/main.tsx`)
- Mover `Toaster`, `Sonner` e `TooltipProvider` para dentro de um wrapper `lazy` carregado depois do mount (ou removê-los da landing, já que não são usados em `/`).
- Manter `QueryClientProvider` (usado por shadcn) mas verificar se realmente precisa nesta página — se não, remover.
- Resultado esperado: −150 a −240 KiB no bundle inicial.

### 3. Corrigir CLS desktop (`useScrollAnimation` + Hero)
- Trocar o padrão `opacity-0 translate-y-6` por **só `opacity`** (translate em elementos block já posicionados pode contar como shift quando o elemento é largo). Animação fica suave igual.
- Adicionar `min-height` reservado ao container do mockup WhatsApp para que ele não empurre o layout antes do render.
- Garantir `width`/`height` em todas as `<img>` (logo já tem; checar dra-mariana e mockup — mockup é DOM puro, ok).

### 4. Remover preload do logo (`Header.tsx` + `index.html`)
- O logo **não é o LCP** (o LCP é o H1). Manter `fetchPriority="high"` no logo está roubando largura de banda do que importa. Voltar para `loading="eager"` simples sem prioridade alta.

### 5. Throttle do scroll listener (`Header.tsx`)
- Trocar `setScrolled(window.scrollY > 20)` por versão com `requestAnimationFrame` + early-return se o estado não mudou. Adicionar `{ passive: true }`.

### 6. Cache headers — fora do nosso controle
- "Use efficient cache lifetimes" depende do CDN da Lovable. Documentar e seguir.

## Arquivos a editar

- `index.html` — fontes self-hosted críticas, remoção de preload do logo
- `src/App.tsx` — lazy de Toaster/Sonner/Tooltip
- `src/components/landing/Header.tsx` — scroll listener com rAF, sem fetchPriority
- `src/hooks/useScrollAnimation.ts` — animação só com opacity
- `src/components/landing/Hero.tsx` — min-height no slot do mockup

## Validação

Após publicar, rodar `https://pagespeed.web.dev/` novamente. Metas:
- Mobile Performance ≥ 90, LCP < 2.5s, Speed Index < 4s
- Desktop CLS < 0.1

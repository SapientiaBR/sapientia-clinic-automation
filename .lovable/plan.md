# Plano: Novo logo no Header + destaque no Hero

## 1. Upload do logo via Lovable Assets

```
lovable-assets create --file /mnt/user-uploads/ChatGPT_Image_11_de_jun._de_2026_10_24_33.png \
  --filename logo-secretaria-invisivel.png \
  > src/assets/logo-secretaria-invisivel.png.asset.json
```

Sobrescreve o pointer existente (`src/assets/logo-secretaria-invisivel.png.asset.json`) — todos os imports atuais (`@/assets/logo-secretaria-invisivel.png`) continuam funcionando.

> Obs.: o logo já traz o wordmark "SECRETÁRIA INVISÍVEL"; vou parar de envelopá-lo em chip cinza no Header.

## 2. Header — logo maior, sem chip

`src/components/landing/Header.tsx`:
- Remover o wrapper `<div class="rounded-xl bg-[#F3F4F6] px-2.5 py-1.5 border ...">` — o logo respira melhor sem caixa.
- Aumentar altura: `h-12 md:h-14` → `h-14 md:h-20` (cerca de +40%).
- Aumentar `h-20 md:h-24` do container do header para `h-24 md:h-28` para acomodar.
- Manter link âncora para `#`.

## 3. Hero — selo grande de marca

Em `src/components/landing/Hero.tsx`, antes do badge "IA 24/7 para clínicas":
- Adicionar `<img>` do logo com `h-16 md:h-20 w-auto`, alinhado à esquerda, com `mb-6`.
- Como o headline atual já abre com "Sua clínica perde…", o logo cria assinatura visual sem competir com a headline.
- Remover a linha "Um produto Sapient.IA" (`p` abaixo do `h1` no desktop) — fica redundante com o logo grande; mantemos a atribuição apenas no Footer.

## 4. ThankYou page (consistência)

`src/pages/ThankYou.tsx` também usa um logo (ou texto). Se houver `<img logoSI>`, aplicar mesma altura `h-16 md:h-20` sem chip para coerência. Vou conferir antes; se não usar logo, não mexo.

## Arquivos editados
- `src/assets/logo-secretaria-invisivel.png.asset.json` (novo pointer)
- `src/components/landing/Header.tsx`
- `src/components/landing/Hero.tsx`
- `src/pages/ThankYou.tsx` (apenas se já mostrar o logo)

## Fora do escopo
- Não troco o logo do Footer (`logo-sapientia.png` é a marca do grupo Sapient.IA, distinta).
- Não recoloro o logo — ele já está no verde-água da paleta.

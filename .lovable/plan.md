## Ajustes de contraste e logo

### 1. Cards levemente verdes (imagens 1 e 3 + demais seções de fundo claro)
Trocar o `bg-white` dos cards em fundo claro por um verde-água muito sutil para criar contraste com o fundo da página.

- Token novo em `src/index.css`: `--card-tint: #F1FBF8` (verde-água ~3% saturação) e classe utilitária `.card-tinted` com:
  - `background: #F1FBF8`
  - `border: 1px solid #D6F3EE`
  - `box-shadow: 0 18px 40px rgba(15,23,42,0.06)`
- Aplicar `.card-tinted` (substituindo `bg-white`) nos cards de:
  - `RealConversations.tsx` (imagem 1)
  - `HowItWorks.tsx` (imagem 3)
  - `Solutions.tsx` (imagem 2, ver passo 2)
  - `Method.tsx`, `FAQ.tsx`, `Guarantee.tsx` (card branco interno), `AIObjections.tsx` — apenas onde o card está sobre fundo claro
- Bolhas de chat internas continuam brancas/verde-claro como hoje (mantém leitura).

### 2. Mais verde na seção Solutions (imagem 2)
Hoje o fundo é cinza claro. Trocar para verde-água claro para diferenciar das seções brancas vizinhas.

- `Solutions.tsx`: fundo da seção `#E6F6F1` (entre `#D6F3EE` e `#ECFBF7`), mantendo título e textos atuais.
- Cards dentro dessa seção: brancos puros `#FFFFFF` com borda `#D6F3EE` — assim invertem o contraste e ficam destacados sobre o verde.

### 3. Logo correto no Footer (imagem 4)
O Footer ainda importa `logo-sapientia.png` (logo antigo). Trocar pelo logo novo já hospedado em `src/assets/logo-secretaria-invisivel.png.asset.json`.

- `Footer.tsx`: substituir import e `<img src>` para usar o asset JSON, mesmo padrão do `Header.tsx`.
- Ajustar altura para combinar com o footer (ex.: `h-12 md:h-14`).

### Fora de escopo
Tipografia, hero, header, copy, animações, demais seções escuras (Problems, LossCalculator, Guarantee gradient) permanecem iguais.

### Arquivos
- `src/index.css` (token + utilitário)
- `src/components/landing/RealConversations.tsx`
- `src/components/landing/HowItWorks.tsx`
- `src/components/landing/Solutions.tsx`
- `src/components/landing/Method.tsx`
- `src/components/landing/FAQ.tsx`
- `src/components/landing/AIObjections.tsx`
- `src/components/landing/Guarantee.tsx` (apenas card branco interno)
- `src/components/landing/Footer.tsx`

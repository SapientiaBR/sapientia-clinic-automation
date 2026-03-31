

# Logo: Aumentar no Header + Background Sutil

## Alterações

### 1. Header — Logo maior (`src/components/landing/Header.tsx`)
- Aumentar de `h-8 md:h-10` para `h-10 md:h-14`

### 2. Background sutil com logo em seções (`src/index.css`)
- Criar uma classe utilitária `.logo-watermark` que usa o logo como background com opacidade muito baixa (~3-5%), tamanho grande, centralizado, sem repetição
- Aplicar como elemento decorativo em 2-3 seções chave (Aggravation, Visualization, FinalCTA) para reforço subliminar da marca

### 3. Aplicar watermark nas seções
- `Aggravation.tsx` — adicionar div com logo watermark no background
- `Visualization.tsx` — adicionar div com logo watermark
- `FinalCTA.tsx` — adicionar div com logo watermark

O logo aparece sutil, quase invisível, mas presente o suficiente para fixar a marca enquanto o visitante rola a página.


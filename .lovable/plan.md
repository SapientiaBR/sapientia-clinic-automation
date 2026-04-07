

# Otimização Mobile da Landing Page

## Problemas identificados

Após revisar todos os componentes, a página já usa breakpoints `sm`/`md`/`lg` em muitos lugares, mas há vários pontos que ficam apertados ou desproporcionais em telas pequenas (< 390px):

1. **Hero**: botão principal com texto longo quebra mal; mockup WhatsApp pode ficar muito grande; `min-h-screen` pode forçar scroll desnecessário
2. **Header**: logo e menu já ok
3. **SocialProof**: métricas em `grid-cols-3` ficam espremidas; testimonials em coluna única ok
4. **Problems**: cards ok com `sm:grid-cols-2`
5. **Solutions**: cards ok
6. **Visualization**: colunas before/after ficam apertadas em mobile, bordas arredondadas inconsistentes
7. **LossCalculator**: resultado com `text-5xl` pode estourar; padding ok
8. **HowItWorks**: timeline line começa em `left-[27px]` mas cards não têm offset — pode sobrepor
9. **Founder**: avatar + texto em coluna, ok
10. **FinalCTA**: botão com `px-10 py-5` muito grande em mobile
11. **LeadForm**: grid `sm:grid-cols-2` ok; padding pode ser reduzido
12. **FAQ**: ok
13. **Footer**: ok
14. **ThankYou**: botão CTA com texto longo e `px-10 py-5` fica enorme; card padding `p-10` pode ser excessivo

## Alterações por arquivo

### 1. `Hero.tsx`
- Reduzir `text-4xl` para `text-3xl` em mobile no h1
- Botão principal: texto menor em mobile (`text-base` default, `sm:text-lg`)
- Reduzir padding do botão em mobile (`px-6 py-3` default, `sm:px-8 sm:py-4`)
- Mockup: reduzir para `w-[260px]` default, manter `sm:w-[340px]`
- Adicionar `min-h-[calc(100vh-80px)]` em vez de `min-h-screen` para não forçar scroll

### 2. `SocialProof.tsx`
- Métricas: reduzir font para `text-3xl` default (já tem `sm:text-5xl`)
- Credentials grid: `grid-cols-2` default em vez de `sm:grid-cols-2` para mobile 2-col

### 3. `LossCalculator.tsx`
- Resultado: `text-4xl` default em vez de `text-5xl`
- Botão CTA: padding responsivo (`px-6 py-3` mobile, `sm:px-8 sm:py-4`)

### 4. `FinalCTA.tsx`
- Botão: `px-6 py-4` mobile, `sm:px-10 sm:py-5`
- Card: `p-6` mobile, mantém `sm:p-12 lg:p-16`

### 5. `HowItWorks.tsx`
- Mobile: remover timeline line (já tem `hidden sm:block`)
- Cards: garantir padding left em mobile para não sobrepor o número

### 6. `LeadForm.tsx`
- Card padding: `p-5` mobile, `sm:p-8 lg:p-10`
- Botão submit: `py-3` mobile, `sm:py-4`

### 7. `ThankYou.tsx`
- Card: `p-6` mobile, `sm:p-14`
- Botão: texto menor, `px-6 py-4` mobile, `text-base`
- Título: `text-2xl` mobile

### 8. `Visualization.tsx`
- Ajustar bordas arredondadas em mobile para separação visual clara

## Resumo
- 8 arquivos ajustados com classes responsivas
- Sem mudanças em design, cores, ou conteúdo
- Foco em padding, font-size e proporções para telas < 400px


## Objetivo

Criar uma versão mobile mais curta e direta da landing, mantendo a versão desktop atual exatamente como está.

## Abordagem

Usar o hook existente `useIsMobile()` (breakpoint 768px) em `src/pages/Index.tsx` para renderizar uma sequência de seções diferente no mobile — sem duplicar componentes, apenas escondendo/encurtando os que pesam mais.

## Estrutura proposta

**Desktop (mantém tudo como está):**
Hero → LeadForm → Problems → HowItWorks → Visualization → Solutions → LossCalculator → SocialProof → FAQ → FinalCTA → Footer

**Mobile (versão enxuta):**
1. Hero (versão mobile já compacta)
2. LeadForm (conversão imediata)
3. Problems (dor — essencial)
4. Solutions (o que oferecemos — essencial)
5. LossCalculator (gatilho de ROI — alta conversão)
6. SocialProof (prova — apenas 2-3 depoimentos)
7. FAQ compacto (top 3 perguntas)
8. FinalCTA + Footer

**Removidos no mobile:** HowItWorks e Visualization (seções mais longas/visuais, redundantes com Solutions no contexto mobile).

## Mudanças técnicas

1. **`src/pages/Index.tsx`**
   - Importar `useIsMobile`
   - Renderizar condicionalmente as seções: no mobile, omitir `HowItWorks` e `Visualization`
   - Passar prop `compact` (boolean) para `SocialProof` e `FAQ`

2. **`src/components/landing/SocialProof.tsx`** (edição mínima)
   - Aceitar prop `compact?: boolean`
   - Quando `compact`, exibir apenas os 2-3 primeiros depoimentos e esconder métricas secundárias

3. **`src/components/landing/FAQ.tsx`** (edição mínima)
   - Aceitar prop `compact?: boolean`
   - Quando `compact`, mostrar apenas as 3 perguntas mais importantes

4. **`src/components/landing/Hero.tsx`** (ajustes pontuais)
   - Esconder o card flutuante "Counter badge" final no mobile (já marginal)
   - Confirmar que o mockup do WhatsApp tem altura razoável no mobile

Nenhuma duplicação de componentes — só renderização condicional + props `compact`. Desktop não muda visualmente.

## Resultado esperado

- Página mobile ~40% mais curta
- Mantém todos os gatilhos de conversão (Hero, LeadForm, Calculadora, CTA final)
- Desktop 100% preservado

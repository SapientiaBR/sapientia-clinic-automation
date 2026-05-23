Compactar os cards da seção 'Infraestrutura. Não chatbot.' (Solutions.tsx) no mobile, replicando o padrão usado na seção anterior (Problems.tsx):

1. **Padding nos cards**: `p-4 md:p-7` (atualmente `p-7` fixo)
2. **Grid gap**: `gap-3 md:gap-6` (atualmente `gap-6` fixo)
3. **Ícone + layout mobile**: reduzir ícone para `w-11 h-11 md:w-14 md:h-14`, posicionar ícone e título em linha no mobile via `grid grid-cols-[auto_1fr]`, empilhar no desktop com `md:block`
4. **Títulos menores no mobile**: `text-base md:text-xl font-semibold`
5. **Descrição mais compacta**: `text-[13px] md:text-sm` com `leading-snug md:leading-relaxed mt-2 md:mt-3`
6. **Margens e espaçamentos**: reduzir `mb-14` do header para `mb-6 md:mb-14`, reduzir `mt-5` do parágrafo introdutório para `mt-3 md:mt-5`
7. **Preservar**: todos os dados, animações GSAP, cores, gradientes e comportamento desktop

Arquivo único: `src/components/landing/Solutions.tsx`
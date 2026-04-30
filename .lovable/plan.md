# Enfatizar card "Com Sapient.IA"

## Arquivo: `src/components/landing/Visualization.tsx`

Ajustes no card da direita ("Com Sapient.IA") para destacá-lo visualmente em relação ao card "Sem Automação":

1. **Borda mais forte** — trocar `border-success/20` por `border-success/40` e adicionar `ring-1 ring-success/20` para glow sutil.
2. **Background mais visível** — adicionar `bg-success/[0.04]` ao card para leve preenchimento verde.
3. **Escala levemente maior** — adicionar `md:scale-[1.03]` e `relative z-10` para o card "saltar" visualmente.
4. **Shadow** — adicionar `shadow-[0_0_30px_rgba(34,197,94,0.08)]` para um brilho sutil.
5. **Texto mais visível** — trocar `text-foreground/85` dos itens para `text-foreground/95`.

O card "Sem Automação" permanece como está, criando contraste natural.

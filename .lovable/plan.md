Em `src/components/landing/LeadForm.tsx`:

1. Remover `id="formulario"` da `<section>` (linha 60).
2. Adicionar `id="formulario"` e `scroll-mt-24` no `<div>` do card do formulário (linha 110).

Resultado: no mobile, qualquer CTA leva direto ao card branco do formulário, com respiro abaixo do header fixo. No desktop, layout idêntico.
## Reordenação das seções da landing page

### Objetivo
Reduzir o tempo até o lead encontrar o formulário, movendo seções de reforço/educação para depois do formulário. Também remover a seção de CTA final (a do print anexo).

### Nova ordem das seções (em `src/pages/Index.tsx`)

**Antes do formulário (foco em dor + solução + urgência):**
1. Header
2. Hero
3. Problems — "as dores"
4. Solutions — "a solução"
5. Visualization — visual da solução
6. LossCalculator — quanto você perde (urgência/ROI)
7. **LeadForm** ← formulário sobe para cá

**Depois do formulário (reforço social + educação + objeções):**
8. SocialProof — prova social
9. HowItWorks — como funciona na prática
10. Founder — quem está por trás
11. FAQ
12. Footer

### Remoção
- Excluir o componente **FinalCTA** do `Index.tsx` (a seção "Pronto para ver sua clínica funcionar no automático?" do print).
- O arquivo `src/components/landing/FinalCTA.tsx` permanece no projeto (não usado), para reaproveitamento futuro. Posso deletar se preferir.

### Detalhes técnicos
- Apenas reordenar imports lazy e o JSX dentro do `<Suspense>` em `src/pages/Index.tsx`.
- Remover `FinalCTA` do lazy import e do JSX.
- A ordem é a mesma em mobile e desktop (a página é single-column, então a reordenação resolve o problema de scroll mobile sem precisar de lógica responsiva).
- Nenhuma alteração de conteúdo, estilo ou componentes individuais.

### Arquivos afetados
- `src/pages/Index.tsx` (única edição)

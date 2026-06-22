## Objetivo
Adicionar formulário de captura (nome + email + telefone) após a seção de preços, que envia os dados ao mesmo webhook n8n já existente e redireciona o lead para `/obrigado`, onde o Meta Pixel dispara `Lead` com dados qualificados.

## Decisões confirmadas
- Mesmo webhook n8n já em uso (recuperar URL de `mem://features/integrations` na implementação).
- CTAs atuais (Hero, Pricing, FinalCTA, FloatingWhatsApp) **permanecem como estão** — direto para WhatsApp. O form é canal adicional para teste A/B.

## Mudanças

### 1. `src/components/landing/LeadForm.tsx` (reescrita)
Hoje é só um botão para WhatsApp. Vira formulário real:

- **Campos** (react-hook-form + zod):
  - Nome (2–80 chars, obrigatório)
  - Email (válido, até 120 chars, obrigatório)
  - WhatsApp (telefone BR com máscara `(11) 99999-9999`, obrigatório)
- **Submit**:
  - `fetch` fire-and-forget (`keepalive: true`) ao webhook n8n com payload `{ nome, email, telefone, origem: 'landing-pos-pricing' | 'landing-pos-hero' }`.
  - Redirect imediato `window.location.href = "/obrigado"` (padrão já memorizado).
- **Variantes** `default | compact` mantidas:
  - `default` (após Hero): título "Veja sua secretária digital *atendendo você agora*." + subtítulo + form.
  - `compact` (após Pricing): eyebrow + título curto "Pronto para testar? *Receba o contato da IA agora.*" + form, sem subtítulo longo.
- **Visual (paleta atual)**:
  - Card branco `#FFFFFF`, borda `#E5E7EB`, shadow `0 18px 44px rgba(15,23,42,0.06)`, radius 24px.
  - Inputs: borda `#E5E7EB`, foco `#0FB5A3`, label Manrope 600 `#1F2937`, placeholder `#9CA3AF`.
  - Erro: texto vermelho discreto + borda `#EF4444`.
  - Eyebrow verde `#0A8C7E`.
  - CTA: pill `gradient-brand` (mesmo botão usado no resto da página), texto "Quero falar com a IA agora" + ícone `ArrowRight`.
  - Microcopy de segurança: "Seus dados são usados apenas para te conectar com a IA. Sem spam."

### 2. `src/pages/Index.tsx`
Sem mudança estrutural — os dois `<LeadForm />` (após Hero e após Pricing) continuam onde estão; agora ambos renderizam o formulário.

### 3. `src/pages/ThankYou.tsx`
Já atende ao pedido (agradecimento + botão WhatsApp + `fbq('track','Lead')` no mount). Pequeno ajuste de copy se necessário para refletir que dados foram recebidos:
- Headline: "Obrigado! Recebemos seus dados."
- Subtítulo: "Clique abaixo para falar agora com a IA no WhatsApp."
- Botão `gradient-brand` para `https://wa.me/5511920795583` mantido.

### 4. Pixel
Sem mudanças em `index.html`. Como o `/obrigado` agora só é alcançado via form preenchido, o evento `Lead` fica qualificado.

## Notas técnicas
- Reutilizar `@/components/ui/form`, `@/components/ui/input`, `@/components/ui/label` (shadcn já no projeto).
- `zod` e `react-hook-form` já são dependências.
- Validação de telefone: regex BR simples (10–11 dígitos após strip), máscara aplicada on-change.
- Nenhuma alteração em rotas, integrações ou backend.

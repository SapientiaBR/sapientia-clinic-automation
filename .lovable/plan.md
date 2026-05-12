## Otimizações de CRO — Secretaria Invisível

### 1. Hero (`src/components/landing/Hero.tsx`)

- **Headline**: "Sua clínica perde R$14.400/mês em pacientes que ficam sem respostas. Isso acaba agora."
  - Manter `<em>` no destaque "R$14.400/mês" para ativar o estilo gradient já existente.
- **Subheadline**: "A Secretaria Invisível atende, qualifica e agenda pelo WhatsApp em segundos — às 14h ou às 3h da manhã. Sem secretária extra. Implementação em poucos dias."
- **CTA primário**: "QUERO PARAR DE PERDER PACIENTES" (mantém ícone MessageSquare e link `#formulario`).
- **CTA secundário**: "Ver uma conversa real →" (remove o ícone ArrowDown, seta vira parte do texto).
- **Trust micro-copy** (substitui as duas pílulas LGPD/prontuário existentes):
  - "Implementação em poucos dias · Compatível com LGPD · Suporte incluído"
  - Texto único separado por `·`, mantendo o estilo `text-sm font-medium text-muted-foreground/80`.

### 2. Depoimentos (`src/components/landing/SocialProof.tsx`)

- **Título da seção** (linha 38): "O que médicos dizem depois de automatizar o atendimento" (remover `<em>Sapient.IA</em>`).
- **Texto do depoimento** (linha 98): "Antes eu respondia mensagem de paciente às 23h quando lembrava. Muitos desistiam enquanto esperavam. Com a Secretaria Invisível, cada paciente recebe resposta na hora e eu finalmente foco na medicina, não na secretaria."
- **Autoria**: manter o bloco atual (nome + "Endocrinologista" + handle do Instagram com ícone) — já corresponde ao formato pedido "Dra. Mariana Fogarolli, Endocrinologista · @dramarianafogarolli".

### 3. Urgência no formulário (`src/components/landing/LeadForm.tsx`)

- Adicionar acima do título "Preencha seus dados" do card do formulário um badge de urgência:
  - Texto: "**[N] diagnósticos disponíveis esta semana**", onde N é gerado aleatoriamente entre 3 e 6 a cada carga da página (`useMemo` com `Math.floor(Math.random() * 4) + 3`).
  - Estilo: pílula `inline-flex` com fundo translúcido âmbar/accent, ícone (ex.: `Clock` ou `AlertCircle` do lucide), texto pequeno e em destaque, alinhado ao topo do card.

### Detalhes técnicos

- Sem mudanças em rotas, dados, webhook ou estilos globais.
- Imports a adicionar:
  - `LeadForm.tsx`: `useMemo` do React e ícone do lucide-react.
- Remover do `Hero.tsx` o import `ArrowDown` se não for mais usado (CTA secundário passa a usar seta textual).
- Sem alteração nos badges de cabeçalho ("Exclusivo para Clínicas e Consultórios") nem na seção do mockup do WhatsApp.

### Fora de escopo (não mexer agora)

- Prioridade 2 da auditoria não foi enviada — pular.
- Demais seções (Problems, Solutions, FAQ, etc.) permanecem intactas.

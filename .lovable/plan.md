## Objetivo
Atualizar a seção `src/components/landing/Pricing.tsx` conforme o anexo: novo título, novo banner de "implementação/setup grátis", ajustes de features nos 3 planos e alteração do CTA de cancelamento. Manter a citação da recepcionista.

## Mudanças em `src/components/landing/Pricing.tsx`

### Título
- De: "Escolha o plano *da sua clínica.*"
- Para: "Planos que cabem na sua *clínica.*"
- Remover eyebrow "// planos e preços" (não aparece no anexo).

### Blocos de destaque acima dos cards
Manter dois blocos, na ordem:

1. **Banner novo "Implementação/Setup grátis"** (novo, estilo do anexo — verde claro):
   - Eyebrow mono: "IMPLEMENTAÇÃO · SETUP"
   - Texto: "~~R$1.647~~ **por nossa conta**"
   - Texto direita: "Você paga **só a mensalidade** — sem taxa de implantação."
   - Card branco/verde-claro `#F1FBF8`, borda `#A7E6DD`, radius 16px.

2. **Citação da recepcionista** (mantida como está hoje, card amarelo `#FFF8E6`).

### Planos (features atualizadas conforme anexo)

**Essencial — R$497/mês — 1 médico / consultório solo** (sem mudanças):
- IA responde WhatsApp 24/7
- Agendamento de consultas
- FAQ automatizado (valores, convênios, endereço, horários)
- Confirmação automática de agendamento
- 1 agenda/profissional
- 1 ajuste de fluxo por mês

**Profissional — R$797/mês — 2-3 profissionais** (Tudo do Essencial +):
- Lembretes automáticos (anti-falta)
- Reagendamento e cancelamento pelo bot
- Qualificação de pacientes (perguntas pré-consulta)
- Integração com Google Agenda
- Até 3 agendas/profissionais
- **Entende e responde por áudio** *(novo)*
- 2 ajustes de fluxo por mês
- **Remover:** "Relatório mensal de atendimentos"

**Premium — R$1.247/mês — Clínica com 4+ profissionais ou rede** (Tudo do Profissional +):
- Suporte prioritário (SLA 4h úteis)
- Agendas/profissionais ilimitados
- **1 ajuste por semana** *(substitui "4 ajustes de fluxo por mês")*
- **Remover:** "Relatório semanal (em vez de mensal)"

### Rodapé
- De: "Diagnóstico gratuito antes de qualquer cobrança. Cancele com 30 dias de aviso."
- Manter igual (aparece no anexo).

## Fora de escopo
- Sem mudanças em outros componentes, rotas ou integrações.
- CTAs dos cards permanecem apontando para `#formulario`.
- Memória de pricing (mem://index.md) será atualizada em paralelo para refletir "1 ajuste/semana" no Premium e "áudio" no Profissional.

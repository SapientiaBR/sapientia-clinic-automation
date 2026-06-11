
## Reestruturar seção de Preços

### 1. Ancoragem no topo da seção
Acima da grid de planos (logo após o parágrafo descritivo do header), inserir um bloco de ancoragem destacado:

- Container `rounded-2xl` com fundo `#FFF8E6` (creme suave) e borda `#F0E2B3` — destoa visualmente da paleta verde e chama atenção.
- Texto em duas partes:
  - "Uma recepcionista custa **mais de R$3.000/mês** com encargos e falta, tira férias e pede demissão."
  - "A Secretária Invisível trabalha **24/7**, a partir de apenas **R$497**."
- Ícone Lucide (`Scale` ou `TrendingDown`) à esquerda, em verde-água, dentro de um IconChip.
- Largura `max-w-3xl mx-auto`, padding `p-5 md:p-6`, font-sans 15-16px.

### 2. Trocar tabela comparativa por 3 cards "stacked tier"
Remover o atual layout de tabela desktop + cards mobile (tudo de uma vez é um único componente). Reconstruir como **3 cards lado a lado em desktop, empilhados em mobile**, com hierarquia "tudo do plano anterior +".

Estrutura de cada card:
- Header: nome (Cormorant italic, `#0A8C7E`), preço grande (`R$497` etc. com `/mês`), perfil do cliente.
- Profissional fica destacado: borda 2px `#0FB5A3`, badge "Mais escolhido" no topo, header com fundo gradient verde + texto branco.
- Body:
  - **Essencial**: lista apenas as features incluídas (com check verde). Nada de itens riscados ou com traço.
  - **Profissional**: linha-âncora `"Tudo do Essencial +"` em destaque (font-semibold, eyebrow style), seguida apenas dos itens novos do tier.
  - **Premium**: linha-âncora `"Tudo do Profissional +"`, seguida apenas dos itens novos do tier.
- CTA no rodapé de cada card: botão linkando para `#formulario` ("Começar com Essencial" / "Escolher Profissional" / "Falar sobre Premium"). Profissional usa primary gradient, os outros usam ghost outline.

### Conteúdo dos tiers (derivado da tabela atual)

**Essencial — R$497/mês** (1 médico / consultório solo)
- IA responde WhatsApp 24/7
- Agendamento de consultas
- FAQ automatizado (valores, convênios, endereço, horários)
- Confirmação automática de agendamento
- 1 agenda/profissional
- 1 ajuste de fluxo por mês

**Profissional — R$797/mês** (2-3 profissionais) — "Tudo do Essencial +"
- Lembretes automáticos (anti-falta)
- Reagendamento e cancelamento pelo bot
- Qualificação de pacientes (perguntas pré-consulta)
- Integração com Google Agenda
- Relatório mensal de atendimentos
- Até 3 agendas/profissionais
- 2 ajustes de fluxo por mês

**Premium — R$1.247/mês** (Clínica com 4+ profissionais ou rede) — "Tudo do Profissional +"
- Suporte prioritário (SLA 4h úteis)
- Relatório semanal (em vez de mensal)
- Agendas/profissionais ilimitados
- 4 ajustes de fluxo por mês

### 3. CTA global
Manter o botão "Falar com a Sapient.IA" + microcopy "Diagnóstico gratuito antes de qualquer cobrança." centralizado abaixo dos 3 cards.

### Arquivos
- **Editar:** `src/components/landing/Pricing.tsx` (reescrita completa do componente; mesmo export default, mesma seção `id="precos"`).

### Fora de escopo
Todas as outras seções da página, copy do Hero, formulário, FAQ etc. ficam intactas.

# Plano: Refinamentos de Copy & Posicionamento

Aplicar as melhorias de copy sugeridas, sem mexer em estrutura/animação.

## 1. Hero (`src/components/landing/Hero.tsx`)

- **Subtítulo** (substituir): 
  > "Ela responde pacientes no WhatsApp, entende a intenção, sugere horários, agenda consultas e confirma presença automaticamente, mesmo fora do horário comercial."
- **Linha de prova** logo abaixo dos CTAs (substitui a linha mono atual "Implementação em 5 dias..."):
  > "Implementação em poucos dias. Sem trocar seu WhatsApp. Sem app novo para o paciente."
- **Microtexto sob o R$23.000/mês** (novo, discreto, font-mono pequeno):
  > "Estimativa baseada em atendimentos semanais, ticket médio e taxa conservadora de perda por demora no atendimento. Calcule a sua ↓" (link âncora para `#calculadora`)

## 2. Problems (`src/components/landing/Problems.tsx`)

Suavizar claims sem fonte:

- "63% desistem em 5 minutos" → **"Até 63% podem desistir em 5 minutos"**
- "34% de faltas sem confirmação" → **"Faltas sem confirmação podem chegar a 34%"**
- Descrição da secretária CLT: manter (é fato de mercado).
- Adicionar microtexto no rodapé da seção:
  > "Estimativas baseadas em benchmarks de mercado de clínicas brasileiras e na operação dos nossos clientes."

## 3. Solutions (`src/components/landing/Solutions.tsx`) — virar "sistema"

Manter título "Infraestrutura. Não chatbot.", mas:

- Subtítulo novo:
  > "Seis camadas que trabalham juntas — WhatsApp, agenda, lembretes, reativação, painel e suporte humano. Não é um bot solto; é uma operação."
- Expandir de 4 para **6 cards**, adicionando:
  - **Painel e acompanhamento** — "Veja todas as conversas, métricas de agendamento e relatório semanal. Você no controle, sem operar."
  - **Suporte humano dedicado** — "Time da Sapient.IA ajustando fluxos, tom de voz e regras toda semana. Você não fica sozinho com a IA."
- Grid: `md:grid-cols-2 lg:grid-cols-3`.

## 4. Novo bloco: "Método Agenda Invisível"

Criar `src/components/landing/Method.tsx` e inserir em `Index.tsx` **entre Solutions e LossCalculator**.

Conteúdo (5 passos numerados em grid horizontal/vertical):

1. **Captura a intenção** do paciente assim que ele manda mensagem.
2. **Qualifica** urgência, tipo de consulta e convênio/particular.
3. **Agenda** no melhor horário disponível da sua agenda real.
4. **Confirma** com lembrete automático e reduz faltas.
5. **Reativa** quem sumiu há semanas com mensagens que parecem conversa.

Visual: cards numerados, mesmo padrão `card-base`, com linha/seta de conexão (desktop) usando GSAP reveal por stagger conforme regras.

Eyebrow: `// método agenda invisível`
Headline: `Cinco passos. Zero fricção. Agenda cheia.`

## 5. Posicionamento estratégico

Adicionar a frase-âncora como **bloco intermediário** logo após o Hero (antes do LeadForm), em destaque tipográfico (display, ~32px, centralizado, max-w-3xl):

> "A Secretária Invisível é uma **infraestrutura de atendimento** que transforma mensagens perdidas no WhatsApp em consultas **agendadas, confirmadas e lembradas**."

Pode ir num componente leve inline ou um `PositioningStatement.tsx` pequeno.

## Fora de escopo

- Sem mudança em animações (já seguem regras GSAP+Lenis).
- Sem mudança em LeadForm, FAQ, Footer, Calculadora.
- Sem novas imagens.

## Arquivos afetados

- `src/components/landing/Hero.tsx` (edit)
- `src/components/landing/Problems.tsx` (edit)
- `src/components/landing/Solutions.tsx` (edit — copy + 2 cards)
- `src/components/landing/Method.tsx` (novo)
- `src/components/landing/PositioningStatement.tsx` (novo)
- `src/pages/Index.tsx` (inserir 2 seções)
- `src/components/landing/LossCalculator.tsx` (adicionar `id="calculadora"` se ainda não tiver, para o link do microtexto do Hero)
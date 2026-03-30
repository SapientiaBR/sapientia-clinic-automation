

# Reestruturação da Copy — Marketing Direto Focado em Conversão

## Resumo
Reescrever toda a copy da landing page seguindo uma estrutura de marketing direto: dor → agravamento → solução → visualização → quebra de objeções → oferta → CTA. O design e componentes se mantêm; muda-se o conteúdo textual e a estrutura das seções.

## Nova Estrutura de Seções (10 seções)

### 1. Hero (reescrever `Hero.tsx`)
- **Headline:** "Seu consultório está perdendo pacientes todos os dias… e você nem percebe"
- **Subheadline:** "Enquanto você atende, mensagens ficam sem resposta, agendamentos travam e pacientes escolhem outro médico. Isso já está custando dinheiro ao seu consultório."
- **CTA:** "Quero Parar de Perder Pacientes" (WhatsApp)
- **CTA secundário:** "Entenda o problema ↓"
- Manter o mockup de WhatsApp

### 2. Seção de Problema — "O Vazamento Silencioso" (reescrever `Problems.tsx`)
- **Título:** "O problema não é falta de pacientes. É perda de pacientes."
- **Subtítulo:** "Seu consultório já recebe contatos. Mas quantos deles viram consulta de verdade?"
- Cards com os vazamentos:
  - "Mensagens no WhatsApp que ficam horas sem resposta"
  - "Pacientes que pedem informações e nunca mais voltam"
  - "Agendamentos que começam mas não são concluídos"
  - "Consultas esquecidas — faltas que custam seu tempo e dinheiro"
  - "Recepcionista sobrecarregada que não consegue responder todo mundo"
  - "Você não sabe quantos pacientes perdeu essa semana"

### 3. **NOVA seção** — Agravamento / "Interest Peak" (criar `Aggravation.tsx`)
- **Título:** "Cada paciente que não recebe resposta em minutos… procura outro médico."
- Copy em blocos curtos e impactantes:
  - "O paciente mandou mensagem às 21h. Ninguém respondeu. Às 21h05, ele já estava no consultório concorrente."
  - "Isso acontece todos os dias. Em silêncio. Sem que você perceba."
  - "E não são 1 ou 2 pacientes. São dezenas por mês."
- Visual: números de impacto (ex: "82% dos pacientes esperam resposta em até 1 hora")
- Mini CTA: "Quero resolver isso agora"

### 4. Seção de Solução (reescrever `Solutions.tsx`)
- **Título:** "Uma secretária de IA que nunca dorme, nunca falta e nunca esquece"
- **Subtítulo:** "Imagine ter alguém respondendo cada paciente em segundos. Todos os dias. Inclusive de madrugada."
- Cards focados em resultado (não em feature):
  - "Responde cada mensagem em segundos — 24h por dia, 7 dias por semana"
  - "Agenda consultas automaticamente — sem você ou sua equipe precisar fazer nada"
  - "Envia lembretes e confirmações — reduzindo faltas drasticamente"
  - "Organiza todo o fluxo de atendimento — sem depender de planilha ou caderno"
  - "Se adapta ao seu jeito de atender — sem parecer robótico"
  - "Funciona no WhatsApp — onde seus pacientes já estão"

### 5. **NOVA seção** — Visualização (criar `Visualization.tsx`)
- **Título:** "Imagine abrir sua agenda amanhã e ver ela cheia. Sem ter feito nada."
- Blocos com ícone + frase:
  - "Sua agenda lotada sem precisar correr atrás de paciente"
  - "Menos dependência da recepcionista para tarefas repetitivas"
  - "Atendimento funcionando mesmo quando você está em cirurgia"
  - "Menos estresse operacional. Mais tempo para o que importa: atender."
- CTA: "Quero essa realidade no meu consultório"

### 6. Como Funciona (simplificar copy em `HowItWorks.tsx`)
- Manter 3 passos, ajustar textos:
  - "Conversamos sobre o seu consultório" → "Em 30 minutos, entendemos seu fluxo e suas dores."
  - "Montamos seu sistema sob medida" → "Configuramos tudo — sem você precisar entender de tecnologia."
  - "Seu atendimento funciona no automático" → "Em poucos dias, seus pacientes são respondidos 24h. Sem falha."

### 7. Quebra de Objeções (reescrever `FAQ.tsx` com novo tom)
- **Título:** "Você pode estar pensando..."
- Perguntas reformuladas como objeções reais:
  - "Isso não vai parecer robótico para meus pacientes?" → Explicar personalização e tom humanizado
  - "Vou perder o controle do meu atendimento?" → Explicar que o médico mantém controle total
  - "É difícil de implementar? Preciso entender de tecnologia?" → Explicar que cuidam de tudo
  - "E se eu não gostar, fico preso em contrato?" → Sem fidelidade
  - "Quanto custa?" → Posicionar como investimento que se paga (não citar valor, justificar ROI)

### 8. Prova Social (ajustar copy em `SocialProof.tsx`)
- Manter estrutura, ajustar textos dos cards para reforçar resultado:
  - "Consultórios que recuperaram até 30 pacientes/mês que estavam sendo perdidos"
  - "Sistema personalizado — não é chatbot genérico"
  - "Implementação completa — você não precisa fazer nada"
  - "Suporte contínuo — estamos junto do começo ao fim"

### 9. CTA Final (reescrever `FinalCTA.tsx`)
- **Título:** "Quantos pacientes você vai perder até tomar uma decisão?"
- **Subtítulo:** "Cada dia sem automação é dinheiro saindo do seu consultório. Fale com a gente — é rápido, sem compromisso."
- **CTA:** "Quero Automatizar Meu Atendimento"

### 10. Footer — mantém como está

## Arquivos a criar
- `src/components/landing/Aggravation.tsx` — nova seção de agravamento
- `src/components/landing/Visualization.tsx` — nova seção de visualização

## Arquivos a editar
- `src/pages/Index.tsx` — adicionar as 2 novas seções na ordem correta
- `src/components/landing/Hero.tsx` — nova headline, subheadline, CTAs
- `src/components/landing/Problems.tsx` — novo título, subtítulo e textos dos cards
- `src/components/landing/Solutions.tsx` — nova abordagem focada em resultado
- `src/components/landing/HowItWorks.tsx` — ajustar textos dos passos
- `src/components/landing/SocialProof.tsx` — ajustar textos dos cards
- `src/components/landing/FAQ.tsx` — reformular como quebra de objeções
- `src/components/landing/FinalCTA.tsx` — novo título e CTA

## O que NÃO muda
- Design system (cores, gradientes, glassmorphism)
- Componentes de UI (accordion, cards, layout)
- Animações de scroll
- Header e Footer
- WhatsApp float button
- Responsividade


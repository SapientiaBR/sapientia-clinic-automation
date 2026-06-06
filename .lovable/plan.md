## Resumo
Reduzir a seção **Conversas Reais** de 6 para 3 cards, focando em mobile-first e diminuindo o scroll. Manter: Agendamento, Follow-up e Cancelamento. Reescrever o card de Follow-up para mostrar lembrete de consulta (redução de no-show).

## O que será feito

### 1. Filtrar cards no `RealConversations.tsx`
- Manter apenas os 3 cards: **Agendamento**, **Follow-up** e **Cancelamento**
- Remover: Quebra de objeção, Áudio, Fora do script

### 2. Reescrever card de Follow-up
- Título: trocar de "Faltou na consulta. IA recupera." para algo sobre lembrete
- Mensagens: simular um lembrete preventivo, ex:
  - IA (out): *"Olá, Dra. Mariana lembra que hoje você tem consulta às 14h. Confirma que vai conseguir comparecer?"*
  - Paciente (in): *"Sim, obrigado pelo lembrete!"*
  - IA (out): *"Perfeito. Te espero lá. Qualquer coisa, é só chamar."*
- Caption: focar em redução de no-show com lembrete automatizado
- Remover o `footer` desse card (ou ajustar)

### 3. Ajustes de copy nos cards restantes
- Revisar títulos e captions dos 3 cards mantidos para manter consistência
- Subtítulo geral da seção: encurtar se necessário para mobile

## Nada muda em:
- Estrutura visual do card (borda, sombra, balões de chat)
- Animações GSAP
- Seção no geral (id, classes, container)

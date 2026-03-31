
Objetivo: corrigir a copy incorreta sobre contrato/cancelamento e padronizar todos os CTAs de WhatsApp para o novo número `wa.me/5511920795583`.

1. Ajustar a copy errada no FAQ
- Arquivo: `src/components/landing/FAQ.tsx`
- Localizei a afirmação incorreta na pergunta:
  - `"E se eu não gostar, fico preso em contrato?"`
  - resposta atual: `"Sem fidelidade, sem multa, sem burocracia..."`
- Vou remover essa promessa e substituir por uma resposta alinhada ao modelo real de recorrência com multa por saída antecipada.
- Direção da nova copy:
  - manter tom comercial e transparente
  - evitar linguagem que gere atrito desnecessário
  - deixar claro que as condições contratuais são apresentadas na conversa comercial
- Exemplo de ajuste:
  - pergunta pode continuar parecida
  - resposta passa a algo como: `As condições contratuais são apresentadas com clareza antes do início. Assim, você entra sabendo exatamente prazo, recorrência e regras do serviço.`

2. Atualizar todos os links de WhatsApp
- Novo link padrão: `https://wa.me/5511920795583`
- Arquivos identificados com CTA/link WhatsApp:
  - `src/components/landing/Hero.tsx`
  - `src/components/landing/Aggravation.tsx`
  - `src/components/landing/Visualization.tsx`
  - `src/components/landing/FinalCTA.tsx`
  - `src/components/landing/Header.tsx`
  - `src/components/landing/WhatsAppFloat.tsx`
  - `src/components/landing/Footer.tsx`
- Vou trocar todas as constantes `WHATSAPP_URL` e o link direto do footer para esse novo número.

3. Garantir consistência dos botões
- Validar que todos os botões principais e links com função de contato apontem para o mesmo destino.
- Manter intactos os links que não são de WhatsApp, como:
  - navegação interna do header
  - âncora `#problema` no Hero
  - links de Instagram e LinkedIn no footer

4. Resultado esperado
- Nenhuma copy vai afirmar “sem fidelidade” ou “sem multa”.
- Todos os CTAs de contato passam a abrir o WhatsApp correto de forma consistente em toda a landing page.

Detalhes técnicos
- Mudança textual: 1 arquivo
- Mudança de links: 7 arquivos
- Não há necessidade de alterar layout, animações, responsividade ou estilos
- A implementação é simples e localizada, sem impacto estrutural na landing page

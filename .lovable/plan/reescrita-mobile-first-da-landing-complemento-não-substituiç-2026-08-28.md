# Reescrita mobile-first da landing: complemento, não substituição

Ideia central aplicada em toda a página: a Secretária Invisível não substitui a recepcionista, ela garante que o atendimento continue enquanto a equipe cuida do que precisa de pessoas. Tema visual, paleta teal e tipografia atuais mantidos. Destaques (`<em>` verde e negrito) nas frases-chave de cada seção.

## Seção a seção

1. **Hero** — H1: "Sua recepcionista atende quem está na clínica." Subtítulo: "A Secretária Invisível atende quem está no WhatsApp." Apoio: "Responde, agenda, confirma e organiza o atendimento enquanto sua equipe continua cuidando dos pacientes." Reforço em negrito: "Sem substituir sua recepcionista." CTA novo (ver abaixo).

2. **Reframe (faixa após o hero)** — "Sua recepcionista não deveria precisar estar em dois lugares ao mesmo tempo." + "Enquanto ela atende um paciente, o WhatsApp continua recebendo mensagens. A Secretária Invisível assume esse volume." Fecho destacado: "Sua equipe continua atendendo pessoas. O atendimento digital continua acontecendo."

3. **Linha do tempo (Scene)** — Título "21h17." / "A clínica fechou. Um paciente acabou de mandar mensagem." Etapas: 21h17 "Vocês atendem amanhã?", 21h18 "Ele recebe a resposta.", 21h19 "Escolhe o horário.", 21h20 "O atendimento segue." Fecho: "A clínica fechou. O atendimento não desapareceu."

4. **Nova seção "O problema não é sua recepcionista"** — depende de uma única pessoa; quando ela está ocupada as mensagens acumulam, quando sai o atendimento para. Fecho destacado: "A Secretária Invisível cria continuidade." Entra logo após a linha do tempo.

5. **Seção de trabalho em conjunto** — "A tecnologia cuida do volume. Sua equipe cuida das pessoas." + o que cada lado faz, encerrando com "Não é substituição. É complemento."

6. **Nova frase de impacto (faixa)** — "A tecnologia não veio para tirar sua recepcionista da clínica. Veio para tirar parte do peso das costas dela."

7. **Conversas reais** — Título "Veja como seus pacientes seriam atendidos." Subtítulo: "Conversas reais. Do primeiro 'oi' até o próximo passo." Cards atuais mantidos e ampliados para cobrir: novo paciente agendando, confirmação de presença, pedido de reagendamento, atendimento fora do horário e situação encaminhada para a equipe.

8. **Seção da saída da recepcionista (SinglePlace)** — "E quando alguém da recepção sai?" Lista: histórico, contexto, pendências, informações de pacientes. Fecho: "O atendimento precisa continuar sendo da clínica. Não da memória de uma única pessoa." CTA "Quero organizar meu atendimento".

9. **Planos** — Texto antes dos cards: "A Secretária Invisível se adapta ao tamanho da sua operação. Você não paga implantação. Você começa pagando apenas a mensalidade." Renomear planos: Essencial → Consultório, Profissional → Clínica, Premium → Operação. Preços e recursos inalterados.

10. **FAQ** — Novo título: "Antes de colocar IA no atendimento da sua clínica, estas são as perguntas certas." As 4 perguntas fornecidas (substituição, troca de número, situação fora do padrão, complexidade para a equipe) mais a pergunta de segurança de dados já existente.

11. **CTA final (seção nova ao fim da página)** — "Veja como a Secretária Invisível funcionaria na sua clínica." + "Em uma conversa rápida, você entende como o atendimento poderia funcionar na sua operação." Botão + "Sem compromisso."

## Alteração global dos CTAs

Todo "Agendar diagnóstico gratuito" passa a ser **"Ver como funcionaria na minha clínica"** (hero, barra fixa mobile, planos, formulário, header em versão curta "Ver na minha clínica"). Destino continua o formulário `#diagnostico`. O botão da demonstração ao vivo continua como está.

## Detalhes técnicos

- Arquivos alterados: `Hero.tsx`, `Reframe.tsx`, `Scene.tsx`, `RealConversations.tsx`, `SinglePlace.tsx`, `Pricing.tsx`, `FAQ.tsx`, `LeadForm.tsx`, `Header.tsx`, `MobileCtaBar.tsx`, `Index.tsx`.
- Arquivos novos: `SinglePoint.tsx` (item 4), `Complement.tsx` (item 5), `ImpactBand.tsx` (item 6), `FinalCTA.tsx` (item 11).
- `CTA_LABEL` exportado do `Hero.tsx` continua sendo a fonte única do rótulo dos CTAs.
- JSON-LD do FAQ em `Index.tsx` se atualiza sozinho a partir de `faqEntries`.
- Preservados sem mudança: webhook n8n, pixel do Meta, redirecionamento para `/obrigado`, favicon, og:image e preços.
- Escrita mobile-first: frases curtas, corpo mínimo de 17px, conferência em 380px e 1280px.

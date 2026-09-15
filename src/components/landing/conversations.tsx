import { ChatBubble } from "../../../design-system-2/components/product/ChatBubble";

export type Msg = { side: "in" | "out"; text: string; hora?: string };
export type Convo = {
  chave: string;
  title: string;
  caption: string;
  /** Nome que aparece no cabeçalho da conversa. */
  contato: string;
  messages: Msg[];
};

/**
 * As três conversas simuladas, num módulo próprio.
 *
 * Moravam dentro do RealConversations, mas o hero da rota do médico solo usa
 * a primeira delas. Duplicar o roteiro em dois arquivos é o tipo de coisa que
 * sai de sincronia no primeiro ajuste de copy.
 */
export const conversas: Convo[] = [
  {
    chave: "agendar",
    title: "Novo paciente querendo agendar.",
    caption: "Resposta em segundos e agenda fechada na mesma conversa.",
    contato: "Carla M.",
    messages: [
      { side: "in", text: "Oi, vocês atendem amanhã? Preciso marcar uma consulta.", hora: "21h17" },
      {
        side: "out",
        text: "Oi, Carla! Atendemos sim. Temos 10h30 ou 14h amanhã. Qual te encaixa melhor?",
        hora: "21h17",
      },
      { side: "in", text: "10h30 perfeito", hora: "21h19" },
      {
        side: "out",
        text: "Marcado! Dr. Rodrigo, amanhã às 10h30. Te mando um lembrete 1h antes.",
        hora: "21h20",
      },
    ],
  },
  {
    chave: "confirmar",
    title: "Paciente confirmando presença.",
    caption: "A confirmação acontece sozinha. Menos faltas, sem ninguém ligar.",
    contato: "Ana P.",
    messages: [
      {
        side: "out",
        text: "Oi, Ana! Hoje você tem consulta com a Dra. Mariana às 14h. Confirma presença?",
        hora: "08h02",
      },
      { side: "in", text: "Confirmo sim, obrigada pelo lembrete!", hora: "08h14" },
      { side: "out", text: "Perfeito. Te espero por aqui.", hora: "08h14" },
    ],
  },
  {
    chave: "remarcar",
    title: "Pedido de reagendamento.",
    caption: "O horário livre volta para a agenda antes de virar prejuízo.",
    contato: "Paulo R.",
    messages: [
      { side: "in", text: "Preciso remarcar minha consulta de quinta, deu um imprevisto.", hora: "16h41" },
      {
        side: "out",
        text: "Sem problema, Paulo. Tenho sexta às 9h ou segunda às 16h30. Qual prefere?",
        hora: "16h41",
      },
      { side: "in", text: "Sexta às 9h", hora: "16h43" },
      {
        side: "out",
        text: "Reagendado para sexta, 9h. Já liberei o horário de quinta na agenda.",
        hora: "16h43",
      },
    ],
  },
];

/**
 * Os balões de uma conversa.
 *
 * Eram `div`s escritos à mão com raio e cor cravados. Agora saem do
 * `ChatBubble` do design system, que traz o que faltava: o bico do balão do
 * lado certo, o horário e o duplo-check de leitura — e tudo isso lendo os
 * tokens em vez de valores soltos.
 */
export const Baloes = ({ messages }: { messages: Msg[] }) => (
  <>
    {messages.map((m, j) => (
      <ChatBubble key={j} direction={m.side} time={m.hora}>
        {m.text}
      </ChatBubble>
    ))}
  </>
);

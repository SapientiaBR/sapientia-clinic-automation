export type Msg = { side: "in" | "out"; text: string };
export type Convo = {
  chave: string;
  title: string;
  caption: string;
  messages: Msg[];
};

/**
 * As três conversas simuladas, num módulo próprio.
 *
 * Moravam dentro do RealConversations, mas o hero da rota do médico solo usa
 * a primeira delas num mockup de celular. Duplicar o roteiro em dois arquivos
 * é o tipo de coisa que sai de sincronia no primeiro ajuste de copy.
 */
export const conversas: Convo[] = [
  {
    chave: "agendar",
    title: "Novo paciente querendo agendar.",
    caption: "Resposta em segundos e agenda fechada na mesma conversa.",
    messages: [
      { side: "in", text: "Oi, vocês atendem amanhã? Preciso marcar uma consulta." },
      {
        side: "out",
        text: "Oi, Carla! Atendemos sim. Temos 10h30 ou 14h amanhã. Qual te encaixa melhor?",
      },
      { side: "in", text: "10h30 perfeito" },
      { side: "out", text: "Marcado! Dr. Rodrigo, amanhã às 10h30. Te mando um lembrete 1h antes." },
    ],
  },
  {
    chave: "confirmar",
    title: "Paciente confirmando presença.",
    caption: "A confirmação acontece sozinha. Menos faltas, sem ninguém ligar.",
    messages: [
      {
        side: "out",
        text: "Oi, Ana! Hoje você tem consulta com a Dra. Mariana às 14h. Confirma presença?",
      },
      { side: "in", text: "Confirmo sim, obrigada pelo lembrete!" },
      { side: "out", text: "Perfeito. Te espero por aqui." },
    ],
  },
  {
    chave: "remarcar",
    title: "Pedido de reagendamento.",
    caption: "O horário livre volta para a agenda antes de virar prejuízo.",
    messages: [
      { side: "in", text: "Preciso remarcar minha consulta de quinta, deu um imprevisto." },
      {
        side: "out",
        text: "Sem problema, Paulo. Tenho sexta às 9h ou segunda às 16h30. Qual prefere?",
      },
      { side: "in", text: "Sexta às 9h" },
      { side: "out", text: "Reagendado para sexta, 9h. Já liberei o horário de quinta na agenda." },
    ],
  },
];

/** Os balões de uma conversa, sem a moldura em volta. */
export const Baloes = ({ messages }: { messages: Msg[] }) => (
  <>
    {messages.map((m, j) => (
      <div key={j} className={`flex ${m.side === "in" ? "justify-start" : "justify-end"}`}>
        <div
          className="max-w-[88%] px-3 py-2 text-[13px] leading-snug"
          style={
            m.side === "in"
              ? {
                  background: "#FFFFFF",
                  color: "#1F2937",
                  border: "1px solid #F9FAFB",
                  borderRadius: "14px 14px 14px 4px",
                }
              : {
                  background: "#E8F8EF",
                  color: "#0F3D2E",
                  borderRadius: "14px 14px 4px 14px",
                }
          }
        >
          {m.text}
        </div>
      </div>
    ))}
  </>
);

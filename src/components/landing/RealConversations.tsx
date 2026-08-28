import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { revealOnScroll } from "@/lib/animations";

type Msg = { side: "in" | "out"; text: string };
type Convo = {
  tag: string;
  title: string;
  caption: string;
  messages: Msg[];
  footer?: string;
};

const conversations: Convo[] = [
  {
    tag: "Novo paciente",
    title: "Novo paciente querendo agendar.",
    caption: "Resposta em segundos e agenda fechada na mesma conversa.",
    messages: [
      { side: "in", text: "Oi, vocês atendem amanhã? Preciso marcar uma consulta." },
      { side: "out", text: "Oi, Carla! Atendemos sim. Temos 10h30 ou 14h amanhã. Qual te encaixa melhor?" },
      { side: "in", text: "10h30 perfeito" },
      { side: "out", text: "Marcado! Dr. Rodrigo, amanhã às 10h30. Te mando um lembrete 1h antes." },
    ],
  },
  {
    tag: "Confirmação",
    title: "Paciente confirmando presença.",
    caption: "A confirmação acontece sozinha. Menos faltas, sem ninguém ligar.",
    messages: [
      { side: "out", text: "Oi, Ana! Hoje você tem consulta com a Dra. Mariana às 14h. Confirma presença?" },
      { side: "in", text: "Confirmo sim, obrigada pelo lembrete!" },
      { side: "out", text: "Perfeito. Te espero por aqui." },
    ],
  },
  {
    tag: "Reagendamento",
    title: "Pedido de reagendamento.",
    caption: "O horário livre volta para a agenda antes de virar prejuízo.",
    messages: [
      { side: "in", text: "Preciso remarcar minha consulta de quinta, deu um imprevisto." },
      { side: "out", text: "Sem problema, Paulo. Tenho sexta às 9h ou segunda às 16h30. Qual prefere?" },
      { side: "in", text: "Sexta às 9h" },
      { side: "out", text: "Reagendado para sexta, 9h. Já liberei o horário de quinta na agenda." },
    ],
  },
];

const RealConversations = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="conversas-reais" className="py-14 md:section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-6 md:mb-8 max-w-2xl mx-auto" data-reveal>
          <h2 className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-bold text-[var(--text)] text-balance">
            Veja como seus pacientes seriam atendidos.
          </h2>
          <p className="font-sans text-[17px] md:text-[19px] text-[#4B5563] mt-4 leading-[1.6]">
            Conversas reais. Do primeiro “oi” até o próximo passo.
          </p>
        </div>


        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {conversations.map((c, i) => (
            <article
              key={i}
              data-reveal
              className="rounded-3xl p-4 sm:p-5 flex flex-col"
              style={{
                background: "#F1FBF8",
                border: "1px solid #D6F3EE",
                boxShadow: "0 20px 44px rgba(10,140,126,0.10), 0 4px 12px rgba(15,23,42,0.04)",
              }}
            >
              <h3 className="font-display text-[17px] md:text-[18px] font-semibold text-[var(--text)] leading-snug">
                {c.title}
              </h3>
              <p className="font-sans text-[17px] text-[#4B5563] mt-2 leading-relaxed">
                {c.caption}
              </p>

              <div
                className="mt-4 rounded-2xl p-3 space-y-2 flex-1"
                style={{ background: "#FFFFFF", border: "1px solid #ECFBF7" }}
              >
                {c.messages.map((m, j) => (
                  <div key={j} className={`flex ${m.side === "in" ? "justify-start" : "justify-end"}`}>
                    <div
                      className="text-[13px] leading-snug px-3 py-2 max-w-[88%]"
                      style={
                        m.side === "in"
                          ? {
                              background: "#FFFFFF",
                              color: "#1F2937",
                              border: "1px solid #F9FAFB",
                              borderRadius: "14px 14px 14px 4px",
                            }
                          : {
                              background: "#E7F8EF",
                              color: "#0F3D2E",
                              borderRadius: "14px 14px 4px 14px",
                            }
                      }
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealConversations;

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Eyebrow from "@/components/ui/Eyebrow";
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
    tag: "Agendamento",
    title: "Sábado, 22h47. Paciente novo.",
    caption: "Resposta em 3 segundos. Agenda na mesma conversa, sem ninguém da equipe acordado.",
    messages: [
      { side: "in", text: "Oi, vocês atendem amanhã? Preciso urgente." },
      {
        side: "out",
        text:
          "Oi, Carla! 😊 Atendemos sim. Temos 10h30 ou 14h amanhã. Qual te encaixa melhor?",
      },
      { side: "in", text: "10h30 perfeito" },
      {
        side: "out",
        text:
          "Marcado! Dr. Rodrigo, amanhã 10h30. Já vou te mandar lembrete 1h antes. Posso te passar o endereço por aqui mesmo?",
      },
    ],
    footer: "Lead agendado fora do horário comercial",
  },
  {
    tag: "Follow-up",
    title: "Lembrete que reduz no-show.",
    caption: "A IA confirma a presença algumas horas antes. Menos faltas, agenda mais cheia.",
    messages: [
      {
        side: "out",
        text:
          "Oi, Ana! 😊 Passando pra lembrar: hoje você tem consulta com a Dra. Mariana às 14h. Confirma que vai conseguir vir?",
      },
      { side: "in", text: "Confirmo sim, obrigada pelo lembrete!" },
      {
        side: "out",
        text:
          "Perfeito. Te espero por aqui. Se precisar de algo antes, é só chamar.",
      },
    ],
    footer: "No-show reduzido sem ninguém ligar",
  },
  {
    tag: "Cancelamento",
    title: "Em vez de só cancelar, a IA reagenda.",
    caption: "Reduz o buraco na agenda sem ser insistente.",
    messages: [
      { side: "in", text: "Preciso cancelar amanhã" },
      {
        side: "out",
        text:
          "Sem problema, Pedro. Posso já te oferecer outro horário pra não perder o acompanhamento? Tenho sexta 14h ou segunda 10h.",
      },
      { side: "in", text: "Segunda 10h tá bom" },
      { side: "out", text: "Cancelei amanhã e remarquei pra segunda 10h. Te lembro 24h antes." },
    ],
  },

];

const RealConversations = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="conversas-reais" className="py-14 md:section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// conversas reais</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            Veja a IA <em>trabalhando de verdade.</em>
          </h2>
          <p className="font-sans text-sm md:text-base text-[var(--text-muted)] mt-3 md:mt-5 leading-relaxed">
            Sem mockup bonitinho. Conversas reais (com nomes trocados): agendamento, objeção,
            follow-up, áudio, pergunta fora do script, cancelamento.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {conversations.map((c, i) => (
            <article
              key={i}
              data-reveal
              className="rounded-3xl p-4 sm:p-5 flex flex-col"
              style={{
                background: "#FFFFFF",
                border: "1px solid #EEE7DE",
                boxShadow: "0 18px 44px rgba(70,55,35,0.08)",
              }}
            >
              <span
                className="self-start font-mono text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full mb-3"
                style={{ background: "#F1EEFF", color: "#6F63E8" }}
              >
                {c.tag}
              </span>
              <h3 className="font-display text-[17px] md:text-[18px] font-semibold text-[var(--text)] leading-snug">
                {c.title}
              </h3>
              <p className="font-sans text-[13px] text-[var(--text-muted)] mt-1.5 leading-relaxed">
                {c.caption}
              </p>

              <div
                className="mt-4 rounded-2xl p-3 space-y-2 flex-1"
                style={{ background: "#FBFAF7", border: "1px solid #F1ECE4" }}
              >
                {c.messages.map((m, j) => (
                  <div key={j} className={`flex ${m.side === "in" ? "justify-start" : "justify-end"}`}>
                    <div
                      className="text-[13px] leading-snug px-3 py-2 max-w-[88%]"
                      style={
                        m.side === "in"
                          ? {
                              background: "#FFFFFF",
                              color: "#1D1D24",
                              border: "1px solid #ECE5DB",
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

              {c.footer && (
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#6F63E8] mt-3">
                  ✓ {c.footer}
                </p>
              )}
            </article>
          ))}
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-dim)] text-center mt-8 max-w-2xl mx-auto">
          Conversas anonimizadas de clientes reais. Quer ver a sua acontecendo? Teste no botão acima.
        </p>
      </div>
    </section>
  );
};

export default RealConversations;

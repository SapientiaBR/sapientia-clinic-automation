import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Clock, CalendarCheck, BellRing, Sparkles, LayoutDashboard, HeartHandshake } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { revealOnScroll } from "@/lib/animations";

const features = [
  { Icon: Clock,            title: "Atendimento 24/7 no WhatsApp",  desc: "Domingo às 23h, feriado, hora do almoço. Responde em segundos — toda vez, todo dia." },
  { Icon: CalendarCheck,    title: "Agenda integrada",              desc: "Lê sua agenda real, sugere os melhores horários, evita choques e marca no calendário." },
  { Icon: BellRing,         title: "Lembretes e confirmação",       desc: "Lembrete 24h antes. Reagendamento sem fricção. Faltas em queda." },
  { Icon: Sparkles,         title: "Reativação de base inativa",    desc: "Pacientes que sumiram voltam — em campanhas que parecem conversa, não spam." },
  { Icon: LayoutDashboard,  title: "Painel e acompanhamento",       desc: "Veja todas as conversas, métricas de agendamento e relatório semanal. Você no controle, sem operar." },
  { Icon: HeartHandshake,   title: "Suporte humano dedicado",       desc: "Time da Sapient.IA ajustando fluxos, tom de voz e regras toda semana. Você não fica sozinho com a IA." },
];

const Solutions = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="solucoes" className="section-padding relative bg-[#E6F6F1]" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-6 md:mb-14 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// recursos</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            Infraestrutura. <em>Não chatbot.</em>
          </h2>
          <p className="hidden md:block font-sans text-base text-[var(--text-muted)] mt-5 leading-relaxed">
            Seis camadas que trabalham juntas — WhatsApp, agenda, lembretes, reativação, painel e suporte humano. Não é um bot solto; é uma operação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {features.map((f, i) => (
            <div key={i} className="card-base p-4 md:p-7 group" data-reveal>
              <div className="grid grid-cols-[auto_1fr] items-center gap-3 md:block md:gap-0">
                <div
                  className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center md:mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: "linear-gradient(135deg, #D6F3EE, #D6F3EE)",
                  }}
                >
                  <f.Icon size={22} style={{ color: "#0A8C7E" }} />
                </div>
                <h3 className="font-display text-base md:text-xl font-semibold text-[var(--text)] leading-tight">{f.title}</h3>
              </div>
              <p className="font-sans text-[13px] md:text-sm text-[var(--text-muted)] leading-snug md:leading-relaxed mt-2 md:mt-3">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;

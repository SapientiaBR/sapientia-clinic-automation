import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Clock, CalendarCheck, BellRing, Sparkles } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { gsap, EASE } from "@/lib/animations";

const features = [
  {
    Icon: Clock,
    title: "Atendimento 24/7",
    desc: "Domingo às 23h, feriado, hora do almoço. Responde em segundos — toda vez, todo dia.",
  },
  {
    Icon: CalendarCheck,
    title: "Agendamento inteligente",
    desc: "Lê sua agenda, sugere os melhores horários, evita choques.",
  },
  {
    Icon: BellRing,
    title: "Confirmação automática",
    desc: "Lembrete 24h antes. Reagendamento sem fricção. Faltas em queda.",
  },
  {
    Icon: Sparkles,
    title: "Reativação de base inativa",
    desc: "Pacientes que sumiram voltam — em campanhas que parecem conversa, não spam.",
  },
];

const Solutions = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.from(ref.current!.querySelectorAll("[data-reveal]"), {
        y: 60, opacity: 0, duration: 0.7, ease: EASE, stagger: 0.2,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    });
    mm.add("(max-width: 767px)", () => {
      gsap.from(ref.current!.querySelectorAll("[data-reveal]"), {
        y: 30, opacity: 0, duration: 0.6, ease: EASE, stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section id="solucoes" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-14 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// recursos</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            Infraestrutura. <em>Não chatbot.</em>
          </h2>
          <p className="font-sans text-base text-[var(--text-muted)] mt-5 leading-relaxed">
            Cada recurso foi desenhado para sumir do seu caminho — e fazer o trabalho que ninguém vê.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="card-base p-7 group" data-reveal>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))",
                  boxShadow: "0 0 30px rgba(124,58,237,0.2)",
                }}
              >
                <f.Icon size={24} className="text-cyan-300" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">{f.title}</h3>
              <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;

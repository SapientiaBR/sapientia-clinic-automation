import { MessageSquareX, UserX, CalendarX, Clock, Users, HelpCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const problems = [
  { icon: MessageSquareX, text: "Domingos e feriados: mensagens acumulando enquanto você descansa", accent: "coral" },
  { icon: UserX, text: "Pacientes fechando com a concorrência por não terem resposta rápida (menos de 5 min)", accent: "rose" },
  { icon: CalendarX, text: "Agendamentos que esfriam porque demorou para responder qual o valor da consulta", accent: "amber" },
  { icon: Clock, text: "Faltas surpresas na agenda porque não houve confirmação no dia anterior", accent: "pink" },
  { icon: Users, text: "Secretária sobrecarregada tendo que atender balcão e responder WhatsApp ao mesmo tempo", accent: "sky" },
  { icon: HelpCircle, text: "Dúvidas repetitivas sobre localização e convênios ocupando horas da equipe", accent: "indigo" },
];

const Problems = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="problema" className="section-padding relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl font-bold text-center mb-4 text-balance transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Esses problemas parecem <em>familiares?</em>
        </h2>
        <p
          className={`text-muted-foreground text-center mb-14 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Seu consultório já recebe contatos. Mas quantos deles se tornam consultas de verdade?
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className={`feature-card border-accent-${p.accent} flex items-start gap-5 group cursor-default transition-all duration-700 hover:shadow-lg hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${150 + i * 80}ms` }}
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-background/50 border border-border-default flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                <p.icon size={22} className={`text-accent-${p.accent}`} />
              </div>
              <p className="text-sm font-medium text-foreground/90 leading-relaxed pt-1">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;

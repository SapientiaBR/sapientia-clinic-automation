import { MessageSquareX, UserX, CalendarX, Clock, Users, HelpCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const problems = [
  { icon: MessageSquareX, text: "Mensagens no WhatsApp que ficam horas sem resposta", color: "from-red-500/20 to-red-500/5" },
  { icon: UserX, text: "Pacientes que pedem informações e nunca mais voltam", color: "from-orange-500/20 to-orange-500/5" },
  { icon: CalendarX, text: "Agendamentos que começam mas não são concluídos", color: "from-amber-500/20 to-amber-500/5" },
  { icon: Clock, text: "Consultas esquecidas — faltas que custam tempo e dinheiro", color: "from-rose-500/20 to-rose-500/5" },
  { icon: Users, text: "Recepcionista sobrecarregada que não dá conta de tudo", color: "from-pink-500/20 to-pink-500/5" },
  { icon: HelpCircle, text: "Sem visibilidade de quantos pacientes foram perdidos na semana", color: "from-purple-500/20 to-purple-500/5" },
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
          Esses problemas parecem{" "}
          <span className="gradient-text">familiares?</span>
        </h2>
        <p
          className={`text-muted-foreground text-center mb-14 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Seu consultório já recebe contatos. Mas quantos deles se tornam consultas de verdade?
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <div
              key={i}
              className={`glass-card-hover rounded-xl p-5 flex items-start gap-4 group cursor-default ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${150 + i * 80}ms` }}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                <p.icon size={20} className="text-foreground/80" />
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;

import { MessageSquareX, UserX, CalendarX, Clock, Users, HelpCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const problems = [
  { icon: MessageSquareX, text: "Mensagens no WhatsApp que ficam horas sem resposta" },
  { icon: UserX, text: "Pacientes que pedem informações e nunca mais voltam" },
  { icon: CalendarX, text: "Agendamentos que começam mas não são concluídos" },
  { icon: Clock, text: "Consultas esquecidas — faltas que custam seu tempo e dinheiro" },
  { icon: Users, text: "Recepcionista sobrecarregada que não consegue responder todo mundo" },
  { icon: HelpCircle, text: "Você não sabe quantos pacientes perdeu essa semana" },
];

const Problems = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="problema" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          O problema não é falta de pacientes.{" "}
          <span className="gradient-text">É perda de pacientes.</span>
        </h2>
        <p className={`text-muted-foreground text-center mb-12 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          Seu consultório já recebe contatos. Mas quantos deles viram consulta de verdade?
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <div
              key={i}
              className={`glass-card rounded-xl p-5 flex items-start gap-4 hover:border-accent/30 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${150 + i * 80}ms` }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <p.icon size={20} className="text-foreground" />
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;

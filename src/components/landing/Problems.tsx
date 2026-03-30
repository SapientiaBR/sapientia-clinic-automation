import { PhoneOff, MessageSquareX, FileText, CalendarX, Clock, BarChart3 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const problems = [
  { icon: PhoneOff, text: "Pacientes ligam fora do horário e ninguém atende" },
  { icon: MessageSquareX, text: "Sua secretária não dá conta do volume de WhatsApp" },
  { icon: FileText, text: "Prontuários e fichas ainda são preenchidos em papel" },
  { icon: CalendarX, text: "Pacientes esquecem consultas e você perde faturamento com faltas" },
  { icon: Clock, text: "Você perde tempo com tarefas administrativas em vez de atender" },
  { icon: BarChart3, text: "Não sabe quantos leads chegam e quantos viram pacientes" },
];

const Problems = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="dores" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Isso acontece no seu{" "}
          <span className="gradient-text">consultório?</span>
        </h2>
        <p className={`text-muted-foreground text-center mb-12 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          Se você se identificou com ao menos uma dessas situações, sua clínica está deixando dinheiro na mesa.
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

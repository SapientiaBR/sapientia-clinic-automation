import { X, Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const comparisons = [
  { before: "Mensagens sem resposta por horas", after: "Resposta em menos de 10 segundos" },
  { before: "Pacientes perdidos por falta de retorno", after: "Cada contato atendido na hora" },
  { before: "Agenda manual com buracos frequentes", after: "Agendamento automático e otimizado" },
  { before: "Faltas recorrentes sem aviso", after: "Lembretes automáticos com confirmação" },
  { before: "Recepcionista sobrecarregada", after: "Equipe focada no atendimento presencial" },
  { before: "Sem dados sobre pacientes perdidos", after: "Visibilidade total do funil de atendimento" },
];

const Visualization = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(175_85%_45%)] opacity-[0.04] blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-14 text-balance transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          A diferença entre perder e <em>reter pacientes</em>
        </h2>

        {/* Before vs After comparison */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-0">
          {/* Before Column */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="bg-destructive/5 border border-destructive/10 rounded-2xl md:rounded-r-none p-6 sm:p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-destructive/15 flex items-center justify-center">
                  <X size={16} className="text-destructive" />
                </div>
                <h3 className="font-display font-semibold text-lg text-destructive/90">Sem Automação</h3>
              </div>
              <div className="space-y-4">
                {comparisons.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <X size={16} className="text-destructive/60 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground/60 leading-relaxed">{item.before}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* After Column */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="glass border-success/20 rounded-2xl md:rounded-l-none p-6 sm:p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-success/15 flex items-center justify-center">
                  <Check size={16} className="text-success" />
                </div>
                <h3 className="font-display font-semibold text-lg text-success/90">Com Sapient.IA</h3>
              </div>
              <div className="space-y-4">
                {comparisons.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-success/80 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-foreground/85 leading-relaxed">{item.after}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visualization;

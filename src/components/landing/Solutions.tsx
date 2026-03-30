import { Zap, CalendarCheck, Bell, LayoutList, Heart, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const solutions = [
  {
    icon: Zap,
    title: "Responde em segundos",
    desc: "Cada mensagem é respondida em segundos — 24h por dia, 7 dias por semana. Seu paciente nunca mais fica esperando.",
  },
  {
    icon: CalendarCheck,
    title: "Agenda automaticamente",
    desc: "Consultas agendadas sem você ou sua equipe precisar fazer nada. O sistema cuida de tudo.",
  },
  {
    icon: Bell,
    title: "Envia lembretes",
    desc: "Lembretes e confirmações automáticas que reduzem faltas drasticamente. Menos buraco na agenda.",
  },
  {
    icon: LayoutList,
    title: "Organiza o fluxo",
    desc: "Todo o fluxo de atendimento organizado — sem depender de planilha, caderno ou memória.",
  },
  {
    icon: Heart,
    title: "Atendimento humanizado",
    desc: "Se adapta ao seu jeito de atender — sem parecer robótico. Seus pacientes nem percebem a diferença.",
  },
  {
    icon: MessageCircle,
    title: "Funciona no WhatsApp",
    desc: "Opera direto no WhatsApp — onde seus pacientes já estão. Sem app novo, sem complicação.",
  },
];

const Solutions = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="solucoes" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full bg-[hsl(270_80%_24%)] opacity-10 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Uma secretária de IA que nunca dorme,{" "}
          <span className="gradient-text">nunca falta e nunca esquece.</span>
        </h2>
        <p className={`text-muted-foreground text-center mb-12 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          Imagine ter alguém respondendo cada paciente em segundos. Todos os dias. Inclusive de madrugada.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <div
              key={i}
              className={`glass-card rounded-2xl p-6 group hover:border-accent/30 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${150 + i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <s.icon size={24} className="text-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;

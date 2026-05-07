import { Zap, CalendarCheck, Bell, LayoutList, Heart, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const solutions = [
  {
    icon: Zap,
    title: "Responde em segundos",
    desc: "Cada mensagem é respondida em segundos — 24h por dia, 7 dias por semana. Seu paciente nunca mais fica esperando.",
    featured: true,
  },
  {
    icon: CalendarCheck,
    title: "Agenda automaticamente",
    desc: "Consultas agendadas sem sua equipe precisar fazer nada. O sistema cuida de tudo, inclusive disponibilidade.",
    featured: true,
  },
  {
    icon: Bell,
    title: "Envia lembretes",
    desc: "Lembretes e confirmações automáticas que reduzem faltas drasticamente. Menos buracos na agenda.",
    featured: false,
  },
  {
    icon: LayoutList,
    title: "Organiza o fluxo",
    desc: "Todo o fluxo de atendimento organizado — sem depender de planilha, caderno ou memória.",
    featured: false,
  },
  {
    icon: Heart,
    title: "Atendimento humanizado",
    desc: "Se adapta ao tom de voz da sua clínica — natural e empático. Seus pacientes nem percebem a diferença.",
    featured: false,
  },
  {
    icon: MessageCircle,
    title: "Funciona no WhatsApp",
    desc: "Opera direto no WhatsApp — onde seus pacientes já estão. Sem app novo, sem complicação.",
    featured: false,
  },
];

const Solutions = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="solucoes" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full bg-[hsl(265_75%_28%)] opacity-[0.06] blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl font-bold text-center mb-4 text-balance transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          O que a Sapient.IA faz <em>pelo seu consultório</em>
        </h2>
        <p
          className={`text-muted-foreground text-center mb-14 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Uma secretária de IA que nunca dorme, nunca falta e nunca esquece.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <div
              key={i}
              className={`glass hover:border-border-hover transition-all duration-300 rounded-3xl p-8 group ${
                s.featured ? "sm:col-span-1 shadow-[0_0_20px_rgba(6,182,212,0.1)] border-cyan-500/20" : ""
              } ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${150 + i * 80}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${
                s.featured ? "gradient-brand shadow-[0_0_15px_rgba(6,182,212,0.2)]" : "gradient-subtle shadow-inner"
              } flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
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

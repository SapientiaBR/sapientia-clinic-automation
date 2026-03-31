import { MessageCircle, Settings, CalendarCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Diagnóstico gratuito",
    desc: "Conversamos sobre seu consultório, seus pacientes e o que pode ser automatizado. Você entende o potencial sem compromisso.",
    detail: "30 minutos • Online • Sem custo",
  },
  {
    number: "02",
    icon: Settings,
    title: "Configuração sob medida",
    desc: "Montamos o sistema personalizado com o tom de voz e as regras do seu atendimento. Nós cuidamos de tudo.",
    detail: "Implementação completa pela equipe",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Resultados em dias",
    desc: "Sua IA começa a atender pelo WhatsApp. Você acompanha tudo e ajusta quando quiser.",
    detail: "Suporte contínuo incluso",
  },
];

const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="como-funciona" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(265_75%_28%)] opacity-[0.05] blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl font-bold text-center mb-4 text-balance transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Como funciona na{" "}
          <span className="gradient-text">prática</span>
        </h2>
        <p
          className={`text-muted-foreground text-center mb-16 max-w-xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Do primeiro contato ao sistema funcionando — em poucos dias.
        </p>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[27px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent hidden sm:block" />

          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex flex-col sm:flex-row items-start gap-6 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                {/* Number circle */}
                <div className="relative z-10 sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl gradient-bg-vibrant flex items-center justify-center shadow-lg shadow-accent/10">
                    <span className="text-foreground font-bold text-lg font-display">{step.number}</span>
                  </div>
                </div>

                {/* Content card */}
                <div className={`sm:w-[calc(50%-3rem)] ${
                  i % 2 === 0 ? "sm:mr-auto sm:text-right sm:pr-4" : "sm:ml-auto sm:pl-4"
                }`}>
                  <div className="glass-card-hover rounded-xl p-6">
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "sm:justify-end" : ""}`}>
                      <step.icon size={18} className="text-accent" />
                      <h3 className="font-display font-semibold text-lg text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.desc}</p>
                    <span className="text-xs text-accent/70 font-medium">{step.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

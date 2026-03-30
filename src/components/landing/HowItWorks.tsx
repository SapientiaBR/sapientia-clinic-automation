import { Video, Cog, Rocket } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  { icon: Video, num: "01", title: "Conversamos sobre seu consultório", desc: "Em 30 minutos, entendemos seu fluxo e suas dores." },
  { icon: Cog, num: "02", title: "Montamos seu sistema sob medida", desc: "Configuramos tudo — sem você precisar entender de tecnologia." },
  { icon: Rocket, num: "03", title: "Seu atendimento funciona no automático", desc: "Em poucos dias, seus pacientes são respondidos 24h. Sem falha." },
];

const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="como-funciona" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="gradient-text">Simples assim</span>
        </h2>
        <p className={`text-muted-foreground text-center mb-16 max-w-xl mx-auto transition-all duration-700 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          Três passos para seu consultório nunca mais perder paciente.
        </p>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-[hsl(270_80%_40%)] to-[hsl(190_100%_50%)]" />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative flex flex-col items-center text-center transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 relative z-10">
                <step.icon size={28} className="text-foreground" />
              </div>
              <span className="text-xs font-mono text-accent mb-2">{step.num}</span>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

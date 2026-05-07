import { TrendingUp, Fingerprint, Settings, HeadphonesIcon, Quote, Star, Instagram } from "lucide-react";
import draMariana from "@/assets/dra-mariana-fogarolli.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

const credentials = [
  { icon: TrendingUp, text: "Sistemas que recuperam pacientes que seriam perdidos por falta de resposta" },
  { icon: Fingerprint, text: "IA personalizada — não é chatbot genérico de prateleira" },
  { icon: Settings, text: "Implementação completa — você não precisa configurar nada" },
  { icon: HeadphonesIcon, text: "Suporte contínuo — ajustes e acompanhamento inclusos" },
];

const metrics = [
  { value: 95, suffix: "%", prefix: "", label: "de satisfação dos clientes" },
  { value: 60, suffix: "%", prefix: "-", label: "de faltas reduzidas" },
  { value: 24, suffix: "/7", prefix: "", label: "atendimento automático" },
];

const SocialProof = () => {
  const { ref, isVisible } = useScrollAnimation();
  const count0 = useCountUp(metrics[0].value, 2000, isVisible);
  const count1 = useCountUp(metrics[1].value, 2000, isVisible);
  const count2 = useCountUp(metrics[2].value, 1500, isVisible);
  const counts = [count0, count1, count2];

  return (
    <section id="depoimentos" className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(175_85%_45%)] opacity-[0.04] blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl font-bold text-center mb-4 text-balance transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Por que médicos escolhem a <em>Sapient.IA</em>
        </h2>
        <p
          className={`text-muted-foreground text-center mb-14 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Resultados reais de consultórios que decidiram automatizar o atendimento.
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-16 max-w-3xl mx-auto">
          {metrics.map((m, i) => (
            <div
              key={i}
              className={`text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${100 + i * 100}ms` }}
            >
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text tabular-nums">
                {m.prefix}{counts[i].toLocaleString("pt-BR")}{m.suffix}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Credentials */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {credentials.map((c, i) => (
            <div
              key={i}
              className={`glass hover:border-border-hover transition-all duration-300 rounded-2xl p-6 text-center ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${350 + i * 80}ms` }}
            >
              <div className="w-14 h-14 mx-auto rounded-xl gradient-subtle flex items-center justify-center mb-5 shadow-inner">
                <c.icon size={24} className="text-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground/90 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="max-w-2xl mx-auto">
          <div
            className={`glass rounded-3xl p-8 md:p-10 transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-amber fill-amber drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              ))}
            </div>
            <Quote size={28} className="mb-4 text-accent/40" />
            <p className="text-foreground/90 italic mb-8 leading-relaxed text-base font-medium">
              "Minha rotina mudou completamente. Antes, eu respondia tudo sozinha quando sobrava tempo. Muitos pacientes desistiam. Agora cada um é atendido na hora, e eu finalmente foco no que importa: a medicina."
            </p>
            <div className="flex items-center gap-4">
              <img src={draMariana} alt="Dra. Mariana Fogarolli" className="w-14 h-14 rounded-full object-cover border-2 border-accent/30" />
              <div>
                <p className="text-base font-bold text-foreground">Dra. Mariana Fogarolli</p>
                <p className="text-sm text-accent">Endocrinologista</p>
                <a href="https://instagram.com/dramarianafogarolli" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors mt-0.5">
                  <Instagram size={14} />
                  @dramarianafogarolli
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

import { TrendingUp, Fingerprint, Settings, HeadphonesIcon, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

const credentials = [
  { icon: TrendingUp, text: "Consultórios que recuperaram até 30 pacientes/mês que estavam sendo perdidos" },
  { icon: Fingerprint, text: "Sistema personalizado — não é chatbot genérico" },
  { icon: Settings, text: "Implementação completa — você não precisa fazer nada" },
  { icon: HeadphonesIcon, text: "Suporte contínuo — estamos junto do começo ao fim" },
];

const metrics = [
  { value: 2400, suffix: "", prefix: "+", label: "pacientes recuperados" },
  { value: 60, suffix: "%", prefix: "-", label: "faltas reduzidas" },
  { value: 24, suffix: "/7", prefix: "", label: "atendimento automático" },
];

const SocialProof = () => {
  const { ref, isVisible } = useScrollAnimation();
  const count0 = useCountUp(metrics[0].value, 2000, isVisible);
  const count1 = useCountUp(metrics[1].value, 2000, isVisible);
  const count2 = useCountUp(metrics[2].value, 1500, isVisible);
  const counts = [count0, count1, count2];

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(190_100%_50%)] opacity-5 blur-[150px]" />
        <div className="logo-watermark" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl font-bold text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Por que médicos confiam na{" "}
          <span className="gradient-text">Sapient.IA</span>
        </h2>

        {/* Big metrics */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-16 max-w-3xl mx-auto">
          {metrics.map((m, i) => (
            <div
              key={i}
              className={`text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${100 + i * 100}ms` }}
            >
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text">
                {m.prefix}{counts[i].toLocaleString("pt-BR")}{m.suffix}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {credentials.map((c, i) => (
            <div
              key={i}
              className={`glass-card rounded-xl p-5 text-center transition-all duration-500 hover:border-accent/30 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${350 + i * 80}ms` }}
            >
              <div className="w-12 h-12 mx-auto rounded-xl gradient-bg flex items-center justify-center mb-4">
                <c.icon size={22} className="text-foreground" />
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div
            className={`glass-card rounded-2xl p-8 text-center gradient-border transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Quote size={28} className="mx-auto mb-4 text-accent opacity-50" />
            <p className="text-foreground/90 italic mb-4 leading-relaxed text-sm">
              "Eu não fazia ideia de quantos pacientes estava perdendo por falta de resposta. Depois da Sapient.IA, minha agenda encheu e as faltas caíram pela metade. Foi o melhor investimento que fiz no consultório."
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Dr. Ricardo Mendes</strong> - Dermatologista
            </p>
          </div>
          <div
            className={`glass-card rounded-2xl p-8 text-center gradient-border transition-all duration-700 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Quote size={28} className="mx-auto mb-4 text-accent opacity-50" />
            <p className="text-foreground/90 italic mb-4 leading-relaxed text-sm">
              "Eu tinha um consultório movimentado, mas respondia tudo sozinha — quando sobrava tempo. Muitos pacientes desistiam antes mesmo de eu ver a mensagem. Desde que contratei a Sapient.IA, minha rotina mudou completamente. Agora cada paciente é atendido na hora, e eu finalmente tenho tempo pra focar no que realmente importa: a medicina."
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Dra. Mariana Fogarolli</strong> - Endocrinologista
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

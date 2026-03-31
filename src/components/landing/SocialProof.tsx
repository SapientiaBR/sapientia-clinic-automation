import { TrendingUp, Fingerprint, Settings, HeadphonesIcon, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const credentials = [
  { icon: TrendingUp, text: "Consultórios que recuperaram até 30 pacientes/mês que estavam sendo perdidos" },
  { icon: Fingerprint, text: "Sistema personalizado — não é chatbot genérico" },
  { icon: Settings, text: "Implementação completa — você não precisa fazer nada" },
  { icon: HeadphonesIcon, text: "Suporte contínuo — estamos junto do começo ao fim" },
];

const SocialProof = () => {
  const { ref, isVisible } = useScrollAnimation();

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {credentials.map((c, i) => (
            <div
              key={i}
              className={`glass-card rounded-xl p-5 text-center transition-all duration-500 hover:border-accent/30 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${150 + i * 80}ms` }}
            >
              <div className="w-12 h-12 mx-auto rounded-xl gradient-bg flex items-center justify-center mb-4">
                <c.icon size={22} className="text-foreground" />
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Testimonial placeholder */}
        <div
          className={`max-w-2xl mx-auto glass-card rounded-2xl p-8 text-center gradient-border transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Quote size={32} className="mx-auto mb-4 text-accent opacity-50" />
          <p className="text-foreground/90 italic mb-4 leading-relaxed">
            "Eu não fazia ideia de quantos pacientes estava perdendo por falta de resposta. Depois da Sapient.IA, minha agenda encheu e as faltas caíram pela metade. Foi o melhor investimento que fiz no consultório."
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Dr. Ricardo Mendes</strong> — Clínica Dermatológica, São Paulo
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

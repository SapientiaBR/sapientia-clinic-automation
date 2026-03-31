import { MessageSquare } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const WHATSAPP_URL = "https://wa.me/5511999999999";

const Aggravation = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full bg-[hsl(0_70%_30%)] opacity-5 blur-[150px]" />
        <div className="logo-watermark" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Cada paciente que não recebe resposta em minutos…{" "}
          <span className="gradient-text">procura outro médico.</span>
        </h2>

        <div className="space-y-8 mb-16">
          {[
            "O paciente mandou mensagem às 21h. Ninguém respondeu. Às 21h05, ele já estava no consultório concorrente.",
            "Isso acontece todos os dias. Em silêncio. Sem que você perceba.",
            "E não são 1 ou 2 pacientes. São dezenas por mês.",
          ].map((text, i) => (
            <p
              key={i}
              className={`text-lg sm:text-xl text-foreground/90 text-center leading-relaxed transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Impact stat */}
        <div
          className={`glass-card rounded-2xl p-8 text-center gradient-border max-w-lg mx-auto mb-12 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-5xl sm:text-6xl font-bold gradient-text mb-3">82%</p>
          <p className="text-muted-foreground text-sm sm:text-base">
            dos pacientes esperam resposta em até 1 hora — e vão embora se não recebem.
          </p>
        </div>

        <div
          className={`text-center transition-all duration-700 delay-[800ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg inline-flex items-center gap-2 text-foreground font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
          >
            <MessageSquare size={18} />
            Quero resolver isso agora
          </a>
        </div>
      </div>
    </section>
  );
};

export default Aggravation;

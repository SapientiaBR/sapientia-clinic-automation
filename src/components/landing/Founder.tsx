import { Linkedin, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Founder = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl" ref={ref}>
        <div
          className={`glass-card rounded-2xl p-8 sm:p-10 lg:p-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl gradient-bg-vibrant flex items-center justify-center text-4xl font-bold text-foreground font-display shadow-lg shadow-accent/10">
                LF
              </div>
            </div>

            {/* Content */}
            <div className="text-center md:text-left">
              <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-2">
                Quem está por trás
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-1 text-foreground">
                Leo Figueiredo
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Fundador da Sapient.IA • Arquiteto de Automação
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4 max-w-xl">
                Especialista em transformar operações manuais de clínicas e consultórios em ecossistemas autônomos.
                Cada sistema que construo segue um princípio simples:{" "}
                <span className="text-foreground font-medium">simplificar antes de automatizar, e automatizar antes de escalar.</span>
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xl">
                Meu trabalho é entender a rotina do seu consultório e criar uma infraestrutura que funciona por você — sem complicação, sem dependência de tecnologia, sem mudar o jeito que você atende.
              </p>

              <a
                href="https://www.linkedin.com/in/figueiredo-leonardo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors group"
              >
                <Linkedin size={16} />
                Ver perfil no LinkedIn
                <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;

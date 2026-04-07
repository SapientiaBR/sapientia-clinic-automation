import { MessageSquare, Shield, Clock, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CTA_HREF = "#formulario";

const FinalCTA = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[hsl(265_75%_28%)] opacity-15 blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[hsl(175_85%_45%)] opacity-8 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl" ref={ref}>
        <div
          className={`glass-card rounded-3xl p-6 sm:p-12 lg:p-16 text-center gradient-border transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Pronto para ver sua clínica{" "}
            <span className="gradient-text">funcionar no automático?</span>
          </h2>

          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Agende um diagnóstico gratuito. Em 30 minutos, mapeamos o que pode ser automatizado no seu consultório — sem compromisso.
          </p>

          {/* Benefits checklist */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10 text-sm text-foreground/80">
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-success" />
              Diagnóstico gratuito
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-success" />
              Implementação em dias
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={16} className="text-success" />
              Zero conhecimento técnico
            </span>
          </div>

          {/* Main CTA */}
          <a
            href={CTA_HREF}
            className="cta-gradient inline-flex items-center gap-3 text-foreground font-bold px-10 py-5 rounded-xl hover:opacity-90 transition-all duration-200 text-lg animate-pulse-glow"
          >
            <MessageSquare size={22} />
            Agendar Meu Diagnóstico Gratuito
          </a>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground/60">
            <span className="flex items-center gap-1.5">
              <Shield size={12} />
              Conversa sigilosa
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              Resposta em até 2h
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

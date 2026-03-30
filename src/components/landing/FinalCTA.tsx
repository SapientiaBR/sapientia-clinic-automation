import { MessageSquare } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const WHATSAPP_URL = "https://wa.me/5511999999999";

const FinalCTA = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[hsl(270_80%_24%)] opacity-15 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Pare de perder pacientes.{" "}
          <span className="gradient-text">Comece a automatizar.</span>
        </h2>
        <p
          className={`text-lg text-muted-foreground mb-8 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Agende uma conversa sem compromisso e descubra o que a IA pode fazer pela sua clínica.
        </p>
        <div className={`transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg inline-flex items-center gap-3 text-foreground font-semibold px-10 py-5 rounded-2xl hover:opacity-90 transition-opacity text-lg animate-pulse-glow"
          >
            <MessageSquare size={22} />
            Falar com um Especialista
          </a>
          <p className="text-sm text-muted-foreground mt-4">
            Atendimento em até 2 horas em horário comercial
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

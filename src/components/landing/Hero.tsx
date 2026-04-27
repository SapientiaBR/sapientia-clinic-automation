import { MessageSquare, ArrowDown, Sparkles } from "lucide-react";

const CTA_HREF = "#formulario";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[hsl(265_75%_28%)] opacity-15 blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(175_85%_45%)] opacity-8 blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full neumorphic-dark border-none mb-8 animate-fade-in motion-reduce:animate-none">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-accent uppercase tracking-widest">
                Exclusivo para Clínicas e Consultórios
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-[4rem] font-extrabold leading-[1.05] mb-6 tracking-tight text-balance">
              Sua clínica atende 24h.{" "}
              <span className="gradient-text"><br/>Sem aumentar a folha.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              Pare de perder pacientes que agendam de madrugada. IA inteligente para médicos que agenda, tira dúvidas e qualifica pacientes no WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CTA_HREF}
                className="gradient-bg-vibrant text-white font-bold px-8 py-4 rounded-xl hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all duration-300 text-lg flex items-center justify-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <MessageSquare size={20} />
                Automatizar WhatsApp
              </a>
              <a
                href="#solucoes"
                className="neumorphic-dark neumorphic-hover inline-flex items-center justify-center gap-2 text-foreground font-medium px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Ver demonstração
                <ArrowDown size={16} />
              </a>
            </div>

            {/* Trust micro-copy */}
            <div className="flex items-center gap-6 mt-10 text-sm font-medium text-muted-foreground/80">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                Adequado à LGPD
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                Integra com prontuário
              </span>
            </div>
          </div>

          {/* Right - WhatsApp mockup */}
          <div className="flex justify-center">
            <div className="w-[300px] sm:w-[340px] animate-float motion-reduce:animate-none">
              <div className="glass-card rounded-3xl p-1 gradient-border">
                <div className="bg-card rounded-3xl overflow-hidden">
                  {/* Phone header */}
                  <div className="gradient-bg px-4 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-foreground/20 flex items-center justify-center text-sm font-bold text-foreground">
                      IA
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Secretária IA</p>
                      <p className="text-xs text-foreground/70 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        Online agora
                      </p>
                    </div>
                  </div>
                  {/* Chat messages */}
                  <div className="p-4 space-y-3 min-h-[280px] sm:min-h-[320px] bg-background/50">
                    <div className="flex justify-end">
                      <div className="bg-[hsl(152_55%_28%)] text-foreground text-sm px-4 py-2.5 rounded-2xl rounded-tr-md max-w-[220px]">
                        Olá, gostaria de agendar uma consulta com o Dr. Silva
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="glass-card text-foreground text-sm px-4 py-2.5 rounded-2xl rounded-tl-md max-w-[220px]">
                        Olá! 😊 Claro! O Dr. Silva tem horários amanhã às 14h ou 16h. Qual prefere?
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[hsl(152_55%_28%)] text-foreground text-sm px-4 py-2.5 rounded-2xl rounded-tr-md max-w-[220px]">
                        Às 14h, por favor!
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="glass-card text-foreground text-sm px-4 py-2.5 rounded-2xl rounded-tl-md max-w-[220px]">
                        Perfeito! ✅ Consulta agendada para amanhã às 14h. Enviarei um lembrete 1h antes!
                      </div>
                    </div>
                    {/* Typing indicator */}
                    <div className="flex items-center gap-1 px-2">
                      <div className="w-2 h-2 rounded-full bg-accent/60 animate-typing motion-reduce:animate-none" />
                      <div className="w-2 h-2 rounded-full bg-accent/60 animate-typing motion-reduce:animate-none" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 rounded-full bg-accent/60 animate-typing motion-reduce:animate-none" style={{ animationDelay: "0.4s" }} />
                    </div>
                    <p className="text-center text-[10px] text-muted-foreground/60 pt-1">
                      23:47 — Resposta automática em 3 segundos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

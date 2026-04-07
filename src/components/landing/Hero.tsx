import { MessageSquare, ArrowDown, Sparkles } from "lucide-react";

const CTA_HREF = "#formulario";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center pt-20 overflow-hidden">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-in">
              <Sparkles size={14} className="text-accent" />
              <span className="text-xs sm:text-sm font-medium text-accent">
                Automação inteligente para clínicas em São Paulo
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-6 text-balance">
              Sua clínica atende 24 horas —{" "}
              <span className="gradient-text">até de fim de semana, sem precisar de secretária.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Pare de perder pacientes para a concorrência após o expediente. A Sapient.IA automatiza seu WhatsApp, respondendo dúvidas instantaneamente e garantindo uma agenda cheia todos os dias.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CTA_HREF}
                className="cta-gradient inline-flex items-center justify-center gap-2.5 text-foreground font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-200 text-lg animate-pulse-glow"
              >
                <MessageSquare size={20} />
                Quero acabar com as mensagens não lidas
              </a>
              <a
                href="#solucoes"
                className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground border border-border/50 px-6 py-4 rounded-xl transition-all duration-200 hover:border-accent/30"
              >
                Ver como funciona
                <ArrowDown size={16} />
              </a>
            </div>

            {/* Trust micro-copy */}
            <div className="flex items-center gap-6 mt-8 text-xs text-muted-foreground/70">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Resposta em até 2h
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Sem compromisso
              </span>
              <span className="flex items-center gap-1.5 hidden sm:flex">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                100% personalizado
              </span>
            </div>
          </div>

          {/* Right - WhatsApp mockup */}
          <div className="flex justify-center">
            <div className="w-[300px] sm:w-[340px] animate-float">
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
                      <div className="w-2 h-2 rounded-full bg-accent/60 animate-typing" />
                      <div className="w-2 h-2 rounded-full bg-accent/60 animate-typing" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 rounded-full bg-accent/60 animate-typing" style={{ animationDelay: "0.4s" }} />
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

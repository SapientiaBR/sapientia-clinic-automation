import { MessageSquare, ArrowDown, AlertTriangle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5511920795583";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(270_80%_24%)] opacity-20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[hsl(190_100%_50%)] opacity-10 blur-[120px]" />
        <div className="logo-watermark" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-2xl">
            {/* Impact badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-6 animate-fade-in">
              <AlertTriangle size={14} className="text-destructive" />
              <span className="text-xs sm:text-sm font-semibold text-destructive">
                7 em cada 10 consultórios perdem pacientes por falta de resposta rápida
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Seu consultório está perdendo pacientes todos os dias…{" "}
              <span className="gradient-text">e você nem percebe.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              Enquanto você atende, mensagens ficam sem resposta, agendamentos travam e pacientes escolhem outro médico. Isso já está custando dinheiro ao seu consultório.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-bg inline-flex items-center justify-center gap-2 text-foreground font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity text-lg animate-pulse-glow"
              >
                <MessageSquare size={20} />
                Quero Parar de Perder Pacientes
              </a>
              <a
                href="#problema"
                className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground border border-border/50 px-6 py-3 rounded-xl transition-colors"
              >
                Entenda o problema
                <ArrowDown size={16} />
              </a>
            </div>
          </div>

          {/* Right - WhatsApp mockup */}
          <div className="hidden lg:flex justify-center">
            <div className="w-[340px] animate-float">
              <div className="glass-card rounded-3xl p-1 gradient-border">
                <div className="bg-card rounded-3xl overflow-hidden">
                  {/* Phone header */}
                  <div className="gradient-bg px-4 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-foreground/20 flex items-center justify-center text-sm font-bold text-foreground">
                      IA
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Secretária IA</p>
                      <p className="text-xs text-foreground/70">Online agora</p>
                    </div>
                  </div>
                  {/* Chat */}
                  <div className="p-4 space-y-3 min-h-[320px] bg-background/50">
                    <div className="flex justify-end">
                      <div className="bg-[hsl(145_60%_30%)] text-foreground text-sm px-4 py-2 rounded-2xl rounded-tr-md max-w-[240px]">
                        Olá, gostaria de agendar uma consulta com o Dr. Silva
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="glass-card text-foreground text-sm px-4 py-2 rounded-2xl rounded-tl-md max-w-[240px]">
                        Olá! 😊 Claro! O Dr. Silva tem horários disponíveis amanhã às 14h ou 16h. Qual prefere?
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[hsl(145_60%_30%)] text-foreground text-sm px-4 py-2 rounded-2xl rounded-tr-md max-w-[240px]">
                        Às 14h, por favor!
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="glass-card text-foreground text-sm px-4 py-2 rounded-2xl rounded-tl-md max-w-[240px]">
                        Perfeito! ✅ Consulta agendada para amanhã às 14h. Enviarei um lembrete 1h antes!
                      </div>
                    </div>
                    <p className="text-center text-xs text-muted-foreground pt-2">
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

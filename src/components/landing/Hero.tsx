import { MessageSquare } from "lucide-react";

const CTA_HREF = "#formulario";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background effects (desktop only — heavy blur kills mobile GPU) */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[hsl(265_75%_28%)] opacity-15 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(175_85%_45%)] opacity-8 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-border-default mb-8 animate-fade-in motion-reduce:animate-none">
              <span className="relative flex h-2.5 w-2.5">
                <span className="hidden md:inline-flex animate-ping absolute h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              <span className="text-xs sm:text-sm font-bold text-accent uppercase tracking-widest">
                Exclusivo para Clínicas e Consultórios
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-[4rem] font-extrabold leading-[1.05] mb-3 tracking-tight text-balance">
              Sua clínica pode estar perdendo <em>R$23.000/mês</em> em pacientes que nunca chegam. Isso acaba agora.
            </h1>

            <p className="text-[13px] text-muted-foreground opacity-60 mb-6">
              Um produto Sapient.IA
            </p>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              A Secretaria Invisível atende, qualifica e agenda pelo WhatsApp em segundos — às 14h ou às 3h da manhã. Sem secretária extra. Implementação em poucos dias.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CTA_HREF}
                className="gradient-vibrant text-white font-display font-semibold px-8 py-4 rounded-md hover:shadow-[0_0_20px_rgba(251,113,133,0.3)] transition-all duration-300 text-lg flex items-center justify-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <MessageSquare size={20} />
                QUERO PARAR DE PERDER PACIENTES
              </a>
              <a
                href="#solucoes"
                className="bg-transparent border border-border-default hover:border-purple-500 hover:bg-purple-500/5 text-foreground font-display font-semibold px-8 py-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Ver uma conversa real →
              </a>
            </div>

            {/* Trust micro-copy */}
            <p className="mt-10 text-sm font-medium text-muted-foreground/80">
              Implementação em poucos dias · Compatível com LGPD · Suporte incluído
            </p>
          </div>

          {/* Right - WhatsApp mockup */}
          <div className="flex justify-center">
            <div className="w-[300px] sm:w-[340px] md:animate-float motion-reduce:animate-none">
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
                    {/* Typing indicator (animated only on desktop) */}
                    <div className="flex items-center gap-1 px-2">
                      <div className="w-2 h-2 rounded-full bg-accent/60 md:animate-typing motion-reduce:animate-none" />
                      <div className="w-2 h-2 rounded-full bg-accent/60 md:animate-typing motion-reduce:animate-none" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 rounded-full bg-accent/60 md:animate-typing motion-reduce:animate-none" style={{ animationDelay: "0.4s" }} />
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

import { MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import logo from "@/assets/sapient-logo.png";

const WHATSAPP_URL = "https://wa.me/5511920795583?text=Ol%C3%A1%2C%20acabei%20de%20preencher%20o%20fomul%C3%A1rio%20e%20gostaria%20do%20meu%20diagn%C3%B3stico%20gratuito.";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center relative overflow-hidden py-20 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(265_75%_28%)] opacity-20 blur-[150px]" />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      <div className="w-full max-w-2xl relative z-10 glass-card p-10 sm:p-14 rounded-3xl gradient-border text-center shadow-2xl flex flex-col items-center animate-slide-up-fade">
        {/* Brand */}
        <div className="mb-8">
          <img src={logo} alt="Sapient.IA" className="h-20 w-auto mx-auto" />
        </div>

        {/* Success Icon */}
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 rounded-full bg-success/20 animate-ping opacity-75" />
          <CheckCircle2 size={40} className="text-success" />
        </div>

        {/* Content */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
          <Sparkles size={14} className="text-accent" />
          <span className="text-xs sm:text-sm font-medium text-accent uppercase tracking-wider">
            Passo 1 concluído
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
          Recebemos suas <span className="gradient-text">informações!</span>
        </h1>

        <p className="text-lg text-muted-foreground mb-10 leading-relaxed text-balance">
          O último passo para agendar seu diagnóstico gratuito é chamar nossa equipe no WhatsApp. Lá vamos definir o melhor horário para a nossa conversa.
        </p>

        {/* CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-gradient flex items-center justify-center gap-3 text-foreground font-bold px-10 py-5 rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-[1.02] text-lg w-full sm:w-auto animate-pulse-glow shadow-[0_0_30px_hsl(25_90%_50%_/_0.3)]"
        >
          <MessageSquare size={24} />
          Clique aqui para receber seu atendimento via whatsapp
        </a>
      </div>
    </div>
  );
};

export default ThankYou;

import { MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import logo from "@/assets/sapient-logo.webp";

const WHATSAPP_URL = "https://wa.me/5511920795583?text=Ol%C3%A1%2C%20acabei%20de%20preencher%20o%20fomul%C3%A1rio%20e%20gostaria%20do%20meu%20diagn%C3%B3stico%20gratuito.";

const ThankYou = () => {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center relative overflow-hidden py-20 px-4">
      <Helmet>
        <title>Obrigado — finalize seu diagnóstico no WhatsApp</title>
        <meta name="description" content="Recebemos seus dados. Agora chame nossa equipe no WhatsApp para agendar o horário do seu diagnóstico gratuito da Secretaria Invisível." />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Obrigado — finalize seu diagnóstico no WhatsApp" />
        <meta property="og:description" content="Último passo: chame nossa equipe no WhatsApp para escolher o horário do seu diagnóstico gratuito." />
        <meta property="og:url" content="https://secretariainvisivel.com.br/obrigado" />
        <link rel="canonical" href="https://secretariainvisivel.com.br/obrigado" />
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(265_75%_28%)] opacity-20 blur-[150px]" />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      <div className="w-full max-w-2xl relative z-10 glass p-6 sm:p-14 rounded-3xl border border-white/10 text-center shadow-2xl flex flex-col items-center animate-slide-up-fade">
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

        <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
          Recebemos suas <em>informações!</em>
        </h1>

        <p className="text-lg text-muted-foreground mb-10 leading-relaxed text-balance">
          O último passo para agendar seu diagnóstico gratuito é chamar nossa equipe no WhatsApp. Lá vamos definir o melhor horário para a nossa conversa.
        </p>

        {/* CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-vibrant font-display font-semibold flex items-center justify-center gap-3 text-foreground px-6 py-4 sm:px-10 sm:py-5 rounded-md hover:shadow-[0_0_20px_rgba(251,113,133,0.3)] transition-all duration-300 text-base sm:text-lg w-full sm:w-auto"
        >
          <MessageSquare size={24} />
          Clique aqui para receber seu atendimento via whatsapp
        </a>
      </div>
    </div>
  );
};

export default ThankYou;

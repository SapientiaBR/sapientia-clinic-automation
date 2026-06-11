import { useEffect } from "react";
import { MessageSquare, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import logo from "@/assets/sapient-logo.webp";

const WHATSAPP_URL =
  "https://wa.me/5511920795583?text=Ol%C3%A1!%20Acabei%20de%20preencher%20o%20formul%C3%A1rio%20e%20quero%20conversar%20com%20a%20IA%20ao%20vivo.";

const ThankYou = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
  }, []);

  return (
    <main className="min-h-screen bg-[var(--surface)] text-[var(--text)] flex flex-col justify-center items-center relative overflow-hidden py-16 px-4">
      <Helmet>
        <title>Obrigado! Converse com nossa IA ao vivo no WhatsApp</title>
        <meta
          name="description"
          content="Recebemos seus dados. Agora clique no botão e converse ao vivo com nossa IA direto no seu WhatsApp."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://secretariainvisivel.com.br/obrigado" />
      </Helmet>

      <div
        className="w-full max-w-xl relative z-10 rounded-3xl text-center p-8 sm:p-12 flex flex-col items-center animate-slide-up-fade"
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          boxShadow: "0 24px 60px rgba(15,23,42,0.12)",
        }}
      >
        <img src={logo} alt="Sapient.IA" className="h-14 w-auto mb-6 opacity-80" />

        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6 relative"
          style={{ background: "#E8F8EF" }}
        >
          <CheckCircle2 size={32} style={{ color: "#1FA463" }} />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)] mb-3 text-balance">
          Obrigado! Sua IA já foi <em>acionada.</em>
        </h1>

        <p className="font-sans text-[15px] md:text-[16px] text-[var(--text-muted)] leading-relaxed mb-8 max-w-md">
          Clique no botão abaixo para conversar ao vivo com a nossa IA direto no seu WhatsApp. Essa conversa
          é a demonstração: pergunte, agende, teste objeções, veja como ela responde de verdade.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-brand text-white font-sans font-bold text-[14px] tracking-[0.02em] uppercase rounded-full px-8 py-5 inline-flex items-center justify-center gap-3 shadow-[0_18px_40px_rgba(138,124,246,0.32)] hover:shadow-[0_22px_48px_rgba(138,124,246,0.42)] hover:-translate-y-0.5 transition-all w-full sm:w-auto"
        >
          <MessageSquare size={20} />
          Falar com a IA agora no WhatsApp
        </a>

        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-dim)] mt-8">
          A própria IA vai te atender. Esse é o teste.
        </p>
      </div>
    </main>
  );
};

export default ThankYou;

import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const WHATSAPP_URL = "https://wa.me/5511920795583";

const WhatsAppFloat = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:block bg-card border border-border/50 text-foreground text-xs sm:text-sm px-4 py-2 rounded-xl shadow-lg animate-fade-in max-w-[200px]">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-muted text-muted-foreground text-[10px] flex items-center justify-center"
          >
            ×
          </button>
          Seu concorrente já automatizou. E você?
        </div>
      )}

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-3 rounded-full bg-[hsl(145_70%_40%)] shadow-lg hover:scale-105 transition-transform animate-bounce-subtle"
        aria-label="Fale conosco pelo WhatsApp"
        style={{ boxShadow: "0 0 25px hsl(145 70% 40% / 0.5)" }}
      >
        <MessageCircle size={24} className="text-white" />
        <span className="text-white font-semibold text-sm hidden sm:inline">Fale agora</span>
      </a>
    </div>
  );
};

export default WhatsAppFloat;

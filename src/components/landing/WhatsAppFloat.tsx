import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5511920795583?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20Sapient.IA.";

const WhatsAppFloat = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="relative group">
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="glass-card rounded-lg px-4 py-2.5 text-sm text-foreground/90 whitespace-nowrap shadow-xl">
            Dúvidas? Fale com a equipe →
          </div>
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(142_70%_45%)] text-white shadow-lg shadow-[hsl(142_70%_45%)/0.3] hover:shadow-[hsl(142_70%_45%)/0.5] hover:scale-105 transition-all duration-300"
          aria-label="Fale conosco no WhatsApp"
        >
          <MessageSquare size={24} />
        </a>
      </div>
    </div>
  );
};

export default WhatsAppFloat;

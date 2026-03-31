import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5511920795583";

const WhatsAppFloat = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(145_70%_40%)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse-glow"
      aria-label="Fale conosco pelo WhatsApp"
      style={{ boxShadow: "0 0 20px hsl(145 70% 40% / 0.4)" }}
    >
      <MessageCircle size={28} className="text-white" />
    </a>
  );
};

export default WhatsAppFloat;

import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { gsap } from "@/lib/animations";

const WA_URL = "https://wa.me/5511920795583?text=Oi%21%20Quero%20conhecer%20a%20Secret%C3%A1ria%20Invis%C3%ADvel";

const FloatingWhatsApp = () => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap
      .timeline({ repeat: -1, repeatDelay: 28 })
      .to(ref.current, { y: -6, duration: 0.6, ease: "power3.out" })
      .to(ref.current, { y: 0, duration: 0.6, ease: "power3.inOut" })
      .to(ref.current, { y: -6, duration: 0.6, ease: "power3.out" })
      .to(ref.current, { y: 0, duration: 0.6, ease: "power3.inOut" });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <a
      ref={ref}
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="hidden md:flex fixed bottom-6 right-6 z-50 h-12 pl-3 pr-4 rounded-full items-center gap-2 text-white font-display font-bold text-[15px] gradient-brand shadow-[0_14px_30px_rgba(15,181,163,0.32)]"
    >
      <span className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20">
        <MessageSquare size={16} />
      </span>
      Falar no WhatsApp
    </a>
  );
};

export default FloatingWhatsApp;

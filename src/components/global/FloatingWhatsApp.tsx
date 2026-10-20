import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { gsap } from "@/lib/animations";
import { useBarraVisivel } from "@/lib/barraCelular";

const WA_URL = "https://wa.me/5511920795583?text=Oi%21%20Quero%20conhecer%20a%20Secret%C3%A1ria%20Invis%C3%ADvel";

const FloatingWhatsApp = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const barraVisivel = useBarraVisivel();

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
      // No celular o botão é um círculo só com o ícone, e sobe acima da barra
      // fixa quando ela está na tela — os dois no mesmo canto se cobririam.
      className={`fixed right-4 md:right-6 bottom-6 z-50 flex h-14 w-14 md:w-auto items-center justify-center md:justify-start gap-2.5 rounded-full pl-0 md:pl-3 pr-0 md:pr-5 text-white font-display font-bold text-[16px] gradient-brand shadow-[0_14px_30px_rgba(15,181,163,0.32)] ${
        barraVisivel ? "max-md:bottom-[calc(6.5rem+env(safe-area-inset-bottom))]" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full gradient-brand opacity-60 animate-ping motion-reduce:hidden"
      />
      <span className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20">
        <MessageSquare size={18} />
      </span>
      <span className="hidden md:inline">Falar no WhatsApp</span>
    </a>
  );
};

export default FloatingWhatsApp;

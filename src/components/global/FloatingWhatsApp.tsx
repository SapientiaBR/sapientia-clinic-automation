import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import { gsap } from "@/lib/animations";

const scrollToForm = (e: React.MouseEvent) => {
  e.preventDefault();
  const el = document.getElementById("formulario");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

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
      href="#formulario"
      onClick={scrollToForm}
      aria-label="Testar a IA agora"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 h-12 pl-3 pr-4 rounded-full flex items-center gap-2 text-white font-sans font-semibold text-[13px]"
      style={{
        background: "linear-gradient(135deg, #0FB5A3, #0FB5A3)",
        boxShadow: "0 14px 30px rgba(138,124,246,0.32)",
      }}
    >
      <span
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.18)" }}
      >
        <MessageSquare size={16} />
      </span>
      Testar a IA
    </a>
  );
};

export default FloatingWhatsApp;

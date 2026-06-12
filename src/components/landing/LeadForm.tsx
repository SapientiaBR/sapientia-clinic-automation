import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { MessageSquare } from "lucide-react";
import { revealOnScroll } from "@/lib/animations";

const WA_URL =
  "https://wa.me/5511920795583?text=Oi%21%20Quero%20conhecer%20a%20Secret%C3%A1ria%20Invis%C3%ADvel";

type Props = {
  variant?: "default" | "compact";
};

export const LeadForm = ({ variant = "default" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isCompact = variant === "compact";

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
  };

  return (
    <section
      id={isCompact ? undefined : "formulario"}
      className={`${isCompact ? "py-10 md:py-14" : "py-14 md:section-padding"} relative scroll-mt-24`}
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl relative z-10">
        <div className="text-center" data-reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 bg-[#D6F3EE] border border-[#A7E6DD]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#0FB5A3] opacity-50 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0A8C7E]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#055449]">
              Demonstração ao vivo, grátis
            </span>
          </div>

          {!isCompact && (
            <>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
                Veja sua secretária digital <em>atendendo você agora</em>.
              </h2>
              <p className="font-sans text-[14px] md:text-[15px] text-[var(--text-muted)] mt-3 md:mt-4 mb-8 leading-relaxed max-w-md mx-auto">
                A IA te chama no WhatsApp em segundos. Você sente o que o seu paciente sente.
              </p>
            </>
          )}

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center justify-center gap-2.5 w-full max-w-sm gradient-brand text-white font-sans font-bold text-[13px] tracking-[0.06em] uppercase rounded-full h-14 px-8 shadow-[0_14px_36px_rgba(15,181,163,0.35)] hover:shadow-[0_18px_44px_rgba(15,181,163,0.45)] hover:-translate-y-0.5 transition-all"
          >
            <MessageSquare size={16} aria-hidden="true" className="shrink-0" />
            <span>Falar com a IA no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;

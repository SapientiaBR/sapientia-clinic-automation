import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Eyebrow from "@/components/ui/Eyebrow";
import { revealOnScroll } from "@/lib/animations";

const SocialProof = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="depoimentos" className="py-14 md:section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl">
        <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// depoimentos</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            O que médicos dizem depois de <em>automatizar.</em>
          </h2>
        </div>

        <div className="card-base p-6 sm:p-12 relative overflow-hidden" data-reveal>
          <div
            className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{ background: "rgba(108,99,255,0.08)", filter: "blur(40px)" }}
          />

          <div className="relative">
            <p className="tracking-[3px] text-lg mb-4 md:mb-5" style={{ color: "#D7B98A" }}>★★★★★</p>

            <span
              className="font-display absolute -top-6 -left-2 text-[120px] leading-none select-none pointer-events-none"
              style={{ color: "rgba(108,99,255,0.18)" }}
              aria-hidden="true"
            >
              "
            </span>

            <blockquote className="font-display italic text-[16px] md:text-[19px] leading-[1.7] md:leading-[1.82] text-[var(--text)] relative">
              Antes eu respondia mensagem de paciente às 23h quando lembrava. Muitos desistiam enquanto
              esperavam. Com a Secretária Invisível, cada paciente recebe resposta na hora — eu finalmente
              foco na medicina, não na secretaria.
            </blockquote>

            <div className="flex items-center gap-4 mt-6 md:mt-8">
              <div
                className="w-[46px] h-[46px] rounded-full flex items-center justify-center font-sans font-bold text-sm text-white"
                style={{ background: "linear-gradient(135deg, #6C63FF, #18C7D9)" }}
              >
                MF
              </div>
              <div>
                <p className="font-display text-[17px] font-semibold text-[var(--text)]">
                  Dra. Mariana Fogarolli
                </p>
                <p className="font-sans text-xs text-[var(--text-muted)]">Endocrinologista</p>
                <p className="font-mono text-[11px] text-[#5B6CFF] mt-0.5">@dramarianafogarolli</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

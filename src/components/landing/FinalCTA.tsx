import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { revealOnScroll } from "@/lib/animations";
import { CTA_HREF, CTA_LABEL } from "@/components/landing/Hero";

const FinalCTA = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section className="py-14 md:py-20" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <h2
          className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-normal text-[#0c0a22] text-balance tracking-[-0.04em]"
          data-reveal
        >
          Veja como a Secretária Invisível funcionaria na sua clínica.
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] text-[#3e3c58] leading-[1.65] mt-5" data-reveal>
          Em uma conversa rápida, você entende como o atendimento poderia funcionar na
          sua operação.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3" data-reveal>
          <MagneticButton href={CTA_HREF} variant="primary" className="whitespace-nowrap">
            {CTA_LABEL}
          </MagneticButton>
          <span className="font-sans text-[15px] text-[#3e3c58]">Sem compromisso.</span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

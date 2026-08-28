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
          className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-bold text-[#1F2937] text-balance"
          data-reveal
        >
          Veja como a Secretária Invisível funcionaria na sua clínica.
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] text-[#4B5563] leading-[1.65] mt-5" data-reveal>
          Em uma conversa rápida, você entende como o atendimento poderia funcionar na
          sua operação.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3" data-reveal>
          <MagneticButton href={CTA_HREF} variant="primary" className="whitespace-nowrap">
            {CTA_LABEL}
          </MagneticButton>
          <span className="font-sans text-[15px] text-[#4B5563]">Sem compromisso.</span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

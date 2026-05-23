import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE } from "@/lib/animations";

const PositioningStatement = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(ref.current!.querySelectorAll("[data-reveal]"), {
      y: 40, opacity: 0, duration: 0.8, ease: EASE,
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <p
          data-reveal
          className="font-display text-2xl sm:text-3xl lg:text-[40px] leading-[1.2] font-semibold text-white text-balance"
        >
          A Secretária Invisível é uma{" "}
          <em className="gradient-text not-italic font-bold">infraestrutura de atendimento</em>{" "}
          que transforma mensagens perdidas no WhatsApp em consultas{" "}
          <span className="text-cyan-300">agendadas, confirmadas e lembradas</span>.
        </p>
      </div>
    </section>
  );
};

export default PositioningStatement;

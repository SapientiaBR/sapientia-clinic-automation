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
    <section ref={ref} className="py-12 md:py-20 lg:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <p
          data-reveal
          className="md:hidden font-display text-xl leading-[1.25] font-semibold text-[var(--text)] text-balance"
        >
          Pacientes sem resposta escolhem outra clínica. A{" "}
          <em className="gradient-text not-italic font-bold">Secretária Invisível</em>{" "}
          responde, qualifica e agenda pelo WhatsApp{" "}
          <span className="gradient-text font-bold">24/7</span>.
        </p>
        <p
          data-reveal
          className="hidden md:block font-display text-2xl sm:text-3xl lg:text-[40px] leading-[1.2] font-semibold text-[var(--text)] text-balance"
        >
          A Secretária Invisível é uma{" "}
          <em className="gradient-text not-italic font-bold">infraestrutura de atendimento</em>{" "}
          que transforma mensagens perdidas no WhatsApp em consultas{" "}
          <span className="gradient-text font-bold">agendadas, confirmadas e lembradas</span>.
        </p>
      </div>
    </section>
  );
};

export default PositioningStatement;

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { revealOnScroll } from "@/lib/animations";

const Complement = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section className="py-14 md:py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <h2
          className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-normal text-[#292929] text-balance tracking-[-0.04em]"
          data-reveal
        >
          A tecnologia cuida do volume.
        </h2>
        <p
          className="font-display text-[22px] sm:text-[30px] font-bold text-[#00543F] mt-2 text-balance"
          data-reveal
        >
          Sua equipe cuida das pessoas.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mt-9 text-left" data-reveal>
          <div
            className="rounded-2xl p-6"
            style={{ background: "#EEFCF7", border: "1px solid #DBF9F1" }}
          >
            <p className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-[#00543F]">
              Secretária Invisível
            </p>
            <p className="font-sans text-[17px] text-[#292929] leading-[1.65] mt-3">
              Pode responder, organizar, agendar, confirmar e conduzir atendimentos.
            </p>
          </div>
          <div
            className="rounded-2xl p-6"
            style={{ background: "#FFFFFF", border: "1px solid #E8EAF0" }}
          >
            <p className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-[#292929]">
              Sua equipe
            </p>
            <p className="font-sans text-[17px] text-[#292929] leading-[1.65] mt-3">
              Continua responsável pelo que precisa de atenção humana.
            </p>
          </div>
        </div>

        <p className="font-display text-[19px] sm:text-[24px] font-semibold text-[#292929] mt-9" data-reveal>
          Não é substituição.
        </p>
        <p className="font-display text-[19px] sm:text-[24px] font-bold text-[#003D2F]" data-reveal>
          É complemento.
        </p>
      </div>
    </section>
  );
};

export default Complement;

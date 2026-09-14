import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { revealOnScroll } from "@/lib/animations";

const SinglePoint = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section className="py-14 md:py-20" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h2
          className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-normal text-[#0c0a22] text-balance tracking-[-0.04em]"
          data-reveal
        >
          O problema não é sua recepcionista.
        </h2>

        <p className="font-sans text-[17px] md:text-[19px] text-[#3e3c58] leading-[1.65] mt-5" data-reveal>
          É depender de uma única pessoa para manter todo o atendimento funcionando.
        </p>

        <ul className="mt-6 space-y-3" data-reveal>
          {[
            "Quando ela está ocupada, mensagens acumulam.",
            "Quando sai, o atendimento para.",
          ].map((t) => (
            <li
              key={t}
              className="rounded-2xl px-5 py-4 font-sans text-[17px] md:text-[18px] text-[#0c0a22] leading-[1.6]"
              style={{ background: "#faf8ff", border: "1px solid #e6dcff" }}
            >
              {t}
            </li>
          ))}
        </ul>

        <p
          className="font-display text-[20px] sm:text-[26px] font-bold text-[#4c1d95] mt-8 text-balance"
          data-reveal
        >
          A Secretária Invisível cria continuidade.
        </p>
      </div>
    </section>
  );
};

export default SinglePoint;

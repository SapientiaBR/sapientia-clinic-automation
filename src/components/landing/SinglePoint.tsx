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
          className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-bold text-[#1F2937] text-balance"
          data-reveal
        >
          O problema não é sua recepcionista.
        </h2>

        <p className="font-sans text-[17px] md:text-[19px] text-[#4B5563] leading-[1.65] mt-5" data-reveal>
          É depender de uma única pessoa para manter todo o atendimento funcionando.
        </p>

        <ul className="mt-6 space-y-3" data-reveal>
          {[
            "Quando ela está ocupada, mensagens acumulam.",
            "Quando sai, o atendimento para.",
          ].map((t) => (
            <li
              key={t}
              className="rounded-2xl px-5 py-4 font-sans text-[17px] md:text-[18px] text-[#1F2937] leading-[1.6]"
              style={{ background: "#F1FBF8", border: "1px solid #D6F3EE" }}
            >
              {t}
            </li>
          ))}
        </ul>

        <p
          className="font-display text-[20px] sm:text-[26px] font-bold text-[#055449] mt-8 text-balance"
          data-reveal
        >
          A Secretária Invisível cria continuidade.
        </p>
      </div>
    </section>
  );
};

export default SinglePoint;

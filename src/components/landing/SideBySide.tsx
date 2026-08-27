import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { revealOnScroll } from "@/lib/animations";

const pairs: [string, string][] = [
  ["Recebe um paciente na porta", "Responde outro no WhatsApp"],
  ["Resolve um convênio", "Agenda a próxima consulta"],
  ["Organiza a sala", "Confirma os atendimentos de amanhã"],
  ["Vai para casa", "Continua atendendo"],
];

const SideBySide = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section className="py-14 md:py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2
          className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-bold text-[#1F2937] text-balance mb-8 md:mb-12 max-w-3xl"
          data-reveal
        >
          Você não substitui uma boa secretária. Você multiplica a capacidade dela.
        </h2>

        <div className="hidden sm:grid grid-cols-2 gap-6 mb-4" data-reveal>
          <p className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-[#4B5563]">
            Sua recepcionista
          </p>
          <p className="font-display text-[15px] font-bold uppercase tracking-[0.14em] text-[#0A8C7E]">
            A Secretária Invisível
          </p>
        </div>

        <ul className="space-y-4 sm:space-y-0" data-reveal>
          {pairs.map(([left, right]) => (
            <li
              key={left}
              className="grid sm:grid-cols-2 gap-2 sm:gap-6 py-4 sm:py-5 border-t"
              style={{ borderColor: "#E5E7EB" }}
            >
              <div>
                <span className="sm:hidden font-display text-[13px] font-bold uppercase tracking-[0.14em] text-[#4B5563] block mb-1">
                  Sua recepcionista
                </span>
                <p className="font-sans text-[17px] sm:text-[18px] text-[#1F2937] leading-[1.5]">
                  {left}
                </p>
              </div>
              <div>
                <span className="sm:hidden font-display text-[13px] font-bold uppercase tracking-[0.14em] text-[#0A8C7E] block mb-1 mt-3">
                  A Secretária Invisível
                </span>
                <p className="font-sans text-[17px] sm:text-[18px] text-[#055449] leading-[1.5]">
                  {right}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SideBySide;

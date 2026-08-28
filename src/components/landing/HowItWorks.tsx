import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { revealOnScroll } from "@/lib/animations";

const steps = [
  {
    n: "01",
    title: "Mapeamento",
    desc: "Entendemos como sua clínica atende hoje: horários, convênios, perguntas frequentes, fluxo de agenda.",
  },
  {
    n: "02",
    title: "Treinamento",
    desc: "A inteligência artificial é treinada com as regras da sua clínica. Ela responde do jeito que sua equipe responderia.",
  },
  {
    n: "03",
    title: "Integração",
    desc: "Conectamos ao WhatsApp e à agenda que você já usa. Nada muda para o paciente.",
  },
  {
    n: "04",
    title: "Operação assistida",
    desc: "Acompanhamos as primeiras semanas e ajustamos junto com a sua recepcionista.",
  },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="como-funciona" className="py-14 md:py-20 scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="max-w-2xl mb-8 md:mb-12" data-reveal>
          <h2 className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-bold text-[#1F2937] text-balance">
            Como sua recepção ganha um segundo turno.
          </h2>
          <p className="font-sans text-[17px] md:text-[19px] text-[#4B5563] mt-4 leading-[1.6]">
            Implantação sem trocar o número da clínica.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 gap-5 md:gap-6" data-reveal>
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-2xl p-6 bg-white"
              style={{ border: "1px solid #E5E7EB", boxShadow: "0 14px 34px rgba(15,23,42,0.05)" }}
            >
              <span className="font-display text-[15px] font-bold tracking-[0.14em] text-[#0A8C7E]">
                {s.n}
              </span>
              <h3 className="font-display text-[20px] font-semibold text-[#1F2937] mt-2">
                {s.title}
              </h3>
              <p className="font-sans text-[17px] text-[#4B5563] leading-[1.6] mt-2">{s.desc}</p>
            </li>
          ))}
        </ol>

        <p
          className="font-sans text-[17px] md:text-[19px] text-[#1F2937] leading-[1.6] mt-6 md:mt-8 rounded-2xl p-6"
          style={{ background: "#D6F3EE" }}
          data-reveal
        >
          Sua recepcionista participa do processo. Ela sabe o que a clínica precisa melhor do
          que qualquer sistema.
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;

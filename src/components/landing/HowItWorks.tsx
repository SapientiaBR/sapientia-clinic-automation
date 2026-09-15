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
          <h2 className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-normal text-[#292929] text-balance tracking-[-0.04em]">
            Como sua recepção ganha um segundo turno.
          </h2>
          <p className="font-sans text-[length:var(--text-body-lg)] text-[#4B4E52] mt-4 leading-[1.6]">
            Implantação sem trocar o número da clínica.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 gap-5 md:gap-6" data-reveal>
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-2xl p-6 bg-white"
              style={{ border: "1px solid #E8EAF0", boxShadow: "0 14px 34px rgba(41, 41, 41,0.05)" }}
            >
              <span className="font-display text-[length:var(--text-body)] font-bold tracking-[0.14em] text-[#00543F]">
                {s.n}
              </span>
              <h3 className="font-display text-[20px] font-semibold text-[#292929] mt-2">
                {s.title}
              </h3>
              <p className="font-sans text-[length:var(--text-body-lg)] text-[#4B4E52] leading-[1.6] mt-2">{s.desc}</p>
            </li>
          ))}
        </ol>

        <p
          className="font-sans text-[length:var(--text-body-lg)] text-[#292929] leading-[1.6] mt-6 md:mt-8 rounded-2xl p-6"
          style={{ background: "#DBF9F1" }}
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

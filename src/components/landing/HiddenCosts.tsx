import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { revealOnScroll } from "@/lib/animations";

/**
 * ATENÇÃO: esta seção NÃO pode ir para produção com placeholder visível.
 * Preencha os quatro valores abaixo com números reais e validados.
 * Enquanto uma string estiver vazia, o card renderiza apenas título e descrição,
 * sem o campo de valor. Não invente números.
 */
const VALOR_ESTIMADO_1 = "";
const VALOR_ESTIMADO_2 = "";
const VALOR_ESTIMADO_3 = "";
const VALOR_ESTIMADO_4 = "";

const cards = [
  {
    title: "O paciente que não esperou",
    text: "Ele mandou mensagem fora do horário. Outra clínica respondeu antes.",
    value: VALOR_ESTIMADO_1,
  },
  {
    title: "A consulta que virou horário vazio",
    text: "Sem confirmação ativa, a falta vira prejuízo silencioso na agenda.",
    value: VALOR_ESTIMADO_2,
  },
  {
    title: "A mensagem que ficou sem resposta",
    text: "Chegou enquanto a recepcionista atendia outra pessoa. Ninguém voltou nela.",
    value: VALOR_ESTIMADO_3,
  },
  {
    title: "O paciente que sumiu",
    text: "Está na sua base, não volta há meses, e ninguém tem tempo de chamar.",
    value: VALOR_ESTIMADO_4,
  },
];

const HiddenCosts = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section className="py-14 md:py-20" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="max-w-2xl mb-8 md:mb-12" data-reveal>
          <h2 className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-bold text-[#1F2937] text-balance">
            Dinheiro que sua recepção perde sem perceber.
          </h2>
          <p className="font-sans text-[17px] md:text-[19px] text-[#4B5563] mt-4 leading-[1.6]">
            Não é falta de esforço da equipe. É falta de cobertura.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5" data-reveal>
          {cards.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl p-6 bg-white flex flex-col"
              style={{ border: "1px solid #E5E7EB", boxShadow: "0 14px 34px rgba(15,23,42,0.05)" }}
            >
              <h3 className="font-display text-[19px] font-semibold text-[#1F2937] leading-snug">
                {c.title}
              </h3>
              <p className="font-sans text-[17px] text-[#4B5563] leading-[1.6] mt-3 flex-1">
                {c.text}
              </p>
              {c.value ? (
                <p className="font-display text-[22px] font-bold text-[#0A8C7E] mt-5">{c.value}</p>
              ) : null}
            </article>
          ))}
        </div>

        <p
          className="font-sans text-[17px] md:text-[19px] text-[#1F2937] mt-8 md:mt-10 leading-[1.6] max-w-2xl"
          data-reveal
        >
          Some tudo isso em 30 dias. Esse é o custo real de uma recepção sem cobertura.
        </p>
      </div>
    </section>
  );
};

export default HiddenCosts;

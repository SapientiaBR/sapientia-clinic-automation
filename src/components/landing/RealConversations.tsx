import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { revealOnScroll } from "@/lib/animations";
import { Baloes, conversas, type Convo } from "@/components/landing/conversations";

const Cartao = ({ c }: { c: Convo }) => (
  <article
    className="flex h-full flex-col rounded-3xl p-4 sm:p-5"
    style={{
      background: "#EEFCF7",
      border: "1px solid #DBF9F1",
      boxShadow: "0 20px 44px rgba(0, 84, 63,0.10), 0 4px 12px rgba(41, 41, 41,0.04)",
    }}
  >
    <h3 className="font-display text-[17px] font-semibold leading-snug text-[var(--text)] md:text-[18px]">
      {c.title}
    </h3>
    <p className="font-sans mt-2 text-[16px] leading-relaxed text-[#4B4E52]">{c.caption}</p>
    <div
      className="mt-4 flex-1 space-y-2 rounded-2xl p-3"
      style={{ background: "#FFFFFF", border: "1px solid #EEFCF7" }}
    >
      <Baloes messages={c.messages} />
    </div>
  </article>
);

type Props = {
  /** A rota do médico solo mostra só a conversa de agendamento. */
  apenasPrimeira?: boolean;
};

/**
 * Conversas simuladas.
 *
 * No celular viram um carrossel de swipe — uma por tela, com pontos de
 * posição. Empilhadas, as três somavam quase duas telas de rolagem de
 * conteúdo que é para ser lido de relance.
 *
 * O carrossel é `scroll-snap` puro, sem biblioteca: o gesto é o scroll nativo
 * do navegador, então a inércia é a que o aparelho já tem e nada disso custa
 * JavaScript. Os pontos apenas refletem a posição; quem move é o dedo.
 */
const RealConversations = ({ apenasPrimeira = false }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);
  const lista = apenasPrimeira ? conversas.slice(0, 1) : conversas;

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  const aoRolar = () => {
    const el = trilho.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setAtivo(Math.max(0, Math.min(lista.length - 1, i)));
  };

  return (
    <section id="conversas-reais" className="relative scroll-mt-24 py-14 md:section-padding" ref={ref}>
      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 max-w-2xl text-center md:mb-8" data-reveal>
          <h2 className="font-display text-[26px] font-normal tracking-[-0.04em] text-balance text-[var(--text)] sm:text-[36px] lg:text-[42px]">
            Veja como seus pacientes seriam atendidos.
          </h2>
          <p className="font-sans mt-4 text-[17px] leading-[1.6] text-[#4B4E52] md:text-[19px]">
            Conversas reais. Do primeiro “oi” até o próximo passo.
          </p>
        </div>

        {lista.length === 1 ? (
          <div className="mx-auto max-w-md" data-reveal>
            <Cartao c={lista[0]} />
          </div>
        ) : (
          <div data-reveal>
            {/* Celular: carrossel. `-mx-4 px-4` deixa o cartão respirar nas
                bordas sem o trilho encostar na margem da tela. */}
            <div
              ref={trilho}
              onScroll={aoRolar}
              className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="group"
              aria-label="Conversas simuladas"
            >
              {lista.map((c) => (
                <div key={c.chave} className="w-full flex-none snap-center">
                  <Cartao c={c} />
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-center gap-2 md:hidden" aria-hidden="true">
              {lista.map((c, i) => (
                <span
                  key={c.chave}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === ativo ? 22 : 8,
                    background: i === ativo ? "#006851" : "#DBF9F1",
                  }}
                />
              ))}
            </div>

            {/* Desktop: as três lado a lado, sem gesto nenhum. */}
            <div className="mx-auto hidden max-w-5xl gap-6 md:grid md:grid-cols-3">
              {lista.map((c) => (
                <Cartao key={c.chave} c={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RealConversations;

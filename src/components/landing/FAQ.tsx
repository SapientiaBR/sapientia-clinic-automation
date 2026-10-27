import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Plus, Minus } from "lucide-react";
import { gsap, EASE, revealOnScroll } from "@/lib/animations";
import { implantacaoFormatada, turmaAtual } from "@/config/turma";
import { PLANOS, precoTxt } from "@/config/si";

type Entrada = [string, string];

/**
 * As perguntas de cada rota.
 *
 * O `Index` tambem usa estas listas para montar o JSON-LD de FAQPage, entao
 * elas ficam exportadas: o dado estruturado e o que esta na tela precisam
 * dizer a mesma coisa, ou o Google marca divergencia.
 */
const t = turmaAtual();
const ofertaImplantacao = `A implantação custa ${implantacaoFormatada} e sai sem cobrança para quem assinar até ${t.fimDoMes}.`;

export const faqClinica: Entrada[] = [
  [
    "Substitui minha recepcionista?",
    "Não. Ela assume o volume. Sua equipe cuida do que precisa de atenção humana.",
  ],
  [
    "Preciso trocar meu número?",
    "Não. Usamos o número que seus pacientes já conhecem.",
  ],
  [
    "Ela dá orientação médica?",
    "Não. Questões clínicas vão para a equipe, com toda a conversa.",
  ],
  [
    "Quanto custa?",
    `Consultório ${precoTxt(PLANOS.consultorio)}, Clínica ${precoTxt(PLANOS.clinica)} e Operação ${precoTxt(PLANOS.operacao)} por mês, conforme o número de profissionais. ${ofertaImplantacao}`,
  ],
  [
    "E se não fizer sentido?",
    "Antes de entrar no ar, sua clínica testa e aprova a configuração. Se não aprovar, devolvemos a primeira mensalidade inteira. Depois, você cancela com 30 dias de aviso.",
  ],
];

export const faqMedico: Entrada[] = [
  [
    "Serve para quem atende sozinho?",
    "Sim. O Consultório foi feito para isso: você atende, ela cuida do resto.",
  ],
  [
    "Preciso trocar meu número?",
    "Não. Usamos o número que seus pacientes já conhecem.",
  ],
  [
    "Ela dá orientação médica?",
    "Não. Questões clínicas vão para você, com toda a conversa.",
  ],
  [
    "Quanto custa?",
    `O plano Consultório custa ${precoTxt(PLANOS.consultorio)} por mês. ${ofertaImplantacao}`,
  ],
  [
    "E se não fizer sentido?",
    "Antes de entrar no ar, você testa e aprova a configuração. Se não aprovar, devolvemos a primeira mensalidade inteira. Depois, você cancela com 30 dias de aviso.",
  ],
];

/** Mantido para quem ainda importa o nome antigo. */
export const faqEntries = faqClinica;

const FAQ = ({ variante = "clinica" }: { variante?: "clinica" | "medico" }) => {
  const [open, setOpen] = useState<number | null>(0);
  const entries = variante === "medico" ? faqMedico : faqClinica;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="faq" className="py-14 md:py-20 relative scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
        <div className="text-center mb-8" data-reveal>
          <h2 className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-normal text-[#1F2937] text-balance tracking-[-0.04em]">
            Antes de colocar IA no atendimento, estas são as perguntas certas.
          </h2>
          <p className="font-sans text-[17px] md:text-[19px] text-[#4B5563] mt-4 leading-[1.6]">
            Respostas diretas. Sem floreio.
          </p>
        </div>

        <ul className="space-y-3" data-reveal>
          {entries.map(([q, a], i) => (
            <FAQItem
              key={i}
              q={q}
              a={a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

const FAQItem = ({
  q, a, isOpen, onToggle,
}: { q: string; a: string; isOpen: boolean; onToggle: () => void }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (isOpen) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: "auto", opacity: 1, duration: 0.6, ease: EASE,
          onComplete: () => { el.style.height = "auto"; },
        }
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.6, ease: EASE });
    }
  }, [isOpen]);

  return (
    <li
      className="rounded-2xl overflow-hidden transition-colors bg-white"
      style={{
        border: `1px solid ${isOpen ? "#0FB5A3" : "#E5E7EB"}`,
        boxShadow: isOpen ? "0 14px 36px rgba(15, 181, 163,0.12)" : "0 8px 22px rgba(15, 23, 42,0.04)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-5 sm:px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#F7FBFA]"
        aria-expanded={isOpen}
      >
        <span className="font-display text-[18px] font-semibold text-[#1F2937] leading-snug">{q}</span>
        <span className="text-[#0A8C7E] flex-shrink-0">
          {isOpen ? <Minus size={18} strokeWidth={1.6} /> : <Plus size={18} strokeWidth={1.6} />}
        </span>
      </button>
      <div ref={panelRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="font-sans text-[17px] text-[#4B5563] leading-[1.7] px-5 sm:px-6 pb-6">
          {a}
        </p>
      </div>
    </li>
  );
};

export default FAQ;

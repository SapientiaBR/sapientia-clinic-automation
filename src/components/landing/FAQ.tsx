import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Plus, Minus } from "lucide-react";
import { gsap, EASE, revealOnScroll } from "@/lib/animations";

type Entrada = [string, string];

/**
 * As perguntas de cada rota.
 *
 * O `Index` tambem usa estas listas para montar o JSON-LD de FAQPage, entao
 * elas ficam exportadas: o dado estruturado e o que esta na tela precisam
 * dizer a mesma coisa, ou o Google marca divergencia.
 */
export const faqClinica: Entrada[] = [
  [
    "Substitui minha recepcionista?",
    "Não. Ela assume o volume. Sua equipe cuida do que precisa de atenção humana.",
  ],
  [
    "Preciso trocar meu número?",
    "Não necessariamente. A implantação se adapta à operação da clínica.",
  ],
  [
    "Ela dá orientação médica?",
    "Não. Questões clínicas vão para a equipe, com toda a conversa.",
  ],
  [
    "E se não fizer sentido?",
    "O diagnóstico é grátis antes de qualquer cobrança, e você cancela com 30 dias de aviso.",
  ],
];

export const faqMedico: Entrada[] = [
  [
    "Serve para quem atende sozinho?",
    "Sim. O Consultório foi feito para isso: você atende, ela cuida do resto.",
  ],
  [
    "Preciso trocar meu número?",
    "Não necessariamente. A implantação se adapta a como você atende hoje.",
  ],
  [
    "Ela dá orientação médica?",
    "Não. Questões clínicas vão para você, com toda a conversa.",
  ],
  [
    "E se não fizer sentido?",
    "O diagnóstico é grátis antes de qualquer cobrança, e você cancela com 30 dias de aviso.",
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
          <h2 className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-normal text-[#292929] text-balance tracking-[-0.04em]">
            Antes de colocar IA no atendimento, estas são as perguntas certas.
          </h2>
          <p className="font-sans text-[length:var(--text-body-lg)] text-[#4B4E52] mt-4 leading-[1.6]">
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
        border: `1px solid ${isOpen ? "#006851" : "#E8EAF0"}`,
        boxShadow: isOpen ? "0 14px 36px rgba(0, 104, 81,0.12)" : "0 8px 22px rgba(41, 41, 41,0.04)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-5 sm:px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#F8F9FE]"
        aria-expanded={isOpen}
      >
        <span className="font-display text-[length:var(--text-body-lg)] font-semibold text-[#292929] leading-snug">{q}</span>
        <span className="text-[#00543F] flex-shrink-0">
          {isOpen ? <Minus size={18} strokeWidth={1.6} /> : <Plus size={18} strokeWidth={1.6} />}
        </span>
      </button>
      <div ref={panelRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="font-sans text-[length:var(--text-body-lg)] text-[#4B4E52] leading-[1.7] px-5 sm:px-6 pb-6">
          {a}
        </p>
      </div>
    </li>
  );
};

export default FAQ;

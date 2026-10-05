import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Plus, Minus } from "lucide-react";
import { gsap, EASE, revealOnScroll } from "@/lib/animations";
import { precoFormatado } from "@/config/planos";

/** Link opcional exibido depois da resposta. Não entra no JSON-LD. */
type LinkFAQ = { href: string; texto: string };

type Entrada = [string, string, LinkFAQ?];

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
    "Quanto custa?",
    `O que define o plano é o tamanho da operação: número de profissionais, volume de mensagens e integrações necessárias. Consultório ${precoFormatado("Consultório")}, Clínica ${precoFormatado("Clínica")} e Operação ${precoFormatado("Operação")} por mês. Na turma do mês, a implantação fica por nossa conta.`,
    { href: "/calculadora", texto: "Faça a conta com os números da sua clínica." },
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
          <h2 className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-normal text-[#1F2937] text-balance tracking-[-0.04em]">
            Antes de colocar IA no atendimento, estas são as perguntas certas.
          </h2>
          <p className="font-sans text-[17px] md:text-[19px] text-[#4B5563] mt-4 leading-[1.6]">
            Respostas diretas. Sem floreio.
          </p>
        </div>

        <ul className="space-y-3" data-reveal>
          {entries.map(([q, a, link], i) => (
            <FAQItem
              key={i}
              q={q}
              a={a}
              link={link}
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
  q, a, link, isOpen, onToggle,
}: { q: string; a: string; link?: LinkFAQ; isOpen: boolean; onToggle: () => void }) => {
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
          {link && (
            <>
              {" "}
              <a
                href={link.href}
                className="font-semibold text-[var(--brand-800)] underline underline-offset-4"
              >
                {link.texto}
              </a>
            </>
          )}
        </p>
      </div>
    </li>
  );
};

export default FAQ;

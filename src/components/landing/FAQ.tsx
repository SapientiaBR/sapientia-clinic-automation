import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Plus, Minus } from "lucide-react";
import { gsap, EASE, revealOnScroll } from "@/lib/animations";

export const faqEntries: [string, string][] = [
  [
    "Isso substitui minha recepcionista?",
    "Não. A Secretária Invisível assume parte do volume. Sua equipe continua cuidando do que precisa de atenção humana.",
  ],
  [
    "Vou precisar trocar meu número?",
    "Não necessariamente. A implantação é adaptada à operação atual da sua clínica.",
  ],
  [
    "E se surgir uma situação fora do padrão?",
    "A Secretária Invisível segue os fluxos definidos pela clínica e pode direcionar situações específicas para a sua equipe, com todo o contexto da conversa.",
  ],
  [
    "Minha equipe vai precisar aprender um sistema complicado?",
    "Não. Nós configuramos a operação para reduzir trabalho, não criar mais trabalho.",
  ],
  [
    "É seguro? Onde ficam meus dados?",
    "Conversas armazenadas em infraestrutura nacional, criptografadas, com contrato e DPA assinados. Você controla retenção e acesso. Nada é usado para treinar modelo público.",
  ],
];

const FAQ = ({ compact = false }: { compact?: boolean }) => {
  const [open, setOpen] = useState<number | null>(0);
  const entries = compact ? faqEntries.slice(0, 3) : faqEntries;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="faq" className="py-14 md:py-20 relative scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
        <div className="text-center mb-8" data-reveal>
          <h2 className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-normal text-[#0c0a22] text-balance tracking-[-0.04em]">
            Antes de colocar IA no atendimento da sua clínica, estas são as perguntas certas.
          </h2>
          <p className="font-sans text-[17px] md:text-[19px] text-[#3e3c58] mt-4 leading-[1.6]">
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
        border: `1px solid ${isOpen ? "#7c3aed" : "#e6e4ef"}`,
        boxShadow: isOpen ? "0 14px 36px rgba(124, 58, 237,0.12)" : "0 8px 22px rgba(12, 10, 34,0.04)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-5 sm:px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#faf9ff]"
        aria-expanded={isOpen}
      >
        <span className="font-display text-[18px] font-semibold text-[#0c0a22] leading-snug">{q}</span>
        <span className="text-[#6d28d9] flex-shrink-0">
          {isOpen ? <Minus size={18} strokeWidth={1.6} /> : <Plus size={18} strokeWidth={1.6} />}
        </span>
      </button>
      <div ref={panelRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="font-sans text-[17px] text-[#3e3c58] leading-[1.7] px-5 sm:px-6 pb-6">
          {a}
        </p>
      </div>
    </li>
  );
};

export default FAQ;

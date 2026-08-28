import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Plus, Minus } from "lucide-react";
import { gsap, EASE, revealOnScroll } from "@/lib/animations";

export const faqEntries: [string, string][] = [
  [
    "Isso vai substituir minha recepcionista?",
    "Não. Ela continua sendo o rosto da clínica. A Secretária Invisível assume o volume de mensagens que hoje concorre com o atendimento presencial e cobre os horários em que não há ninguém disponível.",
  ],
  [
    "Minha recepcionista vai se sentir ameaçada?",
    "Na prática acontece o contrário. Ela deixa de responder às 22h e para de repetir as mesmas perguntas dezenas de vezes por dia. Ela participa da implantação desde o início e ajuda a definir como o sistema responde.",
  ],
  [
    "O paciente vai perceber que está falando com um sistema?",
    "A conversa segue o tom da sua clínica e usa o nome do paciente. Se ele perguntar, o sistema confirma que é atendimento automatizado. E sempre que a situação exige uma pessoa, a conversa é transferida para a sua equipe.",
  ],
  [
    "Preciso trocar meu número de WhatsApp?",
    "Não. Mantemos o número que sua clínica já usa, via API oficial do WhatsApp Business. Sua equipe continua atendendo no mesmo número, em paralelo.",
  ],
  [
    "É seguro? Onde ficam meus dados?",
    "Conversas armazenadas em infraestrutura nacional, criptografadas, com contrato e DPA assinados. Você controla retenção e acesso. Nada é usado para treinar modelo público.",
  ],
  [
    "E se o sistema não souber responder?",
    "Ele responde apenas dentro do escopo que vocês definem. Tudo que foge disso vira transferência automática para uma pessoa da equipe. Cada conversa fica gravada no painel para auditoria.",
  ],
  [
    "Faz follow-up de falta e cancelamento?",
    "Faz. Recupera quem faltou, reagenda cancelamento e retoma contato com paciente inativo, dentro da mesma conversa, sem disparo em massa.",
  ],
  [
    "Funciona com o sistema que eu já uso?",
    "Avaliamos a integração no diagnóstico. [VALIDAR: listar aqui apenas sistemas já integrados em produção. Se não houver, manter só esta frase.]",
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
          <h2 className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-bold text-[#1F2937] text-balance">
            As perguntas que todo médico faz antes de confiar numa IA.
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
        boxShadow: isOpen ? "0 14px 36px rgba(15,181,163,0.12)" : "0 8px 22px rgba(15,23,42,0.04)",
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

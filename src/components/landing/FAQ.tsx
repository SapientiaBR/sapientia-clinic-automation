import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Plus, Minus } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { gsap, EASE, revealOnScroll } from "@/lib/animations";

export const faqEntries: [string, string][] = [
  [
    "Isso não vai parecer robótico para meus pacientes?",
    "Não. O sistema aprende o tom de voz da sua clínica e usa o nome do paciente em cada mensagem. Seus pacientes recebem respostas que soam como a sua equipe — com a linguagem que você já usa no consultório. Você aprova o fluxo completo antes de ativar. Se quiser mudar algo, nossa equipe ajusta em minutos.",
  ],
  [
    "Vou perder o controle do meu atendimento?",
    "Pelo contrário. Você ganha visibilidade que não tinha antes: painel com histórico de todas as conversas, alertas para casos que precisam de atenção humana e relatório semanal. Você define as regras — horários, especialidades, tipo de agendamento. A IA executa.",
  ],
  [
    "É difícil de implementar? Preciso entender de tecnologia?",
    "Zero configuração da sua parte. Nossa equipe cuida de tudo: integração com seu WhatsApp, configuração dos fluxos, treinamento do sistema. Em média, 5 dias úteis. Sem código, sem técnico contratado.",
  ],
  [
    "Como funciona o contrato?",
    "Contrato mensal flexível. Cancelamento por e-mail com 30 dias de antecedência. Todas as condições — prazo, recorrência e regras — são apresentadas com total clareza antes do início, para que você entre sabendo exatamente o que esperar.",
  ],
  [
    "Quanto custa?",
    "O investimento é calculado com base no volume da sua clínica. Antes de qualquer número, você recebe um diagnóstico gratuito com a estimativa do retorno esperado — para que você tome a decisão com dados, não com suposições.",
  ],
  [
    "E se eu não gostar do resultado?",
    "Acompanhamos de perto e fazemos ajustes contínuos no primeiro mês. Se algo não estiver funcionando como esperado, trabalhamos juntos para resolver — transparência e parceria são nossos valores. O objetivo é redução de faltas e aumento no volume de agendamentos desde as primeiras semanas.",
  ],
];

const FAQ = ({ compact = false }: { compact?: boolean }) => {
  const [open, setOpen] = useState<number | null>(0);
  const entries = compact ? faqEntries.slice(0, 3) : faqEntries;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="faq" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
        <div className="text-center mb-12" data-reveal>
          <Eyebrow>// perguntas frequentes</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            Suas dúvidas, <em>respondidas.</em>
          </h2>
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
      className="rounded-2xl overflow-hidden transition-colors"
      style={{
        background: "var(--navy-2)",
        border: `1px solid ${isOpen ? "rgba(77,235,255,0.18)" : "rgba(255,255,255,0.06)"}`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
        aria-expanded={isOpen}
      >
        <span className="font-display text-[18px] font-medium text-white">{q}</span>
        <span className="text-cyan-300 flex-shrink-0">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <div ref={panelRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="font-sans text-sm text-[var(--text-muted)] leading-[1.72] px-6 pb-6">
          {a}
        </p>
      </div>
    </li>
  );
};

export default FAQ;

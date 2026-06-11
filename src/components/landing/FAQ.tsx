import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Plus, Minus } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { gsap, EASE, revealOnScroll } from "@/lib/animations";

export const faqEntries: [string, string][] = [
  [
    "Preciso trocar meu número de WhatsApp?",
    "Não. Mantemos o número que sua clínica já usa, via WhatsApp Business API oficial. Sua equipe continua atendendo normalmente — a IA entra em paralelo, sem competir com o aparelho.",
  ],
  [
    "É seguro? Onde ficam meus dados?",
    "Conversas armazenadas em infraestrutura nacional, criptografadas, com contrato e DPA assinados. Você controla retenção e acesso. Nada é usado para treinar modelo público.",
  ],
  [
    "E se a IA não souber responder?",
    "Ela só responde dentro do escopo que vocês definem. Tudo que foge do script vira handoff automático para humano. Cada conversa fica gravada no painel para auditoria.",
  ],
  [
    "Ela conhece minha clínica?",
    "A IA é treinada com seus serviços, preços (ou faixas), convênios, médicos, horários, regras de agendamento e tom de voz. Não é genérica. É a sua secretária digital.",
  ],
  [
    "Quem assume quando foge do script?",
    "Sua equipe. A IA marca a conversa, alerta no painel ou no WhatsApp interno e segura o paciente educadamente até alguém entrar.",
  ],
  [
    "Lê áudio? Lê imagem?",
    "Sim. Áudio transcrito e respondido em segundos. Imagem (foto de carteirinha, pedido médico) é lida, classificada e roteada conforme a regra que vocês definirem.",
  ],
  [
    "Faz follow-up de falta e cancelamento?",
    "Faz. Recupera quem faltou, reagenda cancelamento e reativa paciente inativo. Tudo dentro da mesma conversa, sem campanha de spam.",
  ],
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
    "Zero configuração da sua parte. Nossa equipe cuida de tudo: integração com seu WhatsApp, configuração dos fluxos, treinamento do sistema. Implementação em poucos dias. Sem código, sem técnico contratado.",
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
          <Eyebrow>// e se...?</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            As perguntas que todo médico faz <em>antes de confiar numa IA.</em>
          </h2>
          <p className="font-sans text-sm md:text-base text-[var(--text-muted)] mt-3 md:mt-5 leading-relaxed">
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
      className="rounded-2xl overflow-hidden transition-colors"
      style={{
        background: isOpen ? "#FFFFFF" : "#F1FBF8",
        border: `1px solid ${isOpen ? "#0FB5A3" : "#D6F3EE"}`,
        boxShadow: isOpen ? "0 14px 36px rgba(15,181,163,0.14)" : "0 8px 22px rgba(10,140,126,0.06)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#E9F7F3]"
        aria-expanded={isOpen}
      >
        <span className="font-display text-[18px] font-medium text-[var(--text)]">{q}</span>
        <span className="text-[#0FB5A3] flex-shrink-0">
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

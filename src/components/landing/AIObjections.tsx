import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, Brain, UserCog, Mic, BellRing, Lock } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { revealOnScroll } from "@/lib/animations";

const items = [
  {
    Icon: ShieldCheck,
    q: "E se a IA responder algo errado?",
    a: "Ela só responde dentro do escopo que vocês definem. Tudo que foge do script vira handoff automático para humano. Cada conversa fica gravada no painel para auditoria.",
  },
  {
    Icon: Brain,
    q: "Ela conhece minha clínica?",
    a: "A IA é treinada com seus serviços, preços (ou faixas), convênios, médicos, horários, regras de agendamento e tom de voz. Não é genérica. É a sua secretária digital.",
  },
  {
    Icon: UserCog,
    q: "Quem assume quando foge do script?",
    a: "Sua equipe. A IA marca a conversa, alerta no painel ou no WhatsApp interno e segura o paciente educadamente até alguém entrar.",
  },
  {
    Icon: Mic,
    q: "Lê áudio? Lê imagem?",
    a: "Sim. Áudio transcrito e respondido em segundos. Imagem (foto de carteirinha, pedido médico) é lida, classificada e roteada conforme a regra que vocês definirem.",
  },
  {
    Icon: BellRing,
    q: "Faz follow-up de falta e cancelamento?",
    a: "Faz. Recupera quem faltou, reagenda cancelamento e reativa paciente inativo. Tudo dentro da mesma conversa, sem campanha de spam.",
  },
  {
    Icon: Lock,
    q: "E meus dados? LGPD?",
    a: "Conversas armazenadas em infraestrutura nacional, criptografadas, com contrato e DPA. Você controla retenção e acesso. Nada é usado para treinar modelo público.",
  },
];

const AIObjections = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="objecoes" className="py-14 md:section-padding relative bg-[#F3F4F6]" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// e se...?</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            As perguntas que todo médico faz <em>antes de confiar numa IA.</em>
          </h2>
          <p className="font-sans text-sm md:text-base text-[var(--text-muted)] mt-3 md:mt-5 leading-relaxed">
            Respostas diretas. Sem floreio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((it, i) => (
            <div
              key={i}
              data-reveal
              className="rounded-3xl p-5 md:p-6"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                boxShadow: "0 18px 44px rgba(70,55,35,0.08)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "linear-gradient(135deg, #D6F3EE, #D6F3EE)" }}
              >
                <it.Icon size={22} style={{ color: "#0A8C7E" }} />
              </div>
              <h3 className="font-display text-[17px] md:text-[18px] font-semibold text-[var(--text)] leading-snug">
                {it.q}
              </h3>
              <p className="font-sans text-[14px] text-[var(--text-muted)] mt-2 leading-relaxed">
                {it.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIObjections;

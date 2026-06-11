import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Check, TrendingDown, ArrowRight } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { revealOnScroll } from "@/lib/animations";

type Plan = {
  key: string;
  name: string;
  price: string;
  profile: string;
  highlight: boolean;
  inheritsFrom?: string;
  features: string[];
  ctaLabel: string;
  ctaVariant: "primary" | "ghost";
};

const plans: Plan[] = [
  {
    key: "essencial",
    name: "Essencial",
    price: "R$497",
    profile: "1 médico / consultório solo",
    highlight: false,
    features: [
      "IA responde WhatsApp 24/7",
      "Agendamento de consultas",
      "FAQ automatizado (valores, convênios, endereço, horários)",
      "Confirmação automática de agendamento",
      "1 agenda/profissional",
      "1 ajuste de fluxo por mês",
    ],
    ctaLabel: "Começar com Essencial",
    ctaVariant: "ghost",
  },
  {
    key: "profissional",
    name: "Profissional",
    price: "R$797",
    profile: "2-3 profissionais",
    highlight: true,
    inheritsFrom: "Essencial",
    features: [
      "Lembretes automáticos (anti-falta)",
      "Reagendamento e cancelamento pelo bot",
      "Qualificação de pacientes (perguntas pré-consulta)",
      "Integração com Google Agenda",
      "Relatório mensal de atendimentos",
      "Até 3 agendas/profissionais",
      "2 ajustes de fluxo por mês",
    ],
    ctaLabel: "Escolher Profissional",
    ctaVariant: "primary",
  },
  {
    key: "premium",
    name: "Premium",
    price: "R$1.247",
    profile: "Clínica com 4+ profissionais ou rede",
    highlight: false,
    inheritsFrom: "Profissional",
    features: [
      "Suporte prioritário (SLA 4h úteis)",
      "Relatório semanal (em vez de mensal)",
      "Agendas/profissionais ilimitados",
      "4 ajustes de fluxo por mês",
    ],
    ctaLabel: "Falar sobre Premium",
    ctaVariant: "ghost",
  },
];

const CheckIcon = () => (
  <span
    className="inline-flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0 mt-0.5"
    style={{ background: "#D6F3EE" }}
  >
    <Check size={12} strokeWidth={3} style={{ color: "#0A8C7E" }} />
  </span>
);

const Pricing = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="precos" className="py-14 md:section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-6 md:mb-8 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// planos e preços</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            Escolha o plano <em>da sua clínica.</em>
          </h2>
        </div>

        {/* Ancoragem de preço */}
        <div
          className="max-w-3xl mx-auto mb-10 md:mb-14 rounded-2xl p-5 md:p-6 flex items-start gap-4"
          style={{
            background: "#FFF8E6",
            border: "1px solid #F0E2B3",
            boxShadow: "0 12px 32px rgba(180,140,30,0.08)",
          }}
          data-reveal
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "#D6F3EE" }}
          >
            <TrendingDown size={20} style={{ color: "#0A8C7E" }} />
          </div>
          <p className="font-sans text-[14px] md:text-[15px] text-[var(--text)] leading-relaxed">
            Uma recepcionista custa{" "}
            <strong className="font-semibold">mais de R$3.000/mês</strong> com encargos e falta, tira férias e pede demissão.{" "}
            <strong className="font-semibold">A Secretária Invisível trabalha 24/7</strong>, a partir de apenas{" "}
            <strong className="font-semibold" style={{ color: "#0A8C7E" }}>R$497</strong>.
          </p>
        </div>

        {/* 3 cards stacked */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {plans.map((p) => (
            <div
              key={p.key}
              data-reveal
              className="rounded-3xl overflow-hidden flex flex-col relative"
              style={{
                background: "#FFFFFF",
                border: p.highlight ? "2px solid #0FB5A3" : "1px solid #D6F3EE",
                boxShadow: p.highlight
                  ? "0 28px 60px rgba(15,181,163,0.22)"
                  : "0 16px 36px rgba(15,23,42,0.06)",
                transform: p.highlight ? "translateY(-8px)" : undefined,
              }}
            >
              {p.highlight && (
                <span
                  className="absolute top-4 right-4 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ background: "#1F2937", color: "#FFFFFF" }}
                >
                  Mais escolhido
                </span>
              )}

              {/* Header */}
              <div
                className="p-6 md:p-7"
                style={
                  p.highlight
                    ? {
                        background: "linear-gradient(180deg, #0FB5A3 0%, #0A8C7E 100%)",
                        color: "#FFFFFF",
                      }
                    : { background: "#F1FBF8" }
                }
              >
                <p
                  className="font-display-sans text-[13px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: p.highlight ? "rgba(255,255,255,0.92)" : "#0A8C7E" }}
                >
                  {p.name}
                </p>

                <p
                  className="font-display-sans text-4xl font-bold mt-1"
                  style={{ color: p.highlight ? "#FFFFFF" : "#1F2937" }}
                >
                  {p.price}
                  <span
                    className="font-sans text-sm font-normal"
                    style={{ color: p.highlight ? "rgba(255,255,255,0.85)" : "var(--text-muted)" }}
                  >
                    /mês
                  </span>
                </p>
                <p
                  className="font-sans text-[13px] mt-3 leading-snug"
                  style={{ color: p.highlight ? "rgba(255,255,255,0.92)" : "var(--text-muted)" }}
                >
                  {p.profile}
                </p>
              </div>

              {/* Body */}
              <div className="p-6 md:p-7 flex-1 flex flex-col">
                {p.inheritsFrom && (
                  <p
                    className="font-display-sans text-[13px] font-semibold uppercase tracking-[0.08em] mb-4 pb-3 border-b"
                    style={{ color: "#0A8C7E", borderColor: "#E5E7EB" }}
                  >
                    Tudo do {p.inheritsFrom} +
                  </p>
                )}
                <ul className="space-y-3 flex-1">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="font-sans text-[14px] text-[var(--text)] leading-snug">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#formulario"
                  className={
                    "group mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-sans font-semibold text-[13px] uppercase tracking-[0.02em] transition-all duration-300 " +
                    (p.ctaVariant === "primary"
                      ? "gradient-brand text-white shadow-[0_14px_30px_rgba(15,181,163,0.32)] hover:-translate-y-0.5"
                      : "bg-white border border-[#0FB5A3] text-[#0A8C7E] hover:bg-[#F1FBF8]")
                  }
                >
                  <span>{p.ctaLabel}</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="font-sans text-[12px] text-[var(--text-muted)] text-center mt-8">
          Diagnóstico gratuito antes de qualquer cobrança. Cancele com 30 dias de aviso.
        </p>
      </div>
    </section>
  );
};

export default Pricing;

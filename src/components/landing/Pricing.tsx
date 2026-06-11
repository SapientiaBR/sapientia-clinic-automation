import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Check, Minus } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import MagneticButton from "@/components/ui/MagneticButton";
import { revealOnScroll } from "@/lib/animations";

type Cell = boolean | string;

const plans = [
  {
    key: "essencial",
    name: "Essencial",
    price: "R$497",
    profile: "1 médico / consultório solo",
    highlight: false,
  },
  {
    key: "profissional",
    name: "Profissional",
    price: "R$797",
    profile: "2-3 profissionais",
    highlight: true,
  },
  {
    key: "premium",
    name: "Premium",
    price: "R$1.247",
    profile: "Clínica com 4+ profissionais ou rede",
    highlight: false,
  },
] as const;

const rows: { label: string; bold?: boolean; values: [Cell, Cell, Cell] }[] = [
  { label: "IA responde WhatsApp 24/7", values: [true, true, true] },
  { label: "Agendamento de consultas", values: [true, true, true] },
  { label: "FAQ automatizado (valores, convênios, endereço, horários)", values: [true, true, true] },
  { label: "Confirmação automática de agendamento", values: [true, true, true] },
  { label: "Lembretes automáticos (anti-falta)", bold: true, values: [false, true, true] },
  { label: "Reagendamento/cancelamento pelo bot", values: [false, true, true] },
  { label: "Qualificação de pacientes (perguntas pré-consulta)", bold: true, values: [false, true, true] },
  { label: "Integração Google Agenda", values: [false, true, true] },
  { label: "Relatório de atendimentos", values: ["—", "Mensal", "Semanal"] },
  { label: "Nº de agendas/profissionais", values: ["1", "até 3", "ilimitado"] },
  { label: "Suporte prioritário (SLA 4h úteis)", bold: true, values: [false, false, true] },
  { label: "Ajustes de fluxo inclusos", bold: true, values: ["1/mês", "2/mês", "4/mês"] },
];

const CheckIcon = () => (
  <span
    className="inline-flex items-center justify-center w-6 h-6 rounded-full"
    style={{ background: "#D6F3EE" }}
    aria-label="incluso"
  >
    <Check size={14} strokeWidth={3} style={{ color: "#0A8C7E" }} />
  </span>
);

const Dash = () => (
  <Minus size={18} className="mx-auto" style={{ color: "#9CA3AF" }} aria-label="não incluso" />
);

const renderCell = (v: Cell) => {
  if (v === true) return <CheckIcon />;
  if (v === false) return <Dash />;
  return <span className="font-sans text-[14px] text-[var(--text)]">{v}</span>;
};

const Pricing = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="precos" className="py-14 md:section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// planos e preços</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            Escolha o plano <em>da sua clínica.</em>
          </h2>
          <p className="font-sans text-sm md:text-base text-[var(--text-muted)] mt-3 md:mt-5 leading-relaxed">
            Sem fidelidade longa. Cancele com 30 dias de aviso. Comece pelo plano que cabe hoje, suba quando precisar.
          </p>
        </div>

        {/* DESKTOP TABLE */}
        <div
          className="hidden md:block rounded-3xl overflow-hidden"
          style={{
            background: "#F1FBF8",
            border: "1px solid #D6F3EE",
            boxShadow: "0 24px 56px rgba(10,140,126,0.10), 0 4px 12px rgba(15,23,42,0.04)",
          }}
          data-reveal
        >
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr]">
            {/* Header row */}
            <div className="p-6" />
            {plans.map((p) => (
              <div
                key={p.key}
                className="p-6 text-center relative"
                style={
                  p.highlight
                    ? {
                        background: "linear-gradient(180deg, #0FB5A3 0%, #0A8C7E 100%)",
                        color: "#FFFFFF",
                      }
                    : undefined
                }
              >
                {p.highlight && (
                  <span
                    className="absolute -top-0 left-1/2 -translate-x-1/2 translate-y-[-50%] px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{ background: "#1F2937", color: "#FFFFFF" }}
                  >
                    Mais escolhido
                  </span>
                )}
                <p
                  className="font-display italic text-xl mb-1"
                  style={{ color: p.highlight ? "#FFFFFF" : "#0A8C7E" }}
                >
                  {p.name}
                </p>
                <p
                  className="font-display-sans text-3xl lg:text-4xl font-bold"
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
                  className="font-sans text-[12px] mt-3 leading-snug"
                  style={{ color: p.highlight ? "rgba(255,255,255,0.92)" : "var(--text-muted)" }}
                >
                  {p.profile}
                </p>
              </div>
            ))}

            {/* Feature rows */}
            {rows.map((row, i) => (
              <div key={i} className="contents">
                <div
                  className="px-6 py-4 font-sans text-[14px] text-[var(--text)] border-t"
                  style={{ borderColor: "#E5E7EB", fontWeight: row.bold ? 600 : 400 }}
                >
                  {row.label}
                </div>
                {row.values.map((v, j) => (
                  <div
                    key={j}
                    className="px-4 py-4 text-center border-t"
                    style={{
                      borderColor: "#E5E7EB",
                      background: plans[j].highlight ? "rgba(15,181,163,0.06)" : undefined,
                    }}
                  >
                    {renderCell(v)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-5">
          {plans.map((p, idx) => (
            <div
              key={p.key}
              data-reveal
              className="rounded-3xl overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: p.highlight ? "2px solid #0FB5A3" : "1px solid #D6F3EE",
                boxShadow: p.highlight
                  ? "0 20px 44px rgba(15,181,163,0.20)"
                  : "0 16px 36px rgba(15,23,42,0.06)",
              }}
            >
              <div
                className="p-5 text-center relative"
                style={
                  p.highlight
                    ? {
                        background: "linear-gradient(180deg, #0FB5A3 0%, #0A8C7E 100%)",
                        color: "#FFFFFF",
                      }
                    : { background: "#F1FBF8" }
                }
              >
                {p.highlight && (
                  <span
                    className="inline-block mb-2 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{ background: "#1F2937", color: "#FFFFFF" }}
                  >
                    Mais escolhido
                  </span>
                )}
                <p
                  className="font-display italic text-lg"
                  style={{ color: p.highlight ? "#FFFFFF" : "#0A8C7E" }}
                >
                  {p.name}
                </p>
                <p
                  className="font-display-sans text-3xl font-bold mt-1"
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
                  className="font-sans text-[12px] mt-2 leading-snug"
                  style={{ color: p.highlight ? "rgba(255,255,255,0.92)" : "var(--text-muted)" }}
                >
                  {p.profile}
                </p>
              </div>

              <ul className="p-5 space-y-3">
                {rows.map((row, i) => {
                  const v = row.values[idx];
                  const included = v !== false;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0">
                        {included ? (
                          <CheckIcon />
                        ) : (
                          <span
                            className="inline-flex items-center justify-center w-6 h-6 rounded-full"
                            style={{ background: "#F3F4F6" }}
                          >
                            <Minus size={14} style={{ color: "#9CA3AF" }} />
                          </span>
                        )}
                      </span>
                      <div className="flex-1">
                        <p
                          className="font-sans text-[13px] text-[var(--text)] leading-snug"
                          style={{ fontWeight: row.bold ? 600 : 400, opacity: included ? 1 : 0.5 }}
                        >
                          {row.label}
                          {typeof v === "string" && (
                            <span className="font-semibold" style={{ color: "#0A8C7E" }}>
                              {" "}
                              — {v}
                            </span>
                          )}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 mt-10 md:mt-12" data-reveal>
          <MagneticButton href="#formulario" variant="primary">
            <span className="whitespace-nowrap">Falar com a Sapient.IA</span>
          </MagneticButton>
          <p className="font-sans text-[12px] text-[var(--text-muted)] text-center">
            Diagnóstico gratuito antes de qualquer cobrança.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

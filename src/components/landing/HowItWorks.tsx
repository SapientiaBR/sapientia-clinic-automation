import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Eyebrow from "@/components/ui/Eyebrow";
import { revealOnScroll } from "@/lib/animations";

const steps = [
  {
    n: "01",
    title: "Conectamos seu WhatsApp",
    desc: "Em até 24h. Sem trocar de número, sem app novo. Usamos a API oficial do WhatsApp Business.",
    chat: [
      { side: "left", text: "✅ WhatsApp da clínica conectado e ativo", time: "10:12" },
    ],
  },
  {
    n: "02",
    title: "Configuramos sua agenda",
    desc: "Integramos serviços, convênios, horários, médicos e o tom de voz da sua clínica. Você aprova antes de ativar.",
    chat: [
      { side: "right", text: "Pode incluir consulta + retorno em 15 dias?", time: "10:15" },
      { side: "left", text: "Feito. Quer revisar o fluxo completo?", time: "10:15" },
    ],
  },
  {
    n: "03",
    title: "Sua IA atende sozinha",
    desc: "Agenda, envia lembrete no dia, recupera no-show e reativa paciente inativo. Sua equipe só entra quando vale a pena.",
    chat: [
      { side: "left", text: "Olá Maria, hoje você tem consulta às 14h 😊", time: "08:00" },
    ],
  },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="como-funciona" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-16 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// como funciona</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            Três passos. <em>Zero esforço seu.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((s, i) => (
            <div key={i} className="card-base p-7 relative" data-reveal>
              <span className="font-display italic text-[80px] leading-none gradient-text opacity-50 absolute -top-2 right-4 select-none">
                {s.n}
              </span>
              <h3 className="font-display text-[22px] font-semibold text-[var(--text)] relative z-10 mt-2">
                {s.title}
              </h3>
              <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed mt-3 mb-6">
                {s.desc}
              </p>

              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3 space-y-2">
                {s.chat.map((m, j) => (
                  <div key={j} className={`flex ${m.side === "right" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`text-xs px-3 py-2 max-w-[85%] rounded-xl ${
                        m.side === "right" ? "rounded-tr-sm" : "rounded-tl-sm border"
                      }`}
                      style={
                        m.side === "right"
                          ? { background: "#DCFCE7", color: "#0F3D2E" }
                          : { background: "#F9FAFB", color: "#1F2937", borderColor: "#E5E7EB" }
                      }
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                <p className="font-mono text-[10px] text-[#0FB5A3]/60 text-center pt-1">{s.chat[s.chat.length - 1].time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

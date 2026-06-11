import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Eyebrow from "@/components/ui/Eyebrow";
import { revealOnScroll } from "@/lib/animations";

const steps = [
  {
    n: "01",
    title: "Conectamos seu WhatsApp",
    desc: "Em até 24h. Sem trocar de número, sem app novo. API oficial do WhatsApp Business.",
    chat: { side: "left", text: "✅ WhatsApp da clínica conectado e ativo", time: "10:12" },
  },
  {
    n: "02",
    title: "Configuramos sua agenda",
    desc: "Serviços, convênios, horários e tom de voz. Você aprova antes de ativar.",
    chat: { side: "left", text: "Fluxo configurado. Quer revisar?", time: "10:15" },
  },
  {
    n: "03",
    title: "Sua IA atende sozinha",
    desc: "Agenda, lembra, recupera no-show e reativa inativo. Sua equipe só entra no que vale.",
    chat: { side: "left", text: "Olá Maria, hoje você tem consulta às 14h 😊", time: "08:00" },
  },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="como-funciona" className="py-10 md:py-14 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-6 md:mb-8 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// como funciona</Eyebrow>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text)] text-balance">
            Três passos. <em>Zero esforço seu.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((s, i) => (
            <div key={i} className="card-base p-5 relative" data-reveal>
              <span className="font-display italic text-[56px] leading-none gradient-text opacity-50 absolute -top-1 right-3 select-none">
                {s.n}
              </span>
              <h3 className="font-display text-[19px] font-semibold text-[var(--text)] relative z-10 mt-1">
                {s.title}
              </h3>
              <p className="font-sans text-[13px] text-[var(--text-muted)] leading-snug mt-2 mb-4">
                {s.desc}
              </p>

              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-2.5">
                <div className="flex justify-start">
                  <div
                    className="text-xs px-3 py-2 max-w-[90%] rounded-xl rounded-tl-sm border"
                    style={{ background: "#FFFFFF", color: "#1F2937", borderColor: "#E5E7EB" }}
                  >
                    {s.chat.text}
                  </div>
                </div>
                <p className="font-mono text-[10px] text-[#0FB5A3]/60 text-center pt-1">{s.chat.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

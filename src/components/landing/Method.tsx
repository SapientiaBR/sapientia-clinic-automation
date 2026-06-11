import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { MessageSquare, ListChecks, CalendarClock, BellRing, RefreshCw } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { revealOnScroll } from "@/lib/animations";

const steps = [
  { Icon: MessageSquare,  title: "Captura a intenção", desc: "Lê a mensagem do paciente assim que ela chega e entende o que ele realmente quer." },
  { Icon: ListChecks,     title: "Qualifica",          desc: "Identifica urgência, tipo de consulta e se é convênio ou particular." },
  { Icon: CalendarClock,  title: "Agenda",             desc: "Sugere e marca no melhor horário disponível da sua agenda real." },
  { Icon: BellRing,       title: "Confirma",           desc: "Envia lembrete automático, confirma presença e reduz faltas drasticamente." },
  { Icon: RefreshCw,      title: "Reativa",            desc: "Resgata pacientes que sumiram há semanas com mensagens que parecem conversa." },
];

const Method = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="metodo" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-6 md:mb-14 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// método agenda invisível</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            Cinco passos. <em>Zero fricção.</em> Agenda cheia.
          </h2>
          <p className="font-sans text-sm md:text-base text-[var(--text-muted)] mt-3 md:mt-5 leading-snug md:leading-relaxed">
            O método que aplicamos em toda implementação — do primeiro "oi" do paciente até ele sentar na sua cadeira.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-5">
          {steps.map((s, i) => (
            <div key={i} className="card-base p-4 md:p-6 relative" data-reveal>
              <div className="flex items-center gap-3 md:block">
                <div className="flex-shrink-0">
                  <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.08em] md:tracking-[0.15em] text-[#0A8C7E] block md:mb-0">
                    0{i + 1}
                  </span>
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center md:my-4 mt-1 md:mt-0"
                    style={{
                      background: "linear-gradient(135deg, #D6F3EE, #F3F4F6)",
                    }}
                  >
                    <s.Icon size={20} className="md:hidden" style={{ color: "#0A8C7E" }} />
                    <s.Icon size={22} className="hidden md:block" style={{ color: "#0A8C7E" }} />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base md:text-lg font-semibold text-[var(--text)]">{s.title}</h3>
                  <p className="font-sans text-[13px] md:text-sm text-[var(--text-muted)] leading-snug md:leading-relaxed mt-1 md:mt-2">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Method;

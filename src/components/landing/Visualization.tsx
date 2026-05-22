import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { X, Check } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { gsap, EASE } from "@/lib/animations";

const left = [
  "Mensagens sem resposta por horas",
  "Pacientes desistindo no WhatsApp",
  "Agenda com buracos frequentes",
  "Faltas sem aviso prévio",
  "Equipe sobrecarregada",
];
const right = [
  "Resposta em menos de 10 segundos",
  "Cada contato atendido na hora",
  "Agendamento automático e otimizado",
  "Lembretes com confirmação",
  "Equipe focada no atendimento presencial",
];

const Visualization = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.from(ref.current!.querySelector("[data-heading]"), {
        y: 60, opacity: 0, duration: 0.7, ease: EASE,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
      gsap.from(ref.current!.querySelector("[data-left]"), {
        x: -40, opacity: 0, duration: 0.8, ease: EASE,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.from(ref.current!.querySelector("[data-right]"), {
        x: 40, opacity: 0, duration: 0.8, ease: EASE, delay: 0.15,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
        <div className="text-center mb-14 max-w-3xl mx-auto" data-heading>
          <Eyebrow>// a diferença invisível</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            O mesmo dia. <em>Dois cenários completamente diferentes.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            data-left
            className="card-base p-7 border-rose-500/20"
            style={{ background: "var(--navy-2)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-rose-500/15 flex items-center justify-center">
                <X size={18} className="text-rose-400" />
              </div>
              <h3 className="font-display text-xl font-semibold text-rose-300/90">Sem automação</h3>
            </div>
            <ul className="space-y-3">
              {left.map((t, i) => (
                <li key={i} className="flex items-start gap-3 font-sans text-sm text-white/65">
                  <X size={15} className="text-rose-400/60 mt-0.5 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-right
            className="card-base p-7"
            style={{
              boxShadow: "0 0 40px rgba(16,185,129,0.08)",
              borderColor: "rgba(16,185,129,0.25)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <Check size={18} className="text-emerald-400" />
              </div>
              <h3 className="font-display text-xl font-semibold text-emerald-300">Com Secretária Invisível</h3>
            </div>
            <ul className="space-y-3">
              {right.map((t, i) => (
                <li key={i} className="flex items-start gap-3 font-sans text-sm text-white/95">
                  <Check size={15} className="text-emerald-400/90 mt-0.5 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300/70 mt-6">
              Agenda preenchida
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visualization;

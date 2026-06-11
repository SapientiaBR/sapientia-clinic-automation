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
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            O mesmo dia. <em>Dois cenários completamente diferentes.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            data-left
            className="card-base p-7"
            style={{ borderColor: "rgba(239,111,122,0.30)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#FDECEE" }}>
                <X size={18} style={{ color: "#EF6F7A" }} />
              </div>
              <h3 className="font-display text-xl font-semibold" style={{ color: "#C44A56" }}>Sem automação</h3>
            </div>
            <ul className="space-y-3">
              {left.map((t, i) => (
                <li key={i} className="flex items-start gap-3 font-sans text-sm text-[var(--text-muted)]">
                  <X size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#EF6F7A" }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-right
            className="card-base p-7"
            style={{
              boxShadow: "0 16px 44px rgba(69,216,155,0.14)",
              borderColor: "#BCEFD6",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#E6FBF1" }}>
                <Check size={18} style={{ color: "#16A875" }} />
              </div>
              <h3 className="font-display text-xl font-semibold" style={{ color: "#0F3D2E" }}>Com Secretária Invisível</h3>
            </div>
            <ul className="space-y-3">
              {right.map((t, i) => (
                <li key={i} className="flex items-start gap-3 font-sans text-sm text-[var(--text)]">
                  <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#16A875" }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visualization;

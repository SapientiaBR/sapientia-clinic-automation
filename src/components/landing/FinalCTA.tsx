import { Check } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import MagneticButton from "@/components/ui/MagneticButton";

const guarantees = [
  "Implementação em poucos dias",
  "Sem trocar seu WhatsApp",
  "Cancelamento simples (30 dias)",
];

const FinalCTA = () => {
  return (
    <section className="py-14 md:section-padding relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "rgba(108,99,255,0.10)", filter: "blur(120px)" }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl">
        {/* Garantia em destaque (tema warm/lavanda) */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-10 md:mb-14 text-left"
          style={{
            background: "#F1EEFF",
            border: "1px solid #DED8FF",
            boxShadow: "0 14px 36px rgba(70,55,35,0.10)",
          }}
        >
          <Eyebrow>// garantia</Eyebrow>
          <p className="font-sans text-[15px] md:text-base text-[var(--text)] leading-relaxed mt-2">
            Acompanhamos sua clínica de perto nas primeiras semanas. Se não houver redução de
            faltas e mais agendamentos, ajustamos sem custo adicional.
          </p>
          <ul className="grid sm:grid-cols-3 gap-3 mt-5">
            {guarantees.map((g) => (
              <li
                key={g}
                className="flex items-center gap-2 font-sans text-[13px] text-[var(--text)]/80"
              >
                <Check size={16} className="flex-shrink-0" style={{ color: "#8A7CF6" }} />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <Eyebrow>// comece agora</Eyebrow>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-[52px] font-bold text-[var(--text)] text-balance">
            Pronto para parar de <em>perder pacientes?</em>
          </h2>
          <p className="font-sans text-[15px] md:text-base text-[var(--text-muted)] mt-4 md:mt-5 mb-7 md:mb-8 leading-relaxed">
            Diagnóstico gratuito. Sem compromisso. Acompanhamento próximo nas primeiras semanas.
          </p>
          <div className="flex justify-center">
            <MagneticButton href="#formulario" variant="primary" className="whitespace-nowrap">
              <span className="whitespace-nowrap">Testar a IA agora</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

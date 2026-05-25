import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Slider } from "@/components/ui/slider";
import Eyebrow from "@/components/ui/Eyebrow";
import MagneticButton from "@/components/ui/MagneticButton";
import { countTo, revealOnScroll } from "@/lib/animations";

const PERDA = 0.30;
const SEMANAS_POR_MES = 4.33;

const LossCalculator = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [atendSemana, setAtendSemana] = useState(35);
  const [ticket, setTicket] = useState(500);

  const result = Math.round(atendSemana * SEMANAS_POR_MES * PERDA * ticket);
  const [displayed, setDisplayed] = useState(result);
  const prevRef = useRef(result);

  useEffect(() => {
    const kill = countTo(prevRef.current, result, setDisplayed, { duration: 0.7 });
    prevRef.current = result;
    return kill;
  }, [result]);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="calculadora" className="py-14 md:section-padding relative bg-[#EEF3FF]" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl">
        <div className="text-center mb-8 md:mb-12" data-reveal>
          <Eyebrow>// calculadora</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            Quanto sua clínica está <em>deixando na mesa?</em>
          </h2>
        </div>

        <div className="card-base p-6 sm:p-12 overflow-visible" data-reveal>
          <SliderRow
            label="Atendimentos por semana"
            value={atendSemana}
            display={atendSemana.toString()}
            onChange={setAtendSemana}
            min={5} max={100} step={5}
          />
          <SliderRow
            label="Ticket médio por consulta"
            value={ticket}
            display={`R$ ${ticket}`}
            onChange={setTicket}
            min={100} max={2000} step={50}
          />

          {/* Desktop: bloco completo de estudo */}
          <div className="hidden md:block mt-2 mb-6 p-5 rounded-xl border border-[#DDE6F2] bg-[#F8FAFF]">
            <p className="font-sans text-sm text-[var(--text)]/85 leading-relaxed">
              Estudos mostram que <span className="text-[#5B6CFF] font-semibold">54% dos pedidos de agendamento acontecem fora do horário comercial</span>. Considerando uma perda conservadora de <span className="text-[#5B6CFF] font-semibold">30%</span> por falta de resposta imediata, o impacto na sua clínica é:
            </p>
          </div>

          {/* Mobile: linha discreta */}
          <p className="md:hidden font-mono text-[10px] uppercase tracking-[0.15em] text-[#5B6CFF] mt-1 mb-4 text-center">
            Cálculo conservador · 30% de perda
          </p>

          <div className="text-center pt-5 md:pt-6 border-t border-[#DDE6F2] overflow-visible">
            <p className="font-sans text-[13px] md:text-sm text-[var(--text-muted)] mb-2 md:mb-3">
              Você está deixando na mesa todo mês:
            </p>
            <p className="font-display font-bold text-[44px] sm:text-[72px] lg:text-[80px] leading-[1.15] pb-3 gradient-text tabular-nums overflow-visible">
              R$ {displayed.toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="flex justify-center mt-6 md:mt-8">
            <MagneticButton href="#formulario" variant="primary" className="animate-pulse whitespace-nowrap">
              <span className="whitespace-nowrap">Quero recuperar esse valor →</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

const SliderRow = ({ label, value, display, onChange, min, max, step }: {
  label: string; value: number; display: string;
  onChange: (v: number) => void; min: number; max: number; step: number;
}) => (
  <div className="mb-10">
    <div className="flex justify-between items-center mb-3">
      <label className="font-sans text-sm text-[var(--text)]/85">{label}</label>
      <span className="font-display text-2xl gradient-text font-semibold tabular-nums">{display}</span>
    </div>
    <Slider value={[value]} onValueChange={(v) => onChange(v[0])} min={min} max={max} step={step}
      className="[&_[role=slider]]:bg-[#6C63FF] [&_[role=slider]]:border-[#6C63FF] cursor-pointer" />
    <div className="flex justify-between font-mono text-[10px] text-[var(--text-dim)] mt-2 uppercase tracking-widest">
      <span>{min}</span><span>{max}</span>
    </div>
  </div>
);

export default LossCalculator;

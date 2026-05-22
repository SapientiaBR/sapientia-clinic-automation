import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Slider } from "@/components/ui/slider";
import Eyebrow from "@/components/ui/Eyebrow";
import MagneticButton from "@/components/ui/MagneticButton";
import { gsap, EASE, countTo } from "@/lib/animations";

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

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.from(ref.current!.querySelectorAll("[data-reveal]"), {
        y: 60, opacity: 0, duration: 0.7, ease: EASE, stagger: 0.2,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    });
    mm.add("(max-width: 767px)", () => {
      gsap.from(ref.current!.querySelectorAll("[data-reveal]"), {
        y: 30, opacity: 0, duration: 0.6, ease: EASE, stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl">
        <div className="text-center mb-12" data-reveal>
          <Eyebrow>// calculadora</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            Quanto sua clínica está <em>deixando na mesa?</em>
          </h2>
        </div>

        <div className="card-base p-8 sm:p-12 overflow-visible" data-reveal>
          <SliderRow
            label="Quantos atendimentos por semana?"
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

          <div className="mt-2 mb-6 p-5 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.03]">
            <p className="font-sans text-sm text-white/75 leading-relaxed">
              Estudos mostram que <span className="text-cyan-300 font-semibold">54% dos pedidos de agendamento acontecem fora do horário comercial</span>. Considerando uma perda conservadora de <span className="text-cyan-300 font-semibold">30%</span> por falta de resposta imediata, o impacto na sua clínica é:
            </p>
          </div>

          <div className="text-center pt-6 border-t border-white/5 overflow-visible">
            <p className="font-sans text-sm text-[var(--text-muted)] mb-3">
              Você está deixando na mesa todo mês:
            </p>
            <p className="font-display font-bold text-[56px] sm:text-[72px] lg:text-[80px] leading-[1.15] pb-3 gradient-text tabular-nums overflow-visible">
              R$ {displayed.toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <MagneticButton href="#formulario" variant="primary" className="animate-pulse">
              Quero recuperar esse valor →
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
      <label className="font-sans text-sm text-white/85">{label}</label>
      <span className="font-display text-2xl text-cyan-300 font-semibold tabular-nums">{display}</span>
    </div>
    <Slider value={[value]} onValueChange={(v) => onChange(v[0])} min={min} max={max} step={step}
      className="[&_[role=slider]]:bg-cyan-300 [&_[role=slider]]:border-cyan-300 cursor-pointer" />
    <div className="flex justify-between font-mono text-[10px] text-[var(--text-dim)] mt-2 uppercase tracking-widest">
      <span>{min}</span><span>{max}</span>
    </div>
  </div>
);

export default LossCalculator;

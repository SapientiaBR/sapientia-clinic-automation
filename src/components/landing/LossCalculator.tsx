import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import Eyebrow from "@/components/ui/Eyebrow";
import MagneticButton from "@/components/ui/MagneticButton";

const useRafCount = (target: number, duration = 700) => {
  const [v, setV] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
};

const PERDA = 0.30;
const SEMANAS_POR_MES = 4.33;

const LossCalculator = () => {
  const [atendSemana, setAtendSemana] = useState(25);
  const [ticket, setTicket] = useState(350);

  const result = Math.round(atendSemana * SEMANAS_POR_MES * PERDA * ticket);
  const animated = useRafCount(result);

  return (
    <section className="section-padding relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl">
        <div className="text-center mb-12">
          <Eyebrow>// calculadora</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            Quanto sua clínica está <em>deixando na mesa?</em>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="card-base p-8 sm:p-12 overflow-visible"
        >
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
              R$ {animated.toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <MagneticButton href="#formulario" variant="primary" className="animate-pulse">
              Quero recuperar esse valor →
            </MagneticButton>
          </div>
        </motion.div>
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

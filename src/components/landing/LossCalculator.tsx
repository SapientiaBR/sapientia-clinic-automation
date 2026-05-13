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

const LossCalculator = () => {
  const [atendimentos, setAtendimentos] = useState(150);
  const [perda, setPerda] = useState(15); // %
  const [ticket, setTicket] = useState(250);

  const raw = Math.round(atendimentos * (perda / 100) * ticket);
  const cap = atendimentos * ticket; // can't lose more than total revenue
  const result = Math.min(raw, cap);
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
          className="card-base p-8 sm:p-12"
        >
          <SliderRow
            label="Quantos atendimentos por mês?"
            value={atendimentos}
            display={atendimentos.toString()}
            onChange={setAtendimentos}
            min={50} max={500} step={10}
          />
          <SliderRow
            label="Quantas consultas perde por falta de resposta?"
            value={perda}
            display={`${perda}%`}
            onChange={setPerda}
            min={1} max={30} step={1}
          />
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <label className="font-sans text-sm text-white/85">Ticket médio por consulta</label>
              <div className="flex items-center gap-1 font-display text-cyan-300 text-2xl font-semibold">
                R$
                <input
                  type="number"
                  value={ticket}
                  min={50}
                  max={3000}
                  onChange={(e) => setTicket(Math.max(50, Math.min(3000, Number(e.target.value) || 0)))}
                  className="w-24 bg-transparent border-b border-cyan-300/30 text-cyan-300 outline-none focus:border-cyan-300 text-right tabular-nums"
                />
              </div>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-white/5">
            <p className="font-sans text-sm text-[var(--text-muted)] mb-3">
              Você está deixando na mesa todo mês:
            </p>
            <p className="font-display font-bold text-[56px] sm:text-[72px] lg:text-[80px] leading-none gradient-text tabular-nums">
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

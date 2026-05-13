import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Wallet, CalendarX } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  desc: string;
  Icon: typeof Clock;
  glow: string;
};

const stats: Stat[] = [
  {
    value: 63, suffix: "%", label: "desistem em 5 minutos",
    desc: "Dos pacientes não esperam mais que 5 min por uma resposta antes de procurar outra clínica.",
    Icon: Clock, glow: "rgba(124,58,237,0.25)",
  },
  {
    value: 2800, prefix: "R$ ", label: "/mês de secretária CLT",
    desc: "Custo médio de uma secretária com encargos. Sem contar férias, faltas e treinamento.",
    Icon: Wallet, glow: "rgba(6,182,212,0.25)",
  },
  {
    value: 34, suffix: "%", label: "de faltas sem confirmação",
    desc: "Consultas marcadas sem confirmação automática viram cadeira vazia e prejuízo direto.",
    Icon: CalendarX, glow: "rgba(77,235,255,0.25)",
  },
];

const useCounter = (target: number, run: boolean, duration = 1600) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0; const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return v;
};

const StatCard = ({ s, i, run }: { s: Stat; i: number; run: boolean }) => {
  const v = useCounter(s.value, run);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={run ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay: i * 0.12 }}
      className="card-base p-7"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ background: s.glow, boxShadow: `0 0 30px ${s.glow}` }}
      >
        <s.Icon size={22} className="text-white" />
      </div>
      <p className="font-display font-bold text-[52px] leading-none gradient-text tabular-nums">
        {s.prefix}{v.toLocaleString("pt-BR")}{s.suffix}
      </p>
      <p className="font-sans font-bold text-white text-[15px] mt-2">{s.label}</p>
      <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed mt-3">{s.desc}</p>
    </motion.div>
  );
};

const Problems = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="problema" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <Eyebrow>// o problema invisível</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            Cada mensagem sem resposta é um <em>paciente que não volta.</em>
          </h2>
          <p className="font-sans text-base text-[var(--text-muted)] mt-5 leading-relaxed">
            A maioria das clínicas perde mais dinheiro no WhatsApp do que ganha em consulta. Os números não mentem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((s, i) => <StatCard key={i} s={s} i={i} run={run} />)}
        </div>
      </div>
    </section>
  );
};

export default Problems;

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";

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
  return (
    <section className="section-padding relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <Eyebrow>// a diferença invisível</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            O mesmo dia. <em>Dois cenários completamente diferentes.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Visualization;

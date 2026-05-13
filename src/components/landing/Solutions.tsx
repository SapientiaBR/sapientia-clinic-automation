import { motion } from "framer-motion";
import { Clock, CalendarCheck, BellRing, Sparkles } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";

const features = [
  {
    Icon: Clock,
    title: "Atendimento 24/7",
    desc: "Domingo às 23h, feriado, hora do almoço. Responde em segundos — toda vez, todo dia.",
  },
  {
    Icon: CalendarCheck,
    title: "Agendamento inteligente",
    desc: "Lê sua agenda, sugere os melhores horários, evita choques.",
  },
  {
    Icon: BellRing,
    title: "Confirmação automática",
    desc: "Lembrete 24h antes. Reagendamento sem fricção. Faltas em queda.",
  },
  {
    Icon: Sparkles,
    title: "Reativação de base inativa",
    desc: "Pacientes que sumiram voltam — em campanhas que parecem conversa, não spam.",
  },
];

const Solutions = () => {
  return (
    <section id="solucoes" className="section-padding relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <Eyebrow>// recursos</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            Infraestrutura. <em>Não chatbot.</em>
          </h2>
          <p className="font-sans text-base text-[var(--text-muted)] mt-5 leading-relaxed">
            Cada recurso foi desenhado para sumir do seu caminho — e fazer o trabalho que ninguém vê.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-base p-7 group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))",
                  boxShadow: "0 0 30px rgba(124,58,237,0.2)",
                }}
              >
                <f.Icon size={24} className="text-cyan-300" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">{f.title}</h3>
              <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;

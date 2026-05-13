import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";

const steps = [
  {
    n: "01",
    title: "Paciente envia mensagem",
    desc: "Qualquer hora, qualquer dia. A Secretária Invisível recebe e entende a intenção em segundos.",
    chat: [
      { side: "right", text: "Oi, queria marcar uma consulta", time: "22:47" },
    ],
  },
  {
    n: "02",
    title: "IA qualifica e agenda",
    desc: "Consulta a agenda, sugere horários, confirma dados do paciente. Tudo sem intervenção humana.",
    chat: [
      { side: "left", text: "Olá! 😊 Tenho amanhã às 14h ou 16h. Qual prefere?", time: "22:47" },
      { side: "right", text: "14h", time: "22:48" },
    ],
  },
  {
    n: "03",
    title: "Consulta confirmada",
    desc: "Lembrete automático 24h antes. Reagendamento se necessário. Você só aparece para atender.",
    chat: [
      { side: "left", text: "✅ Confirmado para amanhã 14h. Lembrete 1h antes.", time: "22:48" },
    ],
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="section-padding relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <Eyebrow>// como funciona</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            Três passos. <em>Zero esforço seu.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="card-base p-7 relative"
            >
              <span className="font-display italic text-[80px] leading-none gradient-text opacity-50 absolute -top-2 right-4 select-none">
                {s.n}
              </span>
              <h3 className="font-display text-[22px] font-semibold text-white relative z-10 mt-2">
                {s.title}
              </h3>
              <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed mt-3 mb-6">
                {s.desc}
              </p>

              <div className="bg-[var(--navy-1)] border border-white/5 rounded-xl p-3 space-y-2">
                {s.chat.map((m, j) => (
                  <div key={j} className={`flex ${m.side === "right" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`text-xs px-3 py-2 max-w-[85%] rounded-xl ${
                        m.side === "right"
                          ? "rounded-tr-sm text-white"
                          : "rounded-tl-sm text-white border border-white/10 bg-white/5"
                      }`}
                      style={m.side === "right" ? { background: "#1f6f4a" } : undefined}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                <p className="font-mono text-[10px] text-cyan-300/40 text-center pt-1">{s.chat[s.chat.length - 1].time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

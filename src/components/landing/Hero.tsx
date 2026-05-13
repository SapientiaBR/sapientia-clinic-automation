import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const CTA_HREF = "#formulario";

const messages = [
  { side: "right", text: "Olá, gostaria de agendar uma consulta com o Dr. Silva" },
  { side: "left",  text: "Olá! 😊 Claro! O Dr. Silva tem horários amanhã às 14h ou 16h. Qual prefere?" },
  { side: "right", text: "Às 14h, por favor!" },
  { side: "left",  text: "Perfeito! ✅ Consulta agendada para amanhã às 14h. Enviarei um lembrete 1h antes!" },
];

const floatCards = [
  { pos: "top-2 -right-4 md:-right-10",   border: "border-emerald-400/40", label: "AGENDAMENTO",     value: "✅ Confirmado — Dr. Rodrigo · 15h", delay: 0.4 },
  { pos: "top-1/2 -left-6 md:-left-14",   border: "border-cyan-300/40",    label: "TEMPO RESPOSTA",  value: "⚡ 3 segundos",                    delay: 0.7 },
  { pos: "bottom-16 -right-4 md:-right-12", border: "border-purple-400/40",  label: "AGENDA HOJE",     value: "📅 +14 consultas",                 delay: 1.0 },
  { pos: "-bottom-2 left-2 md:-left-10",   border: "border-cyan-400/40",    label: "STATUS",          value: "🤖 Online · 24/7",                 delay: 1.3 },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <motion.div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{ background: "rgba(124,58,237,0.12)", filter: "blur(90px)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[450px] h-[450px] rounded-full"
          style={{ background: "rgba(6,182,212,0.08)", filter: "blur(90px)" }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-7"
              style={{
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.3)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-300" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-purple-300">
                ✦ IA conversacional para clínicas — feita por médicos, com a Sapient.ia
              </span>
            </div>

            <h1 className="font-display font-bold leading-[1.05] tracking-tight text-balance text-[42px] sm:text-[56px] lg:text-[68px] text-white">
              Sua clínica perde<br />
              <em>R$23.000/mês</em><br />
              em silêncio.
            </h1>

            <p className="font-sans text-xs uppercase tracking-[0.08em] text-[var(--text-dim)] mt-4 mb-6">
              Um produto Sapient.IA
            </p>

            <p className="font-sans text-base text-[var(--text-muted)] leading-[1.7] max-w-[460px] mb-10">
              A Secretária Invisível atende, qualifica e agenda pelo WhatsApp em menos de 10 segundos
              — às 14h ou às 3h da manhã. Você só vê a agenda lotando.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton href={CTA_HREF} variant="primary">
                Quero parar de perder pacientes
              </MagneticButton>
              <MagneticButton href="#solucoes" variant="ghost">
                Ver uma conversa real →
              </MagneticButton>
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-dim)] mt-8">
              Implementação em 5 dias · Compatível com LGPD · Suporte incluído
            </p>
          </motion.div>

          {/* Right - WhatsApp mockup with floating cards */}
          <div className="relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="relative w-[300px] sm:w-[340px]"
            >
              <div className="card-base rounded-3xl p-1">
                <div className="bg-[var(--navy-1)] rounded-3xl overflow-hidden">
                  {/* Phone header */}
                  <div className="gradient-brand px-4 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white">
                      IA
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Secretária Invisível</p>
                      <p className="text-xs text-white/80 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                        Online agora
                      </p>
                    </div>
                  </div>
                  {/* Chat */}
                  <div className="p-4 space-y-3 min-h-[300px] bg-[var(--navy-0)]/60">
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.5, duration: 0.45 }}
                        className={`flex ${m.side === "right" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`text-sm px-4 py-2.5 max-w-[220px] ${
                            m.side === "right"
                              ? "rounded-2xl rounded-tr-md text-white"
                              : "rounded-2xl rounded-tl-md text-white border border-white/10 bg-white/5"
                          }`}
                          style={m.side === "right" ? { background: "#1f6f4a" } : undefined}
                        >
                          {m.text}
                        </div>
                      </motion.div>
                    ))}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3 }}
                      className="text-center font-mono text-[10px] text-cyan-300/60 pt-2"
                    >
                      23:47 · Respondido em 3 segundos
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Floating notification cards */}
              {floatCards.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: [0, -6, 0] }}
                  transition={{
                    opacity: { duration: 0.6, delay: c.delay },
                    y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: c.delay },
                  }}
                  className={`absolute ${c.pos} bg-[var(--navy-2)] border ${c.border} rounded-xl px-3 py-2 shadow-2xl hidden md:block`}
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                    {c.label}
                  </p>
                  <p className="font-sans text-xs font-bold text-white whitespace-nowrap mt-0.5">
                    {c.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Counter badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/50">
            Respondido em 3 segundos. Sua secretária levaria 47 minutos.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

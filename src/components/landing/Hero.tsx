import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { gsap, EASE } from "@/lib/animations";

const CTA_HREF = "#formulario";

const messages = [
  { side: "right", text: "Olá, gostaria de agendar uma consulta com o Dr. Silva" },
  { side: "left",  text: "Olá! 😊 Claro! O Dr. Silva tem horários amanhã às 14h ou 16h. Qual prefere?" },
  { side: "right", text: "Às 14h, por favor!" },
  { side: "left",  text: "Perfeito! ✅ Consulta agendada para amanhã às 14h. Enviarei um lembrete 1h antes!" },
];

const floatCards = [
  { pos: "top-2 -right-4 md:-right-10",     border: "border-emerald-400/40", label: "AGENDAMENTO",    value: "✅ Confirmado — Dr. Rodrigo · 15h", delay: 0.4, drift: 4 },
  { pos: "top-1/2 -left-6 md:-left-14",     border: "border-cyan-300/40",    label: "TEMPO RESPOSTA", value: "⚡ 3 segundos",                     delay: 0.7, drift: 5 },
  { pos: "bottom-16 -right-4 md:-right-12", border: "border-purple-400/40",  label: "AGENDA HOJE",    value: "📅 +14 consultas",                  delay: 1.0, drift: 6 },
  { pos: "-bottom-2 left-2 md:-left-10",    border: "border-cyan-400/40",    label: "STATUS",         value: "🤖 Online · 24/7",                  delay: 1.3, drift: 7 },
];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = ref.current!;

    // Left side reveal — tensão antes da headline
    gsap.from(root.querySelector("[data-hero-left]"), {
      y: 60, opacity: 0, filter: "blur(8px)", duration: 1.0, ease: EASE, delay: 0.7,
    });

    // Phone mockup
    gsap.from(root.querySelector("[data-phone]"), {
      scale: 0.92, opacity: 0, duration: 0.9, ease: EASE, delay: 0.9,
    });

    // Chat messages stagger
    gsap.from(root.querySelectorAll("[data-msg]"), {
      y: 10, opacity: 0, duration: 0.6, ease: EASE, stagger: 0.2, delay: 1.4,
    });

    // Floating cards
    floatCards.forEach((c, i) => {
      const el = root.querySelector<HTMLElement>(`[data-float="${i}"]`);
      if (!el) return;
      gsap.from(el, { opacity: 0, y: 10, duration: 0.7, ease: EASE, delay: c.delay + 1.0 });
      gsap.to(el, {
        y: -c.drift,
        duration: 4 + i,
        ease: "power3.inOut",
        yoyo: true,
        repeat: -1,
        delay: c.delay + 1.0,
      });
    });

    // Background blobs (desktop)
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.to(root.querySelector("[data-blob-1]"), {
        x: 30, y: -20, duration: 7, ease: "power3.inOut", yoyo: true, repeat: -1,
      });
      gsap.to(root.querySelector("[data-blob-2]"), {
        x: -20, y: 30, duration: 6, ease: "power3.inOut", yoyo: true, repeat: -1,
      });
    });

    // Footer line
    gsap.from(root.querySelector("[data-footnote]"), {
      opacity: 0, duration: 0.7, ease: EASE, delay: 3.2,
    });

    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-20 pb-10 md:pt-28 md:pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div
          data-blob-1
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{ background: "rgba(124,58,237,0.12)", filter: "blur(90px)" }}
        />
        <div
          data-blob-2
          className="absolute -bottom-40 -left-40 w-[450px] h-[450px] rounded-full"
          style={{ background: "rgba(6,182,212,0.08)", filter: "blur(90px)" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div data-hero-left className="max-w-2xl">
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
                <span className="md:hidden">IA 24/7 para clínicas</span>
                <span className="hidden md:inline">✦ IA conversacional para clínicas — feita por médicos, com a Sapient.ia</span>
              </span>
            </div>

            <h1 className="font-display font-bold leading-[1.05] tracking-tight text-balance text-[42px] sm:text-[56px] lg:text-[68px] text-white">
              Sua clínica perde<br />
              <em>R$23.000/mês</em><br />
              em silêncio.
            </h1>

            <a
              href="#calculadora"
              className="hidden md:block font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-dim)] hover:text-cyan-300 transition-colors mt-4 max-w-[460px]"
            >
              Estimativa baseada em atendimentos semanais, ticket médio e taxa conservadora de perda por demora no atendimento. Calcule a sua ↓
            </a>

            <p className="hidden md:block font-sans text-xs uppercase tracking-[0.08em] text-[var(--text-dim)] mt-4 mb-6">
              Um produto Sapient.IA
            </p>

            <p className="font-sans text-[15px] md:text-base text-[var(--text-muted)] leading-[1.6] md:leading-[1.7] max-w-[460px] mt-4 md:mt-0 mb-6 md:mb-10">
              <span className="md:hidden">Pacientes sem resposta fora do horário escolhem outra clínica. A Secretária Invisível responde, qualifica e agenda pelo WhatsApp.</span>
              <span className="hidden md:inline">Pacientes sem resposta fora do horário escolhem outra clínica. A Secretária Invisível responde, qualifica e agenda pelo WhatsApp, mesmo quando sua equipe não está disponível.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <MagneticButton href={CTA_HREF} variant="primary" className="whitespace-nowrap">
                Quero recuperar pacientes
              </MagneticButton>
              <MagneticButton href="#solucoes" variant="ghost" className="hidden md:inline-flex whitespace-nowrap">
                Ver conversa real →
              </MagneticButton>
            </div>

            <a
              href="#solucoes"
              className="md:hidden inline-block mt-4 font-sans text-sm text-cyan-300/80 underline-offset-4 hover:underline"
            >
              Ver conversa real →
            </a>

            <p className="hidden md:block font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-dim)] mt-8">
              Implementação em poucos dias · Sem trocar seu WhatsApp · Sem app novo para o paciente
            </p>
          </div>

          {/* Right - WhatsApp mockup */}
          <div className="relative flex justify-center">
            <div data-phone className="relative w-[300px] sm:w-[340px]">
              <div className="card-base rounded-3xl p-1">
                <div className="bg-[var(--navy-1)] rounded-3xl overflow-hidden">
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
                  <div className="p-4 space-y-3 min-h-[300px] bg-[var(--navy-0)]/60">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        data-msg
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
                      </div>
                    ))}
                    <p
                      data-footnote
                      className="text-center font-mono text-[10px] text-cyan-300/60 pt-2"
                    >
                      23:47 · Respondido em 3 segundos
                    </p>
                  </div>
                </div>
              </div>

              {floatCards.map((c, i) => (
                <div
                  key={i}
                  data-float={i}
                  className={`absolute ${c.pos} bg-[var(--navy-2)] border ${c.border} rounded-xl px-3 py-2 shadow-2xl hidden md:block`}
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                    {c.label}
                  </p>
                  <p className="font-sans text-xs font-bold text-white whitespace-nowrap mt-0.5">
                    {c.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:block mt-12 text-center" data-footnote>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/50">
            Respondido em 3 segundos. Sua secretária levaria 47 minutos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

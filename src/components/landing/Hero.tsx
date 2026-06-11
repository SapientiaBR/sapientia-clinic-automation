import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { gsap, EASE_PREMIUM, parallaxY, prefersReducedMotion } from "@/lib/animations";


const CTA_HREF = "#formulario";

const messages = [
  { side: "right", text: "Olá, gostaria de agendar uma consulta com o Dr. Silva" },
  { side: "left",  text: "Olá! 😊 Claro! O Dr. Silva tem horários amanhã às 14h ou 16h. Qual prefere?" },
  { side: "right", text: "Às 14h, por favor!" },
  { side: "left",  text: "Perfeito! ✅ Consulta agendada para amanhã às 14h. Enviarei um lembrete 1h antes!" },
];

const floatCards = [
  { pos: "top-2 -right-4 md:-right-10",     dot: "#0FB5A3", label: "AGENDAMENTO",    value: "Confirmado · Dr. Rodrigo 15h", delay: 0.4, drift: 4, parallax: -28 },
  { pos: "top-1/2 -left-6 md:-left-14",     dot: "#0FB5A3", label: "RESPOSTA",       value: "⚡ 3 segundos",                 delay: 0.7, drift: 5, parallax: -16 },
  { pos: "bottom-16 -right-4 md:-right-12", dot: "#1F2937", label: "AGENDA HOJE",    value: "+14 consultas",                 delay: 1.0, drift: 6, parallax: -22 },
  { pos: "-bottom-2 left-2 md:-left-10",    dot: "#45D89B", label: "STATUS",         value: "Online · 24/7",                 delay: 1.3, drift: 7, parallax: -12 },
];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = ref.current!;
    const reduce = prefersReducedMotion();

    if (!reduce) {
      gsap.from(root.querySelector("[data-hero-left]"), {
        y: 24, opacity: 0, filter: "blur(6px)", duration: 0.9, ease: EASE_PREMIUM, delay: 0.4,
      });

      gsap.from(root.querySelector("[data-phone]"), {
        y: 20, opacity: 0, filter: "blur(6px)", duration: 0.9, ease: EASE_PREMIUM, delay: 0.6,
      });

      gsap.from(root.querySelectorAll("[data-msg]"), {
        y: 8, opacity: 0, duration: 0.6, ease: EASE_PREMIUM, stagger: 0.18, delay: 1.1,
      });

      floatCards.forEach((c, i) => {
        const el = root.querySelector<HTMLElement>(`[data-float="${i}"]`);
        if (!el) return;
        gsap.from(el, { opacity: 0, y: 10, duration: 0.7, ease: EASE_PREMIUM, delay: c.delay + 0.9 });
        gsap.to(el, {
          y: -c.drift, duration: 4 + i, ease: "sine.inOut", yoyo: true, repeat: -1, delay: c.delay + 0.9,
        });
      });
    }

    // Parallax — desktop only, subtle
    const cleanups: Array<() => void> = [];
    cleanups.push(parallaxY(root.querySelector("[data-blob-beige]"), { y: -40, scrub: 0.8, trigger: root }));
    cleanups.push(parallaxY(root.querySelector("[data-phone]"), { y: -16, scrub: 0.6, trigger: root }));
    floatCards.forEach((c, i) => {
      cleanups.push(parallaxY(root.querySelector(`[data-float="${i}"]`), { y: c.parallax, scrub: 0.8, trigger: root }));
    });

    const mm = gsap.matchMedia();
    if (!reduce) {
      mm.add("(min-width: 1024px)", () => {
        gsap.to(root.querySelector("[data-blob-beige]"), {
          x: 18, y: -12, rotate: 2, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1,
        });
      });
    }

    return () => {
      mm.revert();
      cleanups.forEach((c) => c());
    };
  }, { scope: ref });


  return (
    <section ref={ref} className="relative flex items-center pt-16 pb-12 md:pt-24 md:pb-20 overflow-hidden">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 grid-overlay opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left */}
          <div data-hero-left className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
              style={{
                background: "#D6F3EE",
                border: "1px solid #A7E6DD",
                boxShadow: "0 4px 14px rgba(138,124,246,0.10)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#0FB5A3] opacity-50 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0A8C7E]" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#0A8C7E]">
                <span className="md:hidden">IA 24/7 para clínicas</span>
                <span className="hidden md:inline">✦ IA conversacional para clínicas, feita por médicos</span>
              </span>
            </div>

            <h1 className="headline-hero text-balance text-[44px] sm:text-[58px] lg:text-[72px] text-[#1F2937]">
              Sua clínica perde{" "}
              <em className="gradient-hero-value">R$23.000/mês</em>{" "}
              em silêncio.
            </h1>

            <p className="font-sans text-[15px] md:text-base text-[var(--text-muted)] leading-[1.6] md:leading-[1.7] max-w-[480px] mt-5 md:mt-0 mb-7 md:mb-10">
              <span className="md:hidden">Pacientes sem resposta fora do horário escolhem outra clínica. A Secretária Invisível responde, qualifica e agenda pelo WhatsApp.</span>
              <span className="hidden md:inline">Pacientes sem resposta fora do horário escolhem outra clínica. A Secretária Invisível responde, qualifica e agenda pelo WhatsApp, mesmo quando sua equipe não está disponível.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <MagneticButton href={CTA_HREF} variant="primary" className="whitespace-nowrap">
                Testar a IA agora
              </MagneticButton>
              <a
                href="https://wa.me/5511920795583"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0A8C7E] bg-white border-2 border-[#0FB5A3] hover:bg-[#D6F3EE] transition-colors"
              >
                Falar com especialista
              </a>
            </div>

            <p className="hidden md:block font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] mt-8">
              Implementação em poucos dias · Sem trocar seu WhatsApp · Sem app novo para o paciente
            </p>
          </div>

          {/* Right - Mockup with organic beige blob */}
          <div className="relative flex justify-center items-center min-h-[520px] md:min-h-[600px]">
            {/* Organic beige blob */}
            <div
              data-blob-beige
              className="absolute blob-beige pointer-events-none"
              style={{
                width: "min(520px, 110%)",
                height: "min(520px, 110%)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                filter: "drop-shadow(0 30px 60px rgba(15,181,163,0.18))",
              }}
            />

            <div data-phone className="relative w-[290px] sm:w-[340px]">
              <div
                className="rounded-3xl p-1 bg-white"
                style={{
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 28px 70px rgba(15,23,42,0.18)",
                }}
              >
                <div className="bg-white rounded-3xl overflow-hidden">
                  <div
                    className="px-4 py-3 flex items-center gap-3"
                    style={{ background: "linear-gradient(135deg, #0FB5A3, #0A8C7E)" }}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center text-sm font-bold text-white">
                      IA
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Secretária Invisível</p>
                      <p className="text-xs text-white/90 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5EE6A8]" />
                        Online agora
                      </p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3 min-h-[300px] bg-[#F9FAFB]">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        data-msg
                        className={`flex ${m.side === "right" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`text-sm px-4 py-2.5 max-w-[220px] ${
                            m.side === "right" ? "rounded-2xl rounded-tr-md" : "rounded-2xl rounded-tl-md border"
                          }`}
                          style={
                            m.side === "right"
                              ? { background: "#E7F8EF", color: "#0F3D2E" }
                              : { background: "#F9FAFB", color: "#1F2937", borderColor: "#E5E7EB" }
                          }
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                    <p className="text-center font-mono text-[10px] text-[#0A8C7E]/70 pt-2">
                      23:47 · Respondido em 3 segundos
                    </p>
                  </div>
                </div>
              </div>

              {floatCards.map((c, i) => (
                <div
                  key={i}
                  data-float={i}
                  className={`absolute ${c.pos} bg-white rounded-2xl px-3.5 py-2.5 hidden md:block`}
                  style={{
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 14px 30px rgba(15,23,42,0.12)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                      {c.label}
                    </p>
                  </div>
                  <p className="font-sans text-xs font-semibold text-[var(--text)] whitespace-nowrap">
                    {c.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:block mt-12 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0A8C7E]/80">
            Respondido em 3 segundos. Sua secretária levaria 47 minutos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

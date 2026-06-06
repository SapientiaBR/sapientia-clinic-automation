import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Play } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { revealOnScroll } from "@/lib/animations";

/**
 * TODO: trocar VIDEO_URL pelo link do Loom/YouTube real (embed) quando estiver pronto.
 * Para Loom: https://www.loom.com/embed/<ID>
 * Para YouTube: https://www.youtube.com/embed/<ID>?autoplay=1&mute=1&loop=1
 */
const VIDEO_URL = ""; // placeholder

const VideoDemo = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="video-demo" className="py-14 md:section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        <div className="text-center mb-8 md:mb-10 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// vídeo de 60 segundos</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            A IA atendendo <em>em tempo real.</em>
          </h2>
          <p className="font-sans text-sm md:text-base text-[var(--text-muted)] mt-3 md:mt-5 leading-relaxed">
            Tela compartilhada, conversa de verdade, do "oi" até o agendamento.
          </p>
        </div>

        <div
          data-reveal
          className="aspect-video rounded-3xl overflow-hidden relative"
          style={{
            background: "#1D1D24",
            border: "1px solid #EEE7DE",
            boxShadow: "0 24px 60px rgba(70,55,35,0.18)",
          }}
        >
          {VIDEO_URL ? (
            <iframe
              src={VIDEO_URL}
              title="IA atendendo no WhatsApp em tempo real"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <a
              href="#formulario"
              className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(138,124,246,0.85), rgba(34,191,234,0.75))",
              }}
            >
              <span
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ background: "rgba(255,255,255,0.18)" }}
              >
                <Play size={32} fill="white" />
              </span>
              <p className="font-display text-xl md:text-2xl font-semibold max-w-md">
                Vídeo chegando em breve. Enquanto isso, teste a IA ao vivo no WhatsApp.
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] mt-3 opacity-80">
                Toque para ir ao formulário
              </p>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;

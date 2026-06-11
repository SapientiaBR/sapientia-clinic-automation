import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Eyebrow from "@/components/ui/Eyebrow";
import { revealOnScroll } from "@/lib/animations";
import videoAsset from "@/assets/secretaria-invisivel-aovivo.mp4.asset.json";

const VideoDemo = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="video-demo" className="py-14 md:section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        <div className="text-center mb-8 md:mb-10 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// vídeo de demonstração ao vivo</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            A IA atendendo <em>em tempo real.</em>
          </h2>
          <p className="font-sans text-sm md:text-base text-[var(--text-muted)] mt-3 md:mt-5 leading-relaxed">
            Tela compartilhada, conversa de verdade, do "oi" até o agendamento.
          </p>
        </div>

        <div
          data-reveal
          className="mx-auto rounded-3xl overflow-hidden relative w-full max-w-[360px] aspect-[9/16]"
          style={{
            background: "#1F2937",
            border: "1px solid #E5E7EB",
            boxShadow: "0 24px 60px rgba(70,55,35,0.18)",
          }}
        >
          <video
            src={videoAsset.url}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;

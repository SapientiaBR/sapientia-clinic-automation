import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Eyebrow from "@/components/ui/Eyebrow";
import { revealOnScroll } from "@/lib/animations";
import videoAsset from "@/assets/secretaria-invisivel-aovivo.mp4.asset.json";

const VideoDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
          className="mx-auto rounded-[36px] overflow-hidden relative w-full max-w-[320px] md:max-w-[360px] aspect-[9/16] cursor-pointer group transition-all duration-500 border-8 border-white bg-white shadow-[0_18px_44px_rgba(15,23,42,0.08)] ring-1 ring-black/5"
          onClick={() => {
            if (!isPlaying) setIsPlaying(true);
          }}
        >
          {/* Smartphone Notch / Speaker simulator (aesthetic only) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#E5E7EB] rounded-full z-20 opacity-60 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-1 bg-gray-400 rounded-full" />
          </div>

          {!isPlaying ? (
            <div className="relative w-full h-full select-none">
              {/* Cover/Poster Image */}
              <img
                src="/video-poster.png"
                alt="Demonstração ao vivo da Secretária Invisível"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* VSL dark overlay mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50" />

              {/* Play Button and Actions */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 px-4">
                <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-[#0FB5A3] to-[#0A8C7E] shadow-[0_0_30px_rgba(15,181,163,0.5)] transition-transform duration-300 group-hover:scale-110 active:scale-95 touch-manipulation">
                  {/* Pulsing ripple effect */}
                  <span className="absolute inset-0 rounded-full bg-[#0FB5A3]/40 animate-ping" />

                  {/* Play Icon */}
                  <svg
                    className="w-8 h-8 text-white fill-current translate-x-0.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                <span className="font-display text-[13px] md:text-[14px] font-bold text-white tracking-[0.06em] px-5 py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 uppercase shadow-sm">
                  Assistir Demonstração
                </span>
                
                <span className="font-sans text-[11px] text-gray-300 font-medium tracking-wide">
                  (Vídeo: 1m e 30s)
                </span>
              </div>
            </div>
          ) : (
            <video
              src={videoAsset.url}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;


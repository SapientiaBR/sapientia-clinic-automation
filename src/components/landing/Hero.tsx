import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { gsap, EASE_PREMIUM, prefersReducedMotion } from "@/lib/animations";
import heroDesktop from "@/assets/hero-doctor-desktop.webp.asset.json";
import heroMobile from "@/assets/hero-doctor-mobile.webp.asset.json";

const WA_URL = "https://wa.me/5511920795583?text=Oi%21%20Quero%20conhecer%20a%20Secret%C3%A1ria%20Invis%C3%ADvel";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = ref.current!;
    if (prefersReducedMotion()) return;

    gsap.from(root.querySelector("[data-hero-left]"), {
      y: 24, opacity: 0, filter: "blur(6px)", duration: 0.9, ease: EASE_PREMIUM, delay: 0.3,
    });
    gsap.from(root.querySelector("[data-hero-bg]"), {
      opacity: 0, duration: 1.4, ease: EASE_PREMIUM,
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className="relative flex items-center min-h-[88vh] pt-28 pb-6 md:pt-36 md:pb-12 overflow-hidden"
      style={{
        background: "linear-gradient(120deg, #ECFBF7 0%, #FFFFFF 55%, #D6F3EE 100%)",
      }}
    >
      {/* Doctor photo as actual <img> — discoverable for LCP, responsive */}
      <img
        data-hero-bg
        src={heroDesktop.url}
        srcSet={`${heroMobile.url} 600w, ${heroDesktop.url} 1200w`}
        sizes="(max-width: 767px) 60vw, 100vw"
        width={1200}
        height={619}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none md:opacity-[0.70] opacity-[0.18]"
        style={{
          objectPosition: "right center",
        }}
      />
      {/* Mobile-only: fade mask so headline keeps contrast over the corner photo */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          background:
            "linear-gradient(135deg, #ECFBF7 0%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0) 75%)",
        }}
      />
      {/* Left fade mask so headline keeps full contrast (desktop) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, #ECFBF7 0%, rgba(236,251,247,0.92) 30%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0) 80%)",
        }}
      />
      {/* Subtle grid texture */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div data-hero-left className="max-w-4xl">
          <h1 className="headline-hero text-balance text-[38px] sm:text-[52px] md:text-[62px] lg:text-[72px] text-[#0F1F2C]">
            Sua clínica responde pacientes em segundos,{" "}
            <span className="text-[#0FB5A3]">24 horas por dia</span>.
          </h1>

          <p className="font-sans text-[16px] md:text-[18px] text-[#374151] leading-[1.65] max-w-[520px] mt-6 md:mt-7 mb-8 md:mb-10">
            A Secretária Invisível usa Inteligência Artificial para atender, qualificar e agendar consultas automaticamente pelo WhatsApp.
          </p>

          <MagneticButton href={WA_URL} target="_blank" rel="noopener noreferrer" variant="primary" className="whitespace-nowrap">
            Testar a IA agora
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;

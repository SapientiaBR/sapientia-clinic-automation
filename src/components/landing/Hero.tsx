import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { gsap, EASE_PREMIUM, prefersReducedMotion } from "@/lib/animations";
import heroDesktop from "@/assets/hero-doctor-desktop.webp.asset.json";
import heroMobile from "@/assets/hero-doctor-mobile.webp.asset.json";

const CTA_HREF = "#formulario";

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
      className="relative flex items-center min-h-[88vh] pt-16 pb-12 md:pt-20 md:pb-16 overflow-hidden"
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
        <div data-hero-left className="max-w-2xl">
          <h1 className="headline-hero text-balance text-[44px] sm:text-[58px] lg:text-[76px] text-[#0F1F2C]">
            Sua clínica responde pacientes em segundos,{" "}
            <span className="text-[#0FB5A3]">24 horas por dia</span>.
          </h1>

          <p className="font-sans text-[16px] md:text-[18px] text-[#374151] leading-[1.65] max-w-[520px] mt-6 md:mt-7 mb-8 md:mb-10">
            A Secretária Invisível usa Inteligência Artificial para atender, qualificar e agendar consultas automaticamente pelo WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <MagneticButton href={CTA_HREF} variant="primary" className="whitespace-nowrap">
              Testar a IA agora
            </MagneticButton>
            <a
              href="https://wa.me/5511920795583"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.06em] text-[#055449] bg-white border-2 border-[#0FB5A3] hover:bg-[#D6F3EE] transition-colors"
            >
              Falar com especialista
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

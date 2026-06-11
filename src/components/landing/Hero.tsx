import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { gsap, EASE_PREMIUM, prefersReducedMotion } from "@/lib/animations";
import heroBgAsset from "@/assets/hero-bg-doctor.png.asset.json";

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
      className="relative flex items-center min-h-[88vh] pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden"
      style={{
        background: "linear-gradient(120deg, #ECFBF7 0%, #FFFFFF 55%, #D6F3EE 100%)",
      }}
    >
      {/* Doctor photo as semi-transparent background — desktop only */}
      <div
        data-hero-bg
        aria-hidden
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage: `url(${heroBgAsset.url})`,
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          opacity: 0.55,
        }}
      />
      {/* Mobile: faint accent in bottom-right corner only */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          backgroundImage: `url(${heroBgAsset.url})`,
          backgroundSize: "auto 60%",
          backgroundPosition: "right -40px bottom -20px",
          backgroundRepeat: "no-repeat",
          opacity: 0.18,
          maskImage:
            "linear-gradient(135deg, transparent 30%, #000 80%)",
          WebkitMaskImage:
            "linear-gradient(135deg, transparent 30%, #000 80%)",
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
            Sua clínica perde{" "}
            <span className="text-[#0A8C7E]">R$23.000/mês</span>{" "}
            em silêncio.
          </h1>

          <p className="font-sans text-[16px] md:text-[18px] text-[#374151] leading-[1.65] max-w-[520px] mt-6 md:mt-7 mb-8 md:mb-10">
            <span className="md:hidden">Pacientes sem resposta fora do horário escolhem outra clínica. A Secretária Invisível responde, qualifica e agenda pelo WhatsApp.</span>
            <span className="hidden md:inline">Pacientes sem resposta fora do horário escolhem outra clínica. A Secretária Invisível responde, qualifica e agenda pelo WhatsApp — mesmo quando sua equipe não está disponível.</span>
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
        </div>
      </div>
    </section>
  );
};

export default Hero;

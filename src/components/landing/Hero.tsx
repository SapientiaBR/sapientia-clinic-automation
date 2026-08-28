import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { gsap, EASE_PREMIUM, prefersReducedMotion } from "@/lib/animations";
import heroReception from "@/assets/hero-reception.jpg";

export const CTA_HREF = "#diagnostico";
export const CTA_LABEL = "Ver como funcionaria na minha clínica";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = ref.current!;
    if (prefersReducedMotion()) return;

    gsap.from(root.querySelector("[data-hero-left]"), {
      y: 24, opacity: 0, filter: "blur(6px)", duration: 0.9, ease: EASE_PREMIUM, delay: 0.2,
    });
    gsap.from(root.querySelector("[data-hero-photo]"), {
      opacity: 0, duration: 1.2, ease: EASE_PREMIUM, delay: 0.1,
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className="relative pt-28 pb-10 md:pt-36 md:pb-16 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #F7FBFA 60%, #ECFBF7 100%)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-14 items-center">
          <div data-hero-left>
            <h1 className="headline-hero text-balance text-[34px] sm:text-[46px] lg:text-[58px] text-[#1F2937] leading-[1.08]">
              Sua recepcionista atende quem está na clínica.
            </h1>

            <p className="font-display text-[20px] sm:text-[26px] lg:text-[30px] font-semibold text-[#0A8C7E] leading-[1.3] mt-4 text-balance">
              A Secretária Invisível atende quem está no WhatsApp.
            </p>

            <p className="font-sans text-[17px] md:text-[19px] text-[#4B5563] leading-[1.65] max-w-[560px] mt-5">
              Responde, agenda, confirma e organiza o atendimento enquanto sua equipe
              continua cuidando dos pacientes.
            </p>

            <p className="font-display text-[17px] md:text-[19px] font-bold text-[#1F2937] mt-4 mb-8">
              Sem substituir sua recepcionista.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <MagneticButton href={CTA_HREF} variant="primary" className="whitespace-nowrap">
                {CTA_LABEL}
              </MagneticButton>
              <a
                href="#como-funciona"
                className="font-sans text-[17px] text-[#055449] underline underline-offset-4 hover:text-[#0A8C7E] transition-colors"
              >
                Ver como funciona
              </a>
            </div>
          </div>

          <div data-hero-photo className="relative">
            <img
              src={heroReception}
              width={1280}
              height={960}
              fetchPriority="high"
              decoding="async"
              alt="Recepcionista atendendo uma paciente no balcão de uma clínica"
              className="w-full h-[240px] sm:h-[320px] lg:h-[440px] object-cover rounded-3xl"
              style={{ border: "1px solid #E5E7EB", boxShadow: "0 24px 60px rgba(15,23,42,0.10)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

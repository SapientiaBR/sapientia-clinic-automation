import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { gsap, EASE_PREMIUM, prefersReducedMotion } from "@/lib/animations";
import heroReception from "@/assets/hero-reception.jpg";
import { Baloes, conversas } from "@/components/landing/conversations";

export const CTA_HREF = "#demo";
export const CTA_LABEL = "Quero ver a demonstração no meu WhatsApp";

const copy = {
  clinica: {
    titulo: "Sua recepcionista atende quem está no balcão.",
    reforco: "A Secretária Invisível cuida do resto.",
    texto:
      "Responde, agenda, confirma, lembra e remarca seus pacientes 24h, e guarda todo o histórico.",
    fecho: "Sem substituir ninguém.",
  },
  medico: {
    titulo: "Você atende o paciente.",
    reforco: "A Secretária Invisível cuida do resto.",
    texto:
      "Responde, agenda e confirma seus pacientes 24h, tira as dúvidas do dia a dia e guarda todo o histórico.",
    fecho: "Chega de WhatsApp às 23h.",
  },
};

/** Mockup de celular com a conversa de agendamento — o lado direito do solo. */
const MockupCelular = () => (
  <div className="mx-auto w-full max-w-[19rem]">
    <div
      className="overflow-hidden rounded-[2rem] p-3"
      style={{
        background: "#FFFFFF",
        border: "1px solid #D6F3EE",
        boxShadow: "0 28px 64px rgba(10, 140, 126,0.16)",
      }}
    >
      <div className="mb-3 flex items-center gap-2.5 px-1">
        <span className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-[12px] font-bold text-white">
          SI
        </span>
        <span className="leading-tight">
          <span className="block font-display text-[14px] font-semibold text-[#1F2937]">
            Secretária Invisível
          </span>
          <span className="font-sans flex items-center gap-1.5 text-[11px] text-[#4B5563]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0FB5A3]" />
            online
          </span>
        </span>
      </div>
      <div
        className="space-y-2 rounded-2xl p-3"
        style={{ background: "#F1FBF8", border: "1px solid #ECFBF7" }}
      >
        <Baloes messages={conversas[0].messages} />
      </div>
    </div>
  </div>
);

type Props = {
  variante?: "clinica" | "medico";
};

/**
 * Hero.
 *
 * `data-hero` é o que a barra fixa de CTA observa para saber quando aparecer —
 * ela só entra depois que este bloco sai de vista.
 *
 * No celular a imagem fica depois do botão: o CTA precisa caber na primeira
 * tela, e uma foto de 240px acima dele empurra tudo para baixo da dobra.
 */
const Hero = ({ variante = "clinica" }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const t = copy[variante];
  const ehMedico = variante === "medico";

  useGSAP(
    () => {
      const root = ref.current!;
      if (prefersReducedMotion()) return;

      gsap.from(root.querySelector("[data-hero-left]"), {
        y: 24,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.9,
        ease: EASE_PREMIUM,
        delay: 0.2,
      });
      gsap.from(root.querySelector("[data-hero-photo]"), {
        opacity: 0,
        duration: 1.2,
        ease: EASE_PREMIUM,
        delay: 0.1,
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      data-hero
      className="relative overflow-hidden pb-10 pt-32 md:pb-16 md:pt-40"
      style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #F7FBFA 60%, #ECFBF7 100%)" }}
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div data-hero-left>
            <h1 className="headline-hero text-balance text-[32px] leading-[1.08] text-[#1F2937] sm:text-[44px] lg:text-[56px]">
              {t.titulo}
            </h1>

            <p className="font-display mt-4 text-balance text-[20px] font-semibold leading-[1.3] text-[#0A8C7E] sm:text-[26px] lg:text-[30px]">
              {t.reforco}
            </p>

            <p className="font-sans mt-5 max-w-[560px] text-[17px] leading-[1.65] text-[#4B5563] md:text-[19px]">
              {t.texto}
            </p>

            <p className="font-display mb-7 mt-4 text-[17px] font-bold text-[#1F2937] md:text-[19px]">
              {t.fecho}
            </p>

            <MagneticButton href={CTA_HREF} variant="primary">
              {CTA_LABEL}
            </MagneticButton>

            <p className="font-sans mt-4 text-[15px] text-[#4B5563]">
              Ela te chama em segundos · Grátis · Sem ligação
            </p>
          </div>

          <div data-hero-photo className="relative">
            {ehMedico ? (
              <MockupCelular />
            ) : (
              <img
                src={heroReception}
                width={1280}
                height={960}
                /* Em camelCase os tipos aceitam mas o React 18 avisa no
                   console; em minusculo o DOM aceita e os tipos reclamam.
                   O spread entrega o atributo cru e encerra a discussao. */
                {...({ fetchpriority: "high" } as Record<string, string>)}
                decoding="async"
                alt="Recepcionista atendendo uma paciente no balcão de uma clínica"
                className="h-[240px] w-full rounded-3xl object-cover sm:h-[320px] lg:h-[440px]"
                style={{
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 24px 60px rgba(15, 23, 42,0.10)",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

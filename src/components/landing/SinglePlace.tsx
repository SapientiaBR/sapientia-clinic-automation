import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { revealOnScroll } from "@/lib/animations";
import { CTA_HREF } from "@/components/landing/Hero";

const items = ["Histórico", "Contexto", "Pendências", "Informações de pacientes"];

const SinglePlace = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section className="py-14 md:py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h2
          className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-bold text-[#1F2937] text-balance"
          data-reveal
        >
          E quando alguém da recepção sai?
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] text-[#4B5563] leading-[1.65] mt-5" data-reveal>
          Não é só uma pessoa que vai embora. Pode ir junto:
        </p>

        <ul className="mt-5 grid sm:grid-cols-2 gap-3" data-reveal>
          {items.map((t) => (
            <li
              key={t}
              className="rounded-2xl px-5 py-4 font-sans text-[17px] text-[#1F2937]"
              style={{ background: "#F1FBF8", border: "1px solid #D6F3EE" }}
            >
              {t}
            </li>
          ))}
        </ul>

        <p
          className="font-display text-[20px] sm:text-[26px] font-bold text-[#055449] mt-8 text-balance"
          data-reveal
        >
          O atendimento precisa continuar sendo da clínica.
        </p>
        <p className="font-sans text-[17px] md:text-[19px] text-[#4B5563] mt-2" data-reveal>
          Não da memória de uma única pessoa.
        </p>

        <div className="mt-8" data-reveal>
          <MagneticButton href={CTA_HREF} variant="primary" className="whitespace-nowrap">
            Quero organizar meu atendimento
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default SinglePlace;

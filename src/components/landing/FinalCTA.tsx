import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { revealOnScroll } from "@/lib/animations";
import { CTA_HREF, CTA_LABEL } from "@/components/landing/Hero";
import { turmaAtual } from "@/config/turma";

const copy = {
  clinica: "Sua recepção não precisa estar em dois lugares.",
  medico: "Hoje, enquanto você atende, seu WhatsApp espera.",
};

type Props = { variante?: "clinica" | "medico" };

/**
 * Fechamento.
 *
 * A linha de apoio repete o estado da turma em vez de uma frase genérica: é o
 * último ponto da página onde a escassez ainda pesa, e ela já está calculada.
 */
const FinalCTA = ({ variante = "clinica" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const t = turmaAtual();
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section className="py-14 md:py-20" ref={ref}>
      <div className="container mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          className="font-display text-balance text-[26px] font-normal tracking-[-0.04em] text-[#1F2937] sm:text-[36px] lg:text-[42px]"
          data-reveal
        >
          {copy[variante]}
        </h2>

        <p
          className="font-sans mt-5 text-[17px] leading-[1.65] text-[#4B5563] md:text-[19px]"
          data-reveal
        >
          {t.lotada
            ? `A turma de ${t.mes} está lotada. Entre na lista da turma de ${t.proximoMes} com implantação grátis.`
            : `A turma de ${t.mes} tem ${t.restantes} ${
                t.restantes === 1 ? "vaga" : "vagas"
              } com implantação grátis.`}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3" data-reveal>
          <MagneticButton href={CTA_HREF} variant="primary">
            {CTA_LABEL}
          </MagneticButton>
          <span className="font-sans text-[15px] text-[#4B5563]">Sem compromisso.</span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

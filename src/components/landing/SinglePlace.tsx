import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { revealOnScroll } from "@/lib/animations";
import { CTA_HREF } from "@/components/landing/Hero";

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
          Se sua recepcionista sair amanhã, quanto da sua clínica sai com ela?
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] text-[#4B5563] leading-[1.65] mt-5" data-reveal>
          Contato do paciente, histórico da conversa, motivo do reagendamento, quem faltou,
          quem nunca voltou. Hoje quase tudo isso mora no WhatsApp pessoal de alguém.
          A Secretária Invisível centraliza atendimento, agenda e histórico em um único painel.
          Sua equipe ganha ferramenta. Você ganha continuidade.
        </p>
        <div className="mt-8" data-reveal>
          <MagneticButton href={CTA_HREF} variant="primary" className="whitespace-nowrap">
            Quero organizar isso
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default SinglePlace;

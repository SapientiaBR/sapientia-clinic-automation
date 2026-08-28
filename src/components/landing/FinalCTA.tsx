import MagneticButton from "@/components/ui/MagneticButton";
import { CTA_HREF, CTA_LABEL } from "@/components/landing/Hero";

const FinalCTA = () => {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <h2 className="font-display text-[26px] sm:text-[36px] lg:text-[44px] font-bold text-[#1F2937] text-balance">
          A melhor secretária da sua clínica continua sendo a sua secretária.
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] text-[#4B5563] mt-5 mb-8 leading-[1.65]">
          Nós só tiramos das costas dela tudo aquilo que a tecnologia consegue fazer melhor.
        </p>
        <div className="flex justify-center">
          <MagneticButton href={CTA_HREF} variant="primary" className="whitespace-nowrap">
            {CTA_LABEL}
          </MagneticButton>
        </div>
        <p className="font-sans text-[15px] text-[#4B5563] mt-5 leading-[1.6]">
          30 minutos. Sem apresentação de vendas. Você sai com um diagnóstico da sua recepção,
          contrate ou não.
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;

import Eyebrow from "@/components/ui/Eyebrow";
import MagneticButton from "@/components/ui/MagneticButton";

const FinalCTA = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "rgba(124,58,237,0.12)", filter: "blur(120px)" }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl text-center">
        <Eyebrow>// comece agora</Eyebrow>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-bold text-white text-balance">
          Pronto para parar de <em>perder pacientes?</em>
        </h2>
        <p className="font-sans text-base text-[var(--text-muted)] mt-5 mb-8 leading-relaxed">
          Diagnóstico gratuito. Sem compromisso. Acompanhamento próximo nas primeiras semanas.
        </p>
        <div className="flex justify-center">
          <MagneticButton href="#formulario" variant="primary">
            Receber meu diagnóstico gratuito →
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

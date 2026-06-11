import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, Clock, RefreshCcw } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import IconChip from "@/components/ui/IconChip";
import { revealOnScroll } from "@/lib/animations";

const pillars = [
  {
    icon: Clock,
    title: "Em até 7 dias úteis",
    desc: "Conectamos WhatsApp, configuramos sua agenda e treinamos a IA com o tom da sua clínica.",
  },
  {
    icon: RefreshCcw,
    title: "Ajustes ilimitados no 1º mês",
    desc: "Refinamos fluxo, tom e regras até a IA atender do jeito que a sua clínica precisa.",
  },
];

const Guarantee = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="garantia" className="section-padding relative" ref={ref} style={{ background: "linear-gradient(135deg, #0FB5A3 0%, #0A8C7E 100%)" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        <div
          className="rounded-[28px] p-8 sm:p-12 lg:p-14 relative overflow-hidden"
          style={{
            background: "#FFFFFF",
            border: "1px solid #FFFFFF",
            boxShadow: "0 30px 70px rgba(10,140,126,0.30)",
          }}
          data-reveal
        >
          <div
            aria-hidden
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(15,181,163,0.20), transparent 70%)",
            }}
          />

          <div className="relative grid lg:grid-cols-[auto,1fr] gap-8 lg:gap-12 items-start">
            <div className="flex justify-center lg:justify-start">
              <div
                className="relative w-28 h-28 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #0FB5A3 0%, #0A8C7E 100%)",
                  boxShadow: "0 18px 40px rgba(15,181,163,0.35)",
                }}
              >
                <ShieldCheck size={48} color="#FFFFFF" strokeWidth={1.8} />
              </div>
            </div>

            <div>
              <Eyebrow>// garantia</Eyebrow>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-[var(--text)] text-balance leading-[1.1]">
                Implementação em 7 dias úteis. <em>Sem você levantar um dedo.</em>
              </h2>
              <p className="font-sans text-[15px] md:text-base text-[var(--text-muted)] mt-4 leading-relaxed max-w-2xl">
                Conectamos seu WhatsApp, configuramos a agenda e treinamos a IA com o tom da sua clínica. Ajustes ilimitados no primeiro mês até ficar do jeito certo.
              </p>
            </div>
          </div>

          <div className="relative grid sm:grid-cols-2 gap-5 mt-10 pt-8 border-t border-[#E5E7EB]">
            {pillars.map((p, i) => (
              <div key={i} className="flex flex-col gap-3">
                <IconChip icon={p.icon} size="md" />
                <h3 className="font-display-sans text-[15px] font-semibold text-[var(--text)]">
                  {p.title}
                </h3>
                <p className="font-sans text-[13px] text-[var(--text-muted)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;

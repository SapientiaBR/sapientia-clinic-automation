import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Eyebrow from "@/components/ui/Eyebrow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { revealOnScroll } from "@/lib/animations";

/**
 * TODO: substituir `photo` pelas fotos reais dos clientes (formato quadrado, 200x200+).
 * Sem foto real ainda → cai no AvatarFallback com iniciais.
 */
type Testimonial = {
  initials: string;
  photo?: string;
  name: string;
  role: string;
  clinic: string;
  city: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    initials: "MF",
    photo: undefined, // TODO: foto real
    name: "Dra. Mariana Fogarolli",
    role: "Endocrinologista",
    clinic: "Clínica Fogarolli",
    city: "São Paulo, SP",
    quote:
      "Antes eu respondia mensagem de paciente às 23h quando lembrava. Muitos desistiam enquanto esperavam. Hoje cada paciente recebe resposta na hora, e eu finalmente foco na medicina.",
  },
  {
    initials: "RB",
    photo: undefined, // TODO: foto real
    name: "Dr. Rodrigo Bertolini",
    role: "Ortopedista",
    clinic: "Instituto Bertolini",
    city: "São Paulo, SP",
    quote:
      "Minha secretária parou de apagar incêndio no WhatsApp. Faltas caíram, agenda encheu de novo. O ROI apareceu nas duas primeiras semanas.",
  },
  {
    initials: "HM",
    photo: undefined, // TODO: foto real
    name: "Dra. Helena Moura",
    role: "Dermatologista",
    clinic: "Clínica Moura Dermato",
    city: "Campinas, SP",
    quote:
      "Achei que ia parecer robótico. Os pacientes literalmente acham que é uma pessoa nova da equipe. Continuo no controle, só que sem o gargalo.",
  },
];

const SocialProof = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="depoimentos" className="py-14 md:section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// depoimentos</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            O que médicos dizem depois de <em>plugar a IA.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <article
              key={i}
              data-reveal
              className="rounded-3xl p-6 md:p-7 flex flex-col"
              style={{
                background: "#FFFFFF",
                border: "1px solid #EEE7DE",
                boxShadow: "0 18px 44px rgba(70,55,35,0.08)",
              }}
            >
              <p className="tracking-[3px] text-base mb-3" style={{ color: "#D4A76A" }}>
                ★★★★★
              </p>
              <blockquote className="font-display italic text-[16px] md:text-[17px] leading-[1.65] text-[var(--text)] flex-1">
                {t.quote}
              </blockquote>

              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-[#F1ECE4]">
                <Avatar className="h-12 w-12">
                  {t.photo && <AvatarImage src={t.photo} alt={t.name} />}
                  <AvatarFallback
                    className="text-white text-sm font-bold"
                    style={{ background: "linear-gradient(135deg, #8A7CF6, #22BFEA)" }}
                  >
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-display text-[15px] font-semibold text-[var(--text)] leading-tight truncate">
                    {t.name}
                  </p>
                  <p className="font-sans text-[12px] text-[var(--text-muted)] leading-tight">
                    {t.role}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#6F63E8] mt-1">
                    {t.clinic}, {t.city}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

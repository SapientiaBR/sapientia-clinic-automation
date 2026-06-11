import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Eyebrow from "@/components/ui/Eyebrow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { revealOnScroll } from "@/lib/animations";
import marianaPhoto from "@/assets/mariana-fogarolli.png.asset.json";

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
    photo: marianaPhoto.url,
    name: "Dra. Mariana Fogarolli",
    role: "Endocrinologista",
    clinic: "Clínica Fogarolli",
    city: "São Paulo, SP",
    quote:
      "Antes eu respondia mensagem de paciente às 23h quando lembrava. Muitos desistiam enquanto esperavam. Hoje cada paciente recebe resposta na hora, e eu finalmente foco na medicina.",
  },
];

const SocialProof = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="depoimentos" className="py-14 md:section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl">
        <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// depoimentos</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            O que médicos dizem depois de <em>plugar a IA.</em>
          </h2>
        </div>

        <div className="flex justify-center">
          {testimonials.map((t, i) => (
            <article
              key={i}
              data-reveal
              className="rounded-3xl p-6 md:p-8 flex flex-col max-w-2xl w-full"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                boxShadow: "0 18px 44px rgba(15,23,42,0.08)",
              }}
            >
              <p className="tracking-[3px] text-base mb-3" style={{ color: "#1F2937" }}>
                ★★★★★
              </p>
              <blockquote className="font-sans text-[17px] md:text-[19px] leading-[1.6] text-[var(--text)] font-medium flex-1">
                "{t.quote}"
              </blockquote>


              <div className="flex items-center gap-4 mt-6 pt-5 border-t border-[#F3F4F6]">
                <Avatar className="h-20 w-20 md:h-24 md:w-24">
                  {t.photo && <AvatarImage src={t.photo} alt={t.name} className="object-cover" />}
                  <AvatarFallback
                    className="text-white text-base font-bold"
                    style={{ background: "linear-gradient(135deg, #0FB5A3, #0FB5A3)" }}
                  >
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-display text-[16px] md:text-[17px] font-semibold text-[var(--text)] leading-tight">
                    {t.name}
                  </p>
                  <p className="font-sans text-[13px] text-[var(--text-muted)] leading-tight mt-0.5">
                    {t.role}
                  </p>
                  <p className="font-sans text-[12px] text-[#055449] mt-1">
                    {t.clinic} · {t.city}
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

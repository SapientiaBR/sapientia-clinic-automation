import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { revealOnScroll } from "@/lib/animations";
import marianaPhoto from "@/assets/mariana-fogarolli.png.asset.json";

/**
 * ATENÇÃO: não publicar com métrica inventada.
 * Enquanto os campos estiverem vazios, o bloco de métricas não renderiza.
 */
const METRICA_1 = "";
const METRICA_2 = "";
const METRICA_3 = "";
const PERIODO_DE_USO = "";

const metrics = [METRICA_1, METRICA_2, METRICA_3].filter(Boolean);

type Testimonial = {
  initials: string;
  photo?: string;
  name: string;
  role: string;
  clinic: string;
  city: string;
  quote: string;
};

/** Estrutura preparada para até três depoimentos em carrossel. */
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

type Props = { variante?: "clinica" | "medico" };

const SocialProof = ({ variante = "clinica" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="depoimentos" className="py-14 md:py-20 bg-white scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h2
          className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-normal text-[#292929] text-balance text-center mb-8 md:mb-10 tracking-[-0.04em]"
          data-reveal
        >
          {variante === "medico"
            ? "Ela respondia paciente às 23h. Não responde mais."
            : "Já está rodando."}
        </h2>

        {metrics.length > 0 && (
          <div className="mb-8 md:mb-10" data-reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {metrics.map((m) => (
                <p
                  key={m}
                  className="font-display text-[26px] font-normal text-[#00543F] text-center tracking-[-0.04em]"
                >
                  {m}
                </p>
              ))}
            </div>
            {PERIODO_DE_USO && (
              <p className="font-sans text-[15px] text-[#4B4E52] text-center mt-3">
                {PERIODO_DE_USO}
              </p>
            )}
          </div>
        )}

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory sm:overflow-visible">
          {testimonials.map((t) => (
            <article
              key={t.name}
              data-reveal
              className="rounded-3xl p-6 md:p-8 flex flex-col w-full flex-shrink-0 snap-center bg-white"
              style={{ border: "1px solid #E8EAF0", boxShadow: "0 18px 44px rgba(41, 41, 41,0.08)" }}
            >
              <blockquote className="font-sans text-[17px] md:text-[19px] leading-[1.65] text-[#292929] flex-1">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-4 mt-6 pt-5 border-t border-[#EEFCF7]">
                <Avatar className="h-14 w-14">
                  {t.photo && <AvatarImage src={t.photo} alt={t.name} className="object-cover" />}
                  <AvatarFallback className="text-white text-base font-bold" style={{ background: "#006851" }}>
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-display text-[17px] font-semibold text-[#292929] leading-tight">
                    {t.name}
                  </p>
                  <p className="font-sans text-[15px] text-[#4B4E52] leading-tight mt-0.5">{t.role}</p>
                  <p className="font-sans text-[15px] text-[#003D2F] mt-1">
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

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { CalendarCheck, Filter, LayoutDashboard, MessageSquare, RefreshCw } from "lucide-react";
import { revealOnScroll } from "@/lib/animations";
import { capacidadesClinica, capacidadesMedico, type Capacidade } from "@/content/capacidades";

type Item = { icone: typeof MessageSquare; titulo: string; linha: string };

/** Um ícone por capacidade, na ordem de content/capacidades.ts. */
const ICONES = [MessageSquare, CalendarCheck, RefreshCw, Filter, LayoutDashboard];

const comIcone = (lista: Capacidade[]): Item[] =>
  lista.map((c, i) => ({ icone: ICONES[i], ...c }));

const clinica: Item[] = comIcone(capacidadesClinica);
const medico: Item[] = comIcone(capacidadesMedico);

const copy = {
  clinica: {
    itens: clinica,
    fecho: "Sua equipe cuida das pessoas e decide quando entrar na conversa. Ela cuida do volume.",
  },
  medico: {
    itens: medico,
    fecho: "Você foca na medicina. Ela cuida do WhatsApp, da agenda e das dúvidas.",
  },
};

type Props = { variante?: "clinica" | "medico" };

/** "O resto, na prática": as cinco capacidades em cards. */
const Cuida = ({ variante = "clinica" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const t = copy[variante];
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="como-funciona" className="scroll-mt-24 bg-white py-14 md:py-20" ref={ref}>
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2
          className="font-display text-balance text-center text-[26px] font-normal tracking-[-0.04em] text-[#1F2937] sm:text-[36px] lg:text-[42px]"
          data-reveal
        >
          O resto, na prática:
        </h2>

        <ul
          className="mt-9 grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-6 lg:gap-5"
          data-reveal
        >
          {t.itens.map((item, i) => (
            <li
              key={item.titulo}
              // Cinco cards em seis colunas: três em cima e dois centrados
              // embaixo, em vez de um card órfão na última linha.
              className={`flex flex-col gap-3 rounded-2xl p-5 lg:col-span-2 ${
                i === 3 ? "lg:col-start-2" : ""
              }`}
              style={{ background: "#F1FBF8", border: "1px solid #D6F3EE" }}
            >
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center rounded-full"
                style={{ background: "#D6F3EE", color: "#055449" }}
              >
                <item.icone size={19} strokeWidth={1.8} />
              </span>
              <h3 className="font-display text-[18px] font-semibold leading-snug text-[#1F2937]">
                {item.titulo}
              </h3>
              <p className="font-sans text-[15px] leading-[1.55] text-[#4B5563]">{item.linha}</p>
            </li>
          ))}
        </ul>

        <p
          className="font-display mt-10 text-balance text-center text-[19px] font-bold text-[#055449] md:mt-14 md:text-[23px]"
          data-reveal
        >
          {t.fecho}
        </p>
      </div>
    </section>
  );
};

export default Cuida;

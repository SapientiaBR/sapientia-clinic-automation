import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  CalendarCheck,
  CalendarClock,
  ClipboardList,
  History,
  Mic,
  MessageSquare,
  RefreshCw,
  Send,
  Stethoscope,
  Zap,
} from "lucide-react";
import { revealOnScroll } from "@/lib/animations";

type Item = { icone: typeof Zap; texto: string };

const clinica: Item[] = [
  { icone: Zap, texto: "Responde em segundos, 24h" },
  { icone: CalendarCheck, texto: "Agenda na própria conversa" },
  { icone: ClipboardList, texto: "Confirma presença" },
  { icone: CalendarClock, texto: "Lembra antes da consulta" },
  { icone: RefreshCw, texto: "Remarca sem ligação" },
  { icone: MessageSquare, texto: "Tira dúvidas de valores, convênios e endereço" },
  { icone: Mic, texto: "Entende e responde áudio" },
  { icone: History, texto: "Guarda todo o histórico no painel" },
];

const medico: Item[] = [
  { icone: Zap, texto: "Responde em segundos, 24h" },
  { icone: CalendarCheck, texto: "Agenda na própria conversa" },
  { icone: ClipboardList, texto: "Confirma o agendamento" },
  { icone: MessageSquare, texto: "Tira dúvidas de valores, convênios e endereço" },
  { icone: History, texto: "Guarda todo o histórico no painel" },
  { icone: Send, texto: "Passa para você o que é clínico" },
];

const copy = {
  clinica: { itens: clinica, fecho: "Sua equipe cuida das pessoas. Ela cuida do volume." },
  medico: {
    itens: medico,
    fecho: "Você foca na medicina. Ela cuida do WhatsApp, da agenda e das dúvidas.",
  },
};

type Props = { variante?: "clinica" | "medico" };

/**
 * "O resto, na prática" — a lista do que ela faz.
 *
 * Duas colunas já no celular. São itens de duas a quatro palavras: numa coluna
 * só, cada linha ocuparia a largura inteira da tela para dizer "Confirma
 * presença", e a seção viraria uma fita de oito telas de altura.
 */
const Cuida = ({ variante = "clinica" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const t = copy[variante];
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="como-funciona" className="scroll-mt-24 bg-white py-14 md:py-20" ref={ref}>
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2
          className="font-display text-balance text-center text-[26px] font-normal tracking-[-0.04em] text-[#292929] sm:text-[36px] lg:text-[42px]"
          data-reveal
        >
          O resto, na prática:
        </h2>

        <ul className="mt-9 grid grid-cols-2 gap-x-4 gap-y-6 md:mt-12 md:grid-cols-4 md:gap-x-6" data-reveal>
          {t.itens.map((item) => (
            <li key={item.texto} className="flex flex-col items-start gap-3">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center rounded-full"
                style={{ background: "#DBF9F1", color: "#003D2F" }}
              >
                <item.icone size={19} strokeWidth={1.8} />
              </span>
              <span className="font-sans text-[length:var(--text-body)] leading-snug text-[#292929] md:text-[length:var(--text-body)]">
                {item.texto}
              </span>
            </li>
          ))}
        </ul>

        <p
          className="font-display mt-10 text-balance text-center text-[length:var(--text-body-lg)] font-bold text-[#003D2F] md:mt-14 md:text-[23px]"
          data-reveal
        >
          {t.fecho}
        </p>
      </div>
    </section>
  );
};

export default Cuida;

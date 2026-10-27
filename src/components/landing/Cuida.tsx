import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { CalendarCheck, Filter, LayoutDashboard, MessageSquare, RefreshCw } from "lucide-react";
import { revealOnScroll } from "@/lib/animations";

type Item = { icone: typeof MessageSquare; titulo: string; linha: string };

/**
 * As cinco capacidades, na ordem da frase de posicionamento (27/10): atende,
 * agenda, faz o follow-up, organiza num funil e deixa a equipe no comando.
 *
 * A integração com o Google Agenda é dos planos Clínica e Operação, então o
 * card da agenda diz isso na própria linha em vez de deixar a promessa solta.
 */
const clinica: Item[] = [
  {
    icone: MessageSquare,
    titulo: "Atende no WhatsApp",
    linha: "Responde seus pacientes no número que eles já conhecem, de dia, de noite e no fim de semana.",
  },
  {
    icone: CalendarCheck,
    titulo: "Agenda direto no Google Agenda",
    linha:
      "O horário que o paciente escolhe cai direto na agenda da clínica. Nos planos Clínica e Operação, no seu Google Agenda.",
  },
  {
    icone: RefreshCw,
    titulo: "Faz o follow-up de quem sumiu",
    linha: "Quem perguntou e não voltou recebe uma nova mensagem, em vez de ficar sem resposta.",
  },
  {
    icone: Filter,
    titulo: "Organiza os pacientes num funil",
    linha: "Cada paciente fica na etapa em que está, e a equipe vê onde cada conversa parou.",
  },
  {
    icone: LayoutDashboard,
    titulo: "Sua equipe no comando, num painel único",
    linha: "Sua equipe acompanha todas as conversas num só lugar e assume qualquer uma quando quiser.",
  },
];

/** O médico solo assina o Consultório, que não tem a integração com o Google Agenda. */
const medico: Item[] = [
  clinica[0],
  {
    icone: CalendarCheck,
    titulo: "Agenda na própria conversa",
    linha: "O paciente escolhe o horário e a consulta fica marcada, sem você parar o atendimento.",
  },
  clinica[2],
  {
    icone: Filter,
    titulo: "Organiza os pacientes num funil",
    linha: "Cada paciente fica na etapa em que está, e você vê onde cada conversa parou.",
  },
  {
    icone: LayoutDashboard,
    titulo: "Você no comando, num painel único",
    linha: "Você acompanha todas as conversas num só lugar e assume qualquer uma quando quiser.",
  },
];

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

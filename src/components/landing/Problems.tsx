import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Clock, Wallet, CalendarX } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { ScrollTrigger, countUp, revealOnScroll } from "@/lib/animations";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  desc: string;
  Icon: typeof Clock;
  bg: string;
  iconColor: string;
};

const stats: Stat[] = [
  {
    value: 63, suffix: "%", label: "pacientes vão embora em 5 min",
    desc: "63% dos pacientes não esperam mais que 5 minutos por resposta — ligam pra próxima clínica.",
    Icon: Clock, bg: "#D6F3EE", iconColor: "#0FB5A3",
  },
  {
    value: 2800, prefix: "R$ ", label: "/mês de secretária sobrecarregada",
    desc: "Custo médio de uma secretária CLT — e mesmo assim o WhatsApp segue sem resposta fora do horário.",
    Icon: Wallet, bg: "#D6F3EE", iconColor: "#0FB5A3",
  },
  {
    value: 34, suffix: "%", label: "faltas sem confirmação",
    desc: "Sem lembrete automático, as faltas podem chegar a 34% — agenda com buracos e dinheiro na mesa.",
    Icon: CalendarX, bg: "#F3F4F6", iconColor: "#1F2937",
  },
];

const Problems = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = ref.current;
    const cleanupReveal = revealOnScroll(root);

    const counters = root?.querySelectorAll<HTMLElement>("[data-counter]") ?? [];
    const kills: Array<() => void> = [];
    const st = ScrollTrigger.create({
      trigger: root,
      start: "top 75%",
      once: true,
      fastScrollEnd: true,
      onEnter: () => {
        counters.forEach((el) => {
          const target = Number(el.dataset.counter || "0");
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          kills.push(
            countUp(target, (v) => {
              el.textContent = `${prefix}${v.toLocaleString("pt-BR")}${suffix}`;
            })
          );
        });
      },
    });

    return () => {
      st.kill();
      kills.forEach((k) => k());
      cleanupReveal();
    };
  }, { scope: ref });

  return (
    <section id="problema" className="py-16 md:section-padding relative" ref={ref} style={{ background: "#0F1F2C" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-14 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// o problema invisível</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            Cada mensagem sem resposta é um <em>paciente que não volta.</em>
          </h2>
          <p className="hidden md:block font-sans text-base text-white/70 mt-5 leading-relaxed">
            A maioria das clínicas perde mais dinheiro no WhatsApp do que ganha em consulta. Os números não mentem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-3 md:gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-[22px] p-5 md:p-7 transition-transform hover:-translate-y-1"
              data-reveal
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="grid grid-cols-[auto_1fr] items-center gap-4 md:block md:gap-0">
                <div
                  className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center md:mb-5"
                  style={{ background: "rgba(15,181,163,0.18)" }}
                >
                  <s.Icon size={22} style={{ color: "#45D89B" }} />
                </div>
                <div>
                  <p
                    className="font-display-sans font-extrabold text-[30px] md:text-[52px] leading-none tabular-nums text-[#45D89B]"
                    data-counter={s.value}
                    data-prefix={s.prefix ?? ""}
                    data-suffix={s.suffix ?? ""}
                  >
                    {s.prefix}0{s.suffix}
                  </p>
                  <p className="font-sans font-bold text-white text-[12px] md:text-[15px] mt-1 md:mt-2 leading-tight">{s.label}</p>
                </div>
              </div>
              <p className="font-sans text-[13px] md:text-sm text-white/65 leading-snug md:leading-relaxed mt-3">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;

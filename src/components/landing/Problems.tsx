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
    <section id="problema" className="py-14 md:py-20 relative" ref={ref} style={{ background: "#F9FAFB" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6 md:mb-10 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// o problema invisível</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            Cada mensagem sem resposta é um <em>paciente que não volta.</em>
          </h2>
          <p className="font-sans text-base text-[var(--text-muted)] mt-4 leading-relaxed">
            A maioria das clínicas perde mais dinheiro no WhatsApp do que ganha em consulta. Os números não mentem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 md:p-7 transition-shadow hover:shadow-md"
              data-reveal
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
              }}
            >
              <div className="grid grid-cols-[auto_1fr] items-center gap-4 md:block md:gap-0">
                <div
                  className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center md:mb-5"
                  style={{ background: "#D6F3EE" }}
                >
                  <s.Icon size={22} style={{ color: "#0A8C7E" }} />
                </div>
                <div>
                  <p
                    className="font-display-sans font-extrabold text-[30px] md:text-[52px] leading-none tabular-nums text-[var(--text)]"
                    data-counter={s.value}
                    data-prefix={s.prefix ?? ""}
                    data-suffix={s.suffix ?? ""}
                  >
                    {s.prefix}0{s.suffix}
                  </p>
                  <p className="font-sans font-semibold text-[var(--text)] text-[11px] md:text-[13px] uppercase tracking-wide mt-1 md:mt-2 leading-tight">{s.label}</p>
                </div>
              </div>
              <p className="font-sans text-[13px] md:text-sm text-[var(--text-muted)] leading-snug md:leading-relaxed mt-3">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;

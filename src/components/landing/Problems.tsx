import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Clock, Wallet, CalendarX } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { gsap, ScrollTrigger, EASE, countUp } from "@/lib/animations";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  desc: string;
  Icon: typeof Clock;
  glow: string;
};

const stats: Stat[] = [
  {
    value: 63, suffix: "%", label: "podem desistir em 5 minutos",
    desc: "Até 63% dos pacientes não esperam mais que 5 min por uma resposta antes de procurar outra clínica.",
    Icon: Clock, glow: "rgba(124,58,237,0.25)",
  },
  {
    value: 2800, prefix: "R$ ", label: "/mês de secretária CLT",
    desc: "Custo médio de uma secretária com encargos. Sem contar férias, faltas e treinamento.",
    Icon: Wallet, glow: "rgba(6,182,212,0.25)",
  },
  {
    value: 34, suffix: "%", label: "faltas podem chegar a isso",
    desc: "Sem confirmação automática, faltas em consultas marcadas podem chegar a 34% — cadeira vazia, prejuízo direto.",
    Icon: CalendarX, glow: "rgba(77,235,255,0.25)",
  },
];

const Problems = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.from(ref.current!.querySelectorAll("[data-reveal]"), {
        y: 60, opacity: 0, duration: 0.7, ease: EASE, stagger: 0.2,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(ref.current!.querySelectorAll("[data-reveal]"), {
        y: 30, opacity: 0, duration: 0.6, ease: EASE, stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
      });
    });

    // Counters
    const counters = ref.current!.querySelectorAll<HTMLElement>("[data-counter]");
    const kills: Array<() => void> = [];
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 75%",
      once: true,
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
      mm.revert();
    };
  }, { scope: ref });

  return (
    <section id="problema" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 max-w-2xl mx-auto" data-reveal>
          <Eyebrow>// o problema invisível</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            Cada mensagem sem resposta é um <em>paciente que não volta.</em>
          </h2>
          <p className="font-sans text-base text-[var(--text-muted)] mt-5 leading-relaxed">
            A maioria das clínicas perde mais dinheiro no WhatsApp do que ganha em consulta. Os números não mentem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="card-base p-7" data-reveal>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: s.glow, boxShadow: `0 0 30px ${s.glow}` }}
              >
                <s.Icon size={22} className="text-white" />
              </div>
              <p
                className="font-display font-bold text-[52px] leading-none gradient-text tabular-nums"
                data-counter={s.value}
                data-prefix={s.prefix ?? ""}
                data-suffix={s.suffix ?? ""}
              >
                {s.prefix}0{s.suffix}
              </p>
              <p className="font-sans font-bold text-white text-[15px] mt-2">{s.label}</p>
              <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed mt-3">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;

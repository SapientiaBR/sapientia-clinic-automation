import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE_PREMIUM, prefersReducedMotion, revealOnScroll } from "@/lib/animations";

const timeline: [string, string][] = [
  ["21h17", "“Vocês atendem amanhã?”"],
  ["21h18", "Ele recebe a resposta."],
  ["21h19", "Escolhe o horário."],
  ["21h20", "Consulta marcada."],
];

type Props = { variante?: "clinica" | "medico" };

/**
 * A cena das 21h17.
 *
 * A linha se desenha conforme a página rola, e cada passo acende quando a
 * linha chega nele. O movimento aqui não é enfeite: a seção é uma sequência de
 * quatro minutos, e ver o traço avançar é o que faz o leitor sentir o tempo
 * passando em vez de ler quatro itens de lista.
 *
 * `scrub` amarra o progresso à rolagem em vez de disparar uma animação de
 * duração fixa — quem rola devagar vê devagar, quem rola rápido não perde nada.
 *
 * Muda só o substantivo entre as rotas; a cena vale igual para as duas.
 */
const Scene = ({ variante = "clinica" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const trilha = useRef<HTMLOListElement>(null);
  const lugar = variante === "medico" ? "O consultório" : "A clínica";

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  useGSAP(
    () => {
      const ol = trilha.current;
      if (!ol) return;

      const passos = gsap.utils.toArray<HTMLElement>("[data-passo]", ol);
      const linha = ol.querySelector<HTMLElement>("[data-linha]");

      if (prefersReducedMotion()) {
        // Sem movimento: tudo aceso e a linha inteira desenhada.
        gsap.set(passos, { opacity: 1, x: 0 });
        if (linha) gsap.set(linha, { scaleY: 1 });
        return;
      }

      gsap.set(passos, { opacity: 0.25, x: -6 });
      if (linha) gsap.set(linha, { scaleY: 0, transformOrigin: "top center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ol,
          // Começa quando a lista entra na metade de baixo da tela e termina
          // quando ela sai pela metade de cima: o traço acompanha a leitura.
          start: "top 78%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      });

      // A duracao do traco e a da sequencia inteira, calculada, nao chutada.
      // Com a duracao padrao do GSAP (0,5s) ele terminava a 53% da linha do
      // tempo — o traco chegava ao fim com o ultimo passo ainda apagado.
      const passoDur = 0.2;
      const total = (passos.length - 1) / passos.length + passoDur;

      if (linha) tl.to(linha, { scaleY: 1, ease: "none", duration: total }, 0);

      passos.forEach((passo, i) => {
        tl.to(
          passo,
          { opacity: 1, x: 0, duration: passoDur, ease: EASE_PREMIUM },
          i / passos.length,
        );
      });
    },
    { scope: ref },
  );

  return (
    <section className="py-14 md:py-20" style={{ background: "var(--bg-page)" }} ref={ref}>
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-12" data-reveal>
          <h2
            className="font-display text-[30px] font-normal sm:text-[42px] lg:text-[52px]"
            style={{ color: "var(--ink-strong)", letterSpacing: "var(--tracking-display)" }}
          >
            21h17. {lugar} fechou.
          </h2>
          <p
            className="font-display mt-3 text-balance text-[length:var(--text-body-lg)] font-semibold sm:text-[24px]"
            style={{ color: "var(--brand-600)" }}
          >
            Um paciente acabou de mandar mensagem.
          </p>
        </div>

        <ol ref={trilha} className="relative pl-[72px] sm:pl-[88px]">
          {/* Trilho fixo e traço que cresce, um sobre o outro. Separá-los é o
              que permite animar só a altura do segundo, sem mexer no layout. */}
          <span
            aria-hidden
            className="absolute bottom-3 left-[72px] top-3 w-px sm:left-[88px]"
            style={{ background: "var(--brand-100)" }}
          />
          <span
            data-linha
            aria-hidden
            className="absolute bottom-3 left-[72px] top-3 w-px sm:left-[88px]"
            style={{ background: "var(--brand-500)" }}
          />

          {timeline.map(([time, text]) => (
            <li key={time} data-passo className="relative flex items-start gap-4 pb-6 last:pb-0">
              <span
                className="font-display absolute left-[-72px] w-[62px] flex-shrink-0 pt-[2px] text-[length:var(--text-body-lg)] font-bold sm:left-[-88px] sm:w-[76px] sm:text-[length:var(--text-body-lg)]"
                style={{ color: "var(--brand-600)" }}
              >
                {time}
              </span>
              <span
                aria-hidden
                className="-ml-[5px] mt-[8px] h-[9px] w-[9px] flex-shrink-0"
                style={{ background: "var(--brand-500)", borderRadius: "var(--radius-pill)" }}
              />
              <p
                className="font-sans pl-1 text-[length:var(--text-body-lg)] leading-[1.6] sm:text-[length:var(--text-body-lg)]"
                style={{ color: "var(--ink-strong)" }}
              >
                {text}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center md:mt-12" data-reveal>
          <p
            className="font-display text-balance text-[20px] font-semibold sm:text-[26px]"
            style={{ color: "var(--ink-strong)" }}
          >
            {lugar} fechou.
          </p>
          <p
            className="font-display mt-1 text-balance text-[20px] font-bold sm:text-[26px]"
            style={{ color: "var(--brand-800)" }}
          >
            A agenda, não.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Scene;

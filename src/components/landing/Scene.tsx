import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE_PREMIUM, prefersReducedMotion, revealOnScroll } from "@/lib/animations";

type Passo = [rotulo: string, texto: string];

const passos = (ehMedico: boolean): Passo[] => [
  ["Agora.", "Paciente: “Oi! Quanto é a consulta?”"],
  [
    "Em segundos.",
    `${ehMedico ? "O consultório" : "A clínica"} responde com o valor e dois horários.`,
  ],
  ["Silêncio.", "Visualizado. Nenhuma resposta."],
  ["No dia seguinte.", "“Oi! Ainda quer marcar? Tenho quinta às 10h.”"],
  [
    "Marcado.",
    `O paciente responde “Quero”. A consulta entra na agenda e o paciente vai para “Agendado” no ${
      ehMedico ? "seu painel" : "painel da sua equipe"
    }.`,
  ],
];

type Props = { variante?: "clinica" | "medico" };

/**
 * A cena do paciente que some.
 *
 * Perguntou o valor, visualizou e sumiu: a conversa que toda recepção conhece.
 * A linha se desenha conforme a página rola, e cada passo acende quando a
 * linha chega nele. O movimento aqui não é enfeite: a seção é uma sequência
 * que atravessa um dia, e ver o traço avançar é o que faz o leitor sentir o
 * tempo passando em vez de ler cinco itens de lista.
 *
 * `scrub` amarra o progresso à rolagem em vez de disparar uma animação de
 * duração fixa — quem rola devagar vê devagar, quem rola rápido não perde nada.
 *
 * Muda só o substantivo entre as rotas; a cena vale igual para as duas.
 */
const Scene = ({ variante = "clinica" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const trilha = useRef<HTMLOListElement>(null);
  const ehMedico = variante === "medico";
  const lista = passos(ehMedico);

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
            className="font-display text-balance text-[30px] font-normal sm:text-[42px] lg:text-[52px]"
            style={{ color: "var(--ink-strong)", letterSpacing: "var(--tracking-display)" }}
          >
            Perguntou o valor. Visualizou. Sumiu.
          </h2>
          <p
            className="font-display mt-3 text-balance text-[19px] font-semibold sm:text-[24px]"
            style={{ color: "var(--brand-600)" }}
          >
            {ehMedico ? "Todo consultório conhece essa conversa." : "Toda recepção conhece essa conversa."}
          </p>
        </div>

        <ol ref={trilha} className="relative mx-auto max-w-xl pl-9 sm:pl-11">
          {/* Trilho fixo e traço que cresce, um sobre o outro. Separá-los é o
              que permite animar só a altura do segundo, sem mexer no layout. */}
          <span
            aria-hidden
            className="absolute bottom-3 left-[11px] top-3 w-px sm:left-[15px]"
            style={{ background: "var(--brand-100)" }}
          />
          <span
            data-linha
            aria-hidden
            className="absolute bottom-3 left-[11px] top-3 w-px sm:left-[15px]"
            style={{ background: "var(--brand-500)" }}
          />

          {lista.map(([rotulo, texto]) => (
            <li key={rotulo} data-passo className="relative pb-7 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[30px] top-[7px] h-[9px] w-[9px] sm:-left-[33px]"
                style={{ background: "var(--brand-500)", borderRadius: "var(--radius-pill)" }}
              />
              <p
                className="font-display text-[15px] font-bold uppercase tracking-[0.08em] sm:text-[16px]"
                style={{ color: "var(--brand-600)" }}
              >
                {rotulo}
              </p>
              <p
                className="font-sans mt-1 text-[17px] leading-[1.6] sm:text-[18px]"
                style={{ color: "var(--ink-strong)" }}
              >
                {texto}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center md:mt-12" data-reveal>
          <p
            className="font-display text-balance text-[20px] font-semibold sm:text-[26px]"
            style={{ color: "var(--ink-strong)" }}
          >
            O paciente sumiu.
          </p>
          <p
            className="font-display mt-1 text-balance text-[20px] font-bold sm:text-[26px]"
            style={{ color: "var(--brand-800)" }}
          >
            A Secretária Invisível foi atrás.
          </p>
          <p
            className="font-sans mt-4 text-balance text-[16px] leading-[1.6] sm:text-[17px]"
            style={{ color: "var(--ink-body)" }}
          >
            {ehMedico
              ? "Você vê tudo no painel e entra na conversa quando quiser."
              : "Sua equipe vê tudo no painel e entra na conversa quando quiser."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Scene;

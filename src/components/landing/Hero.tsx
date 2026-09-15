import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { gsap, EASE_PREMIUM, prefersReducedMotion } from "@/lib/animations";
import heroReception from "@/assets/hero-reception.jpg";
import { Baloes, conversas } from "@/components/landing/conversations";
import { ChatThread } from "../../../design-system-2/components/product/ChatThread";

export const CTA_HREF = "#demo";
export const CTA_LABEL = "Quero ver a demonstração no meu WhatsApp";

const copy = {
  clinica: {
    titulo: "Sua recepcionista atende quem está no balcão.",
    reforco: "A Secretária Invisível cuida do resto.",
    texto:
      "Responde, agenda, confirma, lembra e remarca seus pacientes 24h, e guarda todo o histórico. Sem substituir ninguém.",
  },
  medico: {
    titulo: "Você atende o paciente.",
    reforco: "A Secretária Invisível cuida do resto.",
    texto:
      "Responde, agenda e confirma seus pacientes 24h, tira as dúvidas do dia a dia e guarda todo o histórico. Chega de WhatsApp às 23h.",
  },
};

/**
 * Mockup de celular com a conversa de agendamento — o lado do médico solo.
 *
 * A moldura sai do `ChatThread` do design system, a mesma da seção de
 * conversas. Era um cabeçalho montado à mão aqui, com iniciais no lugar do
 * avatar e um ponto verde de status; o componente traz isso pronto e, mais
 * importante, mantém as duas aparições do chat idênticas.
 *
 * O `ds-root` é obrigatório — os tokens do sistema são escopados nessa classe
 * para não vazarem para o resto do site.
 */
const MockupCelular = () => (
  <div className="ds-root mx-auto w-full max-w-[19rem]">
    <ChatThread
      className="shadow-[var(--shadow-lg)]"
      contact={{ name: "Secretária Invisível", status: "online" }}
      composerPlaceholder="Mensagem"
    >
      <Baloes messages={conversas[0].messages} />
    </ChatThread>
  </div>
);

type Props = { variante?: "clinica" | "medico" };

/**
 * Hero na composição do docshield.
 *
 * Três coisas fazem o hero dele, e nenhuma é a cor:
 *
 * 1. Painel de cor cheia ocupando a largura toda, escuro em cima e dissolvendo
 *    no fundo da página embaixo — a emenda com a próxima seção não tem corte.
 * 2. Tudo centrado numa coluna só, em vez de texto à esquerda e imagem à
 *    direita. A imagem entra depois dos botões, não ao lado deles.
 * 3. Título grande em peso regular com tracking apertado. Medi lá: 50px,
 *    peso 400, −2,02px. Em bold sobre o painel o texto vira massa.
 *
 * A foto tem uma máscara que a dissolve embaixo. No docshield o retrato é um
 * recorte sem fundo, flutuando sobre o painel; aqui a foto é retangular, e a
 * máscara é o que chega mais perto disso sem refazer a imagem.
 *
 * `data-hero` é o que a barra fixa de CTA observa para saber quando aparecer.
 */
const Hero = ({ variante = "clinica" }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const t = copy[variante];
  const ehMedico = variante === "medico";

  useGSAP(
    () => {
      const root = ref.current!;
      if (prefersReducedMotion()) return;

      // A entrada é em cascata de cima para baixo, com um respiro entre os
      // blocos — é o que faz o hero "montar" em vez de simplesmente aparecer.
      gsap.from(root.querySelectorAll("[data-hero-step]"), {
        y: 22,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.9,
        ease: EASE_PREMIUM,
        stagger: 0.09,
        delay: 0.15,
      });

      // A imagem sobe um pouco enquanto a página rola. É sutil de propósito:
      // 40px de deslocamento ao longo de uma tela inteira dá profundidade sem
      // que ninguém consiga apontar o que está se mexendo.
      const foto = root.querySelector("[data-hero-photo]");
      if (foto) {
        gsap.to(foto, {
          y: -40,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
        });
      }
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      data-hero
      className="relative overflow-hidden pb-0"
      style={{
        background: "var(--gradient-panel)",
        // A folga do topo acompanha a faixa da turma, que muda de altura
        // quando o texto quebra no celular. O resto e a navbar mais o ar.
        paddingTop: "calc(var(--altura-faixa, 36px) + 7.5rem)",
      }}
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            data-hero-step
            className="headline-hero text-balance text-[34px] sm:text-[48px] lg:text-[60px]"
            style={{ color: "var(--ink-on-brand)" }}
          >
            {t.titulo}
          </h1>

          <p
            data-hero-step
            className="font-display mt-3 text-balance text-[22px] font-semibold leading-[1.25] sm:text-[28px] lg:text-[32px]"
            style={{ color: "var(--brand-200)" }}
          >
            {t.reforco}
          </p>

          <p
            data-hero-step
            className="font-sans mx-auto mt-6 max-w-[620px] text-[length:var(--text-body-lg)] leading-[1.6] md:text-[length:var(--text-body-lg)]"
            style={{ color: "rgb(255 255 255 / 0.82)" }}
          >
            {t.texto}
          </p>

          {/* Dois botões em pílula, lado a lado e centrados — o par do
              docshield: um sólido claro e um translúcido. */}
          <div
            data-hero-step
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href={CTA_HREF}
              className="group inline-flex w-full items-center justify-center gap-2.5 px-7 py-4 font-display text-[length:var(--text-body)] font-bold transition-transform duration-base hover:-translate-y-0.5 sm:w-auto"
              style={{
                background: "var(--bg-page)",
                color: "var(--ink-strong)",
                borderRadius: "var(--radius-pill)",
                boxShadow: "var(--shadow-pill)",
              }}
            >
              <span className="text-balance">{CTA_LABEL}</span>
              <ArrowRight
                size={16}
                className="flex-none transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>

            <a
              href="#como-funciona"
              className="inline-flex w-full items-center justify-center px-7 py-4 font-display text-[length:var(--text-body)] font-semibold transition-colors duration-base sm:w-auto"
              style={{
                background: "rgb(255 255 255 / 0.14)",
                color: "var(--ink-on-brand)",
                borderRadius: "var(--radius-pill)",
                border: "1px solid rgb(255 255 255 / 0.28)",
              }}
            >
              Ver como funciona
            </a>
          </div>

          <p
            data-hero-step
            className="font-sans mt-5 text-[length:var(--text-body)]"
            style={{ color: "rgb(255 255 255 / 0.72)" }}
          >
            Ela te chama em segundos · Grátis · Sem ligação
          </p>
        </div>
      </div>

      {/* A imagem fecha o hero, centrada e dissolvendo na base do painel. */}
      <div data-hero-photo className="relative z-0 mx-auto mt-10 max-w-4xl px-4 md:mt-14">
        {ehMedico ? (
          <div className="pb-10 md:pb-14">
            <MockupCelular />
          </div>
        ) : (
          <img
            src={heroReception}
            width={1280}
            height={960}
            /* Em camelCase os tipos aceitam mas o React 18 avisa no console;
               em minúsculo o DOM aceita e os tipos reclamam. O spread entrega
               o atributo cru e encerra a discussão. */
            {...({ fetchpriority: "high" } as Record<string, string>)}
            decoding="async"
            alt="Recepcionista atendendo uma paciente no balcão de uma clínica"
            className="mx-auto h-[220px] w-full max-w-3xl object-cover object-top sm:h-[300px] lg:h-[380px]"
            style={{
              borderTopLeftRadius: "var(--radius-xl)",
              borderTopRightRadius: "var(--radius-xl)",
              // A máscara faz a foto sumir na base em vez de terminar numa
              // aresta reta. É o que aproxima do recorte sem fundo do
              // docshield sem precisar refazer a imagem.
              WebkitMaskImage:
                "linear-gradient(180deg, #000 0%, #000 62%, rgb(0 0 0 / 0.35) 86%, transparent 100%)",
              maskImage:
                "linear-gradient(180deg, #000 0%, #000 62%, rgb(0 0 0 / 0.35) 86%, transparent 100%)",
            }}
          />
        )}
      </div>
    </section>
  );
};

export default Hero;

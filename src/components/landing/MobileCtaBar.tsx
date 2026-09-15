import { useEffect, useState } from "react";

/**
 * Barra fixa de CTA no rodapé, só no celular.
 *
 * Aparece depois que o hero sai de vista e some quando o formulário entra —
 * uma barra cobrindo o botão "Quero ver a demonstração" enquanto a pessoa
 * preenche o formulário é um estorvo, não um atalho.
 *
 * Os dois estados vêm de IntersectionObserver e não da posição de rolagem:
 * a altura do hero muda com o tamanho da tela e com a quebra do título, e
 * comparar `scrollY` com um número fixo erra em metade dos aparelhos.
 */
const MobileCtaBar = () => {
  const [passouDoHero, setPassouDoHero] = useState(false);
  const [demoVisivel, setDemoVisivel] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    const demo = document.getElementById("demo");
    const observadores: IntersectionObserver[] = [];

    if (hero) {
      const o = new IntersectionObserver(
        ([e]) => setPassouDoHero(!e.isIntersecting),
        { threshold: 0 },
      );
      o.observe(hero);
      observadores.push(o);
    } else {
      // Sem hero na página, a barra vale desde o começo.
      setPassouDoHero(true);
    }

    if (demo) {
      const o = new IntersectionObserver(([e]) => setDemoVisivel(e.isIntersecting), {
        threshold: 0.12,
      });
      o.observe(demo);
      observadores.push(o);
    }

    return () => observadores.forEach((o) => o.disconnect());
  }, []);

  const visivel = passouDoHero && !demoVisivel;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 px-4 py-3 transition-[opacity,transform] duration-base md:hidden ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      style={{
        background: "rgba(255,255,255,0.96)",
        borderTop: "1px solid #E8EAF0",
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
      }}
      // Fora de vista, a barra sai também da ordem de leitura e da navegação
      // por teclado — senão o botão continua focável atrás da tela.
      aria-hidden={!visivel}
      /* `inert` ainda nao esta nos tipos do React 18; o spread passa o
         atributo direto. Presente = a barra sai da navegacao por teclado. */
      {...(visivel ? {} : ({ inert: "" } as Record<string, string>))}
    >
      <a
        href="#demo"
        tabIndex={visivel ? undefined : -1}
        className="flex w-full items-center justify-center rounded-full gradient-brand px-4 py-3.5 text-center font-display text-[length:var(--text-body-lg)] font-bold text-white"
      >
        Ver demonstração grátis
      </a>
    </div>
  );
};

export default MobileCtaBar;

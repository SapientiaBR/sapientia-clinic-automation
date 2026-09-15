import { useEffect, useState } from "react";
import logoSI from "@/assets/logo-si-v2.png.asset.json";
import { useLenis } from "@/components/global/LenisProvider";

const navItems = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Segurança", href: "#seguranca" },
  { label: "Planos", href: "#planos" },
  { label: "Perguntas", href: "#faq" },
];

/**
 * Navbar flutuante em cápsula.
 *
 * O docshield não encosta a barra no topo da janela: ela é uma pílula branca
 * solta, com respiro em volta, sobreposta ao conteúdo. É o que faz o painel
 * colorido do hero começar acima dela, e é boa parte do ar do site.
 *
 * A forma não muda ao rolar — só a sombra ganha peso. Trocar altura ou fundo
 * no scroll provoca um salto de layout no primeiro gesto do visitante.
 *
 * No celular ficam só a logo e um botão curto. O menu sanfona guardava quatro
 * âncoras da mesma página: abrir gaveta para chegar onde a rolagem chega é um
 * passo a mais sem ganho.
 *
 * O `top` desconta a faixa da turma, que fica acima e tem altura própria.
 */
const Header = () => {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!lenis) {
      const onScroll = () => setScrolled(window.scrollY > 20);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const handler = ({ scroll }: { scroll: number }) => setScrolled(scroll > 20);
    setScrolled(window.scrollY > 20);
    lenis.on("scroll", handler);
    return () => {
      lenis.off("scroll", handler);
    };
  }, [lenis]);

  return (
    /* `--altura-faixa` e publicada pela propria faixa da turma: no celular
       ela quebra em duas linhas e vai a 64px. O fallback cobre o instante
       antes do primeiro layout. */
    <header
      className="fixed inset-x-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
      style={{ top: "var(--altura-faixa, 36px)" }}
    >
      <div
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 py-2 pl-4 pr-2 transition-shadow duration-base md:backdrop-blur-xl"
        style={{
          background: "rgb(255 255 255 / 0.92)",
          borderRadius: "var(--radius-pill)",
          border: "1px solid var(--line-subtle)",
          boxShadow: scrolled ? "var(--shadow-pill)" : "var(--shadow-card)",
        }}
      >
        <a href="/" className="group flex flex-none items-center" aria-label="Secretária Invisível">
          <img
            src={logoSI.url}
            alt="Secretária Invisível"
            width={1264}
            height={843}
            className="h-11 w-auto transition-transform duration-base group-hover:scale-[1.02] md:h-14"
          />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-sans text-[length:var(--text-body)] transition-colors"
              style={{ color: "var(--ink-body)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-800)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-body)")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#demo"
          className="flex-none px-4 py-2.5 font-display text-[length:var(--text-sm)] font-semibold transition-transform duration-base hover:-translate-y-0.5 md:px-5 md:text-[length:var(--text-body)]"
          style={{
            background: "var(--gradient-brand)",
            color: "var(--ink-on-brand)",
            borderRadius: "var(--radius-pill)",
          }}
        >
          <span className="md:hidden">Ver demo</span>
          <span className="hidden md:inline">Ver demonstração</span>
        </a>
      </div>
    </header>
  );
};

export default Header;

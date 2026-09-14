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
 * Header.
 *
 * No celular ficam só a logo e um botão curto. O menu sanfona saiu: ele
 * guardava quatro âncoras da mesma página, e abrir uma gaveta para chegar a
 * uma seção que a própria rolagem alcança é um passo a mais sem ganho. Os
 * links seguem no desktop, onde cabem sem disputar espaço.
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
    <header
      className={`fixed left-0 right-0 top-[34px] z-50 transition-all duration-300 sm:top-[37px] ${
        scrolled
          ? "border-b border-[#E5E7EB] bg-[rgba(255,253,252,0.86)] md:backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between md:h-28">
          <a href="/" className="group flex items-center" aria-label="Secretária Invisível">
            <img
              src={logoSI.url}
              alt="Secretária Invisível"
              width={1264}
              height={843}
              className="h-16 w-auto transition-transform duration-300 group-hover:scale-[1.02] md:h-24"
            />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-sans text-[15px] text-[var(--text-muted)] transition-colors hover:text-[#055449]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#demo"
              className="rounded-full bg-[#0FB5A3] px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#0A8C7E]"
            >
              Ver demonstração
            </a>
          </nav>

          <a
            href="#demo"
            className="rounded-full bg-[#0FB5A3] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#0A8C7E] md:hidden"
          >
            Ver demo
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

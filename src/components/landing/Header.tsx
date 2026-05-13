import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoSI from "@/assets/logo-secretaria-invisivel.png";

const CTA_HREF = "#formulario";

const navItems = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Recursos", href: "#solucoes" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(8,13,26,0.85)] md:backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          <a href="#" className="flex items-center group" aria-label="Secretária Invisível">
            <img
              src={logoSI}
              alt="Secretária Invisível"
              className="h-10 md:h-12 w-auto"
              style={{ mixBlendMode: "screen" }}
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-sans text-[13px] text-[var(--text-muted)] hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={CTA_HREF}
              className="gradient-brand text-white text-[13px] font-semibold px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_28px_rgba(124,58,237,0.5)] transition-all"
            >
              Quero testar
            </a>
          </nav>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[rgba(8,13,26,0.98)] border-b border-white/5 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white/90 py-2.5 text-base"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={CTA_HREF}
              className="gradient-brand text-center text-white font-semibold px-5 py-3 rounded-full mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Quero testar
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

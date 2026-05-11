import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/sapient-logo.webp";

const CTA_HREF = "#formulario";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Soluções", href: "#solucoes" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 [transform:translateZ(0)] ${
        scrolled
          ? "bg-background/95 md:bg-background/85 md:backdrop-blur-2xl border-b border-border/50 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Sapient.IA"
              className="h-9 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-foreground/90 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-2 py-1 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-accent after:transition-all after:duration-300 hover:after:w-full focus-visible:after:w-full cursor-pointer"
                aria-label={item.label}
              >
                {item.label}
              </a>
            ))}
            <a
              href={CTA_HREF}
              className="gradient-vibrant font-display text-sm font-semibold text-foreground px-6 py-2.5 rounded-full hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(251,113,133,0.3)] transition-all duration-300 flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Diagnóstico Gratuito
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </nav>

          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/98 border-b border-border/50 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground/90 font-medium hover:text-foreground transition-colors py-2.5 text-base cursor-pointer"
                onClick={() => setMenuOpen(false)}
                aria-label={item.label}
              >
                {item.label}
              </a>
            ))}
            <a
              href={CTA_HREF}
              className="gradient-vibrant font-display text-center font-semibold text-foreground px-5 py-3 rounded-full mt-2 flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Diagnóstico Gratuito
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

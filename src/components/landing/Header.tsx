import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/sapient-logo.png";

const WHATSAPP_URL = "https://wa.me/5511920795583";

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
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-[36px] left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2">
            <img src={logo} alt="Sapient.IA" className="h-10 md:h-14 w-auto" />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-bg text-sm font-semibold text-foreground px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              Fale Conosco
            </a>
          </nav>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-bg text-center font-semibold text-foreground px-5 py-3 rounded-lg"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

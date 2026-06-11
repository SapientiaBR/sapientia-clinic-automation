import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoSI from "@/assets/logo-secretaria-invisivel.png";
import { useLenis } from "@/components/global/LenisProvider";

const CTA_HREF = "#formulario";

const navItems = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Conversas reais", href: "#conversas-reais" },
  { label: "Garantia", href: "#garantia" },
  { label: "FAQ", href: "#faq" },
];

const Header = () => {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    return () => { lenis.off("scroll", handler); };
  }, [lenis]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(255,253,252,0.86)] md:backdrop-blur-xl border-b border-[#E5E7EB]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28 md:h-36">
          <a href="#" className="flex items-center group" aria-label="Secretária Invisível">
            <img
              src={logoSI}
              alt="Secretária Invisível"
              className="h-20 md:h-28 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-sans text-[13px] text-[var(--text-muted)] hover:text-[#0A8C7E] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={CTA_HREF}
              className="bg-[#0FB5A3] hover:bg-[#0A8C7E] text-white text-[13px] font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Começar agora
            </a>
          </nav>

          <button
            className="md:hidden text-[var(--text)] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E7EB] animate-fade-in shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[var(--text)] py-2.5 text-base"
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

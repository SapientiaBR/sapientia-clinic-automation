import logoSapientia from "@/assets/logo-sapientia.png";

const Footer = () => {
  return (
    <footer className="border-t border-[#E3EAF5] py-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "linear-gradient(135deg, #6C63FF, #18C7D9)" }}
            />
            <span className="font-display italic text-base text-[var(--text)]">Secretária Invisível</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
              Um produto
            </span>
            <a
              href="https://sapient.ia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sapient.IA"
            >
              <img
                src={logoSapientia}
                alt="Sapient.IA"
                className="h-9 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
            © 2026 · LGPD · São Paulo, SP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

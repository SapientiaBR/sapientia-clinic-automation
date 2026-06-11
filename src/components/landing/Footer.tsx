import logoSI from "@/assets/logo-secretaria-invisivel.png.asset.json";

const Footer = () => {
  return (
    <footer className="py-10 bg-transparent border-t border-[#E5E7EB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#0FB5A3" }}
            />
            <span className="font-display italic text-base text-[var(--text)]">Secretária Invisível</span>
          </div>

          <a
            href="https://sapient.ia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sapient.IA"
            className="flex items-center gap-2.5"
          >
            <span className="font-sans text-[13px] text-[var(--text-muted)]">Um produto</span>
            <img
              src={logoSapientia}
              alt="Sapient.IA"
              className="h-9 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </a>

          <p className="font-sans text-[13px] text-[var(--text-muted)]">
            © 2026 · LGPD · São Paulo, SP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

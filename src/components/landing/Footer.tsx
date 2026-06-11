import logoSI from "@/assets/logo-si-v2.png.asset.json";

const Footer = () => {
  return (
    <footer className="py-10 bg-transparent border-t border-[#E5E7EB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={logoSI.url}
              alt="Secretária Invisível"
              className="h-12 md:h-14 w-auto"
            />
          </div>

          <a
            href="https://sapient.ia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sapient.IA"
            className="flex items-center gap-2.5"
          >
            <span className="font-sans text-[13px] text-[var(--text-muted)]">Um produto Sapient.IA</span>
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

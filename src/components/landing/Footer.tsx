const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-10 bg-[var(--navy-1)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
            />
            <span className="font-display italic text-base text-white">Secretária Invisível</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-dim)] ml-2">
              · Um produto Sapient.IA
            </span>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
            © 2026 · LGPD compliant · São Paulo, SP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import type { ReactNode } from "react";
import logoSI from "@/assets/logo-si-v2.png.asset.json";
import { abrirPreferencias } from "@/lib/consent";

/**
 * A moldura das páginas fora da landing: /assinar, /obrigado, /recepcionista
 * e os documentos. Cabeçalho só com a marca e rodapé com os documentos e as
 * preferências de cookies. Sem a navegação da landing: aqui a pessoa já está
 * no meio de uma tarefa.
 */
type Props = { children: ReactNode; semLinkInicio?: boolean; rodapeComFolga?: boolean };

const linkRodape =
  "font-sans text-[13px] text-[var(--text-muted)] underline-offset-4 transition-colors hover:text-[#055449] hover:underline";

const Casca = ({ children, semLinkInicio = false, rodapeComFolga = false }: Props) => {
  const logo = (
    <img src={logoSI.url} alt="Secretária Invisível" width={1264} height={843} className="h-10 w-auto md:h-12" />
  );

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#F7F9FA", color: "#1B2430" }}>
      <header className="border-b bg-white" style={{ borderColor: "#E5E7EB" }}>
        <div className="mx-auto flex max-w-6xl items-center px-4 py-3 sm:px-6 lg:px-8">
          {semLinkInicio ? logo : <a href="/">{logo}</a>}
        </div>
      </header>

      {children}

      <footer
        className={`border-t py-8 ${rodapeComFolga ? "pb-32 lg:pb-8" : ""}`}
        style={{ borderColor: "#E5E7EB" }}
      >
        <nav
          aria-label="Documentos"
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4"
        >
          <a href="/termos" className={linkRodape}>
            Termos
          </a>
          <a href="/dpa" className={linkRodape}>
            DPA
          </a>
          <a href="/privacidade" className={linkRodape}>
            Privacidade
          </a>
          <button type="button" onClick={abrirPreferencias} className={linkRodape}>
            Preferências de cookies
          </button>
        </nav>
      </footer>
    </div>
  );
};

export default Casca;

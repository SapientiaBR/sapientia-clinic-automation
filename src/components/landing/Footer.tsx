import { MessageCircle } from "lucide-react";
import logoSI from "@/assets/logo-si-v2.png.asset.json";
import { abrirPreferencias } from "@/lib/consent";

/**
 * Rodapé.
 *
 * A razão social ainda não foi informada, então a linha sai só com o CNPJ.
 * Preencher `RAZAO_SOCIAL` faz o nome aparecer antes do número, separado por
 * ponto médio; deixar vazio não imprime um separador solto.
 */
const RAZAO_SOCIAL = "";
const CNPJ = "24.081.578/0001-88";

const linkRodape =
  "font-sans text-[13px] text-[var(--text-muted)] underline-offset-4 transition-colors hover:text-[#055449] hover:underline";

const Footer = () => {
  const linhaJuridica = RAZAO_SOCIAL ? `${RAZAO_SOCIAL} · CNPJ ${CNPJ}` : `CNPJ ${CNPJ}`;

  return (
    <footer className="border-t border-[#E5E7EB] bg-transparent py-10 pb-28 md:pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-7 md:flex-row md:justify-between">
          <img
            src={logoSI.url}
            alt="Secretária Invisível"
            width={1264}
            height={843}
            className="h-12 w-auto md:h-14"
          />

          <div className="flex flex-col items-center gap-2.5 md:flex-row md:gap-7">
            <a
              href="https://sapientiabr.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[13px] text-[var(--text-muted)] underline-offset-4 transition-colors hover:text-[#055449] hover:underline"
            >
              Um produto Sapient.IA
            </a>
            <a
              href="https://wa.me/5511920795583"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-[13px] text-[var(--text-muted)] underline-offset-4 transition-colors hover:text-[#055449] hover:underline"
            >
              <MessageCircle size={15} aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </div>

          <nav aria-label="Documentos" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
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

          <div className="text-center md:text-right">
            <p className="font-sans text-[13px] text-[var(--text-muted)]">{linhaJuridica}</p>
            <p className="font-sans mt-1 text-[13px] text-[var(--text-muted)]">
              © 2026 · São Paulo, SP
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

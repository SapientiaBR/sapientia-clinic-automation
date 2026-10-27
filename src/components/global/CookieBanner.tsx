import { useEffect, useRef, useState } from "react";
import { EVENTO_ABRIR_BANNER, aceitar, lerEscolha, recusar } from "@/lib/consent";

/**
 * Banner de cookies.
 *
 * Aparece na primeira visita e volta quando alguém toca em "Preferências de
 * cookies" no rodapé. Os dois botões têm o mesmo tamanho e o mesmo peso: um
 * "Recusar" apagado ao lado de um "Aceitar" chamativo empurra a escolha, e a
 * política promete que a escolha é livre.
 */
const CookieBanner = () => {
  const [aberto, setAberto] = useState(false);
  const primeiroBotao = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (lerEscolha() === null) setAberto(true);
    const abrir = () => setAberto(true);
    window.addEventListener(EVENTO_ABRIR_BANNER, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR_BANNER, abrir);
  }, []);

  useEffect(() => {
    if (aberto) primeiroBotao.current?.focus({ preventScroll: true });
  }, [aberto]);

  if (!aberto) return null;

  const escolher = (fn: () => void) => () => {
    fn();
    setAberto(false);
  };

  const botao =
    "min-h-[44px] flex-1 rounded-full px-5 py-2.5 font-display text-[15px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex-none sm:min-w-[140px]";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookies-titulo"
      className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:px-6"
    >
      <div
        className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:gap-6"
        style={{ background: "#1B2430", color: "#FFFFFF", boxShadow: "0 18px 48px rgba(15,23,42,0.35)" }}
      >
        <p id="cookies-titulo" className="font-sans text-[14px] leading-[1.55] sm:text-[15px]">
          Usamos cookies essenciais para o site funcionar. Se você aceitar, também usamos o pixel da
          Meta para medir os nossos anúncios. Sem o seu aceite, o pixel não carrega. Veja a{" "}
          <a href="/privacidade" className="font-semibold underline underline-offset-4">
            Política de Privacidade
          </a>
          .
        </p>
        <div className="flex gap-3">
          <button
            ref={primeiroBotao}
            type="button"
            onClick={escolher(recusar)}
            className={`${botao} border border-white/70 bg-transparent text-white hover:bg-white/10`}
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={escolher(aceitar)}
            className={`${botao} border border-white bg-white text-[#1B2430] hover:bg-white/90`}
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

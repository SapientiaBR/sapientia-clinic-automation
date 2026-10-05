import { useLocation } from "react-router-dom";

/** Rotas que renderizam a landing inteira, onde as seções existem na página. */
const ROTAS_COM_SECOES = ["/", "/medico"];

/**
 * Link para uma seção da landing que funciona de qualquer rota.
 *
 * Na própria landing devolve "#planos", e a rolagem suave continua igual. Fora
 * dela, como em /calculadora, devolve "/#planos": sem isso o cabeçalho e a
 * faixa da turma apontariam para seções que não existem na página atual.
 */
export function useAncora(): (id: string) => string {
  const { pathname } = useLocation();
  const naLanding = ROTAS_COM_SECOES.includes(pathname);
  return (id: string) => (naLanding ? `#${id}` : `/#${id}`);
}

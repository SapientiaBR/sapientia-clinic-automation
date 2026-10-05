import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Posição de rolagem ao trocar de página.
 *
 * O React Router não mexe na rolagem. E links como "/#demo" (da calculadora)
 * ou "/#planos" (da rota do médico) recarregam a landing antes de a seção
 * existir: as seções abaixo da dobra carregam sob demanda, então o salto
 * nativo do navegador para a âncora não encontra o alvo.
 *
 * Só age quando a ROTA muda. Clique em âncora dentro da mesma página segue o
 * comportamento de antes, sem interferência.
 */
export function RolagemDeRota() {
  const { pathname, hash } = useLocation();
  const rotaAnterior = useRef<string | null>(null);

  useEffect(() => {
    const mudouDeRota = rotaAnterior.current !== pathname;
    rotaAnterior.current = pathname;
    if (!mudouDeRota) return;

    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // A seção pode montar alguns quadros depois da rota: tenta por até 1s.
    const id = decodeURIComponent(hash.slice(1));
    let tentativas = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tenta = () => {
      const alvo = document.getElementById(id);
      if (alvo) {
        alvo.scrollIntoView({ block: 'start' });
        return;
      }
      if (tentativas++ < 20) timer = setTimeout(tenta, 50);
    };
    tenta();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

export default RolagemDeRota;

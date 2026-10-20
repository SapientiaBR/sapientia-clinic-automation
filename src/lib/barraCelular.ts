import { useSyncExternalStore } from "react";

/**
 * Estado compartilhado entre a barra fixa do celular (MobileCtaBar) e o botão
 * flutuante do WhatsApp.
 *
 * Os dois moram em árvores diferentes — a barra é montada pela landing, o
 * botão pelo App — então um contexto exigiria um pai comum. Uma loja mínima
 * mantém os dois independentes.
 *
 * Serve para uma coisa só: o botão flutuante precisa subir acima da barra
 * quando ela está na tela, senão os dois se sobrepõem no rodapé.
 */
let visivel = false;
const listeners = new Set<() => void>();

export function setBarraVisivel(proximo: boolean) {
  if (proximo === visivel) return;
  visivel = proximo;
  listeners.forEach((ouvir) => ouvir());
}

function subscribe(ouvir: () => void) {
  listeners.add(ouvir);
  return () => {
    listeners.delete(ouvir);
  };
}

/**
 * `false` no servidor: a barra só existe no celular, e a marcação inicial não
 * deve reservar espaço para ela.
 */
export function useBarraVisivel() {
  return useSyncExternalStore(
    subscribe,
    () => visivel,
    () => false,
  );
}

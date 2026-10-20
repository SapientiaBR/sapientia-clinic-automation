import { useSyncExternalStore } from "react";

/**
 * Estado compartilhado entre a barra fixa do celular (MobileCtaBar) e o botão
 * flutuante do WhatsApp.
 *
 * Os dois moram em árvores diferentes — a barra é montada pela landing, o
 * botão pelo App — então um contexto exigiria um pai comum. Uma loja mínima
 * mantém os dois independentes.
 *
 * `barra`: a barra está na tela → o botão do WhatsApp sobe para não cobri-la.
 * `demo`: a seção do formulário está na tela → o botão do WhatsApp dá lugar a
 * ela, pelo mesmo motivo da barra: cobrir o botão de enviar é um estorvo.
 */
type Estado = { barra: boolean; demo: boolean };

let estado: Estado = { barra: false, demo: false };
const listeners = new Set<() => void>();

function mudar(chave: keyof Estado, valor: boolean) {
  if (estado[chave] === valor) return;
  estado = { ...estado, [chave]: valor };
  listeners.forEach((ouvir) => ouvir());
}

export const setBarraVisivel = (valor: boolean) => mudar("barra", valor);
export const setDemoVisivel = (valor: boolean) => mudar("demo", valor);

function subscribe(ouvir: () => void) {
  listeners.add(ouvir);
  return () => {
    listeners.delete(ouvir);
  };
}

/**
 * No servidor os dois são `false`: nenhum dos dois existe na marcação inicial,
 * e o HTML de partida não deve reservar espaço para eles.
 */
export function useBarraVisivel() {
  return useSyncExternalStore(
    subscribe,
    () => estado.barra,
    () => false,
  );
}

export function useDemoVisivel() {
  return useSyncExternalStore(
    subscribe,
    () => estado.demo,
    () => false,
  );
}

/**
 * O HTML pré-renderizado já mostra a página antes de o JavaScript chegar
 * (vite-plugin-prerender grava `data-prerendered` no #root). Quando o React
 * monta e troca esse conteúdo, uma animação de entrada que parte de
 * `opacity: 0` faria o título piscar: some e reaparece. `conteudoJaVisivel()`
 * diz, uma única vez, se este é o primeiro render sobre conteúdo estático, e
 * quem anima a entrada pula a animação nesse caso. Navegar depois entre rotas
 * anima normalmente.
 */
let pendente =
  typeof document !== "undefined" &&
  document.getElementById("root")?.dataset.prerendered === "true";

export function conteudoJaVisivel(): boolean {
  const eraPendente = pendente;
  pendente = false;
  return eraPendente;
}

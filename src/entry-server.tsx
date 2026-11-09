import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { AppRoutes } from "./App";

export { gerarLlmsTxt } from "./seo/llms";

/**
 * Entrada do pré-render (só roda no build, em Node, via vite-plugin-prerender).
 *
 * Renderiza as rotas da mesma árvore que o navegador usa, com as mesmas
 * strings, e devolve o HTML do corpo e as tags de <head> que o Helmet emitiu
 * para a rota. O chrome global (banner de cookies, botão flutuante do
 * WhatsApp, barra de rolagem) fica de fora de propósito: só existe no cliente.
 *
 * `onAllReady` espera os componentes preguiçosos (React.lazy) resolverem, para
 * o HTML sair completo e sem os marcadores de Suspense do streaming.
 */
export function render(url: string): Promise<{ html: string; head: string }> {
  const helmetContext: { helmet?: HelmetServerState } = {};

  return new Promise((resolve, reject) => {
    let html = "";
    const saida = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString();
        cb();
      },
      final(cb) {
        const h = helmetContext.helmet;
        const head = h
          ? [h.title, h.priority, h.meta, h.link, h.script, h.noscript, h.style]
              .map((x) => x?.toString() ?? "")
              .join("")
          : "";
        resolve({ html, head });
        cb();
      },
    });

    const { pipe, abort } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HelmetProvider>,
      {
        onAllReady() {
          pipe(saida);
        },
        onShellError: reject,
        onError(err) {
          reject(err);
          abort();
        },
      },
    );
    setTimeout(() => {
      reject(new Error(`Pré-render de ${url} passou de 20 s.`));
      abort();
    }, 20_000).unref();
  });
}

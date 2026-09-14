import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

/**
 * Serve, no dev, os assets que o Lovable guarda na CDN dele.
 *
 * O repositório versiona só ponteiros: `logo-si-v2.png.asset.json` traz uma
 * `url` do tipo `/__l5e/assets-v1/<id>/<arquivo>`, que existe no site publicado
 * e em lugar nenhum aqui. Os componentes importam o ponteiro e usam `.url`, o
 * que está certo para produção e deixa o localhost com imagem quebrada.
 *
 * Em vez de reescrever os imports — o que quebraria o build do Lovable —, este
 * plugin lê os ponteiros, monta o mapa `url → arquivo ao lado` e entrega o
 * binário que foi baixado para a pasta de assets. Nada disso vai para o bundle:
 * é middleware de servidor de desenvolvimento.
 *
 * Os binários estão no .gitignore de propósito: o vídeo da demonstração sozinho
 * tem 144 MB, e o ponteiro continua sendo a fonte da verdade.
 */
export function lovableAssets(dirAssets: string): Plugin {
  const tipos: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
  };

  function mapear(): Map<string, string> {
    const mapa = new Map<string, string>();
    if (!fs.existsSync(dirAssets)) return mapa;
    for (const nome of fs.readdirSync(dirAssets)) {
      if (!nome.endsWith(".asset.json")) continue;
      try {
        const meta = JSON.parse(fs.readFileSync(path.join(dirAssets, nome), "utf-8"));
        const real = path.join(dirAssets, nome.slice(0, -".asset.json".length));
        if (meta?.url && fs.existsSync(real)) mapa.set(meta.url, real);
      } catch {
        // Ponteiro malformado não derruba o servidor: o asset só não aparece.
      }
    }
    return mapa;
  }

  return {
    name: "lovable-assets-dev",
    apply: "serve",
    configureServer(server) {
      // Relido a cada pedido: baixar um asset novo passa a funcionar sem
      // reiniciar o servidor.
      server.middlewares.use((req, res, next) => {
        const caminho = (req.url || "").split("?")[0];
        if (!caminho.startsWith("/__l5e/")) return next();

        const arquivo = mapear().get(caminho);
        if (!arquivo) return next();

        const ext = path.extname(arquivo).toLowerCase();
        const tipo = tipos[ext] || "application/octet-stream";
        const total = fs.statSync(arquivo).size;

        // O <video> pede por faixa. Sem responder 206, o vídeo de 144 MB baixa
        // inteiro antes do primeiro quadro e não dá para arrastar a linha.
        const faixa = req.headers.range;
        if (faixa && tipo.startsWith("video/")) {
          const m = /bytes=(\d*)-(\d*)/.exec(faixa);
          const inicio = m && m[1] ? parseInt(m[1], 10) : 0;
          const fim = m && m[2] ? parseInt(m[2], 10) : total - 1;
          res.writeHead(206, {
            "Content-Type": tipo,
            "Content-Range": `bytes ${inicio}-${fim}/${total}`,
            "Accept-Ranges": "bytes",
            "Content-Length": fim - inicio + 1,
          });
          fs.createReadStream(arquivo, { start: inicio, end: fim }).pipe(res);
          return;
        }

        res.writeHead(200, {
          "Content-Type": tipo,
          "Content-Length": total,
          "Accept-Ranges": "bytes",
          "Cache-Control": "no-store",
        });
        fs.createReadStream(arquivo).pipe(res);
      });
    },
  };
}

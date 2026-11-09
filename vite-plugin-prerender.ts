import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { build, type Plugin, type ResolvedConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

/**
 * Pré-render por rota, no `vite build` puro (sem script extra no package.json,
 * sem navegador headless).
 *
 * Por que existe: o site é uma SPA e o HTML servido tinha `<div id="root">`
 * vazio. Os rastreadores de IA (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot)
 * não executam JavaScript e liam ~119 palavras. Aqui, depois do build do
 * cliente, o plugin faz um segundo build (SSR) de src/entry-server.tsx,
 * renderiza cada rota em Node e grava dist/<rota>/index.html com título, meta,
 * canonical, JSON-LD e o conteúdo real da página dentro do #root.
 *
 * O React não hidrata: `createRoot` troca o conteúdo ao montar (ver main.tsx),
 * então o HTML estático é o que se vê antes do JavaScript e o que o
 * rastreador lê. Texto e estrutura vêm dos mesmos componentes, não de uma cópia.
 *
 * O Helmet marca o que emite com `data-rh`; ao montar, o cliente troca essas
 * tags em vez de duplicá-las. Por isso o index.html não declara title,
 * description, canonical nem og:url/og:title: o plugin as injeta por rota.
 *
 * Também gera sitemap.xml (das rotas indexáveis) e 404.html.
 */

const SITE = "https://secretariainvisivel.com.br";
const INDEXAVEIS = ["/", "/medico"];
const NOINDEX = [
  "/assinar",
  "/obrigado",
  "/obrigado-demo",
  "/recepcionista",
  "/termos",
  "/dpa",
  "/privacidade",
  "/design-system-showcase",
];

type Render = (url: string) => Promise<{ html: string; head: string }>;
type ModuloSsr = { render: Render; gerarLlmsTxt: () => string };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function ultimaMudancaDeConteudo(raiz: string): string {
  try {
    const iso = execFileSync(
      "git",
      [
        "log",
        "-1",
        "--format=%cs",
        "--",
        "src/components/landing",
        "src/content",
        "src/seo",
        "src/config",
        "src/pages/Index.tsx",
        "src/pages/Medico.tsx",
      ],
      { cwd: raiz, stdio: ["ignore", "pipe", "ignore"] },
    )
      .toString()
      .trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  } catch {
    /* sem git no ambiente de build: usa a data do build */
  }
  return new Date().toISOString().slice(0, 10);
}

function montar(modelo: string, head: string, corpo: string, noindexPadrao = false): string {
  let h = modelo
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="title"[^>]*>\s*/i, "");
  const extra = noindexPadrao ? '<meta name="robots" content="noindex, nofollow" />\n    ' : "";
  h = h.replace("</head>", `    ${extra}${head}\n  </head>`);
  const marca = corpo ? ' data-prerendered="true"' : "";
  return h.replace('<div id="root"></div>', `<div id="root"${marca}>${corpo}</div>`);
}

export function prerender(): Plugin {
  let config: ResolvedConfig;

  return {
    name: "si-prerender",
    apply: "build",
    configResolved(c) {
      config = c;
    },
    async closeBundle() {
      // O build SSR interno também passa por aqui: não repetir.
      if (config.build.ssr) return;
      try {
        await gerar();
      } catch (e) {
        // Falha no pré-render não derruba a publicação: o site sai como SPA, com o
        // título de reserva do index.html, e o aviso fica no log do build.
        // PRERENDER_STRICT=1 faz o build falhar de vez (use no CI).
        if (process.env.PRERENDER_STRICT === "1") throw e;
        config.logger.error(
          `[prerender] FALHOU, o site sai sem HTML por rota: ${(e as Error).stack ?? e}`,
        );
      }
    },
  };

  async function gerar() {
    const raiz = config.root;
    const dist = path.resolve(raiz, config.build.outDir);
    const modeloPath = path.join(dist, "index.html");
    if (!fs.existsSync(modeloPath)) return;
    const modelo = fs.readFileSync(modeloPath, "utf-8");

    const saidaSsr = path.resolve(raiz, "node_modules/.cache/si-prerender");
    await build({
      configFile: false,
      root: raiz,
      mode: config.mode,
      logLevel: "warn",
      plugins: [react()],
      resolve: {
        alias: { "@": path.resolve(raiz, "./src") },
        dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
      },
      build: {
        ssr: path.resolve(raiz, "src/entry-server.tsx"),
        outDir: saidaSsr,
        emptyOutDir: true,
        copyPublicDir: false,
        minify: false,
        rollupOptions: { output: { format: "esm", entryFileNames: "entry-server.mjs" } },
      },
    });

    const mod = (await import(
      pathToFileURL(path.join(saidaSsr, "entry-server.mjs")).href
    )) as ModuloSsr;

    const gravar = (rota: string, conteudo: string) => {
      const destino =
        rota === "/" ? modeloPath : path.join(dist, rota.replace(/^\//, ""), "index.html");
      fs.mkdirSync(path.dirname(destino), { recursive: true });
      fs.writeFileSync(destino, conteudo);
      // Cópia em <rota>.html: hospedagens que resolvem "/medico" por "medico.html"
      // (Cloudflare Pages, sirv/vite preview) acham o arquivo sem depender da
      // pasta. Quem resolve por pasta usa medico/index.html. Mesmo conteúdo.
      if (rota !== "/") fs.writeFileSync(path.join(dist, `${rota.replace(/^\//, "")}.html`), conteudo);
    };

    // Rotas indexáveis: HTML completo.
    for (const rota of INDEXAVEIS) {
      const { html, head } = await mod.render(rota);
      gravar(rota, montar(modelo, head, html));
      config.logger.info(`[prerender] ${rota}  ${(html.length / 1024).toFixed(0)} kB de HTML`);
    }

    // Rotas noindex: só o <head> (noindex e título), corpo vazio.
    for (const rota of NOINDEX) {
      try {
        const { head } = await mod.render(rota);
        gravar(rota, montar(modelo, head, "", !/name="robots"/.test(head)));
      } catch (e) {
        config.logger.warn(
          `[prerender] ${rota}: sem head próprio (${(e as Error).message}); usando noindex padrão`,
        );
        gravar(rota, montar(modelo, '<title data-rh="true">Secretária Invisível</title>', "", true));
      }
    }

    // 404: noindex, sem canonical.
    const nf = await mod.render("/__nao-existe__");
    fs.writeFileSync(
      path.join(dist, "404.html"),
      montar(modelo, nf.head, nf.html, !/name="robots"/.test(nf.head)),
    );

    // llms.txt gerado das mesmas fontes da página (preço, FAQ, capacidades).
    fs.writeFileSync(path.join(dist, "llms.txt"), mod.gerarLlmsTxt());

    // Sitemap a partir da lista de rotas.
    const lastmod = ultimaMudancaDeConteudo(raiz);
    const urls = INDEXAVEIS.map(
      (r) =>
        `  <url>\n    <loc>${esc(SITE + r)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
    ).join("\n");
    fs.writeFileSync(
      path.join(dist, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    );
  }
}

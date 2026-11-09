import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { lovableAssets } from "./vite-plugin-lovable-assets";
import { prerender } from "./vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    // Resolve os ponteiros `*.asset.json` a partir dos binarios baixados.
    // So no dev: em producao o Lovable serve esses caminhos sozinho.
    lovableAssets(path.resolve(__dirname, "./src/assets")),
    mode === "development" && componentTagger(),
    // Grava dist/<rota>/index.html com o conteúdo de cada página, para SEO e para
    // rastreadores que não executam JavaScript. Só no build de produção.
    mode !== "development" && prerender(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    target: ["es2022", "chrome94", "firefox93", "safari16"],
    cssTarget: ["chrome94", "firefox93", "safari16"],
  },
}));

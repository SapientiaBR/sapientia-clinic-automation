import fs from "node:fs";
import path from "node:path";
import { gerarLlmsTxt } from "../src/seo/llms";

/** Regrava public/llms.txt a partir das mesmas fontes da página (npm run seo:llms). */
const destino = path.resolve(__dirname, "../public/llms.txt");
fs.writeFileSync(destino, gerarLlmsTxt());
console.log(`llms.txt gravado em ${destino}`);

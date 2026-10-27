import { Fragment, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Casca from "@/components/assinatura/Casca";
import termos from "@/content/juridico/termos.md?raw";
import dpa from "@/content/juridico/dpa.md?raw";
import privacidade from "@/content/juridico/privacidade.md?raw";

const DOCS = {
  termos: { titulo: "Termos de Serviço", texto: termos },
  dpa: { titulo: "Acordo de Tratamento de Dados (DPA)", texto: dpa },
  privacidade: { titulo: "Política de Privacidade", texto: privacidade },
};

type Doc = keyof typeof DOCS;

/** **negrito** é a única marcação dentro da linha que os textos usam. */
function linha(texto: string): ReactNode {
  return texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
    parte.startsWith("**") && parte.endsWith("**") ? (
      <strong key={i}>{parte.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{parte}</Fragment>
    ),
  );
}

const celulas = (l: string) =>
  l
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

/**
 * Markdown para JSX, no subconjunto que os textos jurídicos usam: títulos,
 * parágrafos, listas, tabelas e negrito. Os textos vêm do jurídico e não são
 * reescritos: os [colchetes] ficam como estão até o dono preencher.
 */
function renderizar(md: string): ReactNode[] {
  const linhas = md.replace(/\r\n/g, "\n").split("\n");
  const saida: ReactNode[] = [];
  let i = 0;
  while (i < linhas.length) {
    const l = linhas[i];
    if (!l.trim()) {
      i++;
      continue;
    }
    const titulo = /^(#{1,4})\s+(.*)$/.exec(l);
    if (titulo) {
      const nivel = titulo[1].length;
      const classe =
        nivel === 1
          ? "font-display text-[30px] font-normal leading-tight tracking-[-0.03em] sm:text-[36px]"
          : nivel === 2
            ? "font-display mt-10 text-[22px] font-semibold"
            : "font-display mt-6 text-[18px] font-semibold";
      const Tag = (nivel === 1 ? "h1" : nivel === 2 ? "h2" : "h3") as "h1";
      saida.push(
        <Tag key={i} className={classe}>
          {linha(titulo[2])}
        </Tag>,
      );
      i++;
      continue;
    }
    if (l.trim().startsWith("|")) {
      const bloco: string[] = [];
      while (i < linhas.length && linhas[i].trim().startsWith("|")) bloco.push(linhas[i++]);
      const [cab, , ...corpo] = bloco;
      saida.push(
        <div key={i} className="mt-5 overflow-x-auto rounded-xl border" style={{ borderColor: "#E5E7EB" }}>
          <table className="w-full min-w-[560px] border-collapse font-sans text-[14px] leading-[1.5]">
            <thead style={{ background: "#E6F6F2" }}>
              <tr>
                {celulas(cab).map((c, j) => (
                  <th key={j} className="border-b px-3 py-2 text-left font-semibold" style={{ borderColor: "#E5E7EB" }}>
                    {linha(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {corpo.map((r, k) => (
                <tr key={k}>
                  {celulas(r).map((c, j) => (
                    <td key={j} className="border-b px-3 py-2 align-top" style={{ borderColor: "#E5E7EB" }}>
                      {linha(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    const item = /^\s*(?:[-*]|\d+\.)\s+/;
    if (item.test(l)) {
      const ordenada = /^\s*\d+\./.test(l);
      const itens: string[] = [];
      while (i < linhas.length && item.test(linhas[i])) itens.push(linhas[i++].replace(item, ""));
      const Lista = (ordenada ? "ol" : "ul") as "ul";
      saida.push(
        <Lista key={i} className={`mt-4 space-y-2 pl-6 font-sans text-[16px] leading-[1.65] ${ordenada ? "list-decimal" : "list-disc"}`}>
          {itens.map((t, k) => (
            <li key={k}>{linha(t)}</li>
          ))}
        </Lista>,
      );
      continue;
    }
    const paragrafo: string[] = [];
    while (
      i < linhas.length &&
      linhas[i].trim() &&
      !/^#{1,4}\s/.test(linhas[i]) &&
      !linhas[i].trim().startsWith("|") &&
      !item.test(linhas[i])
    )
      paragrafo.push(linhas[i++].trim());
    saida.push(
      <p key={i} className="mt-4 font-sans text-[16px] leading-[1.7]">
        {linha(paragrafo.join(" "))}
      </p>,
    );
  }
  return saida;
}

/** /termos, /dpa e /privacidade: leitura em coluna única. */
const Juridico = ({ doc }: { doc: Doc }) => {
  const d = DOCS[doc];
  return (
    <Casca>
      <Helmet>
        <title>{`${d.titulo} | Secretária Invisível`}</title>
        {/* Até o dono revisar os textos com o advogado. */}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="mx-auto max-w-[48rem] px-4 py-8 sm:px-6 md:py-12">{renderizar(d.texto)}</main>
    </Casca>
  );
};

export default Juridico;

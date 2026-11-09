import { describe, expect, it } from "vitest";
import { PLANOS } from "@/config/si";
import { faqClinica, faqMedico } from "@/content/faq";
import { schemaLanding } from "@/seo/schema";
import { META_LANDING } from "@/seo/site";

describe("SEO das landings", () => {
  for (const v of ["clinica", "medico"] as const) {
    const m = META_LANDING[v];

    it(`${v}: title até 60 e description até 155 caracteres`, () => {
      expect(m.title.length).toBeLessThanOrEqual(60);
      expect(m.description.length).toBeLessThanOrEqual(155);
    });

    it(`${v}: canonical absoluto no domínio do site`, () => {
      expect(m.url).toMatch(/^https:\/\/secretariainvisivel\.com\.br\//);
    });

    it(`${v}: JSON-LD serializa e não declara avaliação`, () => {
      const json = JSON.stringify(schemaLanding(v));
      expect(() => JSON.parse(json)).not.toThrow();
      expect(json).not.toMatch(/AggregateRating|"Review"|ratingValue|reviewCount/);
    });

    it(`${v}: FAQPage tem as mesmas perguntas e respostas da tela`, () => {
      const faq = schemaLanding(v)["@graph"].find((x) => x["@type"] === "FAQPage") as {
        mainEntity: { name: string; acceptedAnswer: { text: string } }[];
      };
      const tela = v === "medico" ? faqMedico : faqClinica;
      expect(faq.mainEntity.map((q) => [q.name, q.acceptedAnswer.text])).toEqual(tela);
    });
  }

  it("preços do schema são os de src/config/si.ts (contexto/03)", () => {
    const grafo = schemaLanding("clinica")["@graph"] as { "@type": string; offers?: unknown }[];
    const sw = grafo.find((x) => x["@type"] === "SoftwareApplication") as {
      offers: { lowPrice: string; highPrice: string; offers: { name: string; price: string }[] };
    };
    expect(Number(sw.offers.lowPrice)).toBe(PLANOS.consultorio.valor);
    expect(Number(sw.offers.highPrice)).toBe(PLANOS.operacao.valor);
    const porNome = Object.fromEntries(sw.offers.offers.map((o) => [o.name, Number(o.price)]));
    expect(porNome["Plano Consultório"]).toBe(597);
    expect(porNome["Plano Clínica"]).toBe(897);
    expect(porNome["Plano Operação"]).toBe(1547);
  });
});

describe("llms.txt", () => {
  it("a cópia em public/ é a que o código gera (rode `npm run seo:llms` se falhar)", async () => {
    const fs = await import("node:fs");
    const { gerarLlmsTxt } = await import("@/seo/llms");
    const atual = fs.readFileSync("public/llms.txt", "utf-8").replace(/\r\n/g, "\n");
    expect(atual).toBe(gerarLlmsTxt());
  });

  it("traz os três preços da tabela e nenhum depoimento", async () => {
    const { gerarLlmsTxt } = await import("@/seo/llms");
    const t = gerarLlmsTxt();
    for (const p of Object.values(PLANOS)) expect(t).toContain(`R$ ${p.valorTxt}`);
    expect(t).not.toMatch(/Mariana|Fogarolli|depoimento/i);
  });
});

import { PLANOS, type Plano } from "@/config/si";
import { capacidadesClinica } from "@/content/capacidades";
import { faqClinica, faqMedico } from "@/content/faq";
import { META_LANDING, ORG, SITE_URL, type VarianteLanding } from "@/seo/site";

/**
 * JSON-LD por rota, num único @graph.
 *
 * Regras que este arquivo cumpre:
 * - preço só de PLANOS (src/config/si.ts), que bate com contexto/03;
 * - nenhum Review nem AggregateRating: a Secretária Invisível ainda não tem
 *   cliente pagante, então não há avaliação real para declarar;
 * - FAQPage com as mesmas perguntas e respostas que aparecem na tela;
 * - os planos oferecidos no schema são os que a rota mostra.
 */

const ID_ORG = `${ORG.url}#organization`;
const ID_SITE = `${SITE_URL}/#website`;

const CAPACIDADES = capacidadesClinica.map((c) => c.titulo);

const oferta = (p: Plano) => ({
  "@type": "Offer",
  name: `Plano ${p.nome}`,
  description: p.para,
  price: p.valor.toFixed(2),
  priceCurrency: "BRL",
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    price: p.valor.toFixed(2),
    priceCurrency: "BRL",
    billingDuration: 1,
    billingIncrement: 1,
    unitCode: "MON",
    unitText: "mês",
  },
  url: `${SITE_URL}/assinar?plano=${p.chave}`,
});

export function schemaLanding(variante: VarianteLanding) {
  const m = META_LANDING[variante];
  const idProduto = `${m.url}#produto`;
  const solo = variante === "medico";
  const perguntas = solo ? faqMedico : faqClinica;
  const planos = solo
    ? [PLANOS.consultorio]
    : [PLANOS.clinica, PLANOS.consultorio, PLANOS.operacao];
  const valores = planos.map((p) => p.valor);

  const ofertas =
    planos.length === 1
      ? oferta(planos[0])
      : {
          "@type": "AggregateOffer",
          lowPrice: Math.min(...valores).toFixed(2),
          highPrice: Math.max(...valores).toFixed(2),
          priceCurrency: "BRL",
          offerCount: planos.length,
          offers: planos.map(oferta),
        };

  const grafo: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": ID_ORG,
      name: ORG.nome,
      legalName: ORG.razaoSocial,
      url: ORG.url,
      address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" },
      sameAs: ORG.sameAs,
    },
    {
      "@type": "WebSite",
      "@id": ID_SITE,
      url: `${SITE_URL}/`,
      name: "Secretária Invisível",
      inLanguage: "pt-BR",
      publisher: { "@id": ID_ORG },
    },
    {
      "@type": "SoftwareApplication",
      "@id": idProduto,
      name: "Secretária Invisível",
      description: m.social,
      url: m.url,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "pt-BR",
      featureList: CAPACIDADES,
      audience: {
        "@type": "Audience",
        audienceType: solo
          ? "Profissionais de saúde e estética que atendem sozinhos"
          : "Clínicas e consultórios de saúde e estética",
      },
      provider: { "@id": ID_ORG },
      manufacturer: { "@id": ID_ORG },
      offers: ofertas,
    },
    {
      "@type": "WebPage",
      "@id": `${m.url}#webpage`,
      url: m.url,
      name: m.title,
      description: m.description,
      inLanguage: "pt-BR",
      isPartOf: { "@id": ID_SITE },
      about: { "@id": idProduto },
    },
    {
      "@type": "FAQPage",
      "@id": `${m.url}#faq`,
      mainEntity: perguntas.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];

  if (solo) {
    grafo.push({
      "@type": "BreadcrumbList",
      "@id": `${m.url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Secretária Invisível", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Para quem atende sozinho", item: m.url },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": grafo };
}

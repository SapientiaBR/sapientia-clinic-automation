import { PLANOS, precoTxt } from "@/config/si";

/**
 * Fonte única dos metadados de SEO por rota.
 *
 * Quem lê: a landing (Helmet, no navegador) e o pré-render do build
 * (src/entry-server.tsx → vite-plugin-prerender.ts, que grava o mesmo HTML
 * por rota em dist/). Preço vem de src/config/si.ts, nunca digitado aqui.
 */
export const SITE_URL = "https://secretariainvisivel.com.br";

/** A marca-mãe. Perfis conferidos no site da agência (sapientiabr.cloud). */
export const ORG = {
  nome: "Sapient.IA",
  razaoSocial: "Leonardo Gimenez Figueiredo Comercio e Consultoria Em Ti Ltda",
  url: "https://sapientiabr.cloud/",
  sameAs: [
    "https://sapientiabr.cloud/",
    "https://www.instagram.com/sapientia.br",
    "https://www.facebook.com/sapientia.ia",
    "https://www.linkedin.com/in/sapient-ia-automation-solutions-b397b7348/",
  ],
};

export type VarianteLanding = "clinica" | "medico";

export interface MetaLanding {
  path: string;
  url: string;
  title: string;
  description: string;
  /** og:description e twitter:description. */
  social: string;
}

const aPartirDe = precoTxt(PLANOS.consultorio);

/**
 * Title até 60 caracteres e description até 155 (conferidos em
 * src/seo/seo.test.ts). A palavra que a pessoa digita ("secretária
 * virtual") entra no title; a marca fecha.
 */
export const META_LANDING: Record<VarianteLanding, MetaLanding> = {
  clinica: {
    path: "/",
    url: `${SITE_URL}/`,
    title: "Secretária virtual para clínicas | Secretária Invisível",
    description: `Atende o WhatsApp da clínica, agenda no Google Agenda e retoma quem sumiu. Sua equipe acompanha e assume no painel. A partir de ${aPartirDe}/mês.`,
    social:
      "Atende no WhatsApp, agenda no Google Agenda, retoma quem sumiu e organiza pacientes num funil. Sua equipe acompanha e assume qualquer conversa num painel único.",
  },
  medico: {
    path: "/medico",
    url: `${SITE_URL}/medico`,
    title: "Secretária virtual para consultório | Secretária Invisível",
    description: `Para quem atende sozinho: cuida do WhatsApp do consultório, agenda no Google Agenda e retoma quem sumiu. Você acompanha num painel. ${aPartirDe}/mês.`,
    social:
      "Para quem atende sozinho: ela atende no WhatsApp, agenda no Google Agenda, retoma quem sumiu e organiza seus pacientes num funil. Você acompanha e assume qualquer conversa num painel.",
  },
};

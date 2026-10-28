/**
 * Configuração da assinatura online.
 *
 * É o único arquivo que o dono edita para pôr a venda no ar: os três links de
 * pagamento do Asaas, as URLs dos webhooks do n8n e a versão dos termos. Os
 * cards, a /assinar e o FAQ leem os planos daqui, para nenhum preço ser
 * digitado à mão em outro lugar. Os valores vêm de contexto/03-precificacao.md.
 */
export const SI_CONFIG = {
  versaoTermos: "1.1",
  pixelId: "1150165570508883",
  clarityId: "wp77kiz728",
  whatsappSofia: "5511920795583",
  /** Caixa de ciência do WhatsApp não oficial na /assinar. */
  exigirCienciaWhatsApp: true,
  asaas: {
    consultorio: "{{ASAAS_LINK_CONSULTORIO}}",
    clinica: "{{ASAAS_LINK_CLINICA}}",
    operacao: "{{ASAAS_LINK_OPERACAO}}",
  },
  webhooks: {
    aceite: "https://n8n.sapientiabr.cloud/webhook/si-assinatura-aceite-4d8e2b71",
    implantacao: "https://n8n.sapientiabr.cloud/webhook/si-implantacao-form-9a3c5e10",
  },
};

export type ChavePlano = "consultorio" | "clinica" | "operacao";

export interface Plano {
  chave: ChavePlano;
  nome: string;
  /** "Para 1 profissional" */
  para: string;
  /** Linha curta do card: "2 a 3 profissionais" */
  perfil: string;
  valor: number;
  /** "597", "1.547" */
  valorTxt: string;
  /** O que o plano resolve, em uma linha, antes da lista. */
  promessa: string;
  /** Plano cujos recursos este herda; o card mostra "Tudo do X +". */
  herdaDe?: ChavePlano;
  /** Só o que este plano acrescenta ao que herda. */
  recursos: string[];
}

/**
 * Escopo por plano (decisão do Leo em 27/10, sem mudança de preço):
 * atendimento, agendamento no Google Agenda, follow-up, funil e painel valem
 * nos três planos.
 */
export const PLANOS: Record<ChavePlano, Plano> = {
  consultorio: {
    chave: "consultorio",
    nome: "Consultório",
    para: "Para 1 profissional",
    perfil: "1 profissional",
    valor: 597,
    valorTxt: "597",
    promessa: "Nenhum paciente sem resposta enquanto você atende.",
    recursos: [
      "Atendimento 24h no WhatsApp",
      "Agendamento",
      "Integração com Google Agenda",
      "Follow-up de quem sumiu",
      "Funil de pacientes",
      "Painel para a equipe acompanhar e assumir conversas",
      "Respostas às dúvidas frequentes",
      "Confirmação do agendamento",
      "1 agenda",
      "1 ajuste por mês",
    ],
  },
  clinica: {
    chave: "clinica",
    nome: "Clínica",
    para: "Para 2 a 3 profissionais",
    perfil: "2 a 3 profissionais",
    valor: 897,
    valorTxt: "897",
    promessa: "Menos cadeira vazia e recepção livre para o balcão.",
    herdaDe: "consultorio",
    recursos: [
      "Lembrete para reduzir faltas",
      "Remarcação pelo WhatsApp",
      "Perguntas antes da consulta",
      "Entende mensagens de áudio",
      "Até 3 agendas",
      "2 ajustes por mês",
    ],
  },
  operacao: {
    chave: "operacao",
    nome: "Operação",
    para: "Para 4 ou mais profissionais, ou rede",
    perfil: "4+ profissionais ou rede",
    valor: 1547,
    valorTxt: "1.547",
    promessa: "O mesmo padrão em todas as agendas, sem depender de quem está na recepção.",
    herdaDe: "clinica",
    recursos: ["Agendas ilimitadas", "Suporte prioritário (4h úteis)", "1 ajuste por semana"],
  },
};

/** Ajustes por mês são do plano, não somam com os do plano herdado. */
const ehAjuste = (r: string) => /ajuste/i.test(r);
const ehAgenda = (r: string) => /^(1 agenda|Até 3 agendas)$/.test(r);

/**
 * A lista inteira do plano, com o que ele herda, para a /assinar.
 *
 * O card mostra "Tudo do Consultório +" e só o que muda; o resumo do contrato
 * precisa da lista completa. Quantidade de agendas e de ajustes não se
 * acumula: o plano de cima substitui a do de baixo.
 */
export function recursosCompletos(chave: ChavePlano): string[] {
  const p = PLANOS[chave];
  const herdados = p.herdaDe ? recursosCompletos(p.herdaDe) : [];
  const substitui = (r: string) =>
    (ehAjuste(r) && p.recursos.some(ehAjuste)) ||
    (ehAgenda(r) && p.recursos.some((x) => ehAgenda(x) || /Agendas ilimitadas/.test(x)));
  return [...herdados.filter((r) => !substitui(r)), ...p.recursos];
}

export const ehChavePlano = (v: string | null): v is ChavePlano =>
  v === "consultorio" || v === "clinica" || v === "operacao";

/** Um link do Asaas ainda não preenchido continua como {{...}}. */
export const linkAsaasConfigurado = (chave: ChavePlano) =>
  !/^\{\{.*\}\}$/.test(SI_CONFIG.asaas[chave]) && /^https:\/\//.test(SI_CONFIG.asaas[chave]);

export const waSofia = (texto?: string) =>
  `https://wa.me/${SI_CONFIG.whatsappSofia}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;

/** "R$ 1.547" */
export const precoTxt = (p: Plano) => `R$ ${p.valorTxt}`;

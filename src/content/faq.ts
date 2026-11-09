import { implantacaoFormatada } from "@/config/turma";
import { PLANOS, precoTxt } from "@/config/si";

/**
 * As perguntas e respostas de cada rota.
 *
 * Moram aqui, num módulo sem React, porque três lugares leem as mesmas
 * strings: a seção de FAQ da página, o JSON-LD de FAQPage (src/seo/schema.ts)
 * e o HTML pré-renderizado no build. O dado estruturado e o que está na tela
 * precisam dizer a mesma coisa, ou o Google marca divergência.
 */
type Entrada = [string, string];

/**
 * As perguntas de cada rota.
 *
 * O `Index` tambem usa estas listas para montar o JSON-LD de FAQPage, entao
 * elas ficam exportadas: o dado estruturado e o que esta na tela precisam
 * dizer a mesma coisa, ou o Google marca divergencia.
 */
const ofertaImplantacao = `A implantação custa ${implantacaoFormatada} e sai sem cobrança para quem assinar até o fim do mês.`;

const fidelidade = `Tem. A assinatura é de 12 meses, cobrada mês a mês, porque a implantação de ${implantacaoFormatada} sai sem cobrança. Se cancelar antes dos 12 meses, a multa é de 30% das mensalidades que faltam. Depois dos 12 meses, a assinatura segue mês a mês e pode ser cancelada com 30 dias de aviso, sem multa.`;

export const faqClinica: Entrada[] = [
  [
    "Substitui minha recepcionista?",
    "Não. Ela assume o volume. Sua equipe cuida do que precisa de atenção humana.",
  ],
  [
    "Preciso trocar meu número?",
    "Não. Usamos o número que seus pacientes já conhecem.",
  ],
  [
    "Ela dá orientação médica?",
    "Não. Questões clínicas vão para a equipe, com toda a conversa.",
  ],
  [
    "Quanto custa?",
    `Consultório ${precoTxt(PLANOS.consultorio)}, Clínica ${precoTxt(PLANOS.clinica)} e Operação ${precoTxt(PLANOS.operacao)} por mês, conforme o número de profissionais. ${ofertaImplantacao}`,
  ],
  [
    "Tem fidelidade?",
    fidelidade,
  ],
];

export const faqMedico: Entrada[] = [
  [
    "Serve para quem atende sozinho?",
    "Sim. O Consultório foi feito para isso: você atende, ela cuida do resto.",
  ],
  [
    "Preciso trocar meu número?",
    "Não. Usamos o número que seus pacientes já conhecem.",
  ],
  [
    "Ela dá orientação médica?",
    "Não. Questões clínicas vão para você, com toda a conversa.",
  ],
  [
    "Quanto custa?",
    `O plano Consultório custa ${precoTxt(PLANOS.consultorio)} por mês. ${ofertaImplantacao}`,
  ],
  [
    "Tem fidelidade?",
    fidelidade,
  ],
];

/** Mantido para quem ainda importa o nome antigo. */
export const faqEntries = faqClinica;
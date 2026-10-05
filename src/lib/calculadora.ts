/**
 * Calculadora da Recepção.
 *
 * Isca de topo de funil, portão de qualificação e roteador de plano no mesmo
 * objeto. Determinística, sem chamada a API: a conta inteira acontece no
 * navegador, e a clínica vê cada linha dela.
 *
 * Regra de posicionamento que este arquivo carrega: o resultado compara com o
 * que se perde, nunca com quem se paga. Nenhuma string daqui pode sugerir troca
 * de pessoa por sistema, e a frase de contenção sobre "não o que você recupera"
 * é obrigatória, porque sem ela o número vira promessa de recuperação.
 */
import type { NomePlano } from "@/config/planos";

const DIAS_UTEIS_MES = 22;
const SEMANAS_MES = 4.33;

const naoNegativo = (n: unknown): number => {
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

const percentual = (n: unknown): number => Math.min(naoNegativo(n), 100) / 100;

export interface EntradaCalculadora {
  mensagensPorDia: number;
  percentualForaHorario: number;
  ticketConsulta: number;
  faltasPorSemana: number;
  /** De cada 100 mensagens fora do horário, quantas virariam consulta. Padrão 30. */
  taxaConversao?: number;
}

export interface ResultadoCalculadora {
  mensagensForaHorarioMes: number;
  consultasNaoMarcadasMes: number;
  perdaMensagemSemResposta: number;
  perdaFaltas: number;
  perdaTotalMes: number;
  suposicoes: string[];
}

export function calcularPerdaRecepcao({
  mensagensPorDia,
  percentualForaHorario,
  ticketConsulta,
  faltasPorSemana,
  taxaConversao = 30,
}: EntradaCalculadora): ResultadoCalculadora {
  const msgDia = naoNegativo(mensagensPorDia);
  const ticket = naoNegativo(ticketConsulta);
  const faltas = naoNegativo(faltasPorSemana);

  const mensagensForaHorarioMes = msgDia * DIAS_UTEIS_MES * percentual(percentualForaHorario);
  const consultasNaoMarcadasMes = mensagensForaHorarioMes * percentual(taxaConversao);
  const perdaMensagemSemResposta = consultasNaoMarcadasMes * ticket;
  const perdaFaltas = faltas * SEMANAS_MES * ticket;

  return {
    mensagensForaHorarioMes,
    consultasNaoMarcadasMes,
    perdaMensagemSemResposta,
    perdaFaltas,
    perdaTotalMes: perdaMensagemSemResposta + perdaFaltas,
    suposicoes: [
      "Mês considerado com 22 dias úteis.",
      "Mês considerado com 4,33 semanas.",
      `De cada 100 mensagens fora do horário, ${Math.round(percentual(taxaConversao) * 100)} virariam consulta marcada. Você ajusta esse número.`,
      "O resultado é o que passa pela recepção fora do horário, não o que você recupera.",
    ],
  };
}

export interface EntradaQualificacao {
  profissionais: number;
  mensagensPorDia: number;
  whatsappCanalPrincipal: boolean;
}

export interface ResultadoQualificacao {
  pontos: number;
  qualificado: boolean;
  planoSugerido: NomePlano;
  motivo: string;
}

/**
 * Os dois cortes vêm do ICP: clínica sem WhatsApp como canal principal e
 * operação abaixo de 20 atendimentos por mês não são público. Quem cai num
 * corte ainda vê a conta, só não vai para a demonstração.
 */
export function pontuarClinica({
  profissionais,
  mensagensPorDia,
  whatsappCanalPrincipal,
}: EntradaQualificacao): ResultadoQualificacao {
  const profs = naoNegativo(profissionais);
  const msgDia = naoNegativo(mensagensPorDia);

  const planoSugerido: NomePlano = profs >= 4 ? "Operação" : profs >= 2 ? "Clínica" : "Consultório";

  if (!whatsappCanalPrincipal) {
    return {
      pontos: 0,
      qualificado: false,
      planoSugerido,
      motivo: "O WhatsApp não é o canal principal de agendamento desta clínica.",
    };
  }
  if (msgDia < 1) {
    return {
      pontos: 0,
      qualificado: false,
      planoSugerido,
      motivo: "O volume informado fica abaixo da operação mínima que atendemos.",
    };
  }

  const pontos = Math.min(100, Math.round(profs * 15 + Math.min(msgDia, 60)));
  return {
    pontos,
    qualificado: true,
    planoSugerido,
    motivo: `Operação com ${profs} profissional(is) e volume diário de ${msgDia} mensagens.`,
  };
}

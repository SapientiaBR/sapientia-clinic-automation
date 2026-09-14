/**
 * Turma de implantação.
 *
 * Os três primeiros valores são os únicos que se mexe à mão. Tudo o mais —
 * nome do mês, último dia, dias restantes — é calculado a partir da data.
 */
export const VAGAS_POR_TURMA = 5;
export const VAGAS_PREENCHIDAS = 2; // atualizar manualmente com o número real
export const VALOR_IMPLANTACAO = 2997;

const FUSO = "America/Sao_Paulo";

/**
 * A data de hoje no fuso de São Paulo, não no fuso do visitante.
 *
 * Isso importa mais do que parece: alguém abrindo o site de Lisboa às 00h30
 * já virou o mês lá, e veria "turma de outubro" enquanto a turma de setembro
 * ainda está aberta aqui. `en-CA` é um atalho conhecido para obter AAAA-MM-DD
 * do `Intl` sem montar a string peça por peça.
 */
function hojeEmSaoPaulo(): Date {
  const iso = new Intl.DateTimeFormat("en-CA", {
    timeZone: FUSO,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const [ano, mes, dia] = iso.split("-").map(Number);
  // Meio-dia evita que qualquer conversão de fuso empurre a data um dia.
  return new Date(ano, mes - 1, dia, 12, 0, 0);
}

function nomeDoMes(data: Date): string {
  const nome = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(data);
  return nome.charAt(0).toUpperCase() + nome.slice(1);
}

export interface Turma {
  /** "Setembro" */
  mes: string;
  /** "Outubro" */
  proximoMes: string;
  /** Último dia do mês corrente: 30, 31… */
  ultimoDia: number;
  /** Número do mês corrente, com zero à esquerda: "09" */
  numeroMes: string;
  /** Quantos dias faltam até o fim do mês. Zero no último dia. */
  diasRestantes: number;
  total: number;
  preenchidas: number;
  restantes: number;
  lotada: boolean;
  /** "09/2026" — vai no campo oculto do formulário. */
  etiqueta: string;
}

export function turmaAtual(): Turma {
  const hoje = hojeEmSaoPaulo();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();

  // Dia 0 do mês seguinte é o último dia deste mês.
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();
  const diasRestantes = ultimoDia - hoje.getDate();

  const restantes = Math.max(0, VAGAS_POR_TURMA - VAGAS_PREENCHIDAS);
  const numeroMes = String(mes + 1).padStart(2, "0");

  return {
    mes: nomeDoMes(hoje),
    proximoMes: nomeDoMes(new Date(ano, mes + 1, 1)),
    ultimoDia,
    numeroMes,
    diasRestantes,
    total: VAGAS_POR_TURMA,
    preenchidas: Math.min(VAGAS_PREENCHIDAS, VAGAS_POR_TURMA),
    restantes,
    lotada: restantes === 0,
    etiqueta: `${numeroMes}/${ano}`,
  };
}

/** "R$2.997" — usado no preço riscado da implantação. */
export const implantacaoFormatada = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(VALOR_IMPLANTACAO);

/**
 * Oferta do mês da implantação.
 *
 * A implantação custa R$ 2.997. Quem assina até o último dia do mês não paga
 * a implantação, e a oferta se repete todo mês com a data do mês corrente.
 * Não existe contador de vagas: a data é o único limite, e ela sai do
 * calendário, no fuso de São Paulo.
 *
 * O nome do arquivo e da função continua "turma" porque o formulário de
 * demonstração já manda a etiqueta do mês nesse campo para o n8n.
 */
export const VALOR_IMPLANTACAO = 2997;

const FUSO = "America/Sao_Paulo";

/**
 * A data de hoje no fuso de São Paulo, não no fuso do visitante.
 *
 * Isso importa mais do que parece: alguém abrindo o site de Lisboa às 00h30
 * já virou o mês lá, e veria a data de novembro enquanto a oferta de outubro
 * ainda está valendo aqui. `en-CA` é um atalho conhecido para obter AAAA-MM-DD
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
  /** "Outubro" */
  mes: string;
  /** Último dia do mês corrente: 30, 31… */
  ultimoDia: number;
  /** Número do mês corrente, com zero à esquerda: "10" */
  numeroMes: string;
  /** Quantos dias faltam até o fim do mês. Zero no último dia. */
  diasRestantes: number;
  /** "31/10", a data que aparece em toda frase da oferta. */
  fimDoMes: string;
  /** "10/2026" — vai no campo oculto do formulário. */
  etiqueta: string;
}

export function turmaAtual(): Turma {
  const hoje = hojeEmSaoPaulo();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();

  // Dia 0 do mês seguinte é o último dia deste mês.
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();
  const numeroMes = String(mes + 1).padStart(2, "0");

  return {
    mes: nomeDoMes(hoje),
    ultimoDia,
    numeroMes,
    diasRestantes: ultimoDia - hoje.getDate(),
    fimDoMes: `${ultimoDia}/${numeroMes}`,
    etiqueta: `${numeroMes}/${ano}`,
  };
}

/** Atalho para as frases que só precisam da data: "31/10". */
export const fimDoMes = () => turmaAtual().fimDoMes;

/** "R$ 2.997" */
export const implantacaoFormatada = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(VALOR_IMPLANTACAO);

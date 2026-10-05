/**
 * Planos da Secretária Invisível.
 *
 * Fonte única dos valores no site. A fonte de verdade fora do código é
 * `contexto/03-precificacao.md`, no workspace da Sapient.IA: mudar um preço
 * aqui sem mudar lá faz os dois divergirem sem ninguém perceber.
 *
 * Mesma lógica de `turma.ts`: o número vive num lugar só, e quem mostra
 * preço (a seção de planos, a calculadora) importa daqui.
 */
export type NomePlano = "Consultório" | "Clínica" | "Operação";

export interface Plano {
  nome: NomePlano;
  mensal: number;
  perfil: string;
}

export const PLANOS: Record<NomePlano, Plano> = {
  Consultório: { nome: "Consultório", mensal: 597, perfil: "1 médico" },
  Clínica: { nome: "Clínica", mensal: 897, perfil: "2 a 3 profissionais" },
  Operação: { nome: "Operação", mensal: 1547, perfil: "4+ profissionais ou rede" },
};

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * "R$897", sem espaço entre o símbolo e o número, que é como o site sempre
 * escreveu. O `Intl` põe um espaço não separável depois do "R$"; removido
 * para o texto renderizado não mudar.
 */
export function precoFormatado(nome: NomePlano): string {
  return brl.format(PLANOS[nome].mensal).replace(/\s/g, "");
}

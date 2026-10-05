import { describe, it, expect } from "vitest";
import { calcularPerdaRecepcao, pontuarClinica } from "./calculadora";
import { precoFormatado } from "@/config/planos";

const DIAS_UTEIS = 22;
const SEMANAS = 4.33;

const base = {
  mensagensPorDia: 40,
  percentualForaHorario: 25,
  ticketConsulta: 300,
  faltasPorSemana: 3,
  taxaConversao: 30,
};

describe("calcularPerdaRecepcao", () => {
  it("calcula mensagens fora do horário no mês", () => {
    expect(calcularPerdaRecepcao(base).mensagensForaHorarioMes).toBe(40 * DIAS_UTEIS * 0.25);
  });

  it("consultas não marcadas usam a taxa de conversão informada", () => {
    expect(calcularPerdaRecepcao(base).consultasNaoMarcadasMes).toBe(40 * DIAS_UTEIS * 0.25 * 0.3);
  });

  it("perda por falta usa 4,33 semanas no mês", () => {
    expect(calcularPerdaRecepcao(base).perdaFaltas).toBe(3 * SEMANAS * 300);
  });

  it("perda total é a soma das duas perdas", () => {
    const r = calcularPerdaRecepcao(base);
    expect(r.perdaTotalMes).toBe(r.perdaMensagemSemResposta + r.perdaFaltas);
  });

  it("o caso de referência fecha em R$ 23.697", () => {
    expect(Math.round(calcularPerdaRecepcao(base).perdaTotalMes)).toBe(23697);
  });

  it("entrada zerada devolve perda zero, sem NaN", () => {
    const r = calcularPerdaRecepcao({
      mensagensPorDia: 0, percentualForaHorario: 0, ticketConsulta: 0, faltasPorSemana: 0, taxaConversao: 30,
    });
    expect(r.perdaTotalMes).toBe(0);
    expect(Number.isFinite(r.perdaTotalMes)).toBe(true);
  });

  it("entrada negativa é tratada como zero", () => {
    const r = calcularPerdaRecepcao({
      mensagensPorDia: -10, percentualForaHorario: -5, ticketConsulta: -300, faltasPorSemana: -1, taxaConversao: 30,
    });
    expect(r.perdaTotalMes).toBe(0);
  });

  it("percentual acima de 100 é limitado a 100", () => {
    const r = calcularPerdaRecepcao({
      mensagensPorDia: 10, percentualForaHorario: 250, ticketConsulta: 100, faltasPorSemana: 0, taxaConversao: 100,
    });
    expect(r.mensagensForaHorarioMes).toBe(10 * DIAS_UTEIS);
  });

  it("devolve as suposições declaradas, incluindo a frase de contenção", () => {
    const r = calcularPerdaRecepcao(base);
    expect(r.suposicoes.length).toBeGreaterThanOrEqual(3);
    expect(r.suposicoes.some((s) => s.includes("22"))).toBe(true);
    expect(r.suposicoes.some((s) => s.includes("4,33"))).toBe(true);
    expect(r.suposicoes.some((s) => s.includes("não o que você recupera"))).toBe(true);
  });
});

describe("pontuarClinica", () => {
  it("um profissional sugere o plano Consultório", () => {
    expect(pontuarClinica({ profissionais: 1, mensagensPorDia: 30, whatsappCanalPrincipal: true }).planoSugerido).toBe("Consultório");
  });

  it("três profissionais sugerem o plano Clínica", () => {
    expect(pontuarClinica({ profissionais: 3, mensagensPorDia: 60, whatsappCanalPrincipal: true }).planoSugerido).toBe("Clínica");
  });

  it("quatro ou mais profissionais sugerem o plano Operação", () => {
    expect(pontuarClinica({ profissionais: 6, mensagensPorDia: 90, whatsappCanalPrincipal: true }).planoSugerido).toBe("Operação");
  });

  it("sem WhatsApp como canal principal desqualifica", () => {
    const p = pontuarClinica({ profissionais: 3, mensagensPorDia: 60, whatsappCanalPrincipal: false });
    expect(p.qualificado).toBe(false);
    expect(p.motivo).toMatch(/WhatsApp/);
  });

  it("volume muito baixo desqualifica", () => {
    expect(pontuarClinica({ profissionais: 1, mensagensPorDia: 0, whatsappCanalPrincipal: true }).qualificado).toBe(false);
  });

  it("clínica dentro do ICP é qualificada", () => {
    expect(pontuarClinica({ profissionais: 2, mensagensPorDia: 45, whatsappCanalPrincipal: true }).qualificado).toBe(true);
  });
});

describe("precoFormatado", () => {
  it("mantém o formato que o site já usa, sem espaço depois do R$", () => {
    expect(precoFormatado("Consultório")).toBe("R$597");
    expect(precoFormatado("Clínica")).toBe("R$897");
  });

  it("usa ponto de milhar no plano Operação", () => {
    expect(precoFormatado("Operação")).toBe("R$1.547");
  });
});

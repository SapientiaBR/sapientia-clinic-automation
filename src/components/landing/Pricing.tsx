import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Check, ArrowRight } from "lucide-react";
import { revealOnScroll } from "@/lib/animations";
import { implantacaoFormatada, turmaAtual } from "@/config/turma";
import { precoFormatado } from "@/config/planos";

type Plano = {
  chave: string;
  nome: string;
  preco: string;
  perfil: string;
  /** Uma linha dizendo o que o plano resolve, antes da lista de recursos. */
  promessa: string;
  destaque: boolean;
  herdaDe?: string;
  recursos: string[];
};

/**
 * Ordem deliberada: o Clínica vem primeiro.
 *
 * É o plano recomendado, e num celular a ordem da coluna é a ordem de leitura
 * — deixar o mais barato no topo faz o visitante ancorar no menor preço antes
 * de ver o que o do meio entrega.
 */
const planos: Plano[] = [
  {
    chave: "clinica",
    nome: "Clínica",
    preco: precoFormatado("Clínica"),
    perfil: "2 a 3 profissionais",
    promessa: "Menos cadeira vazia e recepção livre para o balcão.",
    destaque: true,
    herdaDe: "Consultório",
    recursos: [
      "Lembrete anti-falta",
      "Remarcação pelo WhatsApp",
      "Perguntas antes da consulta",
      "Google Agenda",
      "Entende áudio",
      "Até 3 agendas",
      "2 ajustes/mês",
    ],
  },
  {
    chave: "consultorio",
    nome: "Consultório",
    preco: precoFormatado("Consultório"),
    perfil: "1 médico",
    promessa: "Nenhum paciente sem resposta enquanto você atende.",
    destaque: false,
    recursos: [
      "Atendimento 24h",
      "Agendamento",
      "Dúvidas frequentes",
      "Confirmação do agendamento",
      "1 agenda",
      "1 ajuste/mês",
    ],
  },
  {
    chave: "operacao",
    nome: "Operação",
    preco: precoFormatado("Operação"),
    perfil: "4+ profissionais ou rede",
    promessa: "O mesmo padrão em todas as agendas, sem depender de quem está na recepção.",
    destaque: false,
    herdaDe: "Clínica",
    recursos: ["Agendas ilimitadas", "Suporte prioritário (4h úteis)", "1 ajuste/semana"],
  },
];

/** O card único da rota do médico solo. */
const planoSolo: Plano = {
  chave: "consultorio",
  nome: "Consultório",
  preco: precoFormatado("Consultório"),
  perfil: "1 médico",
  promessa: "Nenhum paciente sem resposta enquanto você atende.",
  destaque: true,
  recursos: [
    "Atendimento 24h",
    "Agendamento",
    "Dúvidas frequentes",
    "Confirmação do agendamento",
    "Histórico no painel",
    "1 ajuste/mês",
  ],
};

const IconeCheck = () => (
  <span
    className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
    style={{ background: "#D6F3EE" }}
  >
    <Check size={12} strokeWidth={3} style={{ color: "#0A8C7E" }} />
  </span>
);

/** Linha da implantação, repetida em todo card. */
const LinhaImplantacao = ({ destaque }: { destaque: boolean }) => {
  const t = turmaAtual();
  const corFraca = destaque ? "rgba(255,255,255,0.75)" : "#6B7280";
  const corForte = destaque ? "#FFFFFF" : "#055449";

  if (t.lotada) {
    return (
      <p className="font-sans mt-3 text-[14px]" style={{ color: corFraca }}>
        Implantação {implantacaoFormatada}
      </p>
    );
  }
  return (
    <p className="font-sans mt-3 text-[14px]" style={{ color: corFraca }}>
      Implantação <s>{implantacaoFormatada}</s>{" "}
      <strong className="font-semibold" style={{ color: corForte }}>
        R$0
      </strong>{" "}
      na turma de {t.mes}
    </p>
  );
};

const Card = ({ p }: { p: Plano }) => (
  <div
    data-reveal
    className="relative flex flex-col overflow-hidden rounded-3xl"
    style={{
      background: "#FFFFFF",
      border: p.destaque ? "2px solid #0FB5A3" : "1px solid #D6F3EE",
      boxShadow: p.destaque
        ? "0 28px 60px rgba(15, 181, 163,0.22)"
        : "0 16px 36px rgba(15, 23, 42,0.06)",
    }}
  >
    {p.destaque && (
      <span
        className="absolute right-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
        style={{ background: "#1F2937", color: "#FFFFFF" }}
      >
        Recomendado
      </span>
    )}

    <div
      className="p-6 md:p-7"
      style={
        p.destaque
          ? { background: "linear-gradient(180deg, #0FB5A3 0%, #0A8C7E 100%)", color: "#FFFFFF" }
          : { background: "#F1FBF8" }
      }
    >
      <p
        className="font-display-sans text-[13px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: p.destaque ? "rgba(255,255,255,0.92)" : "#0A8C7E" }}
      >
        {p.nome}
      </p>
      <p
        className="font-sans mt-1.5 text-[13px] leading-snug"
        style={{ color: p.destaque ? "rgba(255,255,255,0.92)" : "var(--text-muted)" }}
      >
        {p.perfil}
      </p>
      <p
        className="font-sans mt-3 text-[15px] leading-snug"
        style={{ color: p.destaque ? "#FFFFFF" : "var(--text)" }}
      >
        {p.promessa}
      </p>
      <p
        className="font-display-sans mt-4 text-4xl font-normal tracking-[-0.04em]"
        style={{ color: p.destaque ? "#FFFFFF" : "#1F2937" }}
      >
        {p.preco}
        <span
          className="font-sans text-sm font-normal"
          style={{ color: p.destaque ? "rgba(255,255,255,0.85)" : "var(--text-muted)" }}
        >
          /mês
        </span>
      </p>
      <LinhaImplantacao destaque={p.destaque} />
    </div>

    <div className="flex flex-1 flex-col p-6 md:p-7">
      {p.herdaDe && (
        <p
          className="font-display-sans mb-4 border-b pb-3 text-[13px] font-semibold uppercase tracking-[0.08em]"
          style={{ color: "#0A8C7E", borderColor: "#E5E7EB" }}
        >
          Tudo do {p.herdaDe} +
        </p>
      )}
      <ul className="flex-1 space-y-3">
        {p.recursos.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <IconeCheck />
            <span className="font-sans text-[16px] leading-snug text-[var(--text)]">{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#demo"
        className={
          "group mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-display text-[15px] font-bold transition-all duration-300 " +
          (p.destaque
            ? "gradient-brand text-white shadow-[0_14px_30px_rgba(15, 181, 163,0.32)] hover:-translate-y-0.5"
            : "border border-[#0FB5A3] bg-white text-[#055449] hover:bg-[#F1FBF8]")
        }
      >
        <span>Quero minha vaga</span>
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  </div>
);

type Props = {
  /** "solo" mostra só o Consultório, para a rota do médico. */
  variante?: "clinica" | "solo";
};

const Pricing = ({ variante = "clinica" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });
  const solo = variante === "solo";

  return (
    <section id="planos" className="relative scroll-mt-24 py-14 md:section-padding" ref={ref}>
      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p
          className="font-sans mx-auto mb-8 max-w-2xl text-center text-[17px] leading-[1.6] text-[var(--text)] md:mb-10"
          data-reveal
        >
          {solo
            ? "Com consulta a partir de R$500, 1 consulta recuperada por mês paga o plano."
            : "Com consulta a partir de R$500, menos de 2 consultas recuperadas por mês pagam o plano."}{" "}
          <a
            href="/calculadora"
            className="font-semibold text-[var(--brand-800)] underline underline-offset-4"
          >
            Faça a conta com os números da sua clínica.
          </a>
        </p>

        {solo ? (
          <div className="mx-auto max-w-md">
            <Card p={planoSolo} />
          </div>
        ) : (
          <div className="grid items-stretch gap-5 md:grid-cols-3 md:gap-6">
            {planos.map((p) => (
              <Card key={p.chave} p={p} />
            ))}
          </div>
        )}

        <p className="font-sans mt-8 text-center text-[15px] text-[var(--text-muted)]">
          Diagnóstico grátis antes de qualquer cobrança · Cancele com 30 dias de aviso.
        </p>

        {solo && (
          <p className="font-sans mt-5 text-center text-[15px] text-[var(--text-muted)]">
            Quer lembrete anti-falta, remarcação e áudio?{" "}
            <a
              href="/#planos"
              className="font-semibold text-[#055449] underline underline-offset-4"
            >
              Ver plano Clínica ({precoFormatado("Clínica")}/mês)
            </a>
          </p>
        )}
      </div>
    </section>
  );
};

export default Pricing;

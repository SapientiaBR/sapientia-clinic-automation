import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { revealOnScroll } from "@/lib/animations";
import { implantacaoFormatada } from "@/config/turma";
import { PLANOS, precoTxt, waSofia, type Plano } from "@/config/si";

type CardPlano = Plano & { destaque: boolean };

/**
 * Ordem deliberada: o Clínica vem primeiro.
 *
 * É o plano recomendado, e num celular a ordem da coluna é a ordem de leitura
 * — deixar o mais barato no topo faz o visitante ancorar no menor preço antes
 * de ver o que o do meio entrega. Os planos em si vêm de src/config/si.ts.
 */
const planos: CardPlano[] = [
  { ...PLANOS.clinica, destaque: true },
  { ...PLANOS.consultorio, destaque: false },
  { ...PLANOS.operacao, destaque: false },
];

/** O card único da rota do médico solo. */
const planoSolo: CardPlano = { ...PLANOS.consultorio, destaque: true };

const IconeCheck = () => (
  <span
    className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
    style={{ background: "#D6F3EE" }}
  >
    <Check size={12} strokeWidth={3} style={{ color: "#0A8C7E" }} />
  </span>
);

/**
 * Linha da implantação, repetida em todo card.
 *
 * A implantação custa R$ 2.997 e sai sem cobrança para quem assina até o
 * último dia do mês. A oferta vale todo mês, por isso a linha não leva data.
 */
const LinhaImplantacao = ({ destaque }: { destaque: boolean }) => {
  const corFraca = destaque ? "rgba(255,255,255,0.75)" : "#6B7280";
  const corForte = destaque ? "#FFFFFF" : "#055449";

  return (
    <p className="font-sans mt-3 text-[14px]" style={{ color: corFraca }}>
      Implantação <s>{implantacaoFormatada}</s>{" "}
      <strong className="font-semibold" style={{ color: corForte }}>
        R$0
      </strong>{" "}
      para quem assinar até o fim do mês
    </p>
  );
};

const Card = ({ p }: { p: CardPlano }) => (
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
        {precoTxt(p).replace(" ", "")}
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
          Tudo do {PLANOS[p.herdaDe].nome} +
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

      {/* Link comum, não do roteador: a /assinar abre como página nova, e o
          gravador de sessão que roda na landing não segue para lá. */}
      <a
        href={`/assinar?plano=${p.chave}`}
        className={
          "group mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-3.5 font-display text-[15px] font-bold transition-all duration-300 " +
          (p.destaque
            ? "gradient-brand text-white shadow-[0_14px_30px_rgba(15, 181, 163,0.32)] hover:-translate-y-0.5"
            : "border border-[#0FB5A3] bg-white text-[#055449] hover:bg-[#F1FBF8]")
        }
      >
        <span>Assinar o plano {p.nome}</span>
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </a>
      <p className="font-sans mt-3 text-center text-[13px] leading-snug text-[var(--text-muted)]">
        Contrato de 12 meses, cobrado mês a mês.
      </p>
      {p.chave === "operacao" && (
        <p className="font-sans mt-2 text-center text-[13px] leading-snug text-[var(--text-muted)]">
          Quem prefere conversar fala com a Sofia, nossa assistente virtual, no WhatsApp. Reunião
          com o Leo, em horário comercial.{" "}
          <a
            href={waSofia("Oi! Quero conversar sobre o plano Operação.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#055449] underline underline-offset-4"
          >
            Prefiro conversar antes
          </a>
        </p>
      )}
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
          Com 2 consultas agendadas pela Secretária Invisível, o plano mensal já está pago!
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
          Contrato de 12 meses, cobrado mês a mês, porque a implantação sai sem cobrança. Quem
          cancela antes dos 12 meses paga multa de 30% das mensalidades que faltam.
        </p>

        {solo && (
          <p className="font-sans mt-5 text-center text-[15px] text-[var(--text-muted)]">
            Quer lembrete anti-falta, remarcação e áudio?{" "}
            <a
              href="/#planos"
              className="font-semibold text-[#055449] underline underline-offset-4"
            >
              Ver plano Clínica ({precoTxt(PLANOS.clinica)}/mês)
            </a>
          </p>
        )}

        <div className="mx-auto mt-10 max-w-2xl text-center" data-reveal>
          <p className="font-sans text-[16px] leading-[1.6] text-[var(--text)]">
            Prefere conversar antes de assinar? Fale com a Sofia, nossa assistente virtual, no
            WhatsApp. Se quiser falar com uma pessoa, o Leo atende em horário comercial.
          </p>
          <a
            href={waSofia("Oi! Quero tirar uma dúvida antes de assinar a Secretária Invisível.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#0FB5A3] bg-white px-6 py-3 font-display text-[15px] font-bold text-[#055449] transition-colors hover:bg-[#F1FBF8]"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Falar com a Sofia no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

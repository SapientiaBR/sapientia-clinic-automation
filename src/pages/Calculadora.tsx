import { useRef, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Calculator } from "lucide-react";
import TurmaBanner from "@/components/landing/TurmaBanner";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import {
  calcularPerdaRecepcao,
  pontuarClinica,
  type ResultadoCalculadora,
  type ResultadoQualificacao,
} from "@/lib/calculadora";
import { PLANOS, precoFormatado } from "@/config/planos";

/*
 * Mesmo vocabulário visual do formulário de demonstração (`LeadForm`): campo
 * de 48px, rótulo semibold, cartão branco com borda e sombra de cartão, botão
 * em pílula com o gradiente da marca. A diferença é só de escrita: aqui tudo
 * sai de token e de rem, para não somar aviso ao lint de design system.
 */
const CAMPO =
  "h-12 w-full rounded-xl border border-[var(--line-default)] bg-[var(--bg-card)] px-3 text-base text-[var(--text)] placeholder:text-[var(--ink-faint)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-500)] focus-visible:border-[var(--brand-500)]";
const ROTULO = "font-display-sans text-[0.8125rem] font-semibold text-[var(--ink-strong)]";
const AJUDA = "font-sans mt-1.5 text-[0.8125rem] leading-snug text-[var(--ink-soft)]";
const BOTAO =
  "group inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full px-6 font-display text-base font-bold text-[var(--ink-on-brand)] gradient-brand shadow-[var(--shadow-pill)] transition-all hover:-translate-y-0.5";

const WHATSAPP_MATERIAL =
  "https://wa.me/5511920795583?text=" +
  encodeURIComponent("Oi! Fiz a calculadora da recepção e quero receber o material de organização da recepção.");

const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
    .format(n)
    .replace(/\s/g, "");
const inteiro = (n: number) => Math.round(n).toLocaleString("pt-BR");

type Campos = {
  mensagensPorDia: string;
  percentualForaHorario: string;
  ticketConsulta: string;
  faltasPorSemana: string;
  taxaConversao: string;
  profissionais: string;
  whatsapp: string;
};

const VAZIO: Campos = {
  mensagensPorDia: "",
  percentualForaHorario: "",
  ticketConsulta: "",
  faltasPorSemana: "",
  taxaConversao: "30",
  profissionais: "",
  whatsapp: "",
};

const OBRIGATORIOS: (keyof Campos)[] = [
  "mensagensPorDia",
  "percentualForaHorario",
  "ticketConsulta",
  "faltasPorSemana",
  "profissionais",
  "whatsapp",
];

const Calculadora = () => {
  const [c, setC] = useState<Campos>(VAZIO);
  const [erro, setErro] = useState(false);
  const [resultado, setResultado] = useState<{
    conta: ResultadoCalculadora;
    perfil: ResultadoQualificacao;
  } | null>(null);
  const topoResultado = useRef<HTMLHeadingElement>(null);

  const muda = (campo: keyof Campos) => (valor: string) => setC((atual) => ({ ...atual, [campo]: valor }));

  const enviar = (ev: FormEvent) => {
    ev.preventDefault();
    const faltando = OBRIGATORIOS.find((campo) => c[campo] === "");
    if (faltando) {
      setErro(true);
      document.getElementById(faltando)?.focus();
      return;
    }
    setErro(false);

    const mensagensPorDia = Number(c.mensagensPorDia);
    const conta = calcularPerdaRecepcao({
      mensagensPorDia,
      percentualForaHorario: Number(c.percentualForaHorario),
      ticketConsulta: Number(c.ticketConsulta),
      faltasPorSemana: Number(c.faltasPorSemana),
      taxaConversao: c.taxaConversao === "" ? 30 : Number(c.taxaConversao),
    });
    const perfil = pontuarClinica({
      profissionais: Number(c.profissionais),
      mensagensPorDia,
      whatsappCanalPrincipal: c.whatsapp === "sim",
    });
    setResultado({ conta, perfil });

    // O resultado substitui o formulário no mesmo cartão. No celular, sem
    // rolar até ele e mover o foco, a pessoa ficaria olhando o rodapé.
    requestAnimationFrame(() => {
      topoResultado.current?.scrollIntoView({ block: "start", behavior: "smooth" });
      topoResultado.current?.focus({ preventScroll: true });
    });
  };

  const refazer = () => {
    setResultado(null);
    requestAnimationFrame(() => document.getElementById("mensagensPorDia")?.focus());
  };

  const plano = resultado ? PLANOS[resultado.perfil.planoSugerido] : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg-page)] text-[var(--text)]">
      <Helmet>
        <title>Calculadora da Recepção | Secretária Invisível</title>
        <meta
          name="description"
          content="Quatro números da sua clínica e você vê o que passa pela recepção fora do horário. A conta fica aberta na tela, com cada premissa declarada."
        />
        <link rel="canonical" href="https://secretariainvisivel.com.br/calculadora" />
        <meta property="og:url" content="https://secretariainvisivel.com.br/calculadora" />
        <meta property="og:title" content="Calculadora da Recepção | Secretária Invisível" />
      </Helmet>

      <TurmaBanner />
      <Header />

      <main
        className="page-canvas pb-16 md:pb-24"
        style={{ paddingTop: "calc(var(--altura-faixa, 2.25rem) + 7.5rem)" }}
      >
        <div className="container mx-auto max-w-xl px-4 sm:px-6">
          <div className="mb-6 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--brand-200)] bg-[var(--brand-100)] px-3.5 py-1.5">
              <Calculator size={14} className="text-[var(--brand-600)]" aria-hidden="true" />
              <span className="font-display text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[var(--brand-800)]">
                Calculadora da recepção
              </span>
            </div>

            {/* Item 20 do anti-slop: nenhuma palavra de tecnologia no H1. */}
            <h1 className="font-display text-[1.875rem] font-normal tracking-[-0.04em] text-balance text-[var(--ink-strong)] sm:text-[2.5rem]">
              Quanto passa pela sua recepção fora do horário?
            </h1>
            <p className="font-sans mx-auto mt-4 max-w-md text-[1.0625rem] leading-[1.6] text-[var(--ink-body)]">
              Quatro números da sua clínica. A conta fica aberta na tela, e você ajusta cada premissa.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--line-default)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-card)] sm:p-8">
            {resultado && plano ? (
              <section aria-live="polite">
                {/* A margem de rolagem desconta a faixa da turma e o cabeçalho, que
                    são fixos: sem ela, o total ficava escondido atrás dos dois. */}
                <h2
                  ref={topoResultado}
                  tabIndex={-1}
                  style={{ scrollMarginTop: "calc(var(--altura-faixa, 2.25rem) + 7rem)" }}
                  className="font-display text-[1.375rem] font-normal tracking-[-0.03em] text-[var(--ink-strong)] outline-none sm:text-[1.625rem]"
                >
                  O que passa pela sua recepção por mês
                </h2>
                <p className="font-display mt-2 text-[2.5rem] leading-none tracking-[-0.04em] text-[var(--brand-700)]">
                  {brl(resultado.conta.perdaTotalMes)}
                </p>

                <p className="font-sans mt-5 rounded-r-xl border-l-4 border-[var(--brand-800)] bg-[var(--brand-50)] px-4 py-3 text-[0.9375rem] font-medium leading-snug text-[var(--ink-strong)]">
                  O resultado é o que passa pela recepção fora do horário, não o que você recupera.
                </p>

                <h3 className="font-display-sans mt-7 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
                  A conta, aberta
                </h3>
                <dl className="font-sans mt-2 text-[0.9375rem]">
                  {[
                    ["Mensagens fora do horário no mês", `${inteiro(resultado.conta.mensagensForaHorarioMes)} mensagens`],
                    ["Dessas, as que virariam consulta", `${inteiro(resultado.conta.consultasNaoMarcadasMes)} consultas`],
                    ["Consulta não marcada por falta de resposta", brl(resultado.conta.perdaMensagemSemResposta)],
                    ["Horário vazio por falta sem aviso", brl(resultado.conta.perdaFaltas)],
                  ].map(([rotulo, valor]) => (
                    <div
                      key={rotulo}
                      className="flex items-baseline justify-between gap-4 border-b border-[var(--line-default)] py-3"
                    >
                      <dt className="text-[var(--ink-body)]">{rotulo}</dt>
                      <dd className="flex-none font-semibold tabular-nums text-[var(--ink-strong)]">{valor}</dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-4 pt-3">
                    <dt className="font-semibold text-[var(--ink-strong)]">Total no mês</dt>
                    <dd className="flex-none text-[1.0625rem] font-bold tabular-nums text-[var(--ink-strong)]">
                      {brl(resultado.conta.perdaTotalMes)}
                    </dd>
                  </div>
                </dl>

                <h3 className="font-display-sans mt-7 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
                  Premissas usadas
                </h3>
                <ul className="font-sans mt-2 list-disc space-y-1.5 pl-5 text-[0.875rem] leading-snug text-[var(--ink-body)]">
                  {resultado.conta.suposicoes.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>

                <div className="mt-8 rounded-2xl border border-[var(--brand-200)] bg-[var(--bg-mist)] p-5">
                  {resultado.perfil.qualificado ? (
                    <>
                      <p className="font-display text-[1.25rem] font-semibold leading-snug text-[var(--ink-strong)]">
                        Pelo tamanho da sua operação: plano {plano.nome}
                      </p>
                      <p className="font-sans mt-2 text-[0.9375rem] leading-relaxed text-[var(--ink-body)]">
                        {plano.perfil}, {precoFormatado(plano.nome)} por mês. Na turma do mês, a implantação fica por
                        nossa conta. O próximo passo é ver a Secretária Invisível atendendo você no seu WhatsApp.
                      </p>
                      <a href="/#demo" className={`${BOTAO} mt-5`}>
                        <span className="text-balance">Quero ver a demonstração no meu WhatsApp</span>
                        <ArrowRight size={16} className="flex-none transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </a>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-[1.25rem] font-semibold leading-snug text-[var(--ink-strong)]">
                        Guarde este número
                      </p>
                      <p className="font-sans mt-2 text-[0.9375rem] leading-relaxed text-[var(--ink-body)]">
                        {resultado.perfil.motivo} Ainda assim, a conta acima é da sua clínica. Mandamos sem custo o
                        material que ajuda a organizar a recepção enquanto a operação cresce.
                      </p>
                      <a href={WHATSAPP_MATERIAL} target="_blank" rel="noopener noreferrer" className={`${BOTAO} mt-5`}>
                        <span className="text-balance">Receber o material no WhatsApp</span>
                        <ArrowRight size={16} className="flex-none transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </a>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={refazer}
                  className="font-sans mt-6 w-full text-center text-[0.9375rem] font-semibold text-[var(--brand-800)] underline underline-offset-4"
                >
                  Ajustar os números
                </button>
              </section>
            ) : (
              <form onSubmit={enviar} noValidate className="space-y-5">
                <Numero
                  id="mensagensPorDia"
                  rotulo="Quantas mensagens a clínica recebe por dia?"
                  ajuda="Some tudo: agendamento, dúvida, confirmação, retorno."
                  valor={c.mensagensPorDia}
                  onChange={muda("mensagensPorDia")}
                />
                <Numero
                  id="percentualForaHorario"
                  rotulo="Quanto disso chega fora do horário da recepção? (%)"
                  ajuda="Antes de abrir, depois de fechar, hora do almoço, fim de semana."
                  valor={c.percentualForaHorario}
                  onChange={muda("percentualForaHorario")}
                  max={100}
                />
                <Numero
                  id="ticketConsulta"
                  rotulo="Qual o valor médio de uma consulta? (R$)"
                  valor={c.ticketConsulta}
                  onChange={muda("ticketConsulta")}
                />
                <Numero
                  id="faltasPorSemana"
                  rotulo="Quantas faltas sem aviso por semana?"
                  valor={c.faltasPorSemana}
                  onChange={muda("faltasPorSemana")}
                />
                <Numero
                  id="taxaConversao"
                  rotulo="De cada 100 mensagens fora do horário, quantas virariam consulta?"
                  ajuda="Começamos em 30. Ajuste para o que é realista na sua clínica."
                  valor={c.taxaConversao}
                  onChange={muda("taxaConversao")}
                  max={100}
                />

                <div className="border-t border-[var(--line-default)] pt-5">
                  <p className="font-display-sans mb-4 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-[var(--ink-soft)]">
                    Sobre a clínica
                  </p>
                  <div className="space-y-5">
                    <Escolha
                      id="profissionais"
                      rotulo="Quantos profissionais atendem?"
                      valor={c.profissionais}
                      onChange={muda("profissionais")}
                      opcoes={[
                        ["1", "Só eu"],
                        ["2", "2 a 3"],
                        ["4", "4 ou mais"],
                      ]}
                    />
                    <Escolha
                      id="whatsapp"
                      rotulo="O WhatsApp é o canal principal de agendamento?"
                      valor={c.whatsapp}
                      onChange={muda("whatsapp")}
                      opcoes={[
                        ["sim", "Sim"],
                        ["nao", "Não"],
                      ]}
                    />
                  </div>
                </div>

                {erro && (
                  <p role="alert" className="font-sans text-[0.875rem] font-medium text-[var(--danger)]">
                    Preencha os campos acima para ver o resultado.
                  </p>
                )}

                <button type="submit" className={BOTAO}>
                  <span>Ver o resultado</span>
                  <ArrowRight size={16} className="flex-none transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
                <p className="font-sans text-center text-[0.875rem] text-[var(--ink-body)]">
                  Leva 2 minutos · O resultado aparece na tela
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

/* Campos numéricos. `inputMode="numeric"` abre o teclado de números no
   celular, que é onde a maior parte desta página vai ser preenchida. */
const Numero = ({
  id,
  rotulo,
  ajuda,
  valor,
  onChange,
  max,
}: {
  id: string;
  rotulo: string;
  ajuda?: string;
  valor: string;
  onChange: (v: string) => void;
  max?: number;
}) => (
  <div>
    <label htmlFor={id} className={ROTULO}>
      {rotulo}
    </label>
    <input
      id={id}
      name={id}
      type="number"
      inputMode="numeric"
      min={0}
      max={max}
      step={1}
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      aria-describedby={ajuda ? `${id}-ajuda` : undefined}
      className={`${CAMPO} mt-2`}
    />
    {ajuda && (
      <p id={`${id}-ajuda`} className={AJUDA}>
        {ajuda}
      </p>
    )}
  </div>
);

const Escolha = ({
  id,
  rotulo,
  valor,
  onChange,
  opcoes,
}: {
  id: string;
  rotulo: string;
  valor: string;
  onChange: (v: string) => void;
  opcoes: [string, string][];
}) => (
  <div>
    <label htmlFor={id} className={ROTULO}>
      {rotulo}
    </label>
    <select
      id={id}
      name={id}
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      className={`${CAMPO} mt-2 appearance-none`}
    >
      <option value="">Selecione</option>
      {opcoes.map(([v, texto]) => (
        <option key={v} value={v}>
          {texto}
        </option>
      ))}
    </select>
  </div>
);

export default Calculadora;

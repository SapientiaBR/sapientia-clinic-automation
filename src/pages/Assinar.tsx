import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { Check, Loader2, MessageCircle } from "lucide-react";
import Casca from "@/components/assinatura/Casca";
import {
  PLANOS,
  SI_CONFIG,
  ehChavePlano,
  linkAsaasConfigurado,
  precoTxt,
  recursosCompletos,
  waSofia,
  type ChavePlano,
} from "@/config/si";
import { implantacaoFormatada, turmaAtual } from "@/config/turma";
import { lerCookie, trackEvent } from "@/lib/consent";
import {
  documentoValido,
  emailValido,
  mascaraDocumento,
  mascaraTelefone,
  novoIdClinica,
  postarComRetentativa,
  sessao,
  soDigitos,
  telefoneValido,
} from "@/lib/formatos";

type Campo = "nome" | "clinica" | "documento" | "email" | "whatsapp";
type Valores = Record<Campo, string>;

const CAMPOS: { id: Campo; rotulo: string; placeholder: string; ajuda?: string; tipo: string; auto: string }[] = [
  { id: "nome", rotulo: "Seu nome completo", placeholder: "Como aparece no seu documento", ajuda: "Quem assina e recebe a cobrança.", tipo: "text", auto: "name" },
  { id: "clinica", rotulo: "Nome da clínica ou consultório", placeholder: "Como seus pacientes conhecem", tipo: "text", auto: "organization" },
  { id: "documento", rotulo: "CPF ou CNPJ", placeholder: "000.000.000-00 ou 00.000.000/0000-00", ajuda: "Usado só para emitir a cobrança.", tipo: "text", auto: "off" },
  { id: "email", rotulo: "E-mail", placeholder: "voce@suaclinica.com.br", ajuda: "Recibo e avisos da assinatura chegam aqui.", tipo: "email", auto: "email" },
  { id: "whatsapp", rotulo: "Seu WhatsApp", placeholder: "(11) 90000-0000", ajuda: "Para falarmos com você durante a configuração.", tipo: "tel", auto: "tel" },
];

function validar(id: Campo, v: string): string {
  if (!v.trim()) return "Preencha este campo.";
  if (id === "documento" && !documentoValido(v)) return "CPF ou CNPJ inválido. Confira os números.";
  if (id === "email" && !emailValido(v)) return "Confira o e-mail.";
  if (id === "whatsapp" && !telefoneValido(v)) return "Confira o número com DDD.";
  return "";
}

const TEXTO_ACEITE_TERMOS = `Li e aceito os Termos de Serviço e o Acordo de Tratamento de Dados (DPA), versão ${SI_CONFIG.versaoTermos}, e declaro que tenho poderes para contratar em nome da clínica.`;
const TEXTO_CIENCIA_WHATSAPP =
  "Entendo que a Secretária Invisível se conecta ao WhatsApp por um método não oficial, que a Meta pode bloquear o número a qualquer momento, e que posso migrar para a API oficial.";

const PASSOS = [
  ["Você conta como a clínica funciona.", "Preenche o formulário de implantação e convida sua recepcionista para completar a parte dela."],
  ["Nós configuramos.", "Nossa equipe monta o atendimento com as regras e o jeito de falar da sua clínica."],
  ["Sua clínica testa e aprova.", "Você e sua recepcionista conversam com a Secretária Invisível antes de qualquer paciente. Algo não ficou como a clínica responde? Ajustamos."],
  ["Entra no ar.", "Só depois da sua aprovação, no número que seus pacientes já conhecem."],
];

const FAQ: [string, string][] = [
  ["Posso cancelar?", "Pode. O cancelamento exige 30 dias de aviso. Você fala com a nossa equipe e a assinatura termina depois desse prazo."],
  ["Preciso trocar o número de WhatsApp da clínica?", "Não. Usamos o número que seus pacientes já conhecem. Você informa qual é no formulário de implantação. Se a clínica trocar de número no futuro, avise nossa equipe."],
  ["E a minha recepcionista, qual é o papel dela?", "Central. Ela conhece a clínica melhor que qualquer sistema. Participa da configuração, diz como a clínica responde hoje e acompanha o teste antes de entrar no ar. Continua sendo o rosto da clínica. A Secretária Invisível cuida do WhatsApp quando ela está com um paciente na frente e depois que ela vai embora."],
  ["E se eu não aprovar a configuração?", "Você não entra no ar. Devolvemos a primeira mensalidade inteira e a assinatura é cancelada."],
  ["Como posso pagar?", "Pix, boleto ou cartão, você escolhe no pagamento. A primeira mensalidade é cobrada na assinatura. As seguintes são cobradas todo mês."],
  ["É inteligência artificial?", "É. A Secretária Invisível usa inteligência artificial configurada com as regras da sua clínica. Se o paciente perguntar, o sistema diz que é atendimento automatizado. Quando a situação pede uma pessoa, a conversa vai para a sua equipe."],
];

/** Os três botões de escolha, para quando falta ou está errado o ?plano. */
const EscolhaPlano = ({ onEscolher }: { onEscolher: (c: ChavePlano) => void }) => (
  <div className="grid gap-3 sm:grid-cols-3">
    {(Object.keys(PLANOS) as ChavePlano[]).map((c) => (
      <button
        key={c}
        type="button"
        onClick={() => onEscolher(c)}
        className="min-h-[44px] rounded-2xl border bg-white p-4 text-left transition-colors hover:border-[#0A7A68] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A7A68]"
        style={{ borderColor: "#A7E6DD" }}
      >
        <span className="block font-display text-[16px] font-semibold">{PLANOS[c].nome}</span>
        <span className="block font-sans text-[14px] text-[#5A6570]">{PLANOS[c].para}</span>
        <span className="mt-1 block font-display text-[18px] font-semibold text-[#0A7A68]">
          {precoTxt(PLANOS[c])}/mês
        </span>
      </button>
    ))}
  </div>
);

const Assinar = () => {
  const [params, setParams] = useSearchParams();
  const bruto = params.get("plano");
  const [trocando, setTrocando] = useState(false);
  const chave: ChavePlano | null = ehChavePlano(bruto) ? bruto : null;
  const plano = chave ? PLANOS[chave] : null;
  const t = turmaAtual();

  const [valores, setValores] = useState<Valores>({
    nome: sessao.ler("si_nome"),
    clinica: sessao.ler("si_clinica"),
    documento: "",
    email: sessao.ler("si_email"),
    whatsapp: sessao.ler("si_whatsapp") ? mascaraTelefone(sessao.ler("si_whatsapp")) : "",
  });
  const [erros, setErros] = useState<Partial<Record<Campo, string>>>({});
  const [aceiteTermos, setAceiteTermos] = useState(false);
  const [cienciaWhats, setCienciaWhats] = useState(false);
  const [erroAceite, setErroAceite] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [semLink, setSemLink] = useState(false);
  const refs = useRef<Partial<Record<Campo | "aceite" | "ciencia", HTMLInputElement | null>>>({});

  const recursos = useMemo(() => (chave ? recursosCompletos(chave) : []), [chave]);
  const aceitesOk = aceiteTermos && (!SI_CONFIG.exigirCienciaWhatsApp || cienciaWhats);

  useEffect(() => {
    if (chave) setTrocando(false);
  }, [chave]);

  const escolher = (c: ChavePlano) => {
    setParams({ plano: c }, { replace: true });
    setSemLink(false);
  };

  const mudar = (id: Campo, v: string) => {
    const valor = id === "documento" ? mascaraDocumento(v) : id === "whatsapp" ? mascaraTelefone(v) : v;
    setValores((x) => ({ ...x, [id]: valor }));
    if (erros[id]) setErros((e) => ({ ...e, [id]: validar(id, valor) }));
  };

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (enviando || !chave || !plano) return;

    const novos: Partial<Record<Campo, string>> = {};
    for (const c of CAMPOS) {
      const msg = validar(c.id, valores[c.id]);
      if (msg) novos[c.id] = msg;
    }
    setErros(novos);
    const primeiro = CAMPOS.find((c) => novos[c.id]);
    if (primeiro) {
      refs.current[primeiro.id]?.focus();
      return;
    }
    if (!aceiteTermos) {
      setErroAceite("Marque o aceite dos termos para ir ao pagamento.");
      refs.current.aceite?.focus();
      return;
    }
    if (SI_CONFIG.exigirCienciaWhatsApp && !cienciaWhats) {
      setErroAceite("Marque a ciência sobre a conexão com o WhatsApp para ir ao pagamento.");
      refs.current.ciencia?.focus();
      return;
    }
    setErroAceite("");

    if (!linkAsaasConfigurado(chave)) {
      setSemLink(true);
      return;
    }

    setEnviando(true);

    // 1. O id que liga esta assinatura ao formulário de implantação e ao
    //    convite da recepcionista. A /obrigado lê tudo isto da sessão.
    const clinicaId = sessao.ler("si_clinica_id") || novoIdClinica();
    sessao.gravar("si_clinica_id", clinicaId);
    sessao.gravar("si_plano", chave);
    sessao.gravar("si_nome", valores.nome.trim());
    sessao.gravar("si_clinica", valores.clinica.trim());
    sessao.gravar("si_email", valores.email.trim().toLowerCase());
    sessao.gravar("si_whatsapp", soDigitos(valores.whatsapp));

    // 2. Evento de início de compra, só com consentimento.
    trackEvent("InitiateCheckout", { value: plano.valor, currency: "BRL" });

    // 3. Registro do aceite no n8n.
    const fbp = lerCookie("_fbp");
    const fbc = lerCookie("_fbc");
    const corpo = {
      plano: chave,
      nome: valores.nome.trim(),
      clinica: valores.clinica.trim(),
      documento: soDigitos(valores.documento),
      email: valores.email.trim().toLowerCase(),
      whatsapp: soDigitos(valores.whatsapp),
      versao_termos: SI_CONFIG.versaoTermos,
      aceite_em: new Date().toISOString(),
      user_agent: navigator.userAgent,
      page_url: window.location.href,
      ...(fbp ? { fbp } : {}),
      ...(fbc ? { fbc } : {}),
      clinica_id: clinicaId,
      valor_exibido: plano.valor,
      periodicidade: "mensal",
      moeda: "BRL",
      aceites: [
        { id: "termos_dpa", marcado: aceiteTermos, texto: TEXTO_ACEITE_TERMOS },
        ...(SI_CONFIG.exigirCienciaWhatsApp
          ? [{ id: "ciencia_whatsapp", marcado: cienciaWhats, texto: TEXTO_CIENCIA_WHATSAPP }]
          : []),
      ],
      idioma: navigator.language,
    };

    // 4. Se o registro falhar duas vezes, vai por beacon e a venda segue: o
    //    servidor reconstrói o aceite a partir do pagamento no Asaas. Nunca se
    //    bloqueia a compra por falha do registro, nem se repete em laço.
    const ok = await postarComRetentativa(SI_CONFIG.webhooks.aceite, corpo);
    if (!ok) {
      try {
        navigator.sendBeacon?.(
          SI_CONFIG.webhooks.aceite,
          new Blob([JSON.stringify(corpo)], { type: "text/plain" }),
        );
      } catch {
        /* segue para o pagamento */
      }
    }

    // 5. Pagamento.
    window.location.assign(SI_CONFIG.asaas[chave]);
  };

  const linhaComum = `Implantação de ${implantacaoFormatada} sem cobrança para quem assinar até ${t.fimDoMes}. Cobrança mensal recorrente. Cancelamento com 30 dias de aviso.`;

  const rotuloCaixa = "font-sans text-[14px] leading-[1.55] text-[#1B2430]";

  return (
    <Casca rodapeComFolga>
      <Helmet>
        <title>Assinar | Secretária Invisível</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="grid gap-8 min-[992px]:grid-cols-[minmax(0,1fr)_minmax(0,420px)] min-[992px]:gap-12">
          {/* Título */}
          <div className="order-1 min-[992px]:col-start-1">
            <h1 className="font-display text-balance text-[30px] font-normal leading-tight tracking-[-0.03em] sm:text-[40px]">
              {plano ? `Assine o plano ${plano.nome} e comece a configuração` : "Escolha o seu plano"}
            </h1>
            <p className="font-sans mt-4 text-[17px] leading-[1.6] text-[#5A6570]">
              Você paga a primeira mensalidade agora. Nossa equipe configura, sua clínica testa e
              aprova, e só então a Secretária Invisível entra no ar.
            </p>
          </div>

          {/* Resumo do plano */}
          <section aria-label="Resumo do plano" className="order-2 min-[992px]:col-start-1">
            {!plano || trocando ? (
              <EscolhaPlano onEscolher={escolher} />
            ) : (
              <div className="rounded-3xl p-6 sm:p-7" style={{ background: "#E6F6F2", border: "1px solid #A7E6DD" }}>
                <p className="font-display text-[14px] font-semibold uppercase tracking-[0.14em] text-[#0A7A68]">
                  {plano.nome}
                </p>
                <p className="font-sans mt-1 text-[15px] text-[#5A6570]">{plano.para}</p>
                <p className="font-display mt-3 text-[34px] font-normal tracking-[-0.03em]">
                  {precoTxt(plano)} <span className="font-sans text-[16px] text-[#5A6570]">por mês</span>
                </p>
                <ul className="mt-4 space-y-2.5">
                  {recursos.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 font-sans text-[15px] leading-snug">
                      <Check size={16} strokeWidth={3} className="mt-0.5 flex-none text-[#0A7A68]" aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="font-sans mt-5 text-[14px] leading-[1.55] text-[#1B2430]">{linhaComum}</p>
                <button
                  type="button"
                  onClick={() => setTrocando(true)}
                  className="font-sans mt-4 min-h-[44px] text-[14px] text-[#0A7A68] underline underline-offset-4"
                >
                  Escolhi o plano errado? Trocar de plano
                </button>
              </div>
            )}
          </section>

          {/* Formulário: à direita e fixo no desktop, logo depois do resumo no celular. */}
          <section
            aria-label="Dados para a assinatura"
            className="order-3 min-[992px]:col-start-2 min-[992px]:row-span-6 min-[992px]:row-start-1"
          >
            <form
              noValidate
              onSubmit={enviar}
              data-clarity-mask="true"
              className="rounded-3xl border bg-white p-6 sm:p-7 min-[992px]:sticky min-[992px]:top-6"
              style={{ borderColor: "#E5E7EB", boxShadow: "0 18px 44px rgba(15,23,42,0.06)" }}
            >
              <div className="space-y-5">
                {CAMPOS.map((c) => (
                  <div key={c.id}>
                    <label htmlFor={`f-${c.id}`} className="block font-sans text-[15px] font-semibold">
                      {c.rotulo}
                    </label>
                    <input
                      id={`f-${c.id}`}
                      ref={(el) => {
                        refs.current[c.id] = el;
                      }}
                      type={c.tipo}
                      inputMode={c.id === "documento" || c.id === "whatsapp" ? "numeric" : undefined}
                      autoComplete={c.auto}
                      placeholder={c.placeholder}
                      value={valores[c.id]}
                      onChange={(e) => mudar(c.id, e.target.value)}
                      onBlur={() => setErros((x) => ({ ...x, [c.id]: validar(c.id, valores[c.id]) }))}
                      aria-invalid={!!erros[c.id]}
                      aria-describedby={`a-${c.id} e-${c.id}`}
                      className="mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 font-sans text-[16px] outline-none transition-colors focus:border-[#0A7A68] focus:ring-2 focus:ring-[#0A7A68]/25"
                      style={{ borderColor: erros[c.id] ? "#B42318" : "#CBD5E1" }}
                    />
                    {c.ajuda && (
                      <p id={`a-${c.id}`} className="font-sans mt-1 text-[13px] text-[#5A6570]">
                        {c.ajuda}
                      </p>
                    )}
                    <p id={`e-${c.id}`} role="alert" className="font-sans mt-1 text-[13px] text-[#B42318]">
                      {erros[c.id]}
                    </p>
                  </div>
                ))}
              </div>

              {plano && (
                <p className="font-sans mt-6 text-[13px] leading-[1.55] text-[#5A6570]">
                  Você contrata o plano {plano.nome} por R$ {plano.valorTxt} por mês. Cobramos a
                  primeira mensalidade agora e as próximas todo mês, no mesmo dia, até você
                  cancelar. Cancelamento com 30 dias de aviso, sem multa. Se você não aprovar a
                  configuração antes de ir ao ar, devolvemos a primeira mensalidade inteira. Você
                  também pode desistir em até 7 dias, sem dar motivo.
                </p>
              )}

              <div className="mt-4 space-y-3">
                <label className="flex items-start gap-3">
                  <input
                    ref={(el) => {
                        refs.current.aceite = el;
                      }}
                    type="checkbox"
                    checked={aceiteTermos}
                    onChange={(e) => setAceiteTermos(e.target.checked)}
                    className="mt-1 h-5 w-5 flex-none accent-[#0A7A68]"
                  />
                  <span className={rotuloCaixa}>
                    Li e aceito os{" "}
                    <a href="/termos" target="_blank" rel="noopener" className="font-semibold text-[#0A7A68] underline underline-offset-2">
                      Termos de Serviço
                    </a>{" "}
                    e o Acordo de Tratamento de Dados (
                    <a href="/dpa" target="_blank" rel="noopener" className="font-semibold text-[#0A7A68] underline underline-offset-2">
                      DPA
                    </a>
                    ), versão {SI_CONFIG.versaoTermos}, e declaro que tenho poderes para contratar em
                    nome da clínica.
                  </span>
                </label>
                {SI_CONFIG.exigirCienciaWhatsApp && (
                  <label className="flex items-start gap-3">
                    <input
                      ref={(el) => {
                        refs.current.ciencia = el;
                      }}
                      type="checkbox"
                      checked={cienciaWhats}
                      onChange={(e) => setCienciaWhats(e.target.checked)}
                      className="mt-1 h-5 w-5 flex-none accent-[#0A7A68]"
                    />
                    <span className={rotuloCaixa}>{TEXTO_CIENCIA_WHATSAPP}</span>
                  </label>
                )}
                <p role="alert" className="font-sans text-[13px] text-[#B42318]">
                  {erroAceite}
                </p>
              </div>

              {semLink && (
                <p role="alert" className="font-sans mt-2 rounded-xl p-3 text-[14px] leading-[1.5]" style={{ background: "#FEF3F2", color: "#7A271A" }}>
                  O link de pagamento deste plano ainda não foi configurado. Fale com a nossa equipe
                  pelo{" "}
                  <a href={waSofia("Oi! Quero assinar a Secretária Invisível.")} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                    WhatsApp
                  </a>
                  .
                </p>
              )}

              {/* No celular o botão fica fixo no rodapé da tela. */}
              <div className="max-[991px]:fixed max-[991px]:inset-x-0 max-[991px]:bottom-0 max-[991px]:z-40 max-[991px]:border-t max-[991px]:bg-white max-[991px]:px-4 max-[991px]:pb-[calc(0.75rem+env(safe-area-inset-bottom))] max-[991px]:pt-3 min-[992px]:mt-5">
                <button
                  type="submit"
                  aria-disabled={!aceitesOk || enviando || !plano}
                  className={`flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-[16px] font-bold text-white transition-opacity ${
                    aceitesOk && plano ? "gradient-brand" : "bg-[#94A3B8]"
                  } ${enviando ? "cursor-wait opacity-80" : ""}`}
                >
                  {enviando ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                      Indo para o pagamento
                    </>
                  ) : (
                    "Ir para o pagamento"
                  )}
                </button>
                {!aceitesOk && (
                  <p className="font-sans mt-1.5 text-center text-[12px] text-[#5A6570]">
                    Marque o aceite dos termos para ir ao pagamento.
                  </p>
                )}
              </div>
              <p className="font-sans mt-3 text-center text-[13px] text-[#5A6570]">
                Pagamento processado pelo Asaas. Pix, boleto ou cartão.
              </p>
            </form>
          </section>

          {/* Depois que você assina */}
          <section aria-labelledby="h-passos" className="order-4 min-[992px]:col-start-1">
            <h2 id="h-passos" className="font-display text-[24px] font-normal tracking-[-0.02em]">
              Depois que você assina
            </h2>
            <ol className="mt-5 space-y-4">
              {PASSOS.map(([titulo, texto], i) => (
                <li key={titulo} className="flex gap-4">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full font-display text-[15px] font-bold text-white" style={{ background: "#0A7A68" }}>
                    {i + 1}
                  </span>
                  <p className="font-sans text-[16px] leading-[1.55]">
                    <strong className="font-semibold">{titulo}</strong> {texto}
                  </p>
                </li>
              ))}
            </ol>
            <p className="font-sans mt-4 text-[14px] text-[#5A6570]">
              O ritmo depende de quanto a clínica responde e aprova em cada etapa. Você acompanha
              tudo com a nossa equipe.
            </p>
            <p className="font-sans mt-3 text-[15px] font-semibold">
              A configuração é feita uma clínica por vez, na ordem de assinatura.
            </p>
          </section>

          {/* Garantia */}
          <section
            aria-labelledby="h-garantia"
            className="order-5 rounded-3xl p-6 min-[992px]:col-start-1"
            style={{ background: "#FFFFFF", border: "1px solid #A7E6DD" }}
          >
            <h2 id="h-garantia" className="font-display text-[22px] font-semibold">
              Se você não aprovar, a gente devolve
            </h2>
            <p className="font-sans mt-3 text-[16px] leading-[1.6]">
              Antes de entrar no ar, sua clínica faz um teste de aprovação da configuração. Se não
              aprovar, devolvemos a primeira mensalidade inteira e a assinatura é cancelada.
            </p>
            <p className="font-sans mt-2 text-[16px] font-semibold text-[#0A7A68]">
              Você só entra no ar depois de aprovar.
            </p>
          </section>

          {/* FAQ */}
          <section aria-labelledby="h-faq" className="order-6 min-[992px]:col-start-1">
            <h2 id="h-faq" className="font-display text-[24px] font-normal tracking-[-0.02em]">
              Perguntas sobre a assinatura
            </h2>
            <div className="mt-4 divide-y rounded-2xl border bg-white" style={{ borderColor: "#E5E7EB" }}>
              {FAQ.map(([q, a]) => (
                <details key={q} className="group px-5 py-4">
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-sans text-[16px] font-semibold">
                    {q}
                    <span aria-hidden="true" className="text-[#0A7A68] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="font-sans mt-2 text-[15px] leading-[1.6] text-[#5A6570]">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Conversar antes */}
          <section className="order-7 min-[992px]:col-start-1">
            <p className="font-sans text-[16px] leading-[1.6]">
              Prefere conversar antes de assinar? Fale com a Sofia, nossa assistente virtual, no
              WhatsApp. Se quiser falar com uma pessoa, o Leo atende em horário comercial.
            </p>
            <a
              href={waSofia("Oi! Quero tirar uma dúvida antes de assinar a Secretária Invisível.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#0A7A68] bg-white px-5 py-2.5 font-display text-[15px] font-bold text-[#0A7A68]"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Falar com a Sofia no WhatsApp
            </a>
          </section>
        </div>
      </main>
    </Casca>
  );
};

export default Assinar;

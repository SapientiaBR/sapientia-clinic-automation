import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { Copy, Loader2, MessageCircle, Plus, Trash2 } from "lucide-react";
import Casca from "@/components/assinatura/Casca";
import { SI_CONFIG, ehChavePlano, waSofia } from "@/config/si";
import {
  emailValido,
  mascaraTelefone,
  novoIdClinica,
  postarComRetentativa,
  sessao,
  soDigitos,
  telefoneValido,
} from "@/lib/formatos";

type Profissional = { nome: string; especialidade: string };

type Respostas = {
  nome_clinica: string;
  enderecos: string;
  profissionais: Profissional[];
  horarios: string;
  como_marca: string[];
  como_marca_outro: string;
  agenda: "" | "google" | "outra" | "nenhuma";
  agenda_qual: string;
  convenios: string;
  so_particular: boolean;
  valores_particular: string;
  perguntas_frequentes: string;
  so_equipe_responde: string;
  tom: "" | "acolhedor" | "equilibrado" | "formal";
  tom_frase: string;
  whatsapp_clinica: string;
  recepcionista_nome: string;
  recepcionista_whatsapp: string;
  sem_recepcionista: boolean;
  kickoff_dia: string;
  kickoff_faixa: string;
};

const RASCUNHO = "si_rascunho_implantacao";

const vazio = (): Respostas => ({
  nome_clinica: sessao.ler("si_clinica"),
  enderecos: "",
  profissionais: [{ nome: "", especialidade: "" }],
  horarios: "",
  como_marca: [],
  como_marca_outro: "",
  agenda: "",
  agenda_qual: "",
  convenios: "",
  so_particular: false,
  valores_particular: "",
  perguntas_frequentes: "",
  so_equipe_responde: "",
  tom: "",
  tom_frase: "",
  whatsapp_clinica: "",
  recepcionista_nome: "",
  recepcionista_whatsapp: "",
  sem_recepcionista: false,
  kickoff_dia: "",
  kickoff_faixa: "",
});

function lerRascunho(): Respostas {
  try {
    const bruto = sessao.ler(RASCUNHO);
    return bruto ? { ...vazio(), ...JSON.parse(bruto) } : vazio();
  } catch {
    return vazio();
  }
}

const COMO_MARCA = ["WhatsApp", "Telefone", "Presencial", "Site ou aplicativo", "Outro"];

const entrada =
  "mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 font-sans text-[16px] outline-none transition-colors focus:border-[#0A7A68] focus:ring-2 focus:ring-[#0A7A68]/25";

/** Rótulo, ajuda e erro de um campo, no mesmo desenho em todo o formulário. */
const Bloco = ({
  id,
  numero,
  rotulo,
  ajuda,
  erro,
  obrigatorio = true,
  children,
}: {
  id: string;
  numero?: number;
  rotulo: string;
  ajuda?: string;
  erro?: string;
  obrigatorio?: boolean;
  children: ReactNode;
}) => (
  <div>
    <label htmlFor={id} className="block font-sans text-[15px] font-semibold">
      {numero ? `${numero}. ` : ""}
      {rotulo}
      {!obrigatorio && <span className="font-normal text-[#5A6570]"> (opcional)</span>}
    </label>
    {children}
    {ajuda && <p className="font-sans mt-1 text-[13px] leading-snug text-[#5A6570]">{ajuda}</p>}
    {erro && (
      <p role="alert" className="font-sans mt-1 text-[13px] text-[#B42318]">
        {erro}
      </p>
    )}
  </div>
);

const AssinaturaObrigado = () => {
  const [params] = useSearchParams();
  const status = params.get("status");
  const planoUrl = params.get("plano");
  const plano = ehChavePlano(planoUrl) ? planoUrl : sessao.ler("si_plano");

  const [email, setEmail] = useState(sessao.ler("si_email"));
  const [whatsapp, setWhatsapp] = useState(
    sessao.ler("si_whatsapp") ? mascaraTelefone(sessao.ler("si_whatsapp")) : "",
  );
  const [r, setR] = useState<Respostas>(lerRascunho);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [falhou, setFalhou] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const sucessoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const clinicaId = useMemo(() => {
    const atual = sessao.ler("si_clinica_id");
    if (atual) return atual;
    const novo = novoIdClinica();
    sessao.gravar("si_clinica_id", novo);
    return novo;
  }, []);

  // Formulário longo: guarda o rascunho enquanto a pessoa digita.
  useEffect(() => {
    if (!enviado) sessao.gravar(RASCUNHO, JSON.stringify(r));
  }, [r, enviado]);

  useEffect(() => {
    if (enviado) sucessoRef.current?.focus();
  }, [enviado]);

  const set = <K extends keyof Respostas>(k: K, v: Respostas[K]) => setR((x) => ({ ...x, [k]: v }));

  const titulo =
    status === "confirmado"
      ? "Assinatura confirmada. Agora a configuração começa com você"
      : status === "pendente"
        ? "Falta só a confirmação do pagamento"
        : "Agora a configuração começa com você";

  const linkRecepcionista = `https://secretariainvisivel.com.br/recepcionista?c=${clinicaId}`;
  const nomeRecep = r.recepcionista_nome.trim().split(/\s+/)[0];
  const nomeClinica = r.nome_clinica.trim() || "nossa clínica";
  const mensagemConvite = [
    `${nomeRecep ? `Oi, ${nomeRecep}!` : "Oi!"} Estou contratando a Secretária Invisível para a ${nomeClinica}. Ela vai cuidar do WhatsApp quando você estiver com um paciente na frente e depois que você for embora. Você deixa de responder mensagem fora do horário e de repetir as mesmas perguntas o dia todo.`,
    "Mas ela só fica boa se alguém que conhece a clínica de verdade disser como a gente responde. Esse alguém é você: horários, perguntas que mais chegam, o jeito de falar com o paciente e o que só a gente resolve.",
    `Preenche a sua parte por aqui: ${linkRecepcionista}. Depois você testa antes de entrar no ar e me diz o que ajustar. Qualquer dúvida, me chama.`,
  ].join("\n\n");

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(mensagemConvite);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* sem permissão de área de transferência: o texto continua na tela */
    }
  };

  const validar = () => {
    const e: Record<string, string> = {};
    if (!emailValido(email)) e.email = "Confira o e-mail.";
    if (!telefoneValido(whatsapp)) e.whatsapp = "Confira o número com DDD.";
    if (!r.nome_clinica.trim()) e.nome_clinica = "Preencha este campo.";
    if (!r.enderecos.trim()) e.enderecos = "Preencha este campo.";
    if (!r.profissionais.some((p) => p.nome.trim())) e.profissionais = "Informe ao menos um profissional.";
    if (!r.horarios.trim()) e.horarios = "Preencha este campo.";
    if (!r.como_marca.length) e.como_marca = "Marque ao menos uma forma.";
    if (!r.agenda) e.agenda = "Escolha uma opção.";
    if (!r.so_particular && !r.convenios.trim()) e.convenios = "Liste os convênios ou marque só particular.";
    if (!r.perguntas_frequentes.trim()) e.perguntas_frequentes = "Preencha este campo.";
    if (!r.so_equipe_responde.trim()) e.so_equipe_responde = "Preencha este campo.";
    if (!r.tom) e.tom = "Escolha uma opção.";
    if (!telefoneValido(r.whatsapp_clinica)) e.whatsapp_clinica = "Confira o número com DDD.";
    return e;
  };

  const enviar = async (ev: FormEvent) => {
    ev.preventDefault();
    if (enviando) return;
    const e = validar();
    setErros(e);
    const primeiro = Object.keys(e)[0];
    if (primeiro) {
      formRef.current?.querySelector<HTMLElement>(`[data-campo="${primeiro}"]`)?.focus();
      return;
    }
    setEnviando(true);
    setFalhou(false);

    const corpo = {
      papel: "clinica",
      clinica_id: clinicaId,
      plano,
      email: email.trim().toLowerCase(),
      whatsapp: soDigitos(whatsapp),
      campos: {
        ...r,
        profissionais: r.profissionais.filter((p) => p.nome.trim()),
        whatsapp_clinica: soDigitos(r.whatsapp_clinica),
        recepcionista_whatsapp: r.sem_recepcionista ? "" : soDigitos(r.recepcionista_whatsapp),
        recepcionista_nome: r.sem_recepcionista ? "" : r.recepcionista_nome,
      },
      enviado_em: new Date().toISOString(),
      page_url: window.location.href,
    };

    // Aqui não vale o beacon: se a resposta não chegar, a pessoa precisa saber
    // e tentar de novo, com tudo o que escreveu ainda na tela.
    const ok = await postarComRetentativa(SI_CONFIG.webhooks.implantacao, corpo);
    setEnviando(false);
    if (ok) {
      sessao.apagar(RASCUNHO);
      setEnviado(true);
    } else {
      setFalhou(true);
    }
  };

  const radio = (nome: keyof Respostas, valor: string, rotulo: string) => (
    <label className="flex min-h-[44px] items-center gap-2.5 font-sans text-[15px]">
      <input
        type="radio"
        name={nome}
        value={valor}
        checked={r[nome] === valor}
        onChange={() => set(nome, valor as never)}
        className="h-5 w-5 accent-[#0A7A68]"
      />
      {rotulo}
    </label>
  );

  return (
    <Casca>
      <Helmet>
        <title>Próximos passos da assinatura | Secretária Invisível</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="referrer" content="no-referrer" />
      </Helmet>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12">
        <h1 className="font-display text-balance text-[30px] font-normal leading-tight tracking-[-0.03em] sm:text-[38px]">
          {titulo}
        </h1>
        <p className="font-sans mt-4 text-[17px] leading-[1.6] text-[#5A6570]">
          Preencha o formulário abaixo para a nossa equipe configurar o atendimento. Você pode
          preencher agora, antes mesmo da confirmação do pagamento.
        </p>

        <ol className="mt-6 list-decimal space-y-1.5 pl-5 font-sans text-[16px] leading-[1.55]">
          <li>Preencha o formulário de implantação.</li>
          <li>Convide sua recepcionista para completar a parte dela.</li>
          <li>Nossa equipe configura. Você e sua recepcionista testam e pedem os ajustes.</li>
          <li>Entra no ar.</li>
        </ol>
        <p className="font-sans mt-4 text-[15px] text-[#5A6570]">
          Quem prefere conversar: fale com a{" "}
          <a href={waSofia("Oi! Acabei de assinar e tenho uma dúvida sobre a implantação.")} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0A7A68] underline underline-offset-2">
            Sofia, nossa assistente virtual, no WhatsApp
          </a>
          . Reunião com o Leo, só em horário comercial.
        </p>

        {enviado ? (
          <div
            ref={sucessoRef}
            tabIndex={-1}
            role="status"
            className="mt-8 rounded-3xl p-6 outline-none"
            style={{ background: "#E6F6F2", border: "1px solid #A7E6DD" }}
          >
            <p className="font-display text-[22px] font-semibold">Recebemos.</p>
            <p className="font-sans mt-2 text-[16px] leading-[1.6]">
              Nossa equipe começa a configuração e fala com você pelo WhatsApp se precisar de algo.
            </p>
          </div>
        ) : (
          <form ref={formRef} noValidate onSubmit={enviar} data-clarity-mask="true" className="mt-8">
            <div className="rounded-t-3xl px-6 py-4 font-sans text-[15px] leading-[1.55] text-white" style={{ background: "#1B2430" }}>
              <strong>Não envie dados de pacientes neste formulário.</strong> Nada de nome, telefone ou
              informação de saúde de paciente. Aqui vão só as informações da clínica.
            </div>
            <div className="space-y-6 rounded-b-3xl border border-t-0 bg-white p-6 sm:p-7" style={{ borderColor: "#E5E7EB" }}>
              <div>
                <h2 className="font-display text-[22px] font-semibold">Conte como a sua clínica funciona</h2>
                <p className="font-sans mt-1 text-[15px] text-[#5A6570]">
                  Escreva do jeito que a recepção fala. Não precisa ficar bonito.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Bloco id="o-email" rotulo="Seu e-mail" ajuda="O mesmo da assinatura. Serve para ligar suas respostas à sua clínica." erro={erros.email}>
                  <input id="o-email" data-campo="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={entrada} style={{ borderColor: erros.email ? "#B42318" : "#CBD5E1" }} />
                </Bloco>
                <Bloco id="o-whats" rotulo="Seu WhatsApp" erro={erros.whatsapp}>
                  <input id="o-whats" data-campo="whatsapp" type="tel" inputMode="numeric" autoComplete="tel" placeholder="(11) 90000-0000" value={whatsapp} onChange={(e) => setWhatsapp(mascaraTelefone(e.target.value))} className={entrada} style={{ borderColor: erros.whatsapp ? "#B42318" : "#CBD5E1" }} />
                </Bloco>
              </div>

              <Bloco id="c1" numero={1} rotulo="Nome da clínica como o paciente conhece" ajuda="É o nome que o paciente usa quando liga ou escreve, mesmo que a razão social seja outra." erro={erros.nome_clinica}>
                <input id="c1" data-campo="nome_clinica" value={r.nome_clinica} onChange={(e) => set("nome_clinica", e.target.value)} className={entrada} style={{ borderColor: "#CBD5E1" }} />
              </Bloco>

              <Bloco id="c2" numero={2} rotulo="Endereço(s) de atendimento" ajuda="Um endereço por linha. Se houver mais de uma unidade, liste todas. Inclua referências que o paciente costuma pedir, como estacionamento." erro={erros.enderecos}>
                <textarea id="c2" data-campo="enderecos" rows={3} value={r.enderecos} onChange={(e) => set("enderecos", e.target.value)} className={entrada} style={{ borderColor: "#CBD5E1" }} />
              </Bloco>

              <fieldset>
                <legend className="font-sans text-[15px] font-semibold">3. Profissionais e especialidades</legend>
                <p className="font-sans mt-1 text-[13px] text-[#5A6570]">Como o paciente chama cada um, por exemplo "Dra. Ana".</p>
                <div className="mt-2 space-y-3">
                  {r.profissionais.map((p, i) => (
                    <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                      <input
                        aria-label={`Nome do profissional ${i + 1}`}
                        data-campo={i === 0 ? "profissionais" : undefined}
                        placeholder="Nome"
                        value={p.nome}
                        onChange={(e) => set("profissionais", r.profissionais.map((x, j) => (j === i ? { ...x, nome: e.target.value } : x)))}
                        className={entrada.replace("mt-1.5 ", "")}
                        style={{ borderColor: "#CBD5E1" }}
                      />
                      <input
                        aria-label={`Especialidade do profissional ${i + 1}`}
                        placeholder="Especialidade"
                        value={p.especialidade}
                        onChange={(e) => set("profissionais", r.profissionais.map((x, j) => (j === i ? { ...x, especialidade: e.target.value } : x)))}
                        className={entrada.replace("mt-1.5 ", "")}
                        style={{ borderColor: "#CBD5E1" }}
                      />
                      {r.profissionais.length > 1 && (
                        <button type="button" aria-label={`Remover profissional ${i + 1}`} onClick={() => set("profissionais", r.profissionais.filter((_, j) => j !== i))} className="grid min-h-[44px] min-w-[44px] place-items-center rounded-xl border text-[#5A6570]" style={{ borderColor: "#CBD5E1" }}>
                          <Trash2 size={16} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => set("profissionais", [...r.profissionais, { nome: "", especialidade: "" }])} className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-sans text-[15px] font-semibold text-[#0A7A68]">
                  <Plus size={16} aria-hidden="true" /> Adicionar profissional
                </button>
                {erros.profissionais && <p role="alert" className="font-sans mt-1 text-[13px] text-[#B42318]">{erros.profissionais}</p>}
              </fieldset>

              <Bloco id="c4" numero={4} rotulo="Horários de atendimento" ajuda="Por profissional e por dia. Inclua pausas e dias sem atendimento." erro={erros.horarios}>
                <textarea id="c4" data-campo="horarios" rows={4} value={r.horarios} onChange={(e) => set("horarios", e.target.value)} className={entrada} style={{ borderColor: "#CBD5E1" }} />
              </Bloco>

              <fieldset>
                <legend className="font-sans text-[15px] font-semibold">5. Como o paciente marca consulta hoje</legend>
                <p className="font-sans mt-1 text-[13px] text-[#5A6570]">Marque todas as formas que existem hoje.</p>
                <div className="mt-1 grid sm:grid-cols-2">
                  {COMO_MARCA.map((op, i) => (
                    <label key={op} className="flex min-h-[44px] items-center gap-2.5 font-sans text-[15px]">
                      <input
                        type="checkbox"
                        data-campo={i === 0 ? "como_marca" : undefined}
                        checked={r.como_marca.includes(op)}
                        onChange={(e) => set("como_marca", e.target.checked ? [...r.como_marca, op] : r.como_marca.filter((x) => x !== op))}
                        className="h-5 w-5 accent-[#0A7A68]"
                      />
                      {op}
                    </label>
                  ))}
                </div>
                {r.como_marca.includes("Outro") && (
                  <input aria-label="Qual outra forma?" placeholder="Qual outra forma?" value={r.como_marca_outro} onChange={(e) => set("como_marca_outro", e.target.value)} className={entrada} style={{ borderColor: "#CBD5E1" }} />
                )}
                {erros.como_marca && <p role="alert" className="font-sans mt-1 text-[13px] text-[#B42318]">{erros.como_marca}</p>}
              </fieldset>

              <fieldset>
                <legend className="font-sans text-[15px] font-semibold">6. Agenda que a clínica usa</legend>
                <div className="mt-1" data-campo="agenda" tabIndex={-1}>
                  {radio("agenda", "google", "Google Agenda")}
                  {radio("agenda", "outra", "Outra")}
                  {radio("agenda", "nenhuma", "Papel ou nenhuma")}
                </div>
                {r.agenda === "outra" && (
                  <input aria-label="Qual agenda?" placeholder="Qual agenda?" value={r.agenda_qual} onChange={(e) => set("agenda_qual", e.target.value)} className={entrada} style={{ borderColor: "#CBD5E1" }} />
                )}
                <p className="font-sans mt-1 text-[13px] text-[#5A6570]">Se for outra, avaliamos a integração na implantação.</p>
                {erros.agenda && <p role="alert" className="font-sans mt-1 text-[13px] text-[#B42318]">{erros.agenda}</p>}
              </fieldset>

              <Bloco id="c7" numero={7} rotulo="Convênios aceitos" ajuda="Liste os convênios e observações, como procedimentos que não cobrem." erro={erros.convenios}>
                <textarea id="c7" data-campo="convenios" rows={3} disabled={r.so_particular} value={r.convenios} onChange={(e) => set("convenios", e.target.value)} className={`${entrada} disabled:bg-[#F1F5F9]`} style={{ borderColor: "#CBD5E1" }} />
                <label className="mt-1 flex min-h-[44px] items-center gap-2.5 font-sans text-[15px]">
                  <input type="checkbox" checked={r.so_particular} onChange={(e) => set("so_particular", e.target.checked)} className="h-5 w-5 accent-[#0A7A68]" />
                  Só particular
                </label>
              </Bloco>

              <Bloco id="c8" numero={8} rotulo="Valores de consulta particular" obrigatorio={false} ajuda="Preencha só se quiser que a Secretária Invisível informe valores. Em branco, combinamos com você como tratar essa pergunta.">
                <textarea id="c8" rows={2} value={r.valores_particular} onChange={(e) => set("valores_particular", e.target.value)} className={entrada} style={{ borderColor: "#CBD5E1" }} />
              </Bloco>

              <Bloco id="c9" numero={9} rotulo="Perguntas que mais chegam no WhatsApp" ajuda="As que a recepção mais repete, de 5 a 10. Se puder, escreva também como responde hoje." erro={erros.perguntas_frequentes}>
                <textarea id="c9" data-campo="perguntas_frequentes" rows={5} value={r.perguntas_frequentes} onChange={(e) => set("perguntas_frequentes", e.target.value)} className={entrada} style={{ borderColor: "#CBD5E1" }} />
              </Bloco>

              <Bloco id="c10" numero={10} rotulo="O que só a equipe responde" ajuda="Assuntos que devem ir direto para uma pessoa. Exemplos: dúvida clínica, resultado de exame, reclamação." erro={erros.so_equipe_responde}>
                <textarea id="c10" data-campo="so_equipe_responde" rows={3} value={r.so_equipe_responde} onChange={(e) => set("so_equipe_responde", e.target.value)} className={entrada} style={{ borderColor: "#CBD5E1" }} />
              </Bloco>

              <fieldset>
                <legend className="font-sans text-[15px] font-semibold">11. Tom de voz da clínica</legend>
                <div className="mt-1" data-campo="tom" tabIndex={-1}>
                  {radio("tom", "acolhedor", "Acolhedor e próximo")}
                  {radio("tom", "equilibrado", "Equilibrado")}
                  {radio("tom", "formal", "Formal e objetivo")}
                </div>
                <input aria-label="Uma frase como a clínica falaria" placeholder="Uma frase como a clínica falaria" value={r.tom_frase} onChange={(e) => set("tom_frase", e.target.value)} className={entrada} style={{ borderColor: "#CBD5E1" }} />
                <p className="font-sans mt-1 text-[13px] text-[#5A6570]">Diga também se trata o paciente por "você" ou por "senhor" e "senhora".</p>
                {erros.tom && <p role="alert" className="font-sans mt-1 text-[13px] text-[#B42318]">{erros.tom}</p>}
              </fieldset>

              <Bloco id="c12" numero={12} rotulo="Número de WhatsApp que será usado" ajuda="O número que seus pacientes já conhecem. Não precisa trocar." erro={erros.whatsapp_clinica}>
                <input id="c12" data-campo="whatsapp_clinica" type="tel" inputMode="numeric" placeholder="(11) 90000-0000" value={r.whatsapp_clinica} onChange={(e) => set("whatsapp_clinica", mascaraTelefone(e.target.value))} className={entrada} style={{ borderColor: "#CBD5E1" }} />
              </Bloco>

              <fieldset aria-describedby="aviso-recep">
                <legend className="font-sans text-[15px] font-semibold">13 e 14. Sua recepcionista <span className="font-normal text-[#5A6570]">(opcional)</span></legend>
                <p id="aviso-recep" className="font-sans mt-1 text-[13px] text-[#5A6570]">
                  Avisamos sua recepcionista de que o contato dela veio de você, só para a configuração.
                </p>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  <input aria-label="Nome da recepcionista" placeholder="Nome" disabled={r.sem_recepcionista} value={r.recepcionista_nome} onChange={(e) => set("recepcionista_nome", e.target.value)} className={`${entrada.replace("mt-1.5 ", "")} disabled:bg-[#F1F5F9]`} style={{ borderColor: "#CBD5E1" }} />
                  <input aria-label="WhatsApp da recepcionista" type="tel" inputMode="numeric" placeholder="(11) 90000-0000" disabled={r.sem_recepcionista} value={r.recepcionista_whatsapp} onChange={(e) => set("recepcionista_whatsapp", mascaraTelefone(e.target.value))} className={`${entrada.replace("mt-1.5 ", "")} disabled:bg-[#F1F5F9]`} style={{ borderColor: "#CBD5E1" }} />
                </div>
                <p className="font-sans mt-1 text-[13px] text-[#5A6570]">
                  Ela recebe o convite para completar a parte dela. Só usamos o número para o convite e para falar sobre a configuração.
                </p>
                <label className="mt-1 flex min-h-[44px] items-center gap-2.5 font-sans text-[15px]">
                  <input type="checkbox" checked={r.sem_recepcionista} onChange={(e) => set("sem_recepcionista", e.target.checked)} className="h-5 w-5 accent-[#0A7A68]" />
                  Não temos recepcionista
                </label>
              </fieldset>

              <fieldset>
                <legend className="font-sans text-[15px] font-semibold">15. Janela preferida para uma conversa de início <span className="font-normal text-[#5A6570]">(opcional)</span></legend>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  <select aria-label="Dia" value={r.kickoff_dia} onChange={(e) => set("kickoff_dia", e.target.value)} className={entrada.replace("mt-1.5 ", "")} style={{ borderColor: "#CBD5E1" }}>
                    <option value="">Dia</option>
                    {["Segunda", "Terça", "Quarta", "Quinta", "Sexta"].map((d) => <option key={d}>{d}</option>)}
                  </select>
                  <select aria-label="Faixa de horário" value={r.kickoff_faixa} onChange={(e) => set("kickoff_faixa", e.target.value)} className={entrada.replace("mt-1.5 ", "")} style={{ borderColor: "#CBD5E1" }}>
                    <option value="">Faixa</option>
                    {["Manhã", "Início da tarde", "Fim da tarde"].map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <p className="font-sans mt-1 text-[13px] text-[#5A6570]">Conversa opcional de 15 minutos, em horário comercial, para tirar dúvidas. A configuração segue sem ela.</p>
              </fieldset>

              {falhou && (
                <p role="alert" className="rounded-xl p-3 font-sans text-[14px] leading-[1.5]" style={{ background: "#FEF3F2", color: "#7A271A" }}>
                  Não conseguimos enviar agora. Suas respostas continuam aqui, é só tentar de novo. Se
                  persistir, fale com a{" "}
                  <a href={waSofia("Oi! Não consegui enviar o formulário de implantação.")} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                    Sofia no WhatsApp
                  </a>
                  .
                </p>
              )}

              <button type="submit" aria-disabled={enviando} className="gradient-brand flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-[16px] font-bold text-white">
                {enviando ? (<><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Enviando</>) : "Enviar para a equipe configurar"}
              </button>
            </div>
          </form>
        )}

        {!r.sem_recepcionista && (
          <section aria-labelledby="h-convite" className="mt-8 rounded-3xl border bg-white p-6 sm:p-7" style={{ borderColor: "#A7E6DD" }}>
            <h2 id="h-convite" className="font-display text-[22px] font-semibold">Chame sua recepcionista</h2>
            <p className="font-sans mt-2 text-[16px] leading-[1.6]">
              Ninguém conhece a clínica como ela. Mande o convite e deixe que ela complete a parte dela.
            </p>
            <div className="mt-4 whitespace-pre-line rounded-2xl p-4 font-sans text-[15px] leading-[1.6]" style={{ background: "#F7F9FA" }}>
              {mensagemConvite}
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a href={`https://wa.me/?text=${encodeURIComponent(mensagemConvite)}`} target="_blank" rel="noopener noreferrer" className="gradient-brand inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-2.5 font-display text-[15px] font-bold text-white">
                <MessageCircle size={16} aria-hidden="true" /> Enviar pelo WhatsApp
              </a>
              <button type="button" onClick={copiar} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#0A7A68] bg-white px-5 py-2.5 font-display text-[15px] font-bold text-[#0A7A68]">
                <Copy size={16} aria-hidden="true" /> {copiado ? "Mensagem copiada" : "Copiar mensagem"}
              </button>
            </div>
          </section>
        )}
      </main>
    </Casca>
  );
};

export default AssinaturaObrigado;

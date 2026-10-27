import { useRef, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Casca from "@/components/assinatura/Casca";
import { SI_CONFIG, waSofia } from "@/config/si";
import { postarComRetentativa } from "@/lib/formatos";

const entrada =
  "mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 font-sans text-[16px] outline-none transition-colors focus:border-[#0A7A68] focus:ring-2 focus:ring-[#0A7A68]/25";

type Campos = {
  quem_respondeu: string;
  horarios: string;
  perguntas_frequentes: string;
  so_equipe_responde: string;
  tom: "" | "acolhedor" | "equilibrado" | "formal";
  tom_frase: string;
};

/**
 * A parte da recepção no formulário de implantação.
 *
 * A recepcionista chega aqui pelo convite que o dono da clínica encaminha, com
 * o código da clínica no ?c. Sem o código não há a quem ligar as respostas,
 * então o formulário nem aparece.
 */
const Recepcionista = () => {
  const [params] = useSearchParams();
  const c = params.get("c") ?? "";
  const codigoValido = /^[A-Za-z0-9]{1,32}$/.test(c);

  const [v, setV] = useState<Campos>({
    quem_respondeu: "",
    horarios: "",
    perguntas_frequentes: "",
    so_equipe_responde: "",
    tom: "",
    tom_frase: "",
  });
  const [erros, setErros] = useState<Partial<Record<keyof Campos, string>>>({});
  const [enviando, setEnviando] = useState(false);
  const [falhou, setFalhou] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof Campos>(k: K, valor: Campos[K]) => setV((x) => ({ ...x, [k]: valor }));

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    const novos: Partial<Record<keyof Campos, string>> = {};
    if (!v.horarios.trim()) novos.horarios = "Preencha este campo.";
    if (!v.perguntas_frequentes.trim()) novos.perguntas_frequentes = "Preencha este campo.";
    if (!v.so_equipe_responde.trim()) novos.so_equipe_responde = "Preencha este campo.";
    if (!v.tom) novos.tom = "Escolha uma opção.";
    setErros(novos);
    const primeiro = Object.keys(novos)[0];
    if (primeiro) {
      formRef.current?.querySelector<HTMLElement>(`[data-campo="${primeiro}"]`)?.focus();
      return;
    }
    setEnviando(true);
    setFalhou(false);
    const ok = await postarComRetentativa(SI_CONFIG.webhooks.implantacao, {
      papel: "recepcionista",
      clinica_id: c,
      campos: v,
      enviado_em: new Date().toISOString(),
      page_url: window.location.href,
    });
    setEnviando(false);
    if (ok) setEnviado(true);
    else setFalhou(true);
  };

  const erro = (k: keyof Campos) =>
    erros[k] ? (
      <p role="alert" className="font-sans mt-1 text-[13px] text-[#B42318]">
        {erros[k]}
      </p>
    ) : null;

  return (
    <Casca semLinkInicio>
      <Helmet>
        <title>A parte da recepção | Secretária Invisível</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="referrer" content="no-referrer" />
      </Helmet>

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 md:py-12">
        {!codigoValido ? (
          <>
            <h1 className="font-display text-[30px] font-normal tracking-[-0.03em]">Este link está incompleto</h1>
            <p className="font-sans mt-3 text-[17px] leading-[1.6] text-[#5A6570]">
              Peça à clínica para reenviar o convite. O link certo termina com o código da clínica.
            </p>
          </>
        ) : enviado ? (
          <div role="status" className="rounded-3xl p-6" style={{ background: "#E6F6F2", border: "1px solid #A7E6DD" }}>
            <h1 className="font-display text-[26px] font-semibold">Recebemos a sua parte.</h1>
            <p className="font-sans mt-2 text-[16px] leading-[1.6]">
              Obrigado. A equipe usa o que você contou para configurar o atendimento. Antes de entrar
              no ar, você testa e diz o que ajustar.
            </p>
          </div>
        ) : (
          <>
            <h1 className="font-display text-[30px] font-normal tracking-[-0.03em] sm:text-[38px]">A parte da recepção</h1>
            <p className="font-sans mt-3 text-[17px] leading-[1.6] text-[#5A6570]">
              Você conhece esta clínica melhor que qualquer sistema. Responda no seu jeito, sem pressa
              e sem formalidade. O que você contar aqui vira o jeito de a Secretária Invisível atender
              os pacientes. Não escreva nome nem dado de saúde de paciente.
            </p>

            <form ref={formRef} noValidate onSubmit={enviar} data-clarity-mask="true" className="mt-8 space-y-6 rounded-3xl border bg-white p-6 sm:p-7" style={{ borderColor: "#E5E7EB" }}>
              <div>
                <label htmlFor="r-nome" className="block font-sans text-[15px] font-semibold">
                  Seu nome <span className="font-normal text-[#5A6570]">(opcional)</span>
                </label>
                <input id="r-nome" value={v.quem_respondeu} onChange={(e) => set("quem_respondeu", e.target.value)} className={entrada} style={{ borderColor: "#CBD5E1" }} />
                <p className="font-sans mt-1 text-[13px] text-[#5A6570]">Só para a equipe saber com quem falar se tiver dúvida. Pode deixar em branco.</p>
              </div>
              <div>
                <label htmlFor="r-hor" className="block font-sans text-[15px] font-semibold">Horários de atendimento</label>
                <textarea id="r-hor" data-campo="horarios" rows={4} value={v.horarios} onChange={(e) => set("horarios", e.target.value)} className={entrada} style={{ borderColor: "#CBD5E1" }} />
                <p className="font-sans mt-1 text-[13px] text-[#5A6570]">Por profissional e por dia. Inclua pausas e dias sem atendimento.</p>
                {erro("horarios")}
              </div>
              <div>
                <label htmlFor="r-perg" className="block font-sans text-[15px] font-semibold">Perguntas que mais chegam no WhatsApp</label>
                <textarea id="r-perg" data-campo="perguntas_frequentes" rows={5} value={v.perguntas_frequentes} onChange={(e) => set("perguntas_frequentes", e.target.value)} className={entrada} style={{ borderColor: "#CBD5E1" }} />
                <p className="font-sans mt-1 text-[13px] text-[#5A6570]">As que você mais repete, de 5 a 10. Se puder, escreva também como responde hoje.</p>
                {erro("perguntas_frequentes")}
              </div>
              <div>
                <label htmlFor="r-equipe" className="block font-sans text-[15px] font-semibold">O que só a equipe responde</label>
                <textarea id="r-equipe" data-campo="so_equipe_responde" rows={3} value={v.so_equipe_responde} onChange={(e) => set("so_equipe_responde", e.target.value)} className={entrada} style={{ borderColor: "#CBD5E1" }} />
                <p className="font-sans mt-1 text-[13px] text-[#5A6570]">Assuntos que devem ir direto para uma pessoa. Exemplos: dúvida clínica, resultado de exame, reclamação.</p>
                {erro("so_equipe_responde")}
              </div>
              <fieldset>
                <legend className="font-sans text-[15px] font-semibold">Tom de voz da clínica</legend>
                <div className="mt-1" data-campo="tom" tabIndex={-1}>
                  {(
                    [
                      ["acolhedor", "Acolhedor e próximo"],
                      ["equilibrado", "Equilibrado"],
                      ["formal", "Formal e objetivo"],
                    ] as const
                  ).map(([valor, rotulo]) => (
                    <label key={valor} className="flex min-h-[44px] items-center gap-2.5 font-sans text-[15px]">
                      <input type="radio" name="tom" checked={v.tom === valor} onChange={() => set("tom", valor)} className="h-5 w-5 accent-[#0A7A68]" />
                      {rotulo}
                    </label>
                  ))}
                </div>
                <input aria-label="Uma frase como a clínica falaria" placeholder="Uma frase como a clínica falaria" value={v.tom_frase} onChange={(e) => set("tom_frase", e.target.value)} className={entrada} style={{ borderColor: "#CBD5E1" }} />
                <p className="font-sans mt-1 text-[13px] text-[#5A6570]">Diga também se trata o paciente por "você" ou por "senhor" e "senhora".</p>
                {erro("tom")}
              </fieldset>

              {falhou && (
                <p role="alert" className="rounded-xl p-3 font-sans text-[14px] leading-[1.5]" style={{ background: "#FEF3F2", color: "#7A271A" }}>
                  Não conseguimos enviar agora. Suas respostas continuam aqui, é só tentar de novo. Se
                  persistir, fale com a{" "}
                  <a href={waSofia()} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                    Sofia no WhatsApp
                  </a>
                  .
                </p>
              )}

              <button type="submit" aria-disabled={enviando} className="gradient-brand flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-[16px] font-bold text-white">
                {enviando ? (<><Loader2 size={18} className="animate-spin" aria-hidden="true" /> Enviando</>) : "Enviar minha parte"}
              </button>
            </form>
          </>
        )}
      </main>
    </Casca>
  );
};

export default Recepcionista;

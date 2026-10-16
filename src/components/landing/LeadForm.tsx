import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { revealOnScroll } from "@/lib/animations";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { turmaAtual } from "@/config/turma";

/** Não mexer: é o fluxo de captação em produção. */
const WEBHOOK_URL =
  "https://n8n.sapientiabr.cloud/webhook/07064e80-60ef-49c0-95ec-9b3837a8c87e";

const onlyDigits = (v: string) => v.replace(/\D/g, "");

const maskPhoneBR = (v: string) => {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

/**
 * O e-mail virou opcional, então não basta marcar `.optional()`: um campo
 * controlado devolve string vazia, não `undefined`, e o validador de e-mail
 * reprovaria "". O `union` com literal vazio aceita os dois casos.
 */
const emailOpcional = z.union([
  z.literal(""),
  z.string().trim().email("E-mail inválido").max(120, "E-mail muito longo"),
]);

const base = {
  nome: z.string().trim().min(2, "Informe seu nome").max(80, "Nome muito longo"),
  telefone: z
    .string()
    .trim()
    .refine((v) => {
      const d = onlyDigits(v);
      return d.length >= 10 && d.length <= 11;
    }, "WhatsApp inválido"),
  email: emailOpcional,
};

const schemaClinica = z.object({
  ...base,
  profissionais: z.string().min(1, "Escolha uma opção"),
});

const schemaMedico = z.object({
  ...base,
  especialidade: z.string().trim().max(60, "Muito longo").optional(),
});

type ValoresClinica = z.infer<typeof schemaClinica>;
type ValoresMedico = z.infer<typeof schemaMedico>;
type Valores = ValoresClinica & Partial<ValoresMedico>;

const CAMPO =
  "h-12 rounded-xl border-[#E5E7EB] bg-white text-[var(--text)] placeholder:text-[#9CA3AF] focus-visible:ring-2 focus-visible:ring-[#0FB5A3] focus-visible:ring-offset-0 focus-visible:border-[#0FB5A3]";
const ROTULO = "font-display-sans text-[13px] font-semibold text-[#1F2937]";

type Props = {
  /** Muda o campo extra e o valor de `origem` enviado ao webhook. */
  origem?: "clinica" | "medico";
};

/**
 * Formulário de demonstração — a única captação do site.
 *
 * Havia dois antes (demonstração e diagnóstico), com textos diferentes e a
 * mesma função. Dois formulários na mesma página dividem a atenção e a
 * métrica sem dividir o trabalho.
 */
export const LeadForm = ({ origem = "clinica" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [enviado] = useState(false);
  const navigate = useNavigate();
  const turma = turmaAtual();
  const ehMedico = origem === "medico";

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  const form = useForm<Valores>({
    resolver: zodResolver(ehMedico ? schemaMedico : schemaClinica) as never,
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      profissionais: "",
      especialidade: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (values: Valores) => {
    setSubmitting(true);

    const payload = {
      name: values.nome,
      email: values.email || "",
      whatsapp: onlyDigits(values.telefone),
      company: "",
      instagram: "",
      site: "",
      revenue: "",
      // Campos ocultos: por qual página o lead entrou e em que turma cai.
      origem,
      turma: turma.etiqueta,
      profissionais: ehMedico ? "" : values.profissionais || "",
      especialidade: ehMedico ? values.especialidade || "" : "",
    };

    // Dispara e segue: o retorno do webhook não muda o que a pessoa vê.
    try {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
        mode: "no-cors",
      }).catch(() => {});
    } catch {
      /* noop */
    }

    if (typeof window !== "undefined" && (window as never as { fbq?: (...a: unknown[]) => void }).fbq) {
      (window as never as { fbq: (...a: unknown[]) => void }).fbq("track", "Lead");
    }

    setSubmitting(false);
    navigate("/obrigado");
  };

  return (
    <section id="demo" className="py-12 md:py-16 relative scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl relative z-10">
        <div className="text-center mb-6" data-reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 bg-[#D6F3EE] border border-[#A7E6DD]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#0FB5A3] opacity-50 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0A8C7E]" />
            </span>
            <span className="font-display text-[12px] uppercase tracking-[0.18em] font-bold text-[#055449]">
              Demonstração ao vivo, grátis
            </span>
          </div>

          <h2 className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-normal text-[#1F2937] text-balance tracking-[-0.04em]">
            Veja a Secretária Invisível atendendo você.
          </h2>
          <p className="font-sans text-[17px] text-[#4B5563] mt-4 leading-[1.6] max-w-md mx-auto">
            Deixe seu WhatsApp. Em segundos ela te chama com a mesma conversa que seu paciente
            teria.
          </p>
        </div>

        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            boxShadow: "0 18px 44px rgba(15, 23, 42,0.06)",
          }}
          data-reveal
        >
          {enviado ? (
            /* `role="status"` faz o leitor de tela anunciar a confirmação sem
               precisar mover o foco — o formulário sumiu e sem isso a pessoa
               não saberia que deu certo. */
            <div role="status" className="py-6 text-center">
              <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-[#D6F3EE] text-[#055449]">
                <Check size={26} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <p className="font-display text-[20px] font-semibold text-[#1F2937] text-balance">
                Pronto! Abra seu WhatsApp: a Secretária Invisível já está te chamando.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={ROTULO}>Nome</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Seu nome"
                          autoComplete="name"
                          maxLength={80}
                          className={CAMPO}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={ROTULO}>WhatsApp</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          inputMode="tel"
                          placeholder="(11) 99999-9999"
                          autoComplete="tel-national"
                          maxLength={16}
                          onChange={(e) => field.onChange(maskPhoneBR(e.target.value))}
                          className={CAMPO}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {ehMedico ? (
                  <FormField
                    control={form.control}
                    name="especialidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={ROTULO}>
                          Especialidade <span className="font-normal text-[#6B7280]">(opcional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ex.: dermatologia"
                            maxLength={60}
                            className={CAMPO}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="profissionais"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={ROTULO}>Quantos profissionais atendem?</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className={`${CAMPO} w-full appearance-none px-3`}
                          >
                            <option value="">Selecione</option>
                            <option value="so-eu">Só eu</option>
                            <option value="2-a-3">2 a 3</option>
                            <option value="4-ou-mais">4 ou mais</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={ROTULO}>
                        E-mail <span className="font-normal text-[#6B7280]">(opcional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          inputMode="email"
                          placeholder="voce@clinica.com.br"
                          autoComplete="email"
                          maxLength={120}
                          className={CAMPO}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="group mt-2 inline-flex items-center justify-center gap-2.5 w-full gradient-brand text-white font-display font-bold text-[16px] rounded-full h-14 px-6 shadow-[0_14px_36px_rgba(15, 181, 163,0.35)] hover:shadow-[0_18px_44px_rgba(15, 181, 163,0.45)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {submitting ? (
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <>
                      <span className="text-balance">
                        Quero ver a demonstração no meu WhatsApp
                      </span>
                      <ArrowRight
                        size={16}
                        className="flex-none transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>

                <p className="font-sans text-[14px] text-[#4B5563] text-center leading-relaxed pt-1">
                  Grátis · Sem ligação · Sem disparo em massa
                </p>
              </form>
            </Form>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadForm;

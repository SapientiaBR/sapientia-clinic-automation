import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Loader2 } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
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

const WEBHOOK_URL =
  "https://n8n.sapientiabr.cloud/webhook/07064e80-60ef-49c0-95ec-9b3837a8c87e";

const onlyDigits = (v: string) => v.replace(/\D/g, "");

const maskPhoneBR = (v: string) => {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const schema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe seu nome")
    .max(80, "Nome muito longo"),
  email: z
    .string()
    .trim()
    .email("E-mail inválido")
    .max(120, "E-mail muito longo"),
  telefone: z
    .string()
    .trim()
    .refine((v) => {
      const d = onlyDigits(v);
      return d.length >= 10 && d.length <= 11;
    }, "WhatsApp inválido"),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  variant?: "default" | "compact";
};

export const LeadForm = ({ variant = "default" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isCompact = variant === "compact";
  const [submitting, setSubmitting] = useState(false);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", email: "", telefone: "" },
    mode: "onBlur",
  });

  const onSubmit = (values: FormValues) => {
    setSubmitting(true);

    const payload = {
      name: values.nome,
      email: values.email,
      whatsapp: onlyDigits(values.telefone),
      company: "",
      instagram: "",
      site: "",
      revenue: "",
      origem: isCompact ? "landing-pos-pricing" : "landing-pos-hero",
    };

    // Fire-and-forget; redireciona imediatamente.
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

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }

    window.location.href = "/obrigado";
  };

  return (
    <section
      id={isCompact ? "diagnostico" : "demonstracao"}
      className={`${isCompact ? "py-12 md:py-16" : "py-12 md:py-16"} relative scroll-mt-24`}
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl relative z-10">
        <div className="text-center mb-6" data-reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 bg-[#e6dcff] border border-[#c4adff]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#7c3aed] opacity-50 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6d28d9]" />
            </span>
            <span className="font-display text-[12px] uppercase tracking-[0.18em] font-bold text-[#4c1d95]">
              {isCompact ? "Diagnóstico gratuito" : "Demonstração ao vivo, grátis"}
            </span>
          </div>

          {isCompact ? (
            <>
              <h2 className="font-display text-[26px] sm:text-[34px] lg:text-[40px] font-normal text-[#0c0a22] text-balance tracking-[-0.04em]">
                Ver como funcionaria na minha clínica.
              </h2>
              <p className="font-sans text-[17px] text-[#3e3c58] mt-4 leading-[1.6] max-w-md mx-auto">
                Deixe seus dados e nossa equipe entra em contato para marcar 30 minutos de
                conversa sobre a sua recepção.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-normal text-[#0c0a22] text-balance tracking-[-0.04em]">
                Veja uma conversa real antes de decidir.
              </h2>
              <p className="font-sans text-[17px] text-[#3e3c58] mt-4 leading-[1.6] max-w-md mx-auto">
                Preencha abaixo e a Secretária Invisível te chama no WhatsApp em segundos.
                É a mesma conversa que seu paciente teria.
              </p>
            </>
          )}
        </div>


        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{
            background: "#FFFFFF",
            border: "1px solid #e6e4ef",
            boxShadow: "0 18px 44px rgba(12, 10, 34,0.06)",
          }}
          data-reveal
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-display-sans text-[13px] font-semibold text-[#0c0a22]">
                      Nome
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Seu nome"
                        autoComplete="name"
                        maxLength={80}
                        className="h-12 rounded-xl border-[#e6e4ef] bg-white text-[var(--text)] placeholder:text-[#6a6882] focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-0 focus-visible:border-[#7c3aed]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-display-sans text-[13px] font-semibold text-[#0c0a22]">
                      E-mail
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        inputMode="email"
                        placeholder="voce@clinica.com.br"
                        autoComplete="email"
                        maxLength={120}
                        className="h-12 rounded-xl border-[#e6e4ef] bg-white text-[var(--text)] placeholder:text-[#6a6882] focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-0 focus-visible:border-[#7c3aed]"
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
                    <FormLabel className="font-display-sans text-[13px] font-semibold text-[#0c0a22]">
                      WhatsApp
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        inputMode="tel"
                        placeholder="(11) 99999-9999"
                        autoComplete="tel-national"
                        maxLength={16}
                        onChange={(e) => field.onChange(maskPhoneBR(e.target.value))}
                        className="h-12 rounded-xl border-[#e6e4ef] bg-white text-[var(--text)] placeholder:text-[#6a6882] focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-0 focus-visible:border-[#7c3aed]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={submitting}
                className="group mt-2 inline-flex items-center justify-center gap-2.5 w-full gradient-brand text-white font-display font-bold text-[16px] rounded-full h-14 px-8 shadow-[0_14px_36px_rgba(124, 58, 237,0.35)] hover:shadow-[0_18px_44px_rgba(124, 58, 237,0.45)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                ) : (
                  <>
                    <span>{isCompact ? "Ver como funcionaria na minha clínica" : "Quero ver a conversa"}</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>

              <p className="font-sans text-[15px] text-[#3e3c58] text-center leading-relaxed pt-1">
                Seus dados são usados apenas para o contato da sua clínica. Sem disparo em massa.
              </p>

            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;

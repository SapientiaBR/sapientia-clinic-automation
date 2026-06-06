import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { MessageSquare } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { revealOnScroll } from "@/lib/animations";

const N8N_WEBHOOK_URL =
  "https://n8n.sapientiabr.cloud/webhook/07064e80-60ef-49c0-95ec-9b3837a8c87e";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido").max(20),
});

type Props = {
  /** Some sections render a more compact variant of the form. */
  variant?: "default" | "compact";
};

export const LeadForm = ({ variant = "default" }: Props) => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ nome, whatsapp });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Verifique os dados");
      return;
    }
    setSubmitting(true);

    const payload = new URLSearchParams({
      nome,
      whatsapp,
      origem: "landing-page-simples",
      url: window.location.href,
      submitted_at: new Date().toISOString(),
    }).toString();

    const fireAndForget = async () => {
      try {
        const ctrl = new AbortController();
        const t = window.setTimeout(() => ctrl.abort(), 4500);
        await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: payload,
          signal: ctrl.signal,
          keepalive: true,
        });
        window.clearTimeout(t);
      } catch {
        /* fire and forget */
      }
    };

    void fireAndForget();

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }

    navigate("/obrigado");
    window.scrollTo(0, 0);
  };

  const isCompact = variant === "compact";

  return (
    <section
      id={isCompact ? undefined : "formulario"}
      className={`${isCompact ? "py-10 md:py-14" : "py-14 md:section-padding"} relative scroll-mt-24`}
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl relative z-10">
        <div className="text-center mb-6 md:mb-8" data-reveal>
          <Eyebrow>// teste a IA agora</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            Coloque seu WhatsApp. <em>Nossa IA te chama em minutos.</em>
          </h2>
          <p className="font-sans text-[14px] md:text-[15px] text-[var(--text-muted)] mt-3 md:mt-4 leading-relaxed max-w-md mx-auto">
            Esse contato no seu WhatsApp é a demonstração. A própria IA vai te atender, agendar, responder
            dúvidas. Você sente na pele como o paciente vai sentir.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-[24px] p-5 sm:p-8 relative"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E9E0D6",
            boxShadow: "0 24px 60px rgba(70,55,35,0.10)",
          }}
          data-reveal
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Nome"
              value={nome}
              onChange={setNome}
              placeholder="Seu nome"
              type="text"
              maxLength={100}
              autoComplete="name"
            />
            <Input
              label="WhatsApp"
              value={whatsapp}
              onChange={setWhatsapp}
              placeholder="(11) 99999-9999"
              type="tel"
              maxLength={20}
              autoComplete="tel"
            />
          </div>

          {error && (
            <p className="font-sans text-sm text-[#EF6F7A] mt-4" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-5 gradient-brand text-white font-sans font-bold text-[14px] tracking-[0.02em] uppercase rounded-full h-14 flex items-center justify-center gap-2 shadow-[0_16px_34px_rgba(138,124,246,0.28)] hover:shadow-[0_20px_42px_rgba(138,124,246,0.38)] transition-all disabled:opacity-70"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <MessageSquare size={18} />
                Quero a IA me chamando agora
              </>
            )}
          </button>

          <p className="font-mono text-[11px] text-[var(--text-dim)] text-center mt-5">
            🔒 Dados protegidos. Compatível com LGPD. Zero spam.
          </p>
        </form>
      </div>
    </section>
  );
};

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  maxLength,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type: string;
  maxLength: number;
  autoComplete?: string;
}) => (
  <label className="block">
    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-2">
      {label}
    </span>
    <input
      type={type}
      value={value}
      maxLength={maxLength}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#FBFAF7] border border-[#E9E0D6] rounded-xl px-4 py-3.5 font-sans text-[15px] text-[var(--text)] placeholder:text-[var(--text-dim)] outline-none transition-all focus:border-[#8A7CF6] focus:bg-white focus:shadow-[0_0_0_3px_rgba(138,124,246,0.18)]"
    />
  </label>
);

export default LeadForm;

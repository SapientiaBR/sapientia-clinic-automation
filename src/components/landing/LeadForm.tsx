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
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
            style={{
              background: "#F1EEFF",
              border: "1px solid #DED8FF",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#8A7CF6] opacity-50 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6F63E8]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6F63E8]">
              Demonstração ao vivo, grátis
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] text-balance">
            Veja sua secretária digital <em>atendendo você agora</em>.
          </h2>
          <p className="font-sans text-[14px] md:text-[15px] text-[var(--text-muted)] mt-3 md:mt-4 leading-relaxed max-w-md mx-auto">
            A IA te chama no WhatsApp em minutos. Você sente o que o seu paciente sente.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-[28px] p-6 sm:p-9 relative overflow-hidden"
          style={{
            background: "#1A1726",
            border: "1px solid rgba(138,124,246,0.22)",
            boxShadow:
              "0 30px 80px rgba(20,15,40,0.35), 0 0 0 1px rgba(138,124,246,0.18), 0 0 60px rgba(138,124,246,0.15)",
          }}
          data-reveal
        >
          {/* Glow lavanda sutil no topo */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(138,124,246,0.22), transparent 70%)",
            }}
          />

          <div className="relative grid sm:grid-cols-2 gap-4">
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
            <p className="font-sans text-sm text-[#FF9AA2] mt-4 relative" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="relative w-full mt-5 gradient-brand text-white font-sans font-bold text-[12px] sm:text-[13px] tracking-[0.08em] uppercase rounded-full h-14 px-6 inline-flex items-center justify-center gap-2.5 whitespace-nowrap shadow-[0_22px_50px_rgba(138,124,246,0.45)] hover:shadow-[0_26px_60px_rgba(138,124,246,0.55)] transition-all disabled:opacity-70"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin shrink-0" />
                <span className="leading-none">Enviando...</span>
              </>
            ) : (
              <>
                <MessageSquare size={16} className="shrink-0" aria-hidden="true" />
                <span className="leading-none">Falar com a IA no WhatsApp</span>
              </>
            )}
          </button>

          <p className="font-mono text-[11px] text-center mt-5 relative" style={{ color: "rgba(255,255,255,0.45)" }}>
            Resposta em minutos. LGPD, zero spam.
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
    <span
      className="font-mono text-[11px] uppercase tracking-[0.15em] block mb-2"
      style={{ color: "rgba(255,255,255,0.55)" }}
    >
      {label}
    </span>
    <input
      type={type}
      value={value}
      maxLength={maxLength}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl px-4 py-3.5 font-sans text-[15px] text-white outline-none transition-all border placeholder:text-white/35 focus:border-[#8A7CF6] focus:shadow-[0_0_0_3px_rgba(138,124,246,0.30)]"
      style={{
        background: "rgba(255,255,255,0.04)",
        borderColor: "rgba(255,255,255,0.10)",
      }}
    />
  </label>
);

export default LeadForm;

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Eyebrow from "@/components/ui/Eyebrow";
import { gsap, EASE, revealOnScroll } from "@/lib/animations";

const N8N_WEBHOOK_URL = "https://n8n.sapientiabr.cloud/webhook/07064e80-60ef-49c0-95ec-9b3837a8c87e";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("Informe um e-mail válido").max(255),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido").max(20),
});

const desafios = [
  "Pacientes sem resposta fora do horário",
  "Muitas faltas e cancelamentos",
  "Secretaria sobrecarregada",
  "Agendamentos perdidos no WhatsApp",
];
const volumes = ["Menos de 50", "50 a 150", "150 a 300", "Mais de 300"];

type FormData = { desafio: string; volume: string; nome: string; email: string; whatsapp: string };

export const LeadForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({ desafio: "", volume: "", nome: "", email: "", whatsapp: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const pickDesafio = (v: string) => { setData((d) => ({ ...d, desafio: v })); setStep(2); };
  const pickVolume = (v: string) => { setData((d) => ({ ...d, volume: v })); setStep(3); };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ nome: data.nome, email: data.email, whatsapp: data.whatsapp });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Verifique os dados");
      return;
    }
    setSubmitting(true);
    const payload = new URLSearchParams({
      nome: data.nome,
      email: data.email,
      whatsapp: data.whatsapp,
      desafio: data.desafio,
      volume: data.volume,
      origem: "landing-page-multistep",
      url: window.location.href,
      submitted_at: new Date().toISOString(),
    }).toString();

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
      navigate("/obrigado");
      window.scrollTo(0, 0);
    } catch {
      navigate("/obrigado");
      window.scrollTo(0, 0);
    } finally {
      setSubmitting(false);
    }
  };

  const progress = (step / 3) * 100;

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.from(ref.current!.querySelectorAll("[data-reveal]"), {
        y: 60, opacity: 0, duration: 0.7, ease: EASE, stagger: 0.2,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    });
    mm.add("(max-width: 767px)", () => {
      gsap.from(ref.current!.querySelectorAll("[data-reveal]"), {
        y: 30, opacity: 0, duration: 0.6, ease: EASE, stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  // Step transition animation
  useEffect(() => {
    if (!stepRef.current) return;
    gsap.fromTo(
      stepRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.6, ease: EASE }
    );
  }, [step]);

  // Progress bar animation
  useEffect(() => {
    if (!progressRef.current) return;
    gsap.to(progressRef.current, {
      width: `${progress}%`,
      duration: 0.6,
      ease: EASE,
    });
  }, [progress]);

  return (
    <section id="formulario" className="py-14 md:section-padding relative scroll-mt-20" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl relative z-10">
        <div className="text-center mb-6 md:mb-10" data-reveal>
          <Eyebrow>// diagnóstico gratuito</Eyebrow>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            Veja quanto sua clínica está <em>perdendo no WhatsApp.</em>
          </h2>
          <p className="font-sans text-[14px] md:text-[15px] text-[var(--text-muted)] mt-3 md:mt-4">
            Diagnóstico gratuito. Sem compromisso. 3 perguntas.
          </p>
        </div>

        <div
          className="rounded-[24px] p-5 sm:p-10 relative"
          style={{
            background: "var(--navy-2)",
            border: "1px solid rgba(77,235,255,0.18)",
          }}
          data-reveal
        >
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/60">
              Etapa {step} de 3
            </span>
            <div className="flex-1 mx-4 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="h-full"
                style={{
                  background: "linear-gradient(90deg, #7c3aed, #4debff)",
                  width: `${progress}%`,
                }}
              />
            </div>
            <span className="font-mono text-[11px] text-cyan-300/60">{Math.round(progress)}%</span>
          </div>

          <div ref={stepRef} key={step}>
            {step === 1 && (
              <>
                <h3 className="font-display text-[18px] md:text-[22px] font-semibold text-white mb-4 md:mb-6">
                  Qual é o maior desafio do atendimento hoje?
                </h3>
                <div className="space-y-3">
                  {desafios.map((d) => (
                    <Option key={d} label={d} selected={data.desafio === d} onClick={() => pickDesafio(d)} />
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-sans text-[13px] text-[var(--text-muted)] hover:text-cyan-300 mb-5 transition-colors"
                >
                  ← Voltar
                </button>
                <h3 className="font-display text-[18px] md:text-[22px] font-semibold text-white mb-4 md:mb-6">
                  Quantos atendimentos sua clínica faz por mês?
                </h3>
                <div className="space-y-3">
                  {volumes.map((v) => (
                    <Option key={v} label={v} selected={data.volume === v} onClick={() => pickVolume(v)} />
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <form onSubmit={onSubmit}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="font-sans text-[13px] text-[var(--text-muted)] hover:text-cyan-300 mb-5 transition-colors"
                >
                  ← Voltar
                </button>
                <h3 className="font-display text-[18px] md:text-[22px] font-semibold text-white mb-4 md:mb-6">
                  Onde te mandamos o diagnóstico gratuito?
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Nome"
                    value={data.nome}
                    onChange={(v) => setData((d) => ({ ...d, nome: v }))}
                    placeholder="Seu nome"
                    type="text"
                    maxLength={100}
                  />
                  <Input
                    label="E-mail"
                    value={data.email}
                    onChange={(v) => setData((d) => ({ ...d, email: v }))}
                    placeholder="seu@email.com"
                    type="email"
                    maxLength={255}
                  />
                  <Input
                    label="WhatsApp"
                    value={data.whatsapp}
                    onChange={(v) => setData((d) => ({ ...d, whatsapp: v }))}
                    placeholder="(11) 99999-9999"
                    type="tel"
                    maxLength={20}
                  />
                </div>

                {error && (
                  <p className="font-sans text-sm text-rose-400 mt-4">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-6 gradient-brand text-white font-sans font-bold text-[14px] tracking-[0.02em] uppercase rounded-[10px] h-14 flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(124,58,237,0.4)] hover:shadow-[0_0_55px_rgba(124,58,237,0.55)] transition-all disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Receber diagnóstico gratuito →"
                  )}
                </button>
              </form>
            )}
          </div>

          <p className="font-mono text-[11px] text-[var(--text-dim)] text-center mt-8">
            🔒 Dados protegidos · Compatível com LGPD · Zero spam
          </p>
        </div>
      </div>
    </section>
  );
};

const Option = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left rounded-xl px-4 md:px-5 min-h-[48px] md:min-h-[56px] flex items-center justify-between gap-3 font-sans text-[13px] md:text-[14px] transition-all ${
      selected
        ? "bg-cyan-300/10 border border-cyan-300 text-white"
        : "bg-[var(--navy-3)] border border-white/5 text-white/85 hover:border-cyan-300/40"
    }`}
  >
    <span>{label}</span>
    <span className={`text-cyan-300 transition-opacity ${selected ? "opacity-100" : "opacity-0"}`}>●</span>
  </button>
);

const Input = ({
  label, value, onChange, placeholder, type, maxLength,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type: string; maxLength: number;
}) => (
  <label className="block">
    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] block mb-2">
      {label}
    </span>
    <input
      type={type}
      value={value}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[var(--navy-3)] border border-white/8 rounded-xl px-4 py-3.5 font-sans text-[15px] text-white placeholder:text-[var(--text-dim)] outline-none transition-all focus:border-cyan-300 focus:shadow-[0_0_0_3px_rgba(77,235,255,0.12)]"
    />
  </label>
);

export default LeadForm;

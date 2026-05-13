import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Eyebrow from "@/components/ui/Eyebrow";

const N8N_WEBHOOK_URL = "https://n8n.sapientiabr.cloud/webhook/07064e80-60ef-49c0-95ec-9b3837a8c87e";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido").max(20),
});

const desafios = [
  "Pacientes sem resposta fora do horário",
  "Muitas faltas e cancelamentos",
  "Secretaria sobrecarregada",
  "Agendamentos perdidos no WhatsApp",
];
const volumes = ["Menos de 50", "50 a 150", "150 a 300", "Mais de 300"];

type FormData = { desafio: string; volume: string; nome: string; whatsapp: string };

export const LeadForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({ desafio: "", volume: "", nome: "", whatsapp: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickDesafio = (v: string) => { setData((d) => ({ ...d, desafio: v })); setStep(2); };
  const pickVolume = (v: string) => { setData((d) => ({ ...d, volume: v })); setStep(3); };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ nome: data.nome, whatsapp: data.whatsapp });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Verifique os dados");
      return;
    }
    setSubmitting(true);
    const payload = new URLSearchParams({
      nome: data.nome,
      whatsapp: data.whatsapp,
      desafio: data.desafio,
      volume: data.volume,
      origem: "landing-page-multistep",
      url: window.location.href,
      submitted_at: new Date().toISOString(),
    }).toString();

    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 4500);
      await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: payload,
        signal: ctrl.signal,
        keepalive: true,
      });
      clearTimeout(t);
      navigate("/obrigado");
      window.scrollTo(0, 0);
    } catch {
      // Fire-and-forget: still redirect on transport errors per project memory
      navigate("/obrigado");
      window.scrollTo(0, 0);
    } finally {
      setSubmitting(false);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <section id="formulario" className="section-padding relative scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl relative z-10">
        <div className="text-center mb-10">
          <Eyebrow>// diagnóstico gratuito</Eyebrow>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            Descubra quanto sua clínica está <em>perdendo.</em>
          </h2>
          <p className="font-sans text-[15px] text-[var(--text-muted)] mt-4">
            Diagnóstico gratuito. Sem compromisso. 3 perguntas.
          </p>
        </div>

        <div
          className="rounded-[24px] p-6 sm:p-10 relative"
          style={{
            background: "var(--navy-2)",
            border: "1px solid rgba(77,235,255,0.18)",
          }}
        >
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/60">
              Etapa {step} de 3
            </span>
            <div className="flex-1 mx-4 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full"
                style={{ background: "linear-gradient(90deg, #7c3aed, #4debff)" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="font-mono text-[11px] text-cyan-300/60">{Math.round(progress)}%</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="font-display text-[22px] font-semibold text-white mb-6">
                  Qual é o maior desafio do atendimento hoje?
                </h3>
                <div className="space-y-3">
                  {desafios.map((d) => (
                    <Option key={d} label={d} selected={data.desafio === d} onClick={() => pickDesafio(d)} />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.35 }}
              >
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-sans text-[13px] text-[var(--text-muted)] hover:text-cyan-300 mb-5 transition-colors"
                >
                  ← Voltar
                </button>
                <h3 className="font-display text-[22px] font-semibold text-white mb-6">
                  Quantos atendimentos sua clínica faz por mês?
                </h3>
                <div className="space-y-3">
                  {volumes.map((v) => (
                    <Option key={v} label={v} selected={data.volume === v} onClick={() => pickVolume(v)} />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.form
                key="s3"
                initial={{ opacity: 0, x: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.35 }}
                onSubmit={onSubmit}
              >
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="font-sans text-[13px] text-[var(--text-muted)] hover:text-cyan-300 mb-5 transition-colors"
                >
                  ← Voltar
                </button>
                <h3 className="font-display text-[22px] font-semibold text-white mb-6">
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
              </motion.form>
            )}
          </AnimatePresence>

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
    className={`w-full text-left rounded-xl px-5 min-h-[56px] flex items-center justify-between gap-3 font-sans text-[14px] transition-all ${
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

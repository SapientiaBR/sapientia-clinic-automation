import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Calendar, Building, CheckCircle, Clock } from "lucide-react";

export const LeadForm = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const vagas = useMemo(() => Math.floor(Math.random() * 4) + 3, []);

  const N8N_WEBHOOK_URL = "https://n8n.sapientiabr.cloud/webhook/07064e80-60ef-49c0-95ec-9b3837a8c87e";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string> = {
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
      whatsapp: String(fd.get("whatsapp") ?? ""),
      empresa: String(fd.get("empresa") ?? ""),
      instagram: String(fd.get("instagram") ?? ""),
      site: String(fd.get("site") ?? ""),
      faturamento: String(fd.get("faturamento") ?? ""),
      origem: "landing-sapientia",
      url: window.location.href,
      submitted_at: new Date().toISOString(),
    };

    // Envia como x-www-form-urlencoded (CORS-safelisted, sem preflight)
    const body = new URLSearchParams(data).toString();

    const goNext = () => {
      navigate("/obrigado");
      window.scrollTo(0, 0);
    };

    try {
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 4000);
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body,
        signal: ctrl.signal,
        keepalive: true,
      });
      clearTimeout(timeout);
      console.log("[LeadForm] webhook status:", res.status);
    } catch (err) {
      console.warn("[LeadForm] webhook error:", err);
    } finally {
      setSubmitting(false);
      goNext();
    }
  };

  return (
    <section className="section-padding relative overflow-hidden bg-background">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[hsl(265_75%_28%)] opacity-[0.05] blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="max-w-xl">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Vamos mapear sua automatização <em>agora.</em>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Descubra exatamente quantas horas e quantos pacientes você pode salvar todos os meses com nosso diagnóstico. Preencha seus dados ao lado para prosseguir.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">É 100% Gratuito</h4>
                  <p className="text-sm text-muted-foreground mt-1 text-balance">Você não paga nada para descobrir seu potencial de automação.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Building size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Focado na sua Clínica</h4>
                  <p className="text-sm text-muted-foreground mt-1 text-balance">Usamos essas informações para desenhar um fluxo exclusivo para sua especialidade.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Calendar size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Agendamento Ágil</h4>
                  <p className="text-sm text-muted-foreground mt-1 text-balance">Após os dados, você será direcionado para escolher o melhor horário para conversarmos.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div id="formulario" className="glass rounded-3xl p-8 sm:p-10 lg:p-12 relative border border-white/10 scroll-mt-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber/10 border border-amber/30 mb-5">
              <Clock size={14} className="text-amber" />
              <span className="text-xs font-bold text-amber uppercase tracking-wider">
                {vagas} diagnósticos disponíveis esta semana
              </span>
            </div>
            <h3 className="text-2xl font-semibold mb-8 text-foreground">Preencha seus dados</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="nome" className="text-sm font-medium text-foreground/90">
                    Seu Nome *
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    required
                    type="text"
                    placeholder="Ex: Dr. João Silva"
                    className="w-full bg-white border border-white/5 rounded-md px-5 py-4 placeholder-black/40 text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground/90">
                    E-mail Direto *
                  </label>
                  <input
                    id="email"
                    name="email"
                    required
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full bg-white border border-white/5 rounded-md px-5 py-4 placeholder-black/40 text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="whatsapp" className="text-sm font-medium text-foreground/90">
                    WhatsApp (Com DDD) *
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    required
                    type="tel"
                    placeholder="(11) 90000-0000"
                    className="w-full bg-white border border-white/5 rounded-md px-5 py-4 placeholder-black/40 text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="empresa" className="text-sm font-medium text-foreground/90">
                    Nome da Clínica *
                  </label>
                  <input
                    id="empresa"
                    name="empresa"
                    required
                    type="text"
                    placeholder="Clínica Exemplo"
                    className="w-full bg-white border border-white/5 rounded-md px-5 py-4 placeholder-black/40 text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="instagram" className="text-sm font-medium text-foreground/90">
                    Instagram <span className="text-xs text-muted-foreground font-normal">(opcional)</span>
                  </label>
                  <input
                    id="instagram"
                    name="instagram"
                    type="text"
                    placeholder="@clinica"
                    className="w-full bg-white border border-white/5 rounded-md px-5 py-4 placeholder-black/40 text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="site" className="text-sm font-medium text-foreground/90">
                    Site <span className="text-xs text-muted-foreground font-normal">(opcional)</span>
                  </label>
                  <input
                    id="site"
                    name="site"
                    type="url"
                    placeholder="www.clinica.com.br"
                    className="w-full bg-white border border-white/5 rounded-md px-5 py-4 placeholder-black/40 text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              </div>

              <div className="space-y-2 pb-4">
                <label htmlFor="faturamento" className="text-sm font-medium text-foreground/90">
                  Faturamento Médio Mensal <span className="text-xs text-muted-foreground font-normal">(opcional)</span>
                </label>
                <select
                  id="faturamento"
                  name="faturamento"
                  defaultValue=""
                  className="w-full bg-white border border-white/5 rounded-md px-5 py-4 text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none cursor-pointer [&>option]:bg-white [&>option]:text-black"
                >
                  <option value="" disabled>Selecione uma faixa</option>
                  <option value="0-10k">0 a R$ 10.000</option>
                  <option value="10k-50k">R$ 10.000 a R$ 50.000</option>
                  <option value="50k-100k">R$ 50.000 a R$ 100.000</option>
                  <option value="100k+">+ de R$ 100.000</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full gradient-vibrant font-display font-semibold text-foreground text-lg px-8 py-5 rounded-md hover:shadow-[0_0_20px_rgba(251,113,133,0.3)] transition-all duration-300 mt-8 flex justify-center items-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? "Enviando..." : "Solicitar Diagnóstico"}
                <MessageSquare size={22} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

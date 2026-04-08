import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Calendar, Building, CheckCircle, Loader2 } from "lucide-react";

const WEBHOOK_URL = "https://n8n.sapientiabr.cloud/webhook/07064e80-60ef-49c0-95ec-9b3837a8c87e";

export const LeadForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    empresa: "",
    instagram: "",
    site: "",
    faturamento: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Fire-and-forget: envia ao n8n mas não bloqueia navegação
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).catch(() => {
      // silently ignore – não pode perder a conversão
    });

    navigate("/obrigado");
    window.scrollTo(0, 0);
  };

  return (
    <section id="formulario" className="section-padding relative overflow-hidden bg-background">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[hsl(265_75%_28%)] opacity-[0.05] blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="max-w-xl">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Vamos mapear sua automatização <span className="gradient-text">agora.</span>
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
          <div className="glass-card rounded-2xl p-5 sm:p-8 lg:p-10 gradient-border shadow-2xl relative">
            <h3 className="text-xl font-semibold mb-6">Preencha seus dados</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="nome" className="text-sm font-medium text-foreground/90">
                    Seu Nome *
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    required
                    type="text"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Ex: Dr. João Silva"
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 placeholder-muted-foreground/50 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
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
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 placeholder-muted-foreground/50 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="whatsapp" className="text-sm font-medium text-foreground/90">
                    WhatsApp (Com DDD) *
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    required
                    type="tel"
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="(11) 90000-0000"
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 placeholder-muted-foreground/50 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
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
                    value={form.empresa}
                    onChange={handleChange}
                    placeholder="Clínica Exemplo"
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 placeholder-muted-foreground/50 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="instagram" className="text-sm font-medium text-foreground/90">
                    Instagram *
                  </label>
                  <input
                    id="instagram"
                    name="instagram"
                    required
                    type="text"
                    value={form.instagram}
                    onChange={handleChange}
                    placeholder="@clinica"
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 placeholder-muted-foreground/50 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="site" className="text-sm font-medium text-foreground/90">
                    Site *
                  </label>
                  <input
                    id="site"
                    name="site"
                    required
                    type="url"
                    value={form.site}
                    onChange={handleChange}
                    placeholder="www.clinica.com.br"
                    className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 placeholder-muted-foreground/50 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <div className="space-y-2 pb-2">
                <label htmlFor="faturamento" className="text-sm font-medium text-foreground/90">
                  Faturamento Médio Mensal *
                </label>
                <select
                  id="faturamento"
                  name="faturamento"
                  required
                  value={form.faturamento}
                  onChange={handleChange}
                  className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent appearance-none cursor-pointer"
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
                disabled={isSubmitting}
                className="w-full cta-gradient text-foreground font-bold text-base sm:text-lg px-8 py-3 sm:py-4 rounded-xl hover:opacity-90 transition-all duration-200 mt-6 flex justify-center items-center gap-3 animate-pulse-glow disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    Enviando...
                    <Loader2 size={20} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Solicitar Diagnóstico
                    <MessageSquare size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

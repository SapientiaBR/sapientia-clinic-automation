import { useState } from "react";
import { MessageSquare, Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CTA_HREF = "#formulario";

const LossCalculator = () => {
  const [contacts, setContacts] = useState(30);
  const [ticketValue, setTicketValue] = useState(300);
  const { ref, isVisible } = useScrollAnimation();

  const lostPatients = Math.round(contacts * 4 * 0.4);
  const monthlyLoss = lostPatients * ticketValue;

  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(38_92%_55%)] opacity-[0.04] blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl" ref={ref}>
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/10 border border-amber/20 text-amber mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Calculator size={16} />
            <span className="text-sm font-semibold">Calculadora de Oportunidades</span>
          </div>
          <h2
            className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-balance transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Quantos pacientes você pode{" "}
            <span className="gradient-text">recuperar</span> por mês?
          </h2>
        </div>

        <div
          className={`glass-card rounded-2xl p-8 sm:p-10 gradient-border transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Contacts slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm text-foreground/90 font-medium">
                Contatos recebidos por semana
              </label>
              <span className="text-lg font-bold text-accent tabular-nums">{contacts}</span>
            </div>
            <Slider
              value={[contacts]}
              onValueChange={(v) => setContacts(v[0])}
              min={5}
              max={100}
              step={5}
              className="[&_[role=slider]]:bg-accent [&_[role=slider]]:border-accent [&_.range]:bg-accent"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
              <span>5</span>
              <span>100</span>
            </div>
          </div>

          {/* Ticket value slider */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm text-foreground/90 font-medium">
                Valor médio da consulta
              </label>
              <span className="text-lg font-bold text-accent tabular-nums">
                R$ {ticketValue}
              </span>
            </div>
            <Slider
              value={[ticketValue]}
              onValueChange={(v) => setTicketValue(v[0])}
              min={100}
              max={1000}
              step={50}
              className="[&_[role=slider]]:bg-accent [&_[role=slider]]:border-accent [&_.range]:bg-accent"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
              <span>R$ 100</span>
              <span>R$ 1.000</span>
            </div>
          </div>

          {/* Result */}
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-amber/5 to-destructive/5 border border-amber/15">
            <p className="text-sm text-muted-foreground mb-1">
              Sem automação, você pode estar deixando de faturar
            </p>
            <p className="text-5xl sm:text-6xl font-bold text-amber mb-1 tabular-nums">
              R$ {monthlyLoss.toLocaleString("pt-BR")}
            </p>
            <p className="text-sm text-muted-foreground">
              por mês ({lostPatients} pacientes × R$ {ticketValue})
            </p>
          </div>

          <div className="text-center mt-8">
            <a
              href={CTA_HREF}
              className="cta-gradient inline-flex items-center gap-2.5 text-foreground font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-200 text-lg animate-pulse-glow"
            >
              <MessageSquare size={20} />
              Quero Recuperar Esses Pacientes
            </a>
            <p className="text-xs text-muted-foreground/60 mt-3">
              Diagnóstico gratuito • Sem compromisso
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LossCalculator;

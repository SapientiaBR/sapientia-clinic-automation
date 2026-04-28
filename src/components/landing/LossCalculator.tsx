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
            Quantos pacientes você pode <em>recuperar</em> por mês?
          </h2>
        </div>

        <div
          className={`glass hover:border-border-hover rounded-3xl p-8 sm:p-12 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Contacts slider */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm text-foreground/90 font-medium">
                Contatos recebidos por semana
              </label>
              <span className="text-xl font-bold text-accent tabular-nums">{contacts}</span>
            </div>
            <Slider
              value={[contacts]}
              onValueChange={(v) => setContacts(v[0])}
              min={5}
              max={100}
              step={5}
              className="[&_[role=slider]]:bg-accent [&_[role=slider]]:border-accent [&_.range]:bg-accent cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>5</span>
              <span>100</span>
            </div>
          </div>

          {/* Ticket value slider */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm text-foreground/90 font-medium">
                Valor médio da consulta
              </label>
              <span className="text-xl font-bold text-accent tabular-nums">
                R$ {ticketValue}
              </span>
            </div>
            <Slider
              value={[ticketValue]}
              onValueChange={(v) => setTicketValue(v[0])}
              min={100}
              max={1000}
              step={50}
              className="[&_[role=slider]]:bg-accent [&_[role=slider]]:border-accent [&_.range]:bg-accent cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>R$ 100</span>
              <span>R$ 1.000</span>
            </div>
          </div>

          {/* Result */}
          <div className="text-center p-8 rounded-2xl bg-background/50 border border-white/5 shadow-inner">
            <p className="text-sm text-muted-foreground mb-2">
              Sem automação, você pode estar deixando de faturar
            </p>
            <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-amber mb-2 tabular-nums drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              R$ {monthlyLoss.toLocaleString("pt-BR")}
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              por mês ({lostPatients} pacientes × R$ {ticketValue})
            </p>
          </div>

          <div className="text-center mt-10">
            <a
              href={CTA_HREF}
              className="gradient-vibrant font-display font-semibold inline-flex items-center gap-2.5 text-foreground px-8 py-5 rounded-md hover:shadow-[0_0_20px_rgba(251,113,133,0.3)] transition-all duration-300 text-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <MessageSquare size={22} />
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

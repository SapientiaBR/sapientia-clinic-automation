import { useState } from "react";
import { MessageSquare, Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const WHATSAPP_URL = "https://wa.me/5511920795583";

const LossCalculator = () => {
  const [contacts, setContacts] = useState(30);
  const [ticketValue, setTicketValue] = useState(300);
  const { ref, isVisible } = useScrollAnimation();

  // 40% loss rate assumption
  const monthlyLoss = Math.round(contacts * 4 * 0.4 * ticketValue);

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(0_70%_30%)] opacity-8 blur-[150px]" />
        <div className="logo-watermark" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-3xl" ref={ref}>
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-destructive mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Calculator size={16} />
            <span className="text-sm font-semibold">Calculadora de Perdas</span>
          </div>
          <h2
            className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Quanto você está{" "}
            <span className="text-destructive">perdendo</span> por mês?
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
              <span className="text-lg font-bold text-accent">{contacts}</span>
            </div>
            <Slider
              value={[contacts]}
              onValueChange={(v) => setContacts(v[0])}
              min={5}
              max={100}
              step={5}
              className="[&_[role=slider]]:bg-accent [&_[role=slider]]:border-accent [&_.range]:bg-accent"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
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
              <span className="text-lg font-bold text-accent">
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
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>R$ 100</span>
              <span>R$ 1.000</span>
            </div>
          </div>

          {/* Result */}
          <div className="text-center p-6 rounded-xl bg-destructive/5 border border-destructive/20">
            <p className="text-sm text-muted-foreground mb-2">
              Você pode estar perdendo até
            </p>
            <p className="text-5xl sm:text-6xl font-bold text-destructive mb-2">
              R$ {monthlyLoss.toLocaleString("pt-BR")}
            </p>
            <p className="text-sm text-muted-foreground">por mês</p>
          </div>

          <div className="text-center mt-8">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-bg inline-flex items-center gap-2 text-foreground font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-lg animate-pulse-glow"
            >
              <MessageSquare size={20} />
              Quero Parar de Perder Dinheiro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LossCalculator;

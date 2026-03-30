import { MessageCircle, CalendarCheck, FileDigit, Users, Brain, FileSignature } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const solutions = [
  {
    icon: MessageCircle,
    title: "Atendimento 24/7 por WhatsApp",
    desc: "Um assistente com IA responde seus pacientes a qualquer hora, tira dúvidas, e agenda consultas automaticamente.",
  },
  {
    icon: CalendarCheck,
    title: "Agendamento Inteligente",
    desc: "Confirmação automática, lembretes por WhatsApp, e reagendamento sem sua secretária precisar ligar.",
  },
  {
    icon: FileDigit,
    title: "Digitalização de Processos",
    desc: "Fichas de anamnese, pré-natal, formulários de retorno — tudo digital, preenchido pelo paciente antes da consulta.",
  },
  {
    icon: Users,
    title: "Captação de Pacientes",
    desc: "Funil inteligente que transforma curiosos do Instagram e Google em pacientes agendados.",
  },
  {
    icon: Brain,
    title: "CRM com IA",
    desc: "Saiba exatamente de onde vêm seus pacientes, quem retorna, quem sumiu, e reative automaticamente.",
  },
  {
    icon: FileSignature,
    title: "Propostas e Contratos Automáticos",
    desc: "Para clínicas com procedimentos estéticos ou pacotes: envio, assinatura e cobrança no piloto automático.",
  },
];

const Solutions = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="solucoes" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full bg-[hsl(270_80%_24%)] opacity-10 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          O que a Sapient.IA faz pela{" "}
          <span className="gradient-text">sua clínica</span>
        </h2>
        <p className={`text-muted-foreground text-center mb-12 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          Soluções sob medida para automatizar cada etapa da jornada do paciente.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <div
              key={i}
              className={`glass-card rounded-2xl p-6 group hover:border-accent/30 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${150 + i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <s.icon size={24} className="text-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;

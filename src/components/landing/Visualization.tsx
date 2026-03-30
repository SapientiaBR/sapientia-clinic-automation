import { CalendarCheck, UserMinus, Stethoscope, Smile, MessageSquare } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const WHATSAPP_URL = "https://wa.me/5511999999999";

const items = [
  { icon: CalendarCheck, text: "Sua agenda lotada sem precisar correr atrás de paciente" },
  { icon: UserMinus, text: "Menos dependência da recepcionista para tarefas repetitivas" },
  { icon: Stethoscope, text: "Atendimento funcionando mesmo quando você está em cirurgia" },
  { icon: Smile, text: "Menos estresse operacional. Mais tempo para o que importa: atender." },
];

const Visualization = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(190_100%_50%)] opacity-5 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Imagine abrir sua agenda amanhã e ver ela cheia.{" "}
          <span className="gradient-text">Sem ter feito nada.</span>
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {items.map((item, i) => (
            <div
              key={i}
              className={`glass-card rounded-xl p-6 flex items-start gap-4 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                <item.icon size={22} className="text-foreground" />
              </div>
              <p className="text-foreground/90 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div
          className={`text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg inline-flex items-center gap-2 text-foreground font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-lg"
          >
            <MessageSquare size={20} />
            Quero essa realidade no meu consultório
          </a>
        </div>
      </div>
    </section>
  );
};

export default Visualization;

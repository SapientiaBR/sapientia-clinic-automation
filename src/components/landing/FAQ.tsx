import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    q: "\"Isso não vai parecer robótico para meus pacientes?\"",
    a: "Não. O sistema é treinado com o tom de voz da sua clínica. Seus pacientes conversam de forma natural, como se estivessem falando com uma secretária de verdade. Sem respostas engessadas, sem parecer máquina.",
  },
  {
    q: "\"Vou perder o controle do meu atendimento?\"",
    a: "De jeito nenhum. Você mantém controle total. O sistema segue suas regras, seus horários, seus critérios. E você acompanha tudo em tempo real. A IA trabalha para você, não no lugar de você.",
  },
  {
    q: "\"É difícil de implementar? Preciso entender de tecnologia?\"",
    a: "Zero complicação. Nós cuidamos de tudo — da configuração ao treinamento da sua equipe. Você não precisa instalar nada nem entender de tecnologia. Em poucos dias, está funcionando.",
  },
  {
    q: "\"E se eu não gostar, fico preso em contrato?\"",
    a: "Sem fidelidade, sem multa, sem burocracia. Se não fizer sentido, você cancela quando quiser. Simples assim.",
  },
  {
    q: "\"Quanto custa?\"",
    a: "Pense assim: quanto custa perder 10, 20, 30 pacientes por mês por falta de resposta? O investimento se paga já nas primeiras semanas com os pacientes que você deixaria de perder. Agende uma conversa e receba uma proposta sob medida para o seu consultório.",
  },
];

const FAQ = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="logo-watermark" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl font-bold text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Você pode estar <span className="gradient-text">pensando...</span>
        </h2>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className={`glass-card rounded-xl px-6 border-none transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${150 + i * 80}ms` }}
            >
              <AccordionTrigger className="text-foreground hover:no-underline py-5 text-left font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;

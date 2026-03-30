import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    q: "Quanto custa?",
    a: "Cada projeto é precificado sob medida, de acordo com a complexidade da sua clínica. Agende uma conversa para receber uma proposta personalizada.",
  },
  {
    q: "Quanto tempo leva para implementar?",
    a: "Em média, de 3 a 4 semanas, dependendo do escopo.",
  },
  {
    q: "Funciona com meu sistema de prontuário atual?",
    a: "Sim. Integramos com os principais sistemas do mercado e adaptamos ao que você já usa.",
  },
  {
    q: "Preciso entender de tecnologia?",
    a: "Não. Cuidamos de tudo — da configuração ao treinamento da sua equipe.",
  },
  {
    q: "E se eu quiser cancelar?",
    a: "Sem fidelidade. Se não fizer sentido, você pode cancelar a qualquer momento.",
  },
];

const FAQ = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl font-bold text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Perguntas <span className="gradient-text">Frequentes</span>
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

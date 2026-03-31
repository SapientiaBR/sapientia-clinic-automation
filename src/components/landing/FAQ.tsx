import { MessageSquare } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const WHATSAPP_URL = "https://wa.me/5511920795583?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20a%20Sapient.IA.";

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
    q: "\"Como funciona o contrato?\"",
    a: "Todas as condições — prazo, recorrência e regras — são apresentadas com total clareza antes do início. Você entra sabendo exatamente o que esperar, sem surpresas.",
  },
  {
    q: "\"Quanto custa?\"",
    a: "O valor depende do volume e complexidade do seu consultório. Na conversa de diagnóstico (gratuita), entendemos sua realidade e apresentamos uma proposta sob medida. Para referência: o investimento costuma se pagar nas primeiras semanas com os pacientes que deixariam de ser perdidos.",
  },
  {
    q: "\"E se eu não gostar do resultado?\"",
    a: "Nosso objetivo é que você veja resultados desde o primeiro mês. Acompanhamos de perto e fazemos ajustes contínuos. Se algo não estiver funcionando como esperado, trabalhamos juntos para resolver — transparência e parceria são nossos valores.",
  },
];

const FAQ = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="section-padding relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10" ref={ref}>
        <h2
          className={`font-display text-3xl sm:text-4xl font-bold text-center mb-14 text-balance transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Você pode estar{" "}
          <span className="gradient-text">pensando...</span>
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

        {/* Subtle CTA after FAQ */}
        <div
          className={`text-center mt-10 transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-muted-foreground text-sm mb-3">Ainda tem dúvidas?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 text-sm font-medium transition-colors"
          >
            <MessageSquare size={16} />
            Fale diretamente com a equipe →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

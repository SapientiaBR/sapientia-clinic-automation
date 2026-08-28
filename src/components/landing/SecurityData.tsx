import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Server, FileText, ShieldOff, History } from "lucide-react";
import { revealOnScroll } from "@/lib/animations";

const items = [
  {
    Icon: Server,
    title: "Infraestrutura nacional",
    text: "As conversas ficam armazenadas no Brasil, criptografadas.",
  },
  {
    Icon: FileText,
    title: "Contrato e DPA assinados",
    text: "Você define retenção e quem tem acesso.",
  },
  {
    Icon: ShieldOff,
    title: "Nada treina modelo público",
    text: "Os dados da sua clínica não alimentam nenhum modelo externo.",
  },
  {
    Icon: History,
    title: "Registro auditável",
    text: "Toda conversa fica gravada no painel, com histórico completo.",
  },
];

const SecurityData = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="seguranca" className="py-14 md:py-20 scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h2
          className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-bold text-[#1F2937] text-balance mb-8 md:mb-12 max-w-3xl"
          data-reveal
        >
          Dado de paciente é dado de saúde. Tratamos como tal.
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8" data-reveal>
          {items.map(({ Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <Icon size={24} strokeWidth={1.4} className="text-[#0A8C7E] flex-shrink-0 mt-1" aria-hidden />
              <div>
                <h3 className="font-display text-[19px] font-semibold text-[#1F2937] leading-snug">
                  {title}
                </h3>
                <p className="font-sans text-[17px] text-[#4B5563] leading-[1.6] mt-2">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityData;

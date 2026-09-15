import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Server, FileText, ShieldOff, History } from "lucide-react";
import { revealOnScroll } from "@/lib/animations";

/**
 * Quatro linhas, uma frase cada.
 *
 * Eram titulo + paragrafo por item. Numa secao que existe para tranquilizar,
 * o paragrafo nao acrescenta nada que o titulo ja nao diga — e dobra a altura
 * da secao no celular.
 */
const items = [
  { Icon: Server, text: "Armazenado no Brasil, criptografado" },
  { Icon: FileText, text: "Contrato e DPA assinados" },
  { Icon: ShieldOff, text: "Nada treina modelo público" },
  { Icon: History, text: "Histórico auditável no painel" },
];

const SecurityData = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section id="seguranca" className="py-14 md:py-20 scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h2
          className="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-normal text-[#292929] text-balance mb-8 md:mb-12 max-w-3xl tracking-[-0.04em]"
          data-reveal
        >
          Dado de paciente é dado de saúde.
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5" data-reveal>
          {items.map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-3.5">
              <Icon
                size={21}
                strokeWidth={1.5}
                className="flex-shrink-0 text-[#00543F]"
                aria-hidden
              />
              <span className="font-sans text-[17px] leading-snug text-[#292929]">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SecurityData;

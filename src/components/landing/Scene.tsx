import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { revealOnScroll } from "@/lib/animations";

const timeline: [string, string][] = [
  ["21h17", "“Vocês atendem amanhã?”"],
  ["21h18", "Ele recebe a resposta."],
  ["21h19", "Escolhe o horário."],
  ["21h20", "O atendimento segue."],
];

const Scene = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  return (
    <section className="py-14 md:py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-8 md:mb-12" data-reveal>
          <h2 className="font-display text-[30px] sm:text-[42px] lg:text-[52px] font-bold text-[#1F2937]">
            21h17.
          </h2>
          <p className="font-display text-[19px] sm:text-[24px] font-semibold text-[#0A8C7E] mt-3 text-balance">
            A clínica fechou. Um paciente acabou de mandar mensagem.
          </p>
        </div>

        <ol className="relative" data-reveal>
          {timeline.map(([time, text], i) => (
            <li key={time} className="flex gap-4 sm:gap-6 items-start pb-6 last:pb-0 relative">
              <span
                className="font-display text-[17px] sm:text-[19px] font-bold text-[#0A8C7E] w-[62px] sm:w-[76px] flex-shrink-0 pt-[2px]"
              >
                {time}
              </span>
              <span
                aria-hidden
                className="absolute left-[72px] sm:left-[88px] top-[10px] bottom-0 w-px"
                style={{ background: i === timeline.length - 1 ? "transparent" : "#D6F3EE" }}
              />
              <span
                aria-hidden
                className="w-[9px] h-[9px] rounded-full flex-shrink-0 mt-[8px] -ml-[5px] sm:-ml-[5px] z-10"
                style={{ background: "#0FB5A3" }}
              />
              <p className="font-sans text-[17px] sm:text-[18px] text-[#1F2937] leading-[1.6] pl-1">
                {text}
              </p>
            </li>
          ))}
        </ol>

        <div className="text-center mt-10 md:mt-12" data-reveal>
          <p className="font-display text-[20px] sm:text-[26px] font-semibold text-[#1F2937] text-balance">
            A clínica fechou.
          </p>
          <p className="font-display text-[20px] sm:text-[26px] font-bold text-[#055449] mt-1 text-balance">
            O atendimento não desapareceu.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Scene;

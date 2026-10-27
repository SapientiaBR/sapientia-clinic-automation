import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { revealOnScroll } from "@/lib/animations";
import { implantacaoFormatada, turmaAtual } from "@/config/turma";

type Props = {
  /** "clínica" na rota principal, "consultório" na rota do médico solo. */
  unidade?: "clínica" | "consultório";
};

/**
 * A oferta do mês da implantação.
 *
 * Fica logo antes dos planos, que é onde a pergunta "quanto custa entrar?"
 * aparece na cabeça de quem lê. A data sai do calendário, no fuso de São
 * Paulo, e não há contador de vagas.
 */
const Turma = ({ unidade = "clínica" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const t = turmaAtual();
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  const umaPorVez =
    unidade === "consultório"
      ? "Cada consultório é configurado um por vez, na ordem de assinatura."
      : "Cada clínica é configurada uma por vez, na ordem de assinatura.";

  return (
    <section id="turma" className="py-12 md:py-16 scroll-mt-24" ref={ref}>
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-6 sm:p-9"
          style={{
            background: "#F1FBF8",
            border: "1px solid #A7E6DD",
            boxShadow: "0 18px 44px rgba(10, 140, 126,0.08)",
          }}
          data-reveal
        >
          <h2 className="font-display text-[26px] sm:text-[34px] font-normal tracking-[-0.04em] text-[#1F2937] text-balance">
            Até {t.fimDoMes}, a implantação é por nossa conta
          </h2>
          <p className="font-sans mt-4 text-[17px] leading-[1.6] text-[#4B5563]">
            A implantação custa {implantacaoFormatada}. Quem assinar até {t.fimDoMes} não paga a
            implantação: nossa equipe configura a sua {unidade} sem cobrança.
          </p>
          <p className="font-sans mt-3 text-[17px] leading-[1.6] text-[#4B5563]">{umaPorVez}</p>

          <p className="font-display mt-7 text-[19px] font-semibold text-[#1F2937]">
            Implantação <s className="font-normal text-[#6B7280]">{implantacaoFormatada}</s>{" "}
            <span className="text-[#055449]">R$0</span> até {t.fimDoMes}.
          </p>
          <p className="font-sans mt-1.5 text-[15px] text-[#4B5563]">
            {t.diasRestantes === 0
              ? "Último dia: a oferta deste mês encerra hoje."
              : `Faltam ${t.diasRestantes} ${t.diasRestantes === 1 ? "dia" : "dias"} para o fim do mês.`}
          </p>

          <a href="#planos" className="btn-turma mt-7">
            Escolher meu plano
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Turma;

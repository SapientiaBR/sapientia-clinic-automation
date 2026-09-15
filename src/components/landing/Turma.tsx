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
 * Seção da turma de implantação.
 *
 * Fica logo antes dos planos, que é onde a pergunta "quanto custa entrar?"
 * aparece na cabeça de quem lê.
 *
 * A escassez aqui é real e verificável: o número de vagas sai de um arquivo de
 * configuração e a contagem de dias sai do calendário, no fuso de São Paulo.
 * Nada é sorteado nem reinicia quando a pessoa recarrega a página.
 */
const Turma = ({ unidade = "clínica" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const t = turmaAtual();
  useGSAP(() => revealOnScroll(ref.current), { scope: ref });

  const progresso = Math.round((t.preenchidas / t.total) * 100);

  return (
    <section id="turma" className="py-12 md:py-16 scroll-mt-24" ref={ref}>
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-6 sm:p-9"
          style={{
            background: "#EEFCF7",
            border: "1px solid #C0E2D8",
            boxShadow: "0 18px 44px rgba(0, 84, 63,0.08)",
          }}
          data-reveal
        >
          {t.lotada ? (
            <>
              <h2 className="font-display text-[26px] sm:text-[34px] font-normal tracking-[-0.04em] text-[#292929] text-balance">
                Turma de {t.mes} lotada.
              </h2>
              <p className="font-sans mt-4 text-[17px] leading-[1.6] text-[#4B4E52]">
                Implantação agora: {implantacaoFormatada} — ou entre na lista da turma de{" "}
                {t.proximoMes} com implantação grátis.
              </p>
              <a href="#demo" className="btn-turma mt-7">
                Quero vaga na próxima turma
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </>
          ) : (
            <>
              <h2 className="font-display text-[26px] sm:text-[34px] font-normal tracking-[-0.04em] text-[#292929] text-balance">
                Implantação grátis só para a turma de {t.mes}.
              </h2>
              <p className="font-sans mt-4 text-[17px] leading-[1.6] text-[#4B4E52]">
                Cada implantação é configurada pela nossa equipe, uma {unidade} por vez. Por isso
                abrimos {t.total} vagas por mês.
              </p>

              <div className="mt-7">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display-sans text-[13px] font-semibold text-[#003D2F]">
                    {t.preenchidas}/{t.total} vagas preenchidas
                  </span>
                  <span className="font-sans text-[13px] text-[#4B4E52]">
                    {t.restantes} {t.restantes === 1 ? "restante" : "restantes"}
                  </span>
                </div>
                {/* A barra é decorativa: o mesmo dado já está escrito acima em
                    texto, então ela não precisa ser anunciada duas vezes. */}
                <div
                  aria-hidden="true"
                  className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-[#DBF9F1]"
                >
                  <div
                    className="h-full rounded-full gradient-brand transition-[width] duration-700"
                    style={{ width: `${progresso}%` }}
                  />
                </div>
              </div>

              <p className="font-display mt-7 text-[19px] font-semibold text-[#292929]">
                Implantação <s className="font-normal text-[#6F7276]">{implantacaoFormatada}</s>{" "}
                <span className="text-[#003D2F]">R$0</span> nesta turma.
              </p>
              <p className="font-sans mt-1.5 text-[15px] text-[#4B4E52]">
                Lotou ou virou o mês, a implantação volta a {implantacaoFormatada}.
              </p>
              <p className="font-sans mt-1.5 text-[15px] text-[#4B4E52]">
                {t.diasRestantes === 0
                  ? `Encerra hoje (${t.ultimoDia}/${t.numeroMes}).`
                  : `Encerra em ${t.diasRestantes} dias (${t.ultimoDia}/${t.numeroMes}).`}
              </p>

              <a href="#demo" className="btn-turma mt-7">
                Quero minha vaga
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Turma;

import { useEffect, useRef } from "react";
import { turmaAtual } from "@/config/turma";

/**
 * Faixa fina no topo, acima do header.
 *
 * Ela publica a própria altura em `--altura-faixa`, e o header se posiciona a
 * partir dessa variável. Antes era um número fixo de 34px, medido no desktop:
 * no celular o texto quebra em duas linhas, a faixa vai a 64px e a navbar
 * subia 18px por cima dela. Altura de texto que quebra não se chuta — se mede.
 *
 * O texto muda com o estado da turma. O último dia tem redação própria:
 * "encerra em 0 dias" é o tipo de frase que denuncia um número interpolado sem
 * ninguém ler.
 */
const TurmaBanner = () => {
  const t = turmaAtual();
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const publicar = () => {
      document.documentElement.style.setProperty(
        "--altura-faixa",
        `${Math.round(el.getBoundingClientRect().height)}px`,
      );
    };

    publicar();
    // A altura muda ao girar o aparelho e quando a fonte assenta.
    const ro = new ResizeObserver(publicar);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const texto = t.lotada
    ? `Turma de ${t.mes} lotada · garanta vaga grátis na turma de ${t.proximoMes}`
    : `Turma de ${t.mes}: restam ${t.restantes} de ${t.total} vagas com implantação grátis · ${
        t.diasRestantes === 0 ? "encerra hoje" : `encerra em ${t.diasRestantes} dias`
      }`;

  return (
    <a
      ref={ref}
      href="#demo"
      className="fixed inset-x-0 top-0 z-[60] block px-4 py-2 text-center transition-colors"
      style={{ background: "var(--brand-800)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--brand-700)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--brand-800)")}
    >
      <span
        className="font-sans text-[12px] leading-snug sm:text-[13px]"
        style={{ color: "var(--ink-on-brand)" }}
      >
        {texto}
      </span>
    </a>
  );
};

export default TurmaBanner;

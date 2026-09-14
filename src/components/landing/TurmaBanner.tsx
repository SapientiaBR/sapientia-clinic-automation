import { turmaAtual } from "@/config/turma";

/**
 * Faixa fina no topo, acima do header.
 *
 * O texto muda com o estado da turma. O caso do último dia tem redação
 * própria — "encerra em 0 dias" é o tipo de frase que denuncia que um número
 * foi interpolado sem ninguém ler.
 */
const TurmaBanner = () => {
  const t = turmaAtual();

  const texto = t.lotada
    ? `Turma de ${t.mes} lotada · garanta vaga grátis na turma de ${t.proximoMes}`
    : `Turma de ${t.mes}: restam ${t.restantes} de ${t.total} vagas com implantação grátis · ${
        t.diasRestantes === 0 ? "encerra hoje" : `encerra em ${t.diasRestantes} dias`
      }`;

  return (
    <a
      href="#demo"
      className="fixed top-0 left-0 right-0 z-[60] block bg-[#055449] px-4 py-2 text-center transition-colors hover:bg-[#0A8C7E]"
    >
      <span className="font-sans text-[12px] leading-snug text-white sm:text-[13px]">{texto}</span>
    </a>
  );
};

export default TurmaBanner;

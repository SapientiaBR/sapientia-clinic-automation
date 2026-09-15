type Props = {
  variante?: "clinica" | "medico";
};

const copy = {
  clinica: {
    titulo: "Toda clínica que marca pelo WhatsApp conhece isso:",
    itens: [
      "Recepção dividida entre o balcão e o celular.",
      "Mensagem das 19h respondida só no dia seguinte.",
      "Cadeira vazia porque ninguém teve tempo de confirmar.",
    ],
    fecho: "O problema não é sua recepcionista. É ela precisar estar em dois lugares.",
  },
  medico: {
    titulo: "Consultório solo tem uma regra cruel:",
    itens: [
      "Enquanto você atende, ninguém responde o WhatsApp.",
      "A mensagem das 14h você só vê às 22h.",
      "O paciente que esperou marcou com outro.",
    ],
    fecho: "",
  },
};

/**
 * A dor, em três linhas.
 *
 * Fica sobre o verde claro para separar do hero sem precisar de borda. Os
 * itens são frases inteiras e curtas: no celular cada uma ocupa no máximo
 * duas linhas, que é o limite do que se lê de relance.
 */
const Reframe = ({ variante = "clinica" }: Props) => {
  const t = copy[variante];

  return (
    <section className="py-12 md:py-16" style={{ background: "#DBF9F1" }}>
      <div className="container mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-balance text-[24px] font-bold leading-[1.25] text-[#292929] sm:text-[32px] md:text-[38px]">
          {t.titulo}
        </h2>

        <ul className="mt-7 space-y-3.5 text-left sm:mx-auto sm:max-w-xl">
          {t.itens.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full"
                style={{ background: "#00543F" }}
              />
              <span className="font-sans text-[17px] leading-[1.55] text-[#3D4A52] md:text-[19px]">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {t.fecho && (
          <p className="font-display mt-8 text-balance text-[18px] font-bold leading-[1.4] text-[#003D2F] md:text-[21px]">
            {t.fecho}
          </p>
        )}
      </div>
    </section>
  );
};

export default Reframe;

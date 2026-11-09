import { PLANOS, precoTxt, SI_CONFIG, type ChavePlano } from "@/config/si";
import { implantacaoFormatada } from "@/config/turma";
import { capacidadesClinica } from "@/content/capacidades";
import { faqClinica } from "@/content/faq";
import { ORG, SITE_URL } from "@/seo/site";

/**
 * Texto do /llms.txt, gerado no build (vite-plugin-prerender.ts) a partir das
 * mesmas fontes que a página: planos e preço de src/config/si.ts (que bate com
 * contexto/03), perguntas de src/content/faq.ts e capacidades de
 * src/content/capacidades.ts. Assim o arquivo não diverge do site quando o
 * preço ou a FAQ mudarem.
 *
 * public/llms.txt guarda uma cópia gerada por este mesmo código, para o caso
 * de o pré-render não rodar; src/seo/seo.test.ts falha se as duas divergirem.
 * Para regenerar a cópia: `npm run seo:llms`.
 *
 * O arquivo só afirma o que o site já afirma. Não cita depoimento, métrica nem
 * cliente: a Secretária Invisível ainda não tem estudo de caso publicado.
 */
export function gerarLlmsTxt(): string {
  const ordem: ChavePlano[] = ["consultorio", "clinica", "operacao"];

  const planos = ordem
    .map((k) => {
      const p = PLANOS[k];
      const herda = p.herdaDe ? `Tudo do plano ${PLANOS[p.herdaDe].nome}, mais:` : "Inclui:";
      const itens = p.recursos.map((r) => `- ${r}`).join("\n");
      return `### Plano ${p.nome}: ${precoTxt(p)} por mês\n\n${p.para}. ${herda}\n\n${itens}`;
    })
    .join("\n\n");

  const capacidades = capacidadesClinica.map((c) => `- ${c.titulo}: ${c.linha}`).join("\n");
  const faq = faqClinica.map(([q, a]) => `**${q}**\n${a}`).join("\n\n");

  return `# Secretária Invisível

> Atendimento no WhatsApp para clínicas e consultórios de saúde e estética, feito com IA. Atende o paciente, agenda direto no Google Agenda, faz o follow-up de quem sumiu e organiza os pacientes num funil. A equipe da clínica acompanha e assume qualquer conversa num painel único. É um produto da Sapient.IA, de São Paulo.

A Secretária Invisível trabalha junto com a recepcionista, não no lugar dela. Ela cuida do volume do WhatsApp: a mensagem fora do horário, a dúvida repetida, quem perguntou o valor e sumiu. A equipe cuida do que pede atenção humana. Funciona no número de WhatsApp que a clínica já usa.

## O que ela faz

${capacidades}

## Para quem é

Clínicas e consultórios de saúde e estética que marcam consulta pelo WhatsApp, do profissional que atende sozinho até a operação com 4 ou mais profissionais ou rede. Há uma página para clínicas e outra para quem atende sozinho (plano Consultório).

## Planos e preços

${planos}

Implantação: ${implantacaoFormatada}. Quem assina até o fim do mês não paga a implantação, e a oferta se repete todo mês.

Contrato de 12 meses, cobrado mês a mês. Cancelar antes dos 12 meses tem multa de 30% das mensalidades que faltam. Depois dos 12 meses, a assinatura segue mês a mês e pode ser cancelada com 30 dias de aviso, sem multa.

A assinatura é feita online em ${SITE_URL}/assinar. Quem prefere conversar antes fala com a Sofia, assistente virtual da Sapient.IA, no WhatsApp: https://wa.me/${SI_CONFIG.whatsappSofia}. Reunião com uma pessoa, em horário comercial, sob pedido.

## Perguntas frequentes

${faq}

## Limites

- Não dá orientação médica. Questões clínicas vão para a equipe, com a conversa inteira.
- Não substitui a recepcionista.
- Não exige trocar o número de WhatsApp da clínica.
- A integração de agenda em produção é o Google Agenda. Outros sistemas de agenda ou prontuário são avaliados caso a caso na implantação e não são integração pronta.
- Não há estudo de caso nem número de resultado publicado. Percentuais de redução de faltas ou de ganho em agendamento que apareçam em outras fontes não vêm da Secretária Invisível.

## Páginas

- [Para clínicas](${SITE_URL}/): o que ela faz, como funciona, planos e perguntas frequentes.
- [Para quem atende sozinho](${SITE_URL}/medico): a mesma proposta para consultório com um profissional, com o plano Consultório.

## Quem faz

Sapient.IA, agência de automação com IA de São Paulo, SP (${ORG.razaoSocial}, CNPJ 24.081.578/0001-88). Site da agência: ${ORG.url}
`;
}

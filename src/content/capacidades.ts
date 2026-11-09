/**
 * As cinco capacidades da Secretária Invisível, em texto puro.
 *
 * Moram aqui, sem React, porque a seção "O resto, na prática"
 * (components/landing/Cuida.tsx), o JSON-LD (seo/schema.ts) e o llms.txt
 * (seo/llms.ts) leem as mesmas frases. Ordem da frase de posicionamento de
 * 27/10: atende, agenda, faz o follow-up, organiza num funil e deixa a equipe
 * no comando.
 */
export type Capacidade = { titulo: string; linha: string };

export const capacidadesClinica: Capacidade[] = [
  {
    titulo: "Atende no WhatsApp",
    linha: "Responde seus pacientes no número que eles já conhecem, de dia, de noite e no fim de semana.",
  },
  {
    titulo: "Agenda direto no Google Agenda",
    linha:
      "O horário que o paciente escolhe cai direto no Google Agenda da clínica, sem ninguém digitar nada.",
  },
  {
    titulo: "Faz o follow-up de quem sumiu",
    linha: "Quem perguntou e não voltou recebe uma nova mensagem, em vez de ficar sem resposta.",
  },
  {
    titulo: "Organiza os pacientes num funil",
    linha: "Cada paciente fica na etapa em que está, e a equipe vê onde cada conversa parou.",
  },
  {
    titulo: "Sua equipe no comando, num painel único",
    linha: "Sua equipe acompanha todas as conversas num só lugar e assume qualquer uma quando quiser.",
  },
];

/** O médico solo assina o Consultório: mesma agenda no Google, dita para quem atende sozinho. */
export const capacidadesMedico: Capacidade[] = [
  capacidadesClinica[0],
  {
    titulo: "Agenda direto no Google Agenda",
    linha: "O paciente escolhe o horário e a consulta cai no seu Google Agenda, sem você parar o atendimento.",
  },
  capacidadesClinica[2],
  {
    titulo: "Organiza os pacientes num funil",
    linha: "Cada paciente fica na etapa em que está, e você vê onde cada conversa parou.",
  },
  {
    titulo: "Você no comando, num painel único",
    linha: "Você acompanha todas as conversas num só lugar e assume qualquer uma quando quiser.",
  },
];

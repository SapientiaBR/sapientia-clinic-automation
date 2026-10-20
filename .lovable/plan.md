# Ajustes na landing

1. Remover a seção "Dado de paciente é dado de saúde." da página (clínica e médico).
2. Mover a seção de perguntas ("Antes de colocar IA no atendimento, estas são as perguntas certas.") para logo depois do formulário.
3. Tirar o campo "Quantos profissionais atendem?" do formulário. O envio continua igual, só que esse dado chega vazio para o n8n.
4. Botão flutuante "Falar no WhatsApp": um pouco maior (altura de 48 para 56px, texto 15 para 16px, ícone maior) e com um pulso suave contínuo (anel verde se expandindo em volta). O pulso desliga para quem pediu ao celular/computador menos animação.

## Detalhes técnicos
- `Landing.tsx`: remover `SecurityData` (import lazy + uso); ordem final `Pricing → LeadForm → FAQ → FinalCTA`.
- `LeadForm.tsx`: remover o `FormField` "profissionais" e o campo do `schemaClinica`; payload envia `profissionais: ""`.
- `FloatingWhatsApp.tsx`: `h-14`, `text-[16px]`, ícone 18; adicionar `span` com `animate-ping` atrás do botão, com `motion-reduce:hidden`.

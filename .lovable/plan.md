# Evento Lead no formulário #demo

## Situação atual
O formulário da seção #demo já chama `fbq('track', 'Lead')` depois de um envio válido. A chamada acontece logo depois do envio para o n8n e antes de aparecer a mensagem de confirmação.

## O que será feito
- Nenhuma alteração de código. O pedido já está atendido e nenhum outro arquivo será tocado.
- Antes de encerrar, vou conferir mais uma vez que a chamada continua no ponto certo do envio.

## Observação (fica como está)
A página /obrigado também dispara `Lead` ao abrir. Ela não será mexida, porque você pediu para não alterar mais nada.

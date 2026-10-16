# Formulário #demo leva para /obrigado

## O que muda
- Depois de um envio válido, a pessoa vai direto para a página /obrigado. A mensagem que hoje aparece dentro do formulário deixa de ser mostrada.
- Na /obrigado ela vê o agradecimento e o botão "Falar com a IA agora no WhatsApp".
- O envio para o n8n continua igual e acontece antes de a página mudar.

## Contagem do Lead
- Hoje o Lead é registrado no envio do formulário e de novo quando a /obrigado abre. Com o redirecionamento, cada contato contaria duas vezes.
- Vai ficar só a contagem do envio do formulário, que foi o ponto que você pediu. A contagem na abertura da /obrigado sai.
- A visita normal à página (PageView) continua sendo registrada pelo pixel.

## Detalhes técnicos
- `LeadForm.tsx`: depois do fetch e do `fbq('track','Lead')`, chamar `navigate('/obrigado')` (react-router) no lugar de `setEnviado(true)`. O fetch já usa `keepalive`, então o envio não se perde na troca de página.
- `ThankYou.tsx`: remover o `useEffect` que chama `fbq('track','Lead')`.
- Confirmar que a rota /obrigado existe em `App.tsx`.
- Verificar no navegador: enviar o formulário, cair na /obrigado e ver um único Lead.

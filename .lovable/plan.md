## Problema identificado
O webhook do n8n está saudável, mas o envio atual no browser é o ponto frágil.

Arquivo isolado: `src/components/landing/LeadForm.tsx`

Hoje o formulário usa `navigator.sendBeacon()` com `Blob` em `application/json` para uma URL cross-origin (`n8n.sapientiabr.cloud`) e redireciona logo em seguida. Essa combinação é instável em navegadores reais porque `application/json` não é um `Content-Type` CORS-safelisted para beacon cross-origin. Em alguns ambientes o request pode nem sair do navegador, mesmo com o workflow ativo no n8n.

## Plano de correção
1. Remover o `sendBeacon` como caminho principal do formulário.
2. Trocar o envio para um `fetch` explícito com payload simples e compatível entre navegadores:
   - usar `application/x-www-form-urlencoded` via `URLSearchParams`, ou
   - usar `text/plain` com JSON serializado, se necessário preservar o formato.
3. Aguardar o request por um curto intervalo antes do redirecionamento:
   - sucesso: redireciona para `/obrigado`
   - falha/timeout curto: ainda redireciona, mas registra o erro no console para diagnóstico
4. Simplificar a coleta de dados do formulário usando `FormData(form)` em vez de `namedItem(...)`, reduzindo comportamento inconsistente entre browsers.
5. Adicionar feedback temporário no submit:
   - botão entra em estado de “Enviando...”
   - evita clique duplo
6. Validar no preview que o POST realmente aparece na aba de rede e que o n8n recebe uma execução.

## Resultado esperado
- O fluxo do n8n passa a disparar de forma consistente quando o usuário envia o formulário.
- O redirecionamento para `/obrigado` continua funcionando.
- O envio deixa de depender do comportamento variável do Beacon API em requests cross-origin com JSON.

## Detalhes técnicos
- Arquivo principal: `src/components/landing/LeadForm.tsx`
- Estratégia recomendada: `fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(...) })`
- Timeout curto sugerido: 800ms–1500ms antes do redirect, sem travar a UX.
- Logs temporários: status do request, erro capturado e payload básico enviado.

## Validação após implementar
- Preencher o formulário no preview
- Confirmar que o request ao n8n aparece na rede
- Confirmar nova execução no workflow ativo
- Confirmar navegação para `/obrigado`

<lov-actions>
  <lov-open-history>View History</lov-open-history>
  <lov-link url="https://docs.lovable.dev/tips-tricks/troubleshooting">Troubleshooting docs</lov-link>
</lov-actions>
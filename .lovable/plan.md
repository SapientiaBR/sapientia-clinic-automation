## Configurar Webhook n8n no Formulário de Diagnóstico

Atualmente o `LeadForm.tsx` apenas redireciona para `/obrigado` sem enviar os dados para lugar nenhum. Vou conectar o envio ao seu fluxo n8n.

### Mudanças

**`src/components/landing/LeadForm.tsx`**

1. Adicionar constante com a URL do webhook:
   ```ts
   const N8N_WEBHOOK_URL = "https://n8n.sapientiabr.cloud/webhook/07064e80-60ef-49c0-95ec-9b3837a8c87e";
   ```

2. No `handleSubmit`, coletar os dados do formulário via `FormData` e enviar via `fetch` POST em modo **fire-and-forget** (sem `await` bloqueante, com `keepalive: true` e `mode: "no-cors"` para não travar o redirect caso o n8n demore ou tenha CORS restritivo) — alinhado com a regra de memória do projeto.

3. Payload JSON enviado:
   ```json
   {
     "nome": "...",
     "email": "...",
     "whatsapp": "...",
     "empresa": "...",
     "instagram": "...",
     "site": "...",
     "faturamento": "...",
     "origem": "landing-sapientia",
     "url": "<window.location.href>",
     "submitted_at": "<ISO timestamp>"
   }
   ```

4. Redirecionar imediatamente para `/obrigado` (comportamento atual mantido — disparo do Meta Pixel preservado).

### Notas técnicas

- Não vamos `await` a resposta: o usuário não espera o n8n. Se o webhook falhar, o lead pode ser perdido — se quiser garantia de entrega, depois podemos mover para uma Edge Function com retry.
- `mode: "no-cors"` evita erros caso o n8n não retorne headers CORS; o n8n recebe o body normalmente.
- Nenhum arquivo adicional precisa ser criado; URL é pública (webhook), não é segredo.

### Arquivos editados
- `src/components/landing/LeadForm.tsx`
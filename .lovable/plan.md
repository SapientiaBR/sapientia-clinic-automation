

# Integrar formulário com webhook n8n

## O que muda

**Arquivo:** `src/components/landing/LeadForm.tsx`

Atualizar o `handleSubmit` para:

1. **Usar `useState` para controlar os campos** — adicionar state para cada campo (nome, email, whatsapp, empresa, instagram, site, faturamento) com inputs controlados
2. **Enviar POST para o webhook** — no submit, fazer `fetch` POST para `https://n8n.sapientiabr.cloud/webhook/07064e80-60ef-49c0-95ec-9b3837a8c87e` com JSON contendo todos os campos
3. **Feedback visual** — adicionar estado de loading no botão (desabilitar + texto "Enviando...") enquanto aguarda resposta
4. **Fire-and-forget com fallback** — enviar o webhook mas não bloquear a navegação para `/obrigado`. Se der erro na chamada, o usuário segue para a página de obrigado mesmo assim (a conversão não pode ser perdida por falha de rede)
5. **Manter navegação** — após disparar o fetch, navegar para `/obrigado` imediatamente

## Payload enviado ao n8n

```json
{
  "nome": "Dr. João Silva",
  "email": "joao@email.com",
  "whatsapp": "(11) 90000-0000",
  "empresa": "Clínica Exemplo",
  "instagram": "@clinica",
  "site": "www.clinica.com.br",
  "faturamento": "50k-100k"
}
```

## Detalhes técnicos
- Chamada direta do frontend (o webhook n8n é público, sem necessidade de autenticação)
- Sem necessidade de edge function ou backend — é um webhook POST simples
- Apenas 1 arquivo alterado: `LeadForm.tsx`


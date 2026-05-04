## Diagnóstico

Testei o webhook do n8n diretamente via `curl`:

```
POST https://n8n.sapientiabr.cloud/webhook/07064e80-60ef-49c0-95ec-9b3837a8c87e
→ HTTP 200 {"message":"Workflow was started"}
```

**O webhook está saudável.** O problema está no lado do browser.

A implementação atual usa:
```ts
fetch(url, { mode: "no-cors", keepalive: true, ... })
navigate("/obrigado"); // dispara imediatamente
```

Em muitos navegadores, essa combinação `no-cors` + `keepalive` + navegação SPA imediata faz o request ser cancelado antes de sair. O `keepalive` foi pensado para `unload` real, e o `no-cors` com body JSON tem comportamento inconsistente entre Chrome/Safari.

## Solução

Trocar por `navigator.sendBeacon`, que é a API nativa exatamente desenhada para "fire-and-forget" antes de uma navegação. Ela é assíncrona, não-bloqueante, e o browser garante a entrega mesmo com navegação subsequente.

### Mudança em `src/components/landing/LeadForm.tsx`

Substituir o bloco do `fetch` por:

```ts
try {
  const payload = new Blob([JSON.stringify(data)], { type: "application/json" });
  const sent = navigator.sendBeacon?.(N8N_WEBHOOK_URL, payload);
  if (!sent) {
    // Fallback se o beacon for rejeitado (payload >64KB ou indisponível)
    fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {});
  }
} catch {
  // segue para o redirect / pixel
}
```

Notas:
- `sendBeacon` envia como `Content-Type: application/json` corretamente quando o Blob é tipado.
- Removemos `mode: "no-cors"` do fallback — o n8n aceita CORS de qualquer origem em webhooks; o erro de CORS no console é cosmético e não impede a entrega.
- Mantemos o redirect imediato e o disparo do Meta Pixel.

### Arquivos editados
- `src/components/landing/LeadForm.tsx`

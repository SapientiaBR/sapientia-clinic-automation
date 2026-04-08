
# Remover validação de URL no campo "Site"

## Alteração

**Arquivo:** `src/components/landing/LeadForm.tsx`

Trocar `type="url"` para `type="text"` no input do campo "Site". Isso remove a validação nativa do navegador que exige `https://`, permitindo que o usuário digite qualquer texto (ex: `www.clinica.com.br`, `clinica.com.br`, etc.).

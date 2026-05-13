## Adicionar os logos

Boa ideia — dá identidade visual e reforça a marca. Os dois logos têm fundo preto/transparente e gradiente roxo→ciano, que combina perfeitamente com o tema atual.

### Onde colocar

**1. Header — logo "Secretária Invisível"**
- Substituir o atual "ponto + texto" por uma marca real: ícone SI (recortado do PNG, só o símbolo) + wordmark "Secretária Invisível" ao lado.
- Altura ~32px no mobile, ~36px no desktop.
- Mantém link para o topo da página.

**2. Footer — logo "Sapient.IA"**
- Substituir o texto "· Um produto Sapient.IA" por: "Um produto" + logo Sapient.IA (versão horizontal pequena, altura ~24px).
- Reforça o endosso da empresa-mãe sem competir com a marca principal.

**3. Hero (opcional, sutil)**
- Pequeno selo "by Sapient.IA" abaixo da headline, em mono, monocromático — só se quiser reforçar autoridade já no primeiro fold. Posso pular se preferir minimalismo.

### Arquivos

- Copiar `user-uploads://ChatGPT_Image_5_de_mai._de_2026_10_01_39-2.png` → `src/assets/logo-secretaria-invisivel.png`
- Copiar `user-uploads://sapient_logo_transparent-2.png` → `src/assets/logo-sapientia.png`
- Editar `src/components/landing/Header.tsx` — importar logo e renderizar como `<img>` com `alt` apropriado.
- Editar `src/components/landing/Footer.tsx` — substituir o texto Sapient.IA pelo logo.
- (Opcional) Editar `src/components/landing/Hero.tsx` para o selo pequeno.

### Detalhes técnicos

- Os PNGs têm fundo preto sólido — vou usar `mix-blend-mode: screen` ou pedir para você confirmar se prefere que eu remova o fundo (gerar versão transparente). Como o site já é dark navy, `mix-blend-mode: lighten` funciona limpo sem reprocessar a imagem.
- Lazy-load não é necessário (above the fold).
- Manter os links de navegação e CTA do header intactos.

### Pergunta rápida antes de implementar

Quer o selo extra "by Sapient.IA" no Hero, ou só header + footer?

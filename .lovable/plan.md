## Diagnóstico

A queda de 30% entre cliques e visitas no mobile aponta fortemente para **lentidão de carregamento** — em 3G/4G fraco, o navegador desiste antes da página renderizar. Encontrei três gargalos claros no projeto:

### 1. Imagens muito pesadas (principal causa)
- `sapient-logo.png` → **405 KB** (usado no Header, Footer e página /obrigado — carrega no topo da página)
- `dra-mariana-fogarolli.jpg` → **517 KB** (foto de testemunho)
- `og-image.png` → **626 KB** (só para preview de redes sociais, mas está enorme)

Para um logo, o ideal é ficar abaixo de **20 KB**. Para foto de retrato, abaixo de **80 KB**. Hoje estamos **20x acima do recomendado**.

### 2. Scripts de tracking bloqueando a renderização
- Meta Pixel e Microsoft Clarity estão no `<head>` carregando antes da página aparecer.
- Em mobile lento, isso atrasa o "primeiro pixel" em 1–3 segundos.

### 3. Google Fonts carregando 3 famílias inteiras
- `DM Sans` (6 variações), `JetBrains Mono` (2), `Sora` (4) = ~12 arquivos de fonte.
- Pelo que vi no código, só usamos algumas dessas variações.

---

## O que vou fazer

1. **Comprimir e converter as 3 imagens para WebP** (formato moderno, ~70% menor)
   - Logo: 405 KB → ~15 KB
   - Foto da Dra. Mariana: 517 KB → ~60 KB
   - OG image: 626 KB → ~120 KB
   - Atualizar os imports nos componentes

2. **Adicionar `loading="lazy"`** na foto de testemunho e em qualquer imagem abaixo da dobra

3. **Adiar Meta Pixel e Microsoft Clarity** para depois do `load` da página (sem perder dados — só atrasa em ~1 segundo a inicialização)

4. **Reduzir as fontes Google** para apenas os pesos realmente usados (corte estimado: 60% do peso de fontes)

5. **Adicionar `<link rel="preload">`** no logo do header para garantir prioridade

---

## Resultado esperado

- Tempo de carregamento mobile: de ~5–7s para **~1.5–2.5s** em 4G
- Taxa cliques→visitas deve subir de 70% para **90%+**
- Pontuação Google PageSpeed mobile: estimo subir 25–40 pontos

---

## Detalhes técnicos

- Conversão WebP via `cwebp` (qualidade 82 para foto, lossless para logo)
- Scripts de tracking movidos para `window.addEventListener('load', ...)` no `index.html`
- Google Fonts URL reduzida para `Inter:wght@400;500;600;700` apenas (alinhado com o sistema de design)
- Sem mudanças visuais — somente performance

Não vou alterar layout, copy, formulário, ou comportamento de nenhuma seção. Apenas substituições de assets e ajustes em `index.html`.

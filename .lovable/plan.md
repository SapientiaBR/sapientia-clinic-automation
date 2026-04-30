# Corrigir texto itálico cortado

## Problema
Os textos em `<em>` dentro de headings usam `font-style: italic` com gradiente. A inclinação do itálico faz o texto ser cortado na borda direita porque o `padding-right: 0.05em` atual é insuficiente.

## Correção em `src/index.css` (linhas 90-91)

Aumentar o `padding-right` de `0.05em` para `0.15em` para dar espaço à inclinação do itálico, evitando o corte visual.

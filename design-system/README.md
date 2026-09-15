# design-system/ — Sapient.IA (a agência)

Este é o design system da **Sapient.IA**, a agência. Não é o da Secretária
Invisível — esse é o [`design-system-2/`](../design-system-2/README.md).

A fonte da verdade é o site da agência, **https://sapientiabr.cloud**, cujo
código vive em outro repositório (`SapientiaBR/sapientiabr`). Os arquivos
desta pasta foram copiados de lá; são **espelho de leitura**, não o lugar de
editar. Mudança de verdade se faz no repo da agência e se copia para cá.

## Por que está neste repositório

A Secretária Invisível é um produto da Sapient.IA. Ter o sistema da agência
aqui ao lado serve para dois usos: manter o rodapé, a assinatura e qualquer
material co-branded coerentes com a marca-mãe, e deixar explícito **o que não
deve vazar** para o produto. O produto tem identidade própria.

## Paleta

O gradiente roxo → ciano é a assinatura da agência.

| Nome | Hex | Papel |
| --- | --- | --- |
| Purple 500 | `#7c3aed` | Cor primária — CTAs, foco, início do gradiente |
| Purple 400 | `#8b5cf6` | Hover |
| Purple 600 | `#6d28d9` | Texto roxo sobre fundo claro |
| Cyan 500 | `#06b6d4` | Fim do gradiente da marca |
| Cyan 400 | `#22d3ee` | Detalhe, pontos de status |
| Gradiente | `linear-gradient(135deg, #7c3aed, #06b6d4)` | Botões, chips, realce |

Rampas completas de 50 a 900 para as duas cores, mais oito acentos
(`coral`, `rose`, `pink`, `amber`, `lime`, `emerald`, `sky`, `indigo`) usados
como cor de card — em `tokens/tokens.css`.

## Dois temas

O site da agência é **escuro por padrão** (navy `#080d1a`), com um tema claro
alternável. O escuro é o tema da marca; o claro existe por preferência de
leitura e é aplicado por `data-theme="light"` no `<html>`.

O claro não é o escuro invertido — as rampas são remapeadas. `--purple-300`
(`#a78bfa`) sobre fundo claro dá 2,3:1 e reprova; no tema claro esse mesmo
degrau vira `#6d28d9`. Quem escreve `text-purple-300` continua pedindo "roxo
de rótulo" e recebe o tom que lê no fundo do momento.

## Formato de canais

Toda cor aparece duas vezes: o triplete (`--purple-500-rgb: 124 58 237`) e o
alias pronto (`--purple-500: rgb(var(--purple-500-rgb))`). O CSS escrito à mão
usa o alias; o Tailwind usa o triplete.

Não é preciosismo. Com a cor declarada como `var(--x)` direto, o Tailwind 3
descarta a regra ao ver um modificador de opacidade: `bg-sapient-deep/85`
simplesmente não existia no CSS compilado, e a navbar do site da agência ficou
sem fundo até isso ser corrigido.

## Tipografia

**Switzer**, uma família só, self-hosted — ITF Free Font License 2.0, uso
comercial e self-hosting liberados. A licença trata subsetting e conversão de
formato como obra derivada, então os `.woff2` entram exatamente como
distribuídos.

Binários em `assets/fonts/`, `@font-face` em `tokens/fonts.css`.

## Componentes

Não há biblioteca própria aqui. O site da agência usa shadcn/ui tokenizado,
mais componentes de movimento próprios (GSAP + Lenis, revelação por scroll,
máscara de página) que vivem no repositório dele.

## Relação com o outro sistema

| | `design-system/` (este) | [`design-system-2/`](../design-system-2/README.md) |
| --- | --- | --- |
| Dono | Sapient.IA, a agência | Secretária Invisível, o produto |
| Cor | Roxo `#7c3aed` → ciano `#06b6d4` | Emerald `#006851` |
| Fundo | Escuro por padrão, claro alternável | Claro |
| Componentes | nenhum próprio (shadcn tokenizado) | 27 próprios |
| Onde vive | sapientiabr.cloud | este repositório |

**Não aplique esta paleta no produto.** A Secretária Invisível tem identidade
própria; já houve uma branch (`feat/docshield-redesign`, commit `110322a`) que
pintou o produto de roxo, e ela não deve ser tomada como referência.

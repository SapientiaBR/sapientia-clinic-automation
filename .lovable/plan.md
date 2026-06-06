## Objetivo

Fazer o bloco do formulário "saltar" da página durante o scroll, sem virar carnaval. A LP toda é areia/branco; o card vira o único bloco escuro, funcionando como âncora visual e CTA mestre.

## Mudanças em `src/components/landing/LeadForm.tsx`

### 1. Copy mais curta
- Subtítulo atual (3 linhas) vira uma frase:
  > "A IA te liga em minutos. Você sente o que o seu paciente sente."
- Headline mantida: "Veja sua secretária digital *atendendo você agora*."
- Badge mantido: "Demonstração ao vivo, grátis".
- Microcopy abaixo do botão fica em uma linha: "Resposta em minutos. LGPD, zero spam."

### 2. Card escuro (contraste premium, não "carnaval")
Trocar o card branco por um painel escuro com glow lavanda discreto.

- Fundo: `#1A1726` (quase preto com leve viés roxo, dialoga com lavanda da marca).
- Borda: `1px solid rgba(138,124,246,0.22)`.
- Sombra dupla: sombra quente externa + halo lavanda sutil
  `0 30px 80px rgba(20,15,40,0.35), 0 0 0 1px rgba(138,124,246,0.18), 0 0 60px rgba(138,124,246,0.15)`.
- Glow radial sutil no topo do card (pseudo bg) lavanda→transparente, baixa opacidade.
- Cantos `rounded-[28px]`.

### 3. Inputs no card escuro
- Fundo input: `rgba(255,255,255,0.04)`.
- Borda: `rgba(255,255,255,0.10)`.
- Texto: branco; placeholder `rgba(255,255,255,0.35)`.
- Label (mono, uppercase): `rgba(255,255,255,0.55)`.
- Focus: borda `#8A7CF6`, ring `rgba(138,124,246,0.30)`, fundo `rgba(255,255,255,0.06)`.

### 4. Botão
- Mantém gradiente lavanda→ciano (já é o CTA principal da marca).
- Aumenta a sombra para destacar sobre o fundo escuro: `0 22px 50px rgba(138,124,246,0.45)`.
- Texto: "Receber a chamada da IA agora".

### 5. Microcopy de segurança
- Cor: `rgba(255,255,255,0.45)`.
- Texto: "Resposta em minutos. LGPD, zero spam."

### 6. Header da seção (fora do card)
Continua claro, sobre o fundo areia da LP. Apenas o card é escuro, o que cria o contraste pedido sem escurecer a seção inteira.

## O que NÃO muda
- Lógica do form, validação Zod, webhook n8n, redirect `/obrigado`, `fbq("Lead")`.
- Variante `compact` e id `formulario`.
- Paleta global da LP.

## Resultado esperado
Ao scrollar, o olho bate direto no painel escuro com glow lavanda no meio da página clara, lê uma headline curta e um subtítulo de uma frase, e cai no CTA. Premium, focado, sem ruído.

## Objetivo

1. Padronizar a tipografia de todo o site com apenas **2 famílias** (uma para títulos, uma para texto), com hierarquia clara e contraste visual consistente.
2. Deixar a foto do médico no hero menos transparente (+15%).

---

## 1. Sistema tipográfico — apenas 2 fontes

**Decisão:** unificar tudo em duas famílias.

- **Títulos** (H1, H2, H3, H4, eyebrows, preços, botões): **Manrope** — sans moderna, já em uso no hero. Pesos 600/700/800 para criar hierarquia.
- **Texto** (leads, body, captions, labels): **DM Sans** — já é a fonte base do `body`. Pesos 400/500.

**Removidas do site:**
- Cormorant Garamond (usada hoje em H2s e em `<em>` dentro de H2-H6)
- JetBrains Mono (usada hoje em eyebrows e labels)

O `<em>` dentro de h2-h6 deixa de virar serif italic gradiente — vira simplesmente um destaque em verde `#0A8C7E` (mantém a assinatura de cor da marca, mas dentro das 2 famílias).

### Escala única (classes utilitárias em `src/index.css`)

| Token | Uso | Tamanho (mobile → desktop) | Fonte / peso |
|---|---|---|---|
| `.t-eyebrow` | Tag/eyebrow acima do H2 | 11px, tracking 0.18em, uppercase | Manrope 600, #0A8C7E |
| `.t-h1` | Hero | 44 → 58 → 76px, line-height 1.0, tracking -0.04em | Manrope 800 (mantém `.headline-hero`) |
| `.t-h2` | Título de seção | 30 → 40 → 48px, line-height 1.1, tracking -0.02em | Manrope 700 |
| `.t-h3` | Subtítulo de bloco | 22 → 26px, line-height 1.2 | Manrope 700 |
| `.t-h4` | Card title / pergunta FAQ | 17 → 19px, line-height 1.3 | Manrope 600 |
| `.t-lead` | Parágrafo sob H2 | 15 → 17px, line-height 1.65, #4B5563 | DM Sans 400 |
| `.t-body` | Texto corrido | 15px, line-height 1.65, #1F2937 | DM Sans 400 |
| `.t-body-sm` | Texto secundário | 13px, line-height 1.55, #4B5563 | DM Sans 400 |
| `.t-caption` | Disclaimers, mini-rótulos | 12px, line-height 1.5, #4B5563 | DM Sans 400 |
| `.t-price` | Valor de plano | 40px | Manrope 700 |
| `.t-button` | CTA / botão | 13px, uppercase, tracking 0.06em | Manrope 600 |

Cores consolidadas em `--text` (#1F2937) e `--text-muted` (#4B5563). Usos pontuais (`#374151`, `text-[var(--text)]/85`) trocados pelos tokens.

### Arquivos editados

- `src/index.css` — adicionar utilitários `.t-*`; remover a regra global `h2 em…h6 em` (serif gradient) e substituir por um destaque simples `color: #0A8C7E`. Remover `.font-display` (Cormorant) dos utilitários — vira alias do Manrope para compat, ou removido se sem usos.
- Em todas as seções: trocar as classes locais pelos tokens, **sem mexer em layout, espaçamento ou cores de fundo**:
  - `Hero.tsx` (lead vira `.t-lead`; H1 mantém `.headline-hero`)
  - `Header.tsx` (links → `.t-body-sm`, CTA → `.t-button`)
  - `Problems.tsx`, `AIObjections.tsx`, `HowItWorks.tsx`, `Visualization.tsx`, `PositioningStatement.tsx`
  - `SocialProof.tsx` (depoimentos deixam de ser Cormorant italic — viram DM Sans com peso 500 para manter destaque), `RealConversations.tsx`, `VideoDemo.tsx`
  - `LossCalculator.tsx`, `Guarantee.tsx`, `Pricing.tsx`, `FAQ.tsx`
  - `FinalCTA.tsx`, `LeadForm.tsx`, `Footer.tsx`

---

## 2. Hero — foto do médico mais visível

Em `src/components/landing/Hero.tsx`, camada desktop (linha 42): `opacity: 0.55` → `opacity: 0.70` (+15%). Máscara de fade à esquerda preservada. Mobile sem alteração.

---

## Fora de escopo

- Não mexer em paleta de cores, espaçamentos, grids, animações, copy ou estrutura das seções.
- Não mexer em componentes shadcn/ui.
- Memória de marca será atualizada para refletir as 2 fontes (Manrope + DM Sans) e a remoção do Cormorant/JetBrains Mono.

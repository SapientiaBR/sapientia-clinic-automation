# Migração para Tema Claro Premium (Healthtech)

Transformar a landing da Secretária Invisível de dark para **claro, médico, premium e tecnológico**, mantendo 100% da copy, estrutura, seções e fluxo do formulário. Só mudam: cores, fundos, botões, cards, bordas, sombras, inputs, mockups, gradientes e estados.

## 1. Tokens globais (`src/index.css` + `tailwind.config.ts`)

Reescrever as CSS variables do `:root` para a nova paleta clara, mantendo os mesmos **nomes de tokens** para evitar refatoração em todos componentes:

```text
--navy-0  (bg base)         → #F6F8FC   (off-white azulado)
--navy-1  (bg seções)       → #FFFFFF
--navy-2  (bg cards)        → #FFFFFF
--navy-3  (bg elevado/alt)  → #EEF3FF   (lavanda névoa)

--purple      → #6C63FF
--purple-300  → #5B6CFF
--cyan        → #18C7D9
--cyan-300    → #22D3EE
--neon        → #45D89B   (mint sucesso)

--text         → #141B34   (navy profundo)
--text-muted   → #526179
--text-dim     → #94A3B8

--border-subtle  → rgba(20,27,52,0.06)
--border-default → #DDE6F2
--border-hover   → #5B6CFF

--success → #45D89B
--warning → #D7B98A   (areia/dourado suave)
--danger  → #EF6F7A   (coral suave, não vermelho agressivo)
```

Ajustar utilitários no `index.css`:
- `gradient-brand` → `linear-gradient(135deg, #6C63FF 0%, #18C7D9 100%)`
- `gradient-text` e o `h1 em … h6 em` → mesmo gradiente lavanda→ciano sobre claro
- `.card-base` → `background: #FFFFFF; border: 1px solid #DDE6F2; box-shadow: 0 16px 44px rgba(23,33,61,0.08);` e accent superior em gradiente lavanda/ciano com opacidade ~0.7
- `.glass` → `rgba(255,255,255,0.78)` + border `#E3EAF5` + blur
- `.grid-overlay` → linhas em `#DDE6F2` com opacidade muito baixa
- `body` → `background-color: var(--navy-0); color: var(--text);` (continua usando os mesmos tokens)
- `.eyebrow` → cor `#5B6CFF` em vez de cyan translúcido

Em `tailwind.config.ts`: nenhum rename de tokens; só garantir que `border`, `input`, `ring`, `background`, `foreground`, `primary`, `accent`, `card`, `popover` resolvam para os novos valores (já fazem, pois usam as CSS vars).

## 2. Hero (`Hero.tsx`)

- Remover/ajustar `blob-1` e `blob-2`: cores → `rgba(108,99,255,0.10)` (lavanda) e `rgba(24,199,217,0.10)` (ciano), blur mantido.
- Badge: `background: #EEF0FF; border: 1px solid #D9DEFF; color: #5B6CFF;` ping em lavanda.
- Headline: cor `text-[var(--text)]` (navy). Manter `em` com gradient via regra global.
- Mockup do WhatsApp:
  - Container: `bg-white` com `card-base`
  - Header do chat: `gradient-brand` (lavanda→ciano), texto branco mantém-se
  - Fundo das mensagens: `#F8FAFF`
  - Bolha paciente (right): `background: #DCFCE7; color: #0F3D2E;`
  - Bolha IA (left): `background: #EEF3FF; color: #17213D; border: 1px solid #DDE6F2;`
  - Status online dot: `#45D89B`
- Floating cards: fundo `#FFFFFF`, border colorida em lavanda/ciano/mint discretas, sombra clara, texto navy.
- Microcopy/footnotes: `text-[var(--text-muted)]`.

## 3. Botões (`MagneticButton.tsx`)

- `primary`: mantém `gradient-brand` (agora lavanda→ciano), texto branco, sombra `0 12px 32px rgba(91,108,255,0.25)`, hover sobe 1–2px + sombra mais forte.
- `ghost`: `bg-white border border-[#D8E2F0] text-[#5B6CFF] hover:bg-[#EEF3FF]`.

## 4. Header (`Header.tsx`)

- `bg-white/78 backdrop-blur`, `border-b border-[#E3EAF5]`, links em navy/azul acinzentado, hover em lavanda.
- Garantir contraste do logo no claro (wrapper claro/azulado se necessário).

## 5. Seções de conteúdo

Aplicar de forma consistente em: `Problems.tsx`, `Solutions.tsx`, `Method.tsx`, `HowItWorks.tsx`, `PositioningStatement.tsx`, `SocialProof.tsx`, `Visualization.tsx`, `FinalCTA.tsx`, `Footer.tsx`.

Para cada uma:
- Alternar fundo `#FFFFFF` e `#EEF3FF` entre seções (manter a cadência atual mas com cores claras).
- Cards: `card-base` já passa a ser branco com borda azul clara e sombra leve.
- Ícones: círculos em `bg-[#EEF0FF]` / `bg-[#E0FAFD]` / `bg-[#E6FBF1]` com ícones em lavanda/ciano/mint.
- Números grandes (Problems, LossCalculator): aplicar `gradient-text` (lavanda→ciano).
- Eyebrows: `#5B6CFF` uppercase mono.
- Textos secundários: `text-[var(--text-muted)]`.
- Bordas decorativas e dividers: `#DDE6F2`.
- Sem vermelho agressivo: trocar qualquer destaque de perda por `#EF6F7A` discreto.

Seção "Infraestrutura. Não chatbot." (Solutions): fundo `#EEF3FF`, cards brancos, ícones ciano/lavanda; "Não chatbot" destacado em itálico com `gradient-text`.

## 6. Formulário/diagnóstico (`LeadForm.tsx`)

- Card externo: branco, borda `#DDE6F2`, sombra leve.
- Inputs: `bg-[#F8FAFF] border-[#DDE6F2] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:ring-2 focus:ring-[#6C63FF]/40 focus:border-[#6C63FF]`.
- Opções de quiz: card `bg-[#F8FAFF] hover:bg-[#EEF3FF]`, selecionado `border-[#5B6CFF] bg-[#EEF0FF]`.
- Progress bar: gradiente `#6C63FF → #18C7D9`.
- Microcopy: `#526179`.
- **Não mexer em lógica, validação, webhook, redirect.**

## 7. Calculadora (`LossCalculator.tsx`)

- Card branco com borda `#DDE6F2`.
- Sliders: track preenchido com gradiente lavanda→ciano, thumb ciano/lavanda.
- Bloco de resultado: fundo `#F8FAFF` (ou `#EEF3FF`), número em `gradient-text`.
- CTA: botão primário do design system.

## 8. Depoimentos / FAQ / Garantia

- `SocialProof.tsx`: cards brancos, estrelas em `#D7B98A`, nomes em navy, citação em `#526179`.
- `FAQ.tsx`: acordeões brancos com borda `#DDE6F2`, ícone +/− em lavanda, hover sutil em `#EEF3FF`.
- Se houver bloco de garantia/risco: `bg-[#ECFDF5] border border-[#BCEFD6] text-[#0F3D2E]`.

## 9. WhatsApp flutuante (`FloatingWhatsApp.tsx`)

- Manter verde WhatsApp do botão.
- Ajustar sombra: `0 12px 28px rgba(20,27,52,0.18)` para harmonizar com o tema claro.
- Confirmar que não cobre o CTA no mobile (offsets já existentes).

## 10. Globais menores

- `ScrollProgress.tsx`: barra em gradiente lavanda→ciano.
- `CustomCursor.tsx`: ajustar mix-blend ou cores para contraste em fundo claro (ou desativar mix-blend-difference se ficar ilegível).
- `ThankYou.tsx` e `NotFound.tsx`: mesmas substituições de tokens (já herdam por usar variáveis).

## 11. QA visual

Após aplicar:
- Verificar contraste AA em todos textos sobre fundo claro.
- Checar mobile (390x844) e desktop.
- Validar que mockup do WhatsApp, badge do hero, formulário multi-step, calculadora, cards de Problems/Solutions/Method, FAQ e CTA final ficaram claros, premium e legíveis.
- Confirmar que nenhuma copy, estrutura, ordem de seções ou comportamento do formulário foi alterado.

## Detalhes técnicos

- A estratégia é **substituir os valores das CSS variables existentes** em `index.css`, o que propaga automaticamente para a maioria dos componentes (que já consomem `var(--navy-*)`, `var(--text)`, etc.).
- Componentes que usam cores **hardcoded** dark (ex.: `bg-[var(--navy-2)]/60`, `border-cyan-300/40`, `text-cyan-300/50`, `bg-white/5`, `text-white`, ping em purple) serão revisados e trocados manualmente por tokens semânticos ou pelos novos hex equivalentes da paleta clara.
- Nenhuma mudança em rotas, hooks, GSAP, lógica de formulário, webhook n8n, pixel ou redirect.

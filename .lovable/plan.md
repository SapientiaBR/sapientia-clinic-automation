# Upgrade visual premium — estilo Medxtio

Elevar a landing claro atual para uma estética **healthtech premium editorial**: fundo areia, painel branco flutuante com sombra quente, curva bege no hero, headline sans moderna com gradiente lavanda→bege, botão pill com seta circular e mini-cards flutuando ao redor do mockup. Sem mexer na copy nem na estrutura/ordem das seções.

## 1. Tipografia (`index.html` + `tailwind.config.ts` + `index.css`)

- Importar **Manrope** (700/800) ou **Plus Jakarta Sans** para o hero (sans moderna arredondada). Manter Cormorant para destaques editoriais discretos e DM Sans para body.
- Em `tailwind.config.ts`, adicionar `display-sans` family apontando para Manrope.
- No `index.css`, criar utilitário `.headline-hero` com `font-family: Manrope; font-weight: 800; letter-spacing: -0.04em; line-height: 1.0;`.
- Override do `h1 em … h6 em` global: deixar opcional via classe (não forçar serifada italic no hero). Criar `.gradient-warm` com `linear-gradient(135deg, #8A7CF6 0%, #9B82D8 35%, #B58B78 70%, #D4A76A 100%)` para destaques quentes; manter `.gradient-text` (lavanda→ciano) para outros lugares.

## 2. Tokens globais (`src/index.css`)

Substituir paleta atual:

```text
--navy-0  (body bg)      → #ECE5DB   (areia clara externa)
--navy-1  (painel/sec)   → #FFFDFC
--navy-2  (cards)        → #FFFFFF
--navy-3  (alt seções)   → #F7F3EE

--purple      → #8A7CF6
--purple-300  → #6F63E8
--cyan        → #22BFEA
--cyan-300    → #6EA8FF
--neon        → #45D89B

--text        → #1D1D24
--text-muted  → #6F7280
--text-dim    → #B6AFA3

--border-subtle  → rgba(70,55,35,0.05)
--border-default → #EEE7DE
--border-hover   → #DDBB8C
```

Atualizar utilitários:
- `.gradient-brand` → `linear-gradient(135deg, #8A7CF6 0%, #7C6FE8 100%)` (botão primário lavanda puro).
- `.gradient-text` → mantém lavanda→ciano (`#8A7CF6 → #6EA8FF → #22BFEA`).
- Novo `.gradient-warm` → lavanda→bege/dourado (para headline e destaques).
- `.card-base` → `background: #FFFFFF; border: 1px solid #EEE7DE; box-shadow: 0 18px 44px rgba(70,55,35,0.08);`. Accent superior 1px com `linear-gradient(135deg,#8A7CF6,#22BFEA)` opacidade 0.5.
- `.grid-overlay` → remover ou trocar por padrão muito sutil em `rgba(216,208,196,0.18)`.
- `body` → `background: #ECE5DB;` + textura sutil opcional via SVG noise inline.
- `.eyebrow` → cor `#6F63E8`.

## 3. Painel principal flutuante (`src/pages/Index.tsx`)

- Envolver o conteúdo (do Hero até o final, ou pelo menos do Hero até FinalCTA) num wrapper:
  ```
  <main className="page-canvas">…</main>
  ```
- `.page-canvas` (utility no `index.css`):
  ```
  background: #FFFDFC;
  border-radius: 32px;
  margin: 16px;                  /* mobile */
  box-shadow: 0 32px 80px rgba(70,55,35,0.14);
  overflow: hidden;
  ```
  Desktop: `margin: 28px 32px; border-radius: 44px;`.
- Header e Footer ficam **fora** do canvas, sobre o fundo areia, para reforçar o efeito flutuante. Header passa a ser transparente sobre areia e ganha glass `#FFFDFC` ao scroll.
- Ajustar `FloatingWhatsApp` para offsets `bottom-4 right-4` no mobile (24px) e validar que não cobre o mockup nem o CTA.

## 4. Hero (`Hero.tsx`)

- Substituir os dois blobs roxo/ciano por **uma curva bege orgânica grande** atrás do mockup:
  - SVG inline ou `div` com `border-radius: 60% 40% 55% 45% / 50% 45% 55% 50%` e `background: linear-gradient(135deg, #E8D1AA 0%, #DDBB8C 60%, #C9A574 100%)`.
  - Mobile: bloco menor atrás do mockup, mesma forma orgânica.
- Headline em `.headline-hero`:
  - "Sua clínica perde" → cor `#1D1D24`.
  - "R$23.000/mês" → span com `.gradient-warm` (lavanda→bege).
  - "em silêncio." → `#1D1D24`.
  - Remover italic/serif no hero; outras seções podem manter a regra global (vou tornar a regra global menos agressiva — só aplicar a `em` que tenham classe `.gradient-text` ou em h2/h3 fora do hero).
- Badge: `background: #F1EEFF; border: 1px solid #DED8FF; color: #6F63E8;` + ping lavanda suave.
- CTA primário usa o novo `MagneticButton` (item 5).
- Link "Ver conversa real →" em `#6F63E8`, peso medium, hover underline.
- Mini-cards flutuantes: novos textos visuais nos 4 floats já existentes (mantendo conteúdo: "Confirmado", "3 segundos", "+14 consultas", "Online 24/7"), agora com `bg-white border border-[#EEE7DE] rounded-2xl shadow-[0_14px_30px_rgba(70,55,35,0.10)]`. Adicionar ponto colorido por categoria (lavanda/ciano/mint/dourado).
- Mockup do WhatsApp: container branco com `border-[#EEE7DE]`, header com `linear-gradient(135deg, #8A7CF6, #6EA8FF)` (menos saturado), bolha paciente `#E7F8EF`/texto `#0F3D2E`, bolha IA `#F0F4FF`/texto `#1D1D24`, dot online `#45D89B`.

## 5. Botão primário pill com seta circular (`MagneticButton.tsx`)

Reformular variant `primary`:

```
border-radius: 9999px;
background: linear-gradient(135deg, #8A7CF6, #7C6FE8);
color: white;
padding: 8px 8px 8px 24px;
display: inline-flex; align-items: center; gap: 12px;
box-shadow: 0 16px 34px rgba(138,124,246,0.28);
```

Slot interno automático: um `<span>` circular branco 36×36 com ícone seta (`ArrowRight` de `lucide-react`) cor `#6F63E8`, à direita do texto. Hover: `translateY(-2px)` + sombra mais forte; o círculo branco gira 8°.

Variant `ghost`: mantém branco com borda `#E9E0D6`, texto `#6F63E8`, hover `bg-[#F7F3EE]`.

## 6. Cards e seções abaixo

Aplicar via `.card-base` (já cobre Problems, Solutions, Method, HowItWorks, LossCalculator, SocialProof, Visualization, FinalCTA):
- Borda `#EEE7DE`, sombra quente `0 18px 44px rgba(70,55,35,0.08)`.
- Substituir fundos `bg-[#EEF3FF]` das seções alternadas por `bg-[#F7F3EE]` (Solutions, LossCalculator).
- Ícones em círculos `#F1EEFF` (lavanda), `#EAF6FB` (ciano), `#FFF1D9` (areia), `#E7F8EF` (mint) — diversificar conforme contexto.
- Eyebrows em `#6F63E8`.
- Textos secundários em `#6F7280`.
- LossCalculator: slider track preenchido com `linear-gradient(90deg,#8A7CF6,#22BFEA)`, thumb `#8A7CF6`. Resultado em `.gradient-warm`.
- SocialProof: estrelas `#D4A76A`. Avatar com `linear-gradient(135deg,#8A7CF6,#22BFEA)`.
- FinalCTA: bloco de garantia mantém mint (`#ECFDF5/#BCEFD6/#0F3D2E`) — combina bem com o tema quente.
- Visualization: card "Sem automação" borda coral suave `rgba(239,111,122,0.25)`; "Com Secretária" borda mint `#BCEFD6` (já está bom, só ajustar sombra para quente).

## 7. Formulário (`LeadForm.tsx`)

- Card externo: `background:#FFFFFF; border:1px solid #E9E0D6; box-shadow: 0 24px 60px rgba(70,55,35,0.10);`.
- Inputs: `bg-[#FBFAF7] border-[#E9E0D6]`, focus `border-[#8A7CF6]` + ring `rgba(138,124,246,0.18)`.
- Opções do quiz:
  - default: `bg-[#F8F5F0] border-[#EEE7DE] text-[#1D1D24]/85 hover:bg-[#F1EDE5]`
  - selected: `bg-[#F0EEFF] border-[#8A7CF6] text-[#1D1D24]`
- Progress bar: `linear-gradient(90deg, #8A7CF6, #22BFEA)`, track `#F1EDE5`.
- Botão de submit reusa a nova pill primária.

## 8. Header (`Header.tsx`)

- Quando scroll=0: transparente sobre areia.
- Quando scrolled: `bg-[rgba(255,253,252,0.85)] backdrop-blur border-b border-[#EEE7DE]`.
- Logo: trocar wrapper azul por wrapper areia `bg-[#F7F3EE] border-[#EEE7DE]`.
- Links: `text-[#6F7280] hover:text-[#6F63E8]`.
- CTA: pill primária do design system (texto+círculo seta), versão compacta para o header (sem círculo, ou círculo menor).

## 9. Footer e elementos globais

- `Footer.tsx`: background `#FFFDFC`, border-top `#EEE7DE`.
- `ScrollProgress.tsx`: gradiente `#8A7CF6 → #22BFEA` (mantém).
- `CustomCursor.tsx`: anel `#8A7CF6/40`, dot `#8A7CF6`.
- `FloatingWhatsApp.tsx`: sombra quente `0 14px 32px rgba(70,55,35,0.20)`, posição `bottom-4 right-4` no mobile.

## 10. Mobile

- `.page-canvas` margem 12-14px, radius 22px.
- Hero mobile: copy → mockup com curva bege orgânica menor atrás → CTA full-width pill.
- Mini-cards do hero só aparecem no md+ (manter `hidden md:block`).
- Seções: padding lateral 16px, cards com sombra quente sutil.

## 11. Headline rule (`index.css`)

Tornar a regra global `h1 em…h6 em` menos invasiva — aplicar gradiente apenas quando o `<em>` tiver classe explícita. Atualizar componentes existentes (Problems, Solutions, Method, etc.) que dependem de `<em>` para gradient: adicionar `class="gradient-text not-italic font-bold"` onde necessário, ou manter a regra para h2/h3 (não h1). Decisão: manter regra global em h2-h6 com estilo serifado-italic existente (combina com a estética editorial das seções) e **só desativar no hero** via classe `.headline-hero em { font-family: inherit; font-style: normal; }` + gradient warm específico via span.

## QA

- Verificar mobile 390x844 e desktop 1280+.
- Checar contraste AA dos textos sobre areia/branco.
- Confirmar nenhuma mudança em copy, ordem de seções, validação do form, webhook, redirect e Meta Pixel.

## Arquivos a editar

- `index.html` (import Manrope)
- `tailwind.config.ts` (font family)
- `src/index.css` (tokens, utilities, canvas, headline)
- `src/pages/Index.tsx` (page canvas wrapper)
- `src/components/landing/Hero.tsx` (curva bege, headline nova, mini-cards)
- `src/components/landing/Header.tsx`
- `src/components/landing/Footer.tsx`
- `src/components/landing/Solutions.tsx` (bg areia)
- `src/components/landing/Problems.tsx`
- `src/components/landing/Method.tsx`
- `src/components/landing/HowItWorks.tsx`
- `src/components/landing/LossCalculator.tsx` (bg areia + slider)
- `src/components/landing/SocialProof.tsx`
- `src/components/landing/Visualization.tsx`
- `src/components/landing/FinalCTA.tsx`
- `src/components/landing/FAQ.tsx`
- `src/components/landing/LeadForm.tsx`
- `src/components/ui/MagneticButton.tsx` (pill + círculo seta)
- `src/components/ui/Eyebrow.tsx`
- `src/components/global/ScrollProgress.tsx`
- `src/components/global/CustomCursor.tsx`
- `src/components/global/FloatingWhatsApp.tsx`
- `mem://index.md` (atualizar paleta)

# Plano: Refresh "Nextly-like" + foto no hero + mais contraste + faxina de textos

## 1. Hero: foto como background semi-transparente

`src/components/landing/Hero.tsx`:
- Subir a foto da médica via `lovable-assets create --file /mnt/user-uploads/ChatGPT_Image_11_de_jun._de_2026_10_41_24.png --filename hero-bg-doctor.png` → `src/assets/hero-bg-doctor.png.asset.json`.
- Como o lado direito já tem o mockup do WhatsApp (e a foto também é WhatsApp + médica), **substituir o mockup pela foto em destaque** no lado direito do hero — fica redundante manter os dois. O painel/balõezinhos atuais saem.
- Adicionar a foto como **camada de fundo da seção inteira** com `opacity: 0.18` + `mix-blend-mode: multiply`, ancorada à direita, `object-position: right center`, mascarada por gradiente `linear-gradient(90deg, #F9FAFB 35%, transparent 75%)` para o texto à esquerda manter contraste total.
- Atrás disso: faixa diagonal verde-água claro (`#D6F3EE` → `#FFFFFF`) trazendo a "presença" de cor que falta hoje.

## 2. Mais contraste — paleta e seções

`src/index.css` + componentes:
- Body deixa de ser `#F9FAFB` puro. Alternar bandas:
  - Hero: gradiente `#ECFBF7` → `#FFFFFF`
  - Problems: `#0F1F2C` (cinza-escuro/navy) com texto branco — vira a "âncora de dor"
  - Solutions / HowItWorks: `#FFFFFF`
  - Method / Visualization: `#D6F3EE` suave
  - LossCalculator: `#0F1F2C` escuro
  - Guarantee: `#0FB5A3` cheio (verde-água sólido, texto branco)
  - FAQ: `#FFFFFF`
  - LeadForm: já é escuro, mantém
- Aumentar peso das bordas dos cards de `#E5E7EB` para `#D1D5DB` e sombra para `0 24px 50px rgba(15,23,42,0.10)`.
- Botões: o primário continua gradient (verde→escuro). Adicionar variante "solid Nextly" — pill verde-água cheia sem o círculo+seta, usada no Header e como CTA secundário em algumas seções, para se parecer mais com o "Get Started" do Nextly.

## 3. Tipografia mais "Nextly"

- O hero do Nextly usa **sans bold gigante sem itálico**. Manter Manrope 800, mas **retirar o `<em>` italic gradient** da headline do hero — vira "Sua clínica perde **R$23.000/mês** em silêncio." com o valor em verde-água sólido, sem itálico Cormorant.
- H2 de seções continua com Cormorant italic (assinatura editorial do projeto). Sem mexer em fontes.

## 4. Faxina de microtexto (os três alvos das setas + extensão ao resto do site)

Remover/consolidar todos os mono uppercase decorativos:

| Arquivo | Linha | Texto | Ação |
|---|---|---|---|
| Hero.tsx | 86–101 | eyebrow "IA conversacional…" | **Remover** |
| Hero.tsx | 128–130 | "Implementação em poucos dias · Sem trocar…" | **Remover** |
| Hero.tsx | 226–232 | "Respondido em 3 segundos…" (abaixo do mockup) | **Remover** (a foto substitui o mockup) |
| Hero.tsx | 195 / 214 | mono dentro do mockup | sai junto com o mockup |
| Problems.tsx | 111 | mono inferior | **Remover** |
| RealConversations.tsx | 105, 147, 155 | tags mono + mono final | **Remover** os 3 |
| Footer.tsx | 17, 34 | duas linhas mono | colapsar em **uma só** linha sans 13px |
| Visualization.tsx | 98 | mono "16A875" inferior | **Remover** |
| LeadForm.tsx | 176 | mono branco abaixo do botão | **Remover** |
| SocialProof.tsx | 82 | mono "cargo" | trocar por sans 12px regular |

Mantidos (servem de label funcional, não decorativo):
- `Eyebrow.tsx` (componente de section title — só remover instâncias caso fiquem órfãs).
- `Method.tsx` numeração dos passos.
- `LossCalculator.tsx` labels do slider.
- `LeadForm.tsx` labels dos inputs (linha 205).
- `HowItWorks.tsx` timestamps do chat.

## 5. Header alinhado ao Nextly

- Já está com o logo grande (h-20/h-28). Trocar o CTA "Quero testar" para um botão **sólido** (`bg-[#0FB5A3]` sem gradient, sem shadow exagerado) com label "Começar agora", igual ao "Get Started" do Nextly.

## Arquivos editados

`src/assets/hero-bg-doctor.png.asset.json` (novo), `src/index.css`, `src/components/landing/Hero.tsx`, `Problems.tsx`, `Solutions.tsx`, `HowItWorks.tsx`, `Method.tsx`, `Visualization.tsx`, `LossCalculator.tsx`, `RealConversations.tsx`, `Guarantee.tsx`, `LeadForm.tsx`, `SocialProof.tsx`, `Footer.tsx`, `Header.tsx`.

## Fora do escopo

- Não troco fontes do projeto (Manrope + Cormorant ficam).
- Não mexo em FAQ, FloatingWhatsApp, AIObjections — já estão limpos.
- Não removo o gradient warm dos `<em>` em H2/H3 (assinatura do projeto, só sai do H1 do hero).

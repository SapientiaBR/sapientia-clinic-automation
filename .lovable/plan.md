# Plano: Rebrand + Identidade Visual + Confiança

## 1. Nova paleta (substitui areia/lavanda/bege)

Tokens em `src/index.css` e `tailwind.config.ts`:

- **Verde-água principal** `#0FB5A3` (CTAs, links, destaques)
- **Verde-água escuro** `#0A8C7E` (hover, gradiente)
- **Verde-água claro** `#D6F3EE` (badges, fundos suaves)
- **Cinza escuro / tech** `#1F2937` (texto principal, cards escuros)
- **Cinza médio** `#4B5563` (texto secundário)
- **Cinza linha** `#E5E7EB` (bordas)
- **Branco** `#FFFFFF` (fundo de seção) + **Off-white** `#F9FAFB` (body)
- Gradientes: `linear-gradient(135deg, #0FB5A3 → #0A8C7E)` para CTA; `linear-gradient(135deg, #0FB5A3 → #1F2937)` para destaques de headline.

Refatorar todas as ocorrências hardcoded de `#8A7CF6`, `#6F63E8`, `#22BFEA`, `#D4A76A`, `#ECE5DB`, `#FFFDFC`, `#EEE7DE`, `#1A1726`, `#1D1D24` etc. nos componentes da landing para os novos tokens. Atualizar `.gradient-brand`, `.gradient-warm`, `.gradient-hero-value`, `.blob-beige`, `card-base`, `.eyebrow`, sombras (de quentes para neutras), `h2 em` (gradiente warm → verde-água→cinza).

## 2. Tipografia hierárquica

Manter Manrope (display sans) + DM Sans (body), Cormorant para `<em>` italic (mas com novo gradiente verde→cinza). Padronizar escala:

- H1 hero: `clamp(2.5rem, 6vw, 4.5rem)` / Manrope 800 / -0.04em
- H2 seção: `clamp(2rem, 4vw, 3rem)` / Manrope 700
- H3 card: `1.25rem` / Manrope 600
- Body: `1rem` / DM Sans 400 / line-height 1.65
- Eyebrow: `0.7rem` / JetBrains Mono / uppercase / verde-água escuro
- Micro: `0.75rem` / DM Sans 500

Aplicar consistentemente em Hero, Problems, Solutions, HowItWorks, RealConversations, FAQ, FinalCTA, LeadForm.

## 3. Logo

Aguardando reenvio do arquivo. Quando chegar:
- Subir via `lovable-assets` em `src/assets/logo-secretaria.{ext}.asset.json`
- Substituir no `Header.tsx` e em qualquer outra referência ao logo atual
- Manter `logo-sapientia.png` no footer (logo do grupo)

## 4. Ícones custom

Set coeso de ícones lineares usando **Lucide** com estilo unificado: `strokeWidth={1.5}`, tamanho `28`, cor `#0FB5A3` dentro de chip circular `#D6F3EE` (48×48, rounded-full). Aplicar em:

- **Problems**: AlertCircle, PhoneMissed, Clock, TrendingDown
- **Solutions / HowItWorks**: MessageCircle, CalendarCheck, Bell, Headphones
- **Garantia/badges**: ShieldCheck, Lock, Sparkles

Criar componente `src/components/ui/IconChip.tsx` reutilizável para garantir consistência.

## 5. Garantia (nova seção)

Componente novo `src/components/landing/Guarantee.tsx`, posicionado logo antes do `LeadForm`:

- Eyebrow: `// garantia`
- H2: "Implementação em 7 dias **ou seu dinheiro de volta**."
- Sub: "Conectamos seu WhatsApp, configuramos sua agenda e treinamos a IA com o tom da sua clínica em até 7 dias úteis. Se não entregarmos no prazo, você não paga o setup."
- Selo ShieldCheck grande, fundo branco, borda verde-água clara.
- Inserir em `Index.tsx` entre `FAQ` e `LeadForm`.

> Observação: a memória bloqueia "sem multa"/"sem fidelidade"; a garantia 7 dias é uma promessa nova e foi confirmada pelo usuário.

## 6. Como funciona — refinar existente

`HowItWorks.tsx` já existe. Atualizar para os 3 passos confirmados:
1. **Conectamos seu WhatsApp** — em até 24h, sem trocar de número.
2. **Configuramos sua agenda** — integramos serviços, horários, convênios e tom.
3. **Sua IA atende sozinha** — agenda, faz follow-up de lembrete e recupera no-show.

Mantém ícones do set custom + linha conectora vertical (mobile) / horizontal (desktop).

## 7. FAQ — acrescentar 3 perguntas

Adicionar no topo de `faqEntries` (FAQ.tsx):
- "Preciso trocar meu número de WhatsApp?" → "Não. Mantemos seu número atual via WhatsApp Business API oficial. Sua equipe continua usando o mesmo número."
- "É seguro? Meus dados ficam onde?" → resposta LGPD já existente (consolidar com a atual).
- "E se a IA não souber responder?" → reaproveitar resposta de "E se a IA responder algo errado?" (consolidar duplicata).

## 8. Segundo CTA no Hero

Em `Hero.tsx`, adicionar botão secundário ao lado do "Demonstração ao vivo, grátis":
- Texto: **"Falar com especialista no WhatsApp"**
- Estilo: ghost/outline verde-água, mesmo tamanho do CTA primário
- Link direto para `https://wa.me/5511920795583`
- Layout: flex-col no mobile (empilhado), flex-row no desktop

## Detalhes técnicos

**Arquivos editados:**
- `src/index.css` (tokens, gradientes, utilitários)
- `tailwind.config.ts` (cores semânticas)
- `src/components/landing/Header.tsx` (logo)
- `src/components/landing/Hero.tsx` (2º CTA, paleta)
- `src/components/landing/Problems.tsx`, `Solutions.tsx`, `HowItWorks.tsx`, `RealConversations.tsx`, `VideoDemo.tsx`, `FAQ.tsx`, `FinalCTA.tsx`, `LeadForm.tsx`, `SocialProof.tsx`, `Method.tsx`, `LossCalculator.tsx`, `PositioningStatement.tsx`, `Visualization.tsx` (paleta + ícones)
- `src/components/global/FloatingWhatsApp.tsx` (cor)
- `src/components/landing/Footer.tsx` (gradiente do ponto)

**Arquivos novos:**
- `src/components/ui/IconChip.tsx`
- `src/components/landing/Guarantee.tsx`
- `src/pages/Index.tsx` (inserir `<Guarantee />`)

**Memória:** atualizar `mem://style/branding` e o index Core com a nova paleta verde-água/cinza/branco.

## Fora deste plano

- Não vou implementar a troca de logo até receber o arquivo (sigo com placeholder do logo atual).
- Mantenho copy/posicionamento das demais seções inalterados, exceto onde citado acima.

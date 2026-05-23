# Plano: Otimização mobile-first + copy comercial

Foco: encurtar a primeira dobra no mobile, levar o diagnóstico para perto do Hero, alinhar todos os CTAs em "Quero recuperar pacientes", simplificar a calculadora, adicionar garantia e CTA final consistente. Design dark/roxo/ciano e tipografia editorial são preservados.

---

## 1. Ordem das seções (`src/pages/Index.tsx`)

Nova ordem mobile (mesma desktop, com `HowItWorks`/`Visualization` continuando ocultos no mobile):

```
Header
Hero (encurtado)
LeadForm  ← diagnóstico sobe pra logo após o hero
PositioningStatement (vira "ponte" curta, sem aside extra)
Problems
HowItWorks / Visualization (apenas desktop)
Solutions
Method
LossCalculator (simplificada)
SocialProof
FAQ (compact no mobile)
Garantia (nova mini-seção inline em FinalCTA)
FinalCTA
Footer
```

- Remover o `<aside>` "de onde vem esse número?" do Index — o conteúdo agora vive na própria calculadora.
- `PositioningStatement` permanece, mas com padding mobile menor.

## 2. Hero (`src/components/landing/Hero.tsx`)

- Headline mantida: "Sua clínica perde R$23.000/mês em silêncio."
- Subheadline (nova, com variantes):
  - Desktop: "Pacientes sem resposta fora do horário escolhem outra clínica. A Secretária Invisível responde, qualifica e agenda pelo WhatsApp, mesmo quando sua equipe não está disponível."
  - Mobile: "Pacientes sem resposta fora do horário escolhem outra clínica. A Secretária Invisível responde, qualifica e agenda pelo WhatsApp."
- CTA primário: **"Quero recuperar pacientes"** (substitui "Quero parar de perder pacientes").
- CTA secundário desktop: "Ver conversa real →" (já existe).
- Link secundário mobile: mantém "Ver conversa real →".
- Mobile: remover o badge longo, encurtar para "IA 24/7 para clínicas" (já tem). Reduzir `pt-28 pb-16` → `pt-20 pb-10` no mobile. Reduzir gap entre headline/subheadline/CTA (`mt-6` → `mt-4`, `mb-10` → `mb-6`).
- Remover/ocultar no mobile a linha "Respondido em 3 segundos. Sua secretária levaria 47 minutos." (mantém desktop) — encurta a primeira dobra.
- Mockup do WhatsApp permanece, mas com `min-h` reduzido no mobile e `mt-8` para separar da coluna de texto.

## 3. LeadForm (`src/components/landing/LeadForm.tsx`)

- Eyebrow: "// diagnóstico gratuito" (mantém).
- Título: **"Veja quanto sua clínica está perdendo no WhatsApp"**.
- Subtítulo: **"Diagnóstico gratuito. Sem compromisso. 3 perguntas."** (já é assim — mantém).
- Mobile compactação:
  - `section-padding` → `py-14 md:section-padding`.
  - `mb-10` no header → `mb-6 md:mb-10`.
  - Card padding `p-6 sm:p-10` → `p-5 sm:p-10`.
  - Opções (`Option`): `min-h-[56px]` → `min-h-[48px] md:min-h-[56px]`, `text-[14px]` → `text-[13px] md:text-[14px]`.
  - Título de cada step: `text-[22px]` → `text-[18px] md:text-[22px]`, `mb-6` → `mb-4 md:mb-6`.

## 4. Copy mais direta — substituições

- `Hero` subheadline: ver §2.
- `PositioningStatement`: encurtar no mobile via `<span className="md:hidden">…</span>` para:
  > "Pacientes sem resposta escolhem outra clínica. A Secretária Invisível responde, qualifica e agenda pelo WhatsApp 24/7."
  Desktop mantém a versão atual.
- `Problems`: títulos dos 3 cards revisados para linguagem direta (agenda com buracos, secretária sobrecarregada, faltas sem confirmação, pacientes perdidos). Manter números/labels, ajustar 1–2 frases curtas onde houver "conceito" demais.
- `Solutions` / `Method`: trocar 2–3 microcopies conceituais por foco em "pacientes perdidos / dinheiro deixado na mesa / WhatsApp sem resposta". Sem reestruturar layouts.

## 5. Calculadora (`src/components/landing/LossCalculator.tsx`)

- Título: **"Quanto sua clínica está deixando na mesa?"** (já está — manter).
- Campos: "Atendimentos por semana" e "Ticket médio por consulta" (já existem) — manter labels exatas pedidas.
- Bloco azul de estudo (54%/30%): **mover para um `<details>` discreto** ou colapsar no mobile (apenas 1 linha visível: "Cálculo conservador (30% de perda) baseado em benchmarks."). Desktop mantém o bloco completo.
- Resultado label: "Você está deixando na mesa todo mês:" (mantém).
- CTA: **"Quero recuperar esse valor"** (sem `→` separado por quebra) — implementar como `<span className="whitespace-nowrap">Quero recuperar esse valor →</span>` dentro do `MagneticButton`, garantindo que o `→` não vá para outra linha.
- Mobile: reduzir card `p-8 sm:p-12` → `p-6 sm:p-12`, número resultado `text-[56px]` → `text-[44px] sm:text-[72px]`, `section-padding` → `py-14 md:section-padding`.

## 6. SocialProof, FAQ, Garantia, FinalCTA

- **SocialProof** (`SocialProof.tsx`): mantém estrutura mas no mobile reduz padding e tamanho da `blockquote` (`text-[19px]` → `text-[16px] md:text-[19px]`, `leading-[1.82]` → `leading-[1.7]`).
- **FAQ**: já usa `compact` no mobile — manter.
- **Garantia (nova)**: bloco enxuto inserido no topo do `FinalCTA.tsx` (mesmo componente, sem nova rota), 1 card escuro com:
  - eyebrow `// garantia`
  - linha: "Acompanhamos sua clínica de perto nas primeiras semanas. Se não houver redução de faltas e mais agendamentos, ajustamos sem custo adicional."
  - 3 mini-itens: "Implementação em ~5 dias", "Sem trocar seu WhatsApp", "Cancelamento simples (30 dias)".
- **FinalCTA**:
  - Headline mantida.
  - CTA: **"Quero recuperar pacientes"** (substitui "Receber meu diagnóstico gratuito →") — `whitespace-nowrap` na seta.

## 7. Preservar design

Sem alterações em `index.css` ou `tailwind.config.ts`. Continua tema dark, gradientes roxo/ciano, fonte editorial, nome "Secretária Invisível", estética de infraestrutura. Nada de mudanças em mockup/cards de prova além das compactações de tamanho.

---

## Detalhes técnicos

- **Arquivos editados**:
  - `src/pages/Index.tsx` — reordenar (`LeadForm` direto após `Hero`, remover `<aside>`).
  - `src/components/landing/Hero.tsx` — copy CTA, subheadline com variantes mobile/desktop, paddings mobile.
  - `src/components/landing/LeadForm.tsx` — título/sub, compactação mobile.
  - `src/components/landing/LossCalculator.tsx` — colapsar bloco-estudo no mobile, CTA com `whitespace-nowrap`, paddings.
  - `src/components/landing/PositioningStatement.tsx` — variante mobile curta, padding menor.
  - `src/components/landing/Problems.tsx` — micro-copy direta (sem mudar layout).
  - `src/components/landing/SocialProof.tsx` — compactação mobile.
  - `src/components/landing/FinalCTA.tsx` — adicionar bloco de garantia, novo CTA, `whitespace-nowrap`.
- **Sem alterações em**: animações GSAP base, design tokens, lógica do webhook, rotas, FAQ JSON-LD.
- **Acessibilidade**: manter `aria-expanded` no FAQ, contraste preservado pelas variáveis HSL existentes.
- **Risco**: nenhum risco de regressão de build — só JSX/Tailwind/copy.

## Fora de escopo

- Não vou tocar em Header, Footer, Solutions/Method/HowItWorks/Visualization além das microcopies de §4.
- Não vou introduzir nova rota ou seção "Garantia" separada — fica embutida no `FinalCTA`.
- Não vou alterar o backend/webhook nem o `/obrigado`.

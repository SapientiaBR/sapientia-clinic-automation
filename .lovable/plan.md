# Plano: Hero Mobile Enxuto

Aplicar variações **só em mobile** (`< 768px`) usando classes responsivas do Tailwind — desktop continua igual.

## 1. Badge (`Hero.tsx`)

Texto condicional via spans com `hidden md:inline` / `md:hidden`:
- **Mobile:** `IA 24/7 para clínicas`
- **Desktop:** `✦ IA conversacional para clínicas — feita por médicos, com a Sapient.ia`

## 2. Headline
Sem mudança.

## 3. Bloco abaixo da headline

Reorganizar usando classes responsivas, **sem duplicar markup desnecessário**:

- **Microtexto da estimativa** (`<a href="#calculadora">`): adicionar `hidden md:block` → some no mobile.
- **"Um produto Sapient.IA"**: adicionar `hidden md:block` → some no mobile.
- **Subtítulo** (parágrafo principal): trocar o texto por uma versão única que funciona nos dois:
  > "A Secretária Invisível responde pacientes no WhatsApp, agenda consultas e confirma presença — mesmo fora do horário comercial."
  
  (Versão atual mais longa fica como fallback desktop não é necessária; essa frase mais curta já está alinhada com o tom e funciona bem nos dois breakpoints.)

## 4. CTAs

- **Botão primário** "Quero parar de perder pacientes": sempre visível.
- **Botão "Ver uma conversa real →"**: 
  - No mobile, transformar em **link pequeno** abaixo do botão principal (não um segundo botão grande).
  - No desktop, manter como `MagneticButton ghost` lado a lado.
  
  Implementação: dois elementos — `<MagneticButton variant="ghost" className="hidden md:inline-flex">` para desktop e um `<a class="md:hidden text-sm text-cyan-300/80 underline-offset-4 hover:underline">Ver conversa real →</a>` para mobile.

## 5. Linha final (mono)

Trocar texto e simplificar:
- **Mobile:** `Sem trocar seu WhatsApp. Sem app novo.`
- **Desktop:** `Implementação em poucos dias · Sem trocar seu WhatsApp · Sem app novo para o paciente`

Usar dois `<span>` com `hidden md:inline` / `md:hidden` dentro do mesmo `<p>`.

## 6. "De onde vem esse número?" (mobile-only)

Como a explicação da estimativa some do Hero no mobile, **criar bloco discreto logo após o LeadForm e antes da seção Problems**, visível **apenas no mobile** (`md:hidden`):

- Pequeno card centralizado em `card-base p-5`
- Eyebrow: `// de onde vem esse número?`
- Texto: "Estimativa baseada em atendimentos semanais, ticket médio e taxa conservadora de perda por demora no atendimento."
- Link âncora: `Calcule a sua →` apontando para `#calculadora`.

Pode ser inline em `Index.tsx` ou um pequeno componente `EstimateNote.tsx`. Vou preferir inline para não criar arquivo a mais.

## Fora de escopo
- Sem mudanças no desktop além das já listadas (badge, subtítulo unificado, linha final).
- Sem mexer em animações GSAP — os elementos já existentes mantêm seus `data-` attributes.
- Sem mexer em Problems, Solutions, Method, Calculadora etc.

## Arquivos afetados
- `src/components/landing/Hero.tsx` (edit)
- `src/pages/Index.tsx` (inserir bloco mobile-only "De onde vem esse número?")

# Sapient.IA — Brand System v2.0

> Abril 2026 · [sapientiabr.cloud](https://sapientiabr.cloud)

---

## 01 · Paleta de cores

### Purple — Primária / CTAs

| Stop | Hex | Uso |
|------|---------|-----|
| 50 | `#f0eaff` | Backgrounds claros, hover states |
| 100 | `#ddd0ff` | Fills sutis |
| 200 | `#c4adff` | Badges, tags |
| 300 | `#a78bfa` | Gradient text (início), ícones light |
| 400 | `#8b5cf6` | Links hover, bordas ativas |
| 500 | `#7c3aed` | **Cor primária — CTAs, botões, logo** |
| 600 | `#6d28d9` | CTA hover |
| 700 | `#5b21b6` | Pressed states |
| 800 | `#4c1d95` | Texto em fundo purple claro |
| 900 | `#3b0f7a` | Texto em fundo purple claro (max contraste) |

### Cyan — Secundária / Links / Info

| Stop | Hex | Uso |
|------|---------|-----|
| 50 | `#e8fffe` | Backgrounds info |
| 100 | `#b8fdf8` | Fills sutis |
| 200 | `#7df8ef` | Highlights leves |
| 300 | `#4debff` | **Neon cyan — highlights, links, gradient text (final)** |
| 400 | `#22d3ee` | Ícones, badges, section numbers |
| 500 | `#06b6d4` | **Cyan padrão — gradient brand (final), ícones info** |
| 600 | `#0891b2` | Texto em fundo cyan claro |
| 700 | `#0e7490` | Bordas ativas |
| 800 | `#155e75` | Texto max contraste |
| 900 | `#134e5e` | Deep accents |

### Neutrals (navy base)

| Token | Hex | Uso |
|-------|---------|-----|
| text | `#e8ecf4` | Texto primário |
| muted | `#94a3b8` | Texto secundário, descrições |
| dim | `#64748b` | Texto terciário, placeholders |
| hint | `#475569` | Hints, labels mínimos |
| elevated | `#1f2e4a` | Superfícies elevadas |
| card | `#1a2540` | Background de cards |
| surface | `#162032` | Superfícies alternadas |
| bg-secondary | `#111827` | Background seções alternadas |
| bg-primary | `#0c1222` | Background principal |
| deep | `#080d1a` | Background absoluto (body) |

### Semânticas

| Nome | Hex | Uso |
|------|---------|-----|
| Success | `#10b981` | Confirmações, status ativo |
| Warning | `#f59e0b` | Alertas, atenção |
| Danger | `#ef4444` | Erros, remoções |

### Accent palette — bordas de cards e destaques por categoria

Usadas como `border-top: 3px solid` em cards de features/problemas. Cada card recebe uma cor diferente. Títulos dos cards usam a mesma cor da borda.

| Nome | Hex | Exemplo de uso |
|------|---------|----------------|
| Coral | `#f87171` | "Processos lentos" |
| Rose | `#fb7185` | "Atendimento ineficiente" |
| Pink | `#f472b6` | "Baixa produtividade" |
| Amber | `#fbbf24` | "Custo elevado" |
| Lime | `#a3e635` | "Custo elevado" (alt) |
| Emerald | `#34d399` | "Produtividade" |
| Sky | `#38bdf8` | "Gestão desorganizada" |
| Indigo | `#818cf8` | "Falta de leads" |

---

## 02 · Gradientes

### Gradient brand (CTAs, botões, logo)

```css
background: linear-gradient(135deg, #7c3aed, #06b6d4);
```

### Gradient brand hover

```css
background: linear-gradient(135deg, #8b5cf6, #22d3ee);
```

### Gradient text (itálicos de heading)

```css
background: linear-gradient(135deg, #a78bfa, #4debff);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Gradient sutil (backgrounds de seção)

```css
background: linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.12));
```

### Radial hero glow (halo atrás do logo)

```css
background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.15), rgba(6,182,212,0.08) 50%, transparent 80%);
```

### Card top glow (fade vertical em cards de feature)

```css
background: linear-gradient(180deg, rgba(124,58,237,0.15) 0%, transparent 40%);
```

---

## 03 · Tipografia

### Fontes

| Função | Fonte | Peso | Uso |
|--------|-------|------|-----|
| Display | **Sora** | 400, 500, 600, 700 | Headings, CTAs, nav, logotipo |
| Body | **DM Sans** | 400, 500, 600 (+ italic) | Corpo, parágrafos, UI labels |
| Mono | **JetBrains Mono** | 400, 500 | Código, dados, tokens, badges |

### Escala tipográfica

| Nível | Tamanho | Peso | Letter-spacing | Exemplo |
|-------|---------|------|----------------|---------|
| hero | 3rem (48px) | 700 | -3% | "Sapient.IA" |
| h1 | 2.25rem (36px) | 700 | -2% | "Nossas soluções" |
| h2 | 1.5rem (24px) | 600 | -1% | "Atendimento 24/7" |
| h3 | 1.25rem (20px) | 600 | 0 | "CRM inteligente" |
| body | 1rem (16px) | 400 | 0 | Texto corrido |
| small | 0.875rem (14px) | 400 | 0 | "Prazo: 3-4 semanas" |
| caption | 0.75rem (12px) | mono 500 | 0 | "NoctuaBot™ v2.1" |

### Padrão de destaque — itálico + gradiente (ASSINATURA DA MARCA)

Em cada heading principal, exatamente **uma palavra** (ou número) recebe `font-style: italic` + `background: gradient-text` + `-webkit-background-clip: text`. Sempre a palavra que carrega a ação ou o benefício principal. Nunca mais de uma por heading.

Exemplos:

- *Automatize* Seu Negócio com IA
- Problemas que *Resolvemos*
- Atendimento *24/7* com IA Personalizada
- Nossas *Soluções* de Automação

```css
h1 em, h2 em {
  font-style: italic;
  background: linear-gradient(135deg, #a78bfa, #4debff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 04 · Espaçamento

### Escala (base 4px)

| Token | Valor | Uso |
|-------|-------|-----|
| xs | 4px | Gaps mínimos internos |
| sm | 8px | Gap entre ícone e label |
| md | 12px | Padding interno de badges |
| lg | 16px | Gap entre elementos de card |
| xl | 24px | Padding de cards, gap entre cards |
| 2xl | 32px | Margem entre seções menores |
| 3xl | 48px | Margem entre seções |
| 4xl | 64px | Margem entre blocos principais |

### Border radius

| Token | Valor | Uso |
|-------|-------|-----|
| xs | 4px | Badges inline, code |
| sm | 6px | Chips, tags |
| md | 8px | Botões, inputs |
| lg | 12px | Cards, containers (padrão) |
| xl | 16px | Cards de feature, hero elements |
| 2xl | 20px | Hero cards, modais |
| pill | 100px | Botão CTA "Teste Grátis", badges |

### Bordas

| Token | Valor | Uso |
|-------|-------|-----|
| subtle | `rgba(148,163,184, 0.08)` | Divisores, separadores |
| default | `rgba(148,163,184, 0.12)` | Bordas de cards e containers |
| hover | `rgba(148,163,184, 0.20)` | Bordas em hover |
| glow-purple | `rgba(139,92,246, 0.30)` | Borda com glow purple |
| glow-cyan | `rgba(34,211,238, 0.30)` | Borda com glow cyan |

---

## 05 · Componentes base

### Botões

**Brand (primário):** `background: gradient-vibrant`, texto branco, border-radius md (8px), font Sora 600. Gradiente de Rose Profundo (#e11d48) para Orange (#ea580c). Melhor contraste para legibilidade.

**Brand (secundário):** `background: gradient-brand`, texto branco, border-radius md (8px), font Sora 600. Gradiente de Purple para Cyan. Usado em ícones e elementos decorativos.

**Outline (secundário):** `background: transparent`, borda `border-hover`, texto primary. Hover: borda purple-500, bg rgba purple 6%

**Ghost:** sem background, sem borda, texto purple-300. Hover: bg rgba purple 8%

### Glassmorphism (cards de destaque / Otus)

```css
.glass {
  background: rgba(148,163,184, 0.04);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(148,163,184, 0.08);
  border-radius: 16px; /* xl */
}
```

Usado na seção Otus, hero features, e cards premium. Pode incluir circles concêntricos decorativos e conic-gradient rotativo sutil como background decorativo.

### Cards de feature/problema

```css
.feature-card {
  background: var(--bg-card); /* #1a2540 */
  border: 1px solid rgba(148,163,184, 0.12);
  border-radius: 12px;
  border-top: 3px solid var(--accent-color); /* cor do accent palette */
  padding: 1.25rem;
}

.feature-card .title {
  color: var(--accent-color); /* mesma cor da borda */
  font-family: 'Sora', sans-serif;
  font-weight: 600;
}
```

---

## 06 · Regras de uso

### FAÇA

- Use **itálico + gradient text** na palavra de destaque de cada heading — é a assinatura visual mais forte da Sapient.IA
- Backgrounds **deep navy** (#080d1a a #111827) — a marca vive em navy com nuance azul, nunca preto puro
- Cards com `border-top: 3px solid accent-color` e título na mesma cor — cada card usa um accent diferente do ring
- **Glassmorphism sutil** em cards de destaque (Otus, features premium) — blur 20-24px, borda rgba branca 8%, circles decorativos
- Logo da coruja sempre com **gradient purple→cyan** — nunca monocromático em cor sólida (exceto versão branca em fundos claros)

### EVITE

- Itálico em mais de uma palavra por heading, ou itálico no body text — 1 heading = 1 palavra em itálico gradient
- Backgrounds `#000000` ou cinza neutro (`#1a1a1a`) — a base é sempre navy. Preto puro é frio demais
- Cards todos da mesma cor — a variedade de accents (coral, lime, indigo, sky) é intencional, cria ritmo visual
- Fontes serifadas, ícones cartoon, ilustrações flat genéricas, ou stock de robôs humanóides — mantém tech, geométrico e abstrato
- Gradient como background de grandes áreas — o gradiente brand é para CTAs, textos de destaque, logo e bordas, nunca como fundo de seção inteira

---

## 07 · Design tokens (CSS variables)

```css
:root {
  /* Backgrounds */
  --bg-deep: #080d1a;
  --bg-primary: #0c1222;
  --bg-secondary: #111827;
  --bg-surface: #162032;
  --bg-card: #1a2540;
  --bg-elevated: #1f2e4a;

  /* Purple ramp */
  --purple-50: #f0eaff;
  --purple-100: #ddd0ff;
  --purple-200: #c4adff;
  --purple-300: #a78bfa;
  --purple-400: #8b5cf6;
  --purple-500: #7c3aed;
  --purple-600: #6d28d9;
  --purple-700: #5b21b6;
  --purple-800: #4c1d95;
  --purple-900: #3b0f7a;

  /* Cyan ramp */
  --cyan-50: #e8fffe;
  --cyan-100: #b8fdf8;
  --cyan-200: #7df8ef;
  --cyan-300: #4debff;
  --cyan-400: #22d3ee;
  --cyan-500: #06b6d4;
  --cyan-600: #0891b2;
  --cyan-700: #0e7490;
  --cyan-800: #155e75;
  --cyan-900: #134e5e;

  /* Accent palette */
  --accent-coral: #f87171;
  --accent-rose: #fb7185;
  --accent-pink: #f472b6;
  --accent-amber: #fbbf24;
  --accent-lime: #a3e635;
  --accent-emerald: #34d399;
  --accent-sky: #38bdf8;
  --accent-indigo: #818cf8;

  /* Text */
  --text-primary: #e8ecf4;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-hint: #475569;

  /* Semantic */
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;

  /* Borders */
  --border-subtle: rgba(148,163,184, 0.08);
  --border-default: rgba(148,163,184, 0.12);
  --border-hover: rgba(148,163,184, 0.20);
  --border-glow-purple: rgba(139,92,246, 0.30);
  --border-glow-cyan: rgba(34,211,238, 0.30);

  /* Gradients */
  --gradient-brand: linear-gradient(135deg, #7c3aed, #06b6d4);
  --gradient-brand-hover: linear-gradient(135deg, #8b5cf6, #22d3ee);
  --gradient-vibrant: linear-gradient(135deg, #e11d48, #ea580c);
  --gradient-vibrant-hover: linear-gradient(135deg, #be123c, #c2410c);
  --gradient-subtle: linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.12));
  --gradient-text: linear-gradient(135deg, #a78bfa, #4debff);
  --gradient-card-purple: linear-gradient(180deg, rgba(124,58,237,0.15) 0%, transparent 40%);
  --gradient-card-cyan: linear-gradient(180deg, rgba(6,182,212,0.15) 0%, transparent 40%);
  --gradient-radial-hero: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.15), rgba(6,182,212,0.08) 50%, transparent 80%);

  /* Typography */
  --font-display: 'Sora', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Radii */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-pill: 100px;
}
```

---

## 08 · Setup — Antigravity / Design System

### Company blurb (copie e cole)

> Sapient.IA: AI automation agency for medical clinics and local businesses in Brazil. We build NoctuaBot™ (intelligent WhatsApp bots), automated scheduling, CRM, and lead capture systems. Self-hosted stack (n8n, Chatwoot, Evolution API). Visual identity: deep navy backgrounds (#0c1222) with purple-to-cyan gradient accents, multi-color card accent borders, italic+gradient keyword emphasis in headings. Mascot: geometric owl with purple→cyan gradient. Target audience: clinic owners and healthcare professionals.

### Notes field (copie e cole)

> Deep navy dark theme (#080d1a to #111827, NOT pure black). Primary gradient: 135deg from #7c3aed (purple) to #06b6d4 (cyan). Neon cyan highlight: #4debff. Display font: Sora (headings, CTAs, nav). Body font: DM Sans (with italic available for heading emphasis). Mono: JetBrains Mono. CRITICAL PATTERN: each section heading has exactly ONE keyword in italic + gradient-text (#a78bfa→#4debff). Cards use colored top borders (3px) from accent palette: coral #f87171, lime #a3e635, indigo #818cf8, sky #38bdf8, rose #fb7185, amber #fbbf24, emerald #34d399, pink #f472b6. Card titles match their border color. Glassmorphism on hero/Otus sections (blur 24px, border rgba white 8%). Rounded corners 12px default, 16-20px hero cards. Borders: rgba(148,163,184,0.12). Text: #e8ecf4 primary, #94a3b8 secondary. Tone: premium, tech-forward, trustworthy. No cartoon, no playful elements. Portuguese BR primary language.

---

*Sapient.IA Brand System v2.0 — Última atualização: Abril 2026*

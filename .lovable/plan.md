

# Botões CTA mais chamativos — Gradiente vermelho-amarelo

## Abordagem

Criar uma nova classe CSS `.cta-button` com um degradê vermelho → laranja → amarelo que contrasta fortemente com a paleta roxo/ciano do site. Atualizar também a animação `pulse-glow` dos CTAs para brilhar em tons quentes.

## Alterações

### 1. `src/index.css` — Nova classe de gradiente para CTAs

Substituir `.gradient-bg-vibrant` por um novo gradiente quente **apenas nos botões CTA**, criando uma classe dedicada `.cta-gradient`:

```css
.cta-gradient {
  background-image: linear-gradient(135deg, hsl(0 85% 55%), hsl(35 95% 55%));
}
```

Gradiente de vermelho vivo → amarelo/laranja. Também ajustar o `pulse-glow` para brilhar em tons quentes (laranja) em vez de ciano.

Manter `.gradient-bg-vibrant` intacta para os elementos decorativos (ícones do HowItWorks, avatar do Founder, cards do Solutions) que devem continuar na paleta do site.

### 2. Arquivos dos CTAs — trocar classe nos botões de ação

Substituir `gradient-bg-vibrant` por `cta-gradient` apenas nos botões/links de CTA:

- **`Hero.tsx`** — botão "Quero acabar com as mensagens não lidas"
- **`Header.tsx`** — botão "Diagnóstico Gratuito" (desktop e mobile)
- **`FinalCTA.tsx`** — botão "Agendar Meu Diagnóstico Gratuito"
- **`LeadForm.tsx`** — botão "Solicitar Diagnóstico Gratuito"
- **`LossCalculator.tsx`** — botão CTA da calculadora
- **`ThankYou.tsx`** — botão WhatsApp

**Não alterar**: HowItWorks (números), Founder (avatar), Solutions (ícones) — esses mantêm `gradient-bg-vibrant`.

### Resultado
Botões CTA em vermelho→amarelo que "saltam" visualmente contra o fundo escuro roxo/ciano, aumentando contraste e chamando atenção para a conversão.


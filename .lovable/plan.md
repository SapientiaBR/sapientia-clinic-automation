

# Ajustes nos Botões do Hero + Novo Testimonial

## 1. Hero — Corrigir botões e remover micro-texto

**Arquivo:** `src/components/landing/Hero.tsx`

- **Botão principal**: reduzir padding de `px-10 py-5` para `px-8 py-3`, manter `rounded-xl` e `text-lg` mas tornar mais elegante e proporcional
- **Botão secundário**: reduzir padding de `px-6 py-4` para `px-6 py-3` para ficar alinhado em altura
- **Remover** o `<span>` com "Resposta em até 2h · Sem compromisso" e o wrapper `flex-col` extra
- Resultado: botões lado a lado, proporcionais, sem texto extra abaixo

## 2. SocialProof — Adicionar segundo testimonial

**Arquivo:** `src/components/landing/SocialProof.tsx`

- Transformar o testimonial único em um grid de 2 colunas (`grid md:grid-cols-2 gap-6`)
- Manter o depoimento do Dr. Ricardo Mendes
- Adicionar novo depoimento da Dra. Mariana Fogarolli com copy refinada:
  - *"Eu tinha um consultório movimentado, mas respondia tudo sozinha — quando sobrava tempo. Muitos pacientes desistiam antes mesmo de eu ver a mensagem. Desde que contratei a Sapient.IA, minha rotina mudou completamente. Agora cada paciente é atendido na hora, e eu finalmente tenho tempo pra focar no que realmente importa: a medicina."*
  - **Dra. Mariana Fogarolli** — Clínica de Ginecologia, Rio de Janeiro

## Detalhes técnicos
- Apenas 2 arquivos alterados
- Sem mudanças em design system, animações ou links


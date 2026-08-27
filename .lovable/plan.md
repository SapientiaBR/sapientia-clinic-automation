# Reconstrução da landing page: da IA que substitui para a recepção que ganha reforço

A página inteira passa a ter a recepcionista como protagonista. A Secretária Invisível é uma segunda funcionária que não aparece, nunca uma substituta. Toda a ordem das seções muda para instalar a dor antes de mostrar o produto.

## Nova ordem das seções

```text
1  Hero                      (reescrito, nova foto)
2  Faixa de reenquadramento  (nova)
3  A cena, 21h17             (nova, linha do tempo)
4  Dinheiro que sua recepção perde sem perceber (substitui Problems)
5  Enquanto, enquanto        (nova, duas colunas)
6  Prova social              (métricas editáveis + carrossel preparado)
7  Como funciona             (4 passos, substitui os 3 atuais)
8  Segurança e dados         (nova)
9  Tudo em um lugar só       (nova)
10 Demonstração ao vivo      (formulário movido para cá + conversas reais)
11 Planos                    (preços intactos, âncora de salário removida)
12 Objeções, FAQ             (8 perguntas novas)
13 Chamada final             (reescrita)
```

Sai da página: a seção de garantia "A gente faz acontecer. Você só aprova." e o bloco de estatísticas 63% / R$2.800 / 34%.

## Copy e regras

- Lista de palavras proibidas aplicada em toda a página, incluindo travessões. Substituídos por vírgula, ponto ou parágrafo.
- "IA" some do H1, do subtítulo da hero e de todos os títulos de seção. Continua permitida em Como funciona, no FAQ e no nome Sapient.IA.
- Nenhuma comparação entre mensalidade e salário, encargo ou custo de pessoa.
- Sem promessa absoluta, sem emoji, frases curtas, tom sóbrio.
- CTA único: "Agendar diagnóstico gratuito", apontando para o formulário de diagnóstico. Única exceção: o botão da demonstração ao vivo, "Quero ver a conversa", que dispara a conversa no WhatsApp.

## Placeholders que não podem ir ao ar com número inventado

- Os quatro valores da seção de dinheiro perdido ficam como constantes vazias no topo do arquivo. Vazio significa card renderizado só com título e descrição, sem o campo de valor. Comentário explícito no código avisando que a seção não vai a produção com placeholder visível.
- As três métricas da prova social e o período de uso seguem a mesma regra: vazio, o bloco de métricas simplesmente não renderiza.
- Notas "[VALIDAR: ...]" ficam visíveis em Segurança e no FAQ de integrações, como pedido.

## Navegação e mobile

- Menu passa a ser: Como funciona, Segurança, Planos, Perguntas. Botão do menu: "Agendar diagnóstico".
- Barra fixa no rodapé em mobile com "Agendar diagnóstico gratuito", substituindo o comportamento do botão flutuante de WhatsApp na landing.
- Corpo de texto sobe para 17px mínimo em todas as seções. Cada seção verificada em viewport de 380px.

## Identidade visual

- Paleta teal atual mantida sem tons novos: #0FB5A3 principal, #0A8C7E escuro e hover, #D6F3EE claro para faixas e cards, #1F2937 grafite, #4B5563 apoio. Proporção 70 neutro, 20 grafite, 10 teal, com no máximo uma faixa teal na página.
- Fontes atuais mantidas: Manrope para títulos e interface, DM Sans para corpo.
- Ícones passam a ser traço fino monocromático em grafite ou teal. Os chips circulares coloridos saem das seções novas.
- Nova foto de hero: recepcionista atendendo uma paciente no balcão, contato visual entre as duas, luz natural, tons neutros, sem nenhum elemento digital sobreposto. A imagem atual da profissional de jaleco olhando o celular é removida. A foto nova é gerada agora e pode ser trocada depois por uma foto real da clínica sem mexer no layout.

## Detalhes técnicos

- Arquivos reescritos: `Hero.tsx`, `Header.tsx`, `HowItWorks.tsx`, `Pricing.tsx`, `FAQ.tsx`, `FinalCTA.tsx`, `SocialProof.tsx`, `RealConversations.tsx`, `LeadForm.tsx`, `Footer.tsx`, `Index.tsx`.
- Arquivos novos: `Reframe.tsx`, `Scene.tsx`, `HiddenCosts.tsx`, `SideBySide.tsx`, `SecurityData.tsx`, `SinglePlace.tsx`, `MobileCtaBar.tsx`.
- Arquivos removidos da página: `Guarantee.tsx` e `Problems.tsx`.
- Preservados sem alteração de comportamento: webhook n8n do formulário, evento Lead do pixel do Meta, stub do fbq no `index.html`, Clarity, redirecionamento para `/obrigado`, favicon e og:image.
- `Index.tsx` mantém o carregamento lazy por seção e o JSON-LD de FAQ, atualizado com as perguntas novas.
- Rodapé ganha a assinatura "Um produto Sapient.IA" em tamanho pequeno.

## Checklist final

Antes de entregar, a página é varrida por busca textual para confirmar: zero ocorrências de substituir fora da pergunta do FAQ, zero travessões, zero "IA" em H1, subtítulo da hero e títulos de seção, zero comparação com salário, e todos os botões apontando para o mesmo destino exceto o da demonstração. Conferência visual em 380px e 1280px.

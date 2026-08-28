# Ajustes pontuais na landing

Quatro mudanças pedidas, todas em código existente:

## 1. Remover nota de validação
- Em `src/components/landing/SecurityData.tsx`: remover o parágrafo `[VALIDAR: confirmar cada afirmação com o contrato e o DPA vigentes antes de publicar]` (e o comentário acima dele).

## 2. Remover as duas seções das imagens anexas
- **Imagem 52** — faixa final "A melhor secretária da sua clínica continua sendo a sua secretária." + botão "Agendar diagnóstico gratuito": remover a seção `FinalCTA` de `src/pages/Index.tsx` e o arquivo `src/components/landing/FinalCTA.tsx`.
- **Imagem 53** — lista alternada "Sua recepcionista / A Secretária Invisível" (Recebe um paciente na porta / Responde outro no WhatsApp, etc.): remover a seção `SideBySide` de `src/pages/Index.tsx` e o arquivo `src/components/landing/SideBySide.tsx`.

## 3. FAQ com no máximo 5 perguntas
Em `src/components/landing/FAQ.tsx`, manter as 5 mais importantes para conversão:
1. Isso vai substituir minha recepcionista?
2. Preciso trocar meu número de WhatsApp?
3. É seguro? Onde ficam meus dados?
4. E se o sistema não souber responder?
5. Funciona com o sistema que eu já uso?

Remover: "Minha recepcionista vai se sentir ameaçada?", "O paciente vai perceber que está falando com um sistema?", "Faz follow-up de falta e cancelamento?". (A pergunta "funciona com o sistema que eu já uso" também tem o marcador [VALIDAR...] na resposta, que será removido, mantendo só a frase "Avaliamos a integração no diagnóstico.")

O FAQ JSON-LD em `src/pages/Index.tsx` se atualiza automaticamente, pois é gerado a partir de `faqEntries`.

## 4. Novos preços
Em `src/components/landing/Pricing.tsx`:
- Essencial: R$497 → **R$597**
- Profissional: R$797 → **R$897**
- Premium: R$1.247 → **R$1.547**

Verificar se o valor "R$497" aparece em outro texto do site (ex.: ancora de preço) e atualizar para R$597 onde fizer referência ao plano Essencial.

## Detalhes técnicos
- Arquivos tocados: `SecurityData.tsx`, `FinalCTA.tsx` (removido), `SideBySide.tsx` (removido), `FAQ.tsx`, `Pricing.tsx`, `Index.tsx`.
- Nenhuma mudança de paleta, tipografia ou estrutura além das remoções.

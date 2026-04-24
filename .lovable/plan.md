# Atualizar seção de depoimentos

## Mudanças em `src/components/landing/SocialProof.tsx`

1. **Remover** o depoimento do Dr. Ricardo Mendes (Dermatologista).
2. **Manter apenas** o depoimento da Dra. Mariana Fogarolli, centralizado na página (max-w-2xl mx-auto).
3. **Substituir o avatar de iniciais "MF"** por uma foto real da doutora, com bordas arredondadas (`rounded-full`), tamanho maior (~14x14 ou 16x16) e `object-cover`.
4. **Adicionar o Instagram** `@dramarianafogarolli` abaixo do nome/especialidade, como link clicável para `https://instagram.com/dramarianafogarolli` (abre em nova aba), com ícone do Instagram (lucide-react) ao lado.

## Asset

- Copiar `user-uploads://image-2.png` para `src/assets/dra-mariana-fogarolli.jpg` e importar no componente via ES6 import.

## Layout final do card

- Card único centralizado
- Foto redonda (esquerda) + nome, especialidade e @instagram (direita) no rodapé
- Depoimento e estrelas mantidos como estão

Sem mudanças em outras seções, cores ou estilos globais.
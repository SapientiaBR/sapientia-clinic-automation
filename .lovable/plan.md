
# Plano: nivelar a LP da Secretária Invisível

Objetivo: tirar a página do tom monocórdico, unificar o funil, mostrar o produto em vez de descrever, e quebrar as objeções específicas que um dono de clínica tem antes de plugar IA no WhatsApp dele.

## Decisões já tomadas
- **Funil único:** formulário curto (nome + WhatsApp). Após enviar, o lead vai para `/obrigado`, e lá um botão chamativo o leva ao WhatsApp para conversar ao vivo com a IA (a conversa É a demo).
- **Assets disponíveis:** prints reais de conversas e 1 vídeo curto (Loom/screen) da IA atendendo.
- **Regra de escrita:** zero travessões nos textos. Usar vírgulas, ponto, dois pontos ou parênteses no lugar.

## Princípios da nova versão
1. **Um caminho só.** Todo botão da página (header, hero, meio, final, sticky mobile) aponta para `#formulario`. Nada de "quero recuperar pacientes" vs "ver demo" vs "WhatsApp flutuante" competindo entre si.
2. **Mostrar, não dizer.** Prints reais são o herói visual. Copy serve de legenda.
3. **Promessa única e consistente.** Uma frase só, repetida nos pontos chave. Te mando 2 ou 3 opções na hora da escrita.
4. **Objeções primeiro, features depois.** Antes de pedir o lead, responder: "e se a IA errar?", "ela sabe os dados da minha clínica?", "e quando o paciente perguntar algo fora do script?".

## Nova estrutura da página (ordem)

```
1. Header        logo + 1 botão "Testar agora" rolando para #formulario
2. Hero          promessa única, 1 print real ao lado, 1 CTA
3. Form curto    nome + WhatsApp, texto "nossa IA vai te chamar em minutos"
4. Conversas reais (prints)
                 galeria de 4 a 6 conversas reais com legendas curtas:
                   agendamento simples
                   paciente em dúvida e quebra de objeção
                   follow-up de falta
                   áudio recebido
                   pergunta fora do script (handoff para humano)
                   cancelamento e reagendamento
5. Vídeo (Loom)  IA atendendo em tempo real, autoplay muted, 30 a 60s
6. "E se...?"    bloco de objeções sobre IA:
                   e se ela responder errado?
                   ela conhece minha clínica?
                   quem assume quando foge do script?
                   lê áudio? lê imagem?
                   faz follow-up de falta?
                   meus dados e LGPD
7. Para quem é   3 sinais claros de fit (volume, perfil, dor)
8. Prova social  depoimentos COM rosto, nome e clínica (placeholder
                 marcado se ainda não tivermos as fotos)
9. Como começa   3 passos curtos até a IA estar no ar
10. Form curto (de novo) repetido idêntico, nome + WhatsApp
11. FAQ enxuto   só perguntas que não couberam acima
12. Footer
```

Removidos ou fundidos: o wizard de 3 passos, o Loss Calculator (vira 1 linha dentro do hero), o `PositioningStatement` solto, o `Method` longo (vira o bloco "Como começa"), o `Visualization` (substituído pelos prints reais), CTAs duplicados.

## Mudanças concretas por arquivo

**Hero (`Hero.tsx`)**
- Promessa única. Subhead curta (1 linha). 1 print real ao lado (não mock).
- 1 CTA só: "Testar a IA agora" rolando suave para `#formulario`.
- Garantir scroll suave funcionando (bug reportado: "cliquei e a página não subiu").

**Formulário (`LeadForm.tsx`)**
- Remover wizard, remover steps, remover desafio e volume.
- Campos: `nome`, `whatsapp`. Só.
- Texto acima: *"Coloque seu WhatsApp. Nossa própria IA vai te chamar em até 5 minutos, e esse contato é a demo."*
- Mantém envio fire-and-forget para n8n, `fbq("Lead")` e redirect `/obrigado`.

**Página `/obrigado` (`ThankYou.tsx`)**
- Mensagem curta: *"Obrigado! Sua IA já foi acionada."*
- Texto de apoio: *"Clique no botão abaixo para conversar ao vivo com a nossa IA direto no seu WhatsApp."*
- Botão grande, chamativo (gradient lavanda para ciano), abrindo `https://wa.me/5511920795583` em nova aba.
- Mantém o disparo de `fbq("Lead")` no `useEffect`.

**Nova seção `RealConversations.tsx`**
- Grid ou carrossel de prints reais (você fornece imagens). Cada print com legenda de 1 linha amarrada a uma dor.

**Nova seção `VideoDemo.tsx`**
- Vídeo Loom embedado, autoplay muted loop, com poster de fallback.

**Nova seção `AIObjections.tsx`**
- 5 ou 6 cards curtos no formato "E se... / Como resolvemos".

**Depoimentos (`SocialProof.tsx`)**
- Estrutura com `Avatar` real (foto), nome completo, clínica, cidade. Marcar com `TODO` claro os que ainda não temos foto.

**WhatsApp flutuante (`FloatingWhatsApp.tsx`)**
- Trocar destino: em vez de abrir `wa.me`, rola para `#formulario` (mantém regra "um único caminho"). Label: "Testar a IA".

**Header e Final CTA**
- Todos os botões com mesmo label e mesmo destino (`#formulario`).
- Corrigir o scroll do botão final que não estava funcionando.

**Index.tsx**
- Nova ordem das seções conforme acima.
- Repetir `<LeadForm />` em duas posições (após hero e antes do FAQ).

## Regra de copy
- **Nunca usar travessões** (nem `—` nem `–`) em nenhum texto novo ou existente que eu tocar. Substituir por vírgula, ponto, dois pontos ou parênteses conforme o ritmo da frase.

## O que NÃO entra neste plano (pendências do seu lado)
- Prints reais das conversas (precisamos das imagens, anonimizadas).
- Vídeo Loom ou screen recording (link ou arquivo).
- Fotos, nome e clínica dos clientes para depoimentos.
- Confirmação do fluxo n8n acionando a IA no WhatsApp do lead em minutos (sem isso, a promessa do form quebra).
- Texto final da promessa única (te mando 2 ou 3 opções na implementação).

## Validação após implementar
- Clicar em todos os CTAs e confirmar que todos levam ao form.
- Submeter o form de teste e confirmar o redirect para `/obrigado` e o botão de WhatsApp funcionando.
- Conferir que `fbq("Lead")` dispara no submit e no `/obrigado`.
- Buscar e remover travessões remanescentes nos textos tocados.

Se aprovar, sigo para o build.

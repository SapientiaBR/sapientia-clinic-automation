
## Ajustes da landing

### 1. Nova seção de Preços (`Pricing.tsx`)
Criar `src/components/landing/Pricing.tsx` com tabela comparativa visual dos 3 planos baseada na imagem anexa.

- 3 colunas: **Essencial R$497/mês**, **Profissional R$797/mês** (destacada como "mais popular"), **Premium R$1.247/mês**.
- Header de cada coluna: nome do plano, preço grande, perfil ("1 médico/consultório solo", "2-3 profissionais", "Clínica com 4+ profissionais ou rede").
- Linhas da tabela (mesma ordem do anexo): IA responde WhatsApp 24/7, Agendamento de consultas, FAQ automatizado (valores/convênios/endereço/horários), Confirmação automática de agendamento, **Lembretes automáticos (anti-falta)**, Reagendamento/cancelamento pelo bot, **Qualificação de pacientes (perguntas pré-consulta)**, Integração Google Agenda, Relatório de atendimentos (—/Mensal/Semanal), Nº de agendas/profissionais (1/até 3/ilimitado), **Suporte prioritário (SLA 4h úteis)**, Ajustes de fluxo inclusos (1/mês, 2/mês, 4/mês).
- Células com ✅ usam check verde (`#0FB5A3`); ausentes usam traço cinza `—`.
- Mobile: a tabela vira 3 cards empilhados (um por plano), listando todas as features daquele plano com check verde.
- Desktop: tabela com `.card-tinted` no contêiner, coluna "Profissional" com borda verde e badge "Mais escolhido".
- CTA abaixo da tabela: botão primário "Falar com a Sapient.IA" linkando para `#formulario`.
- Eyebrow: `// planos e preços`; H2: `Escolha o plano da sua clínica.` com `<em>` no segundo trecho.
- Inserir no `Index.tsx` logo após `<Guarantee />` (antes do `LeadForm` compacto).

> Obs.: isso muda o pricing model em memória (era R$4k setup + R$500/mo). Vou atualizar `mem://business/positioning` depois da implementação.

### 2. RealConversations — remover card "Cancelamento"
Em `RealConversations.tsx`, remover o terceiro item do array `conversations` (tag "Cancelamento" — "Em vez de só cancelar, a IA reagenda"). Restam 2 cards (Agendamento + Follow-up). Grid já se adapta.

### 3. Remover seção Solutions ("Infraestrutura. Não chatbot.")
- Remover `<Solutions />` e seu `lazy import` em `src/pages/Index.tsx`.
- Deletar `src/components/landing/Solutions.tsx`.
(O conteúdo das features agora vive na tabela de preços.)

### 4. Remover seção Method ("// método agenda invisível")
- Remover `<Method />` e seu `lazy import` em `src/pages/Index.tsx`.
- Deletar `src/components/landing/Method.tsx`.

### 5. HowItWorks — caber em 1 tela sem scroll
Em `src/components/landing/HowItWorks.tsx`:
- Reduzir paddings: trocar `section-padding` por `py-10 md:py-14`.
- Reduzir margem do header: `mb-16` → `mb-6 md:mb-8`.
- Diminuir H2: `text-3xl sm:text-4xl lg:text-5xl` → `text-2xl sm:text-3xl lg:text-4xl`.
- Cards mais compactos: `p-7` → `p-5`, número decorativo `text-[80px]` → `text-[56px]`, gap do grid `gap-8 lg:gap-10` → `gap-4 md:gap-6`.
- Reduzir bolha de chat: `space-y-2` → `space-y-1.5`, padding `p-3` → `p-2.5`, manter apenas 1 mensagem por step (já é o caso na maioria; no step 02 manter só a última troca, ou cortar para 1 linha).
- Texto descritivo `text-sm` → `text-[13px]` com `mt-2 mb-4`.
- Objetivo: caber em viewport mobile (~844px) e desktop sem scroll dentro da seção.

### 6. Guarantee — remover "ou seu dinheiro de volta"
Em `src/components/landing/Guarantee.tsx`:
- H2: trocar `Implementação em 7 dias ou seu dinheiro de volta.` por `Implementação em 7 dias úteis. <em>Sem você levantar um dedo.</em>`
- Parágrafo: substituir por algo como "Conectamos seu WhatsApp, configuramos a agenda e treinamos a IA com o tom da sua clínica. Ajustes ilimitados no primeiro mês até ficar do jeito certo."
- Remover o pillar central `{ icon: ShieldCheck, title: "Ou seu dinheiro de volta", desc: "Se não entregarmos no prazo combinado, você não paga o setup..." }` do array `pillars`. Sobram 2 (Em até 7 dias úteis + Ajustes ilimitados no 1º mês) — grid passa para `sm:grid-cols-2`.

### Arquivos
- **Criar:** `src/components/landing/Pricing.tsx`
- **Editar:** `src/pages/Index.tsx`, `src/components/landing/RealConversations.tsx`, `src/components/landing/HowItWorks.tsx`, `src/components/landing/Guarantee.tsx`
- **Deletar:** `src/components/landing/Solutions.tsx`, `src/components/landing/Method.tsx`
- **Memória:** atualizar `mem://business/positioning` (novo modelo de preço tiered) e core (remover "dinheiro de volta")

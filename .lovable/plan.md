## Mudanças na Calculadora de Perda

### 1. Atendimentos: mensal → semanal
- Label: "Quantos atendimentos por semana?"
- Slider range: 5 a 100, step 5, default 25
- Cálculo: multiplicar por 4.33 internamente para virar mensal antes da fórmula

### 2. Ticket médio: input → slider
- Remover o `<input type="number">`
- Slider de R$ 100 a R$ 2.000, step 50, default R$ 350
- Mesmo padrão visual dos outros sliders

### 3. Perda: remover slider, fixar em 30%
- Remover o SliderRow de perda
- Adicionar bloco informativo acima do resultado:
  > "Estudos mostram que **54% dos pedidos de agendamento acontecem fora do horário comercial**. Considerando uma perda conservadora de **30%** por falta de resposta imediata, o impacto na sua clínica é:"
- Fórmula: `atendimentosSemana * 4.33 * 0.30 * ticket`

### 4. Fix do número cortado (R$ 3.050 cortando descendentes)
Causa: `leading-none` + `gradient-text` com `background-clip: text` corta glifos com descendentes (ex: "5", "0" em algumas fontes display).
Correção:
- Trocar `leading-none` por `leading-[1.1]`
- Adicionar `pb-2` (padding inferior) no `<p>` do valor
- Garantir `overflow-visible` no container

### Arquivo
- `src/components/landing/LossCalculator.tsx` — única edição

### Resultado visual final
```
[Slider] Atendimentos por semana: 25
[Slider] Ticket médio: R$ 350

─────────────────────────────────
ⓘ 54% dos pedidos chegam fora do
  horário comercial. Com perda de
  30% por falta de resposta:

Você está deixando na mesa todo mês:
        R$ 11.366
   [Quero recuperar esse valor →]
```

function ReportsScreen() {
  const { Card, MetricCard, TrendChart, ListRow, Badge, Button, ScoreDonut } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
        <MetricCard icon="calendar-check" label="Consultas recuperadas" value="46" status="Ótimo" delta="+18% vs. mês anterior" />
        <MetricCard icon="banknote" label="Receita recuperada" value="R$ 27.600" status="Ótimo" delta="estimativa sobre ticket médio" />
        <MetricCard icon="timer" iconTone="info" label="Horas devolvidas à equipe" value="52" unit="h" status="No mês" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 'var(--space-4)' }}>
        <Card title="Consultas confirmadas por semana" subtitle="últimos 3 meses"
          action={<Button size="sm" variant="outline" icon="download">Exportar</Button>}>
          <TrendChart data={[58,64,61,72,78,74,86,92,88,97,104,112]} height={200} yLabels={['120','80','40']} xLabels={['abr','mai','jun']} />
        </Card>
        <Card title="Origem dos agendamentos">
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16 }}>
            <ScoreDonut value={78} label="78%" size={92} thickness={11} />
            <p style={{ font: 'var(--type-label)', color: 'var(--text-secondary)' }}>dos agendamentos<br />chegaram pelo WhatsApp</p>
          </div>
          <ListRow chevron={false} icon="message-circle" title="WhatsApp · secretária" meta="243 agendamentos" trailing={<Badge tone="good">78%</Badge>} />
          <ListRow chevron={false} icon="phone" iconTone="info" title="Telefone · equipe" meta="48 agendamentos" trailing={<Badge tone="info">15%</Badge>} />
          <ListRow chevron={false} icon="globe" iconTone="neutral" title="Site" meta="21 agendamentos" trailing={<Badge>7%</Badge>} />
        </Card>
      </div>

      <Card title="Relatórios enviados" subtitle="resumo semanal por e-mail e WhatsApp" action={<a href="#">Configurar envio</a>}>
        <ListRow icon="file-text" title="Resumo semanal · 15–21 de junho" meta="enviado para contato@clinicavida.com.br" trailing={<Badge tone="good" dot>Enviado</Badge>} onClick={() => {}} />
        <ListRow icon="file-text" title="Resumo semanal · 8–14 de junho" meta="enviado para contato@clinicavida.com.br" trailing={<Badge tone="good" dot>Enviado</Badge>} onClick={() => {}} />
        <ListRow icon="file-clock" iconTone="warn" title="Resumo mensal · junho" meta="será enviado em 01/07" trailing={<Badge tone="warn" dot>Agendado</Badge>} onClick={() => {}} />
      </Card>
    </>
  );
}

Object.assign(window, { ReportsScreen });

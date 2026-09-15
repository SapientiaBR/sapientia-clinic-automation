function OverviewScreen() {
  const { Card, MetricCard, ScoreDonut, TrendChart, ListRow, InsightCard, Badge, Avatar, AppointmentCard, Tabs } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  const [range, setRange] = React.useState('Hoje');
  const series = { Hoje: [12,18,15,26,22,31,28,38,34,41], Semana: [140,162,151,188,205,196,232], 'Mês': [520,610,588,702,760,812] }[range];
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        <MetricCard icon="message-circle" label="Conversas atendidas" value="1.284" status="Ótimo" delta="+12% vs. semana passada" />
        <MetricCard icon="calendar-check" label="Consultas confirmadas" value="312" status="Estável" delta="+4% vs. semana passada" />
        <MetricCard icon="calendar-x" iconTone="warn" label="Faltas" value="4" unit="%" status="Atenção" statusTone="warn" delta="-2% vs. semana passada" />
        <MetricCard icon="clock" iconTone="info" label="Tempo de resposta" value="11" unit="s" status="Ótimo" delta="média nas 24h" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 'var(--space-4)' }}>
        <Card title="Taxa de confirmação" subtitle="últimos 30 dias">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <ScoreDonut value={82} label="82%" size={104} thickness={12} />
            <div>
              <p style={{ font: 'var(--weight-bold) var(--text-h2) / 1 var(--font-display)', letterSpacing: 'var(--tracking-heading)' }}>256</p>
              <p style={{ font: 'var(--type-label)', color: 'var(--text-secondary)' }}>de 312 consultas<br />confirmadas sem intervenção</p>
            </div>
          </div>
        </Card>
        <Card title="Atendimentos" subtitle="volume de conversas por período"
          action={<Tabs tabs={['Hoje','Semana','Mês']} activeId={range} onSelect={setRange} />}>
          <TrendChart data={series} height={168} yLabels={['alto','médio','baixo']}
            xLabels={range === 'Hoje' ? ['08h','11h','14h','17h','20h'] : range === 'Semana' ? ['seg','qua','sex','dom'] : ['jan','mar','mai','jun']} />
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'var(--space-4)' }}>
        <InsightCard
          title="Terças de manhã ficam 40% vazias"
          body="Reabrir esses horários para a lista de espera pode recuperar cerca de 6 consultas por semana."
          cta="Ver sugestão" />
        <Card title="Últimas conversas" action={<a href="#">Ver tudo</a>}>
          <ListRow leading={<Avatar name="Mariana Castro" />} title="Mariana Castro" meta="Remarcou para quinta, 09:00" trailing={<Badge tone="info" dot>Remarcado</Badge>} onClick={() => {}} />
          <ListRow leading={<Avatar name="João Paulo" />} title="João Paulo" meta="Confirmou hoje, 14:30" trailing={<Badge tone="good" dot>Confirmado</Badge>} onClick={() => {}} />
          <ListRow leading={<Avatar name="Renata Alves" />} title="Renata Alves" meta="Sem resposta há 2 dias" trailing={<Badge tone="warn" dot>Follow-up</Badge>} onClick={() => {}} />
          <ListRow leading={<Avatar name="Carlos Menezes" />} title="Carlos Menezes" meta="Pediu orçamento de exame" trailing={<Badge dot>Humano</Badge>} onClick={() => {}} />
        </Card>
      </div>

      <Card title="Próximas consultas" subtitle="hoje · Dra. Helena Rocha" action={<a href="#">Abrir agenda</a>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
          <AppointmentCard time="15:00" duration="30 min" patient="Mariana Castro" service="Retorno" professional="Dra. Helena" />
          <AppointmentCard time="15:30" duration="45 min" patient="João Paulo" service="Primeira consulta" professional="Dra. Helena" state="pendente" />
          <AppointmentCard time="16:30" duration="30 min" patient="Ana Lúcia Ferraz" service="Retorno" professional="Dra. Helena" />
        </div>
      </Card>
    </>
  );
}

Object.assign(window, { OverviewScreen });

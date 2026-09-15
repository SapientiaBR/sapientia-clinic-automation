const WEEK = [
  ['Seg', '22', false, '9/10', [['08:30','Ana Lúcia Ferraz','Retorno','confirmado'],['10:00','Carlos Menezes','Exame','confirmado'],['14:00','Bruno Sales','Retorno','pendente']], []],
  ['Ter', '23', true, '8/10', [['09:00','Mariana Castro','Retorno','confirmado'],['10:30','João Paulo','Primeira consulta','pendente'],['15:00','Helena Braga','Retorno','confirmado']], ['11:30']],
  ['Qua', '24', false, '6/10', [['09:30','Renata Alves','Retorno','remarcado'],['13:00','Paulo Vieira','Exame','confirmado']], ['11:00','16:00']],
  ['Qui', '25', false, '10/10', [['09:00','Mariana Castro','Retorno','confirmado'],['10:00','Tiago Moura','Primeira consulta','confirmado'],['14:30','Lúcia Prado','Retorno','confirmado']], []],
  ['Sex', '26', false, '5/10', [['08:00','Sofia Ramos','Retorno','confirmado']], ['10:00','14:00','16:30']],
];

function AgendaScreen() {
  const { Card, AgendaDay, AppointmentCard, EmptySlot, Tabs, Badge, Select } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  const [range, setRange] = React.useState('Semana');
  return (
    <>
      <Card padding="sm">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <Tabs tabs={['Dia','Semana','Mês']} activeId={range} onSelect={setRange} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Select options={['Dra. Helena Rocha','Dr. Paulo Lima','Todos os profissionais']} style={{ minWidth: 220 }} />
            <Badge tone="good" dot>38 confirmadas</Badge>
            <Badge tone="warn" dot>6 pendentes</Badge>
            <Badge tone="brand" icon="sparkles">12 vagas livres</Badge>
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-3)', alignItems: 'start' }}>
        {WEEK.map(([wd, d, today, occ, slots, free]) => (
          <AgendaDay key={d} weekday={wd} date={d} today={today} occupancy={occ}>
            {slots.map(([time, patient, service, state]) => (
              <AppointmentCard key={time} compact time={time} patient={patient} service={service} state={state} channel="" />
            ))}
            {free.map(time => <EmptySlot key={time} time={time} />)}
          </AgendaDay>
        ))}
      </div>
    </>
  );
}

Object.assign(window, { AgendaScreen });

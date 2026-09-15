const THREADS = {
  mariana: {
    name: 'Mariana Castro', status: 'online', tag: ['info', 'Remarcado'],
    meta: 'Remarcou para quinta, 09:00',
    messages: [
      ['in', '14:30', 'Oi! Preciso remarcar minha consulta de amanhã'],
      ['out', '14:30', 'Claro, Mariana. Tenho estes horários com a Dra. Helena:', ['Quinta 09:00', 'Quinta 15:30']],
      ['in', '14:31', 'Quinta 09:00 fica ótimo'],
      ['out', '14:31', 'Remarcado para quinta, 09:00. Envio a confirmação na véspera.'],
      ['system', '', 'Agenda atualizada automaticamente'],
    ],
  },
  joao: {
    name: 'João Paulo', status: 'visto às 14:32', tag: ['good', 'Confirmado'],
    meta: 'Confirmou hoje, 14:30',
    messages: [
      ['out', '08:00', 'Bom dia, João! Sua consulta é hoje às 15:30 com a Dra. Helena. Podemos confirmar?', ['Confirmar', 'Remarcar']],
      ['in', '14:29', 'Confirmar'],
      ['out', '14:30', 'Confirmado. Endereço: Av. Paulista 1400, sala 72. Até logo!'],
    ],
  },
  renata: {
    name: 'Renata Alves', status: 'visto ontem', tag: ['warn', 'Follow-up'],
    meta: 'Sem resposta há 2 dias',
    messages: [
      ['out', 'ter 09:00', 'Olá, Renata! Notamos que sua consulta de retorno não foi reagendada. Quer que eu veja horários?', ['Ver horários', 'Depois']],
      ['system', '', 'Follow-up reenviado em 2 dias'],
      ['out', 'qui 09:00', 'Oi, Renata! Ainda temos vaga na quinta às 10h. Posso reservar?'],
    ],
  },
};

function InboxScreen() {
  const { Card, ChatThread, ChatBubble, ListRow, Avatar, Badge, Tag, Button, Switch } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  const [id, setId] = React.useState('mariana');
  const t = THREADS[id];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr 280px', gap: 'var(--space-4)', alignItems: 'start' }}>
      <Card padding="sm">
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          <Tag selected>Todas</Tag><Tag>Pendentes</Tag><Tag>Humano</Tag>
        </div>
        {Object.entries(THREADS).map(([key, v]) => (
          <ListRow key={key} chevron={false}
            style={{ background: key === id ? 'var(--si-mint)' : undefined }}
            leading={<Avatar name={v.name} />} title={v.name} meta={v.meta}
            trailing={<Badge tone={v.tag[0]} dot>{v.tag[1]}</Badge>}
            onClick={() => setId(key)} />
        ))}
      </Card>

      <ChatThread contact={{ name: t.name, status: t.status }} style={{ height: 560 }}>
        {t.messages.map((m, i) => (
          <ChatBubble key={i} direction={m[0]} time={m[1]} status={i === t.messages.length - 1 ? 'sent' : 'read'} quick={m[3]}>{m[2]}</ChatBubble>
        ))}
      </ChatThread>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Card title="Paciente" subtitle={t.name}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, font: 'var(--type-label)', color: 'var(--text-secondary)' }}>
            <span>Última consulta · 12/05/2026</span>
            <span>Profissional · Dra. Helena Rocha</span>
            <span>Convênio · Particular</span>
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <Button size="sm" variant="secondary" icon="calendar-plus">Agendar</Button>
            <Button size="sm" variant="outline" icon="user">Ficha</Button>
          </div>
        </Card>
        <Card title="Atendimento" subtitle="controle da secretária">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Switch checked label="IA respondendo" onChange={() => {}} />
            <Switch label="Assumir conversa" onChange={() => {}} />
            <p style={{ font: 'var(--type-caption)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
              Ao assumir, a secretária pausa as respostas automáticas nesta conversa e avisa a equipe.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { InboxScreen });

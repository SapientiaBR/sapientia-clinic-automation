function HowItWorks() {
  const { SectionLabel, Card, Icon } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  const steps = [
    ['message-circle', 'O paciente manda mensagem', 'A qualquer hora, no número que sua clínica já usa. A secretária responde em segundos, com o tom da sua clínica.'],
    ['calendar-check', 'Ela agenda e confirma', 'Consulta os horários reais do profissional, marca, confirma na véspera e remarca quando o paciente pede.'],
    ['user-check', 'Sua equipe assume quando importa', 'Casos clínicos, orçamentos e exceções vão direto para a secretária humana, com todo o histórico da conversa.'],
  ];
  return <section id="como" style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: 'var(--section-pad-y) var(--space-6)' }}>
    <SectionLabel number="01">Como funciona</SectionLabel>
    <h2 style={{ font: 'var(--weight-medium) var(--text-h1) / var(--leading-tight) var(--font-display)', letterSpacing: 'var(--tracking-display)', marginTop: 16, maxWidth: '22ch' }}>
      Três passos, nenhuma troca de sistema
    </h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-10)' }}>
      {steps.map(([icon, title, body], i) => (
        <Card key={title} padding="lg">
          <span style={{ display: 'grid', placeItems: 'center', width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--si-mint)', color: 'var(--si-emerald-700)' }}>
            <Icon name={icon} size={22} />
          </span>
          <p style={{ font: 'var(--type-caption)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 20 }}>0{i + 1}</p>
          <h3 style={{ font: 'var(--type-h4)', marginTop: 6 }}>{title}</h3>
          <p style={{ font: 'var(--type-body)', color: 'var(--text-secondary)', marginTop: 10 }}>{body}</p>
        </Card>
      ))}
    </div>
  </section>;
}

function AgendaFeature() {
  const { SectionLabel, AppointmentCard, EmptySlot, Card, Badge } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return <section style={{ background: 'var(--si-mint)' }}>
    <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: 'var(--section-pad-y) var(--space-6)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-12)', alignItems: 'center' }}>
      <div>
        <SectionLabel number="02">Agenda cheia</SectionLabel>
        <h2 style={{ font: 'var(--weight-medium) var(--text-h1) / var(--leading-tight) var(--font-display)', letterSpacing: 'var(--tracking-display)', marginTop: 16, color: 'var(--si-emerald-900)' }}>
          Cada buraco na agenda é dinheiro parado
        </h2>
        <p style={{ font: 'var(--type-body-lg)', color: 'var(--si-emerald-800)', marginTop: 18, maxWidth: '48ch' }}>
          A secretária confirma na véspera, recupera faltas no mesmo dia e oferece os horários vagos para quem está na lista de espera — sem ninguém da equipe digitar uma mensagem.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 26, flexWrap: 'wrap' }}>
          <Badge tone="ink">4% de faltas</Badge>
          <Badge tone="brand" dot>82% de confirmação automática</Badge>
        </div>
      </div>
      <Card padding="lg" radius="2xl">
        <p style={{ font: 'var(--type-label)', color: 'var(--text-secondary)', marginBottom: 14 }}>Terça, 23 de junho · Dra. Helena Rocha</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <AppointmentCard time="09:00" duration="30 min" patient="Mariana Castro" service="Retorno" />
          <AppointmentCard time="10:30" duration="45 min" patient="João Paulo" service="Primeira consulta" state="pendente" />
          <EmptySlot time="11:30" label="Livre · oferecido à lista de espera" />
          <AppointmentCard time="15:00" duration="30 min" patient="Helena Braga" service="Retorno" />
        </div>
      </Card>
    </div>
  </section>;
}

function Results() {
  const { SectionLabel, TrendChart } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  const stats = [['11s', 'tempo médio de resposta'], ['82%', 'das confirmações sem intervenção'], ['46', 'consultas recuperadas por mês'], ['52h', 'devolvidas à equipe por mês']];
  return <section id="resultados" style={{ position: 'relative', background: 'var(--si-emerald-700)', color: 'var(--text-on-ink)', overflow: 'hidden' }}>
    <Blobs opacity={0.07} />
    <div style={{ position: 'relative', maxWidth: 'var(--content-max)', margin: '0 auto', padding: 'var(--section-pad-y) var(--space-6)' }}>
      <SectionLabel number="03" tone="light">Resultados</SectionLabel>
      <h2 style={{ font: 'var(--weight-medium) var(--text-h1) / var(--leading-tight) var(--font-display)', letterSpacing: 'var(--tracking-display)', marginTop: 16, color: '#EAF6F1', maxWidth: '24ch' }}>
        Medido no painel, não no discurso
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-8)', marginTop: 'var(--space-12)' }}>
        {stats.map(([v, l]) => (
          <div key={l}>
            <p style={{ font: 'var(--weight-medium) var(--text-h1) / 1 var(--font-display)', letterSpacing: 'var(--tracking-display)', color: '#FFFFFF' }}>{v}</p>
            <p style={{ font: 'var(--type-label)', color: 'rgba(234,246,241,.76)', marginTop: 10 }}>{l}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'var(--space-16)', padding: 'var(--space-6)', background: 'rgba(0,0,0,.14)', borderRadius: 'var(--radius-2xl)' }}>
        <p style={{ font: 'var(--type-label)', color: 'rgba(234,246,241,.76)', marginBottom: 18 }}>Consultas confirmadas por semana · Clínica Vida</p>
        <TrendChart tone="dark" data={[58,64,61,72,78,74,86,92,88,97,104,112]} height={180} yLabels={['120','80','40']} xLabels={['abr','mai','jun']} />
      </div>
    </div>
  </section>;
}

function Quote() {
  const { Avatar } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return <section style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: 'var(--section-pad-y) var(--space-6)' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-12)', alignItems: 'center' }}>
      <Photo label="Recepção da clínica ou secretária ao telefone" />
      <div>
        <p style={{ font: 'var(--weight-medium) var(--text-h2) / 1.25 var(--font-display)', letterSpacing: 'var(--tracking-heading)', color: 'var(--si-emerald-800)' }}>
          “Minha secretária parou de correr atrás de confirmação e voltou a cuidar de quem está na sala de espera.”
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 26 }}>
          <Avatar name="Helena Rocha" tone="ink" size="lg" />
          <div>
            <p style={{ font: 'var(--type-label)', fontWeight: 'var(--weight-bold)' }}>Dra. Helena Rocha</p>
            <p style={{ font: 'var(--type-label)', fontWeight: 'var(--weight-regular)', color: 'var(--text-secondary)' }}>Clínica Vida · São Paulo</p>
          </div>
        </div>
      </div>
    </div>
  </section>;
}

Object.assign(window, { HowItWorks, AgendaFeature, Results, Quote });

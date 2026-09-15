function LandingHero() {
  const { Button, Badge, ChatThread, ChatBubble } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return <section style={{ position: 'relative', background: 'var(--gradient-emerald)', color: 'var(--text-on-ink)', overflow: 'hidden' }}>
    <Blobs opacity={0.09} />
    <div style={{ position: 'relative', maxWidth: 'var(--content-max)', margin: '0 auto', padding: 'var(--space-24) var(--space-6)', display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,.85fr)', gap: 'var(--space-12)', alignItems: 'center' }}>
      <div>
        <Badge tone="ink" icon="sparkles" style={{ background: 'rgba(255,255,255,.16)', color: '#fff' }}>IA no WhatsApp · 24/7</Badge>
        <h1 style={{ font: 'var(--weight-medium) var(--text-display-3) / var(--leading-display) var(--font-display)', letterSpacing: 'var(--tracking-display)', marginTop: 22, color: '#EAF6F1' }}>
          Sua clínica responde<br />em 11 segundos.<br />Inclusive às 23h.
        </h1>
        <p style={{ font: 'var(--type-body-lg)', color: 'rgba(234,246,241,.86)', marginTop: 22, maxWidth: '46ch' }}>
          A Secretária Invisível agenda, confirma e faz follow-up de consultas pelo WhatsApp — ao lado da sua secretária humana, não no lugar dela.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Button variant="inverse" size="lg" iconAfter="arrow-right">Agendar demonstração</Button>
          <Button variant="outline" size="lg" style={{ color: '#EAF6F1', borderColor: 'rgba(255,255,255,.38)' }}>Ver o painel</Button>
        </div>
        <p style={{ font: 'var(--type-label)', color: 'rgba(234,246,241,.7)', marginTop: 22 }}>
          Implantação em 7 dias · sem trocar seu sistema de agenda
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 330, padding: 12, background: 'rgba(255,255,255,.14)', borderRadius: 'var(--radius-3xl)', boxShadow: 'var(--shadow-lg)' }}>
          <ChatThread contact={{ name: 'Clínica Vida', status: 'online' }} style={{ height: 470, borderRadius: 'var(--radius-2xl)' }}>
            <ChatBubble direction="in" time="22:58">Boa noite! Vocês atendem amanhã?</ChatBubble>
            <ChatBubble direction="out" time="22:58" status="read" quick={['09:00', '15:30']}>Boa noite! Atendemos sim. Tenho estes horários com a Dra. Helena:</ChatBubble>
            <ChatBubble direction="in" time="22:59">09:00</ChatBubble>
            <ChatBubble direction="out" time="22:59" status="read">Agendado para amanhã às 09:00. Envio a confirmação às 8h.</ChatBubble>
            <ChatBubble direction="system">Agenda da clínica atualizada</ChatBubble>
          </ChatThread>
        </div>
      </div>
    </div>
  </section>;
}

Object.assign(window, { LandingHero });

function Pricing() {
  const { SectionLabel, Card, Button, Badge, Icon } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  const plans = [
    ['Essencial', 'R$ 697', '/mês', '1 profissional', ['Atendimento 24/7 no WhatsApp', 'Agendamento e confirmação', 'Painel com métricas', 'Implantação em 7 dias'], false],
    ['Clínica', 'R$ 1.290', '/mês', 'até 5 profissionais', ['Tudo do Essencial', 'Follow-up de faltas e lista de espera', 'Transferência para a equipe', 'Relatório semanal por e-mail'], true],
    ['Rede', 'Sob consulta', '', 'múltiplas unidades', ['Tudo do Clínica', 'Integração com seu sistema de agenda', 'Gestor de conta dedicado', 'Treinamento da equipe'], false],
  ];
  return <section id="planos" style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: 'var(--section-pad-y) var(--space-6)' }}>
    <SectionLabel number="04">Planos</SectionLabel>
    <h2 style={{ font: 'var(--weight-medium) var(--text-h1) / var(--leading-tight) var(--font-display)', letterSpacing: 'var(--tracking-display)', marginTop: 16 }}>
      Custa menos que meio salário de recepção
    </h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-10)', alignItems: 'start' }}>
      {plans.map(([name, price, per, meta, items, featured]) => (
        <Card key={name} padding="lg" radius="2xl" tone={featured ? 'ink' : 'plain'}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <h3 style={{ font: 'var(--type-h4)' }}>{name}</h3>
            {featured && <Badge style={{ background: 'rgba(255,255,255,.18)', color: '#fff' }}>Mais escolhido</Badge>}
          </div>
          <p style={{ font: 'var(--type-label)', fontWeight: 'var(--weight-regular)', color: featured ? 'var(--text-on-ink-muted)' : 'var(--text-secondary)', marginTop: 6 }}>{meta}</p>
          <p style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 22 }}>
            <span style={{ font: 'var(--weight-medium) var(--text-h2) / 1 var(--font-display)', letterSpacing: 'var(--tracking-display)' }}>{price}</span>
            <span style={{ font: 'var(--type-label)', color: featured ? 'var(--text-on-ink-muted)' : 'var(--text-secondary)' }}>{per}</span>
          </p>
          <ul style={{ listStyle: 'none', margin: '24px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map(it => (
              <li key={it} style={{ display: 'flex', gap: 9, font: 'var(--type-body)', color: featured ? 'var(--text-on-ink)' : 'var(--text-primary)' }}>
                <Icon name="check" size={17} color={featured ? '#7FE9C8' : 'var(--si-emerald-600)'} style={{ marginTop: 2 }} />{it}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 28 }}>
            <Button fullWidth variant={featured ? 'inverse' : 'outline'} iconAfter="arrow-right">Falar com a gente</Button>
          </div>
        </Card>
      ))}
    </div>
  </section>;
}

function Faq() {
  const { SectionLabel, Icon } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  const [open, setOpen] = React.useState(0);
  const qs = [
    ['A IA substitui minha secretária?', 'Não. Ela cobre o que consome o dia da sua equipe — responder, agendar, confirmar e cobrar retorno. Casos clínicos, orçamentos e exceções vão para a pessoa certa, com o histórico da conversa.'],
    ['Preciso trocar meu sistema de agenda?', 'Não. A secretária lê e escreve nos horários que você já usa. Quando não há integração pronta, operamos por uma agenda espelhada durante a implantação.'],
    ['E o número da clínica?', 'Continua o mesmo. Usamos a API oficial do WhatsApp Business no seu número, com o histórico preservado.'],
    ['Quanto tempo até funcionar?', 'Sete dias. Na primeira semana mapeamos os fluxos, o tom de voz e as regras de agenda; depois acompanhamos os primeiros 30 dias no painel.'],
    ['Como fica a LGPD?', 'Dados ficam em servidores no Brasil, com contrato de tratamento, registro de consentimento e acesso auditável por usuário.'],
  ];
  return <section id="duvidas" style={{ maxWidth: 880, margin: '0 auto', padding: 'var(--section-pad-y) var(--space-6)' }}>
    <SectionLabel number="05">Dúvidas</SectionLabel>
    <h2 style={{ font: 'var(--weight-medium) var(--text-h1) / var(--leading-tight) var(--font-display)', letterSpacing: 'var(--tracking-display)', marginTop: 16 }}>
      O que médicos perguntam antes de assinar
    </h2>
    <div style={{ marginTop: 'var(--space-10)', borderTop: '1px solid var(--border-subtle)' }}>
      {qs.map(([q, a], i) => (
        <div key={q} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '20px 0', background: 'none', border: 0, cursor: 'pointer', textAlign: 'left',
          }}>
            <span style={{ flex: 1, font: 'var(--type-h5)', letterSpacing: 'var(--tracking-heading)' }}>{q}</span>
            <Icon name={open === i ? 'minus' : 'plus'} size={18} color="var(--si-emerald-700)" />
          </button>
          {open === i && <p style={{ font: 'var(--type-body-lg)', color: 'var(--text-secondary)', paddingBottom: 24, maxWidth: '62ch' }}>{a}</p>}
        </div>
      ))}
    </div>
  </section>;
}

function FinalCta() {
  const { Button, Input } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return <section style={{ position: 'relative', background: 'var(--gradient-ink)', color: 'var(--text-on-ink)', overflow: 'hidden' }}>
    <Blobs opacity={0.05} />
    <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto', padding: 'var(--section-pad-y) var(--space-6)', textAlign: 'center' }}>
      <h2 style={{ font: 'var(--weight-medium) var(--text-display-3) / var(--leading-display) var(--font-display)', letterSpacing: 'var(--tracking-display)', color: '#EAF6F1' }}>
        Veja sua agenda de<br />amanhã se encher hoje
      </h2>
      <p style={{ font: 'var(--type-body-lg)', color: 'rgba(234,246,241,.78)', marginTop: 20, maxWidth: '52ch', marginInline: 'auto' }}>
        Demonstração de 20 minutos com a sua própria agenda. Sem compromisso, sem integração prévia.
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 34, flexWrap: 'wrap' }}>
        <Input placeholder="WhatsApp da clínica" icon="phone" style={{ minWidth: 260 }} />
        <Button variant="inverse" size="lg" iconAfter="arrow-right">Agendar demonstração</Button>
      </div>
    </div>
  </section>;
}

Object.assign(window, { Pricing, Faq, FinalCta });

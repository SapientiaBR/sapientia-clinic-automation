function Blobs({ opacity = 0.1 }) {
  return <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    <span style={{ position: 'absolute', left: '-8%', top: '-30%', width: 620, height: 620, borderRadius: '46% 54% 60% 40% / 52% 44% 56% 48%', background: '#FFFFFF', opacity }} />
    <span style={{ position: 'absolute', right: '-12%', bottom: '-42%', width: 720, height: 720, borderRadius: '58% 42% 38% 62% / 44% 58% 42% 56%', background: '#FFFFFF', opacity: opacity * 0.8 }} />
  </div>;
}

function Photo({ label, ratio = '4 / 3', tone = 'mint', style }) {
  const bg = tone === 'mint' ? 'var(--gradient-mint)' : 'var(--si-gray-100)';
  return <div style={{ aspectRatio: ratio, background: bg, borderRadius: 'var(--radius-2xl)', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24, border: '1px dashed var(--si-emerald-300)', ...style }}>
    <span style={{ font: 'var(--type-label)', color: 'var(--si-emerald-600)' }}>Placeholder de imagem<br /><span style={{ fontWeight: 'var(--weight-regular)', color: 'var(--text-muted)' }}>{label}</span></span>
  </div>;
}

function LandingNav() {
  const { Logo, Button } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(248,249,254,.82)', backdropFilter: 'var(--blur-glass)', borderBottom: '1px solid var(--border-subtle)' }}>
    <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '14px var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
      <Logo size={30} src="../../assets/logo-si-mark.png" />
      <nav style={{ display: 'flex', gap: 'var(--space-6)', marginLeft: 'auto', font: 'var(--type-label)' }}>
        <a href="#como" style={{ color: 'var(--text-secondary)' }}>Como funciona</a>
        <a href="#resultados" style={{ color: 'var(--text-secondary)' }}>Resultados</a>
        <a href="#planos" style={{ color: 'var(--text-secondary)' }}>Planos</a>
        <a href="#duvidas" style={{ color: 'var(--text-secondary)' }}>Dúvidas</a>
      </nav>
      <Button size="sm" iconAfter="arrow-right">Agendar demonstração</Button>
    </div>
  </header>;
}

function LandingFooter() {
  const { Logo } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return <footer style={{ background: 'var(--si-black)', color: 'var(--si-white)', padding: 'var(--space-16) var(--space-6) var(--space-8)' }}>
    <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(220px,1.2fr) repeat(3, minmax(120px,1fr))', gap: 'var(--space-8)' }}>
      <div>
        <Logo size={30} variant="light" src="../../assets/logo-si-mark.png" />
        <p style={{ font: 'var(--type-body)', color: 'rgba(255,255,255,.62)', marginTop: 16, maxWidth: '34ch' }}>
          Recepcionista de IA no WhatsApp para clínicas. Um produto Sapient.IA.
        </p>
      </div>
      {[['Produto', ['Como funciona', 'Planos', 'Painel do cliente']], ['Empresa', ['Sapient.IA', 'Contato', 'Trabalhe com a gente']], ['Legal', ['Termos de uso', 'Privacidade', 'LGPD']]].map(([t, links]) => (
        <div key={t}>
          <p style={{ font: 'var(--type-label)', marginBottom: 12 }}>{t}</p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {links.map(l => <li key={l}><a href="#" style={{ font: 'var(--type-body)', color: 'rgba(255,255,255,.62)' }}>{l}</a></li>)}
          </ul>
        </div>
      ))}
    </div>
    <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', marginTop: 'var(--space-12)', paddingTop: 'var(--space-5)', borderTop: '1px solid rgba(255,255,255,.14)', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', font: 'var(--type-caption)', fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,.5)' }}>
      <span>© 2026 Secretária Invisível · Sapient.IA</span>
      <span>secretariainvisivel.com.br</span>
    </div>
  </footer>;
}

Object.assign(window, { Blobs, Photo, LandingNav, LandingFooter });

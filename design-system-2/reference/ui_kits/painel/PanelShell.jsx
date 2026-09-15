const NAV = [
  { id: 'visao', label: 'Visão geral', icon: 'layout-dashboard' },
  { id: 'conversas', label: 'Conversas', icon: 'message-circle', badge: 8 },
  { id: 'agenda', label: 'Agenda', icon: 'calendar-days' },
  { id: 'pacientes', label: 'Pacientes', icon: 'users' },
  { id: 'automacoes', label: 'Automações', icon: 'workflow' },
  { id: 'relatorios', label: 'Relatórios', icon: 'bar-chart-3' },
  { id: 'ajustes', label: 'Ajustes', icon: 'settings' },
];

function PanelShell({ view, onView, title, subtitle, actions, children }) {
  const { SidebarNav, TopBar, IconButton, Button } = window.SecretRiaInvisVelDesignSystem_fc77d1;
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-page)' }}>
      <SidebarNav items={NAV} activeId={view} onSelect={onView}
        logoSrc="../../assets/logo-si-mark.png"
        user={{ name: 'Clínica Vida', meta: 'Ver perfil' }} />
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <TopBar title={title} subtitle={subtitle} meta="26 de junho de 2026"
          actions={<>{actions}<IconButton icon="bell" label="Notificações" /><Button icon="plus">Novo agendamento</Button></>} />
        <div style={{ padding: '0 var(--space-8) var(--space-10)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {children}
        </div>
      </main>
    </div>
  );
}

Object.assign(window, { PanelShell, PANEL_NAV: NAV });

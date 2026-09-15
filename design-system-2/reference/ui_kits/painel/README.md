# UI kit — Painel do cliente

Recreation of the clinic-facing panel, built on the same layout the reference dashboard uses: white left rail, Ghost White canvas, one card grid, whisper-quiet shadows.

`index.html` is clickable: the sidebar switches between four built screens.

| File | Screen |
| --- | --- |
| `PanelShell.jsx` | Sidebar + page header chrome shared by every view |
| `OverviewScreen.jsx` | Visão geral — metric tiles, confirmation donut, volume chart, AI insight, recent conversations, next appointments |
| `InboxScreen.jsx` | Conversas — thread list, WhatsApp conversation, patient/handover rail |
| `AgendaScreen.jsx` | Agenda — week columns with appointments and open slots |
| `ReportsScreen.jsx` | Relatórios — recovered revenue, weekly trend, booking sources, sent reports |

Pacientes, Automações and Ajustes are intentionally left as blank placeholders — the reference material does not define them.

Everything is composed from `window.SecretRiaInvisVelDesignSystem_fc77d1`; no component is reimplemented here.

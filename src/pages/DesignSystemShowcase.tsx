import { useState } from "react";

import "../../design-system-2/tokens/index.css";
import {
  AgendaDay,
  AppointmentCard,
  Avatar,
  Badge,
  Button,
  Card,
  ChatBubble,
  ChatThread,
  Checkbox,
  EmptySlot,
  IconButton,
  Input,
  InsightCard,
  ListRow,
  Logo,
  MetricCard,
  Radio,
  ScoreDonut,
  SectionLabel,
  Select,
  SidebarNav,
  Switch,
  Tabs,
  Tag,
  TopBar,
  TrendChart,
} from "../../design-system-2";

const BUTTON_VARIANTS = ["primary", "secondary", "outline", "ghost", "dark", "inverse"] as const;
const BADGE_TONES = ["neutral", "brand", "good", "warn", "alert", "info", "ink"] as const;
const CARD_TONES = ["plain", "outline", "mint", "gradient", "ink", "dark"] as const;

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <SectionLabel number={number} className="mb-4">
        {title}
      </SectionLabel>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2.5 text-[var(--text-xs)] uppercase tracking-[var(--tracking-caps)] text-[var(--text-muted)]">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/**
 * Renders the whole design-system-2/ library: every component, its states and
 * variants, in both themes. See design-system-2/README.md for the library map.
 */
export default function DesignSystemShowcase() {
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState("overview");
  const [checked, setChecked] = useState(true);
  const [switchOn, setSwitchOn] = useState(true);

  return (
    <div className={`ds-root min-h-screen ${dark ? "dark" : ""}`} style={{ background: "var(--surface-page)" }}>
      <header
        className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4"
        style={{ background: "var(--surface-page)", borderColor: "var(--border-subtle)" }}
      >
        <Logo size={30} />
        <div className="flex items-center gap-3">
          <span className="text-[var(--text-sm)] text-[var(--text-secondary)]">{dark ? "Dark" : "Light"}</span>
          <Switch checked={dark} onChange={(e) => setDark(e.target.checked)} label="Tema escuro" />
        </div>
      </header>

      <main className="mx-auto max-w-[var(--content-max)] px-6 py-12">
        <h1 className="mb-2 font-[var(--weight-medium)] tracking-[var(--tracking-display)]" style={{ font: "var(--type-display)" }}>
          Design system
        </h1>
        <p className="mb-12 max-w-[var(--prose-max)] text-[var(--text-body-lg)] text-[var(--text-secondary)]">
          Secretária Invisível · biblioteca completa — componentes, variantes e estados, nos dois temas. Fonte:{" "}
          <code className="text-[var(--text-sm)]">design-system-2/</code>. Contrato de tokens em{" "}
          <code className="text-[var(--text-sm)]">DESIGN.md</code>.
        </p>

        {/* ---- Core ---- */}
        <Section number="01" title="Core">
          <Row label="Button — variant">
            {BUTTON_VARIANTS.map((v) => (
              <Button key={v} variant={v}>
                {v}
              </Button>
            ))}
          </Row>
          <Row label="Button — size">
            <Button size="sm">Pequeno</Button>
            <Button size="md">Médio</Button>
            <Button size="lg">Grande</Button>
          </Row>
          <Row label="Button — icon, loading, disabled">
            <Button icon="calendar">Agendar</Button>
            <Button iconAfter="arrow-right">Continuar</Button>
            <Button loading>Enviando</Button>
            <Button disabled>Indisponível</Button>
          </Row>
          <Row label="Badge — tone">
            {BADGE_TONES.map((t) => (
              <Badge key={t} tone={t} dot>
                {t}
              </Badge>
            ))}
          </Row>
          <Row label="Badge — icon">
            <Badge tone="good" icon="check">
              Confirmado
            </Badge>
            <Badge tone="alert" icon="x">
              Cancelado
            </Badge>
          </Row>
          <Row label="Tag — default, selected, removable">
            <Tag>Cardiologia</Tag>
            <Tag selected>Selecionado</Tag>
            <Tag onRemove={() => {}}>Removível</Tag>
          </Row>
          <Row label="Avatar — tone & size">
            <Avatar name="Ana Souza" tone="mint" size="sm" />
            <Avatar name="Ana Souza" tone="ink" size="md" />
            <Avatar name="Ana Souza" tone="gray" size="lg" />
          </Row>
          <Row label="IconButton — variant & active">
            <IconButton icon="calendar" label="Agenda" variant="ghost" />
            <IconButton icon="calendar" label="Agenda" variant="outline" />
            <IconButton icon="calendar" label="Agenda" variant="filled" />
            <IconButton icon="calendar" label="Agenda" variant="ghost" active />
          </Row>
          <Row label="Logo — dark / light variant">
            <Logo variant="dark" />
            <span className="rounded-[var(--radius-md)] p-3" style={{ background: "var(--surface-ink)" }}>
              <Logo variant="light" />
            </span>
          </Row>
          <Row label="Card — tone">
            {CARD_TONES.map((t) => (
              <Card key={t} tone={t} title="Retenção" subtitle="Últimos 30 dias" className="w-56">
                <p className="text-[var(--text-sm)]">82% das confirmações sem intervenção.</p>
              </Card>
            ))}
          </Row>
        </Section>

        {/* ---- Forms ---- */}
        <Section number="02" title="Forms">
          <Row label="Input — default, icon, error, disabled">
            <Input label="Nome" placeholder="Maria Silva" className="w-56" />
            <Input label="Buscar" icon="calendar" placeholder="Data" className="w-56" />
            <Input label="E-mail" defaultValue="invalido" error="E-mail inválido" className="w-56" />
            <Input label="Bloqueado" disabled placeholder="—" className="w-56" />
          </Row>
          <Row label="Select">
            <Select label="Profissional" options={["Dra. Ana", "Dr. Marcos", "Dra. Julia"]} className="w-56" />
          </Row>
          <Row label="Checkbox — checked, unchecked, description, disabled">
            <Checkbox label="Confirmado" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            <Checkbox label="Notificar por WhatsApp" description="Envia lembrete 1h antes" checked={!checked} onChange={() => {}} />
            <Checkbox label="Indisponível" disabled />
          </Row>
          <Row label="Radio — group">
            <Radio name="canal" label="WhatsApp" checked readOnly />
            <Radio name="canal" label="Telefone" checked={false} readOnly />
          </Row>
          <Row label="Switch — on, off, disabled">
            <Switch label="Ativo" checked={switchOn} onChange={(e) => setSwitchOn(e.target.checked)} />
            <Switch label="Inativo" checked={false} onChange={() => {}} />
            <Switch label="Bloqueado" checked disabled onChange={() => {}} />
          </Row>
        </Section>

        {/* ---- Navigation ---- */}
        <Section number="03" title="Navigation">
          <div className="flex overflow-hidden rounded-[var(--radius-xl)] border" style={{ borderColor: "var(--border-subtle)" }}>
            <SidebarNav
              activeId="agenda"
              items={[
                { id: "overview", label: "Visão geral", icon: "trending-up" },
                { id: "agenda", label: "Agenda", icon: "calendar", badge: 4 },
                { id: "inbox", label: "Conversas", icon: "message-circle" },
              ]}
              user={{ name: "Dra. Ana Souza", meta: "Clínica Vitta" }}
            />
            <div className="flex-1">
              <TopBar title="Agenda" subtitle="Terça-feira, 16 de junho" meta="Hoje" actions={<Button size="sm">Novo horário</Button>} />
              <div className="px-8 pb-8">
                <Tabs tabs={[{ id: "overview", label: "Visão geral" }, { id: "week", label: "Semana" }]} activeId={tab} onSelect={setTab} />
              </div>
            </div>
          </div>
        </Section>

        {/* ---- Data ---- */}
        <Section number="04" title="Data">
          <Row label="MetricCard">
            <MetricCard label="Tempo médio de resposta" icon="trending-down" value="11s" status="Dentro da meta" delta="-38%" className="w-64" />
            <MetricCard label="Confirmações automáticas" icon="trending-up" iconTone="info" value="82" unit="%" delta="+6%" className="w-64" />
          </Row>
          <Row label="ScoreDonut">
            <ScoreDonut value={82} label="82%" />
            <ScoreDonut value={34} label="34%" />
          </Row>
          <Row label="TrendChart — light / dark">
            <div className="w-72">
              <TrendChart data={[4, 7, 6, 9, 8, 12, 11]} xLabels={["S", "T", "Q", "Q", "S", "S", "D"]} tone="light" />
            </div>
            <div className="w-72 rounded-[var(--radius-xl)] p-4" style={{ background: "var(--surface-dark)" }}>
              <TrendChart data={[4, 7, 6, 9, 8, 12, 11]} tone="dark" />
            </div>
          </Row>
          <Row label="ListRow — static, clickable">
            <div className="w-72">
              <ListRow icon="message-circle" iconTone="info" title="Maria Silva" meta="Sem resposta há 2 dias" />
              <ListRow icon="calendar" iconTone="good" title="Consulta remarcada" meta="Quinta, 09:00" onClick={() => {}} />
            </div>
          </Row>
          <Row label="InsightCard">
            <InsightCard
              title="Faltas caíram 76% este mês"
              body="4% de faltas · antes: 17%. Continue confirmando por WhatsApp na véspera."
              cta="Ver relatório"
              className="w-96"
            />
          </Row>
          <Row label="EmptySlot">
            <div className="w-72">
              <EmptySlot time="14:00" onClick={() => {}} />
            </div>
          </Row>
        </Section>

        {/* ---- Product ---- */}
        <Section number="05" title="Product">
          <Row label="ChatThread + ChatBubble (in, out, system, quick replies)">
            <div className="h-80 w-80">
              <ChatThread contact={{ name: "Maria Silva", status: "online" }}>
                <ChatBubble direction="in" time="09:12">
                  Oi, gostaria de remarcar minha consulta
                </ChatBubble>
                <ChatBubble direction="out" time="09:12" status="read" quick={["Amanhã 10h", "Quinta 14h"]}>
                  Claro! Temos esses horários disponíveis
                </ChatBubble>
                <ChatBubble direction="system">Agenda atualizada automaticamente</ChatBubble>
              </ChatThread>
            </div>
          </Row>
          <Row label="AppointmentCard — estados">
            <div className="flex w-96 flex-col gap-2">
              <AppointmentCard time="09:00" duration="30 min" patient="Maria Silva" professional="Dra. Ana" service="Retorno" state="confirmado" />
              <AppointmentCard time="10:00" patient="João Pedro" service="Avaliação" state="pendente" compact />
              <AppointmentCard time="11:00" patient="Carla Dias" service="Retorno" state="remarcado" compact />
              <AppointmentCard time="14:00" patient="Rafael Nunes" service="Avaliação" state="cancelado" compact />
            </div>
          </Row>
          <Row label="AgendaDay — hoje, com horário livre">
            <div className="w-64">
              <AgendaDay weekday="Ter" date="16/06" today occupancy="6/8">
                <AppointmentCard time="09:00" patient="Maria Silva" service="Retorno" state="confirmado" compact />
                <EmptySlot time="10:00" onClick={() => {}} />
              </AgendaDay>
            </div>
          </Row>
        </Section>
      </main>
    </div>
  );
}

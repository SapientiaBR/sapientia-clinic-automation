import * as React from "react";

import { cn } from "@/lib/utils";
import { Badge } from "../core/Badge";
import { Icon } from "../core/Icon";

const STATE: Record<string, ["good" | "warn" | "info" | "alert", string]> = {
  confirmado: ["good", "Confirmado"],
  pendente: ["warn", "Aguardando confirmação"],
  remarcado: ["info", "Remarcado"],
  cancelado: ["alert", "Cancelado"],
};

const KEEL: Record<string, string> = {
  good: "var(--si-emerald-600)",
  warn: "var(--si-status-warn)",
  alert: "var(--si-status-alert)",
  info: "var(--si-status-info)",
};

export interface AppointmentCardProps extends React.HTMLAttributes<HTMLElement> {
  time?: React.ReactNode;
  duration?: React.ReactNode;
  patient?: React.ReactNode;
  professional?: React.ReactNode;
  service?: React.ReactNode;
  state?: "confirmado" | "pendente" | "remarcado" | "cancelado";
  channel?: React.ReactNode;
  compact?: boolean;
}

/** The 3px status keel is the only coloured edge in the system — it always encodes a status, never decoration. */
export function AppointmentCard({
  className,
  time,
  duration,
  patient,
  professional,
  service,
  state = "confirmado",
  channel = "WhatsApp",
  compact,
  ...props
}: AppointmentCardProps) {
  const [tone, label] = STATE[state] ?? STATE.confirmado;
  return (
    <article
      className={cn(
        "flex gap-3.5 rounded-[var(--radius-lg)] border-l-[3px] bg-[var(--surface-card)] shadow-[var(--shadow-xs)]",
        compact ? "px-3.5 py-3" : "p-[var(--card-pad)]",
        className,
      )}
      style={{ borderLeftColor: KEEL[tone] }}
      {...props}
    >
      <div className="min-w-[62px]">
        <p className="font-[var(--weight-bold)] leading-[1.1] text-[var(--text-h5)]">{time}</p>
        {duration && <p className="mt-0.5 text-[var(--text-xs)] text-[var(--text-muted)]">{duration}</p>}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-[var(--weight-medium)] text-[var(--text-body)]">{patient}</p>
          <Badge tone={tone} dot>
            {label}
          </Badge>
        </div>
        <p className="mt-1 text-[var(--text-sm)] text-[var(--text-secondary)]">{[service, professional].filter(Boolean).join(" · ")}</p>
        {channel && (
          <p className="mt-2 inline-flex items-center gap-1 text-[var(--text-xs)] text-[var(--text-muted)]">
            <Icon name="message-circle" size={13} />
            agendado por {channel}
          </p>
        )}
      </div>
    </article>
  );
}

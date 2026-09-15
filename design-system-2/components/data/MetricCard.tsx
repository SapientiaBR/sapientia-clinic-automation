import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon, type IconName } from "../core/Icon";

const DOT: Record<string, string> = {
  good: "var(--si-status-good)",
  warn: "var(--si-status-warn)",
  alert: "var(--si-status-alert)",
  info: "var(--si-status-info)",
  activity: "var(--si-status-activity)",
};

export interface MetricCardProps extends React.HTMLAttributes<HTMLElement> {
  label?: React.ReactNode;
  icon?: IconName | string;
  iconTone?: "good" | "warn" | "alert" | "info" | "activity";
  value?: React.ReactNode;
  unit?: React.ReactNode;
  status?: React.ReactNode;
  statusTone?: "good" | "warn" | "alert" | "info" | "activity";
  delta?: string;
  aside?: React.ReactNode;
}

export function MetricCard({
  className,
  label,
  icon,
  iconTone = "good",
  value,
  unit,
  status,
  statusTone = "good",
  delta,
  aside,
  ...props
}: MetricCardProps) {
  return (
    <section
      className={cn("flex flex-col gap-2.5 rounded-[var(--radius-xl)] bg-[var(--surface-card)] p-[var(--card-pad)] shadow-[var(--shadow-sm)]", className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--text-secondary)]">
          {icon && <Icon name={icon} size={16} color={DOT[iconTone]} />}
          {label}
        </span>
        {aside}
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className="font-[var(--weight-bold)] leading-none tracking-[var(--tracking-heading)]"
          style={{ font: "var(--weight-bold) var(--text-h2) / 1 var(--font-display)" }}
        >
          {value}
        </span>
        {unit && <span className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--text-secondary)]">{unit}</span>}
      </div>
      {(status || delta) && (
        <div className="flex items-center gap-3">
          {status && (
            <span className="inline-flex items-center gap-1.5 text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--text-primary)]">
              <span className="h-[7px] w-[7px] rounded-full" style={{ background: DOT[statusTone] }} />
              {status}
            </span>
          )}
          {delta && (
            <span className="inline-flex items-center gap-1 text-[var(--text-xs)] text-[var(--text-secondary)]">
              <Icon name={delta.trim().startsWith("-") ? "trending-down" : "trending-up"} size={13} />
              {delta}
            </span>
          )}
        </div>
      )}
    </section>
  );
}

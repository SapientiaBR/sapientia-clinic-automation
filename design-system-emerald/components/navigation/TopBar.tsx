import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "../core/Icon";

export interface TopBarProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
}

export function TopBar({ className, title, subtitle, meta, actions, ...props }: TopBarProps) {
  return (
    <header className={cn("flex items-start justify-between gap-6 px-8 py-6", className)} {...props}>
      <div>
        {title && <h2 className="font-[var(--weight-bold)] text-[var(--text-h3)]">{title}</h2>}
        {subtitle && <p className="mt-1 text-[var(--text-body)] text-[var(--text-secondary)]">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {meta && (
          <span className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3.5 py-2.5 text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--text-secondary)]">
            <Icon name="calendar" size={16} />
            {meta}
            <Icon name="chevron-down" size={14} />
          </span>
        )}
        {actions}
      </div>
    </header>
  );
}

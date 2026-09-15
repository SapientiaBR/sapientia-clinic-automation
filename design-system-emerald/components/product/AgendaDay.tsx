import * as React from "react";

import { cn } from "@/lib/utils";

export interface AgendaDayProps extends React.HTMLAttributes<HTMLElement> {
  weekday?: React.ReactNode;
  date?: React.ReactNode;
  today?: boolean;
  occupancy?: React.ReactNode;
}

/** Day column for the agenda view. Empty slots (EmptySlot) stay visible inside so gaps read as opportunity, not absence. */
export function AgendaDay({ className, weekday, date, today, occupancy, children, ...props }: AgendaDayProps) {
  return (
    <section className={cn("flex min-w-0 flex-col gap-2.5", className)} {...props}>
      <header
        className={cn(
          "flex items-center justify-between gap-2 rounded-[var(--radius-md)] px-3 py-2.5 text-[var(--text-sm)]",
          today
            ? "border border-transparent bg-[var(--si-emerald-700)] text-[var(--si-white)]"
            : "border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-primary)]",
        )}
      >
        <span>
          {weekday}
          <span className="opacity-60"> {date}</span>
        </span>
        {occupancy != null && <span className={cn("text-[var(--text-xs)]", today ? "opacity-85" : "opacity-60")}>{occupancy}</span>}
      </header>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}

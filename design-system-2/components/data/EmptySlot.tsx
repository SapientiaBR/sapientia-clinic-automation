import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "../core/Icon";

export interface EmptySlotProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  time?: React.ReactNode;
  label?: React.ReactNode;
}

/** The empty state for a schedule slot — a dashed, clickable placeholder, not a blank gap. */
export function EmptySlot({ className, time, label = "Horário livre", ...props }: EmptySlotProps) {
  return (
    <button
      type="button"
      className={cn(
        "group flex w-full items-center gap-2.5 rounded-[var(--radius-lg)] px-3.5 py-3 text-left",
        "border border-dashed border-[var(--border-strong)] text-[var(--text-muted)]",
        "text-[var(--text-sm)] font-[var(--weight-medium)] transition-[var(--transition-control)]",
        "hover:border-[var(--si-emerald-400)] hover:bg-[var(--si-emerald-050)]",
        className,
      )}
      {...props}
    >
      {time && <span className="min-w-[48px] text-[var(--text-secondary)]">{time}</span>}
      <Icon name="plus" size={15} />
      <span>{label}</span>
    </button>
  );
}

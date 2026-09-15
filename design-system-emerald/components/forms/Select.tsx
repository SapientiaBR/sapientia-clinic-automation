import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "../core/Icon";

export type SelectOption = string | { value: string; label: string };

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  options?: SelectOption[];
}

/** States: default, focus (ring), disabled. Native <select> — no custom listbox needed. */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, options = [], disabled, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--text-primary)]">{label}</label>}
      <div
        className={cn(
          "relative flex items-center rounded-[var(--radius-md)] border bg-[var(--surface-card)]",
          "transition-[var(--transition-control)] focus-within:shadow-[0_0_0_3px_var(--focus-ring)]",
          "border-[var(--border-subtle)] focus-within:border-[var(--si-emerald-700)]",
          disabled && "opacity-40",
        )}
      >
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full cursor-pointer appearance-none border-0 bg-transparent py-[11px] pl-3 pr-9",
            "text-[var(--text-body)] text-[var(--text-primary)] outline-none disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        >
          {options.map((o) =>
            typeof o === "string" ? (
              <option key={o} value={o}>
                {o}
              </option>
            ) : (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ),
          )}
        </select>
        <Icon name="chevron-down" size={16} color="var(--text-muted)" className="pointer-events-none absolute right-3" />
      </div>
      {hint && <span className="text-[var(--text-sm)] text-[var(--text-muted)]">{hint}</span>}
    </div>
  ),
);
Select.displayName = "Select";

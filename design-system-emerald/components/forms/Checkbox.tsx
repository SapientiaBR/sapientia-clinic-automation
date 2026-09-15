import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "../core/Icon";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

/** States: unchecked, checked, disabled, focus (via native input focus ring). */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, checked, disabled, ...props }, ref) => (
    <label
      className={cn(
        "flex gap-2.5",
        description ? "items-start" : "items-center",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
    >
      <input ref={ref} type="checkbox" checked={checked} disabled={disabled} className="peer sr-only" {...props} />
      <span
        className={cn(
          "grid h-5 w-5 shrink-0 place-items-center rounded-[var(--radius-xs)] border text-[var(--si-white)]",
          "transition-[var(--transition-control)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--focus-ring)]",
          checked ? "border-[var(--si-emerald-700)] bg-[var(--si-emerald-700)]" : "border-[var(--border-strong)] bg-[var(--surface-card)]",
          description && "mt-0.5",
        )}
      >
        {checked && <Icon name="check" size={13} />}
      </span>
      <span>
        <span className="text-[var(--text-body)] text-[var(--text-primary)]">{label}</span>
        {description && <span className="mt-0.5 block text-[var(--text-sm)] text-[var(--text-secondary)]">{description}</span>}
      </span>
    </label>
  ),
);
Checkbox.displayName = "Checkbox";

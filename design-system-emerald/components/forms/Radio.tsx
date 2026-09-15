import * as React from "react";

import { cn } from "@/lib/utils";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

/** States: unchecked, checked, disabled, focus (via native input focus ring). */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, checked, disabled, ...props }, ref) => (
    <label
      className={cn(
        "flex gap-2.5",
        description ? "items-start" : "items-center",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
    >
      <input ref={ref} type="radio" checked={checked} disabled={disabled} className="peer sr-only" {...props} />
      <span
        className={cn(
          "grid h-5 w-5 shrink-0 place-items-center rounded-full border bg-[var(--surface-card)]",
          "transition-[var(--transition-control)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--focus-ring)]",
          checked ? "border-[var(--si-emerald-700)]" : "border-[var(--border-strong)]",
          description && "mt-0.5",
        )}
      >
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-[var(--si-emerald-700)]" />}
      </span>
      <span>
        <span className="text-[var(--text-body)] text-[var(--text-primary)]">{label}</span>
        {description && <span className="mt-0.5 block text-[var(--text-sm)] text-[var(--text-secondary)]">{description}</span>}
      </span>
    </label>
  ),
);
Radio.displayName = "Radio";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}

/** States: off, on, disabled, focus (via native input focus ring). */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, checked, disabled, ...props }, ref) => (
    <label className={cn("inline-flex items-center gap-2.5", disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer", className)}>
      <input ref={ref} type="checkbox" role="switch" checked={checked} disabled={disabled} className="peer sr-only" {...props} />
      <span
        className={cn(
          "flex h-6 w-[42px] shrink-0 rounded-[var(--radius-pill)] p-[3px] transition-colors duration-[var(--duration-base)]",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--focus-ring)]",
          checked ? "justify-end bg-[var(--si-emerald-700)]" : "justify-start bg-[var(--si-gray-300)]",
        )}
      >
        <span className="h-[18px] w-[18px] rounded-full bg-[var(--si-white)] shadow-[var(--shadow-xs)] transition-transform duration-[var(--duration-base)]" />
      </span>
      {label && <span className="text-[var(--text-body)] text-[var(--text-primary)]">{label}</span>}
    </label>
  ),
);
Switch.displayName = "Switch";

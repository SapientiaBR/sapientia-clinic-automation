import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon, type IconName } from "../core/Icon";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  icon?: IconName | string;
}

/** States: default, focus (ring), error, disabled. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, icon, id, disabled, ...props }, ref) => {
    const inputId = id ?? (typeof props.name === "string" ? props.name : undefined);
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--text-primary)]">
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex items-center gap-2 rounded-[var(--radius-md)] border bg-[var(--surface-card)] px-3",
            "transition-[var(--transition-control)] focus-within:shadow-[0_0_0_3px_var(--focus-ring)]",
            error
              ? "border-[var(--si-status-alert)]"
              : "border-[var(--border-subtle)] focus-within:border-[var(--si-emerald-700)]",
            disabled && "opacity-40",
          )}
        >
          {icon && <Icon name={icon} size={16} color="var(--text-muted)" />}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={cn(
              "min-w-0 flex-1 border-0 bg-transparent py-[11px] text-[var(--text-body)] text-[var(--text-primary)] outline-none",
              "placeholder:text-[var(--text-muted)] disabled:cursor-not-allowed",
              className,
            )}
            {...props}
          />
        </div>
        {(hint || error) && (
          <span className={cn("text-[var(--text-sm)]", error ? "text-[var(--si-status-alert)]" : "text-[var(--text-muted)]")}>
            {error ?? hint}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

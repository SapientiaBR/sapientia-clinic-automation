import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

const BOX = { sm: 32, md: 38, lg: 44 } as const;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName | string;
  variant?: "ghost" | "outline" | "filled";
  size?: "sm" | "md" | "lg";
  label: string;
  active?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, variant = "ghost", size = "md", label, active, disabled, ...props }, ref) => {
    const box = BOX[size];
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        disabled={disabled}
        className={cn(
          "grid place-items-center rounded-[var(--radius-md)] border border-transparent transition-[var(--transition-control)]",
          "disabled:pointer-events-none disabled:opacity-40",
          variant === "filled" &&
            "bg-[var(--si-emerald-700)] text-[var(--si-white)] hover:bg-[var(--si-emerald-800)]",
          variant === "outline" &&
            "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--si-gray-100)]",
          variant === "ghost" &&
            cn("text-[var(--text-secondary)]", active ? "bg-[var(--si-mint)] text-[var(--si-emerald-700)]" : "hover:bg-[var(--si-gray-100)]"),
          className,
        )}
        style={{ width: box, height: box }}
        {...props}
      >
        <Icon name={icon} size={size === "sm" ? 16 : 20} />
      </button>
    );
  },
);
IconButton.displayName = "IconButton";

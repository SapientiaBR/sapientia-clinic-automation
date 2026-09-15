import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/**
 * States: default, hover, active (press scale), focus-visible, disabled,
 * loading (added — the export has no loading affordance, but every button
 * that fires an async action needs one; matches the Radix/shadcn pattern
 * already used elsewhere in this project).
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-[var(--radius-md)] font-[var(--weight-medium)]",
    "transition-[var(--transition-control)] active:scale-[0.985]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)] hover:bg-[var(--action-primary-bg-hover)] focus-visible:ring-[var(--focus-ring)]",
        secondary:
          "bg-[var(--action-secondary-bg)] text-[var(--action-secondary-fg)] hover:bg-[var(--si-emerald-200)] focus-visible:ring-[var(--focus-ring)]",
        outline:
          "bg-transparent text-[var(--si-emerald-700)] border border-[var(--border-ink)] hover:bg-[var(--si-emerald-050)] focus-visible:ring-[var(--focus-ring)]",
        ghost:
          "bg-transparent text-[var(--text-primary)] hover:bg-[var(--si-gray-100)] focus-visible:ring-[var(--focus-ring)]",
        dark:
          "bg-[var(--action-dark-bg)] text-[var(--si-white)] hover:bg-[#171717] focus-visible:ring-[var(--focus-ring)]",
        inverse:
          "bg-[var(--si-white)] text-[var(--si-emerald-700)] hover:bg-[var(--si-mint)] focus-visible:ring-[var(--focus-ring)]",
      },
      size: {
        sm: "h-9 px-[14px] text-[var(--text-sm)]",
        md: "h-11 px-[18px] text-[var(--text-body)]",
        lg: "h-[52px] px-6 text-[var(--text-body-lg)]",
      },
      fullWidth: {
        true: "flex w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {
  icon?: IconName | string;
  iconAfter?: IconName | string;
  loading?: boolean;
  disabled?: boolean;
}

const ICON_SIZE = { sm: 16, md: 16, lg: 20 } as const;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size = "md", fullWidth, icon, iconAfter, loading, disabled, children, ...props }, ref) => {
    const iconSize = ICON_SIZE[size ?? "md"];
    return (
      <button
        type="button"
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...props}
      >
        {loading ? (
          <Loader2 aria-hidden="true" width={iconSize} height={iconSize} className="animate-spin" />
        ) : (
          icon && <Icon name={icon} size={iconSize} />
        )}
        {children}
        {!loading && iconAfter && <Icon name={iconAfter} size={iconSize} />}
      </button>
    );
  },
);
Button.displayName = "Button";

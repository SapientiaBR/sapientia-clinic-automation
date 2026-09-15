import * as React from "react";

import { cn } from "@/lib/utils";

const TONE_CLASS: Record<string, string> = {
  plain: "bg-[var(--surface-card)] text-[var(--text-primary)] shadow-[var(--shadow-sm)]",
  outline: "bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-subtle)]",
  mint: "bg-[var(--surface-mint)] text-[var(--si-emerald-900)]",
  gradient: "text-[var(--si-emerald-900)] [background:var(--gradient-mint)]",
  ink: "bg-[var(--surface-ink)] text-[var(--text-on-ink)]",
  dark: "text-[var(--text-on-ink)] [background:var(--gradient-ink)]",
};

const PADDING_CLASS: Record<string, string> = {
  none: "p-0",
  sm: "p-[var(--space-4)]",
  md: "p-[var(--card-pad)]",
  lg: "p-[var(--card-pad-lg)]",
};

const RADIUS_CLASS: Record<string, string> = {
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
  "2xl": "rounded-[var(--radius-2xl)]",
  "3xl": "rounded-[var(--radius-3xl)]",
};

export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  tone?: "plain" | "outline" | "mint" | "gradient" | "ink" | "dark";
  padding?: "none" | "sm" | "md" | "lg";
  radius?: "md" | "lg" | "xl" | "2xl" | "3xl";
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export const Card = React.forwardRef<HTMLElement, CardProps>(
  ({ className, tone = "plain", padding = "md", radius = "xl", title, subtitle, action, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(TONE_CLASS[tone], PADDING_CLASS[padding], RADIUS_CLASS[radius], className)}
      {...props}
    >
      {(title || action) && (
        <header className={cn("flex items-start justify-between gap-3", subtitle ? "mb-1" : "mb-3.5")}>
          <div>
            {title && <h4 className="font-[var(--weight-bold)] text-[var(--text-h5)] tracking-[var(--tracking-heading)]">{title}</h4>}
            {subtitle && (
              <p
                className={cn(
                  "mt-0.5 text-[var(--text-sm)]",
                  tone === "ink" || tone === "dark" ? "text-[var(--text-on-ink-muted)]" : "text-[var(--text-secondary)]",
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  ),
);
Card.displayName = "Card";

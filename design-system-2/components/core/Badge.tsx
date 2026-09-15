import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

const TONE_CLASS: Record<string, string> = {
  neutral: "bg-[var(--si-gray-100)] text-[var(--text-secondary)]",
  brand: "bg-[var(--si-mint)] text-[var(--si-emerald-700)]",
  good: "bg-[var(--si-tint-good)] text-[#1C7A55]",
  warn: "bg-[var(--si-tint-warn)] text-[#9A6412]",
  alert: "bg-[var(--si-tint-alert)] text-[#A8352D]",
  info: "bg-[var(--si-tint-info)] text-[#4A3AC4]",
  ink: "bg-[var(--si-emerald-700)] text-[var(--si-white)]",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "brand" | "good" | "warn" | "alert" | "info" | "ink";
  icon?: IconName | string;
  dot?: boolean;
}

export function Badge({ className, tone = "neutral", icon, dot, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-pill)] px-2.5 py-1",
        "text-[var(--text-sm)] font-[var(--weight-medium)]",
        TONE_CLASS[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}

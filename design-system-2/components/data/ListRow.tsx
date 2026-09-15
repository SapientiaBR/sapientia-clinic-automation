import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon, type IconName } from "../core/Icon";

const TINT: Record<string, string> = {
  good: "var(--si-tint-good)",
  warn: "var(--si-tint-warn)",
  alert: "var(--si-tint-alert)",
  info: "var(--si-tint-info)",
  neutral: "var(--si-gray-100)",
};
const INK: Record<string, string> = {
  good: "#1C7A55",
  warn: "#9A6412",
  alert: "#A8352D",
  info: "#4A3AC4",
  neutral: "var(--text-secondary)",
};

export interface ListRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: IconName | string;
  iconTone?: "good" | "warn" | "alert" | "info" | "neutral";
  leading?: React.ReactNode;
  title?: React.ReactNode;
  meta?: React.ReactNode;
  trailing?: React.ReactNode;
  chevron?: boolean;
  onClick?: () => void;
}

/** States: default, hover (only when clickable). */
export function ListRow({ className, icon, iconTone = "good", leading, title, meta, trailing, chevron = true, onClick, ...props }: ListRowProps) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-[var(--radius-md)] px-2 py-2.5 transition-[var(--transition-control)]",
        onClick ? "cursor-pointer hover:bg-[var(--si-gray-100)]" : "cursor-default",
        className,
      )}
      {...props}
    >
      {leading ??
        (icon && (
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[var(--radius-sm)]"
            style={{ background: TINT[iconTone], color: INK[iconTone] }}
          >
            <Icon name={icon} size={18} />
          </span>
        ))}
      <div className="min-w-0 flex-1">
        <p className="truncate font-[var(--weight-bold)] text-[var(--text-sm)] text-[var(--text-primary)]">{title}</p>
        {meta && <p className="mt-0.5 text-[var(--text-xs)] text-[var(--text-secondary)]">{meta}</p>}
      </div>
      {trailing}
      {chevron && <Icon name="chevron-right" size={16} color="var(--si-gray-400)" />}
    </div>
  );
}

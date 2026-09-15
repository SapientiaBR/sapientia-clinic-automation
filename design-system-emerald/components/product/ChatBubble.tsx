import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "../core/Icon";

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLElement> {
  direction?: "in" | "out" | "system";
  time?: React.ReactNode;
  status?: "sent" | "read";
  quick?: string[];
}

/** WhatsApp-shaped message bubble. "in" = patient (white), "out" = the invisible secretary (mint), "system" = centred automation note. */
export function ChatBubble({ className, direction = "in", children, time, status = "read", quick, ...props }: ChatBubbleProps) {
  if (direction === "system") {
    return (
      <p
        className={cn(
          "self-center max-w-[80%] rounded-[var(--radius-sm)] bg-[var(--surface-card)] px-3 py-1.5 text-center text-[var(--text-sm)] text-[var(--text-secondary)] shadow-[var(--shadow-xs)]",
          className,
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
  const out = direction === "out";
  return (
    <div className={cn("flex max-w-[78%] flex-col gap-1.5", out ? "self-end" : "self-start", className)} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
      <div
        className={cn(
          "px-3 pb-[7px] pt-[9px] text-[var(--text-body)] shadow-[var(--shadow-xs)]",
          out
            ? "rounded-[14px_14px_4px_14px] bg-[var(--surface-mint)] text-[var(--text-primary)]"
            : "rounded-[14px_14px_14px_4px] bg-[var(--surface-card)] text-[var(--text-primary)]",
        )}
      >
        <span className="block">{children}</span>
        <span className={cn("mt-0.5 flex items-center justify-end gap-1 text-[var(--text-xs)] text-[var(--text-secondary)]")}>
          {time}
          {out && <Icon name={status === "read" ? "check-check" : "check"} size={13} color={status === "read" ? "var(--si-teal)" : "currentColor"} />}
        </span>
      </div>
      {quick && quick.length > 0 && (
        <div className={cn("flex flex-wrap gap-1.5", out ? "justify-end" : "justify-start")}>
          {quick.map((q) => (
            <span key={q} className="rounded-[var(--radius-pill)] border border-[var(--border-ink)] bg-[var(--surface-card)] px-3 py-1.5 text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--text-brand)]">
              {q}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

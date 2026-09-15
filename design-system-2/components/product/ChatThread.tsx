import * as React from "react";

import { cn } from "@/lib/utils";
import { Avatar } from "../core/Avatar";
import { Icon } from "../core/Icon";

export interface ChatThreadProps extends React.HTMLAttributes<HTMLDivElement> {
  contact?: { name?: string; avatar?: string; status?: string };
  composerPlaceholder?: string;
  footer?: React.ReactNode;
}

/** WhatsApp conversation shell: contact header, message canvas, composer. Canvas is a warm-neutral wash, not mint, so bubbles stay legible. */
export function ChatThread({ className, contact = {}, children, composerPlaceholder = "Mensagem", footer, ...props }: ChatThreadProps) {
  return (
    <div
      className={cn("flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)]", className)}
      style={{ background: "#EDE7DF" }}
      {...props}
    >
      <header className="flex items-center gap-2.5 border-b border-[var(--border-subtle)] bg-[var(--surface-card)] px-3.5 py-3">
        <Avatar name={contact.name} src={contact.avatar} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="font-[var(--weight-bold)] text-[var(--text-sm)]">{contact.name}</p>
          <p className="text-[var(--text-xs)] text-[var(--si-emerald-600)]">{contact.status ?? "online"}</p>
        </div>
        <Icon name="phone" size={17} color="var(--text-muted)" />
        <Icon name="more-vertical" size={17} color="var(--text-muted)" />
      </header>
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto p-[var(--space-4)]">{children}</div>
      {footer ?? (
        <div className="flex items-center gap-2 border-t border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-2.5">
          <Icon name="smile" size={19} color="var(--text-muted)" />
          <span className="flex-1 text-[var(--text-body)] text-[var(--text-muted)]">{composerPlaceholder}</span>
          <Icon name="paperclip" size={18} color="var(--text-muted)" />
          <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[var(--si-emerald-700)] text-[var(--si-white)]">
            <Icon name="send" size={16} />
          </span>
        </div>
      )}
    </div>
  );
}

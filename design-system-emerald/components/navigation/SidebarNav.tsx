import * as React from "react";

import { cn } from "@/lib/utils";
import { Avatar } from "../core/Avatar";
import { Icon, type IconName } from "../core/Icon";
import { Logo } from "../core/Logo";

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: IconName | string;
  badge?: React.ReactNode;
}

export interface SidebarNavProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  items?: SidebarNavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  logoSrc?: string;
  user?: { name: string; avatar?: string; meta?: string };
  footer?: React.ReactNode;
}

/** Item states: default, hover, active/selected. */
export function SidebarNav({ className, items = [], activeId, onSelect, logoSrc, user, footer, ...props }: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex w-[var(--sidebar-w)] shrink-0 flex-col gap-8 border-r border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 py-5",
        className,
      )}
      {...props}
    >
      <div className="pl-1.5">
        <Logo size={28} src={logoSrc} wordmark="Secretária Invisível" className="gap-2" />
      </div>
      <ul className="flex flex-1 list-none flex-col gap-0.5 p-0">
        {items.map((it) => {
          const active = it.id === activeId;
          return (
            <li key={it.id}>
              <button
                type="button"
                onClick={() => onSelect?.(it.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2.5 text-left text-[var(--text-body)]",
                  "transition-[var(--transition-control)]",
                  active
                    ? "bg-[var(--si-mint)] font-[var(--weight-medium)] text-[var(--si-emerald-700)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--si-gray-100)]",
                )}
              >
                <Icon name={it.icon} size={18} />
                <span className="flex-1">{it.label}</span>
                {it.badge != null && (
                  <span
                    className={cn(
                      "rounded-[var(--radius-pill)] px-1.5 py-0.5 text-[var(--text-xs)] font-[var(--weight-medium)] text-[var(--si-emerald-700)]",
                      active ? "bg-[var(--si-white)]" : "bg-[var(--si-mint)]",
                    )}
                  >
                    {it.badge}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      {footer}
      {user && (
        <div className="flex items-center gap-2.5 border-t border-[var(--border-subtle)] pt-3.5">
          <Avatar name={user.name} src={user.avatar} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[var(--text-sm)] font-[var(--weight-medium)]">{user.name}</p>
            <p className="text-[var(--text-xs)] text-[var(--text-muted)]">{user.meta}</p>
          </div>
          <Icon name="chevron-right" size={16} color="var(--text-muted)" />
        </div>
      )}
    </nav>
  );
}

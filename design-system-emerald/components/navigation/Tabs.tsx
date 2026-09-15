import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  tabs?: (TabItem | string)[];
  activeId?: string;
  onSelect?: (id: string) => void;
}

/**
 * Segmented pill strip from the source export. Built on Radix Tabs (already
 * used elsewhere in this project) for real keyboard/ARIA tab semantics
 * instead of the export's bare `<button>` row.
 */
export function Tabs({ className, tabs = [], activeId, onSelect, ...props }: TabsProps) {
  const normalized = tabs.map((t) => (typeof t === "string" ? { id: t, label: t } : t));
  return (
    <TabsPrimitive.Root value={activeId} onValueChange={onSelect}>
      <TabsPrimitive.List
        className={cn("inline-flex gap-0.5 rounded-[var(--radius-md)] bg-[var(--si-gray-100)] p-[3px]", className)}
        {...props}
      >
        {normalized.map((t) => (
          <TabsPrimitive.Trigger
            key={t.id}
            value={t.id}
            className={cn(
              "rounded-[var(--radius-sm)] px-3.5 py-1.5 text-[var(--text-sm)] font-[var(--weight-medium)]",
              "text-[var(--text-secondary)] transition-[var(--transition-control)]",
              "data-[state=active]:bg-[var(--surface-card)] data-[state=active]:text-[var(--text-primary)] data-[state=active]:shadow-[var(--shadow-xs)]",
            )}
          >
            {t.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  );
}

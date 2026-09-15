import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  selected?: boolean;
  onRemove?: () => void;
}

export function Tag({ className, selected, onRemove, onClick, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] px-3 py-1.5 text-[var(--text-sm)] font-[var(--weight-medium)]",
        "transition-[var(--transition-control)]",
        selected
          ? "bg-[var(--si-emerald-700)] text-[var(--si-white)] border border-transparent"
          : "bg-[var(--surface-card)] text-[var(--text-primary)] border border-[var(--border-subtle)]",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remover"
          className="grid place-items-center border-0 bg-transparent p-0 text-inherit opacity-60 hover:opacity-100"
        >
          <Icon name="x" size={13} />
        </button>
      )}
    </span>
  );
}

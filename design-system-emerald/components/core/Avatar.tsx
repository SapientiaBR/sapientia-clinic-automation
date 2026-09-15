import * as React from "react";

import { cn } from "@/lib/utils";

const BOX = { sm: 28, md: 36, lg: 48 } as const;
const TONE_CLASS: Record<string, string> = {
  mint: "bg-[var(--si-mint)] text-[var(--si-emerald-700)]",
  ink: "bg-[var(--si-emerald-700)] text-[var(--si-white)]",
  gray: "bg-[var(--si-gray-100)] text-[var(--text-secondary)]",
};

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string;
  src?: string;
  size?: "sm" | "md" | "lg" | number;
  tone?: "mint" | "ink" | "gray";
}

export function Avatar({ className, name = "", src, size = "md", tone = "mint", ...props }: AvatarProps) {
  const px = typeof size === "number" ? size : BOX[size];
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();

  return (
    <span
      className={cn("inline-grid shrink-0 place-items-center overflow-hidden rounded-[var(--radius-circle)]", TONE_CLASS[tone], className)}
      style={{ width: px, height: px, font: `var(--weight-medium) ${Math.round(px * 0.38)}px/1 var(--font-sans)` }}
      {...props}
    >
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : initials}
    </span>
  );
}

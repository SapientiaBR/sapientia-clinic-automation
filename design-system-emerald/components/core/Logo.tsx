import * as React from "react";

import { cn } from "@/lib/utils";
import logoMark from "../../assets/logo-si-mark.png";

/**
 * Secretária Invisível lockup. The mark is a WhatsApp-style speech bubble
 * enclosing a caduceus; on dark/emerald grounds use variant="light" so the
 * mark sits on a white disc (the mark itself is teal + slate, not monochrome).
 */
export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  variant?: "dark" | "light";
  size?: number;
  showWordmark?: boolean;
  wordmark?: string;
}

export function Logo({
  className,
  src = logoMark,
  variant = "dark",
  size = 36,
  showWordmark = true,
  wordmark = "Secretária Invisível",
  ...props
}: LogoProps) {
  const light = variant === "light";
  return (
    <span className={cn("inline-flex items-center", className)} style={{ gap: Math.round(size * 0.33) }} {...props}>
      <span
        className={cn("grid shrink-0 place-items-center rounded-[var(--radius-circle)]", light && "bg-[var(--si-white)]")}
        style={{ width: size, height: size }}
      >
        <img
          src={src}
          alt=""
          style={{ width: light ? size * 0.82 : size, height: light ? size * 0.82 : size, display: "block" }}
        />
      </span>
      {showWordmark && (
        <span
          className={cn("whitespace-nowrap tracking-[var(--tracking-heading)]", light ? "text-[var(--si-white)]" : "text-[var(--si-emerald-700)]")}
          style={{ font: `var(--weight-medium) ${Math.round(size * 0.5)}px/1 var(--font-display)` }}
        >
          {wordmark}
        </span>
      )}
    </span>
  );
}

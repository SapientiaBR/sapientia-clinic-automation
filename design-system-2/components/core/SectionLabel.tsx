import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The reference boards number every section: "01 // Typography". Same
 * device for slide eyebrows and marketing section headers.
 */
export interface SectionLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  number?: React.ReactNode;
  tone?: "brand" | "light";
}

export function SectionLabel({ className, number, tone = "brand", children, ...props }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-[var(--text-sm)] font-[var(--weight-medium)] tracking-[var(--tracking-eyebrow)]",
        tone === "light" ? "text-[var(--text-on-ink)]" : "text-[var(--si-emerald-700)]",
        className,
      )}
      {...props}
    >
      {number != null && (
        <>
          <span>{number}</span>
          <span className="opacity-50">//</span>
        </>
      )}
      <span>{children}</span>
    </p>
  );
}

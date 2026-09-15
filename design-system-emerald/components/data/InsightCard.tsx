import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "../core/Button";

export interface InsightCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  body?: React.ReactNode;
  cta?: React.ReactNode;
  onCta?: () => void;
}

/** The mint "AI Insight" panel: gradient mint ground, soft emerald blob, eyebrow + headline + one sentence + a dark CTA. */
export function InsightCard({ className, eyebrow = "Insight da IA", title, body, cta, onCta, ...props }: InsightCardProps) {
  return (
    <section
      className={cn("relative overflow-hidden rounded-[var(--radius-2xl)] p-[var(--card-pad-lg)] text-[var(--si-emerald-900)]", className)}
      style={{ background: "var(--gradient-mint)" }}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[260px] w-[260px] rounded-full"
        style={{ right: -60, top: -40, background: "radial-gradient(circle at 40% 40%, rgba(0,104,81,.22), rgba(0,104,81,0) 68%)" }}
      />
      <div className="relative max-w-[420px]">
        <p className="mb-2.5 text-[var(--text-sm)] font-[var(--weight-medium)] text-[var(--si-emerald-700)]">{eyebrow}</p>
        <h4 className="font-[var(--weight-bold)] text-[var(--text-h4)] tracking-[var(--tracking-heading)]">{title}</h4>
        {body && <p className="mt-2 text-[var(--text-body)] text-[var(--si-emerald-800)]">{body}</p>}
        {cta && (
          <div className="mt-[18px]">
            <Button variant="dark" iconAfter="arrow-right" onClick={onCta}>
              {cta}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

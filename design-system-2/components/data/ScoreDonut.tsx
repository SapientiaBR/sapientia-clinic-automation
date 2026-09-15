import * as React from "react";

export interface ScoreDonutProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: number;
  thickness?: number;
  label?: React.ReactNode;
}

export function ScoreDonut({ value = 0, max = 100, size = 108, thickness = 13, label, style, ...props }: ScoreDonutProps) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size, ...style }} {...props}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--si-emerald-100)" strokeWidth={thickness} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--si-emerald-600)"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: "stroke-dashoffset var(--duration-slow) var(--ease-out)" }}
        />
      </svg>
      {label && (
        <div
          className="text-[var(--text-sm)] text-[var(--text-secondary)]"
          style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

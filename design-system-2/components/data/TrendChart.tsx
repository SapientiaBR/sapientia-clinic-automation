import * as React from "react";

export interface TrendChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: number[];
  height?: number;
  xLabels?: string[];
  yLabels?: string[];
  tone?: "light" | "dark";
}

/** Smooth area+line chart. Emerald stroke over a soft wash, filled dot on the last point. */
export function TrendChart({ data = [], height = 168, xLabels = [], yLabels = [], tone = "light", style, ...props }: TrendChartProps) {
  const w = 100;
  const h = 100;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const span = max - min || 1;
  const pts = data.map((v, i): [number, number] => [
    (i / Math.max(data.length - 1, 1)) * w,
    h - ((v - min) / span) * h * 0.82 - h * 0.09,
  ]);
  const path = pts
    .map((p, i) => {
      if (!i) return `M${p[0]},${p[1]}`;
      const [px, py] = pts[i - 1];
      const cx = (px + p[0]) / 2;
      return `C${cx},${py} ${cx},${p[1]} ${p[0]},${p[1]}`;
    })
    .join(" ");
  const dark = tone === "dark";
  const stroke = dark ? "#7FE9C8" : "var(--si-emerald-700)";
  const last = pts[pts.length - 1] ?? [0, 0];
  const gradientId = React.useId();

  return (
    <div style={style} {...props}>
      <div style={{ display: "flex", gap: 10 }}>
        {yLabels.length > 0 && (
          <div
            className={dark ? "text-[var(--text-on-ink-muted)]" : "text-[var(--text-muted)]"}
            style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: "var(--text-xs)", height, paddingBottom: 2 }}
          >
            {yLabels.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0, position: "relative", height }}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={dark ? "#7FE9C8" : "#006851"} stopOpacity={dark ? 0.35 : 0.16} />
                <stop offset="100%" stopColor={dark ? "#7FE9C8" : "#006851"} stopOpacity={0} />
              </linearGradient>
            </defs>
            {[25, 50, 75].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke={dark ? "rgba(255,255,255,.12)" : "var(--si-gray-200)"}
                strokeWidth="0.4"
                strokeDasharray="1.5 2"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path d={`${path} L100,100 L0,100 Z`} fill={`url(#${gradientId})`} />
            <path d={path} fill="none" stroke={stroke} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            style={{
              position: "absolute",
              left: `calc(${last[0]}% - 5px)`,
              top: `calc(${last[1]}% - 5px)`,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: dark ? "#FFFFFF" : "var(--si-emerald-700)",
              boxShadow: dark ? "none" : "0 0 0 3px var(--surface-card)",
            }}
          />
        </div>
      </div>
      {xLabels.length > 0 && (
        <div
          className={dark ? "text-[var(--text-on-ink-muted)]" : "text-[var(--text-muted)]"}
          style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: "var(--text-xs)" }}
        >
          {xLabels.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}

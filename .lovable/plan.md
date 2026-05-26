# Lightweight Performance Logging

Goal: instrument the landing page with **dev-only** perf marks so we can confirm that the recent mobile reflow + ScrollTrigger callback reductions actually improve scroll smoothness. Zero impact in production builds.

## What gets added

### 1. `src/lib/perfMonitor.ts` (new)
A small, self-contained module that runs only when `import.meta.env.DEV` (or when `?perf=1` is present in the URL, so we can flip it on in the deployed preview without a rebuild). It exposes:

- `startFpsMonitor()` — rAF loop that samples frame time, computes rolling 1s FPS, and logs:
  - average FPS
  - 1% low FPS (worst frame in window)
  - count of long frames (>50ms)
  Logs once per second to `console.info` with a `[perf]` tag, and emits a `performance.mark` so it shows up in DevTools Performance panel.
- `startScrollFpsMonitor()` — same as above but only samples while the user is actively scrolling (listens to Lenis if available, falls back to `window` scroll). Logs a summary on scroll-end: duration, avg FPS during scroll, 1% low, longest frame.
- `markScrollTriggerCallbacks()` — wraps `ScrollTrigger.addEventListener("refresh"/"scrollEnd")` and counts callback invocations per second, so we can verify the reduction. Logs deltas only when the count changes.
- `logLongTasks()` — uses `PerformanceObserver({ type: "longtask" })` to log any task >50ms with its duration and attribution. No-op if the API is unavailable (Safari).
- `logCLS()` and `logINP()` — minimal Web Vitals via `PerformanceObserver` (no extra dep), logged once on `visibilitychange === "hidden"`.

All monitors honor `prefers-reduced-motion` purely for FPS expectations (no behavior change) and are tree-shaken in production via `if (import.meta.env.DEV)` guards.

### 2. `src/main.tsx` (edit)
Conditionally initialize the monitors at startup:

```ts
if (import.meta.env.DEV || new URLSearchParams(location.search).has("perf")) {
  import("./lib/perfMonitor").then(m => {
    m.startFpsMonitor();
    m.startScrollFpsMonitor();
    m.markScrollTriggerCallbacks();
    m.logLongTasks();
    m.logCLS();
    m.logINP();
  });
}
```

Dynamic import keeps the module out of the production bundle entirely when the `?perf=1` flag isn't used.

### 3. `src/components/global/LenisProvider.tsx` (tiny edit)
Expose the Lenis instance on `window.__lenis` in dev only, so `startScrollFpsMonitor` can hook into Lenis's `scroll` event instead of falling back to native scroll. One-line guarded assignment.

## How we validate

After it's in:
1. Open the preview with `?perf=1` on mobile viewport.
2. Scroll the full landing page once.
3. Check console for:
   - `[perf] scroll fps avg=X p99low=Y longest=Zms` per scroll burst
   - `[perf] longtask Xms` — should be rare/short
   - `[perf] ST callbacks/s` — should be lower than before the reductions
4. Compare numbers against a baseline (note them in chat) to confirm improvement.

## Out of scope

- No UI overlay (would itself cost frames). Console + Performance panel marks only.
- No analytics upload. Local-only logs.
- No new deps.

## Files touched

- `src/lib/perfMonitor.ts` (new, ~120 LOC)
- `src/main.tsx` (5-line init block)
- `src/components/global/LenisProvider.tsx` (1-line dev-only window assignment)

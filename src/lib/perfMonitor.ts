/**
 * Lightweight performance logging. Dev-only or `?perf=1` opt-in.
 * Zero impact in production builds unless the flag is set.
 *
 * Usage: see src/main.tsx.
 */

const TAG = "[perf]";

function now() {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}

/** Rolling FPS sampler. Logs avg + 1% low + long frame count every second. */
export function startFpsMonitor() {
  if (typeof window === "undefined") return;
  let last = now();
  let frames: number[] = [];
  let windowStart = last;

  const tick = () => {
    const t = now();
    const dt = t - last;
    last = t;
    frames.push(dt);

    if (t - windowStart >= 1000) {
      const sorted = [...frames].sort((a, b) => a - b);
      const avg = frames.reduce((a, b) => a + b, 0) / frames.length;
      const p99 = sorted[Math.floor(sorted.length * 0.99)] ?? avg;
      const longest = sorted[sorted.length - 1] ?? avg;
      const longFrames = frames.filter((f) => f > 50).length;
      const fps = 1000 / avg;
      const lowFps = 1000 / p99;
      console.info(
        `${TAG} fps avg=${fps.toFixed(1)} 1%low=${lowFps.toFixed(1)} longest=${longest.toFixed(0)}ms long(>50ms)=${longFrames}`,
      );
      try {
        performance.mark(`perf:fps:${fps.toFixed(0)}`);
      } catch {}
      frames = [];
      windowStart = t;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/** FPS only while scrolling. Summarizes each scroll burst. */
export function startScrollFpsMonitor() {
  if (typeof window === "undefined") return;
  let scrolling = false;
  let startT = 0;
  let lastFrame = 0;
  let frames: number[] = [];
  let endTimer: number | null = null;
  let raf = 0;

  const sample = () => {
    if (!scrolling) return;
    const t = now();
    if (lastFrame) frames.push(t - lastFrame);
    lastFrame = t;
    raf = requestAnimationFrame(sample);
  };

  const onScroll = () => {
    if (!scrolling) {
      scrolling = true;
      startT = now();
      lastFrame = 0;
      frames = [];
      raf = requestAnimationFrame(sample);
    }
    if (endTimer) clearTimeout(endTimer);
    endTimer = window.setTimeout(() => {
      scrolling = false;
      cancelAnimationFrame(raf);
      if (frames.length < 3) return;
      const sorted = [...frames].sort((a, b) => a - b);
      const avg = frames.reduce((a, b) => a + b, 0) / frames.length;
      const p99 = sorted[Math.floor(sorted.length * 0.99)] ?? avg;
      const longest = sorted[sorted.length - 1] ?? avg;
      const dur = (now() - startT) / 1000;
      console.info(
        `${TAG} scroll dur=${dur.toFixed(2)}s avg=${(1000 / avg).toFixed(1)}fps 1%low=${(1000 / p99).toFixed(1)}fps longest=${longest.toFixed(0)}ms frames=${frames.length}`,
      );
    }, 200);
  };

  // Prefer Lenis if exposed; fall back to native scroll.
  const lenis = (window as unknown as { __lenis?: { on: (e: string, cb: () => void) => void } }).__lenis;
  if (lenis) {
    lenis.on("scroll", onScroll);
  } else {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
}

/** Count ScrollTrigger callback fires per second. */
export function markScrollTriggerCallbacks() {
  if (typeof window === "undefined") return;
  import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
    let updateCount = 0;
    let refreshCount = 0;
    let lastLog = now();
    let lastUpdate = 0;
    let lastRefresh = 0;

    ScrollTrigger.addEventListener("refresh", () => refreshCount++);
    ScrollTrigger.addEventListener("scrollEnd", () => updateCount++);

    setInterval(() => {
      const t = now();
      const secs = (t - lastLog) / 1000;
      const u = updateCount - lastUpdate;
      const r = refreshCount - lastRefresh;
      if (u || r) {
        console.info(
          `${TAG} ST callbacks/s scrollEnd=${(u / secs).toFixed(1)} refresh=${(r / secs).toFixed(1)} (triggers=${ScrollTrigger.getAll().length})`,
        );
      }
      lastUpdate = updateCount;
      lastRefresh = refreshCount;
      lastLog = t;
    }, 2000);
  });
}

/** PerformanceObserver: long tasks (>50ms). */
export function logLongTasks() {
  if (typeof PerformanceObserver === "undefined") return;
  try {
    const obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.info(`${TAG} longtask ${entry.duration.toFixed(0)}ms @${entry.startTime.toFixed(0)}`);
      }
    });
    obs.observe({ type: "longtask", buffered: true });
  } catch {}
}

/** Minimal CLS — logged on hidden. */
export function logCLS() {
  if (typeof PerformanceObserver === "undefined") return;
  let cls = 0;
  try {
    const obs = new PerformanceObserver((list) => {
      for (const e of list.getEntries() as unknown as Array<{ value: number; hadRecentInput: boolean }>) {
        if (!e.hadRecentInput) cls += e.value;
      }
    });
    obs.observe({ type: "layout-shift", buffered: true });
  } catch {
    return;
  }
  addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      console.info(`${TAG} CLS=${cls.toFixed(4)}`);
    }
  });
}

/** Minimal INP — tracks worst event latency. */
export function logINP() {
  if (typeof PerformanceObserver === "undefined") return;
  let worst = 0;
  try {
    const obs = new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        if (e.duration > worst) worst = e.duration;
      }
    });
    obs.observe({ type: "event", buffered: true, durationThreshold: 16 } as PerformanceObserverInit);
  } catch {
    return;
  }
  addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      console.info(`${TAG} INP(worst event)=${worst.toFixed(0)}ms`);
    }
  });
}

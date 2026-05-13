import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const scrolled = h.scrollTop;
        const max = h.scrollHeight - h.clientHeight;
        setPct(max > 0 ? (scrolled / max) * 100 : 0);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none">
      <div
        className="h-full origin-left transition-transform duration-75"
        style={{
          transform: `scaleX(${pct / 100})`,
          background: "linear-gradient(90deg, #7c3aed, #4debff)",
        }}
      />
    </div>
  );
};

export default ScrollProgress;

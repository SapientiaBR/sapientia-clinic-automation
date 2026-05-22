import { useEffect, useState } from "react";
import { useLenis } from "./LenisProvider";

const ScrollProgress = () => {
  const lenis = useLenis();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!lenis) {
      // Fallback for users with prefers-reduced-motion (no Lenis instance).
      const onScroll = () => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const handler = ({ scroll, limit }: { scroll: number; limit: number }) => {
      setPct(limit > 0 ? (scroll / limit) * 100 : 0);
    };
    lenis.on("scroll", handler);
    return () => {
      lenis.off("scroll", handler);
    };
  }, [lenis]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none">
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${pct / 100})`,
          background: "linear-gradient(90deg, #7c3aed, #4debff)",
        }}
      />
    </div>
  );
};

export default ScrollProgress;

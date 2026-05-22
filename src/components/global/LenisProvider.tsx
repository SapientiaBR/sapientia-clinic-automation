import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/animations";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    ref.current = instance;
    setLenis(instance);

    ScrollTrigger.normalizeScroll(false);

    const onLenisScroll = () => ScrollTrigger.update();
    instance.on("scroll", onLenisScroll);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      instance.off("scroll", onLenisScroll);
      instance.destroy();
      ref.current = null;
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
};

export default LenisProvider;

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Mobile-friendly defaults: avoid refresh on address-bar resize,
  // batch ScrollTrigger callbacks, and skip stale ones on fast scroll.
  ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: true,
  });
  gsap.defaults({ overwrite: "auto" });
}

export const EASE = "power3.out";
export const EASE_INOUT = "power3.inOut";
export const EASE_EXPO = "expo.out";
export const STAGGER = 0.2;
export const STAGGER_MOBILE = 0.1;
export const DURATION = 0.7;
export const DURATION_MOBILE = 0.6;

/**
 * Standard reveal-on-scroll for any section.
 * Caches the NodeList once, runs a single ScrollTrigger per breakpoint,
 * uses `once: true` and `fastScrollEnd` to minimize per-scroll work on mobile.
 */
export function revealOnScroll(scope: HTMLElement | null): () => void {
  if (!scope) return () => {};
  const reveals = scope.querySelectorAll("[data-reveal]");
  if (!reveals.length) return () => {};

  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    gsap.from(reveals, {
      y: 60,
      opacity: 0,
      duration: DURATION,
      ease: EASE,
      stagger: STAGGER,
      scrollTrigger: {
        trigger: scope,
        start: "top 80%",
        once: true,
        fastScrollEnd: true,
      },
    });
  });

  mm.add("(max-width: 767px)", () => {
    gsap.from(reveals, {
      y: 24,
      opacity: 0,
      duration: DURATION_MOBILE,
      ease: EASE,
      stagger: 0.08,
      force3D: true,
      scrollTrigger: {
        trigger: scope,
        start: "top 92%",
        once: true,
        fastScrollEnd: true,
      },
    });
  });

  return () => mm.revert();
}

/**
 * Animate a counter from 0 → target using a proxy object.
 * Returns a kill function.
 */
export function countUp(
  target: number,
  onUpdate: (v: number) => void,
  opts: { duration?: number; delay?: number; ease?: string } = {}
): () => void {
  const proxy = { val: 0 };
  const tween = gsap.to(proxy, {
    val: target,
    duration: opts.duration ?? 1.6,
    delay: opts.delay ?? 0,
    ease: opts.ease ?? EASE,
    onUpdate: () => onUpdate(Math.round(proxy.val)),
  });
  return () => {
    tween.kill();
  };
}

/**
 * Smooth counter transition between two values (used for live recalculation).
 */
export function countTo(
  from: number,
  to: number,
  onUpdate: (v: number) => void,
  opts: { duration?: number; ease?: string } = {}
): () => void {
  const proxy = { val: from };
  const tween = gsap.to(proxy, {
    val: to,
    duration: opts.duration ?? DURATION,
    ease: opts.ease ?? EASE,
    onUpdate: () => onUpdate(Math.round(proxy.val)),
  });
  return () => {
    tween.kill();
  };
}

export { gsap, ScrollTrigger };

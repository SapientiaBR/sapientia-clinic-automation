import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const EASE = "power3.out";
export const EASE_INOUT = "power3.inOut";
export const EASE_EXPO = "expo.out";
export const STAGGER = 0.2;
export const STAGGER_MOBILE = 0.1;
export const DURATION = 0.7;
export const DURATION_MOBILE = 0.6;

/**
 * Animate a counter from 0 → target using a proxy object.
 * Returns a kill function.
 */
export function countUp(
  target: number,
  onUpdate: (v: number) => void,
  opts: { duration?: number; delay?: number; ease?: string } = {}
) {
  const proxy = { val: 0 };
  const tween = gsap.to(proxy, {
    val: target,
    duration: opts.duration ?? 1.6,
    delay: opts.delay ?? 0,
    ease: opts.ease ?? EASE,
    onUpdate: () => onUpdate(Math.round(proxy.val)),
  });
  return () => tween.kill();
}

/**
 * Smooth counter transition between two values (used for live recalculation).
 */
export function countTo(
  from: number,
  to: number,
  onUpdate: (v: number) => void,
  opts: { duration?: number; ease?: string } = {}
) {
  const proxy = { val: from };
  const tween = gsap.to(proxy, {
    val: to,
    duration: opts.duration ?? DURATION,
    ease: opts.ease ?? EASE,
    onUpdate: () => onUpdate(Math.round(proxy.val)),
  });
  return () => tween.kill();
}

export { gsap, ScrollTrigger };

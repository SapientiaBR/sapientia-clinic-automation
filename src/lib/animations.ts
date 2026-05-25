import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: true,
  });
  gsap.defaults({ overwrite: "auto" });
  // Premium easing — registered once so we can reference it by name.
  CustomEase.create("premium", "0.22, 1, 0.36, 1");
}

export const EASE = "premium";
export const EASE_PREMIUM = "premium";
export const EASE_INOUT = "power3.inOut";
export const EASE_EXPO = "expo.out";
export const STAGGER = 0.12;
export const STAGGER_MOBILE = 0.06;
export const DURATION = 0.8;
export const DURATION_MOBILE = 0.7;

/** Detects user preference for reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Standard reveal-on-scroll for any section.
 * Premium feel: small y, gentle blur, premium easing.
 * Respects prefers-reduced-motion.
 */
export function revealOnScroll(scope: HTMLElement | null): () => void {
  if (!scope) return () => {};
  const reveals = scope.querySelectorAll("[data-reveal]");
  if (!reveals.length) return () => {};

  if (prefersReducedMotion()) {
    // Make sure nothing is left in a hidden state.
    gsap.set(reveals, { clearProps: "all", opacity: 1, y: 0, filter: "none" });
    return () => {};
  }

  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    gsap.from(reveals, {
      y: 20,
      opacity: 0,
      filter: "blur(6px)",
      duration: DURATION,
      ease: EASE_PREMIUM,
      stagger: 0.08,
      scrollTrigger: {
        trigger: scope,
        start: "top 82%",
        once: true,
        fastScrollEnd: true,
      },
    });
  });

  mm.add("(max-width: 767px)", () => {
    gsap.from(reveals, {
      y: 12,
      opacity: 0,
      duration: DURATION_MOBILE,
      ease: EASE_PREMIUM,
      stagger: 0.05,
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
 * Subtle parallax helper. Desktop-only by default (mobile parallax hurts perf).
 * Returns a cleanup function.
 */
export function parallaxY(
  el: Element | null,
  opts: { y?: number; scrub?: number | boolean; trigger?: Element | null } = {}
): () => void {
  if (!el || prefersReducedMotion()) return () => {};
  const y = opts.y ?? -24;
  const scrub = opts.scrub ?? 0.6;
  const trigger = opts.trigger ?? el;
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    gsap.to(el, {
      y,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub,
      },
    });
  });
  return () => mm.revert();
}

/**
 * Animate a counter from 0 → target using a proxy object.
 * Returns a kill function. Honors reduced motion.
 */
export function countUp(
  target: number,
  onUpdate: (v: number) => void,
  opts: { duration?: number; delay?: number; ease?: string } = {}
): () => void {
  if (prefersReducedMotion()) {
    onUpdate(target);
    return () => {};
  }
  const proxy = { val: 0 };
  const tween = gsap.to(proxy, {
    val: target,
    duration: opts.duration ?? 1.6,
    delay: opts.delay ?? 0,
    ease: opts.ease ?? EASE_PREMIUM,
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
  if (prefersReducedMotion()) {
    onUpdate(to);
    return () => {};
  }
  const proxy = { val: from };
  const tween = gsap.to(proxy, {
    val: to,
    duration: opts.duration ?? 0.7,
    ease: opts.ease ?? EASE_PREMIUM,
    onUpdate: () => onUpdate(Math.round(proxy.val)),
  });
  return () => {
    tween.kill();
  };
}

export { gsap, ScrollTrigger };

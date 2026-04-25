"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Renders a custom two-layer cursor (small dot + lagging ring) that follows the
 * mouse. The ring scales up when hovering any `<a>` or `<button>` in the page.
 *
 * Render this once in the root layout. It is automatically hidden on:
 * - Touch devices (`hover: none` media query)
 * - `prefers-reduced-motion` users
 *
 * @example
 * // In src/app/layout.tsx
 * <body>
 *   <CursorFollower />
 *   {children}
 * </body>
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = useMediaQuery("(hover: none)");
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring || isTouch || reduced) return;

      let cursorActivated = false;
      const onMove = (e: MouseEvent) => {
        if (!cursorActivated) {
          cursorActivated = true;
          document.body.classList.add("cursor-active");
        }
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "none" });
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
      };

      const onEnter = () => gsap.to(ring, { scale: 1.8, duration: 0.3 });
      const onLeave = () => gsap.to(ring, { scale: 1, duration: 0.3 });

      // Snapshot interactive elements at mount time.
      const interactiveEls = Array.from(
        document.querySelectorAll<Element>("a, button")
      );

      window.addEventListener("mousemove", onMove);
      interactiveEls.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

      return () => {
        window.removeEventListener("mousemove", onMove);
        document.body.classList.remove("cursor-active");
        interactiveEls.forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      };
    },
    { dependencies: [isTouch, reduced] }
  );

  if (isTouch || reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40"
      />
    </>
  );
}

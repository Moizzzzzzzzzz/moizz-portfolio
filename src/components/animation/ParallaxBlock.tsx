"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxBlockProps {
  children: ReactNode;
  /**
   * Fractional offset applied to the element's height as it scrolls through
   * the viewport. 0.2 shifts the element by ±20% of its height. Negative
   * values invert the direction.
   */
  speed?: number;
  className?: string;
}

/**
 * Translates its children vertically as the user scrolls, creating a parallax
 * depth effect. The translate distance is `speed × element.offsetHeight`, so
 * larger elements feel more dramatic at the same speed.
 *
 * Disabled when `prefers-reduced-motion` is set — content renders at rest.
 * Pair with `overflow-hidden` on the parent to clip the translated element.
 *
 * @example
 * // Subtle parallax on a case study hero image
 * <div className="overflow-hidden rounded-xl">
 *   <ParallaxBlock speed={0.15}>
 *     <img src="/images/work/cover.webp" alt="..." className="w-full" />
 *   </ParallaxBlock>
 * </div>
 *
 * @example
 * // Counter-scroll (negative speed) for a layered depth effect
 * <ParallaxBlock speed={-0.1}>
 *   <BackgroundLayer />
 * </ParallaxBlock>
 */
export function ParallaxBlock({ children, speed = 0.2, className }: ParallaxBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      gsap.to(ref.current, {
        y: () => ref.current!.offsetHeight * speed * -1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { dependencies: [speed, reduced] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

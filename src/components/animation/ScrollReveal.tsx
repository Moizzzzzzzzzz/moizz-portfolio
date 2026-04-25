"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

interface ScrollRevealProps {
  children: ReactNode;
  /** Direction the element slides in from — defaults to "up". */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Pixel offset for the slide — defaults to 40. */
  distance?: number;
  /** Seconds before animation begins — defaults to 0. */
  delay?: number;
  /** Animation duration in seconds — defaults to 0.9. */
  duration?: number;
  className?: string;
}

/**
 * Reveals its children with a fade + directional slide when they scroll into
 * view. When `prefers-reduced-motion` is set, the element is shown instantly
 * with no animation; the initial hidden state is still applied via GSAP so the
 * element is never invisible for non-JS users.
 *
 * @example
 * // Basic fade-up reveal
 * <ScrollReveal>
 *   <Card>...</Card>
 * </ScrollReveal>
 *
 * @example
 * // Slide in from the left with a delay (e.g. staggered siblings)
 * <ScrollReveal direction="left" delay={0.2} duration={1}>
 *   <p>Content</p>
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  direction = "up",
  distance = 40,
  delay = 0,
  duration = 0.9,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;

      // Reduced motion: ensure the element is fully visible with no transforms.
      if (reduced) {
        gsap.set(ref.current, { opacity: 1, x: 0, y: 0 });
        return;
      }

      const from: gsap.TweenVars = { opacity: 0 };
      if (direction === "up") from.y = distance;
      if (direction === "down") from.y = -distance;
      if (direction === "left") from.x = distance;
      if (direction === "right") from.x = -distance;

      gsap.fromTo(ref.current, from, {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    },
    { dependencies: [direction, distance, delay, duration, reduced] }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

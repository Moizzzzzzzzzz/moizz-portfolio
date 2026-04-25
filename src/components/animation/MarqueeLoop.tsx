"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

interface MarqueeLoopProps {
  children: ReactNode;
  /** Pixels per second — defaults to 40. */
  speed?: number;
  /** Scroll direction — defaults to "left". */
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Renders children in a seamless infinite horizontal marquee using GSAP.
 * Content is duplicated once internally to create the loop — pass a single
 * set of items as children. When `prefers-reduced-motion` is set, the duplicate
 * is hidden and the content is displayed statically.
 *
 * @example
 * // Stack-showcase marquee
 * <MarqueeLoop speed={50}>
 *   {stackLogos.map((logo) => (
 *     <img key={logo} src={logo} alt="" className="h-8" />
 *   ))}
 * </MarqueeLoop>
 *
 * @example
 * // Reverse (right-scrolling) with custom speed
 * <MarqueeLoop direction="right" speed={30}>
 *   {items}
 * </MarqueeLoop>
 */
export function MarqueeLoop({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = false,
  className,
}: MarqueeLoopProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track || reduced) return;

      // totalWidth = width of one content set (track contains two identical sets).
      const totalWidth = track.scrollWidth / 2;
      const duration = totalWidth / speed;

      if (direction === "left") {
        tweenRef.current = gsap.to(track, { x: -totalWidth, duration, repeat: -1, ease: "none" });
      } else {
        // Start offset so the second copy is the initial visible content.
        tweenRef.current = gsap.fromTo(
          track,
          { x: -totalWidth },
          { x: 0, duration, repeat: -1, ease: "none" }
        );
      }
    },
    { dependencies: [speed, direction, reduced, pauseOnHover] }
  );

  const hoverHandlers = pauseOnHover && !reduced
    ? {
        onMouseEnter: () => tweenRef.current?.pause(),
        onMouseLeave: () => tweenRef.current?.resume(),
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)} {...hoverHandlers}>
      <div ref={trackRef} className="flex w-max gap-8">
        {children}
        {/* Duplicate for seamless loop — hidden when reduced motion is on. */}
        {!reduced && <>{children}</>}
      </div>
    </div>
  );
}

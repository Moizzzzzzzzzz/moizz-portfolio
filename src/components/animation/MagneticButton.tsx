"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MagneticButtonProps {
  children: ReactNode;
  /**
   * How strongly the element is pulled toward the cursor (0–1).
   * 0.4 is a subtle pull; 0.8 is very pronounced.
   */
  strength?: number;
  className?: string;
}

/**
 * Wraps its children in a div that magnetically follows the cursor within the
 * element's bounding box. On mouse leave the element springs back to rest.
 *
 * Disabled automatically on touch devices (`hover: none`) and when
 * `prefers-reduced-motion` is set.
 *
 * @example
 * // Wrap a primary CTA button
 * <MagneticButton strength={0.4}>
 *   <Button variant="primary">Book a Call</Button>
 * </MagneticButton>
 *
 * @example
 * // Stronger pull for a large hero CTA
 * <MagneticButton strength={0.6} className="inline-block">
 *   <Button variant="ghost">View Work</Button>
 * </MagneticButton>
 */
export function MagneticButton({
  children,
  strength = 0.4,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useMediaQuery("(hover: none)");
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || isTouch || reduced) return;

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;
        gsap.to(el, { x, y, duration: 0.4, ease: "power2.out" });
      };

      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { dependencies: [isTouch, reduced, strength] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

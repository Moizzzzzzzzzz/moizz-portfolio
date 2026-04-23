"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

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

  useEffect(() => {
    if (reduced || !ref.current) return;

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
  }, [direction, distance, delay, duration, reduced]);

  return (
    <div ref={ref} className={cn("opacity-0", className)}>
      {children}
    </div>
  );
}

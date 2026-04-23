"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxBlockProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxBlock({ children, speed = 0.2, className }: ParallaxBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
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
  }, [speed, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

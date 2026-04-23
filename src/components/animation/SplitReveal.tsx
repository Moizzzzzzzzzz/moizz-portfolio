"use client";

import React, { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

interface SplitRevealProps {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  split?: "lines" | "words" | "chars";
  delay?: number;
  className?: string;
}

export function SplitReveal({
  children,
  as: Tag = "p",
  split = "lines",
  delay = 0,
  className,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const split = new SplitText(ref.current, { type: "lines,words" });

    gsap.fromTo(
      split.lines,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        stagger: 0.08,
        delay,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      }
    );

    return () => split.revert();
  }, [delay, reduced]);

  return (
    // @ts-expect-error — dynamic tag
    <Tag ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </Tag>
  );
}

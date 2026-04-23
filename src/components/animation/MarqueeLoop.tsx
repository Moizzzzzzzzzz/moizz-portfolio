"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

interface MarqueeLoopProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export function MarqueeLoop({
  children,
  speed = 40,
  direction = "left",
  className,
}: MarqueeLoopProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;
    const duration = totalWidth / speed;

    gsap.to(track, {
      x: direction === "left" ? -totalWidth : totalWidth,
      duration,
      repeat: -1,
      ease: "none",
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}px`,
      },
    });
  }, [speed, direction]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={trackRef} className="flex w-max gap-8">
        {children}
        {children}
      </div>
    </div>
  );
}

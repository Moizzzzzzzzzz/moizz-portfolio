"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = useMediaQuery("(hover: none)");

  useEffect(() => {
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35 });
    };

    const onLink = () => gsap.to(ring, { scale: 1.8, duration: 0.3 });
    const offLink = () => gsap.to(ring, { scale: 1, duration: 0.3 });

    window.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", onLink);
      el.addEventListener("mouseleave", offLink);
    });

    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/40"
      />
    </>
  );
}

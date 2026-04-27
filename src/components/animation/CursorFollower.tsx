"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type CursorVariant = "default" | "hover" | "text" | "hidden";

export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<CursorVariant>("hidden");
  const pos = useRef({ x: -100, y: -100, tx: -100, ty: -100 });
  const rafRef = useRef<number>(0);

  const isTouch = useMediaQuery("(hover: none)");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (isTouch || reduced) return;

    const el = ref.current;
    if (!el) return;

    function move(e: MouseEvent) {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
      if (variant === "hidden") setVariant("default");
      document.body.classList.add("cursor-active");
    }

    function leave() {
      setVariant("hidden");
    }

    function over(e: MouseEvent) {
      const t = e.target as Element | null;
      if (!t?.closest) return;
      if (t.closest("[data-cursor-text], input, textarea")) {
        setVariant("text");
      } else if (
        t.closest(
          "a, button, [data-cursor-hover], .work-card, .filter-pill, " +
          ".writing-row, .pillar, .stack-row, .prevnext-cell, .nav-link, " +
          ".logo, .menu-btn"
        )
      ) {
        setVariant("hover");
      } else {
        setVariant("default");
      }
    }

    function loop() {
      const lag = 0.22;
      pos.current.x += (pos.current.tx - pos.current.x) * lag;
      pos.current.y += (pos.current.ty - pos.current.y) * lag;
      if (el) {
        el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", over);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", over);
      document.body.classList.remove("cursor-active");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch, reduced]);

  if (isTouch || reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`cursor ${variant}`}
    />
  );
}

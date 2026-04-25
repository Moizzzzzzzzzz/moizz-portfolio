"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const isInitialMount = useRef(true);

  useGSAP(
    () => {
      if (!ref.current) return;

      if (isInitialMount.current) {
        isInitialMount.current = false;
        gsap.set(ref.current, { opacity: 1, y: 0 });
        return;
      }

      if (reduced) {
        gsap.set(ref.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "expo.out", clearProps: "opacity,transform" }
      );
    },
    { dependencies: [pathname, reduced], scope: ref }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

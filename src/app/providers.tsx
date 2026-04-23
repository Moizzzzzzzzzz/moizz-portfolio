"use client";

import { useEffect, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { createLenis, destroyLenis } from "@/lib/lenis";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    createLenis();

    return () => {
      destroyLenis();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}

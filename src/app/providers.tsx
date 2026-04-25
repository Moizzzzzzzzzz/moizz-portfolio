"use client";

import React, { useEffect, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { createLenis, destroyLenis } from "@/lib/lenis";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    createLenis();

    if (process.env.NODE_ENV === "development") {
      import("react-dom").then((ReactDOM) => {
        import("@axe-core/react").then((axe) => {
          axe.default(React, ReactDOM, 1000);
        });
      });
    }

    return () => {
      destroyLenis();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}

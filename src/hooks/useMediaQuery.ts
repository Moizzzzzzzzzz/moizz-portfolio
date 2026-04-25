"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  // Lazy initializer reads the current match synchronously on the client,
  // avoiding a redundant setState call inside the effect.
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface Props {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headingEls = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0% -70% 0%" }
    );

    headingEls.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
        On this page
      </p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block text-sm leading-relaxed transition-colors duration-200",
                activeId === h.id
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

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
    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" style={{ paddingLeft: 24, borderLeft: "1px solid var(--color-border)" }}>
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.62rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--color-muted)",
        marginBottom: 20,
      }}>
        On this page
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? 12 : 0 }}>
            <a
              href={`#${h.id}`}
              style={{
                display: "block",
                fontFamily: h.level === 2 ? "var(--font-serif)" : "var(--font-mono)",
                fontStyle: h.level === 2 ? "italic" : "normal",
                fontSize: h.level === 2 ? "0.9rem" : "0.65rem",
                letterSpacing: h.level === 3 ? "0.08em" : "0",
                textTransform: h.level === 3 ? "uppercase" : "none",
                fontWeight: 300,
                lineHeight: 1.4,
                textDecoration: "none",
                color: activeId === h.id ? "var(--color-accent)" : "var(--color-muted)",
                transition: "color 0.2s",
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

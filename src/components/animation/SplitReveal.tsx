"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

interface SplitRevealProps {
  /** Text content to split and animate. Keep children to a single text node or
   *  plain string — nested HTML elements are not supported by GSAP SplitText. */
  children: React.ReactNode;
  /** HTML tag to render — defaults to "p". */
  as?: keyof React.JSX.IntrinsicElements;
  /** Granularity of split — defaults to "lines". */
  split?: "lines" | "words" | "chars";
  /** Seconds to wait before the animation begins. */
  delay?: number;
  className?: string;
}

/**
 * Reveals text with a staggered fade-up per line, word, or character on scroll
 * entry. Uses GSAP SplitText internally. When `prefers-reduced-motion` is set,
 * the text renders immediately at full opacity with no animation.
 *
 * @example
 * // Staggered line reveal for a headline
 * <SplitReveal as="h1" split="lines" delay={0.1} className="text-5xl font-bold">
 *   Production AI that ships.
 * </SplitReveal>
 *
 * @example
 * // Word-by-word reveal for a body paragraph
 * <SplitReveal split="words" delay={0.2}>
 *   Full-stack AI engineer building RAG, agents, and LLM products.
 * </SplitReveal>
 */
export function SplitReveal({
  children,
  as: Tag = "p",
  split = "lines",
  delay = 0,
  className,
}: SplitRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !containerRef.current) return;

      // Use "lines,words" so SplitText has word boundaries for line detection.
      const splitType =
        split === "chars" ? "chars,words" : split === "words" ? "words" : "lines,words";
      const st = new SplitText(containerRef.current, { type: splitType });
      const targets =
        split === "chars" ? st.chars : split === "words" ? st.words : st.lines;

      gsap.fromTo(
        targets,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.9,
          delay,
          scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
        }
      );

      // SplitText DOM changes (wrapper spans) are not reverted by GSAP context alone.
      return () => st.revert();
    },
    { dependencies: [split, delay, reduced] }
  );

  return (
    // @ts-expect-error — dynamic tag with forwarded ref
    <Tag ref={containerRef} className={cn(className)}>
      {children}
    </Tag>
  );
}

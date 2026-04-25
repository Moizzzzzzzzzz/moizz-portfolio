"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { MagneticButton } from "@/components/animation/MagneticButton";
import { buttonVariants } from "@/lib/button-variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Three.js is lazy-loaded — never imported in a Server Component.
const HeroScene = dynamic(
  () => import("@/components/webgl/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
);

// Pure-CSS fallback shown when WebGL is disabled (reduced-motion or touch devices).
// Two-layer radial gradient approximates the shader vignette position and depth.
function HeroFallback() {
  return (
    <div
      aria-hidden
      role="presentation"
      className="absolute inset-0"
      style={{
        background: [
          "radial-gradient(ellipse 80% 60% at 15% 45%, color-mix(in oklch, #7C3AED 22%, transparent) 0%, transparent 65%)",
          "radial-gradient(ellipse 50% 40% at 60% 70%, color-mix(in oklch, #7C3AED 10%, transparent) 0%, transparent 60%)",
        ].join(", "),
      }}
    />
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  // Disable WebGL on touch-only devices — saves GPU, avoids mobile battery drain.
  const isTouch = useMediaQuery("(hover: none)");
  const showWebGL = !reduced && !isTouch;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* ── Background layer ─────────────────────────────────────────── */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {showWebGL ? <HeroScene /> : <HeroFallback />}
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 md:px-8">
        {/* Eyebrow — fires immediately on mount */}
        <ScrollReveal direction="none" delay={0.05}>
          <p className="mb-6 text-sm font-medium uppercase tracking-widest text-muted">
            Full-Stack AI Engineer
          </p>
        </ScrollReveal>

        {/*
         * 3-line headline — each line is its own SplitReveal so we get a
         * guaranteed top-to-bottom cascade regardless of viewport width.
         * Delays are offset by 0.10 s per line so words from later lines
         * don't visually overtake earlier ones.
         *
         * Line timing (stagger=0.08 s, duration=0.9 s):
         *   Line 1 last word ends  ≈  0.10 + 0.08×2 + 0.9  = 1.16 s
         *   Line 2 last word ends  ≈  0.20 + 0.08×3 + 0.9  = 1.34 s
         *   Line 3 last word ends  ≈  0.30 + 0.08×3 + 0.9  = 1.44 s
         */}
        <h1
          className="mb-6 font-bold leading-[1.05] tracking-tight text-text-bright"
          style={{ fontSize: "var(--text-3xl)" }}
        >
          <SplitReveal as="span" split="words" delay={0.10} className="block">
            Production AI systems
          </SplitReveal>
          <SplitReveal as="span" split="words" delay={0.20} className="block">
            {"that don't fall apart"}
          </SplitReveal>
          <SplitReveal as="span" split="words" delay={0.30} className="block">
            in the last 10%.
          </SplitReveal>
        </h1>

        {/* Subtitle — starts just as the last headline word finishes */}
        <ScrollReveal direction="up" delay={1.25}>
          <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted">
            Full-stack AI engineer building RAG, agents, and LLM products that
            ship.
          </p>
        </ScrollReveal>

        {/* CTAs — appear after subtitle is underway */}
        <ScrollReveal direction="up" delay={1.45}>
          <div className="flex flex-wrap gap-4">
            <MagneticButton>
              <Link
                href="https://documind.app"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: "lg" })}
              >
                See DocuMind Live
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                Book a Call
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

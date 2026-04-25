/**
 * DEV-ONLY — delete this entire app/_dev/ folder before final deploy.
 * Route: /dev/animations
 *
 * Exercises all 7 animation primitives from components/animation/ on a single
 * scrollable page. Use it to spot regressions, verify reduced-motion behaviour
 * (OS-level toggle), and tune timing values.
 */

"use client";

import { SplitReveal } from "@/components/animation/SplitReveal";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { MagneticButton } from "@/components/animation/MagneticButton";
import { MarqueeLoop } from "@/components/animation/MarqueeLoop";
import { CursorFollower } from "@/components/animation/CursorFollower";
import { ParallaxBlock } from "@/components/animation/ParallaxBlock";
import { PageTransition } from "@/components/animation/PageTransition";

// ─── helpers ──────────────────────────────────────────────────────────────────

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="min-h-screen border-b border-white/10 px-8 py-24">
      <p className="mb-12 font-mono text-xs uppercase tracking-widest text-white/30">
        {label}
      </p>
      {children}
    </section>
  );
}

const STACK_ITEMS = [
  "Next.js", "React", "TypeScript", "GSAP", "Tailwind CSS",
  "Framer Motion", "FastAPI", "LangChain", "Pinecone", "Docker",
];

// ─── page ─────────────────────────────────────────────────────────────────────

export default function AnimationsDevPage() {
  return (
    <div className="bg-[#0A0A0B] text-[#E6E6E9]">
      {/* Custom cursor — visible across the whole dev page */}
      <CursorFollower />

      {/* Banner */}
      <div className="sticky top-0 z-50 bg-yellow-400/90 px-4 py-1.5 text-center font-mono text-xs font-bold text-black backdrop-blur">
        DEV PAGE — delete <code>app/_dev/</code> before deploy
      </div>

      {/* ── 1. PageTransition ─────────────────────────────────────────────── */}
      <Section label="1 · PageTransition">
        <PageTransition>
          <div className="max-w-2xl space-y-4">
            <p className="text-4xl font-bold">
              This whole block fades in on mount.
            </p>
            <p className="text-white/50">
              Toggle <code>prefers-reduced-motion</code> at OS level and reload
              — it should appear instantly with no flash.
            </p>
          </div>
        </PageTransition>
      </Section>

      {/* ── 2. SplitReveal ────────────────────────────────────────────────── */}
      <Section label="2 · SplitReveal">
        <div className="max-w-4xl space-y-16">
          <div>
            <p className="mb-2 text-xs text-white/30">{`split="lines" (default)`}</p>
            <SplitReveal as="h2" split="lines" className="text-5xl font-bold leading-tight">
              Production AI systems that don&apos;t fall apart in the last 10%.
            </SplitReveal>
          </div>
          <div>
            <p className="mb-2 text-xs text-white/30">{`split="words"`}</p>
            <SplitReveal split="words" delay={0.1} className="text-2xl">
              Full-stack AI engineer building RAG agents and LLM products that ship.
            </SplitReveal>
          </div>
          <div>
            <p className="mb-2 text-xs text-white/30">{`split="chars"`}</p>
            <SplitReveal as="h3" split="chars" className="text-3xl font-mono">
              MOIZZ.DEV
            </SplitReveal>
          </div>
        </div>
      </Section>

      {/* ── 3. ScrollReveal ───────────────────────────────────────────────── */}
      <Section label="3 · ScrollReveal">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {(["up", "down", "left", "right"] as const).map((dir, i) => (
            <ScrollReveal key={dir} direction={dir} delay={i * 0.1}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="font-mono text-sm text-white/40">{`direction="${dir}"`}</p>
                <p className="mt-2 text-lg font-semibold">Card {i + 1}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[0, 0.15, 0.3].map((delay, i) => (
            <ScrollReveal key={i} delay={delay}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <p className="font-mono text-sm text-white/40">{`delay=${delay}s`}</p>
                <p className="mt-2 text-lg font-semibold">Staggered Card {i + 1}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── 4. MagneticButton ─────────────────────────────────────────────── */}
      <Section label="4 · MagneticButton">
        <p className="mb-8 text-white/50">
          Hover each button — the element follows the cursor within its bounds.
          On touch or reduced motion, the effect is disabled.
        </p>
        <div className="flex flex-wrap gap-6">
          {([0.3, 0.5, 0.8] as const).map((s) => (
            <MagneticButton key={s} strength={s}>
              <button className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold transition-colors hover:bg-white/10">
                {`strength=${s}`}
              </button>
            </MagneticButton>
          ))}
          <MagneticButton strength={0.5}>
            <button className="rounded-full bg-[#7C3AED] px-8 py-4 text-sm font-semibold text-white">
              Primary CTA
            </button>
          </MagneticButton>
        </div>
      </Section>

      {/* ── 5. MarqueeLoop ────────────────────────────────────────────────── */}
      <Section label="5 · MarqueeLoop">
        <div className="space-y-8">
          <div>
            <p className="mb-4 text-xs text-white/30">{`direction="left" (default)`}</p>
            <MarqueeLoop speed={50}>
              {STACK_ITEMS.map((item) => (
                <span
                  key={item}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-mono"
                >
                  {item}
                </span>
              ))}
            </MarqueeLoop>
          </div>
          <div>
            <p className="mb-4 text-xs text-white/30">{`direction="right" speed=30`}</p>
            <MarqueeLoop speed={30} direction="right">
              {STACK_ITEMS.slice().reverse().map((item) => (
                <span
                  key={item}
                  className="whitespace-nowrap rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-2 text-sm font-mono text-[#7C3AED]"
                >
                  {item}
                </span>
              ))}
            </MarqueeLoop>
          </div>
        </div>
      </Section>

      {/* ── 6. CursorFollower ─────────────────────────────────────────────── */}
      <Section label="6 · CursorFollower">
        <p className="mb-6 text-white/50">
          The custom cursor (dot + ring) is active for this whole page. Hover
          the links below to see the ring expand.
        </p>
        <div className="flex gap-6">
          <a href="#" className="underline underline-offset-4">
            Hover me (link)
          </a>
          <button className="rounded border border-white/20 px-4 py-2">
            Hover me (button)
          </button>
        </div>
        <p className="mt-6 font-mono text-sm text-white/30">
          CursorFollower is rendered once at the top of this page.
        </p>
      </Section>

      {/* ── 7. ParallaxBlock ──────────────────────────────────────────────── */}
      <Section label="7 · ParallaxBlock">
        <p className="mb-8 text-white/50">
          Scroll through this section to see each block translate at a different
          speed. Clipped by the parent <code>overflow-hidden</code> container.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {([0.1, 0.2, 0.35] as const).map((speed) => (
            <div key={speed} className="overflow-hidden rounded-xl">
              <ParallaxBlock speed={speed}>
                <div className="flex h-64 items-center justify-center bg-gradient-to-br from-[#7C3AED]/20 to-transparent">
                  <span className="font-mono text-sm text-white/50">
                    {`speed=${speed}`}
                  </span>
                </div>
              </ParallaxBlock>
            </div>
          ))}
        </div>
      </Section>

      {/* Spacer */}
      <div className="py-32 text-center font-mono text-xs text-white/20">
        End of animation dev page · /dev/animations
      </div>
    </div>
  );
}

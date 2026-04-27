"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MagneticButton } from "@/components/animation/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const HeroScene = dynamic(
  () => import("@/components/webgl/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
);

function HeroFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background: [
          "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(230, 230, 233, 0.08) 0%, transparent 65%)",
          "radial-gradient(ellipse 50% 40% at 30% 70%, rgba(230, 230, 233, 0.04) 0%, transparent 60%)",
        ].join(", "),
      }}
    />
  );
}

export function Hero() {
  const [revealed, setRevealed] = useState(false);
  const reduced = useReducedMotion();
  const isTouch = useMediaQuery("(hover: none)");
  const showWebGL = !reduced && !isTouch;

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const lineStyle = (delay: number): React.CSSProperties => ({
    display: "inline-block",
    transform: revealed || reduced ? "translateY(0)" : "translateY(110%)",
    opacity: revealed || reduced ? 1 : 0,
    transition: reduced
      ? "none"
      : `transform 1.4s cubic-bezier(0.19, 1, 0.22, 1) ${delay}s, opacity 1.4s cubic-bezier(0.19, 1, 0.22, 1) ${delay}s`,
  });

  const fadeStyle = (delay: number): React.CSSProperties => ({
    transform: revealed || reduced ? "translateY(0)" : "translateY(16px)",
    opacity: revealed || reduced ? 1 : 0,
    transition: reduced
      ? "none"
      : `transform 1.1s cubic-bezier(0.19, 1, 0.22, 1) ${delay}s, opacity 1.1s cubic-bezier(0.19, 1, 0.22, 1) ${delay}s`,
  });

  return (
    <section className="hero">
      {/* Background canvas */}
      <div className="absolute inset-0 z-0" aria-hidden>
        {showWebGL ? <HeroScene /> : <HeroFallback />}
      </div>

      {/* Grid overlay */}
      <div className="hero-grid" aria-hidden />

      {/* Vignette */}
      <div className="hero-vignette" aria-hidden />

      {/* Main content — bottom-anchored */}
      <div className="container hero-content">
        {/* Eyebrow */}
        <div className="hero-eyebrow">
          <span className="dot" aria-hidden />
          <span>FULL-STACK AI ENGINEER · ISLAMABAD</span>
          <span className="line" aria-hidden />
        </div>

        {/* Headline — 3 lines, each clips on overflow */}
        <h1 className="hero-headline">
          <span className="line">
            <span className="line-inner" style={lineStyle(0.1)}>
              Production AI systems
            </span>
          </span>
          <span className="line">
            <span className="line-inner" style={lineStyle(0.2)}>
              that <em>don&apos;t fall apart</em>
            </span>
          </span>
          <span className="line">
            <span className="line-inner" style={lineStyle(0.3)}>
              in the last 10%.
            </span>
          </span>
        </h1>

        {/* Sub section */}
        <div className="hero-sub">
          <p className="hero-sub-text" style={fadeStyle(0.7)}>
            I build RAG pipelines, agentic workflows, and full-stack LLM
            products that survive production traffic, edge cases, and 2&nbsp;a.m.
            on-calls.
          </p>
          <div className="hero-sub-meta" style={fadeStyle(0.85)}>
            <span><span className="key">[role]&nbsp;</span><span className="val">freelance · contract</span></span>
            <span><span className="key">[focus]</span><span className="val"> RAG · agents · LLM apps</span></span>
            <span><span className="key">[stack]</span><span className="val"> LangGraph · FastAPI · React</span></span>
            <span><span className="key">[avail]</span><span className="val"> 2 slots open · May 2026</span></span>
          </div>
        </div>

        {/* CTAs */}
        <div className="hero-ctas" style={fadeStyle(1.0)}>
          <MagneticButton>
            <Link href="/work" className="btn btn-primary">
              View case studies <span className="btn-arrow">→</span>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link href="/contact" className="btn btn-ghost">
              Book a 20-min call
            </Link>
          </MagneticButton>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hero-bottom" aria-hidden>
        <div>SCROLL TO EXPLORE</div>
        <div className="scroll-indicator">
          <div className="scroll-indicator-line" />
        </div>
        <div>v1.0 — APR 2026</div>
      </div>
    </section>
  );
}

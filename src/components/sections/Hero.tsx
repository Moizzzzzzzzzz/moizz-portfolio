"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { MagneticButton } from "@/components/animation/MagneticButton";
import { Button } from "@/components/ui/Button";

const HeroScene = dynamic(
  () => import("@/components/webgl/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30">
        <HeroScene />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-32 md:px-8">
        <ScrollReveal direction="none" delay={0.1}>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-foreground/40">
            AI Engineer & Full-Stack Developer
          </p>
        </ScrollReveal>

        <SplitReveal
          as="h1"
          className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl"
          delay={0.2}
        >
          Building AI systems that actually ship.
        </SplitReveal>

        <ScrollReveal direction="up" delay={0.5}>
          <p className="mb-10 max-w-xl text-lg text-foreground/60">
            I design and build production-grade RAG pipelines, LLM agents, and developer tools — from zero to deployed.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.65}>
          <div className="flex flex-wrap gap-4">
            <MagneticButton>
              <Link href="/work">
                <Button size="lg">View my work</Button>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/contact">
                <Button size="lg" variant="outline">Get in touch</Button>
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { SplitReveal } from "@/components/animation/SplitReveal";

export function Philosophy() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <div className="grid gap-16 md:grid-cols-2 md:items-center">
        <div>
          <SplitReveal
            as="h2"
            className="text-4xl font-bold tracking-tight leading-tight"
          >
            Production-first, always.
          </SplitReveal>
        </div>

        <ScrollReveal direction="left">
          <div className="space-y-4 text-foreground/60 leading-relaxed">
            <p>
              I don&apos;t build demos. Every system I ship is designed for real load, real failures, and real users who won&apos;t forgive flakiness.
            </p>
            <p>
              That means observable pipelines, graceful degradation, and cost-aware inference — not just a working prototype.
            </p>
            <p>
              My background spans the full stack: from writing shader code to designing Postgres schemas to prompt engineering for sub-second latency.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

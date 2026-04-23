import { ScrollReveal } from "@/components/animation/ScrollReveal";
import type { ReactNode } from "react";

interface CaseStudySectionProps {
  title: string;
  children: ReactNode;
}

export function CaseStudySection({ title, children }: CaseStudySectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-16">
        <ScrollReveal>
          <h2 className="text-xs font-medium uppercase tracking-widest text-foreground/30 md:pt-1">
            {title}
          </h2>
        </ScrollReveal>
        <ScrollReveal direction="left">{children}</ScrollReveal>
      </div>
    </section>
  );
}

import { Brain, Bot, Layers } from "lucide-react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { Card } from "@/components/ui/Card";

const pillars = [
  {
    icon: Brain,
    title: "RAG & Document Intelligence",
    description:
      "Production retrieval-augmented generation with hybrid search, re-ranking, and source-pinned citations.",
  },
  {
    icon: Bot,
    title: "AI Agents & Automation",
    description:
      "Multi-step autonomous agents with tool use, memory, and guardrails — built on LangGraph and custom orchestration.",
  },
  {
    icon: Layers,
    title: "Full-Stack AI Products",
    description:
      "End-to-end AI-powered products with streaming UX, observable backends, and production-grade reliability.",
  },
] as const;

export function Pillars() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <ScrollReveal>
        <h2 className="mb-12 text-3xl font-bold tracking-tight">What I build</h2>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <ScrollReveal key={pillar.title} delay={i * 0.1} direction="up">
              <Card className="h-full">
                <Icon className="mb-4 h-7 w-7 text-accent" />
                <h3 className="mb-2 text-lg font-semibold">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/60">{pillar.description}</p>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

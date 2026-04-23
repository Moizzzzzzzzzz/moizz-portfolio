import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

const pillars = [
  {
    title: "RAG Systems",
    description:
      "Production retrieval-augmented generation with hybrid search, re-ranking, and citation accuracy at scale.",
    icon: "⚡",
  },
  {
    title: "LLM Agents",
    description:
      "Multi-step autonomous agents with tool use, memory, and guardrails — built on LangGraph and custom orchestration.",
    icon: "🤖",
  },
  {
    title: "AI Products",
    description:
      "End-to-end AI-powered products with thoughtful UX, streaming responses, and observable, maintainable backends.",
    icon: "📦",
  },
];

export function Pillars() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <ScrollReveal>
        <h2 className="mb-12 text-3xl font-bold tracking-tight">What I build</h2>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <ScrollReveal key={pillar.title} delay={i * 0.1} direction="up">
            <Card className="h-full">
              <span className="mb-4 block text-3xl">{pillar.icon}</span>
              <h3 className="mb-2 text-lg font-semibold">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/60">{pillar.description}</p>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

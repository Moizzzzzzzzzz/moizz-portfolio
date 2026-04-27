import { Brain, Bot, Layers } from "lucide-react";
import { cn } from "@/lib/cn";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

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
    <section className="py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="mb-12 text-3xl font-bold tracking-tight">What I build</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} delay={i * 0.1} direction="up">
                <div
                  className={cn(
                    "bg-white/5 border border-white/10 rounded-2xl",
                    "hover:border-violet-500/50 hover:bg-white/[0.08] transition-all duration-300"
                  )}
                >
                  <div className="flex flex-col h-full p-7 md:p-8">
                    <div className="w-8 h-8 mb-4 flex-shrink-0">
                      <Icon className="w-full h-full text-violet-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed text-white/60">{pillar.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

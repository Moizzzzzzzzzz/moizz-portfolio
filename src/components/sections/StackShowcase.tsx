"use client";

import { MarqueeLoop } from "@/components/animation/MarqueeLoop";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

const stack = [
  "Next.js", "TypeScript", "Python", "LangChain", "LangGraph",
  "OpenAI", "Anthropic", "Pinecone", "PostgreSQL", "Supabase",
  "FastAPI", "Docker", "Vercel", "AWS", "Tailwind CSS",
];

export function StackShowcase() {
  return (
    <section className="py-16 border-y border-foreground/5">
      <ScrollReveal>
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-foreground/30">
          My Stack
        </p>
      </ScrollReveal>

      <MarqueeLoop speed={35} pauseOnHover>
        {stack.map((item) => (
          <span
            key={item}
            className="whitespace-nowrap px-6 text-sm font-medium text-foreground/40"
          >
            {item}
          </span>
        ))}
      </MarqueeLoop>
    </section>
  );
}

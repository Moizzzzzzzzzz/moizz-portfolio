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
    <section className="pt-16 pb-16 md:pt-24 md:pb-24">
      <ScrollReveal>
        <p className="text-xs tracking-widest text-[#6B6B72] uppercase mb-6 text-center">
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

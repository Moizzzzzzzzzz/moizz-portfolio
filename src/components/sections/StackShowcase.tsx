"use client";

import { ScrollReveal } from "@/components/animation/ScrollReveal";

const items = [
  { name: "LangChain",      num: "01" },
  { name: "LangGraph",      num: "02" },
  { name: "FastAPI",        num: "03" },
  { name: "Pinecone",       num: "04" },
  { name: "Anthropic",      num: "05" },
  { name: "OpenAI",         num: "06" },
  { name: "React · Next.js",num: "07" },
  { name: "Pydantic",       num: "08" },
  { name: "Redis",          num: "09" },
  { name: "PostgreSQL",     num: "10" },
  { name: "Docker",         num: "11" },
  { name: "Vercel",         num: "12" },
];

const dup = [...items, ...items];

export function StackShowcase() {
  return (
    <section className="stack-section">
      <div className="container" style={{ marginBottom: 48 }}>
        <ScrollReveal>
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span>STACK · DAILY DRIVERS</span>
          </div>
        </ScrollReveal>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          {dup.map((it, i) => (
            <div className="marquee-item" key={i}>
              <span className="marquee-item-num">{it.num}</span>
              <span className="marquee-item-dot" aria-hidden />
              <span>{it.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

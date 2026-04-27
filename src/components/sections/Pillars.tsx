import { ScrollReveal } from "@/components/animation/ScrollReveal";

const pillars = [
  {
    num: "01",
    title: "RAG Systems",
    body: "Retrieval pipelines with mandatory citations, semantic chunking, and sub-2s response times. Hybrid retrieval with cross-encoder reranking — not a top-k cosine match.",
    tags: ["LangChain", "Pinecone", "FAISS", "Reranker"],
    glyph: `> retrieve\n> rerank\n> cite ✓`,
  },
  {
    num: "02",
    title: "Agentic Workflows",
    body: "LangGraph-based multi-agent systems with retry loops, conditional routing, and human-in-the-loop. Fault-tolerant by design.",
    tags: ["LangGraph", "MCP", "Tool use"],
    glyph: `orchestrator\n├ agent.a\n├ agent.b\n└ agent.c`,
  },
  {
    num: "03",
    title: "AI Products",
    body: "Full-stack LLM applications: FastAPI on the back, React on the front, observable, deployed, and metered against a hard cost ceiling.",
    tags: ["FastAPI", "React", "Docker", "Vercel"],
    glyph: `api/v1/*\nweb/*\ninfra/*`,
  },
] as const;

export function Pillars() {
  return (
    <section className="section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label">
              <span className="num">01</span>
              <span>WHAT I BUILD</span>
            </div>
            <h2 className="section-title">
              Three things, <em>built well</em> — not ten things, half-built.
            </h2>
          </div>
        </ScrollReveal>

        <div className="pillars">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.num} delay={i * 0.08} className="pillar">
              <div>
                <div className="pillar-num">{p.num} / Pillar</div>
                <div className="pillar-glyph">{p.glyph}</div>
                <div className="pillar-title">{p.title}</div>
                <div className="pillar-body">{p.body}</div>
              </div>
              <div className="pillar-stack">
                {p.tags.map((t) => (
                  <span key={t} className="pillar-tag">{t}</span>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

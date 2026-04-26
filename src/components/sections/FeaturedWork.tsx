import Link from "next/link";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { Button } from "@/components/ui/Button";

const projects = [
  {
    slug: "documind",
    title: "DocuMind",
    tagline:
      "Production RAG system for enterprise document Q&A with sub-second retrieval at scale.",
    tags: ["RAG", "LangChain", "Pinecone", "FastAPI"],
    href: "/work/documind",
  },
  {
    slug: "autoanalyst",
    title: "AutoAnalyst",
    tagline:
      "LLM agent that writes and executes Python data analysis code from natural language queries.",
    tags: ["Agents", "LangGraph", "Python", "OpenAI"],
    href: "/work/autoanalyst",
  },
  {
    slug: "lexai",
    title: "LexAI",
    tagline: "AI-powered legal contract analysis tool for early-stage startups.",
    tags: ["RAG", "Next.js", "TypeScript", "Anthropic"],
    href: "/work/lexai",
  },
] as const;

export function FeaturedWork() {
  return (
    <section className="py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight">Selected work</h2>
          </ScrollReveal>
          <Link
            href="/work"
            className="text-sm text-foreground/50 hover:text-foreground transition-colors"
          >
            All projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.1} direction="up">
              <Link
                href={project.href}
                className="block bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500 transition-colors"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-violet-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{project.tagline}</p>
                <span className="text-violet-400 text-sm">View case study →</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <ScrollReveal delay={0.2}>
            <Link href="/work">
              <Button variant="secondary">View All Work</Button>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

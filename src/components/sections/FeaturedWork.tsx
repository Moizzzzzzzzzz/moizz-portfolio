import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

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
    <section className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <div className="mb-12 flex items-end justify-between">
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

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project, i) => (
          <ScrollReveal key={project.slug} delay={i * 0.1} direction="up">
            <Link href={project.href} className="group block">
              <Card
                className={cn(
                  "h-full transition-all duration-300",
                  "group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                )}
              >
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <h3 className="font-semibold text-base group-hover:text-accent/80 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-sm text-foreground/50 leading-relaxed">
                  {project.tagline}
                </p>
                <div className="mt-4 flex items-center justify-end">
                  <ArrowRight
                    size={14}
                    className="text-foreground/30 group-hover:text-accent transition-colors"
                    aria-hidden="true"
                  />
                </div>
              </Card>
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
    </section>
  );
}

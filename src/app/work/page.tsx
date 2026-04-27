import type { Metadata } from "next";
import { constructMetadata, siteConfig } from "@/lib/seo";
import { getAllProjects } from "@/lib/mdx";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { WorkGrid } from "@/components/work/WorkGrid";

export const metadata: Metadata = constructMetadata({
  title: `Work — ${siteConfig.name}`,
  description: "Production AI systems, RAG pipelines, and full-stack LLM products.",
  url: `${siteConfig.url}/work`,
});

export default function WorkPage() {
  const projects = getAllProjects()
    .filter((p) => p.slug !== "auracode" && p.slug !== "techcurator")
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.order ?? b.year ?? 0) - (a.order ?? a.year ?? 0);
    });

  return (
    <>
      <header className="page-header">
        <div className="container">
          <ScrollReveal>
            <div className="page-eyebrow">
              <span className="num">02</span>
              <span>SELECTED WORK / 2024 — 2026</span>
            </div>
            <h1 className="page-title">
              Five shipped<br /><em>AI systems.</em>
            </h1>
            <p className="page-sub">
              Each one in production or with a working demo. Filter by domain.
              DocuMind is the deepest case study — start there.
            </p>
          </ScrollReveal>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <ScrollReveal delay={0.1}>
            <WorkGrid projects={projects} />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

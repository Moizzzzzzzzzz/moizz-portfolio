import type { Metadata } from "next";
import { constructMetadata, siteConfig } from "@/lib/seo";
import { getAllProjects } from "@/lib/mdx";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { WorkGrid } from "@/components/work/WorkGrid";

export const metadata: Metadata = constructMetadata({
  title: `Work — ${siteConfig.name}`,
  description:
    "A collection of AI systems, RAG pipelines, and full-stack products I've built.",
  url: `${siteConfig.url}/work`,
});

export default function WorkPage() {
  const projects = getAllProjects().sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const aOrder = a.order ?? a.year ?? 0;
    const bOrder = b.order ?? b.year ?? 0;
    return bOrder - aOrder;
  });

  return (
    <div className="content-wrapper mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8" style={{ paddingTop: "calc(var(--navbar-height) + 3rem)" }}>
      <ScrollReveal direction="up" delay={0}>
        <section className="mb-12 flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-text sm:text-5xl">
            Work
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted">
            Production AI systems, developer tools, and full-stack products
            — built to solve real problems and ship fast.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <WorkGrid projects={projects} />
      </ScrollReveal>
    </div>
  );
}

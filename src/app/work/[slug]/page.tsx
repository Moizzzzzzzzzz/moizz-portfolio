import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProjects, getProject } from "@/lib/mdx";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { StackList } from "@/components/case-study/StackList";
import { MetricCard } from "@/components/case-study/MetricCard";
import { CTASection } from "@/components/sections/CTASection";
import { constructMetadata, siteConfig } from "@/lib/seo";
import { mdxComponents } from "@/components/mdx/MDXComponents";

type MDXModule = () => Promise<{
  default: ComponentType<{ components?: MDXComponents }>;
}>;

const MDX_MODULES: Record<string, MDXModule> = {
  documind: () => import("@/content/work/documind.mdx"),
  autoanalyst: () => import("@/content/work/autoanalyst.mdx"),
  "cognitive-command": () => import("@/content/work/cognitive-command.mdx"),
  lexai: () => import("@/content/work/lexai.mdx"),
  insightai: () => import("@/content/work/insightai.mdx"),
  auracode: () => import("@/content/work/auracode.mdx"),
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { frontmatter } = getProject(slug);
    return constructMetadata({
      title: `${frontmatter.title} — Moizz`,
      description: frontmatter.description,
      url: `${siteConfig.url}/work/${slug}`,
    });
  } catch {
    return {};
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  const data = await Promise.resolve(
    (() => {
      try {
        return getProject(slug);
      } catch {
        return null;
      }
    })()
  );
  if (!data) notFound();
  const { frontmatter } = data;

  const loader = MDX_MODULES[slug];
  if (!loader) notFound();
  const { default: MDXContent } = await loader();

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Work", item: "https://moizzz.dev/work" },
              { "@type": "ListItem", position: 2, name: frontmatter.title, item: `https://moizzz.dev/work/${frontmatter.slug}` },
            ],
          }),
        }}
      />
      <CaseStudyHero frontmatter={frontmatter} />

      {(() => {
        const items = frontmatter.results ?? frontmatter.metrics?.map((m) => ({ metric: m.label, value: m.value })) ?? [];
        return items.length > 0 ? (
          <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
            <div className="flex flex-wrap gap-4">
              {items.map((m, i) => (
                <MetricCard key={m.metric} metric={m.metric} value={m.value} index={i} />
              ))}
            </div>
          </section>
        ) : null;
      })()}

      <article className="prose-section mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
        <MDXContent components={mdxComponents} />
      </article>

      <CaseStudySection title="Stack">
        <StackList stack={frontmatter.stack} />
      </CaseStudySection>

      {(() => {
        const items = frontmatter.results ?? frontmatter.metrics?.map((m) => ({ metric: m.label, value: m.value })) ?? [];
        return items.length > 0 ? (
          <CaseStudySection title="Results">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((m, i) => (
                <MetricCard key={m.metric} metric={m.metric} value={m.value} index={i} />
              ))}
            </div>
          </CaseStudySection>
        ) : null;
      })()}

      {frontmatter.demoUrl && (
        <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--color-border)]">
            <iframe
              src={frontmatter.demoUrl}
              title={`${frontmatter.title} demo`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      )}

      <nav className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            {prevProject && (
              <Link
                href={`/work/${prevProject.slug}`}
                className="group flex flex-col gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 transition-colors hover:border-[var(--color-accent)]"
              >
                <span className="text-xs text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-accent)]">
                  ← Previous
                </span>
                <span className="font-medium text-[var(--color-text-bright)]">
                  {prevProject.title}
                </span>
              </Link>
            )}
          </div>
          <div className="flex-1 flex justify-end">
            {nextProject && (
              <Link
                href={`/work/${nextProject.slug}`}
                className="group flex flex-col items-end gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 transition-colors hover:border-[var(--color-accent)]"
              >
                <span className="text-xs text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-accent)]">
                  Next →
                </span>
                <span className="font-medium text-[var(--color-text-bright)]">
                  {nextProject.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <CTASection />
    </>
  );
}

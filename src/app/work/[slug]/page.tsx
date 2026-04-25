import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getAllProjects, getProject } from "@/lib/mdx";
import { MetricCard } from "@/components/case-study/MetricCard";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { StackList } from "@/components/case-study/StackList";
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

  const metricItems =
    frontmatter.results ??
    frontmatter.metrics?.map((m) => ({ metric: m.label, value: m.value })) ??
    [];

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
              {
                "@type": "ListItem",
                position: 2,
                name: frontmatter.title,
                item: `https://moizzz.dev/work/${frontmatter.slug}`,
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="pt-24 pb-12 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Work
          </Link>

          <div className="max-w-3xl mb-8">
            <h1 className="text-[length:var(--text-3xl)] font-bold text-[var(--color-text-bright)] mb-4 leading-tight">
              {frontmatter.title}
            </h1>
            <p className="text-[length:var(--text-lg)] text-[var(--color-muted)] leading-relaxed">
              {frontmatter.tagline ?? frontmatter.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-[var(--color-muted)] mb-10">
            {frontmatter.role && (
              <span>
                Role:{" "}
                <span className="text-[var(--color-text)]">{frontmatter.role}</span>
              </span>
            )}
            {frontmatter.client && (
              <span>
                Client:{" "}
                <span className="text-[var(--color-text)]">{frontmatter.client}</span>
              </span>
            )}
            {frontmatter.duration && (
              <span>
                Duration:{" "}
                <span className="text-[var(--color-text)]">{frontmatter.duration}</span>
              </span>
            )}
            {frontmatter.liveUrl && (
              <a
                href={frontmatter.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline"
              >
                Live demo ↗
              </a>
            )}
            {frontmatter.githubUrl && (
              <a
                href={frontmatter.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline"
              >
                GitHub ↗
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {frontmatter.stack?.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs border border-[var(--color-border)] text-[var(--color-muted)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {frontmatter.cover && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--color-border)]">
              <Image
                src={frontmatter.cover}
                alt={frontmatter.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          )}
        </div>
      </section>

      {/* Metrics strip */}
      {metricItems.length > 0 && (
        <section className="py-12 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {metricItems.map((m, i) => (
                <MetricCard key={m.metric} metric={m.metric} value={m.value} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MDX body */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto prose-styles">
            <MDXContent components={mdxComponents} />
          </div>
        </div>
      </section>

      {/* Stack */}
      <CaseStudySection title="Stack">
        <StackList stack={frontmatter.stack} />
      </CaseStudySection>

      {/* Live demo */}
      {frontmatter.demoUrl && (
        <section className="max-w-7xl mx-auto px-6 py-8">
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

      {/* Prev / Next */}
      <nav className="max-w-7xl mx-auto px-6 py-12">
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

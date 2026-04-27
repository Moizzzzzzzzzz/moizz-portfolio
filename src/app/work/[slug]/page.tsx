import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects, getProject } from "@/lib/mdx";
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

  const metricItems =
    frontmatter.results ??
    frontmatter.metrics?.map((m) => ({ metric: m.label, value: m.value })) ??
    [];

  return (
    <main className="min-h-screen">
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

      {/* ONE global centered column — wraps everything */}
      <div className="w-full max-w-3xl mx-auto px-6 lg:px-8 py-12">

        {/* Back link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-[#6B6B72] hover:text-[#FAFAFA] transition-colors mb-10"
        >
          ← Back to Work
        </Link>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#FAFAFA] tracking-tight leading-tight mb-4">
          {frontmatter.title}
        </h1>

        {/* Tagline */}
        <p className="text-lg text-[#6B6B72] leading-snug mb-8 max-w-xl">
          {frontmatter.tagline ?? frontmatter.description}
        </p>

        {/* Meta: Role · Client · Duration */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#6B6B72] pb-8 mb-8 border-b border-[#1F1F22]">
          <span>Role: <strong className="text-[#FAFAFA]">{frontmatter.role}</strong></span>
          <span>Client: <strong className="text-[#FAFAFA]">{frontmatter.client}</strong></span>
          {frontmatter.duration && (
            <span>Duration: <strong className="text-[#FAFAFA]">{frontmatter.duration}</strong></span>
          )}
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {frontmatter.stack?.map((tech: string) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full border border-[#1F1F22] text-[#6B6B72] font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Cover image — if exists */}
        {frontmatter.cover && (
          <div className="rounded-2xl overflow-hidden border border-[#1F1F22] mb-16">
            <Image
              src={frontmatter.cover}
              alt={frontmatter.title}
              width={1200}
              height={630}
              className="w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Metrics grid */}
        {metricItems.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-16 pb-16 border-b border-[#1F1F22]">
            {metricItems.map((r) => (
              <MetricCard key={r.metric} {...r} />
            ))}
          </div>
        )}

        {/* MDX Body */}
        <div className="
          [&>h2]:text-2xl [&>h2]:font-semibold
          [&>h2]:text-[#FAFAFA] [&>h2]:mt-14 [&>h2]:mb-5
          [&>h3]:text-lg [&>h3]:font-semibold
          [&>h3]:text-[#FAFAFA] [&>h3]:mt-8 [&>h3]:mb-3
          [&>p]:text-[#6B6B72] [&>p]:leading-relaxed
          [&>p]:mb-5 [&>p]:text-base
          [&>ul]:text-[#6B6B72] [&>ul]:leading-relaxed
          [&>ul]:mb-5 [&>ul]:pl-5 [&>ul]:space-y-2
          [&>ul>li]:marker:text-[#7C3AED]
          [&>strong]:text-[#FAFAFA]">
          <MDXContent components={mdxComponents} />
        </div>

        {/* Prev / Next nav */}
        <div className="flex justify-between gap-4 mt-20 pt-10 border-t border-[#1F1F22]">
          {prevProject && (
            <Link
              href={`/work/${prevProject.slug}`}
              className="flex flex-col gap-1 group"
            >
              <span className="text-xs text-[#6B6B72] uppercase tracking-wider">← Previous</span>
              <span className="text-sm font-medium text-[#FAFAFA] group-hover:text-[#7C3AED] transition-colors">
                {prevProject.title}
              </span>
            </Link>
          )}
          {nextProject && (
            <Link
              href={`/work/${nextProject.slug}`}
              className="flex flex-col gap-1 text-right ml-auto group"
            >
              <span className="text-xs text-[#6B6B72] uppercase tracking-wider">Next →</span>
              <span className="text-sm font-medium text-[#FAFAFA] group-hover:text-[#7C3AED] transition-colors">
                {nextProject.title}
              </span>
            </Link>
          )}
        </div>

      </div>{/* end global container */}

      {/* CTA Section — full width, own padding */}
      <CTASection />

    </main>
  );
}

import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

      {/* Hero */}
      <section className='pt-16 pb-12 border-b border-[#1F1F22]'>
        <div className='max-w-3xl mx-auto px-6'>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-[#6B6B72] hover:text-[#FAFAFA] transition-colors mb-8 group"
          >
            ← Back to Work
          </Link>

          <h1 className="text-5xl md:text-7xl font-bold text-[#FAFAFA] tracking-tight mb-4">
            {frontmatter.title}
          </h1>

          <p className='text-xl text-[#6B6B72] leading-snug max-w-xl mt-3 mb-8'>
            {frontmatter.tagline ?? frontmatter.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-6 text-sm text-[#6B6B72] mb-10 pb-10 border-b border-[#1F1F22]">
            {frontmatter.role && (
              <span>
                Role: <strong className="text-[#FAFAFA]">{frontmatter.role}</strong>
              </span>
            )}
            {frontmatter.client && (
              <span>
                Client: <strong className="text-[#FAFAFA]">{frontmatter.client}</strong>
              </span>
            )}
            {frontmatter.duration && (
              <span>
                Duration: <strong className="text-[#FAFAFA]">{frontmatter.duration}</strong>
              </span>
            )}
            {frontmatter.liveUrl && (
              <a
                href={frontmatter.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                Live demo ↗
              </a>
            )}
            {frontmatter.githubUrl && (
              <a
                href={frontmatter.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                GitHub ↗
              </a>
            )}
          </div>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-2">
            {frontmatter.stack?.map((tech: string) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 rounded-full border border-[#1F1F22] text-[#6B6B72] font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Cover image */}
          {frontmatter.cover && (
            <div className="mt-12">
              <div className="rounded-2xl overflow-hidden border border-[#1F1F22]">
                <Image
                  src={frontmatter.cover}
                  alt={frontmatter.title}
                  width={1200}
                  height={630}
                  className="w-full object-cover"
                  priority
                />
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Metrics strip */}
      {metricItems.length > 0 && (
        <section className='py-12 border-b border-[#1F1F22]'>
          <div className='max-w-3xl mx-auto px-6'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
              {metricItems.map((m, i) => (
                <MetricCard key={m.metric} metric={m.metric} value={m.value} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MDX body */}
      <section className='py-16'>
        <div className='max-w-3xl mx-auto px-6 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-[#FAFAFA] [&>h2]:mt-14 [&>h2]:mb-5 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-[#FAFAFA] [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:text-[#6B6B72] [&>p]:leading-relaxed [&>p]:mb-5 [&>p]:text-base [&>ul]:text-[#6B6B72] [&>ul]:leading-relaxed [&>ul]:mb-5 [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul>li]:text-base'>
          <MDXContent components={mdxComponents} />
        </div>
      </section>

      {/* Stack */}
      <CaseStudySection title="Stack">
        <StackList stack={frontmatter.stack} />
      </CaseStudySection>

      {/* Live demo */}
      {frontmatter.demoUrl && (
        <section className="py-8">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
              <iframe
                src={frontmatter.demoUrl}
                title={`${frontmatter.title} demo`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <nav className="py-12">
        <div className='max-w-3xl mx-auto px-6'>
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              {prevProject && (
                <Link
                  href={`/work/${prevProject.slug}`}
                  className="group flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 hover:border-violet-500/50 hover:bg-white/[0.07] transition-all duration-300 space-y-2 p-6"
                >
                  <span className="text-xs text-white/40 group-hover:text-violet-400 transition-colors">
                    ← Previous
                  </span>
                  <span className="font-semibold text-white">
                    {prevProject.title}
                  </span>
                </Link>
              )}
            </div>
            <div className="flex-1 flex justify-end">
              {nextProject && (
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="group flex flex-col items-end gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 hover:border-violet-500/50 hover:bg-white/[0.07] transition-all duration-300 space-y-2 p-6"
                >
                  <span className="text-xs text-white/40 group-hover:text-violet-400 transition-colors">
                    Next →
                  </span>
                  <span className="font-semibold text-white">
                    {nextProject.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className='max-w-3xl mx-auto px-6'>
        <CTASection />
      </div>
    </main>
  );
}

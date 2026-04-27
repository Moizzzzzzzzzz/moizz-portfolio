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

  const allProjects = getAllProjects().filter(
    (p) => p.slug !== "auracode" && p.slug !== "techcurator"
  );
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const metricItems =
    frontmatter.results ??
    frontmatter.metrics?.map((m: { label: string; value: string }) => ({ metric: m.label, value: m.value })) ??
    [];

  const coverSrc = frontmatter.cover ?? `/images/work/${slug}/cover.webp`;

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

      {/* ── Page header ──────────────────────────────────────────────── */}
      <header className="page-header">
        <div className="container">
          {/* Back */}
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              marginBottom: 48,
              transition: "color 0.2s",
            }}
            className="hover-accent"
          >
            ← Back to Work
          </Link>

          {/* Eyebrow */}
          <div className="page-eyebrow">
            <span className="num">02</span>
            <span>SELECTED WORK / {frontmatter.title?.toUpperCase()}</span>
          </div>

          {/* Title */}
          <h1 className="page-title">
            <em>{frontmatter.title}</em>
          </h1>

          {/* Tagline */}
          <p className="page-sub" style={{ maxWidth: 640 }}>
            {frontmatter.tagline ?? frontmatter.description}
          </p>

          {/* Meta row */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "32px 48px",
            marginTop: 40,
            paddingTop: 40,
            borderTop: "1px solid var(--color-border)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            {[
              { label: "Role", val: frontmatter.role },
              { label: "Client", val: frontmatter.client },
              frontmatter.duration ? { label: "Duration", val: frontmatter.duration } : null,
              { label: "Status", val: frontmatter.status === "live" ? "● Live" : "Case Study" },
            ].filter(Boolean).map((item) => item && (
              <div key={item.label}>
                <div style={{ color: "var(--color-muted)", marginBottom: 6 }}>{item.label}</div>
                <div style={{ color: "var(--color-text-bright)" }}>{item.val}</div>
              </div>
            ))}
          </div>

          {/* Stack tags + live link */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginTop: 28 }}>
            {frontmatter.stack?.map((tech: string) => (
              <span key={tech} className="pillar-tag">{tech}</span>
            ))}
            {frontmatter.liveUrl && (
              <a
                href={frontmatter.liveUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-bg)",
                  background: "var(--color-accent)",
                  padding: "6px 14px",
                  textDecoration: "none",
                  marginLeft: 4,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-bg)", display: "inline-block" }} />
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ── Cover image ──────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            border: "1px solid var(--color-border)",
          }}>
            <Image
              src={coverSrc}
              alt={frontmatter.title}
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>
      </section>

      {/* ── Metrics ──────────────────────────────────────────────────── */}
      {metricItems.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              border: "1px solid var(--color-border)",
            }}>
              {metricItems.map((r: { metric: string; value: string; note?: string }, i: number) => (
                <div
                  key={r.metric}
                  style={{ borderRight: i < metricItems.length - 1 ? "1px solid var(--color-border)" : "none" }}
                >
                  <MetricCard {...r} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── MDX Body ─────────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="cs-body">
            <MDXContent components={mdxComponents} />
          </div>
        </div>
      </section>

      {/* ── Prev / Next nav ──────────────────────────────────────────── */}
      {(prevProject || nextProject) && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 40,
              borderTop: "1px solid var(--color-border)",
              gap: 24,
            }}>
              {prevProject ? (
                <Link href={`/work/${prevProject.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 8 }}>← Previous</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.25rem", color: "var(--color-text-bright)", fontWeight: 300 }}>{prevProject.title}</div>
                </Link>
              ) : <div />}
              {nextProject && (
                <Link href={`/work/${nextProject.slug}`} style={{ textDecoration: "none", textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 8 }}>Next →</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.25rem", color: "var(--color-text-bright)", fontWeight: 300 }}>{nextProject.title}</div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <CTASection />
    </>
  );
}

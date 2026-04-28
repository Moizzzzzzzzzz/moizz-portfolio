import type { Metadata } from "next";
import type { MDXComponents } from "mdx/types";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { TableOfContents } from "@/components/mdx/TableOfContents";
import type { TocHeading } from "@/components/mdx/TableOfContents";
import { constructMetadata, siteConfig } from "@/lib/seo";

type MDXModule = () => Promise<{
  default: ComponentType<{ components?: MDXComponents }>;
}>;

const MDX_MODULES: Record<string, MDXModule> = {
  "rag-hallucinations":       () => import("@/content/writing/rag-hallucinations.mdx"),
  "langgraph-vs-langchain":   () => import("@/content/writing/langgraph-vs-langchain.mdx"),
  "production-llm-checklist": () => import("@/content/writing/production-llm-checklist.mdx"),
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/`[^`]*`/g, (m) => m.slice(1, -1))
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractHeadings(raw: string): TocHeading[] {
  const headings: TocHeading[] = [];
  for (const m of raw.matchAll(/^(#{2,3}) (.+)$/gm)) {
    const level = m[1].length as 2 | 3;
    const text = m[2].replace(/`[^`]*`/g, (s) => s.slice(1, -1)).trim();
    headings.push({ id: slugify(text), text, level });
  }
  return headings;
}

function parseReadingMinutes(readingTime: string): number {
  const match = readingTime.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function nodeToText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (typeof node === "object") {
    const el = node as { props?: { children?: ReactNode } };
    return nodeToText(el.props?.children);
  }
  return "";
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return {};
  return {
    ...constructMetadata({
      title: `${post.title} — Moizz K`,
      description: post.description,
      url: `${siteConfig.url}/writing/${slug}`,
    }),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      url: `${siteConfig.url}/writing/${slug}`,
      siteName: siteConfig.name,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const post = await getPostBySlug(slug).catch(() => notFound());

  const loader = MDX_MODULES[slug];
  if (!loader) notFound();
  const { default: MDXContent } = await loader();

  const headings = extractHeadings(post.content);
  const showToc = parseReadingMinutes(post.readingTime) > 5 && headings.length > 0;

  const allPosts = getAllPosts();
  const related = (() => {
    const others = allPosts.filter((p) => p.slug !== slug);
    const tagged = others.filter((p) => p.tags.some((t) => post.tags.includes(t)));
    return (tagged.length >= 2 ? tagged : others).slice(0, 2);
  })();

  const articleComponents: MDXComponents = {
    ...mdxComponents,
    h2: ({ children, ...props }) => {
      const id = slugify(nodeToText(children));
      return (
        <h2 id={id} className="scroll-mt-24 cs-body-h2" {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const id = slugify(nodeToText(children));
      return (
        <h3 id={id} className="scroll-mt-24 cs-body-h3" {...props}>
          {children}
        </h3>
      );
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: "Abdul Moizz Khan",
              url: "https://moizzz.dev/about",
            },
            publisher: {
              "@type": "Person",
              name: "Moizz K",
              url: "https://moizzz.dev",
            },
            url: `https://moizzz.dev/writing/${post.slug}`,
          }),
        }}
      />

      {/* Reading progress bar */}
      <style>{`
        .reading-progress {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-accent);
          transform-origin: left;
          z-index: 100;
        }
        @supports (animation-timeline: scroll()) {
          .reading-progress {
            display: block;
            animation: reading-progress linear both;
            animation-timeline: scroll();
          }
        }
        @keyframes reading-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) { .reading-progress { display: none !important; } }
      `}</style>
      <div className="reading-progress" aria-hidden="true" />

      {/* ── Page header ─────────────────────────────────────────────── */}
      <header className="page-header">
        <div className="container" style={{ maxWidth: showToc ? "none" : 760 }}>

          {/* Back */}
          <Link
            href="/writing"
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
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            className="hover-accent"
          >
            ← Back to Writing
          </Link>

          {/* Eyebrow: date · reading time */}
          <div className="page-eyebrow">
            <span className="num">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span>{post.readingTime} read</span>
          </div>

          {/* Title */}
          <h1 className="page-title" style={{ maxWidth: 760 }}>
            <em>{post.title}</em>
          </h1>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
            {post.tags.map((tag) => (
              <span key={tag} className="pillar-tag">{tag}</span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Body + optional TOC ──────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div
          className="container"
          style={showToc
            ? { display: "grid", gridTemplateColumns: "1fr 260px", gap: 64, alignItems: "start" }
            : { maxWidth: 760 }
          }
        >
          {/* Article body */}
          <article>
            <div className="cs-body">
              <MDXContent components={articleComponents} />
            </div>

            {/* Author card */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 64,
              padding: "28px 32px",
              border: "1px solid var(--color-border)",
              background: "var(--color-surface-2)",
            }}>
              <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0, overflow: "hidden", borderRadius: "50%" }}>
                <Image
                  src="/images/about/moizz.png"
                  alt="Moizz K"
                  fill
                  sizes="52px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.1rem", color: "var(--color-text-bright)", fontWeight: 300 }}>
                  Moizz K
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-muted)", marginTop: 4 }}>
                  Full-stack AI engineer — RAG · Agents · LLM products
                </div>
              </div>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div style={{ marginTop: 64 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 24 }}>
                  Related Articles
                </div>
                <div style={{ display: "grid", gap: 1, border: "1px solid var(--color-border)" }}>
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/writing/${p.slug}`}
                      style={{ textDecoration: "none", display: "block", padding: "24px 28px", background: "var(--color-surface-2)", borderBottom: "1px solid var(--color-border)", transition: "background 0.2s" }}
                      className="writing-related-link"
                    >
                      <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.1rem", color: "var(--color-text-bright)", fontWeight: 300, marginBottom: 6 }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.5 }}>
                        {p.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* TOC sidebar */}
          {showToc && (
            <aside style={{ position: "sticky", top: 100 }}>
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import type { MDXComponents } from "mdx/types";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { Tag } from "@/components/ui/Tag";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { TableOfContents } from "@/components/mdx/TableOfContents";
import type { TocHeading } from "@/components/mdx/TableOfContents";
import { constructMetadata, siteConfig } from "@/lib/seo";

// ---------------------------------------------------------------------------
// MDX module map — static imports so Next.js can tree-shake and bundle correctly
// ---------------------------------------------------------------------------
type MDXModule = () => Promise<{
  default: ComponentType<{ components?: MDXComponents }>;
}>;

const MDX_MODULES: Record<string, MDXModule> = {
  "rag-hallucinations": () => import("@/content/writing/rag-hallucinations.mdx"),
  "langgraph-vs-langchain": () => import("@/content/writing/langgraph-vs-langchain.mdx"),
  "production-llm-checklist": () => import("@/content/writing/production-llm-checklist.mdx"),
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Route exports
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const post = await getPostBySlug(slug).catch(() => notFound());

  const loader = MDX_MODULES[slug];
  if (!loader) notFound();
  const { default: MDXContent } = await loader();

  const headings = extractHeadings(post.content);
  const showToc = parseReadingMinutes(post.readingTime) > 5 && headings.length > 0;

  // Related posts: prefer tag matches; fall back to 2 most recent
  const allPosts = getAllPosts();
  const related = (() => {
    const others = allPosts.filter((p) => p.slug !== slug);
    const tagged = others.filter((p) => p.tags.some((t) => post.tags.includes(t)));
    return (tagged.length >= 2 ? tagged : others).slice(0, 2);
  })();

  // Custom heading components that inject IDs so TOC links resolve correctly.
  // Defined per-render (SSR only) — no client-side remount concern.
  const articleComponents: MDXComponents = {
    ...mdxComponents,
    h2: ({ children, ...props }) => {
      const id = slugify(nodeToText(children));
      return (
        <h2
          id={id}
          className="mt-8 mb-3 scroll-mt-24 text-2xl font-semibold text-[var(--color-text-bright)]"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const id = slugify(nodeToText(children));
      return (
        <h3
          id={id}
          className="mt-6 mb-2 scroll-mt-24 text-xl font-semibold text-[var(--color-text-bright)]"
          {...props}
        >
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
      {/* Reading progress bar — CSS scroll-driven animation, SSR-safe, no JS */}
      <style>{`
        .reading-progress {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--color-accent);
          transform-origin: left;
          z-index: 50;
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
        @media (prefers-reduced-motion: reduce) {
          .reading-progress { display: none !important; }
        }
      `}</style>
      <div className="reading-progress" aria-hidden="true" />

      <main className="mx-auto max-w-7xl px-4 pt-28 pb-24 md:px-8">
        <div
          className={
            showToc
              ? "grid grid-cols-1 lg:grid-cols-12 lg:gap-12"
              : undefined
          }
        >
          {/* ----------------------------------------------------------------
              Article
          ----------------------------------------------------------------- */}
          <article className={showToc ? "lg:col-span-9" : "mx-auto max-w-3xl"}>
            {/* Header */}
            <header className="mb-12">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted)]">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingTime}</span>
              </div>

              <SplitReveal
                as="h1"
                split="lines"
                className="mb-5 font-bold tracking-tight text-[var(--color-text-bright)] text-2xl md:text-3xl"
              >
                {post.title}
              </SplitReveal>

              <ScrollReveal delay={0.25}>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </ScrollReveal>
            </header>

            {/* Body */}
            <div className="max-w-none text-[var(--color-text)]">
              <MDXContent components={articleComponents} />
            </div>

            {/* Author card */}
            <ScrollReveal>
              <footer className="mt-16 flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[var(--color-border)]">
                  <Image
                    src="/images/about/moizz.webp"
                    alt="Moizz K"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-text-bright)]">Moizz K</p>
                  <p className="text-sm text-[var(--color-muted)]">
                    Full-stack AI engineer — RAG, Agents, LLM products
                  </p>
                </div>
              </footer>
            </ScrollReveal>

            {/* Related posts */}
            {related.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-6 text-lg font-semibold text-[var(--color-text-bright)]">
                  Related Articles
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/writing/${p.slug}`}
                      className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 transition-colors duration-200 hover:border-[var(--color-accent)]"
                    >
                      <h3 className="mb-1 font-semibold text-[var(--color-text-bright)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                        {p.title}
                      </h3>
                      <p className="text-sm text-[var(--color-muted)]">{p.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* ----------------------------------------------------------------
              TOC sidebar — desktop only, sticky
          ----------------------------------------------------------------- */}
          {showToc && (
            <aside className="hidden lg:col-span-3 lg:block">
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>
      </main>
    </>
  );
}

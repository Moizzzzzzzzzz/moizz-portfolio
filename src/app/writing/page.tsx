import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { Tag } from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "Writing — Moizz K",
  description:
    "Practical writing on RAG systems, AI agents, and production LLM engineering.",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-2xl px-4 pt-28 pb-24 md:px-8">
      <header className="mb-16">
        <SplitReveal
          as="h1"
          split="lines"
          className="font-bold tracking-tight text-[var(--color-text-bright)] text-3xl"
        >
          Writing
        </SplitReveal>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          Thoughts on RAG, agents, and shipping production LLM systems.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        {posts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.08}>
            <article>
              <Link
                href={`/writing/${post.slug}`}
                className="group mb-2 block"
              >
                <h2 className="text-xl font-semibold text-[var(--color-text-bright)] underline-offset-4 decoration-[var(--color-accent)] transition-colors duration-200 group-hover:text-[var(--color-accent)] group-hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="mb-3 text-base text-[var(--color-muted)]">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--color-muted)]">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingTime}</span>
                {post.tags.length > 0 && (
                  <>
                    <span aria-hidden>·</span>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

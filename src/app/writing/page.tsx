import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "Writing — Moizz K",
  description:
    "Practical writing on RAG systems, AI agents, and production LLM engineering.",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <>
      <header className="page-header">
        <div className="container">
          <ScrollReveal>
            <div className="page-eyebrow">
              <span className="num">04</span>
              <span>WRITING / FIELD NOTES</span>
            </div>
            <h1 className="page-title">
              Notes from<br /><em>production AI.</em>
            </h1>
            <p className="page-sub">
              Short technical writing on what breaks, what holds, and how to tell
              the difference. {posts.length} articles. More on the way.
            </p>
          </ScrollReveal>
        </div>
      </header>

      <section className="section">
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="writing-list">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.06}>
                <Link href={`/writing/${post.slug}`} style={{ display: "contents" }}>
                  <div className="writing-row">
                    <div className="writing-row-num">
                      {String(i + 1).padStart(2, "0")} / {String(posts.length).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="writing-row-title">{post.title}</div>
                      <div className="writing-row-title-sub">{post.description}</div>
                    </div>
                    <div className="writing-row-tags">
                      {post.tags.map((t) => (
                        <span key={t} className="pillar-tag">{t}</span>
                      ))}
                    </div>
                    <div className="writing-row-meta">
                      <div>{formatDate(post.date)}</div>
                      <div style={{ marginTop: 6, color: "var(--color-text)" }}>{post.readingTime}</div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

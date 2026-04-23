import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/mdx";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { Tag } from "@/components/ui/Tag";
import { CTASection } from "@/components/sections/CTASection";
import { constructMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const { frontmatter } = getPost(slug);
    return constructMetadata({ title: `${frontmatter.title} — Moizz`, description: frontmatter.description });
  } catch {
    return {};
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  let data;
  try {
    data = getPost(slug);
  } catch {
    notFound();
  }
  const { frontmatter, content } = data;

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 pt-28 pb-24 md:px-8">
        <header className="mb-12">
          <ScrollReveal direction="none">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-foreground/40">
              <time>{new Date(frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
              {frontmatter.readingTime && <span>· {frontmatter.readingTime}</span>}
            </div>
          </ScrollReveal>
          <SplitReveal as="h1" className="mb-4 text-4xl font-bold tracking-tight md:text-5xl" delay={0.1}>
            {frontmatter.title}
          </SplitReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </ScrollReveal>
        </header>

        <ScrollReveal direction="up" delay={0.4}>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {content}
          </div>
        </ScrollReveal>
      </article>
      <CTASection title="Found this useful?" primaryLabel="Let's talk" />
    </>
  );
}

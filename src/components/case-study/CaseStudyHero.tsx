import Image from "next/image";
import { Tag } from "@/components/ui/Tag";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import type { CaseStudyFrontmatter } from "@/types";

export function CaseStudyHero({ frontmatter }: { frontmatter: CaseStudyFrontmatter }) {
  const subtitle = frontmatter.tagline ?? frontmatter.description ?? "";
  const tags = frontmatter.tags ?? frontmatter.stack ?? [];
  const displayDate = frontmatter.year?.toString() ?? frontmatter.date?.slice(0, 7) ?? "";

  return (
    <section className="mx-auto max-w-6xl px-4 pt-28 pb-16 md:px-8">
      <ScrollReveal direction="none">
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </ScrollReveal>

      <SplitReveal
        as="h1"
        className="mb-6 text-5xl font-bold tracking-tight leading-tight md:text-6xl"
        delay={0.1}
      >
        {frontmatter.title}
      </SplitReveal>

      <ScrollReveal direction="up" delay={0.3}>
        <p className="max-w-2xl text-xl text-foreground/60">{subtitle}</p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.4}>
        <div className="mt-8 flex flex-wrap gap-6 text-sm text-foreground/40">
          {displayDate && <span>{displayDate}</span>}
          {frontmatter.liveUrl && (
            <a href={frontmatter.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Live →
            </a>
          )}
          {frontmatter.githubUrl && (
            <a href={frontmatter.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              GitHub →
            </a>
          )}
        </div>
      </ScrollReveal>

      {frontmatter.cover && (
        <ScrollReveal direction="up" delay={0.5}>
          <div className="relative mt-12 w-full aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={frontmatter.cover}
              alt={frontmatter.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 75vw"
              priority
            />
          </div>
        </ScrollReveal>
      )}
    </section>
  );
}

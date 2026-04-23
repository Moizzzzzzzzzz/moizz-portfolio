import Link from "next/link";
import Image from "next/image";
import { Tag } from "@/components/ui/Tag";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { getAllProjects } from "@/lib/mdx";

export function FeaturedWork() {
  const projects = getAllProjects()
    .filter((p) => p.featured)
    .slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <div className="mb-12 flex items-end justify-between">
        <ScrollReveal>
          <h2 className="text-3xl font-bold tracking-tight">Selected work</h2>
        </ScrollReveal>
        <Link href="/work" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
          All projects →
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {projects.map((project, i) => (
          <ScrollReveal key={project.slug} delay={i * 0.1} direction="up">
            <Link href={`/work/${project.slug}`} className="group block">
              <div className="mb-4 overflow-hidden rounded-xl bg-foreground/5">
                <Image
                  src={project.cover}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <h3 className="font-semibold group-hover:text-foreground/70 transition-colors">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-foreground/50">{project.description}</p>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

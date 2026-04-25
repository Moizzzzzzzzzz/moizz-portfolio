"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Tag } from "@/components/ui/Tag";
import type { CaseStudyFrontmatter } from "@/types";

type Project = CaseStudyFrontmatter & { slug: string };

type FilterKey = "All" | "RAG" | "Agents" | "Full-Stack";

const FILTERS: FilterKey[] = ["All", "RAG", "Agents", "Full-Stack"];

function matchesFilter(project: Project, filter: FilterKey): boolean {
  if (filter === "All") return true;
  const tags = project.tags ?? project.stack ?? [];
  if (filter === "RAG") return tags.includes("RAG");
  if (filter === "Agents") return tags.includes("Agents");
  return !tags.includes("RAG") && !tags.includes("Agents");
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`}>
      <article className="group relative rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 bg-[var(--color-surface)]">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--color-border)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-accent)] text-white tracking-wide">
            Featured
          </span>
        </div>
        <div className="p-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-2xl font-bold text-[var(--color-text-bright)] group-hover:text-[var(--color-accent)] transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors shrink-0 mt-1" />
          </div>
          <p className="text-[var(--color-muted)] leading-relaxed mb-5">
            {project.tagline ?? project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack?.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

function RegularCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="flex">
      <article className="group relative flex flex-col w-full rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 bg-[var(--color-surface)]">
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--color-border)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-bold text-[var(--color-text-bright)] group-hover:text-[var(--color-accent)] transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors shrink-0 mt-1" />
          </div>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4 line-clamp-2">
            {project.tagline ?? project.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-2">
            {project.stack?.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded-full text-xs border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");

  const filtered = projects.filter((p) => matchesFilter(p, activeFilter));
  const featuredProject = filtered.find((p) => p.featured);
  const regularProjects = filtered.filter((p) => !p.featured);

  return (
    <div className={cn("flex flex-col gap-8")}>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <Tag
            key={filter}
            variant={activeFilter === filter ? "accent" : "default"}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Tag>
        ))}
      </div>

      <div className="space-y-6">
        {featuredProject && <FeaturedCard project={featuredProject} />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularProjects.map((project) => (
            <RegularCard key={project.slug} project={project} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-16 text-center text-[var(--color-muted)]">No projects found.</p>
        )}
      </div>
    </div>
  );
}

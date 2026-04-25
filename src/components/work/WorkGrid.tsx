"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

interface FeaturedCardProps {
  project: Project;
}

function FeaturedCard({ project }: FeaturedCardProps) {
  const tags = project.tags ?? project.stack ?? [];
  const subtitle = project.tagline ?? project.description ?? "";
  const displayDate = project.year?.toString() ?? project.date?.slice(0, 7) ?? "";
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group col-span-full lg:col-span-2 flex flex-col overflow-hidden rounded-xl",
        "border border-border bg-surface",
        "transition-all duration-300 hover:border-accent/30"
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
          Featured
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-text">{project.title}</h3>
          {displayDate && <span className="shrink-0 text-sm text-muted">{displayDate}</span>}
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{subtitle}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {tags.slice(0, 4).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const tags = project.tags ?? project.stack ?? [];
  const subtitle = project.tagline ?? project.description ?? "";
  const displayDate = project.year?.toString() ?? project.date?.slice(0, 7) ?? "";
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl",
        "border border-border bg-surface",
        "transition-all duration-300 hover:border-accent/30"
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-text">{project.title}</h3>
          {displayDate && <span className="shrink-0 text-xs text-muted">{displayDate}</span>}
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{subtitle}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {tags.slice(0, 2).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}

interface WorkGridProps {
  projects: Project[];
}

export function WorkGrid({ projects }: WorkGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");

  const filtered = projects.filter((p) => matchesFilter(p, activeFilter));
  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <div className="flex flex-col gap-8">
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

      <div
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
          "transition-opacity duration-300"
        )}
      >
        {featured && <FeaturedCard project={featured} />}
        {rest.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-muted">
            No projects found.
          </p>
        )}
      </div>
    </div>
  );
}

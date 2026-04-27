"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ProjectCover } from "./ProjectCover";
import type { CaseStudyFrontmatter } from "@/types";

type Project = CaseStudyFrontmatter & { slug: string };
type FilterKey = "All" | "RAG" | "Agents" | "Full-Stack";
const FILTERS: FilterKey[] = ["All", "RAG", "Agents", "Full-Stack"];

function matchesFilter(project: Project, filter: FilterKey): boolean {
  if (filter === "All") return true;
  const tags = project.tags ?? project.stack ?? [];
  if (filter === "RAG") return tags.includes("RAG");
  if (filter === "Agents") return tags.includes("Agents");
  // Full-Stack = has Full-Stack tag, or neither RAG nor Agents
  return tags.includes("Full-Stack") || (!tags.includes("RAG") && !tags.includes("Agents"));
}

function FilterBar({ tags, active, onChange }: { tags: readonly FilterKey[]; active: FilterKey; onChange: (f: FilterKey) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = activeRef.current;
    const bg = bgRef.current;
    const container = containerRef.current;
    if (!btn || !bg || !container) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    bg.style.width = `${btnRect.width}px`;
    bg.style.transform = `translateX(${btnRect.left - containerRect.left - 6}px)`;
  }, [active]);

  return (
    <div className="filter-bar" ref={containerRef} role="tablist">
      <span
        ref={bgRef}
        className="filter-pill-active-bg"
        style={{ position: "absolute", top: 6, bottom: 6, left: 6, transition: "width 480ms cubic-bezier(0.19,1,0.22,1), transform 480ms cubic-bezier(0.19,1,0.22,1)" }}
        aria-hidden
      />
      {tags.map((t) => (
        <button
          key={t}
          ref={active === t ? activeRef : undefined}
          className={`filter-pill${active === t ? " active" : ""}`}
          onClick={() => onChange(t)}
          role="tab"
          aria-selected={active === t}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");

  const filtered = projects.filter((p) => matchesFilter(p, activeFilter));
  const featuredIdx = filtered.findIndex((p) => p.featured);

  return (
    <div>
      <FilterBar tags={FILTERS} active={activeFilter} onChange={setActiveFilter} />

      <div className="work-grid">
        {filtered.map((project, i) => {
          const isFeatured = i === featuredIdx && filtered.length > 2;
          const statusLive = project.status === "live";
          return (
            <div
              key={project.slug}
              className={`work-card${isFeatured ? " featured" : ""}`}
              style={{ animation: `none` }}
            >
              <Link href={`/work/${project.slug}`} style={{ display: "contents" }}>
                <div className="work-card-media">
                  <div className="work-card-media-inner">
                    <ProjectCover slug={project.slug} />
                  </div>
                  <div className="work-card-meta">
                    <span className={`work-card-status${statusLive ? "" : " case"}`}>
                      <span className="dot" />
                      {statusLive ? "LIVE" : "CASE STUDY"}
                    </span>
                    {project.featured && (
                      <span className="work-featured-badge">FEATURED</span>
                    )}
                  </div>
                </div>
                <div className="work-card-body">
                  <div className="work-card-title">{project.title}</div>
                  <div className="work-card-tagline">
                    {project.tagline ?? project.description}
                  </div>
                  <div className="work-card-bottom">
                    <span>{(project.tags ?? []).slice(0, 2).join(" · ")}</span>
                    <span className="arrow">READ →</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ gridColumn: "span 12", padding: "64px 0", textAlign: "center", color: "var(--color-muted)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
}

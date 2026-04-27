import Link from "next/link";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { MagneticButton } from "@/components/animation/MagneticButton";
import { ProjectCover } from "@/components/work/ProjectCover";

const featured = [
  {
    slug: "documind",
    title: "DocuMind",
    tagline: "Multi-document AI research assistant with mandatory source citations.",
    tags: ["RAG", "Full-Stack"],
    duration: "6 weeks",
    status: "live" as const,
    href: "/work/documind",
  },
  {
    slug: "autoanalyst",
    title: "AutoAnalyst",
    tagline: "Multi-agent autonomous data analysis. Upload a CSV, get a full exploratory report.",
    tags: ["Agents", "Full-Stack"],
    duration: "4 weeks",
    status: "case" as const,
    href: "/work/autoanalyst",
  },
  {
    slug: "lexai",
    title: "LexAI",
    tagline: "Legal contract review agent. Clause extraction, risk scoring, structured reports.",
    tags: ["RAG", "Agents"],
    duration: "3 weeks",
    status: "case" as const,
    href: "/work/lexai",
  },
];

export function FeaturedWork() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-label">
              <span className="num">02</span>
              <span>SELECTED WORK</span>
            </div>
            <h2 className="section-title">
              Five shipped systems. <em>Three featured.</em>
            </h2>
          </div>
        </ScrollReveal>

        <div className="work-grid">
          {featured.map((p, i) => (
            <ScrollReveal
              key={p.slug}
              delay={i * 0.1}
              className={`work-card${i === 0 ? " featured" : ""}`}
            >
              <Link href={p.href} style={{ display: "contents" }}>
                {/* Media */}
                <div className="work-card-media">
                  <div className="work-card-media-inner">
                    <ProjectCover slug={p.slug} />
                  </div>
                  <div className="work-card-meta">
                    <span className={`work-card-status${p.status === "case" ? " case" : ""}`}>
                      <span className="dot" />
                      {p.status === "live" ? "LIVE · DEMO" : "CASE STUDY"}
                    </span>
                    {i === 0 && (
                      <span className="work-featured-badge">FLAGSHIP</span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="work-card-body">
                  <div className="work-card-title">{p.title}</div>
                  <div className="work-card-tagline">{p.tagline}</div>
                  <div className="work-card-bottom">
                    <span>{p.tags.join(" · ")} / {p.duration}</span>
                    <span className="arrow">READ <span>→</span></span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 64 }}>
          <MagneticButton>
            <Link href="/work" className="btn btn-ghost">
              See all five projects <span className="btn-arrow">→</span>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

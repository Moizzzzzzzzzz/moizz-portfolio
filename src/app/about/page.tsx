import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { MagneticButton } from "@/components/animation/MagneticButton";

export const metadata: Metadata = {
  title: "About — Moizz K",
  description:
    "Self-taught AI engineer from Pakistan building production RAG systems, AI agents, and LLM products. Available for freelance projects.",
};

const philosophy = [
  "RAG without citations is a liability.",
  "Agents need fallbacks, not faith.",
  "90% of the job is making it debuggable.",
  "Ship boring infrastructure. Ship interesting products.",
];

const currently = [
  { label: "Daily driver",  val: "Claude Sonnet · Cursor · Linear",         note: "" },
  { label: "Reading",       val: "Designing Data-Intensive Applications",     note: "Kleppmann · re-read x3" },
  { label: "Listening",     val: "Latent Space pod · The Pragmatic Engineer", note: "" },
  { label: "Status",        val: "● 2 slots · May 2026",                      note: "freelance · contract", accent: true },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Abdul Moizz Khan",
            alternateName: "Moizz K",
            url: "https://moizzz.dev",
            image: "https://moizzz.dev/images/about/moizz.png",
            jobTitle: "Full-Stack AI Engineer",
            sameAs: [
              "https://linkedin.com/in/abdul-moizz-b21bb0322",
              "https://github.com/Moizzzzzzzzzz",
              "https://www.upwork.com/freelancers/abdulmoizz",
            ],
          }),
        }}
      />

      {/* ── Hero two-col ────────────────────────────────────────────── */}
      <section>
        <div className="container">
          <div className="about-hero">
            {/* Left — text */}
            <div>
              <div className="page-eyebrow">
                <span className="num">03</span>
                <span>ABOUT / MOIZZ KHAN</span>
              </div>
              <h1 className="page-title">
                Self-taught,<br /><em>production-first.</em>
              </h1>

              <div className="about-prose">
                <p>
                  I started building AI systems two years ago — not from tutorials, but from shipping
                  things that needed to <em>work</em>. I&apos;m finishing my AI &amp; Data Science degree at
                  Virtual University, but most of what I know came from debugging production failures at 2&nbsp;a.m.
                </p>
                <p>
                  My focus is the gap between <em>&ldquo;AI demo&rdquo;</em> and <em>&ldquo;AI system.&rdquo;</em> Most
                  LLM applications look good in a notebook and fall apart in production. I build the version
                  that doesn&apos;t: proper retrieval pipelines, fault-tolerant agent graphs, observable
                  backends, deployed systems with real users.
                </p>
                <p>
                  I&apos;m based in Islamabad, Pakistan — available for freelance engagements and remote
                  contracts. If you&apos;re building an AI-powered product and need an engineer who treats
                  your codebase like their own,{" "}
                  <Link href="/contact" style={{ color: "var(--color-accent)", borderBottom: "1px solid var(--color-accent)" }}>
                    let&apos;s talk
                  </Link>.
                </p>
              </div>
            </div>

            {/* Right — photo */}
            <div className="about-photo" style={{ position: "sticky", top: "100px", alignSelf: "start" }}>
              <Image
                src="/images/about/moizz.png"
                alt="Moizz K — Full-stack AI Engineer"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 480px"
                priority
              />
              {/* Mono label overlay */}
              <div style={{ position: "absolute", top: 16, left: 16, right: 16, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-muted)", letterSpacing: "0.12em", zIndex: 2 }}>
                <span>MOIZZ.WEBP</span><span>Islamabad, PK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Philosophy ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <div className="section-label">
                <span className="num">04</span>
                <span>PHILOSOPHY</span>
              </div>
              <h2 className="section-title">
                Four <em>convictions</em> that shape every system I ship.
              </h2>
            </div>
          </ScrollReveal>

          <div className="philosophy-list">
            {philosophy.map((text, i) => (
              <ScrollReveal key={i} delay={i * 0.08} className="philosophy-item">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="text">{text}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Currently ───────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <div className="section-label">
                <span className="num">05</span>
                <span>CURRENTLY</span>
              </div>
              <h2 className="section-title">Tools, <em>signals,</em> and what&apos;s open.</h2>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", border: "1px solid var(--color-border)" }}>
            {currently.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div style={{ padding: 32, borderRight: i < currently.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                  <div className="metric-label">{c.label}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.5rem", lineHeight: 1.2, marginTop: 12, color: c.accent ? "var(--color-accent)" : "var(--color-text-bright)", fontWeight: 300 }}>
                    {c.val}
                  </div>
                  {c.note && <div className="metric-note" style={{ marginTop: 8 }}>{c.note}</div>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mini CTA ─────────────────────────────────────────────────── */}
      <section className="cta-section" style={{ padding: "120px 0" }}>
        <div className="cta-bg" aria-hidden />
        <div className="container">
          <div className="cta-eyebrow">[ NEXT STEP ]</div>
          <h2 className="cta-headline">
            Book a <em>20-minute call.</em>
            <br />
            I&apos;ll tell you if I can help.
          </h2>
          <div className="cta-actions">
            <MagneticButton>
              <Link href="/contact" className="btn btn-primary">
                Book a call <span className="btn-arrow">→</span>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}

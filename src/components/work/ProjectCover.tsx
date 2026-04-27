"use client";

interface ProjectCoverProps {
  slug: string;
}

const COVERS: Record<string, { label: string; art: React.ReactNode }> = {
  documind: {
    label: "DOC.RAG // CITATIONS",
    art: (
      <>
        <div style={{ position: "absolute", top: "20%", left: "8%", right: "8%", display: "flex", flexDirection: "column", gap: 4 }}>
          {[100, 86, 92, 78, 64, 70].map((w, i) => (
            <div
              key={i}
              style={{
                height: 6,
                background: i === 2 ? "var(--color-accent)" : "var(--color-border-bright)",
                opacity: i === 2 ? 1 : 0.4,
                width: `${w}%`,
                borderRadius: 1,
              }}
            />
          ))}
        </div>
        <div className="cover-art-mono" style={{ bottom: "20%", left: "8%" }}>
          {`> retrieve(query)\n> rerank(top_k=24)\n> cite(source, page)\n> answer ✓`}
        </div>
        <div style={{ position: "absolute", bottom: "8%", right: "8%", display: "flex", gap: 6 }}>
          {[["[1]", "var(--color-accent)", "var(--color-accent)"], ["[2]", "var(--color-muted)", "var(--color-border-bright)"], ["[3]", "var(--color-muted)", "var(--color-border-bright)"]].map(([label, color, border]) => (
            <span
              key={label}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                color, padding: "2px 8px",
                border: `1px solid ${border}`, borderRadius: 999,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </>
    ),
  },
  autoanalyst: {
    label: "MULTI-AGENT // ANALYSIS",
    art: (
      <>
        <svg viewBox="0 0 400 240" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <g stroke="var(--color-border-bright)" strokeWidth="1" fill="none" opacity="0.5">
            <line x1="200" y1="60" x2="100" y2="140" />
            <line x1="200" y1="60" x2="200" y2="140" />
            <line x1="200" y1="60" x2="300" y2="140" />
            <line x1="100" y1="140" x2="150" y2="200" />
            <line x1="200" y1="140" x2="200" y2="200" />
            <line x1="300" y1="140" x2="250" y2="200" />
          </g>
          <circle cx="200" cy="60" r="6" fill="var(--color-accent)" />
          <circle cx="100" cy="140" r="4" fill="var(--color-text)" />
          <circle cx="200" cy="140" r="4" fill="var(--color-text)" />
          <circle cx="300" cy="140" r="4" fill="var(--color-text)" />
          <circle cx="150" cy="200" r="3" fill="var(--color-muted)" />
          <circle cx="200" cy="200" r="3" fill="var(--color-muted)" />
          <circle cx="250" cy="200" r="3" fill="var(--color-muted)" />
        </svg>
        <div className="cover-art-mono" style={{ top: "16%", right: "8%" }}>
          {`orchestrator\n└─ profiler\n└─ visualizer\n└─ statistician`}
        </div>
      </>
    ),
  },
  lexai: {
    label: "LEGAL // EXTRACTION",
    art: (
      <>
        <div style={{ position: "absolute", top: "16%", left: "10%", right: "10%", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--color-muted)", lineHeight: 1.55 }}>
          <span>§4.1 [TERMINATION] — either party may </span>
          <span style={{ background: "var(--color-accent-soft)", color: "var(--color-accent)", padding: "0 3px" }}>terminate this agreement</span>
          <span> upon ninety (90) days&apos; written notice…</span>
          <br /><br />
          <span>§4.2 [LIABILITY] — neither party shall be liable for </span>
          <span style={{ background: "rgba(239, 68, 68, 0.18)", color: "#ef4444", padding: "0 3px" }}>indirect damages</span>
          <span> exceeding the fees paid…</span>
        </div>
        <div style={{ position: "absolute", bottom: "10%", left: "10%", display: "flex", gap: 6 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", padding: "2px 6px", border: "1px solid var(--color-accent)", color: "var(--color-accent)", borderRadius: 2 }}>3 RISKS</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", padding: "2px 6px", border: "1px solid var(--color-border-bright)", color: "var(--color-muted)", borderRadius: 2 }}>12 CLAUSES</span>
        </div>
      </>
    ),
  },
  insightai: {
    label: "ANALYTICS // RAG",
    art: (
      <>
        <svg viewBox="0 0 400 240" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {[40, 60, 35, 80, 55, 90, 70, 50, 85, 65, 95, 75].map((h, i) => (
            <rect
              key={i}
              x={20 + i * 30} y={200 - h * 1.5} width="14" height={h * 1.5}
              fill={i === 5 || i === 10 ? "var(--color-accent)" : "var(--color-border-bright)"}
            />
          ))}
          <line x1="20" y1="200" x2="380" y2="200" stroke="var(--color-border)" />
        </svg>
        <div className="cover-art-mono" style={{ top: "12%", left: "8%" }}>
          {`Q: Top SKUs Q1 vs Q2?\nA: 12 items growing >20% [src: sales.csv]`}
        </div>
      </>
    ),
  },
  "cognitive-command": {
    label: "PROMPT → APP",
    art: (
      <>
        <div style={{ position: "absolute", top: "16%", left: "10%", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.4rem", color: "var(--color-text-bright)", maxWidth: "80%" }}>
          &ldquo;build a CRM for tutors with stripe billing&rdquo;
        </div>
        <svg viewBox="0 0 400 80" style={{ position: "absolute", left: "8%", right: "8%", bottom: "30%", width: "84%" }}>
          <line x1="0" y1="40" x2="395" y2="40" stroke="var(--color-border-bright)" strokeDasharray="3 3" />
          <polygon points="390,35 400,40 390,45" fill="var(--color-accent)" />
        </svg>
        <div style={{ position: "absolute", bottom: "10%", left: "10%", right: "10%", display: "flex", gap: 8, fontFamily: "var(--font-mono)", fontSize: "0.65rem" }}>
          {[
            { label: "next.js/app", accent: false },
            { label: "fastapi/api", accent: false },
            { label: "15min ✓",     accent: true  },
          ].map(({ label, accent }) => (
            <span
              key={label}
              style={{ flex: 1, padding: "8px 10px", border: `1px solid ${accent ? "var(--color-accent)" : "var(--color-border-bright)"}`, color: accent ? "var(--color-accent)" : "var(--color-text)", borderRadius: 2 }}
            >
              {label}
            </span>
          ))}
        </div>
      </>
    ),
  },
};

export function ProjectCover({ slug }: ProjectCoverProps) {
  const preset = COVERS[slug] ?? { label: slug.toUpperCase().replace("-", " "), art: null };
  return (
    <div className="cover-art">
      <div className="cover-art-grid" />
      <div className="cover-art-label">{preset.label}</div>
      {preset.art}
    </div>
  );
}

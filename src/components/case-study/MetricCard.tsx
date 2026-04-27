import { ScrollReveal } from "@/components/animation/ScrollReveal";

interface MetricCardProps {
  metric: string;
  value: string;
  note?: string;
  index?: number;
}

export function MetricCard({ metric, value, note, index = 0 }: MetricCardProps) {
  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <div style={{
        position: "relative",
        padding: "24px 28px",
        background: "var(--color-surface-2)",
        border: "1px solid var(--color-border)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, var(--color-accent-soft), transparent)",
        }} />
        <p style={{
          fontSize: "2.25rem",
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontWeight: 300,
          color: "var(--color-text-bright)",
          lineHeight: 1.1,
          marginBottom: 8,
        }}>
          {value}
        </p>
        <p style={{
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--color-muted)",
          fontFamily: "var(--font-mono)",
        }}>
          {metric}
        </p>
        {note && (
          <p style={{
            fontSize: "0.7rem",
            color: "var(--color-muted)",
            marginTop: 6,
            lineHeight: 1.4,
          }}>
            {note}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}

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
      <div className="rounded-2xl border border-foreground/10 p-6">
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        <p className="mt-1 text-sm text-foreground/40">{metric}</p>
        {note && <p className="mt-1 text-xs text-foreground/30">{note}</p>}
      </div>
    </ScrollReveal>
  );
}

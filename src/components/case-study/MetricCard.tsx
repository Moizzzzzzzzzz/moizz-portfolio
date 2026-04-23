import { ScrollReveal } from "@/components/animation/ScrollReveal";

interface MetricCardProps {
  label: string;
  value: string;
  index?: number;
}

export function MetricCard({ label, value, index = 0 }: MetricCardProps) {
  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <div className="rounded-2xl border border-foreground/10 p-6">
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        <p className="mt-1 text-sm text-foreground/40">{label}</p>
      </div>
    </ScrollReveal>
  );
}

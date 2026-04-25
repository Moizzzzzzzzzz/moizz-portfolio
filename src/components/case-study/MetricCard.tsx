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
      <div className="relative rounded-2xl bg-white/5 border border-white/10 p-8 overflow-hidden hover:border-violet-500/30 hover:bg-white/[0.07] transition-all duration-300">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
        <p className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none mb-3">
          {value}
        </p>
        <p className="text-xs font-medium text-white/50 uppercase tracking-widest">{metric}</p>
        {note && (
          <p className="mt-2 text-xs text-white/30 leading-relaxed">{note}</p>
        )}
      </div>
    </ScrollReveal>
  );
}

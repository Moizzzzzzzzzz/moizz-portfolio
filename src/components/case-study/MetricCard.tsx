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
      <div className="relative p-5 md:p-6 rounded-xl bg-[#111113] border border-[#1F1F22] overflow-hidden hover:border-[#7C3AED]/40 transition-colors duration-200">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/60 to-transparent" />
        <p className="text-4xl md:text-5xl font-bold text-[#FAFAFA] mb-1">
          {value}
        </p>
        <p className="text-xs uppercase tracking-widest text-[#6B6B72] mb-1">{metric}</p>
        {note && (
          <p className="text-xs text-[#6B6B72] mt-1 leading-snug">{note}</p>
        )}
      </div>
    </ScrollReveal>
  );
}

import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "tip";
  children: ReactNode;
}) {
  const styles = {
    info: {
      wrapper: "border-l-[var(--color-accent)] bg-[color-mix(in_oklch,var(--color-accent)_10%,transparent)]",
      icon: "ℹ️",
    },
    warning: {
      wrapper: "border-l-amber-500 bg-[color-mix(in_oklch,#f59e0b_10%,transparent)]",
      icon: "⚠️",
    },
    tip: {
      wrapper: "border-l-emerald-500 bg-[color-mix(in_oklch,#10b981_10%,transparent)]",
      icon: "💡",
    },
  };

  const { wrapper, icon } = styles[type];

  return (
    <div className={cn("my-6 flex gap-3 rounded-xl border-l-4 px-4 py-3 text-sm", wrapper)}>
      <span className="shrink-0 leading-5">{icon}</span>
      <div className="leading-5 text-[var(--color-text)]">{children}</div>
    </div>
  );
}

function MetricStrip({ metrics }: { metrics: { label: string; value: string }[] }) {
  return (
    <div className="my-6 flex flex-wrap gap-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5">
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold tracking-tight text-[var(--color-text-bright)]">
            {m.value}
          </span>
          <span className="text-xs text-[var(--color-muted)]">{m.label}</span>
        </div>
      ))}
    </div>
  );
}

function ArchDiagram({ src, alt }: { src?: string; alt?: string }) {
  if (src) {
    return (
      <div className="my-6 overflow-hidden rounded-xl border border-[var(--color-border)]">
        <Image
          src={src}
          alt={alt ?? "Architecture diagram"}
          width={1200}
          height={675}
          className="h-auto w-full"
        />
      </div>
    );
  }

  return (
    <div className="my-6 flex h-48 items-center justify-center rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]">
      <span className="text-sm text-[var(--color-muted)]">Architecture Diagram</span>
    </div>
  );
}

function DemoEmbed({ src, url, title }: { src?: string; url?: string; title?: string }) {
  const href = src ?? url;
  if (!href) {
    return (
      <div className="my-6 flex h-48 items-center justify-center rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]">
        <span className="text-sm text-[var(--color-muted)]">Demo not yet available</span>
      </div>
    );
  }
  return (
    <div className="my-6 relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--color-border)]">
      <iframe
        src={href}
        title={title ?? "Demo"}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function ArchitectureDiagram({ src, alt }: { src?: string; alt?: string }) {
  return <ArchDiagram src={src} alt={alt} />;
}

function MDXMetricCard({ metric, value, note }: { metric: string; value: string; note?: string }) {
  return (
    <div className="my-3 inline-flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
      <span className="text-2xl font-bold tracking-tight text-[var(--color-text-bright)]">{value}</span>
      <span className="mt-0.5 text-xs font-medium text-[var(--color-muted)]">{metric}</span>
      {note && <span className="mt-0.5 text-xs text-[var(--color-muted)]/60">{note}</span>}
    </div>
  );
}

function Screenshot({ src, alt }: { src: string; alt?: string }) {
  if (!src) return null;
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-[var(--color-border)]">
      <Image
        src={src}
        alt={alt ?? "Screenshot"}
        width={1200}
        height={675}
        className="h-auto w-full"
      />
    </div>
  );
}

export const mdxComponents: MDXComponents & {
  Callout: typeof Callout;
  MetricStrip: typeof MetricStrip;
  ArchDiagram: typeof ArchDiagram;
  ArchitectureDiagram: typeof ArchitectureDiagram;
  DemoEmbed: typeof DemoEmbed;
  MetricCard: typeof MDXMetricCard;
  Screenshot: typeof Screenshot;
} = {
  h1: ({ className, ...props }) => (
    <h1 className={cn("mt-10 mb-4 text-4xl font-bold tracking-tight", className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn("mt-8 mb-3 text-2xl font-semibold", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("mt-6 mb-2 text-xl font-semibold", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("my-4 leading-7 text-foreground/80", className)} {...props} />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn("underline underline-offset-4 hover:text-foreground transition-colors", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-4 ml-6 list-disc space-y-1 text-foreground/80", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-4 ml-6 list-decimal space-y-1 text-foreground/80", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn("my-4 border-l-2 border-foreground/20 pl-4 italic text-foreground/60", className)}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn("rounded bg-foreground/10 px-1 py-0.5 text-sm font-mono", className)}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn("my-6 overflow-x-auto rounded-xl bg-foreground/5 p-4 text-sm", className)}
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-foreground/10" />,
  Callout,
  MetricStrip,
  ArchDiagram,
  ArchitectureDiagram,
  DemoEmbed,
  MetricCard: MDXMetricCard,
  Screenshot,
};

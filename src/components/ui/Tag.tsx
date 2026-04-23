import { cn } from "@/lib/cn";

interface TagProps {
  children: string;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-foreground/15 px-2.5 py-0.5 text-xs font-medium text-foreground/60",
        className
      )}
    >
      {children}
    </span>
  );
}

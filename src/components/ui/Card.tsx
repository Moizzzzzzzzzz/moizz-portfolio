import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

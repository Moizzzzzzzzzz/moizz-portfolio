import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-text-bright hover:bg-accent/85 active:bg-accent/75",
  secondary: "border border-border text-text hover:bg-surface hover:border-accent/30",
  ghost: "text-muted hover:text-text hover:bg-surface",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm gap-1.5 rounded-md",
  md: "h-10 px-5 text-sm gap-2 rounded-lg",
  lg: "h-12 px-7 text-base gap-2.5 rounded-xl",
};

export function buttonVariants({
  variant = "primary" as ButtonVariant,
  size = "md" as ButtonSize,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center font-medium",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:pointer-events-none disabled:opacity-40",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

export { variantClasses, sizeClasses, type ButtonVariant, type ButtonSize };

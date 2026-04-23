import Link from "next/link";
import { MagneticButton } from "@/components/animation/MagneticButton";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
}

export function CTASection({
  title = "Have a project in mind?",
  description = "I'm currently available for freelance and contract work. Let's talk.",
  primaryLabel = "Get in touch",
  primaryHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="border-t border-foreground/5 py-32 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <ScrollReveal>
          <h2 className="mb-4 text-4xl font-bold tracking-tight">{title}</h2>
          <p className="mb-8 text-foreground/50">{description}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <MagneticButton className="inline-block">
            <Link href={primaryHref}>
              <Button size="lg">{primaryLabel}</Button>
            </Link>
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
}

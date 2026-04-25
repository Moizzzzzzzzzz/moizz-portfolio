import Link from "next/link";
import { MagneticButton } from "@/components/animation/MagneticButton";
import { buttonVariants } from "@/lib/button-variants";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export function CTASection() {
  return (
    <section className="border-t border-foreground/5 py-32 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-sm rounded-full bg-accent/10 blur-3xl"
            aria-hidden="true"
          />
          <ScrollReveal>
            <h2 className="mb-4 text-4xl font-bold tracking-tight">
              Ready to build something that works?
            </h2>
            <p className="text-foreground/50">
              I&apos;m available for contracts, freelance builds, and AI consulting.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Link
                  href="https://documind.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "primary", size: "lg" })}
                >
                  See DocuMind Live
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                  Book a Call
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

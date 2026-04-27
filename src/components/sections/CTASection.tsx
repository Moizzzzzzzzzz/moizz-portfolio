import Link from "next/link";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { MagneticButton } from "@/components/animation/MagneticButton";

export function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-bg" aria-hidden />
      <div className="container">
        <ScrollReveal>
          <div className="cta-eyebrow">[ HIRE / COLLABORATE / TALK SHOP ]</div>
          <h2 className="cta-headline">
            If you&apos;re building an <em>AI product</em>
            <br />
            and need someone who&apos;ll
            <br />
            treat your codebase like their own —
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="cta-actions">
            <MagneticButton>
              <Link href="/contact" className="btn btn-primary">
                Book a call <span className="btn-arrow">→</span>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/work/documind" className="btn btn-ghost">
                See DocuMind live
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import { useRef, useTransition } from "react";
import { toast } from "sonner";
import { sendContactEmail } from "@/app/actions/contact";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { MagneticButton } from "@/components/animation/MagneticButton";

export default function ContactPage() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await sendContactEmail(formData);
      if (result.success) {
        toast.success("Message sent! I'll get back to you soon.");
        formRef.current?.reset();
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <>
      <header className="page-header" style={{ paddingBottom: 0, borderBottom: "none" }}>
        <div className="container">
          <ScrollReveal>
            <div className="page-eyebrow">
              <span className="num">05</span>
              <span>CONTACT / TWO WAYS IN</span>
            </div>
            <h1 className="page-title">
              Tell me what<br />you&apos;re <em>building.</em>
            </h1>
          </ScrollReveal>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* ── Cal.com embed ── */}
            <ScrollReveal>
              <div>
                <div className="section-label" style={{ marginBottom: 32 }}>
                  <span className="num">B</span>
                  <span>BOOK A 20-MIN CALL</span>
                </div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.08em", color: "var(--color-muted)", marginBottom: 24 }}>
                  Free call. No pitch. We figure out if there&apos;s a fit.
                </p>
                <iframe
                  src={`https://cal.com/${process.env.NEXT_PUBLIC_CAL_USERNAME ?? "moizzk"}?embed=true&theme=dark`}
                  className="w-full"
                  style={{
                    height: 580,
                    border: "1px solid var(--color-border)",
                    borderRadius: 4,
                  }}
                  title="Book a scoping call"
                />
              </div>
            </ScrollReveal>

            {/* ── Contact form ── */}
            <ScrollReveal delay={0.1}>
              <div>
                <div className="section-label" style={{ marginBottom: 32 }}>
                  <span className="num">A</span>
                  <span>SEND A BRIEF</span>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} noValidate className="contact-form">
                  {/* Honeypot */}
                  <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="contact-honeypot" />

                  <div className="field">
                    <label htmlFor="name">NAME</label>
                    <input id="name" name="name" type="text" required autoComplete="name" disabled={isPending} placeholder="Your name" />
                  </div>

                  <div className="field">
                    <label htmlFor="email">EMAIL</label>
                    <input id="email" name="email" type="email" required autoComplete="email" disabled={isPending} placeholder="your@email.com" />
                  </div>

                  <div className="field">
                    <label htmlFor="message">MESSAGE</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      disabled={isPending}
                      placeholder="Describe what you're building and what you need…"
                      data-cursor-text
                    />
                  </div>

                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="btn btn-primary"
                      style={{ alignSelf: "flex-start", opacity: isPending ? 0.6 : 1 }}
                    >
                      {isPending ? "Sending…" : "Send message"}
                      {!isPending && <span className="btn-arrow">→</span>}
                    </button>
                  </MagneticButton>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}

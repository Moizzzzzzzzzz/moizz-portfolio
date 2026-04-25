"use client";

import { useRef, useTransition } from "react";
import { toast } from "sonner";
import { sendContactEmail } from "@/app/actions/contact";

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
    <section
      style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      className="mx-auto max-w-6xl px-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Cal.com — left */}
        <div className="lg:col-span-5">
          <h2
            style={{
              color: "var(--color-text-bright)",
              fontSize: "var(--text-xl)",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Book a 20-min scoping call
          </h2>
          <p
            style={{
              color: "var(--color-muted)",
              fontSize: "var(--text-sm)",
              marginBottom: "1.5rem",
            }}
          >
            Free call. No pitch. We figure out if there&apos;s a fit.
          </p>
          <iframe
            src={`https://cal.com/${process.env.NEXT_PUBLIC_CAL_USERNAME}?embed=true&theme=dark`}
            className="w-full rounded-2xl"
            style={{
              height: "600px",
              border: "1px solid var(--color-border)",
            }}
            title="Book a scoping call"
          />
        </div>

        {/* Form — right */}
        <div className="lg:col-span-7">
          <h1
            style={{
              color: "var(--color-text-bright)",
              fontSize: "var(--text-2xl)",
              fontFamily: "var(--font-serif)",
              marginBottom: "0.5rem",
            }}
          >
            Get in touch
          </h1>
          <p
            style={{
              color: "var(--color-muted)",
              fontSize: "var(--text-base)",
              marginBottom: "2.5rem",
            }}
          >
            Have a project in mind or want to work together? Send a message.
          </p>

      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        {/* Honeypot — hidden via CSS only, never type="hidden" */}
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="contact-honeypot"
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label
              htmlFor="name"
              style={{ color: "var(--color-text)", fontSize: "var(--text-sm)" }}
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              aria-required="true"
              autoComplete="name"
              disabled={isPending}
              style={{
                background: "var(--color-surface)",
                color: "var(--color-text-bright)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.5rem",
                padding: "0.75rem 1rem",
                fontSize: "var(--text-base)",
                transition: "border-color 200ms",
                width: "100%",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label
              htmlFor="email"
              style={{ color: "var(--color-text)", fontSize: "var(--text-sm)" }}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              aria-required="true"
              autoComplete="email"
              disabled={isPending}
              style={{
                background: "var(--color-surface)",
                color: "var(--color-text-bright)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.5rem",
                padding: "0.75rem 1rem",
                fontSize: "var(--text-base)",
                transition: "border-color 200ms",
                width: "100%",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label
              htmlFor="message"
              style={{ color: "var(--color-text)", fontSize: "var(--text-sm)" }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              aria-required="true"
              rows={6}
              disabled={isPending}
              style={{
                background: "var(--color-surface)",
                color: "var(--color-text-bright)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.5rem",
                padding: "0.75rem 1rem",
                fontSize: "var(--text-base)",
                transition: "border-color 200ms",
                resize: "vertical",
                width: "100%",
                fontFamily: "inherit",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            style={{
              background: isPending ? "var(--color-surface)" : "var(--color-accent)",
              color: "var(--color-text-bright)",
              border: "1px solid var(--color-border)",
              borderRadius: "0.5rem",
              padding: "0.875rem 1.5rem",
              fontSize: "var(--text-base)",
              fontWeight: 500,
              cursor: isPending ? "not-allowed" : "pointer",
              transition: "background 200ms, opacity 200ms",
              opacity: isPending ? 0.6 : 1,
              alignSelf: "flex-start",
            }}
          >
            {isPending ? "Sending…" : "Send message"}
          </button>
        </div>
      </form>
        </div>
      </div>
    </section>
  );
}

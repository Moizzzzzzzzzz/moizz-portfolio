import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { MagneticButton } from "@/components/animation/MagneticButton";
import { buttonVariants } from "@/lib/button-variants";

export const metadata: Metadata = {
  title: "About — Moizz K",
  description:
    "Self-taught AI engineer from Pakistan building production RAG systems, AI agents, and LLM products. Available for freelance projects.",
};

const MANIFESTO = [
  "A system that works 80% of the time is a liability, not a product.",
  "Retrieval quality determines answer quality — everything else is secondary.",
  "Every AI feature should be auditable. If you can't trace why it said that, you can't fix it when it's wrong.",
  "Speed of iteration beats perfection of plan. Ship, measure, fix.",
  "The best AI engineers are honest about failure modes before the client asks.",
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Abdul Moizz Khan",
            alternateName: "Moizz K",
            url: "https://moizzz.dev",
            image: "https://moizzz.dev/images/about/moizz.webp",
            jobTitle: "Full-Stack AI Engineer",
            description:
              "Self-taught AI engineer building production RAG systems and AI agents. Based in Pakistan, working globally.",
            sameAs: [
              "https://linkedin.com/in/abdul-moizz-b21bb0322",
              "https://github.com/Moizzzzzzzzzz",
              "https://www.upwork.com/freelancers/abdulmoizz",
            ],
          }),
        }}
      />
      <section className="py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Two-column grid — photo first in DOM (top on mobile), text left on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-y-12 md:gap-x-16">

          {/* Photo — top on mobile, right column on desktop */}
          <div className="md:col-start-8 md:col-span-5 md:row-start-1">
            <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
              <Image
                src="/images/about/moizz.webp"
                alt="Moizz K — Full-stack AI Engineer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 41.67vw"
                priority
              />
            </div>
          </div>

          {/* Text — below on mobile, left column on desktop */}
          <div className="md:col-start-1 md:col-span-7 md:row-start-1">

            {/* Hero header */}
            <SplitReveal
              as="h1"
              split="lines"
              className="text-3xl font-bold text-text-bright"
            >
              Moizz K
            </SplitReveal>
            <p className="mt-4 mb-12 text-lg text-muted">
              Full-stack AI engineer building production RAG systems, agents, and LLM products that ship.
            </p>

            {/* Story block */}
            <div className="max-w-2xl space-y-6">
              <ScrollReveal>
                <p className="text-base leading-relaxed text-text">
                  I&#39;m a self-taught AI engineer based in Islamabad, Pakistan — currently completing a BSc
                  in Data Science, but I didn&#39;t wait for a degree to start building. I&#39;ve been
                  designing and shipping production AI systems since before the coursework caught up.
                  That bias toward execution hasn&#39;t changed.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="text-base leading-relaxed text-text">
                  My flagship project, DocuMind, is a multi-document RAG research assistant built entirely
                  on my own — no team, no tutorial, no shortcuts. It handles real documents at scale,
                  enforces mandatory source citations on every response, and runs on production
                  infrastructure with LangGraph multi-agent routing and Pinecone Serverless retrieval.
                  It&#39;s the kind of system I&#39;d want to use myself: reliable, cited, and honest
                  about what it doesn&#39;t know.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-base leading-relaxed text-text">
                  Today I work globally as a full-stack AI engineer, building RAG pipelines, AI agents,
                  and production LLM systems for clients who need things that actually work — not just in
                  demos, but under real load, with real data, maintained by real teams. My stack centers
                  on LangChain, LangGraph, FastAPI, and React, with retrieval backends chosen per problem
                  rather than per habit. I work async-first, communicate clearly, ship on time, and
                  don&#39;t disappear after handoff.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Philosophy / Manifesto */}
        <div className="mt-24 md:mt-40 max-w-2xl">
          <SplitReveal
            as="h2"
            split="lines"
            className="mb-10 text-xl font-semibold text-text-bright"
          >
            How I think about building AI
          </SplitReveal>

          <div className="space-y-6">
            {MANIFESTO.map((statement, i) => (
              <ScrollReveal key={statement} delay={i * 0.1}>
                <p className="border-l-2 border-accent pl-4 font-serif italic text-xl text-text">
                  {statement}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Currently — 3 columns */}
        <div className="mt-24 md:mt-32">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

            <div>
              <h3 className="mb-4 text-sm uppercase tracking-widest text-muted">
                Freelancing
              </h3>
              <ul className="space-y-2 text-base text-text">
                <li>Building RAG systems &amp; AI agents for clients on Upwork</li>
                <li>Open to long-term retainer engagements</li>
                <li>Async-first, global timezone coverage</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm uppercase tracking-widest text-muted">
                Daily tools
              </h3>
              <ul className="space-y-2 text-base text-text">
                <li>LangChain · LangGraph · FastAPI</li>
                <li>Claude API · Gemini Flash · Groq</li>
                <li>Pinecone · FAISS · ChromaDB</li>
                <li>React · Docker · DigitalOcean</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm uppercase tracking-widest text-muted">
                Availability
              </h3>
              <ul className="space-y-2 text-base text-text">
                <li>Available for new projects</li>
                <li>Response within 24 hours</li>
                <li>Starting point: 20-min scoping call</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <MagneticButton>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Book a 20-min call
            </Link>
          </MagneticButton>
        </div>

      </div>
      </section>
    </>
  );
}

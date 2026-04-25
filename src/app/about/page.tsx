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

      <div className="content-wrapper pt-32 pb-24 max-w-6xl mx-auto px-6 lg:px-10">

        {/* Two column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* LEFT — text content (7 cols) */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-8">

            {/* h1 */}
            <div>
              <SplitReveal
                as="h1"
                split="lines"
                className="text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight mb-4"
              >
                Moizz K
              </SplitReveal>
              <p className="text-lg text-white/60 leading-relaxed">
                Full-stack AI engineer building production RAG systems, agents, and LLM products that ship.
              </p>
            </div>

            {/* Story paragraphs */}
            <div className="space-y-5 text-white/70 leading-relaxed text-base max-w-2xl">
              <ScrollReveal>
                <p className="text-base leading-relaxed text-white/70">
                  I&#39;m a self-taught AI engineer based in Islamabad, Pakistan — currently completing a BSc
                  in Data Science, but I didn&#39;t wait for a degree to start building. I&#39;ve been
                  designing and shipping production AI systems since before the coursework caught up.
                  That bias toward execution hasn&#39;t changed.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="text-base leading-relaxed text-white/70">
                  My flagship project, DocuMind, is a multi-document RAG research assistant built entirely
                  on my own — no team, no tutorial, no shortcuts. It handles real documents at scale,
                  enforces mandatory source citations on every response, and runs on production
                  infrastructure with LangGraph multi-agent routing and Pinecone Serverless retrieval.
                  It&#39;s the kind of system I&#39;d want to use myself: reliable, cited, and honest
                  about what it doesn&#39;t know.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-base leading-relaxed text-white/70">
                  Today I work globally as a full-stack AI engineer, building RAG pipelines, AI agents,
                  and production LLM systems for clients who need things that actually work — not just in
                  demos, but under real load, with real data, maintained by real teams. My stack centers
                  on LangChain, LangGraph, FastAPI, and React, with retrieval backends chosen per problem
                  rather than per habit. I work async-first, communicate clearly, ship on time, and
                  don&#39;t disappear after handoff.
                </p>
              </ScrollReveal>
            </div>

            {/* Philosophy section */}
            <div>
              <SplitReveal
                as="h2"
                split="lines"
                className="text-2xl font-semibold text-white mb-6"
              >
                How I think about building AI
              </SplitReveal>
              <div className="space-y-4">
                {MANIFESTO.map((statement, i) => (
                  <ScrollReveal key={statement} delay={i * 0.1}>
                    <p className="border-l-2 border-violet-600 pl-4 font-serif italic text-xl text-white/70">
                      {statement}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Currently grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div>
                <h3 className="mb-4 text-xs uppercase tracking-widest text-white/30">
                  Freelancing
                </h3>
                <ul className="space-y-2 text-base text-white/70">
                  <li>Building RAG systems &amp; AI agents for clients on Upwork</li>
                  <li>Open to long-term retainer engagements</li>
                  <li>Async-first, global timezone coverage</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xs uppercase tracking-widest text-white/30">
                  Daily tools
                </h3>
                <ul className="space-y-2 text-base text-white/70">
                  <li>LangChain · LangGraph · FastAPI</li>
                  <li>Claude API · Gemini Flash · Groq</li>
                  <li>Pinecone · FAISS · ChromaDB</li>
                  <li>React · Docker · DigitalOcean</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xs uppercase tracking-widest text-white/30">
                  Availability
                </h3>
                <ul className="space-y-2 text-base text-white/70">
                  <li>Available for new projects</li>
                  <li>Response within 24 hours</li>
                  <li>Starting point: 20-min scoping call</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
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

          {/* RIGHT — photo (5 cols) */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-24">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/images/about/moizz.webp"
                alt="Moizz K — Full-stack AI Engineer"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

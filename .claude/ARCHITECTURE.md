# Moizz K — Portfolio Architecture & Build Plan

> **Status:** Ready to execute
> **Timeline:** 7 days to v1 live
> **Coding partner:** Claude Code
> **Last updated:** April 2026

---

## 0 — Locked Decisions (no more debate)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router, React 19)** | Industry standard for animation-heavy portfolios. Best ecosystem for GSAP + R3F + Framer Motion. Vercel-native. |
| Language | **TypeScript strict** | Claude Code produces better output with types. Catches class of bugs before runtime. |
| Styling | **Tailwind CSS v4** + small custom CSS for unique animations | You already know it from DocuMind. v4 is CSS-first config, faster. |
| Animation | **GSAP 3.13+** (free, all plugins) + **Lenis** smooth scroll + **Framer Motion** for UI micro-interactions | GSAP for scroll/timeline/text, Framer for React state transitions. Use the right tool per job. |
| 3D/WebGL | **React Three Fiber + Drei** | R3F = Three.js in React. Drei = helpers. Use sparingly (hero + maybe 1 case study accent). |
| Content | **MDX** (`@next/mdx`) for blog + case studies | No CMS overhead. Version-controlled. Claude Code writes MDX directly. |
| Fonts | **Variable fonts, self-hosted** via `next/font/local` | No Google Fonts tracking, faster, zero CLS. |
| Icons | **Lucide React** | Clean, consistent, tree-shakeable. |
| Forms | **Resend** (email send) + simple server action | No SaaS dependency, free tier 100/day. |
| Booking | **Cal.com** free tier, embedded | 20-min scoping call widget. |
| Analytics | **Vercel Analytics** (free, privacy-respecting) + **Vercel Speed Insights** | Zero-setup on Vercel. |
| SEO | Next.js native `metadata` API + JSON-LD structured data | Built-in, no libraries. |
| Hosting | **Vercel Hobby** (free) | Made for Next.js. Global edge CDN. Zero config. |
| Domain | **Cloudflare Registrar** or **Namecheap** | Cheapest renewals, no upsells. |
| CI/CD | **Vercel Git integration** (auto) | Push to `main` → production. Push to branch → preview URL. |
| Package manager | **pnpm** | Fastest, smallest `node_modules`, strict. |

---

## 1 — Full Tech Stack

```
next@15
react@19
typescript@5 (strict)
tailwindcss@4
gsap@3.13+ (core + ScrollTrigger, ScrollSmoother, SplitText, CustomEase, DrawSVG)
@gsap/react (useGSAP hook)
lenis (smooth scroll, integrates with ScrollTrigger)
framer-motion@12
three + @react-three/fiber + @react-three/drei (only for hero + accents)
@next/mdx + remark-gfm + rehype-pretty-code (syntax highlighting)
gray-matter (frontmatter parsing)
lucide-react (icons)
clsx + tailwind-merge (className utilities)
resend (form emails)
zod (form validation)
@vercel/analytics + @vercel/speed-insights
```

**Install command for Claude Code (Day 1):**
```bash
pnpm create next-app@latest moizz-portfolio --typescript --tailwind --app --src-dir --import-alias "@/*" --use-pnpm
cd moizz-portfolio
pnpm add gsap @gsap/react lenis framer-motion three @react-three/fiber @react-three/drei lucide-react clsx tailwind-merge @next/mdx @mdx-js/loader @mdx-js/react @types/mdx gray-matter remark-gfm rehype-pretty-code shiki resend zod @vercel/analytics @vercel/speed-insights
```

---

## 2 — Folder Structure

```
moizz-portfolio/
├── .claude/
│   ├── CLAUDE.md                    # Project memory (see §9)
│   ├── commands/                    # Slash commands (see §9)
│   │   ├── new-case-study.md
│   │   ├── new-post.md
│   │   ├── optimize-images.md
│   │   ├── preflight.md
│   │   └── seo-audit.md
│   └── skills/
│       └── animation-patterns/      # Reusable animation recipes for Claude Code
│           └── SKILL.md
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout, font loading, providers
│   │   ├── page.tsx                 # Home
│   │   ├── providers.tsx            # Lenis + GSAP setup, theme
│   │   ├── globals.css              # Tailwind + custom CSS vars
│   │   ├── not-found.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── work/
│   │   │   ├── page.tsx             # Work index, filterable grid
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Case study template
│   │   ├── writing/
│   │   │   ├── page.tsx             # Blog index
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Article template
│   │   ├── contact/
│   │   │   └── page.tsx             # Cal.com + form
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts         # POST handler for form → Resend
│   │   ├── sitemap.ts               # Auto-generated sitemap
│   │   ├── robots.ts
│   │   └── opengraph-image.tsx      # Dynamic OG image
│   ├── components/
│   │   ├── ui/                      # Low-level primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Tag.tsx
│   │   │   └── Input.tsx
│   │   ├── animation/               # Reusable animation components
│   │   │   ├── SplitReveal.tsx      # GSAP SplitText line/word reveal
│   │   │   ├── ScrollReveal.tsx     # Generic scroll-triggered reveal
│   │   │   ├── MagneticButton.tsx   # Mouse-magnetic hover
│   │   │   ├── MarqueeLoop.tsx      # Infinite horizontal marquee
│   │   │   ├── CursorFollower.tsx   # Custom cursor (disabled on touch)
│   │   │   ├── ParallaxBlock.tsx    # Scroll-driven translate
│   │   │   └── PageTransition.tsx   # Route-level transitions
│   │   ├── webgl/
│   │   │   ├── HeroScene.tsx        # R3F scene for hero
│   │   │   ├── ParticleField.tsx    # Point cloud
│   │   │   └── ShaderPlane.tsx      # Custom shader material
│   │   ├── sections/                # Page-level sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Pillars.tsx          # RAG / Agents / Products cards
│   │   │   ├── FeaturedWork.tsx     # Home: 3 featured projects
│   │   │   ├── StackShowcase.tsx    # Tech stack logos marquee
│   │   │   ├── Philosophy.tsx       # About: production-first ethos
│   │   │   ├── CTASection.tsx       # Reusable CTA block
│   │   │   └── Footer.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Sticky, blur bg, mobile sheet
│   │   │   └── MobileMenu.tsx
│   │   ├── case-study/
│   │   │   ├── CaseStudyHero.tsx
│   │   │   ├── CaseStudySection.tsx # Problem/Approach/Stack/Results
│   │   │   ├── StackList.tsx
│   │   │   └── MetricCard.tsx
│   │   └── mdx/
│   │       └── MDXComponents.tsx    # Custom MDX component map
│   ├── content/
│   │   ├── work/                    # MDX case studies
│   │   │   ├── documind.mdx         # Flagship — live demo embed
│   │   │   ├── autoanalyst.mdx
│   │   │   ├── lexai.mdx
│   │   │   ├── insightai.mdx
│   │   │   ├── cognitive-command.mdx
│   │   │   └── auracode.mdx
│   │   └── writing/
│   │       ├── rag-hallucinations.mdx
│   │       ├── langgraph-vs-langchain.mdx
│   │       └── production-llm-checklist.mdx
│   ├── lib/
│   │   ├── gsap.ts                  # Register plugins once, defaults
│   │   ├── lenis.ts                 # Lenis singleton + ScrollTrigger bridge
│   │   ├── mdx.ts                   # Load/parse MDX files
│   │   ├── seo.ts                   # Metadata helpers
│   │   ├── cn.ts                    # className merge utility
│   │   └── schema.ts                # Zod schemas for form, frontmatter
│   ├── hooks/
│   │   ├── useMousePosition.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useReducedMotion.ts      # Respect prefers-reduced-motion
│   │   └── useInView.ts
│   └── types/
│       └── index.ts                 # Shared TS types (Project, Post, etc.)
├── public/
│   ├── fonts/                       # Self-hosted variable fonts (.woff2)
│   ├── images/
│   │   ├── work/                    # Case study covers + screenshots
│   │   └── about/                   # Personal photo
│   ├── videos/                      # Demo clips (mp4, webm)
│   ├── favicon.ico
│   ├── icon.svg
│   └── apple-icon.png
├── .env.local                       # RESEND_API_KEY, CAL_COM_USERNAME
├── .env.example                     # Template committed to git
├── .gitignore
├── next.config.mjs                  # MDX config, image domains
├── tailwind.config.ts               # (or @theme in CSS for v4)
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── README.md
└── LICENSE
```

---

## 3 — Animation System Architecture

This is the spine of the site. Get this right on Day 2 and everything downstream is easy.

### 3.1 Core primitives

**`lib/gsap.ts`** — register once, expose defaults:
```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  CustomEase.create("signature", "0.65, 0, 0.35, 1"); // site-wide ease
  gsap.defaults({ ease: "signature", duration: 0.8 });
}
export { gsap, ScrollTrigger, SplitText };
```

**`lib/lenis.ts`** — smooth scroll + ScrollTrigger bridge:
```ts
// Lenis drives the scroll, ScrollTrigger reads from Lenis.
// Set ScrollTrigger.scrollerProxy or use lenis.on("scroll", ScrollTrigger.update)
// ScrollTrigger.defaults({ scroller: lenisWrapper })
```

### 3.2 Reusable animation components

| Component | Effect | Where used |
|---|---|---|
| `SplitReveal` | SplitText line/word reveal on enter | Hero headline, section titles |
| `ScrollReveal` | Fade + translateY on scroll into view | Paragraphs, cards |
| `MagneticButton` | Button attracts cursor within radius | Primary CTAs |
| `MarqueeLoop` | Infinite horizontal scroll | Stack showcase, client logos |
| `CursorFollower` | Custom cursor, scales on interactive elements | Root (desktop only) |
| `ParallaxBlock` | Translate on scroll (-20% to +20%) | Case study hero images |
| `PageTransition` | Fade/clip-path between routes | Root layout via Framer Motion |

### 3.3 Motion principles (design system rules)

1. **Confident over bouncy.** Use custom ease `0.65, 0, 0.35, 1`. No overshoot springs except for playful micro-interactions.
2. **Stagger everything.** Never animate siblings simultaneously — stagger 0.05–0.1s.
3. **Respect `prefers-reduced-motion`.** Every animation component reads `useReducedMotion()` and degrades to instant state.
4. **Mobile = less motion.** Disable parallax, cursor follower, and WebGL on touch + small viewports. Detect via `useMediaQuery("(hover: hover)")`.
5. **Animations serve content, not the reverse.** Every motion must answer: "What is this drawing attention to?"

### 3.4 WebGL usage rules

- **One hero scene max** (R3F). Keep polygons low, use instancing.
- **Lazy-load Three.js.** `next/dynamic` with `ssr: false` — don't bloat initial bundle.
- **Pause when off-screen.** Use `useFrame` conditionally based on `IntersectionObserver`.
- **Fallback image** for mobile / reduced motion.

Your WebGL concept for the hero (suggestion): a subtle shader-animated noise field with your brand color gradient, or a particle system that responds to mouse movement. Nothing cartoonish. Restrained.

---

## 4 — Design System Foundations

### 4.1 Color (dark-first)

```css
@theme {
  /* Neutral scale — near-black to pure white */
  --color-bg: #0A0A0B;          /* deepest */
  --color-surface: #111113;     /* cards, elevated */
  --color-border: #1F1F22;
  --color-muted: #6B6B72;
  --color-text: #E6E6E9;
  --color-text-bright: #FAFAFA;

  /* Brand accent — PICK ONE on Day 1 and commit */
  /* Option A: Electric violet #7C3AED — tech-forward, memorable */
  /* Option B: Acid lime #BEF264 — distinctive, AI-coded */
  /* Option C: Signal orange #FF5A1F — warm, confident */
  --color-accent: #7C3AED;
  --color-accent-soft: color-mix(in oklch, var(--color-accent) 20%, transparent);
}
```

**Recommendation: Option A (Electric violet #7C3AED).** Distinctive, reads as tech-forward, pairs well with dark UI, not overused in AI freelancer portfolios (most go blue or lime).

### 4.2 Typography

Pair a geometric sans for body with a serif or mono for accent. Three strong options:

| Pair | Body | Display | Mono | Feel |
|---|---|---|---|---|
| A (recommended) | **Inter Variable** | **Instrument Serif** (italic for accent) | **JetBrains Mono Variable** | Modern editorial |
| B | **General Sans Variable** | same as body | **JetBrains Mono** | Clean minimal |
| C | **Geist Sans Variable** | **Fraunces Variable** | **Geist Mono** | Vercel-adjacent |

Type scale (desktop, clamp-based for fluid sizing):
```
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.82rem + 0.3vw, 1rem);
--text-base: clamp(1rem, 0.95rem + 0.35vw, 1.125rem);
--text-lg: clamp(1.25rem, 1.1rem + 0.7vw, 1.5rem);
--text-xl: clamp(1.75rem, 1.5rem + 1.2vw, 2.25rem);
--text-2xl: clamp(2.5rem, 2rem + 2.5vw, 3.75rem);
--text-3xl: clamp(3.5rem, 2.5rem + 5vw, 6rem);
--text-hero: clamp(4rem, 2rem + 10vw, 9rem);
```

### 4.3 Spacing & grid

- Base unit: `0.25rem` (Tailwind default)
- Section vertical rhythm: `py-24 md:py-40`
- Max content width: `max-w-7xl` (1280px), with prose at `max-w-2xl`
- Grid: CSS Grid with `grid-cols-12` for asymmetric layouts

### 4.4 Motion tokens

```
--ease-signature: cubic-bezier(0.65, 0, 0.35, 1);
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--duration-fast: 200ms;
--duration-base: 400ms;
--duration-slow: 800ms;
--duration-cinematic: 1200ms;
```

---

## 5 — Content Model (MDX frontmatter)

### 5.1 Case studies (`content/work/*.mdx`)

```yaml
---
title: "DocuMind"
slug: "documind"
tagline: "Multi-document AI research assistant with mandatory source citations"
order: 1                           # controls display order, DocuMind = 1
featured: true                     # shown on home page
date: "2026-03-01"
status: "live"                     # live | case-study | archived
client: "Personal product"         # or client name
role: "Full-stack engineer"
duration: "6 weeks"
liveUrl: "https://documind.example.com"
githubUrl: "https://github.com/Moizzzzzzzzzz/documind"
cover: "/images/work/documind/cover.webp"
thumbnail: "/images/work/documind/thumb.webp"
stack:
  - LangChain
  - LangGraph
  - FastAPI
  - React
  - Pinecone
  - Upstash Redis
  - Docker
  - DigitalOcean
problem: "Legal/research teams lose hours searching across dozens of PDFs..."
results:
  - metric: "Answer accuracy"
    value: "94%"
    note: "measured on 200-question eval set"
  - metric: "Average response time"
    value: "2.1s"
  - metric: "Source citation coverage"
    value: "100%"
seo:
  description: "Production RAG system with citations — FastAPI, LangChain, Pinecone."
  ogImage: "/images/work/documind/og.png"
---

## Problem
(MDX body — free-form with custom components)

## Approach

## Stack

## Results
```

### 5.2 Blog posts (`content/writing/*.mdx`)

```yaml
---
title: "Why 90% of RAG Systems Hallucinate"
slug: "rag-hallucinations"
description: "Most RAG failures come from three predictable places. Here's how to fix each."
date: "2026-04-10"
tags: ["RAG", "LLM", "Production"]
cover: "/images/writing/rag-hallucinations/cover.webp"
readingTime: "6 min"
draft: false
---
```

---

## 6 — Page-by-Page Breakdown

### 6.1 Home (`/`)

| Section | Components | Animation |
|---|---|---|
| Hero | `Hero` → `HeroScene` (R3F) + `SplitReveal` headline + `MagneticButton` | WebGL loop + text reveal on load + cursor parallax on scene |
| Brand statement | single paragraph, large type | `SplitReveal` on scroll in |
| 3 Pillars | `Pillars` with 3 `Card` | Stagger fade+translate on scroll |
| Featured Work | `FeaturedWork` → 3 project cards (DocuMind, AutoAnalyst, LexAI) | Horizontal scroll or pinned ScrollTrigger reveal |
| Stack showcase | `StackShowcase` with `MarqueeLoop` | Infinite horizontal marquee |
| CTA | `CTASection` — "See DocuMind Live" + "Book a Call" | `MagneticButton` |
| Footer | `Footer` | — |

**Copy for hero headline (draft — refine on Day 3):**
> Production AI systems
> that don't fall apart
> in the last 10%.

Subtitle: "Full-stack AI engineer building RAG, agents, and LLM products that ship."

### 6.2 Work (`/work`)

- Grid of 6 case studies, filterable by tag (RAG | Agents | Full-Stack)
- Each card: cover image, title, tagline, tags, role
- Hover: slight zoom + accent border
- DocuMind always first (featured treatment)

### 6.3 Case study (`/work/[slug]`)

Structure per case study:
1. **Hero** — project title, tagline, live/github links, hero image
2. **Overview** — 2-3 sentences, key metrics strip
3. **Problem** — why this existed
4. **Approach** — how you thought about it
5. **Architecture diagram** (SVG, can be hand-drawn in Excalidraw)
6. **Stack** — logos with short rationale
7. **Results** — metrics with context
8. **Live demo embed** (DocuMind only — iframe)
9. **Next/prev navigation**

### 6.4 About (`/about`)

- Hero with personal photo (right-aligned on desktop, stacked on mobile)
- Your story: AI & Data Science → DocuMind → freelance business (3 short paragraphs)
- "How I think about building AI" section — production-first philosophy (manifesto-style)
- Currently reading / tools I use / availability
- CTA: Book a call

### 6.5 Writing (`/writing`)

- List of articles, newest first
- Each: title, description, date, reading time, tags
- No pagination needed for v1 (3 articles)

### 6.6 Article (`/writing/[slug]`)

- Title, date, reading time, tags
- Reading progress bar (scroll-driven, GSAP or native)
- Prose max-width 65ch for readability
- Code blocks with syntax highlighting (Shiki via `rehype-pretty-code`)
- Footer: author card + related posts

### 6.7 Contact (`/contact`)

- Left: Cal.com embed (20-min scoping call)
- Right: simple form (name, email, message) → POST to `/api/contact` → Resend
- Below: Upwork link, LinkedIn link, direct email

---

## 7 — SEO & Performance Checklist

### 7.1 SEO essentials

- [ ] Unique `<title>` and `<meta description>` per page via `generateMetadata`
- [ ] Open Graph images per page (dynamic with `@vercel/og` or static in `/public`)
- [ ] Twitter Card tags
- [ ] JSON-LD structured data:
  - `Person` schema on `/about`
  - `Article` schema on each blog post
  - `BreadcrumbList` on case studies and articles
  - `WebSite` with `SearchAction` on root
- [ ] `sitemap.ts` auto-generates from content folders
- [ ] `robots.ts` allows all
- [ ] Canonical URLs set
- [ ] Semantic HTML (`<article>`, `<nav>`, `<main>`, single `<h1>` per page)
- [ ] Alt text on every image

### 7.2 Target keywords

Primary: `Full-Stack AI Engineer`, `RAG developer`, `LangChain freelancer`, `production LLM systems`
Long-tail: `RAG developer Pakistan`, `custom AI agent builder`, `LangGraph freelancer`, `FastAPI React AI developer`
Personal brand: `Moizz K AI engineer`, `Abdul Moizz AI engineer`

### 7.3 Performance budget

| Metric | Target |
|---|---|
| LCP | < 1.8s |
| CLS | < 0.05 |
| INP | < 200ms |
| First Load JS (home) | < 120kB |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| Lighthouse SEO | 100 |

### 7.4 Performance tactics

- [ ] All images as WebP/AVIF, served via `next/image` with proper `sizes`
- [ ] Self-hosted variable fonts with `font-display: swap` (handled by `next/font/local`)
- [ ] Three.js loaded via `next/dynamic` with `ssr: false`
- [ ] MDX pre-rendered at build time (default with Next.js App Router + static content)
- [ ] Video case study demos: `<video>` with `preload="metadata"` and poster image
- [ ] Preload critical fonts and hero image
- [ ] No third-party scripts except Cal.com (lazy-embed on contact page only)

---

## 8 — Deployment Pipeline

### 8.1 Initial setup (Day 1)

1. Create GitHub repo `moizz-portfolio` (public or private, your call)
2. `pnpm create next-app` (see §1 install)
3. Connect repo to Vercel (GitHub integration → import)
4. Add env vars to Vercel dashboard:
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_CAL_USERNAME`
   - `NEXT_PUBLIC_SITE_URL`
5. Verify deploy on default `*.vercel.app` URL
6. Buy domain (Cloudflare or Namecheap) — suggest `moizz.dev` or `moizz.xyz` or `abdulmoizz.com`
7. Add domain in Vercel → update DNS records

### 8.2 Git workflow

- `main` branch → production auto-deploy
- Feature branches → automatic preview URLs (share in LinkedIn as teasers)
- Conventional commits: `feat:`, `fix:`, `style:`, `docs:`, `refactor:`
- One feature per branch, no giant PRs

### 8.3 Post-launch monitoring

- Vercel Analytics dashboard (free tier)
- Vercel Speed Insights (Core Web Vitals)
- Weekly Lighthouse runs on all pages
- Set up Vercel Log Drains if contact form is hitting errors

---

## 9 — Claude Code Setup

Claude Code is your pair programmer. The goal: you describe intent, Claude Code writes and iterates the code. Setup below is the difference between a good week and a chaotic one.

### 9.1 `CLAUDE.md` (project root — commit to git)

Keep it short. See §9.2 for the exact file.

### 9.2 Starter `CLAUDE.md`

I'm shipping this as a separate file you can drop directly into your repo root. It follows Anthropic's official guidance: short, human-readable, only the rules that would cause mistakes if removed.

### 9.3 Slash commands (`.claude/commands/`)

Five commands that save you from retyping the same prompts all week:

**`/new-case-study [slug]`** — scaffolds a new MDX case study with correct frontmatter and section structure, then asks you 6 targeted questions.

**`/new-post [slug]`** — scaffolds a blog post with frontmatter, outline, SEO fields.

**`/optimize-images [path]`** — converts images in the given folder to WebP + AVIF, generates responsive sizes, updates references.

**`/preflight`** — runs before every commit: typecheck, lint, Lighthouse local, grep for TODOs.

**`/seo-audit [page]`** — checks a page's metadata, heading hierarchy, alt text, structured data, OG tags.

### 9.4 Claude Code working agreement (how you'll actually use it)

| Do | Don't |
|---|---|
| Start every session with `/clear` if switching contexts | Let one session run all day — context drifts |
| Use `/plan` mode for multi-step tasks (let it map the plan first) | Ask Claude Code to "just build the whole site" in one prompt |
| Review diffs before accepting — you're the engineer | Accept blindly, especially on animation math |
| Keep one focus per session: "Build Navbar" not "Build everything" | Mix unrelated changes in one branch |
| Paste this ARCHITECTURE.md into the first message of each session | Assume Claude Code remembers across sessions |
| Use Opus for planning, Sonnet for coding (`/model`) | Use Opus for routine file edits — wasteful |
| Run `/compact` when context hits ~70% | Let it auto-compact at 99% — info gets lost |

---

## 10 — 7-Day Execution Plan with Claude Code Prompts

Each day has a single outcome. If a day runs over, move scope to the next day — do NOT ship a broken page.

### Day 1 — Foundation + Deploy Pipeline (4 hrs)

**Outcome:** Empty site deployed to Vercel with correct routing, fonts, Tailwind v4, GSAP configured, env vars wired.

**Claude Code session 1 — Scaffold**
> Read ARCHITECTURE.md. Set up a Next.js 15 project named moizz-portfolio using the pnpm create command in §1. Then install the full dependency list. Create the folder structure from §2 (empty files where needed). Do NOT write component logic yet — just scaffolding + README.md.

**Claude Code session 2 — Config**
> Configure: (1) Tailwind v4 using CSS-first @theme with the color tokens and type scale from §4. (2) MDX pipeline in next.config.mjs with @next/mdx, remark-gfm, rehype-pretty-code. (3) lib/gsap.ts per §3.1. (4) lib/lenis.ts bridge to ScrollTrigger. (5) providers.tsx that wraps children with Lenis. Write all config, no component code.

**Claude Code session 3 — Deploy pipeline**
> Create the empty page.tsx for all 5 routes with just a `<h1>` per route. Set up app/layout.tsx with font loading via next/font/local (Inter Variable + Instrument Serif + JetBrains Mono from /public/fonts). Add app/sitemap.ts and app/robots.ts. Commit, push to main, verify Vercel deploy succeeds.

**Manual Day 1 tasks:**
- Buy domain
- Create Resend account, get API key
- Set up Cal.com with 20-min event
- Add env vars in Vercel dashboard

### Day 2 — Design System + Shared Layout (6 hrs)

**Outcome:** Navbar, Footer, PageTransition, and all animation primitives in `components/animation/` working on a test page.

**Session 1 — Primitives**
> Build components/ui/Button.tsx, Card.tsx, Tag.tsx per §4. Use clsx + tailwind-merge utility. Variants for Button: primary, secondary, ghost. All interactive elements need focus-visible styles.

**Session 2 — Animation components**
> Build all 7 components in components/animation/ per §3.2. Each must: respect prefers-reduced-motion, clean up GSAP contexts with useGSAP hook, be SSR-safe. Include JSDoc with usage example for each. Write a test page at app/_dev/animations/page.tsx showing all 7 in action (delete before final deploy).

**Session 3 — Layout chrome**
> Build Navbar (sticky, blur background on scroll, mobile drawer via Framer Motion), Footer, and PageTransition wrapper. Navbar: logo left, links center (Work, Writing, About, Contact), CTA right. Mobile: hamburger → full-screen sheet.

### Day 3 — Home Page (6 hrs)

**Outcome:** Home page pixel-perfect on desktop + mobile, WebGL hero running smooth.

**Session 1 — Hero**
> Build components/sections/Hero.tsx. Headline using SplitReveal (3-line stagger from §6.1). Subtitle reveals after headline. Two CTA buttons (MagneticButton). Behind content: HeroScene component using R3F with a subtle shader-animated gradient plane using the brand accent color. Lazy-load Three.js. Provide static image fallback for reduced-motion users and mobile.

**Session 2 — Content sections**
> Build Pillars, FeaturedWork, StackShowcase, CTASection, Footer sections. Wire them in app/page.tsx. All scroll-triggered reveals use the ScrollReveal primitive. StackShowcase uses MarqueeLoop with logos from /public/images/stack/.

**Session 3 — Polish + Lighthouse**
> Run Lighthouse on localhost. Fix every issue dropping score below 95. Particularly: image sizing (LCP), unused JS (bundle analysis), font loading.

### Day 4 — Work Pages + Case Studies (8 hrs)

**Outcome:** `/work` index live, all 6 case studies written and published.

**Session 1 — Work index + case study template**
> Build app/work/page.tsx (filterable grid) and app/work/[slug]/page.tsx (full case study layout per §6.3). Use generateStaticParams for static generation. MDXComponents map renders custom components inside case study body.

**Session 2 — DocuMind case study**
> Write content/work/documind.mdx. Use my existing DocuMind knowledge (provided in this message — paste from memories). Structure: Problem → Approach → Stack → Architecture → Results → Live demo embed. Include metrics, architecture diagram placeholder, screenshots placeholders.

**Session 3 — Remaining 5 case studies**
> Write all 5 remaining case studies as MDX: AutoAnalyst, LexAI, InsightAI, Cognitive Command, AuraCode. I'll provide a brief for each — use my context. Keep each to ~500 words. Flag where I need to provide screenshots.

### Day 5 — About + Writing (5 hrs)

**Outcome:** About page with photo + story, 3 blog posts published.

**Session 1 — About**
> Build app/about/page.tsx per §6.4. I'll provide the story text. Layout: personal photo right-aligned on desktop (I'll supply /public/images/about/moizz.webp), stacked on mobile. Include philosophy/manifesto section in larger serif type.

**Session 2 — Writing index + template**
> Build app/writing/page.tsx (list view) and app/writing/[slug]/page.tsx (article view with reading progress bar, table of contents for articles > 5min reads).

**Session 3 — 3 blog posts**
> Write the 3 MDX articles: "Why 90% of RAG systems hallucinate", "LangGraph vs plain LangChain", "The 5-step pre-flight check for production LLM apps". I'll provide outlines per post. Each 600-1000 words. Include code blocks where relevant.

### Day 6 — Contact + SEO Polish (4 hrs)

**Outcome:** Working contact form, Cal.com embed, all pages SEO-audited.

**Session 1 — Contact**
> Build app/contact/page.tsx with Cal.com embed (username from env) and contact form. Form uses Zod validation, Server Action (not route handler — better DX), calls Resend to send me an email. Show toast on success/error (use Sonner). Honeypot field for spam.

**Session 2 — SEO pass**
> Run /seo-audit on every page. Add generateMetadata for all dynamic routes. Create dynamic OG image at app/opengraph-image.tsx using Vercel's @vercel/og. Add JSON-LD structured data per §7.1.

**Session 3 — Accessibility pass**
> Keyboard-navigate every page. Verify focus indicators. Run axe-core. Check color contrast on all text (especially muted text against dark bg). Add skip-to-content link. Verify screen reader labels on icon-only buttons.

### Day 7 — Launch (3 hrs)

**Outcome:** Live on your domain, shared.

- Connect custom domain in Vercel
- Final Lighthouse run on production URL
- Test every form / link / CTA on real mobile device
- Write LinkedIn launch post with 30-second Loom walkthrough
- Post on Twitter/X with link + 3 screenshots
- Add website URL to Upwork profile, LinkedIn headline, GitHub bio

---

## 11 — Post-Launch v1.1 (backlog for after sprint)

Ship v1 first. These can wait:
- Interactive case study diagrams (animated SVG)
- Dark/light mode toggle (if you want — dark-only is fine for v1)
- RSS feed for /writing
- View counter / likes per post (Vercel KV)
- Contact form inline response with Claude API ("let me know if this is a fit")
- Animated 404 page
- i18n if you want to target Urdu-speaking clients too

---

## 12 — Common Pitfalls (things that will eat your time)

| Pitfall | Fix |
|---|---|
| GSAP animations breaking on route change | Use `@gsap/react`'s `useGSAP` hook — auto cleanup |
| Lenis + ScrollTrigger desync | Bridge them in `providers.tsx`, call `ScrollTrigger.update()` on Lenis scroll |
| CLS from web fonts | Use `next/font/local` with `display: 'swap'` + matching fallback metrics |
| Three.js bundle bloat (2MB+) | `next/dynamic` with `{ ssr: false }`, tree-shake Drei imports |
| Hydration mismatch on animations | Gate on `useEffect` / `mounted` state before rendering animated content |
| MDX images not optimizing | Use MDX `components` map to replace `<img>` with `next/image` |
| Contact form spam | Honeypot field + rate limit via Upstash Redis (you already have it for DocuMind) |
| Mobile 100vh bug | Use `100svh` (small viewport height) for hero, fallback `100dvh` |
| ScrollTrigger firing too early | `refreshPriority` + `ScrollTrigger.refresh()` after images load |

---

## 13 — Files I'm shipping alongside this plan

1. **ARCHITECTURE.md** (this file) — reference doc
2. **CLAUDE.md** — drop-in-ready project memory file for Claude Code
3. **slash-commands.md** — 5 commands to paste into `.claude/commands/`

---

Bhai, this is your map. Open Claude Code, run `/init`, paste the CLAUDE.md contents, and start Day 1. Push back on anything that doesn't feel right — I'll iterate.
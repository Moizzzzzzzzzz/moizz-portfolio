# Moizz K — Portfolio
Personal portfolio for Moizz K, Full-Stack AI Engineer. Animation-heavy, production-grade. Ships to Vercel.

---

## Subagent Routing (READ THIS FIRST)

Before doing ANY multi-step task, identify the type and spawn the correct subagent via the Task tool. Main agent plans + verifies. Subagents execute. This saves tokens and keeps context clean.

| Task type | Subagent instruction |
|---|---|
| New component | "You are a React/Next.js component builder. Read CLAUDE.md conventions and animation rules. Build only the requested component." |
| MDX content | "You are a technical content writer. Read CLAUDE.md content rules for frontmatter schema. Write only the requested MDX file." |
| Build error | "You are a Next.js debugger. Read the exact error below. Find root cause. Fix only the file causing it. Do not refactor anything else." |
| Animation | "You are a GSAP + Framer Motion specialist. Read CLAUDE.md animation rules. Use useGSAP, never useEffect." |
| SEO / metadata | "You are a Next.js SEO specialist. Use generateMetadata API. Add JSON-LD where specified." |
| Config / tooling | "You are a Next.js config specialist. Touch only config files. Do not modify components." |

**Token-saving rules for subagents:**
- Pass only the files the subagent needs — not entire `src/`
- One subagent = one responsibility
- After subagent completes, main agent runs `pnpm build` to verify

---

## Stack

- Next.js 15 App Router, React 19, TypeScript strict
- Tailwind CSS v4 (CSS-first `@theme` in `globals.css`)
- GSAP 3.13+ — ScrollTrigger, SplitText, CustomEase (all free since April 2025)
- Lenis smooth scroll, bridged to ScrollTrigger in `src/app/providers.tsx`
- Framer Motion — route transitions + UI micro-interactions
- React Three Fiber + Drei — lazy-loaded only, hero + max 1 accent
- MDX — `src/content/work/` and `src/content/writing/`
- Resend — contact form emails
- Cal.com — embedded booking on `/contact`
- **Package manager: pnpm**

---

## Commands

- `pnpm dev` — local dev
- `pnpm build` — production build
- `pnpm lint` — ESLint
- `pnpm typecheck` — tsc --noEmit

Always run `pnpm typecheck` AND `pnpm lint` after changes. Task is not done until both pass.

---

## Conventions

- **Imports:** `@/*` alias only — never relative `../../`
- **Components:** PascalCase filename, default export matching filename
- **Hooks:** `use` prefix, one per file in `src/hooks/`
- **Styling:** Tailwind utilities only; custom CSS in `globals.css` under `@layer components`
- **className:** always `cn()` from `src/lib/cn.ts` (clsx + tailwind-merge)
- **Icons:** Lucide React, imported individually

---

## Animation rules

- GSAP: always `useGSAP` from `@gsap/react` — never raw `useEffect`
- Every animation component: read `useReducedMotion()` — if true, render final state, skip animation
- R3F / Three.js: always `next/dynamic` + `{ ssr: false }` — never in a Server Component
- GSAP plugins: registered once in `src/lib/gsap.ts` — never `gsap.registerPlugin()` inside components
- ScrollTrigger reads from Lenis — do not bypass bridge in `providers.tsx`
- Default ease: `"signature"` (CustomEase, cubic-bezier 0.65,0,0.35,1) — never `power2.out`

---

## Content rules

- Case studies: `src/content/work/<slug>.mdx` — see `documind.mdx` for frontmatter shape
- Blog posts: `src/content/writing/<slug>.mdx`
- DocuMind is always `order: 1` — new case studies start at `order: 10`
- Images in MDX: `public/images/work/<slug>/` — WebP or AVIF only, never JPG/PNG

---

## Design tokens (brand)

- Accent: `#7C3AED` (Electric Violet)
- Background: `#0A0A0B`
- Surface: `#111113`
- Border: `#1F1F22`
- Text: `#E6E6E9`
- Text bright: `#FAFAFA`
- Muted: `#6B6B72`

---

## Performance budget

- First Load JS for `/`: under 120kB
- If a new dependency pushes over budget, flag it and suggest alternative

---

## What NOT to do

- No new animation libraries — GSAP + Framer Motion cover everything
- No CMS — content stays MDX in git
- No authentication
- No `<img>` — always `next/image`
- No Google Fonts — fonts self-hosted in `public/fonts/`
- No analytics beyond Vercel Analytics in v1

---

## References

- Full architecture + 7-day plan: @ARCHITECTURE.md
Moizz K — Portfolio
Personal portfolio for Moizz K, Full-Stack AI Engineer. Animation-heavy, production-grade. Ships to Vercel.
Stack

Next.js 15 App Router, React 19, TypeScript strict
Tailwind CSS v4 (CSS-first config via @theme in globals.css)
GSAP 3.13+ (ScrollTrigger, SplitText, CustomEase) — 100% free as of April 2025
Lenis smooth scroll, bridged to ScrollTrigger in src/app/providers.tsx
Framer Motion for route transitions + UI micro-interactions
React Three Fiber + Drei — lazy-loaded only, hero scene + max 1 accent
MDX for src/content/work/ and src/content/writing/
Resend for contact form, Cal.com embedded on /contact
pnpm as package manager

Commands

pnpm dev — local dev
pnpm build — production build
pnpm lint — ESLint
pnpm typecheck — tsc --noEmit

Always run pnpm typecheck AND pnpm lint after a series of code changes. Do not mark a task complete until both pass.
Conventions

Imports: use @/* alias, never relative paths that climb ../../
Components: PascalCase file names, default export matching filename
Hooks: use prefix, one hook per file in src/hooks/
Styling: Tailwind utility classes only; custom CSS lives in src/app/globals.css under @layer components
className merging: always use cn() from src/lib/cn.ts (clsx + tailwind-merge)
Icons: Lucide React, imported individually (import { ArrowRight } from "lucide-react")

Animation rules (IMPORTANT)

Every GSAP animation MUST use @gsap/react's useGSAP hook, never raw useEffect. This guarantees cleanup on unmount + HMR.
Every animation component MUST check useReducedMotion() and skip animation (render to final state) when the user prefers reduced motion.
Three.js / R3F components MUST be loaded with next/dynamic + { ssr: false }. Never import three in a Server Component.
GSAP plugins are registered once in src/lib/gsap.ts. Never call gsap.registerPlugin() inside components.
ScrollTrigger reads scroll from Lenis, not window. Do not bypass the bridge in providers.tsx.
Signature ease is CustomEase signature (defined in lib/gsap.ts, cubic-bezier 0.65,0,0.35,1). Use ease: "signature" as default, not power2.out etc.

Content rules

Case studies live at src/content/work/<slug>.mdx with full frontmatter (see any existing file as template).
Blog posts live at src/content/writing/<slug>.mdx.
When adding a case study, order: 1 is reserved for DocuMind. New case studies start at order: 10+.
Images referenced in MDX go under public/images/work/<slug>/ and public/images/writing/<slug>/. Always WebP or AVIF, never JPG/PNG in production.

Performance budget
First Load JS for / must stay under 120kB. If adding a dependency pushes it over, flag it and suggest alternatives.
What not to do

Do NOT install new animation libraries (Motion One, AutoAnimate, etc.). GSAP + Framer Motion cover everything.
Do NOT add a CMS (Sanity, Contentful, Payload). Content stays as MDX files in git.
Do NOT add authentication. This is a static portfolio.
Do NOT use <img> — always next/image.
Do NOT use Google Fonts. Variable fonts are self-hosted in public/fonts/.
Do NOT add analytics beyond Vercel Analytics. No GA, no Segment, no PostHog in v1.

References

Architecture + 7-day build plan: @ARCHITECTURE.md
Deferred personal notes (gitignored): @CLAUDE.local.md
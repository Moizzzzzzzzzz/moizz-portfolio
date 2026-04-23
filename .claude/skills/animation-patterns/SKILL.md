# Animation Patterns

Reusable GSAP + Framer Motion recipes for this portfolio.

## Available components

All live in `src/components/animation/`:

| Component | What it does | Key props |
|-----------|-------------|-----------|
| `SplitReveal` | GSAP SplitText line/word reveal on scroll | `split`, `delay`, `as` |
| `ScrollReveal` | Generic fade + translate on scroll | `direction`, `distance`, `delay` |
| `MagneticButton` | Mouse-magnetic hover effect | `strength` |
| `MarqueeLoop` | Infinite horizontal marquee | `speed`, `direction` |
| `CursorFollower` | Custom cursor dot + ring (disabled on touch) | — |
| `ParallaxBlock` | Scroll-driven Y translate | `speed` |
| `PageTransition` | Route-level fade+slide in | — |

## Rules

- Always check `useReducedMotion()` before animating — all components do this already
- Register GSAP plugins only via `src/lib/gsap.ts` — never call `gsap.registerPlugin()` inline
- Lenis scroll is bridged to `ScrollTrigger` in `src/app/providers.tsx` — don't add another RAF loop
- Use `MagneticButton` as a wrapper around `<Link>` or `<Button>`, not on interactive elements directly
- `MarqueeLoop` duplicates children internally — don't duplicate them in the parent

## Adding a new animation

1. Create the component in `src/components/animation/MyAnimation.tsx`
2. Add `"use client"` directive
3. Import `gsap` and `ScrollTrigger` from `@/lib/gsap` (already registered)
4. Call `useReducedMotion()` and return early / skip animation if true
5. Document it in this SKILL.md table

## Common GSAP patterns

```ts
// Scroll-triggered fade up
gsap.fromTo(el, { opacity: 0, y: 40 }, {
  opacity: 1, y: 0,
  scrollTrigger: { trigger: el, start: "top 85%" }
});

// Infinite marquee
gsap.to(track, {
  x: -totalWidth,
  duration,
  repeat: -1,
  ease: "none",
});

// Magnetic pull
gsap.to(el, { x, y, duration: 0.4, ease: "power2.out" });
// Reset on leave
gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
```

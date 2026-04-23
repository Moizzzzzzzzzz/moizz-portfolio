---
description: Scaffold a new blog post with frontmatter and outline
argument-hint: [slug]
---

Creating a new blog post with slug: $ARGUMENTS

1. Check if `src/content/writing/$ARGUMENTS.mdx` exists. If yes, stop.

2. Reference `src/content/writing/rag-hallucinations.mdx` for frontmatter shape.

3. Create the MDX file with:
   - Full frontmatter: title, slug, description, date (today's date), tags, cover, readingTime ("TBD"), draft (true by default)
   - Heading outline: Introduction, 3-5 main sections (as H2), Conclusion
   - TODO markers on every placeholder

4. Create image folder `public/images/writing/$ARGUMENTS/` with `.gitkeep`.

5. Ask me:
   - What's the working title?
   - One-sentence description for the listing page and SEO meta?
   - What's the core argument (one sentence)?
   - 3-5 section headings you have in mind?
   - Tags (comma-separated)?

6. Update frontmatter and section headings based on my answers. Do not write body content — I'll draft that myself.
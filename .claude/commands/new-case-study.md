---
description: Scaffold a new MDX case study with correct frontmatter and section structure
argument-hint: [slug]
---

You are creating a new case study for the portfolio. The slug provided is: $ARGUMENTS

Follow this exact process:

1. Check if `src/content/work/$ARGUMENTS.mdx` already exists. If yes, stop and ask if I want to overwrite.

2. Look at `src/content/work/documind.mdx` to match the frontmatter shape and section structure exactly.

3. Create `src/content/work/$ARGUMENTS.mdx` with:
   - Complete frontmatter block (all fields from the schema)
   - Placeholder values clearly marked with TODO so I know what to fill
   - Section scaffolding: Problem → Approach → Stack → Architecture → Results
   - `order: 10` by default (DocuMind is 1, others renumber as needed)
   - `featured: false` by default
   - `status: "case-study"` by default

4. Create the image folder `public/images/work/$ARGUMENTS/` and add a `.gitkeep`.

5. After creating the file, ask me these 6 questions one at a time so I can fill the TODOs:
   - What's the project tagline (one sentence, under 80 chars)?
   - Who was this built for (client name or "Personal product")?
   - What problem does it solve (2-3 sentences)?
   - What's the key tech stack (comma-separated list)?
   - What are the headline metrics (up to 3, with values)?
   - Is there a live URL and/or GitHub URL?

6. After I answer, update the MDX file with the real content. Do NOT fabricate details — use only what I give you.
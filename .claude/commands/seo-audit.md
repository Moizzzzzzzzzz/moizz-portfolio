---
description: Audit a page's SEO metadata, headings, alt text, structured data
argument-hint: [page-path like app/page.tsx or app/work/documind/page.tsx]
---

Audit the SEO of the page at: $ARGUMENTS

## Checks

1. **Metadata:** Read the file. Does it export `metadata` or `generateMetadata`? Check for:
   - `title` (unique, 30-60 chars)
   - `description` (120-160 chars, includes primary keyword)
   - `openGraph` (title, description, image, url, type)
   - `twitter` (card, title, description, image)
   - `alternates.canonical`

2. **Heading hierarchy:** Open the rendered component tree. Report:
   - Exactly one `<h1>` per page
   - No skipped levels (h2 → h4 without h3 is wrong)
   - Heading text is descriptive, not "Click here"

3. **Alt text:** Find every `<Image>`, `<img>`, or MDX image. Any missing or empty `alt` attribute?

4. **Structured data:** Does the page include appropriate JSON-LD? Check for:
   - Home/About: `Person` schema
   - Case study: `Article` schema
   - Blog post: `Article` schema + `BreadcrumbList`
   - All pages: none required, but flag if expected and missing

5. **Internal links:** Are there relevant internal links (at least 2) to other pages?

6. **Keyword coverage:** Which of these primary keywords appear on the page?
   - "Full-Stack AI Engineer"
   - "RAG developer"
   - "LangChain" / "LangGraph"
   - "production LLM"
   - "AI agent"
   
   Flag if a relevant page is missing obvious keyword fits.

## Output format
SEO Audit — <page>
[PASS] Unique title (54 chars)
[FAIL] Description missing
[PASS] H1 present, hierarchy clean
[WARN] 2 images missing alt text
[PASS] Article schema present
[INFO] Page has 3 internal links (good)
[WARN] "production LLM" keyword not used — natural fit in intro?
PRIORITY FIXES:

Add metadata.description (120-160 chars, include "RAG developer")
Add alt text to hero image + screenshot 2


Do NOT edit the file — just report.
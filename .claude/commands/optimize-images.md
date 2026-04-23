---
description: Convert images in a folder to WebP + AVIF with responsive sizes
argument-hint: [folder-path]
allowed-tools: Bash(sharp*), Bash(ls*), Bash(find*), Read, Write
---

Optimize all raster images (.jpg, .jpeg, .png) in the folder: $ARGUMENTS

Steps:

1. List all raster images in the folder using `find $ARGUMENTS -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \)`.

2. For each image, use `sharp` (install via `pnpm add -D sharp` if not already installed) to generate:
   - `<name>.webp` at original size (quality 82)
   - `<name>.avif` at original size (quality 70)
   - `<name>-640.webp`, `<name>-1024.webp`, `<name>-1920.webp` responsive sizes

3. Write a short script at `scripts/optimize-images.ts` if it doesn't exist, then run it against $ARGUMENTS.

4. After generation, report:
   - Original total size
   - New total size (WebP + AVIF combined)
   - % reduction
   - File list

5. Do NOT delete the originals. I'll delete them manually after verifying.

6. Grep the codebase for references to the original `.jpg/.png` paths and suggest edits to use `next/image` with the new WebP source. Do not auto-edit — show me the diff first.
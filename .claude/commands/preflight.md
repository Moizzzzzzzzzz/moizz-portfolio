---
description: Run before every commit — typecheck, lint, build check, TODO scan
allowed-tools: Bash(pnpm*), Bash(grep*), Bash(git*)
---

Run the full preflight check. Report PASS/FAIL per step. Do not attempt fixes — just report.

## Context
- Current branch: !`git branch --show-current`
- Files changed: !`git diff --stat HEAD`

## Checks

1. **Typecheck:** `pnpm typecheck` — must pass with zero errors.

2. **Lint:** `pnpm lint` — must pass. Warnings are OK, errors are not.

3. **Build:** `pnpm build` — must succeed. Note any new bundle size warnings.

4. **TODO scan:** `grep -rn "TODO\|FIXME\|XXX" src/` — list all. These are OK to commit, but flag if any have been there > 3 days.

5. **Console.log scan:** `grep -rn "console\." src/ --include="*.ts" --include="*.tsx"` — flag stray logs that aren't intentional error logging.

6. **Unused exports:** quick scan — nothing strict, just note obvious ones.

## Output format
Preflight Report — <date>
[PASS] Typecheck
[FAIL] Lint (3 errors in Hero.tsx)
[PASS] Build — 118kB First Load (budget: 120kB) ✓
[WARN] 2 TODOs older than 3 days
[PASS] No stray console.logs
RECOMMENDATION: Fix lint errors before committing.

Do NOT commit anything. Just report.
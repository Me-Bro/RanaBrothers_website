# CLAUDE.md

Guidance for AI coding sessions in this repository.

## Project

Marketing website for Rana Brothers (a software, app and AI development studio), served at https://ranabrothers.online. It is a static export (Next.js 16 App Router) with output in `out/`.

## Commands

- Dev: `npm run dev` · Build: `npm run build` (runs the brand guard, content rules and SEO gate afterwards)
- Tests: `npm test` (Vitest units in `tests/unit`; `node:test` script tests in `tests/guard`, `tests/content`, `tests/assets`, `tests/seo`) · E2E: `npm run test:e2e` (after a build)
- Everything CI checks: `npm run verify`

## Conventions

- Node 24.16.0 via Volta (`package.json` `volta` + `.node-version`). Never use the machine's default Node.
- Every page is registered in `content/registry.ts`. Metadata (`lib/meta.ts`), JSON-LD (`lib/schema.ts`), navigation (`content/navigation.ts`), the sitemap and `llms.txt` derive from it. The post-build SEO gate (`scripts/check-seo.mjs`) compares the built HTML with the registry.
- Colours come only from `lib/tokens.ts`; the Tailwind classes are `bg`, `surface`, `surface-2`, `hairline`, `field-border`, `fg`, `muted`, `gold`, `gold-fill`, `gold-soft`, `on-gold`, `ink`. `tests/unit/tokens.test.ts` enforces contrast.
- Fonts: Geist (`font-sans`), Geist Mono (`font-mono`), Instrument Serif Italic (`font-serif`, accent words only), self-hosted in `app/fonts/`.
- Server components by default. Client components only where interaction needs them (menus, contact form, 3D hero).
- URLs are lowercase, hyphenated, with no trailing slash.
- Write tests first. Keep test output pristine.

## Hard rules

- Never add names, contact details or links of any other business anywhere, including comments and commit messages. `scripts/brand-guard.mjs` enforces this with a hashed denylist on commit, push and build. Private planning material is kept outside this repository, so don't look for it here.
- No internship, bootcamp or training-for-students content (`scripts/content-rules.json`).
- Never invent facts: prices, timelines, client counts, reviews. Tag claims that need founder confirmation with `// VERIFY: <what to confirm>`.
- Never bypass git hooks. Never change the repo-local git identity.
- Static export only: no API routes, middleware/proxy, server actions or `next/image`.

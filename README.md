# Rana Brothers — website

Source for https://ranabrothers.online, the website of Rana Brothers, a software, app and AI development studio.

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 3 · three.js (lazy hero) · Node 24 (pinned with Volta). The production build is plain static files in `out/`.

## Getting started

1. Install [Volta](https://volta.sh). It switches to the pinned Node automatically inside this folder.
2. `npm install`. This also enables the git hooks in `.githooks/`.
3. `npm run dev` and open http://127.0.0.1:3000.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (localhost only) |
| `npm run build` | Static export to `out/`, then the brand guard, content rules and the SEO gate |
| `npm run serve` | Serve `out/` on http://127.0.0.1:4173 |
| `npm test` | Unit and script tests |
| `npm run test:e2e` | Playwright end-to-end and accessibility tests (needs a build first) |
| `npm run verify` | Everything CI checks before e2e |
| `npm run assets` | Regenerate favicons, app icons and Open Graph images |
| `npm run check:launch` | Fails while any `VERIFY:` claim is unconfirmed (run it before a public launch) |

## Where things live

| Path | What |
|---|---|
| `content/registry.ts` | Every page: path, title, description, H1, keywords, dates. Metadata, JSON-LD, navigation, sitemap and `llms.txt` derive from it |
| `content/` | Page copy (typed modules) and Markdown for case studies and guides |
| `components/` | UI, layout, page templates, the 3D hero (`components/three/`) |
| `lib/` | Design tokens, metadata, structured data, Markdown rendering |
| `scripts/` | Brand guard, content rules, SEO gate, icon and Open Graph image generators |

## Contributing and deploying

See [CONTRIBUTING.md](CONTRIBUTING.md) and [DEPLOY.md](DEPLOY.md).

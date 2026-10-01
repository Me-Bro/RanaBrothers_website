# Deploying

The site is a static export. Whatever deploys it needs only this repository.

| Item | Value |
|---|---|
| Source | `Me-Bro/RanaBrothers_website`, branch `main` |
| Node | `24.16.0` (`.node-version`) |
| Install / build | `npm ci` then `npm run build` |
| Output directory | `out/` (publish only this directory) |
| Environment variables | Optional: `NEXT_PUBLIC_WEB3FORMS_KEY` enables the on-site contact form (a Web3Forms access key registered to the studio's own email). Without it, the contact page shows an email button instead |

`npm run build` also runs three gates, and the deploy fails if any of them fails:
- the brand guard over `out/`
- the content rules (`VERIFY:` markers are listed but don't block)
- the SEO gate

Before a public launch, run `npm run check:launch`. It fails until every `VERIFY:` claim has been confirmed and its marker removed.

## Host

Cloudflare Pages is recommended: project `ranabrothers`, custom domains `ranabrothers.online` and `www.ranabrothers.online`.

- Direct upload: `npx wrangler pages deploy out --project-name ranabrothers`
- `public/_headers` (security headers, CSP, noindex on `*.pages.dev`, long caching for `/_next/static/`) and `public/_redirects` (`/portfolio` → David's about page) are honoured.
- Enable Cloudflare Web Analytics for the site (cookieless; no consent banner needed).

## Domain routing (zone rules)

- `www.ranabrothers.online/*` → 301 → `https://ranabrothers.online/$1`
- Keep `/edgeverify/*` working. Edge Verify is a separate app that currently runs on Vercel. Add a Worker route `ranabrothers.online/edgeverify*` that proxies to its Vercel production host:

```js
const ORIGIN = 'https://EDGEVERIFY-PROJECT.vercel.app';
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = new URL(url.pathname + url.search, ORIGIN);
    const res = await fetch(new Request(target, request), { redirect: 'manual' });
    const out = new Response(res.body, res);
    const location = out.headers.get('location');
    if (location) out.headers.set('location', location.replace(ORIGIN, url.origin));
    return out;
  },
};
```

## Pre-flight before pointing the apex at this site

- `/edgeverify/`, `/edgeverify/about/` and `/edgeverify/blog/` return 200 through the Worker, with no `X-Robots-Tag: noindex` and no redirect to a `vercel.app` host.
- `/` serves this site, and unknown paths return a real 404.
- `/portfolio/` returns a 301 to `https://david.ranabrothers.online/about`.
- `https://ranabrothers.pages.dev` returns `X-Robots-Tag: noindex`.
- `hello@ranabrothers.online` receives mail (MX records and mailbox are set up).

## After deploying

Add the domain to Google Search Console (Domain property) and Bing Webmaster Tools, submit `https://ranabrothers.online/sitemap.xml`, and ping IndexNow with the key file in `public/`.

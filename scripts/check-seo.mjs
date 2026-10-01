#!/usr/bin/env node
// Post-build SEO gate: checks every exported HTML page in out/ against the page registry
// (content/registry.ts, imported directly: Node 24 strips the types) and the site-wide files. Exit 1 on any problem.
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';

export const SITE_URL = 'https://ranabrothers.online';
export const MIN_WORDS = {
  home: 700,
  hub: 400,
  service: 900,
  'case-study': 900,
  guide: 1200,
  about: 500,
  process: 400,
  faq: 500,
  contact: 60,
  legal: 300,
  utility: 0,
};

export const absoluteUrl = (path) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);
export const htmlFileFor = (path) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`);
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const isFile = (p) => existsSync(p) && statSync(p).isFile();
const stripOrigin = (url) => url.replace(SITE_URL, '').split(/[?#]/)[0] || '/';

/**
 * Problems for one page. ctx: { entry, outDir, registryPaths: Set<string>, externalPaths: Set<string> }.
 * Internal link targets resolve if they are registry pages, files in out/, /_next assets or known external paths.
 */
export function checkPage(html, ctx) {
  const { entry, outDir, registryPaths, externalPaths } = ctx;
  const problems = [];
  const fail = (msg) => problems.push(`${entry.path}: ${msg}`);
  const root = parse(html);
  const meta = (attr, value) => root.querySelector(`meta[${attr}="${value}"]`)?.getAttribute('content');

  const title = root.querySelector('title')?.text ?? '';
  if (norm(title) !== entry.title) fail(`title "${norm(title)}" does not match the registry`);
  if (meta('name', 'description') !== entry.description) fail('meta description does not match the registry');

  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute('href');
  if (canonical !== absoluteUrl(entry.path)) fail(`canonical "${canonical ?? 'missing'}" should be ${absoluteUrl(entry.path)}`);
  if (meta('property', 'og:url') !== absoluteUrl(entry.path)) fail('og:url does not equal the canonical URL');

  const ogImage = meta('property', 'og:image');
  if (!ogImage) fail('missing og:image');
  else if (!existsSync(join(outDir, stripOrigin(ogImage)))) fail(`og:image file ${stripOrigin(ogImage)} is missing from out/`);
  if (meta('name', 'twitter:card') !== 'summary_large_image') fail('twitter:card should be summary_large_image');

  const h1s = root.querySelectorAll('h1');
  if (h1s.length !== 1) fail(`expected exactly one h1, found ${h1s.length}`);
  else if (norm(h1s[0].text) !== norm(entry.h1)) fail(`h1 "${norm(h1s[0].text)}" does not match the registry`);

  const robots = root.querySelectorAll('meta[name="robots"]');
  if (robots.length !== 1) fail(`expected one robots meta, found ${robots.length}`);
  const noindex = robots.some((m) => /noindex/i.test(m.getAttribute('content') ?? ''));
  if (noindex !== Boolean(entry.noindex)) fail(entry.noindex ? 'should be noindex' : 'must not be noindex');

  for (const img of root.querySelectorAll('img')) {
    if (img.getAttribute('alt') === undefined) fail(`img ${img.getAttribute('src')} has no alt attribute`);
    if (!img.getAttribute('width') || !img.getAttribute('height')) fail(`img ${img.getAttribute('src')} needs width and height`);
  }

  for (const script of root.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      JSON.parse(script.rawText);
    } catch {
      fail('a JSON-LD block does not parse');
    }
  }

  for (const a of root.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href');
    if (a.getAttribute('target') === '_blank' && !/\bnoopener\b/.test(a.getAttribute('rel') ?? '')) fail(`link ${href} opens a new tab without rel="noopener"`);
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const target = href.split(/[?#]/)[0] || '/';
    const ok =
      registryPaths.has(target) ||
      externalPaths.has(target) ||
      target.startsWith('/_next/') ||
      isFile(join(outDir, target));
    if (!ok) fail(`internal link ${href} does not resolve`);
  }

  const main = root.querySelector('main');
  const words = main ? norm(main.text).split(' ').filter(Boolean).length : 0;
  const min = MIN_WORDS[entry.kind] ?? 0;
  if (words < min) fail(`thin content: ${words} words in <main>, minimum for ${entry.kind} is ${min}`);

  return problems;
}

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === '_next' ? [] : htmlFiles(p);
    return p.endsWith('.html') ? [p] : [];
  });
}

/** Problems across the whole export in outDir, checked against the registry's pages. */
export function checkSite(outDir, pages, externalPaths = new Set()) {
  const problems = [];
  const registryPaths = new Set(pages.map((p) => p.path));

  for (const entry of pages) {
    const file = join(outDir, htmlFileFor(entry.path));
    if (!existsSync(file)) {
      problems.push(`${entry.path}: no exported HTML file (${htmlFileFor(entry.path)})`);
      continue;
    }
    problems.push(...checkPage(readFileSync(file, 'utf8'), { entry, outDir, registryPaths, externalPaths }));
  }

  const known = new Set(pages.map((p) => htmlFileFor(p.path)));
  for (const file of htmlFiles(outDir)) {
    const rel = relative(outDir, file).split(sep).join('/');
    if (rel === '404.html' || rel.startsWith('_not-found') || known.has(rel)) continue;
    problems.push(`${rel}: exported page is not in the registry`);
  }

  const sitemapFile = join(outDir, 'sitemap.xml');
  if (!existsSync(sitemapFile)) problems.push('sitemap.xml is missing');
  else {
    const locs = new Set([...readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
    const expected = new Set([...pages.filter((p) => !p.noindex).map((p) => absoluteUrl(p.path)), ...[...externalPaths].map(absoluteUrl)]);
    for (const url of expected) if (!locs.has(url)) problems.push(`sitemap.xml is missing ${url}`);
    for (const url of locs) if (!expected.has(url)) problems.push(`sitemap.xml lists unexpected ${url}`);
  }

  const robotsFile = join(outDir, 'robots.txt');
  if (!existsSync(robotsFile) || !readFileSync(robotsFile, 'utf8').includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
    problems.push('robots.txt is missing or has no Sitemap line');
  }

  const llmsFile = join(outDir, 'llms.txt');
  if (!existsSync(llmsFile)) problems.push('llms.txt is missing');
  else {
    const llms = readFileSync(llmsFile, 'utf8');
    for (const hub of ['/services', '/ai', '/work', '/guides']) {
      if (registryPaths.has(hub) && !llms.includes(absoluteUrl(hub))) problems.push(`llms.txt does not list ${hub}`);
    }
  }

  const notFound = join(outDir, '404.html');
  if (!existsSync(notFound)) problems.push('404.html is missing');
  else {
    const robots = parse(readFileSync(notFound, 'utf8')).querySelectorAll('meta[name="robots"]');
    if (robots.length !== 1 || !/noindex/.test(robots[0].getAttribute('content') ?? '')) {
      problems.push('404.html needs exactly one robots meta with noindex');
    }
  }
  return problems;
}

function isMainModule() {
  if (!process.argv[1]) return false;
  try {
    const started = realpathSync(process.argv[1]);
    const here = realpathSync(fileURLToPath(import.meta.url));
    return process.platform === 'win32' ? started.toLowerCase() === here.toLowerCase() : started === here;
  } catch {
    return false;
  }
}

if (isMainModule()) {
  const { pages } = await import(new URL('../content/registry.ts', import.meta.url).href);
  const { externalUrls } = await import(new URL('../content/external-urls.ts', import.meta.url).href);
  const problems = checkSite(join(process.cwd(), 'out'), pages, new Set(externalUrls.map((u) => u.path)));
  for (const p of problems) console.error(`seo  ${p}`);
  console.log(problems.length ? `check-seo: ${problems.length} problem(s)` : 'check-seo: clean');
  process.exit(problems.length ? 1 : 0);
}

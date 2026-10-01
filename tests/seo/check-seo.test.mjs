import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkPage } from '../../scripts/check-seo.mjs';

const entry = {
  path: '/services/web',
  title: 'Web Apps | Rana Brothers',
  description: 'A description that matches the registry exactly for this test page and is long enough to be realistic.',
  h1: 'Web application development',
  kind: 'utility',
};

function page(overrides = {}) {
  const o = {
    title: entry.title,
    description: entry.description,
    canonical: 'https://ranabrothers.online/services/web',
    ogUrl: 'https://ranabrothers.online/services/web',
    ogImage: 'https://ranabrothers.online/og/services--web.png',
    twitter: 'summary_large_image',
    robots: '<meta name="robots" content="index, follow"/>',
    h1: '<h1>Web application development</h1>',
    body: '<p>Hello</p><a href="/services/web">self</a><a href="https://example.com" target="_blank" rel="noopener">ext</a>',
    jsonld: '<script type="application/ld+json">{"@context":"https://schema.org"}</script>',
    ...overrides,
  };
  return `<!doctype html><html><head><title>${o.title}</title><meta name="description" content="${o.description}"/>
<link rel="canonical" href="${o.canonical}"/><meta property="og:url" content="${o.ogUrl}"/>
<meta property="og:image" content="${o.ogImage}"/><meta name="twitter:card" content="${o.twitter}"/>${o.robots}</head>
<body><main>${o.h1}${o.body}</main>${o.jsonld}</body></html>`;
}

function withOut(fn) {
  const outDir = mkdtempSync(join(tmpdir(), 'seo-'));
  mkdirSync(join(outDir, 'og'), { recursive: true });
  writeFileSync(join(outDir, 'og', 'services--web.png'), 'png');
  try {
    return fn({ entry, outDir, registryPaths: new Set(['/', '/services/web']), externalPaths: new Set(['/edgeverify/']) });
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
}

const problems = (overrides) => withOut((ctx) => checkPage(page(overrides), ctx));

test('a correct page passes', () => {
  assert.deepEqual(problems(), []);
});

test('flags a title that differs from the registry', () => {
  assert.match(problems({ title: 'Other' }).join('\n'), /title/);
});

test('flags a wrong or missing canonical', () => {
  assert.match(problems({ canonical: 'https://ranabrothers.online/' }).join('\n'), /canonical/);
});

test('flags two h1 elements', () => {
  assert.match(problems({ h1: '<h1>Web application development</h1><h1>Again</h1>' }).join('\n'), /exactly one h1/);
});

test('flags noindex on an indexable page and duplicate robots tags', () => {
  assert.match(problems({ robots: '<meta name="robots" content="noindex"/>' }).join('\n'), /must not be noindex/);
  assert.match(problems({ robots: '<meta name="robots" content="index"/><meta name="robots" content="noindex"/>' }).join('\n'), /one robots meta/);
});

test('flags images without alt or dimensions', () => {
  assert.match(problems({ body: '<img src="/x.png">' }).join('\n'), /no alt/);
  assert.match(problems({ body: '<img src="/x.png" alt="">' }).join('\n'), /width and height/);
});

test('flags JSON-LD that does not parse', () => {
  assert.match(problems({ jsonld: '<script type="application/ld+json">{bad</script>' }).join('\n'), /JSON-LD/);
});

test('flags broken internal links but accepts registry, external and asset paths', () => {
  assert.match(problems({ body: '<a href="/nope">x</a>' }).join('\n'), /does not resolve/);
  assert.deepEqual(problems({ body: '<a href="/edgeverify/">x</a><a href="/og/services--web.png">y</a><a href="/_next/x.js">z</a>' }), []);
});

test('flags new-tab links without noopener', () => {
  assert.match(problems({ body: '<a href="https://example.com" target="_blank">x</a>' }).join('\n'), /noopener/);
});

test('flags a missing og:image file', () => {
  assert.match(problems({ ogImage: 'https://ranabrothers.online/og/missing.png' }).join('\n'), /og:image file/);
});

test('flags thin content for its page kind', () => {
  const thin = withOut((ctx) => checkPage(page(), { ...ctx, entry: { ...entry, kind: 'service' } }));
  assert.match(thin.join('\n'), /thin content/);
});

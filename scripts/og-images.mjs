#!/usr/bin/env node
// Renders a 1200×630 Open Graph image for every registry page into public/og/
// (satori lays out real Geist glyphs as SVG paths, sharp converts to PNG).
// Node 24 strips types natively, so the registry is imported straight from TypeScript.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import sharp from 'sharp';

const repo = fileURLToPath(new URL('../', import.meta.url));
const { pages } = await import(new URL('../content/registry.ts', import.meta.url).href);

/** Same mapping as ogImagePath() in lib/meta.ts; the SEO gate fails if they ever drift. */
const ogName = (path) => (path === '/' ? 'home' : path.slice(1).replaceAll('/', '--'));

const font = (file) => readFileSync(join(repo, 'node_modules', '@fontsource', 'geist', 'files', file));
const fonts = [
  { name: 'Geist', data: font('geist-latin-400-normal.woff'), weight: 400, style: 'normal' },
  { name: 'Geist', data: font('geist-latin-600-normal.woff'), weight: 600, style: 'normal' },
];
const mark = `data:image/svg+xml;base64,${readFileSync(join(repo, 'brand-source', 'rb-mark.svg')).toString('base64')}`;

const el = (type, style, children, extra = {}) => ({ type, props: { style, children, ...extra } });

function card(title) {
  return el(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 72px',
      backgroundColor: '#060608',
      backgroundImage: 'radial-gradient(circle at 82% 28%, rgba(216,182,118,0.18), rgba(6,6,8,0) 58%)',
      color: '#f4f2ed',
      fontFamily: 'Geist',
    },
    [
      el('div', { display: 'flex', alignItems: 'center', gap: 20 }, [
        el('img', { width: 64, height: 64 }, undefined, { src: mark, width: 64, height: 64 }),
        el('div', { fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }, 'Rana Brothers'),
      ]),
      el('div', { display: 'flex', fontSize: title.length > 60 ? 54 : 62, fontWeight: 600, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1020 }, title),
      el('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22 }, [
        el('div', { color: '#a19fa8', letterSpacing: 5 }, 'SOFTWARE & AI STUDIO'),
        el('div', { color: '#d8b676' }, 'ranabrothers.online'),
      ]),
    ],
  );
}

const outDir = join(repo, 'public', 'og');
mkdirSync(outDir, { recursive: true });
for (const page of pages) {
  const svg = await satori(card(page.h1), { width: 1200, height: 630, fonts });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(join(outDir, `${ogName(page.path)}.png`), png);
}
writeFileSync(join(outDir, 'default.png'), readFileSync(join(outDir, 'home.png')));
console.log(`og images: ${pages.length + 1} written to public/og/`);

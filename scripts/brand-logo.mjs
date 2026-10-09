#!/usr/bin/env node
// Builds the full horizontal logo (mark + "Rana" in Geist + "Brothers" in Instrument Serif Italic, gold)
// from brand-source/rb-mark.svg and the self-hosted fonts. Text is converted to outlines by satori, so the
// SVG needs no fonts. Writes:
//   public/brand/rb-logo-full.svg          vector, transparent, for dark backgrounds
//   public/brand/rb-logo-full.png          2400 px wide, transparent
//   public/brand/rb-logo-full-on-dark.png  2400 px wide on the #0B0B0F brand background, with padding
// Usage: node scripts/brand-logo.mjs [--out <root>]   (default root: cwd)
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import sharp from 'sharp';

const BG = '#0B0B0F';
const repo = fileURLToPath(new URL('../', import.meta.url));
const outFlag = process.argv.indexOf('--out');
const root = resolve(outFlag > -1 ? process.argv[outFlag + 1] : process.cwd());
const font = (pkg, file) => readFileSync(join(repo, 'node_modules', '@fontsource', pkg, 'files', file));

const MARK = 128; // mark size in the logo's coordinate space
const GAP = 30;
const FONT_SIZE = 88;
const fonts = [
  { name: 'Geist', data: font('geist', 'geist-latin-600-normal.woff'), weight: 600, style: 'normal' },
  { name: 'Instrument Serif', data: font('instrument-serif', 'instrument-serif-latin-400-italic.woff'), weight: 400, style: 'italic' },
];
const span = (style, children) => ({ type: 'span', props: { style, children } });
const wordmark = {
  type: 'div',
  props: {
    style: { display: 'flex', alignItems: 'baseline', width: 1400, height: 200, padding: 40, fontFamily: 'Geist', fontSize: FONT_SIZE },
    children: [
      span({ color: '#f4f2ed', fontWeight: 600, letterSpacing: -2, marginRight: 22 }, 'Rana'),
      span({ color: '#d8b676', fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400, fontSize: FONT_SIZE * 1.12 }, 'Brothers'),
    ],
  },
};
const textSvg = await satori(wordmark, { width: 1400, height: 200, fonts });

// Crop the text to its ink: render it, trim the transparent margin, and keep that box as the viewBox.
const { info } = await sharp(Buffer.from(textSvg)).png().trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 }).toBuffer({ resolveWithObject: true });
const left = -info.trimOffsetLeft; // sharp reports crop offsets as negatives
const top = -info.trimOffsetTop;
const textW = info.width;
const textH = info.height;

const markInner = readFileSync(join(repo, 'brand-source', 'rb-mark.svg'), 'utf8')
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/<title[\s\S]*?<\/title>/, '');
const textInner = textSvg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

const height = MARK;
const width = Math.round(MARK + GAP + textW);
const textY = Math.round((height - textH) / 2);
const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="rb-logo-title">` +
  `<title id="rb-logo-title">Rana Brothers</title>` +
  `<svg x="0" y="0" width="${MARK}" height="${MARK}" viewBox="0 0 64 64">${markInner}</svg>` +
  `<svg x="${MARK + GAP}" y="${textY}" width="${textW}" height="${textH}" viewBox="${left} ${top} ${textW} ${textH}" overflow="visible">${textInner}</svg>` +
  `</svg>`;

const write = (rel, data) => {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, data);
};
const PNG_W = 2400;
const pngDensity = (72 * PNG_W) / width;
const logoPng = await sharp(Buffer.from(svg), { density: pngDensity }).resize({ width: PNG_W }).png().toBuffer();
const pad = Math.round(PNG_W * 0.08);
const onDark = await sharp(logoPng)
  .flatten({ background: BG })
  .extend({ top: pad, bottom: pad, left: pad, right: pad, background: BG })
  .png()
  .toBuffer();

write('public/brand/rb-logo-full.svg', svg + '\n');
write('public/brand/rb-logo-full.png', logoPng);
write('public/brand/rb-logo-full-on-dark.png', onDark);
console.log(`brand-logo: ${width}x${height} svg, ${PNG_W}px png`);

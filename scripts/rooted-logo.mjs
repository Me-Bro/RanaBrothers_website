#!/usr/bin/env node
// Builds the RootEd logo: the purple bolt (brand-source/rooted-mark.svg) beside a "RootEd" wordmark in Geist Bold.
// Text is converted to outlines by satori, so the SVG needs no fonts. Writes:
//   public/brand/rooted-logo.svg           vector, transparent, dark text (for light backgrounds)
//   public/brand/rooted-logo.png           2000 px wide, transparent
//   public/brand/rooted-logo-on-white.png  2000 px wide on white, with padding
// Usage: node scripts/rooted-logo.mjs [--out <root>]   (default root: cwd)
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import sharp from 'sharp';

const repo = fileURLToPath(new URL('../', import.meta.url));
const outFlag = process.argv.indexOf('--out');
const root = resolve(outFlag > -1 ? process.argv[outFlag + 1] : process.cwd());
const InkColor = '#16161d';

const fonts = [{ name: 'Geist', data: readFileSync(join(repo, 'node_modules', '@fontsource', 'geist', 'files', 'geist-latin-700-normal.woff')), weight: 700, style: 'normal' }];
const wordmark = {
  type: 'div',
  props: {
    style: { display: 'flex', width: 900, height: 200, padding: 40, fontFamily: 'Geist', fontSize: 84, fontWeight: 700, color: InkColor, letterSpacing: -1.5 },
    children: 'RootEd',
  },
};
const textSvg = await satori(wordmark, { width: 900, height: 200, fonts });
const { info } = await sharp(Buffer.from(textSvg)).png().trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 }).toBuffer({ resolveWithObject: true });
const left = -info.trimOffsetLeft; // sharp reports crop offsets as negatives
const top = -info.trimOffsetTop;
const textW = info.width;
const textH = info.height;

const markSvg = readFileSync(join(repo, 'brand-source', 'rooted-mark.svg'), 'utf8');
const markInner = markSvg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const textInner = textSvg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

const MARK_H = 96;
const MARK_W = Math.round((MARK_H * 48) / 46);
const GAP = 22;
const width = MARK_W + GAP + textW;
const height = MARK_H;
const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="rooted-logo-title">` +
  `<title id="rooted-logo-title">RootEd</title>` +
  `<svg x="0" y="0" width="${MARK_W}" height="${MARK_H}" viewBox="0 0 48 46">${markInner}</svg>` +
  `<svg x="${MARK_W + GAP}" y="${Math.round((height - textH) / 2)}" width="${textW}" height="${textH}" viewBox="${left} ${top} ${textW} ${textH}" overflow="visible">${textInner}</svg>` +
  `</svg>`;

const write = (rel, data) => {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, data);
};
const PNG_W = 2000;
const png = await sharp(Buffer.from(svg), { density: (72 * PNG_W) / width }).resize({ width: PNG_W }).png().toBuffer();
const pad = Math.round(PNG_W * 0.08);
const onWhite = await sharp(png).flatten({ background: '#ffffff' }).extend({ top: pad, bottom: pad, left: pad, right: pad, background: '#ffffff' }).png().toBuffer();

write('public/brand/rooted-logo.svg', svg + '\n');
write('public/brand/rooted-logo.png', png);
write('public/brand/rooted-logo-on-white.png', onWhite);
console.log(`rooted-logo: ${width}x${height} svg, ${PNG_W}px png`);

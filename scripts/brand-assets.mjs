#!/usr/bin/env node
// Generates every favicon/app icon from brand-source/*.svg (sharp):
//   app/favicon.ico (48/32/16), app/icon.svg, app/icon.png (512), app/apple-icon.png (180),
//   public/icon-192.png, public/icon-512.png, public/icon-maskable-512.png,
//   public/brand/rb-mark.svg, public/brand/rb-logo-1024.png
// Usage: node scripts/brand-assets.mjs [--out <root>]   (default root: cwd)
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { pngsToIco } from './lib/ico.mjs';

const BG = '#0B0B0F';
const repo = fileURLToPath(new URL('../', import.meta.url));
const src = (name) => join(repo, 'brand-source', name);
const outFlag = process.argv.indexOf('--out');
const root = resolve(outFlag > -1 ? process.argv[outFlag + 1] : process.cwd());

const write = (rel, data) => {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, data);
};
const copy = (from, rel) => {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  copyFileSync(from, file);
};

const faviconSvg = readFileSync(src('rb-favicon.svg'));
const markSvg = readFileSync(src('rb-mark.svg'), 'utf8');

/** The mark on a full-bleed square (no rounded corners), scaled to `scale` of the canvas. */
function fullBleed(scale) {
  const inner = markSvg
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<title[\s\S]*?<\/title>/, '');
  const offset = (64 - 64 * scale) / 2;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><rect width="64" height="64" fill="${BG}"/>` +
      `<g transform="translate(${offset} ${offset}) scale(${scale})">${inner}</g></svg>`,
  );
}

const render = (svg, size) => sharp(svg, { density: 72 * Math.max(1, size / 64) }).resize(size, size).png().toBuffer();

const ico = pngsToIco([await render(faviconSvg, 48), await render(faviconSvg, 32), await render(faviconSvg, 16)]);
write('app/favicon.ico', ico);
copy(src('rb-favicon.svg'), 'app/icon.svg');
write('app/icon.png', await render(faviconSvg, 512));
write('app/apple-icon.png', await render(fullBleed(0.78), 180));
write('public/icon-192.png', await render(faviconSvg, 192));
write('public/icon-512.png', await render(faviconSvg, 512));
write('public/icon-maskable-512.png', await render(fullBleed(0.8), 512));
copy(src('rb-mark.svg'), 'public/brand/rb-mark.svg');
write('public/brand/rb-logo-1024.png', await render(fullBleed(0.8), 1024));
console.log(`brand assets written under ${root}`);

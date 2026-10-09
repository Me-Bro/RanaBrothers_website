import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SCRIPT = fileURLToPath(new URL('../../scripts/brand-logo.mjs', import.meta.url));
const REPO = fileURLToPath(new URL('../../', import.meta.url));

test('builds the full logo as a vector SVG and two PNGs, with the wordmark visible', async () => {
  const out = mkdtempSync(join(tmpdir(), 'logo-'));
  try {
    const res = spawnSync(process.execPath, [SCRIPT, '--out', out], { cwd: REPO, encoding: 'utf8' });
    assert.equal(res.status, 0, res.stderr);

    const svg = readFileSync(join(out, 'public/brand/rb-logo-full.svg'), 'utf8');
    assert.match(svg, /<title id="rb-logo-title">Rana Brothers<\/title>/);
    assert.equal(svg.includes('<text'), false, 'text is outlined, so no font is needed');

    const transparent = await sharp(join(out, 'public/brand/rb-logo-full.png')).metadata();
    assert.equal(transparent.width, 2400);
    assert.equal(transparent.hasAlpha, true);

    // The right-hand side of the logo holds "Brothers" in gold: it must not be empty or cropped away.
    const { data, info } = await sharp(join(out, 'public/brand/rb-logo-full-on-dark.png')).raw().toBuffer({ resolveWithObject: true });
    let gold = 0;
    for (let y = 0; y < info.height; y++) {
      for (let x = Math.floor(info.width * 0.6); x < info.width; x++) {
        const i = (y * info.width + x) * info.channels;
        if (data[i] > 180 && data[i + 1] > 140 && data[i + 2] < 150) gold++;
      }
    }
    assert.ok(gold > 5000, `expected gold text on the right, found ${gold} px`);
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});

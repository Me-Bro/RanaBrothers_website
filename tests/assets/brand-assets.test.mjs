import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SCRIPT = fileURLToPath(new URL('../../scripts/brand-assets.mjs', import.meta.url));
const REPO = fileURLToPath(new URL('../../', import.meta.url));

test('generates every icon at the right size, with content and correct corners', async () => {
  const out = mkdtempSync(join(tmpdir(), 'assets-'));
  try {
    const res = spawnSync(process.execPath, [SCRIPT, '--out', out], { cwd: REPO, encoding: 'utf8' });
    assert.equal(res.status, 0, res.stderr);

    const expected = {
      'app/icon.png': 512,
      'app/apple-icon.png': 180,
      'public/icon-192.png': 192,
      'public/icon-512.png': 512,
      'public/icon-maskable-512.png': 512,
      'public/brand/rb-logo-1024.png': 1024,
    };
    for (const [rel, size] of Object.entries(expected)) {
      const file = join(out, rel);
      const meta = await sharp(file).metadata();
      assert.equal(meta.width, size, rel);
      assert.equal(meta.height, size, rel);
      const { channels } = await sharp(file).stats();
      assert.ok(channels.slice(0, 3).some((c) => c.stdev > 1), `${rel} is not blank`);
    }

    const corner = async (rel) =>
      (await sharp(join(out, rel)).ensureAlpha().extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer())[3];
    assert.equal(await corner('app/icon.png'), 0, 'rounded tile: transparent corner');
    assert.equal(await corner('app/apple-icon.png'), 255, 'apple icon is full-bleed');
    assert.equal(await corner('public/icon-maskable-512.png'), 255, 'maskable icon is full-bleed');

    const ico = readFileSync(join(out, 'app/favicon.ico'));
    assert.equal(ico.readUInt16LE(4), 3);
    assert.deepEqual([0, 1, 2].map((i) => ico.readUInt8(6 + i * 16)), [48, 32, 16]);

    for (const rel of ['app/icon.svg', 'public/brand/rb-mark.svg']) assert.ok(existsSync(join(out, rel)), rel);
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});

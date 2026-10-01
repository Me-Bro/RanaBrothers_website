import { test } from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { pngsToIco } from '../../scripts/lib/ico.mjs';

const png = (size) =>
  sharp({ create: { width: size, height: size, channels: 4, background: { r: 6, g: 6, b: 8, alpha: 1 } } }).png().toBuffer();

test('packs PNGs into an ICO directory in the given order', async () => {
  const images = [await png(48), await png(32), await png(16)];
  const ico = pngsToIco(images);
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);
  const sizes = [0, 1, 2].map((i) => ico.readUInt8(6 + i * 16));
  assert.deepEqual(sizes, [48, 32, 16]);
  for (let i = 0; i < 3; i++) {
    const entry = 6 + i * 16;
    const bytes = ico.readUInt32LE(entry + 8);
    const offset = ico.readUInt32LE(entry + 12);
    assert.equal(bytes, images[i].length);
    assert.deepEqual(ico.subarray(offset, offset + 8), images[i].subarray(0, 8));
  }
  assert.equal(ico.length, 6 + 3 * 16 + images.reduce((n, b) => n + b.length, 0));
});

test('encodes a 256 px image as 0 in the directory', async () => {
  const ico = pngsToIco([await png(256)]);
  assert.equal(ico.readUInt8(6), 0);
  assert.equal(ico.readUInt8(7), 0);
});

test('rejects non-PNG input', () => {
  assert.throws(() => pngsToIco([Buffer.from('not a png')]), /PNG/);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { flattenSegmentDirs } from '../../scripts/fix-segment-files.mjs';

function withOut(fn) {
  const dir = mkdtempSync(join(tmpdir(), 'rb-segments-'));
  try {
    fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function write(root, rel, text) {
  const file = join(root, ...rel.split('/'));
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, text);
}

test('flattens nested segment folders into the file names the client router requests', () => {
  withOut((out) => {
    write(out, 'guides/__next.guides/__PAGE__.txt', 'hub');
    write(out, 'guides/how-to-build-an-mvp/__next.guides/$d$slug/__PAGE__.txt', 'guide');

    assert.equal(flattenSegmentDirs(out), 2);

    assert.equal(readFileSync(join(out, 'guides', '__next.guides.__PAGE__.txt'), 'utf8'), 'hub');
    assert.equal(readFileSync(join(out, 'guides', 'how-to-build-an-mvp', '__next.guides.$d$slug.__PAGE__.txt'), 'utf8'), 'guide');
    assert.equal(existsSync(join(out, 'guides', '__next.guides')), false);
    assert.equal(existsSync(join(out, 'guides', 'how-to-build-an-mvp', '__next.guides')), false);
  });
});

test('leaves an already flat export untouched', () => {
  withOut((out) => {
    write(out, '__next.__PAGE__.txt', 'root');
    write(out, 'guides/__next.guides.__PAGE__.txt', 'hub');
    write(out, '_next/static/chunks/app.js', 'js');

    assert.equal(flattenSegmentDirs(out), 0);

    assert.equal(readFileSync(join(out, '__next.__PAGE__.txt'), 'utf8'), 'root');
    assert.equal(readFileSync(join(out, 'guides', '__next.guides.__PAGE__.txt'), 'utf8'), 'hub');
    assert.equal(readFileSync(join(out, '_next', 'static', 'chunks', 'app.js'), 'utf8'), 'js');
  });
});

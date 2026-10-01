import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkFiles, findTermHits, findVerifyMarkers } from '../../scripts/check-content.mjs';

const SCRIPT = fileURLToPath(new URL('../../scripts/check-content.mjs', import.meta.url));
const rules = {
  topics: { error: ['internship', 'interns'], warn: ['students'] },
  marketingWords: ['world-class', 'cutting-edge'],
  verifyMarker: 'VERIFY:',
};

test('flags off-limits topics as whole words in any case', () => {
  const hits = findTermHits('Join our Internship programme\nINTERNS welcome', ['internship', 'interns']);
  assert.deepEqual(hits, [
    { line: 1, term: 'internship' },
    { line: 2, term: 'interns' },
  ]);
});

test('ignores words that merely contain a topic', () => {
  assert.deepEqual(findTermHits('internal tools, international clients, the internet', ['internship', 'interns']), []);
});

test('matches multi-word and hyphenated phrases', () => {
  const hits = findTermHits('a world-class team\nWorld class work\ncutting edge AI', ['world-class', 'cutting-edge']);
  assert.deepEqual(hits.map((h) => h.line), [1, 2, 3]);
});

test('finds VERIFY markers with line numbers', () => {
  assert.deepEqual(findVerifyMarkers('a\n// VERIFY: price band\nb', 'VERIFY:'), [{ line: 2 }]);
});

test('checkFiles separates errors, warnings and verify markers', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cc-'));
  try {
    const a = join(dir, 'a.ts');
    const b = join(dir, 'b.ts');
    writeFileSync(a, "export const x = 'our internship';\n// VERIFY: confirm\n");
    writeFileSync(b, "export const y = 'world-class students';\n");
    const result = checkFiles([a, b], rules);
    assert.equal(result.errors.length, 1);
    assert.equal(result.errors[0].file, a);
    assert.equal(result.warnings.length, 2);
    assert.equal(result.verify.length, 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

function project(files) {
  const dir = mkdtempSync(join(tmpdir(), 'ccp-'));
  for (const [rel, body] of Object.entries(files)) {
    mkdirSync(join(dir, rel, '..'), { recursive: true });
    writeFileSync(join(dir, rel), body);
  }
  return dir;
}

const run = (cwd, args = [], env = {}) =>
  spawnSync(process.execPath, [SCRIPT, ...args], { cwd, encoding: 'utf8', env: { ...process.env, ALLOW_UNVERIFIED: '', ...env } });

test('CLI exits 1 on an off-limits topic', () => {
  const dir = project({ 'content/a.ts': "export const t = 'Internship';\n" });
  try {
    assert.equal(run(dir).status, 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('--strict fails on VERIFY markers unless ALLOW_UNVERIFIED=1', () => {
  const dir = project({ 'content/a.ts': "// VERIFY: confirm timeline\nexport const t = 'ok';\n" });
  try {
    assert.equal(run(dir).status, 0);
    assert.equal(run(dir, ['--strict']).status, 1);
    assert.equal(run(dir, ['--strict'], { ALLOW_UNVERIFIED: '1' }).status, 0);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('CLI passes on clean content', () => {
  const dir = project({ 'content/a.ts': "export const t = 'We build web apps.';\n" });
  try {
    const res = run(dir, ['--strict']);
    assert.equal(res.status, 0, res.stderr);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

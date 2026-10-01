import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { envWithPath } from './helpers.mjs';

const SCRIPT = fileURLToPath(new URL('../../scripts/setup-hooks.mjs', import.meta.url));

test('sets core.hooksPath to .githooks inside a git checkout', () => {
  const dir = mkdtempSync(join(tmpdir(), 'hooks-'));
  try {
    execFileSync('git', ['-c', 'init.defaultBranch=main', 'init', '-q'], { cwd: dir });
    const res = spawnSync(process.execPath, [SCRIPT], { cwd: dir, encoding: 'utf8' });
    assert.equal(res.status, 0, res.stderr);
    const value = execFileSync('git', ['config', 'core.hooksPath'], { cwd: dir, encoding: 'utf8' }).trim();
    assert.equal(value, '.githooks');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('does nothing outside a git checkout', () => {
  const dir = mkdtempSync(join(tmpdir(), 'nohooks-'));
  try {
    const res = spawnSync(process.execPath, [SCRIPT], { cwd: dir, encoding: 'utf8' });
    assert.equal(res.status, 0, res.stderr);
    assert.equal(res.stdout, '');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('warns instead of failing when git cannot be run', () => {
  const dir = mkdtempSync(join(tmpdir(), 'hooks-nogit-'));
  const emptyPath = mkdtempSync(join(tmpdir(), 'hooks-emptypath-'));
  try {
    mkdirSync(join(dir, '.git')); // looks like a checkout, but git is not on PATH
    const res = spawnSync(process.execPath, [SCRIPT], { cwd: dir, encoding: 'utf8', env: envWithPath(emptyPath) });
    assert.equal(res.status, 0, res.stderr);
    assert.match(res.stderr, /^warning: could not enable the git hooks/m);
    assert.equal(res.stderr.includes('    at '), false, 'no stack trace');
    assert.equal(res.stdout, '');
  } finally {
    rmSync(dir, { recursive: true, force: true });
    rmSync(emptyPath, { recursive: true, force: true });
  }
});

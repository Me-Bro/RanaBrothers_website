import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { denylistHashes } from '../../scripts/brand-guard.mjs';

const GUARD = fileURLToPath(new URL('../../scripts/brand-guard.mjs', import.meta.url));
const OK_EMAIL = 'ok@users.noreply.github.com';

function repo() {
  const dir = mkdtempSync(join(tmpdir(), 'bg-'));
  const cfg = join(dir, '..', `${dir.split(/[\\/]/).pop()}-cfg.json`);
  writeFileSync(cfg, JSON.stringify({ salt: 's', maxWords: 4, hashes: denylistHashes('Acme Widget Co', 's'), allowedAuthorEmails: [OK_EMAIL] }));
  const git = (...a) => execFileSync('git', a, { cwd: dir, encoding: 'utf8' });
  git('-c', 'init.defaultBranch=main', 'init', '-q');
  git('config', 'core.autocrlf', 'false');
  git('config', 'user.name', 'Ok');
  git('config', 'user.email', OK_EMAIL);
  git('config', 'commit.gpgsign', 'false');
  const commit = (file, body, msg, email = OK_EMAIL) => {
    writeFileSync(join(dir, file), body);
    git('add', file);
    git('-c', `user.email=${email}`, 'commit', '-q', '-m', msg);
  };
  const guard = (...a) => spawnSync(process.execPath, [GUARD, ...a], { cwd: dir, encoding: 'utf8', env: { ...process.env, BRAND_GUARD_CONFIG: cfg } });
  return { dir, cfg, git, commit, guard, done: () => { rmSync(dir, { recursive: true, force: true }); rmSync(cfg, { force: true }); } };
}

test('clean history passes', () => {
  const r = repo();
  try {
    r.commit('a.txt', 'We build web apps.\n', 'feat: add copy');
    const res = r.guard('commits', 'HEAD');
    assert.equal(res.status, 0, res.stderr);
  } finally { r.done(); }
});

test('blocks a leak even after a later commit deletes it', () => {
  const r = repo();
  try {
    r.commit('a.txt', 'line 1\nmade by Acme-Widget-Co\n', 'feat: copy');
    r.commit('a.txt', 'line 1\n', 'fix: remove');
    const res = r.guard('commits', 'HEAD');
    assert.equal(res.status, 1);
    assert.match(res.stderr, /a\.txt:2/);
    assert.equal(res.stderr.toLowerCase().includes('acme'), false, 'never prints the term');
  } finally { r.done(); }
});

test('blocks commit messages and non-allowlisted identities', () => {
  const r = repo();
  try {
    r.commit('b.txt', 'ok\n', 'chore: port from acmewidgetco site', 'someone@office.example');
    const res = r.guard('commits', 'HEAD');
    assert.equal(res.status, 1);
    assert.match(res.stderr, /identity not allowlisted/);
    assert.match(res.stderr, /commit message/);
  } finally { r.done(); }
});

test('staged mode scans the index, not the working tree', () => {
  const r = repo();
  try {
    r.commit('c.txt', 'ok\n', 'init');
    writeFileSync(join(r.dir, 'c.txt'), 'by Acme Widget Co\n');
    r.git('add', 'c.txt');
    writeFileSync(join(r.dir, 'c.txt'), 'clean again\n');
    const res = r.guard('staged');
    assert.equal(res.status, 1);
    assert.match(res.stderr, /c\.txt:1/);
  } finally { r.done(); }
});

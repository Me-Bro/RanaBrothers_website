// CLI integration tests: the guard is spawned as a real process against temp directories and temp git repos.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { denylistHashes } from '../../scripts/brand-guard.mjs';
import { OK_EMAIL, envWith } from './helpers.mjs';

const GUARD = fileURLToPath(new URL('../../scripts/brand-guard.mjs', import.meta.url));

function repo() {
  const dir = mkdtempSync(join(tmpdir(), 'bg-'));
  const cfg = join(dir, '..', `${dir.split(/[\\/]/).pop()}-cfg.json`);
  writeFileSync(cfg, JSON.stringify({ salt: 's', maxWords: 4, hashes: denylistHashes('Acme Widget Co', 's'), allowedAuthorEmails: [OK_EMAIL] }));
  const git = (...a) => execFileSync('git', a, { cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
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
  const guardWith = (env, ...a) => spawnSync(process.execPath, [GUARD, ...a], { cwd: dir, encoding: 'utf8', env: envWith({ BRAND_GUARD_CONFIG: cfg, ...env }) });
  const guard = (...a) => guardWith({}, ...a);
  return { dir, cfg, git, commit, guard, guardWith, done: () => { rmSync(dir, { recursive: true, force: true }); rmSync(cfg, { force: true }); } };
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

// --- Item 1: a reported path never contains a matched term -------------------------------------
const LEAKY_NAME = 'Acme-Widget-Co-logo.txt';

function assertNameRedacted(res) {
  assert.match(res.stderr, /\[file name\]/);
  assert.equal(res.stderr.toLowerCase().includes('acme'), false, 'the output must never contain the term, even inside a path');
}

test('files mode redacts a file name that contains a term', () => {
  const r = repo();
  try {
    writeFileSync(join(r.dir, LEAKY_NAME), 'logo\n');
    const res = r.guard('files', '.');
    assert.equal(res.status, 1);
    assertNameRedacted(res);
    assert.match(res.stderr, /\n {2}\*\*\* \[file name\] \[[0-9a-f]{8}\]\n/);
  } finally { r.done(); }
});

test('staged mode redacts a file name that contains a term', () => {
  const r = repo();
  try {
    writeFileSync(join(r.dir, LEAKY_NAME), 'logo\n');
    r.git('add', LEAKY_NAME);
    const res = r.guard('staged');
    assert.equal(res.status, 1);
    assertNameRedacted(res);
    assert.match(res.stderr, /\n {2}\*\*\* \[file name\] \[[0-9a-f]{8}\]\n/);
  } finally { r.done(); }
});

test('commits mode redacts a file name that contains a term', () => {
  const r = repo();
  try {
    r.commit(LEAKY_NAME, 'logo\n', 'feat: add logo');
    const res = r.guard('commits', 'HEAD');
    assert.equal(res.status, 1);
    assertNameRedacted(res);
    assert.match(res.stderr, /\n {2}[0-9a-f]{8} \*\*\* \[file name\] \[[0-9a-f]{8}\]\n/);
  } finally { r.done(); }
});

test('redacts only the path segments that contain a term, for content hits too', () => {
  const r = repo();
  try {
    mkdirSync(join(r.dir, 'Acme-Widget-Co'));
    writeFileSync(join(r.dir, 'Acme-Widget-Co', 'notes.txt'), 'line 1\nmade by Acme Widget Co\n');
    const res = r.guard('files', '.');
    assert.equal(res.status, 1);
    assertNameRedacted(res);
    assert.match(res.stderr, /\n {2}\*\*\*\/notes\.txt:2 \[[0-9a-f]{8}\]\n/);
    assert.match(res.stderr, /\n {2}\*\*\*\/notes\.txt \[file name\] \[[0-9a-f]{8}\]\n/);
  } finally { r.done(); }
});

// --- Item 2: no silent clean ---------------------------------------------------------------------
test('files mode: a clean directory exits 0 and says how many files it scanned', () => {
  const r = repo();
  try {
    writeFileSync(join(r.dir, 'a.txt'), 'We build web apps.\n');
    mkdirSync(join(r.dir, 'sub'));
    writeFileSync(join(r.dir, 'sub', 'b.txt'), 'Mobile apps too.\n');
    const res = r.guard('files', '.');
    assert.equal(res.status, 0, res.stderr);
    assert.match(res.stdout, /^brand-guard: clean \(files, 2 scanned\)$/m);
  } finally { r.done(); }
});

test('files mode: a hit exits 1 with path:line and a hash prefix', () => {
  const r = repo();
  try {
    writeFileSync(join(r.dir, 'a.txt'), 'line 1\nby Acme Widget Co\n');
    const res = r.guard('files', 'a.txt');
    assert.equal(res.status, 1);
    assert.match(res.stderr, /brand-guard: 1 problem\(s\)\n {2}a\.txt:2 \[[0-9a-f]{8}\]\n/);
  } finally { r.done(); }
});

test('files mode: a path that does not exist exits 2', () => {
  const r = repo();
  try {
    writeFileSync(join(r.dir, 'a.txt'), 'ok\n');
    const res = r.guard('files', 'a.txt', 'missing-dir');
    assert.equal(res.status, 2);
    assert.match(res.stderr, /^brand-guard: path not found$/m);
    assert.equal(res.stdout.includes('clean'), false);
  } finally { r.done(); }
});

test('files mode: explicit paths that yield no files exit 2', () => {
  const r = repo();
  try {
    mkdirSync(join(r.dir, 'empty'));
    const res = r.guard('files', 'empty');
    assert.equal(res.status, 2);
    assert.match(res.stderr, /^brand-guard: nothing to scan$/m);
  } finally { r.done(); }
});

test('files mode skips .git, node_modules, .next, coverage, playwright-report and test-results at any depth', () => {
  const r = repo();
  try {
    writeFileSync(join(r.dir, 'a.txt'), 'ok\n');
    for (const skipped of ['node_modules', '.next', 'coverage', 'playwright-report', 'test-results', join('deep', 'er', 'node_modules')]) {
      mkdirSync(join(r.dir, skipped), { recursive: true });
      writeFileSync(join(r.dir, skipped, 'leak.txt'), 'by Acme Widget Co\n');
    }
    const res = r.guard('files', '.');
    assert.equal(res.status, 0, res.stderr);
    assert.match(res.stdout, /clean \(files, 1 scanned\)/);
  } finally { r.done(); }
});

test('an invalid config exits 2 and names the offending field', () => {
  const r = repo();
  try {
    writeFileSync(join(r.dir, 'a.txt'), 'ok\n');
    const good = { salt: 's', maxWords: 4, hashes: denylistHashes('Acme Widget Co', 's'), allowedAuthorEmails: [OK_EMAIL] };
    const cases = [
      ['salt', { salt: '' }],
      ['maxWords', { maxWords: 9 }],
      ['hashes', { hashes: [] }],
      ['hashes', { hashes: ['not-hex'] }],
      ['allowedAuthorEmails', { allowedAuthorEmails: [] }],
    ];
    for (const [field, patch] of cases) {
      writeFileSync(r.cfg, JSON.stringify({ ...good, ...patch }));
      const res = r.guard('files', 'a.txt');
      assert.equal(res.status, 2, field);
      assert.match(res.stderr, new RegExp(`^brand-guard: invalid config \\(${field}\\)$`, 'm'));
    }
  } finally { r.done(); }
});

test('a config that is missing or not JSON exits 2', () => {
  const r = repo();
  try {
    writeFileSync(join(r.dir, 'a.txt'), 'ok\n');
    writeFileSync(r.cfg, '{ not json');
    let res = r.guard('files', 'a.txt');
    assert.equal(res.status, 2);
    assert.match(res.stderr, /invalid config \(json\)/);
    rmSync(r.cfg);
    res = r.guard('files', 'a.txt');
    assert.equal(res.status, 2);
    assert.match(res.stderr, /invalid config \(file\)/);
  } finally { r.done(); }
});

test('staged and commits modes report their scanned count too', () => {
  const r = repo();
  try {
    writeFileSync(join(r.dir, 'a.txt'), 'ok\n');
    r.git('add', 'a.txt');
    assert.match(r.guard('staged').stdout, /^brand-guard: clean \(staged, 1 scanned\)$/m);
    r.git('-c', `user.email=${OK_EMAIL}`, 'commit', '-q', '-m', 'init');
    assert.match(r.guard('commits', 'HEAD').stdout, /^brand-guard: clean \(commits, 1 scanned\)$/m);
  } finally { r.done(); }
});

test('an unknown mode or a failing git command exits 2 and never echoes its input', () => {
  const r = repo();
  try {
    r.commit('a.txt', 'ok\n', 'init');
    let res = r.guard('bogus-mode');
    assert.equal(res.status, 2);
    assert.match(res.stderr, /unknown mode/);
    assert.equal(res.stderr.includes('bogus-mode'), false);
    res = r.guard('commits', 'no-such-rev-acme');
    assert.equal(res.status, 2);
    assert.match(res.stderr, /^brand-guard: git log failed$/m);
    assert.equal(res.stderr.toLowerCase().includes('acme'), false);
    assert.equal(res.stderr.includes('    at '), false, 'no stack trace');
  } finally { r.done(); }
});

// --- Item 5: low-entropy terms are matched only through an optional local config -------------------
function writeLocalConfig(r, term, patch = {}) {
  const file = r.cfg.replace(/-cfg\.json$/, '-local.json');
  writeFileSync(file, JSON.stringify({ salt: 's', maxWords: 4, hashes: denylistHashes(term, 's'), allowedAuthorEmails: [OK_EMAIL], ...patch }));
  return file;
}

test('a short term is detected only when a local config provides it', () => {
  const r = repo();
  let local;
  try {
    local = writeLocalConfig(r, 'Acmo');
    writeFileSync(join(r.dir, 'a.txt'), 'made by Acmo\n');
    assert.equal(r.guard('files', 'a.txt').status, 0, 'the public denylist knows nothing about the short term');
    const res = r.guardWith({ BRAND_GUARD_LOCAL: local }, 'files', 'a.txt');
    assert.equal(res.status, 1);
    assert.match(res.stderr, /a\.txt:1 \[[0-9a-f]{8}\]/);
    assert.equal(res.stderr.toLowerCase().includes('acmo'), false);
  } finally {
    if (local) rmSync(local, { force: true });
    r.done();
  }
});

test('a local config that is invalid or missing stops the scan with exit 2', () => {
  const r = repo();
  let local;
  try {
    writeFileSync(join(r.dir, 'a.txt'), 'ok\n');
    local = writeLocalConfig(r, 'Acmo', { hashes: [] });
    let res = r.guardWith({ BRAND_GUARD_LOCAL: local }, 'files', 'a.txt');
    assert.equal(res.status, 2);
    assert.match(res.stderr, /^brand-guard: invalid config \(hashes\) \[local\]$/m);
    rmSync(local);
    res = r.guardWith({ BRAND_GUARD_LOCAL: local }, 'files', 'a.txt');
    assert.equal(res.status, 2);
    assert.match(res.stderr, /^brand-guard: invalid config \(file\) \[local\]$/m);
  } finally {
    if (local) rmSync(local, { force: true });
    r.done();
  }
});

test('without the private salt the guard refuses to scan, unless told to check identities only', () => {
  const r = repo();
  let local;
  try {
    writeFileSync(r.cfg, JSON.stringify({ maxWords: 4, hashes: denylistHashes('Acme Widget Co', 's'), allowedAuthorEmails: [OK_EMAIL] }));
    writeFileSync(join(r.dir, 'a.txt'), 'made by Acme Widget Co\n');
    let res = r.guard('files', 'a.txt');
    assert.equal(res.status, 2);
    assert.match(res.stderr, /^brand-guard: no private salt/m);
    res = r.guardWith({ BRAND_GUARD_ALLOW_NO_SALT: '1' }, 'files', 'a.txt');
    assert.equal(res.status, 0, res.stderr);
    assert.match(res.stderr, /terms are not checked/);
    assert.match(res.stdout, /no terms checked/);
    local = writeLocalConfig(r, 'Acmo');
    res = r.guardWith({ BRAND_GUARD_LOCAL: local }, 'files', 'a.txt');
    assert.equal(res.status, 1, 'the local config supplies the salt, so the public term is found again');
  } finally {
    if (local) rmSync(local, { force: true });
    r.done();
  }
});

// --- Item 6: smaller hardening ---------------------------------------------------------------------
test('markup files are also scanned as visible text; other files are not', () => {
  const r = repo();
  try {
    const spellings = ['Acme <b>Widget</b> Co', 'Acme&nbsp;Widget&nbsp;Co'];
    for (const ext of ['html', 'htm', 'xml', 'svg']) {
      for (const [i, body] of spellings.entries()) {
        const file = `page${i}.${ext}`;
        writeFileSync(join(r.dir, file), `<p>ok</p>\n${body}\n`);
        const res = r.guard('files', file);
        assert.equal(res.status, 1, `${file} should be flagged`);
        assert.match(res.stderr, new RegExp(`${file.replace('.', '\\.')}:2 \\[[0-9a-f]{8}\\]`));
        assert.equal(res.stderr.toLowerCase().includes('acme'), false);
      }
    }
    writeFileSync(join(r.dir, 'notes.txt'), 'Acme <b>Widget</b> Co\n');
    assert.equal(r.guard('files', 'notes.txt').status, 0, 'only markup files get the visible-text pass');
  } finally { r.done(); }
});

test('commits mode scans files that only a merge commit introduces', () => {
  const r = repo();
  try {
    r.commit('base.txt', 'base\n', 'init');
    r.git('checkout', '-q', '-b', 'side');
    r.commit('side.txt', 'side\n', 'feat: side');
    r.git('checkout', '-q', 'main');
    r.commit('main.txt', 'main\n', 'feat: main');
    r.git('merge', '-q', '--no-ff', '--no-commit', 'side');
    writeFileSync(join(r.dir, 'evil.txt'), 'by Acme Widget Co\n');
    r.git('add', 'evil.txt');
    r.git('-c', `user.email=${OK_EMAIL}`, 'commit', '-q', '-m', 'merge side');
    const res = r.guard('commits', 'HEAD');
    assert.equal(res.status, 1);
    assert.match(res.stderr, /evil\.txt:1 \[[0-9a-f]{8}\]/);
  } finally { r.done(); }
});

test('commits mode scans author and committer names without printing them', () => {
  const r = repo();
  try {
    writeFileSync(join(r.dir, 'a.txt'), 'ok\n');
    r.git('add', 'a.txt');
    const commit = spawnSync('git', ['commit', '-q', '-m', 'feat: copy'], { cwd: r.dir, encoding: 'utf8', env: envWith({ GIT_AUTHOR_NAME: 'Acme Widget Co' }) });
    assert.equal(commit.status, 0, commit.stderr);
    let res = r.guard('commits', 'HEAD');
    assert.equal(res.status, 1);
    assert.match(res.stderr, /\n {2}[0-9a-f]{8} author name \[denylisted term\]\n/);
    assert.equal(res.stderr.includes('committer name'), false);
    writeFileSync(join(r.dir, 'b.txt'), 'ok\n');
    r.git('add', 'b.txt');
    const second = spawnSync('git', ['commit', '-q', '-m', 'feat: more copy'], { cwd: r.dir, encoding: 'utf8', env: envWith({ GIT_COMMITTER_NAME: 'Acme Widget Co' }) });
    assert.equal(second.status, 0, second.stderr);
    res = r.guard('commits', 'HEAD~1..HEAD');
    assert.equal(res.status, 1);
    assert.match(res.stderr, /\n {2}[0-9a-f]{8} committer name \[denylisted term\]\n/);
    assert.equal(res.stderr.toLowerCase().includes('acme'), false);
  } finally { r.done(); }
});

test('message mode scans a commit message file', () => {
  const r = repo();
  try {
    const file = join(r.dir, 'MSG');
    writeFileSync(file, 'feat: add copy\n\nport from acmewidgetco site\n');
    let res = r.guard('message', file);
    assert.equal(res.status, 1);
    assert.match(res.stderr, /^ {2}commit message:3 \[[0-9a-f]{8}\]$/m);
    assert.equal(res.stderr.toLowerCase().includes('acme'), false);
    writeFileSync(file, 'feat: add copy\n');
    res = r.guard('message', file);
    assert.equal(res.status, 0, res.stderr);
    assert.match(res.stdout, /^brand-guard: clean \(message, 1 scanned\)$/m);
    assert.equal(r.guard('message').status, 2, 'no file given');
    res = r.guard('message', join(r.dir, 'missing'));
    assert.equal(res.status, 2);
    assert.match(res.stderr, /^brand-guard: path not found$/m);
  } finally { r.done(); }
});

// --- Item 4: the text mode scans plain strings such as ref names -----------------------------------
test('text mode scans its arguments and reports only their position, never the text', () => {
  const r = repo();
  try {
    let res = r.guard('text', 'refs/heads/main', 'refs/heads/feat/new-section');
    assert.equal(res.status, 0, res.stderr);
    assert.match(res.stdout, /^brand-guard: clean \(text, 2 scanned\)$/m);
    res = r.guard('text', 'refs/heads/main', 'refs/heads/acme-widget-co-port');
    assert.equal(res.status, 1);
    assert.match(res.stderr, /^ {2}argument 2 \[[0-9a-f]{8}\]$/m);
    assert.equal(res.stderr.toLowerCase().includes('acme'), false);
    res = r.guard('text');
    assert.equal(res.status, 2);
    assert.match(res.stderr, /^brand-guard: nothing to scan$/m);
  } finally { r.done(); }
});

test('still runs when started through a symlink or junction (main-module detection)', (t) => {
  const r = repo();
  const base = mkdtempSync(join(tmpdir(), 'bg-link-'));
  const link = join(base, 'link');
  try {
    // A copy of the guard, so nothing real is ever reachable through the link.
    mkdirSync(join(base, 'real'));
    copyFileSync(GUARD, join(base, 'real', 'brand-guard.mjs'));
    try {
      symlinkSync(join(base, 'real'), link, 'junction');
    } catch {
      t.skip('this environment cannot create symlinks or junctions');
      return;
    }
    writeFileSync(join(r.dir, 'a.txt'), 'by Acme Widget Co\n');
    const res = spawnSync(process.execPath, [join(link, 'brand-guard.mjs'), 'files', 'a.txt'], { cwd: r.dir, encoding: 'utf8', env: envWith({ BRAND_GUARD_CONFIG: r.cfg }) });
    assert.equal(res.status, 1, `expected the guard to run and report the hit, got: ${res.stdout}${res.stderr}`);
    assert.match(res.stderr, /a\.txt:1 \[[0-9a-f]{8}\]/);
  } finally {
    try { unlinkSync(link); } catch { /* not created, or already gone */ }
    rmSync(base, { recursive: true, force: true });
    r.done();
  }
});

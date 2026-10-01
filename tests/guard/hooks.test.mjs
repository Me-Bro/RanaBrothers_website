// Exercises the real .githooks scripts through real git commands: temp repos, with a local bare repo as the remote.
// core.hooksPath points at this repo's .githooks and BRAND_GUARD_CONFIG at a synthetic denylist, so the
// hooks run from a different working directory than the repo root and only synthetic terms are involved.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { denylistHashes } from '../../scripts/brand-guard.mjs';
import { OK_EMAIL, envWith } from './helpers.mjs';

const HOOKS = fileURLToPath(new URL('../../.githooks', import.meta.url)).replace(/\\/g, '/');
const WEB_FLOW_EMAIL = 'noreply@github.com';

function world() {
  const root = mkdtempSync(join(tmpdir(), 'bg-hooks-'));
  const cfg = join(root, 'cfg.json');
  writeFileSync(cfg, JSON.stringify({ salt: 's', maxWords: 4, hashes: denylistHashes('Acme Widget Co', 's'), allowedAuthorEmails: [OK_EMAIL, WEB_FLOW_EMAIL] }));
  const remote = join(root, 'remote.git');
  const work = join(root, 'work');
  mkdirSync(remote);
  mkdirSync(work);
  const env = envWith({ BRAND_GUARD_CONFIG: cfg });
  const run = (cwd, args, extraEnv = {}) => spawnSync('git', args, { cwd, encoding: 'utf8', env: { ...env, ...extraEnv } });
  const must = (res) => {
    assert.equal(res.status, 0, `${res.stdout}${res.stderr}`);
    return res;
  };
  const configure = (cwd) => {
    for (const [key, value] of [['core.autocrlf', 'false'], ['user.name', 'Ok'], ['user.email', OK_EMAIL], ['commit.gpgsign', 'false']]) must(run(cwd, ['config', key, value]));
  };
  const git = (...args) => run(work, args);
  must(run(remote, ['-c', 'init.defaultBranch=main', 'init', '-q', '--bare']));
  must(git('-c', 'init.defaultBranch=main', 'init', '-q'));
  configure(work);
  must(git('remote', 'add', 'origin', remote));
  return {
    root,
    work,
    git,
    must,
    run,
    configure,
    remote,
    /** Writes, stages and commits one file; returns the git result (it may be blocked by a hook). */
    commit(file, body, message, extraEnv = {}) {
      writeFileSync(join(work, file), body);
      must(git('add', file));
      return run(work, ['commit', '-q', '-m', message], extraEnv);
    },
    hooksOn: () => must(git('config', 'core.hooksPath', HOOKS)),
    remoteRefs: () => must(run(remote, ['for-each-ref', '--format=%(refname)'])).stdout.split('\n').filter(Boolean).sort(),
    done: () => rmSync(root, { recursive: true, force: true }),
  };
}

test('pre-commit blocks a staged leak and lets clean content through', () => {
  const w = world();
  try {
    w.hooksOn();
    let res = w.commit('a.txt', 'line 1\nby Acme Widget Co\n', 'feat: add copy');
    assert.notEqual(res.status, 0, 'the commit must be blocked');
    assert.match(res.stderr, /brand-guard: 1 problem\(s\)\n {2}a\.txt:2 \[[0-9a-f]{8}\]/);
    assert.notEqual(w.git('rev-parse', '--verify', '-q', 'HEAD').status, 0, 'no commit was created');
    res = w.commit('a.txt', 'We build web apps.\n', 'feat: add copy');
    assert.equal(res.status, 0, `${res.stdout}${res.stderr}`);
    assert.match(res.stdout + res.stderr, /brand-guard: clean \(staged, 1 scanned\)/);
  } finally { w.done(); }
});

test('commit-msg blocks a leak in the message and lets a clean message through', () => {
  const w = world();
  try {
    w.hooksOn();
    writeFileSync(join(w.work, 'a.txt'), 'We build web apps.\n');
    w.must(w.git('add', 'a.txt'));
    let res = w.run(w.work, ['commit', '-q', '-m', 'chore: port from acmewidgetco site']);
    assert.notEqual(res.status, 0, 'the commit must be blocked');
    assert.match(res.stderr, /commit message:1 \[[0-9a-f]{8}\]/);
    assert.equal(res.stderr.toLowerCase().includes('acme'), false, 'never prints the term');
    assert.notEqual(w.git('rev-parse', '--verify', '-q', 'HEAD').status, 0, 'no commit was created');
    res = w.run(w.work, ['commit', '-q', '-m', 'feat: add copy']);
    assert.equal(res.status, 0, `${res.stdout}${res.stderr}`);
  } finally { w.done(); }
});

test('every hook is committed as an executable file (a hook without the bit silently never runs)', (t) => {
  const repoRoot = fileURLToPath(new URL('../..', import.meta.url));
  const listed = spawnSync('git', ['ls-files', '-s', '--', '.githooks'], { cwd: repoRoot, encoding: 'utf8' });
  if (listed.status !== 0) {
    t.skip('not a git checkout');
    return;
  }
  const modes = new Map(listed.stdout.split('\n').filter(Boolean).map((line) => {
    const [mode, , , file] = line.split(/[ \t]/);
    return [file, mode];
  }));
  for (const hook of ['commit-msg', 'pre-commit', 'pre-push']) {
    assert.equal(modes.get(`.githooks/${hook}`), '100755', `${hook} must be committed with mode 100755`);
  }
});

test('pre-push blocks a pushed leak and nothing reaches the remote', () => {
  const w = world();
  try {
    w.commit('a.txt', 'line 1\nmade by Acme-Widget-Co\n', 'feat: copy');
    w.hooksOn();
    const res = w.git('push', 'origin', 'main');
    assert.notEqual(res.status, 0, 'the push must be blocked');
    assert.match(res.stderr, /a\.txt:2 \[[0-9a-f]{8}\]/);
    assert.equal(res.stderr.toLowerCase().includes('acme'), false, 'never prints the term');
    assert.deepEqual(w.remoteRefs(), []);
  } finally { w.done(); }
});

test('pre-push lets a clean push and a branch deletion through', () => {
  const w = world();
  try {
    w.commit('a.txt', 'We build web apps.\n', 'feat: add copy');
    w.hooksOn();
    w.must(w.git('push', 'origin', 'main'));
    w.must(w.git('push', 'origin', 'main:topic'));
    assert.deepEqual(w.remoteRefs(), ['refs/heads/main', 'refs/heads/topic']);
    w.must(w.git('push', 'origin', '--delete', 'topic'));
    assert.deepEqual(w.remoteRefs(), ['refs/heads/main']);
  } finally { w.done(); }
});

test('pre-push does not rescan commits that the target remote already has', () => {
  const w = world();
  try {
    w.commit('a.txt', 'by Acme Widget Co\n', 'feat: an old leak that is already public');
    w.must(w.git('push', 'origin', 'main')); // hooks are still off: this models history that is already out there
    w.must(w.git('checkout', '-q', '-b', 'topic'));
    w.commit('b.txt', 'We build web apps.\n', 'feat: more copy');
    w.hooksOn();
    w.must(w.git('push', 'origin', 'topic'));
    assert.deepEqual(w.remoteRefs(), ['refs/heads/main', 'refs/heads/topic']);
  } finally { w.done(); }
});

test("a leak that exists only under another remote's tracking ref is still blocked", () => {
  const w = world();
  try {
    w.commit('a.txt', 'We build web apps.\n', 'feat: base');
    w.must(w.git('push', 'origin', 'main'));
    w.must(w.git('checkout', '-q', '-b', 'topic'));
    w.commit('b.txt', 'made by Acme Widget Co\n', 'feat: leak');
    const leak = w.must(w.git('rev-parse', 'HEAD')).stdout.trim();
    w.must(w.git('update-ref', 'refs/remotes/other/topic', leak)); // another remote "already has" the leak
    w.hooksOn();
    const res = w.git('push', 'origin', 'topic');
    assert.notEqual(res.status, 0, 'a different remote must not hide the leak from the scan');
    assert.match(res.stderr, /b\.txt:1 \[[0-9a-f]{8}\]/);
    assert.deepEqual(w.remoteRefs(), ['refs/heads/main']);
  } finally { w.done(); }
});

test('a commit made by the GitHub web-flow identity passes the identity check', () => {
  const w = world();
  try {
    w.commit('a.txt', 'We build web apps.\n', 'feat: squash merge', { GIT_COMMITTER_NAME: 'GitHub', GIT_COMMITTER_EMAIL: WEB_FLOW_EMAIL });
    w.hooksOn();
    w.must(w.git('push', 'origin', 'main'));
    assert.deepEqual(w.remoteRefs(), ['refs/heads/main']);
  } finally { w.done(); }
});

test('a committer outside the allowlist is blocked', () => {
  const w = world();
  try {
    w.commit('a.txt', 'We build web apps.\n', 'feat: copy', { GIT_COMMITTER_NAME: 'Someone', GIT_COMMITTER_EMAIL: 'someone@office.example' });
    w.hooksOn();
    const res = w.git('push', 'origin', 'main');
    assert.notEqual(res.status, 0);
    assert.match(res.stderr, /identity not allowlisted/);
    assert.deepEqual(w.remoteRefs(), []);
  } finally { w.done(); }
});

test('pre-push blocks a branch whose local or remote name contains a term', () => {
  const w = world();
  try {
    w.commit('a.txt', 'We build web apps.\n', 'feat: copy');
    w.must(w.git('checkout', '-q', '-b', 'acme-widget-co-port'));
    w.hooksOn();
    let res = w.git('push', 'origin', 'acme-widget-co-port');
    assert.notEqual(res.status, 0, 'a local ref name with a term must be blocked');
    assert.match(res.stderr, /argument 1 \[[0-9a-f]{8}\]/);
    res = w.git('push', 'origin', 'main:acme-widget-co-port');
    assert.notEqual(res.status, 0, 'a remote ref name with a term must be blocked');
    assert.match(res.stderr, /argument 2 \[[0-9a-f]{8}\]/);
    assert.deepEqual(w.remoteRefs(), []);
  } finally { w.done(); }
});

test('pre-push still scans when the old remote tip is not known locally (forced update)', () => {
  const w = world();
  try {
    w.commit('a.txt', 'We build web apps.\n', 'feat: base');
    w.must(w.git('push', 'origin', 'main'));
    // Somebody else moves main on the remote; this clone never fetches that commit.
    const other = join(w.root, 'other');
    w.must(w.run(w.root, ['clone', '-q', w.remote, other]));
    w.configure(other);
    writeFileSync(join(other, 'theirs.txt'), 'their work\n');
    w.must(w.run(other, ['add', 'theirs.txt']));
    w.must(w.run(other, ['commit', '-q', '-m', 'feat: their work']));
    w.must(w.run(other, ['push', '-q', 'origin', 'main']));
    // A diverging local commit that leaks, force-pushed over it.
    w.commit('b.txt', 'by Acme Widget Co\n', 'feat: leak');
    w.hooksOn();
    let res = w.git('push', '--force', 'origin', 'main');
    assert.notEqual(res.status, 0, 'the forced push of a leak must be blocked');
    assert.match(res.stderr, /b\.txt:1 \[[0-9a-f]{8}\]/);
    // The same forced update with clean content goes through.
    writeFileSync(join(w.work, 'b.txt'), 'We build web apps.\n');
    w.must(w.git('add', 'b.txt'));
    w.must(w.git('commit', '-q', '--amend', '--no-edit'));
    res = w.git('push', '--force', 'origin', 'main');
    assert.equal(res.status, 0, `${res.stdout}${res.stderr}`);
  } finally { w.done(); }
});

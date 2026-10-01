#!/usr/bin/env node
// Brand guard: blocks denylisted terms in file contents, file names, commit messages,
// and commits authored by non-allowlisted identities. Terms are stored only as salted
// SHA-256 hashes (brand-guard.denylist.json), so this repository never contains them.
// Hits are reported as path:line + hash prefix, never as the matched text (CI logs are public).
//
//   node scripts/brand-guard.mjs files [path...]   scan files/dirs (default: git ls-files)
//   node scripts/brand-guard.mjs staged            scan the git index (pre-commit)
//   node scripts/brand-guard.mjs commits <range>   scan messages + identities (pre-push)
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKIP_DIRS = new Set(['.git', 'node_modules', '.next', 'coverage', 'playwright-report', 'test-results']);
const BINARY_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.otf', '.pdf', '.mp4', '.webm', '.glb', '.zip']);

export function tokenize(text) {
  return text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

export function hashTerm(term, salt) {
  return createHash('sha256').update(salt + term).digest('hex').slice(0, 24);
}

/** Spaced and joined forms of every 1..maxWords token window. */
export function candidates(tokens, maxWords) {
  const out = new Set();
  for (let i = 0; i < tokens.length; i++) {
    for (let n = 1; n <= maxWords && i + n <= tokens.length; n++) {
      const win = tokens.slice(i, i + n);
      out.add(win.join(' '));
      if (n > 1) out.add(win.join(''));
    }
  }
  return out;
}

/** Hashes every denylist form the scanner can produce for a term. */
export function denylistHashes(term, salt) {
  const tokens = tokenize(term);
  return [...new Set([tokens.join(' '), tokens.join('')])].map((t) => hashTerm(t, salt));
}

/** Returns one { line, hash } per line of `text` that contains a denylisted term. */
export function findHits(text, { hashes, salt, maxWords }) {
  const hits = [];
  text.split(/\r?\n/).forEach((lineText, idx) => {
    for (const c of candidates(tokenize(lineText), maxWords)) {
      const h = hashTerm(c, salt);
      if (hashes.has(h)) {
        hits.push({ line: idx + 1, hash: h.slice(0, 8) });
        return;
      }
    }
  });
  return hits;
}

/** Printable ASCII runs (>= 4 chars) from binary data, one per line. */
export function binaryStrings(buf) {
  return (buf.toString('latin1').match(/[\x20-\x7e]{4,}/g) || []).join('\n');
}

/** A problem the guard can explain without a stack trace (bad config, bad path, git failure). */
export class GuardError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GuardError';
  }
}

const HEX24 = /^[0-9a-f]{24}$/;
const DEFAULT_CONFIG = fileURLToPath(new URL('./brand-guard.denylist.json', import.meta.url));
// <repo root>/../_private/brand-guard.local.json: low-entropy terms that must never be committed.
const DEFAULT_LOCAL_CONFIG = fileURLToPath(new URL('../../_private/brand-guard.local.json', import.meta.url));

/** Reads and validates one config file; anything invalid throws `invalid config (<field>)`. */
function readConfig(file, role = '') {
  const invalid = (field) => new GuardError(`invalid config (${field})${role ? ` [${role}]` : ''}`);
  let raw;
  try {
    raw = JSON.parse(readFileSync(file, 'utf8'));
  } catch (err) {
    throw invalid(err instanceof SyntaxError ? 'json' : 'file');
  }
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) throw invalid('root');
  if (typeof raw.salt !== 'string' || raw.salt === '') throw invalid('salt');
  if (!Number.isInteger(raw.maxWords) || raw.maxWords < 1 || raw.maxWords > 8) throw invalid('maxWords');
  if (!Array.isArray(raw.hashes) || raw.hashes.length === 0 || !raw.hashes.every((h) => typeof h === 'string' && HEX24.test(h))) throw invalid('hashes');
  const emails = raw.allowedAuthorEmails;
  if (!Array.isArray(emails) || emails.length === 0 || !emails.every((e) => typeof e === 'string' && e !== '')) throw invalid('allowedAuthorEmails');
  return { salt: raw.salt, maxWords: raw.maxWords, hashes: new Set(raw.hashes), allowedEmails: new Set(emails.map((e) => e.toLowerCase())) };
}

/**
 * Loads the public denylist and merges the optional local one (same format, same salt).
 * The local file is `local` if given, else $BRAND_GUARD_LOCAL (must exist), else the default
 * location when it exists. An explicit `file` or $BRAND_GUARD_CONFIG (tests) skips that default lookup.
 */
export function loadConfig(file, local) {
  const explicit = file !== undefined || Boolean(process.env.BRAND_GUARD_CONFIG);
  const cfg = readConfig(file ?? (process.env.BRAND_GUARD_CONFIG || DEFAULT_CONFIG));
  let localFile = local;
  if (localFile === undefined) {
    if (process.env.BRAND_GUARD_LOCAL) localFile = process.env.BRAND_GUARD_LOCAL;
    else if (!explicit && existsSync(DEFAULT_LOCAL_CONFIG)) localFile = DEFAULT_LOCAL_CONFIG;
  }
  if (!localFile) return cfg;
  const extra = readConfig(localFile, 'local');
  if (extra.salt !== cfg.salt) throw new GuardError('invalid config (salt) [local]');
  return {
    salt: cfg.salt,
    maxWords: Math.max(cfg.maxWords, extra.maxWords),
    hashes: new Set([...cfg.hashes, ...extra.hashes]),
    allowedEmails: new Set([...cfg.allowedEmails, ...extra.allowedEmails]),
  };
}

/** Printable form of a path: every `/`-separated segment that contains a hit becomes `***`. */
export function redactPath(path, cfg) {
  const segments = path.replace(/\\/g, '/').split('/');
  let shown = segments.map((s) => (findHits(s, cfg).length ? '***' : s));
  // A term split across segments (dir/dir/file) only shows up in the joined path: hide everything.
  if (findHits(shown.join('/'), cfg).length) shown = segments.map(() => '***');
  return shown.join('/');
}

function walk(path, acc) {
  const st = statSync(path);
  if (st.isDirectory()) {
    for (const name of readdirSync(path)) if (!SKIP_DIRS.has(name)) walk(join(path, name), acc);
  } else acc.push(path);
  return acc;
}

function scanBuffer(label, buf, cfg) {
  const shown = redactPath(label, cfg);
  const text = BINARY_EXT.has(extname(label).toLowerCase()) ? binaryStrings(buf) : buf.toString('utf8');
  const hits = findHits(text, cfg).map((h) => `${shown}:${h.line} [${h.hash}]`);
  const nameHits = findHits(label, cfg);
  if (nameHits.length) hits.push(`${shown} [file name] [${nameHits[0].hash}]`);
  return hits;
}

const GIT_IO = { maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] };

/** Runs git. A failure reports only the subcommand: git's own message can echo ref or path names. */
function git(...args) {
  try {
    return execFileSync('git', args, { ...GIT_IO, encoding: 'utf8' });
  } catch {
    throw new GuardError(`git ${args[0]} failed`);
  }
}

function gitBlob(spec) {
  try {
    return execFileSync('git', ['show', spec], GIT_IO);
  } catch {
    throw new GuardError('git show failed');
  }
}

const isFile = (p) => {
  try {
    return statSync(p).isFile();
  } catch {
    return false;
  }
};

/** Returns the exit code: 0 clean, 1 problems found. Anything that stops it from scanning throws a GuardError (exit 2). */
function main([mode = 'files', ...args]) {
  const cfg = loadConfig();
  const problems = [];
  let scanned = 0;
  if (mode === 'files') {
    let paths;
    if (args.length) {
      const missing = args.filter((p) => !existsSync(p));
      if (missing.length) throw new GuardError(`path not found\n  ${missing.map((p) => redactPath(p, cfg)).join('\n  ')}`);
      paths = args.flatMap((p) => walk(p, []));
    } else {
      // Tracked files that were deleted from the working tree (or are submodules) are not there to scan.
      paths = git('ls-files', '-z').split('\0').filter(Boolean).filter(isFile);
    }
    if (!paths.length) throw new GuardError('nothing to scan');
    for (const p of paths) problems.push(...scanBuffer(p, readFileSync(p), cfg));
    scanned = paths.length;
  } else if (mode === 'staged') {
    const staged = git('diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z').split('\0').filter(Boolean);
    for (const p of staged) problems.push(...scanBuffer(p, gitBlob(`:${p}`), cfg));
    scanned = staged.length;
  } else if (mode === 'commits') {
    // Every pushed commit: identities, message, and every blob it adds or changes
    // (a leak removed in a later commit would still be public in history).
    const log = git('log', '--format=%H%x00%ae%x00%ce%x00%B%x1e', ...(args.length ? args : ['HEAD']));
    const records = log.split('\x1e').map((r) => r.trim()).filter(Boolean);
    for (const rec of records) {
      const [sha, author, committer, body] = rec.split('\0');
      const short = sha.slice(0, 8);
      for (const email of [author, committer]) {
        if (!cfg.allowedEmails.has(email.toLowerCase())) problems.push(`${short} identity not allowlisted (set repo-local user.email)`);
      }
      if (findHits(body, cfg).length) problems.push(`${short} commit message [denylisted term]`);
      const changed = git('diff-tree', '--root', '--no-commit-id', '--name-only', '-r', '--diff-filter=ACMR', '-z', sha).split('\0').filter(Boolean);
      for (const p of changed) {
        problems.push(...scanBuffer(p, gitBlob(`${sha}:${p}`), cfg).map((h) => `${short} ${h}`));
      }
    }
    scanned = records.length;
  } else {
    throw new GuardError('unknown mode (expected files, staged or commits)');
  }
  const unique = [...new Set(problems)];
  if (unique.length) {
    console.error(`brand-guard: ${unique.length} problem(s)\n  ${unique.join('\n  ')}`);
    return 1;
  }
  console.log(`brand-guard: clean (${mode}, ${scanned} scanned)`);
  return 0;
}

/** True when this file is the script node was started with (symlinks resolved; case-insensitive on Windows). */
function isMainModule() {
  if (!process.argv[1]) return false;
  try {
    const started = realpathSync(process.argv[1]);
    const here = realpathSync(fileURLToPath(import.meta.url));
    return process.platform === 'win32' ? started.toLowerCase() === here.toLowerCase() : started === here;
  } catch {
    return false;
  }
}

if (isMainModule()) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (err) {
    console.error(err instanceof GuardError ? `brand-guard: ${err.message}` : `brand-guard: internal error (${err?.code ?? err?.name ?? 'unknown'})`);
    process.exitCode = 2;
  }
}

#!/usr/bin/env node
// Brand guard: blocks denylisted terms in file contents, file names, commit messages, ref names and
// commit identities (non-allowlisted emails; author and committer names). Terms are stored only as
// salted SHA-256 hashes, so this repository never contains them:
//   scripts/brand-guard.denylist.json              committed: terms whose joined form is >= 12 characters with a letter
//   ../_private/brand-guard.local.json (optional)  never committed: digits-only and short terms, whose hashes could be
//                                                  brute-forced from a public file. $BRAND_GUARD_LOCAL overrides the path.
// Hits are reported as <path>:<line> [hash prefix], never as the matched text (CI logs are public);
// every path segment that contains a hit is printed as ***.
//
//   node scripts/brand-guard.mjs files [path...]    scan files/dirs (default: git ls-files)
//   node scripts/brand-guard.mjs staged             scan the git index (pre-commit)
//   node scripts/brand-guard.mjs commits <range>    scan every commit's message, identities, names and blobs (pre-push)
//   node scripts/brand-guard.mjs message <file>     scan a commit message file (commit-msg)
//   node scripts/brand-guard.mjs text <string...>   scan strings, such as the ref names of a push (pre-push)
//
// Exit codes: 0 clean; 1 problems found; 2 the scan could not run (invalid config, missing path, nothing to scan,
// git failure). A scan that could not run is never reported as clean.
//
// Matching: text is cut into lowercase [a-z0-9] tokens, and every window of up to maxWords consecutive tokens is
// checked in its spaced and its joined form, so "Acme Widget", "acme-widget" and "AcmeWidget" are all found.
// Windows may span line breaks; a hit is reported on the line of the window's first token, once per line.
//
// Scope:
//   - `files <dir>` skips .git, node_modules, .next, coverage, playwright-report and test-results at any depth.
//   - Binary files (images, fonts, ...) are scanned for printable ASCII runs of 4+ characters only.
//   - .html, .htm, .xml and .svg files get a second pass over their visible text (tags and comments removed,
//     entities decoded), so "Acme <b>Widget</b>" and "Acme&nbsp;Widget" are caught as well.
//   - Only ASCII letters and digits are matched; look-alike characters and other scripts are not normalised.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKIP_DIRS = new Set(['.git', 'node_modules', '.next', 'coverage', 'playwright-report', 'test-results']);
const BINARY_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.otf', '.pdf', '.mp4', '.webm', '.glb', '.zip']);
const MARKUP_EXT = new Set(['.html', '.htm', '.xml', '.svg']);

export function tokenize(text) {
  return text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

export function hashTerm(term, salt) {
  return createHash('sha256').update(salt + term).digest('hex').slice(0, 24);
}

/** Lowercase tokens (as in `tokenize`) with the 1-based line each one starts on. */
function tokenizeLines(text) {
  const lower = text.toLowerCase();
  const tokens = [];
  const lines = [];
  const word = /[a-z0-9]+/g;
  let line = 1;
  let counted = 0;
  for (let m = word.exec(lower); m; m = word.exec(lower)) {
    for (; counted < m.index; counted++) if (lower.charCodeAt(counted) === 10) line++;
    tokens.push(m[0]);
    lines.push(line);
  }
  return { tokens, lines };
}

/** Spaced and joined forms of every 1..maxWords token window that starts in [from, to). */
export function candidates(tokens, maxWords, from = 0, to = tokens.length) {
  const out = new Set();
  for (let i = from; i < to; i++) {
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

/** Returns one { line, hash } per line (of a window's first token) that contains a denylisted term. */
export function findHits(text, { hashes, salt, maxWords }) {
  const { tokens, lines } = tokenizeLines(text);
  const hits = [];
  let lastHitLine = 0;
  for (let i = 0; i < tokens.length; i++) {
    if (lines[i] === lastHitLine) continue;
    for (const c of candidates(tokens, maxWords, i, i + 1)) {
      const h = hashTerm(c, salt);
      if (hashes.has(h)) {
        hits.push({ line: lines[i], hash: h.slice(0, 8) });
        lastHitLine = lines[i];
        break;
      }
    }
  }
  return hits;
}

/** Printable ASCII runs (>= 4 chars) from binary data, one per line. */
export function binaryStrings(buf) {
  return (buf.toString('latin1').match(/[\x20-\x7e]{4,}/g) || []).join('\n');
}

const ENTITIES = new Map([['nbsp', ' '], ['amp', '&'], ['lt', '<'], ['gt', '>'], ['quot', '"'], ['apos', "'"]]);
const keepLineBreaks = (s) => s.replace(/[^\n]/g, '');

function decodeEntity(whole, body) {
  if (body[0] !== '#') return ENTITIES.get(body.toLowerCase()) ?? whole;
  const code = body[1] === 'x' || body[1] === 'X' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
  if (code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)) return whole;
  const ch = String.fromCodePoint(code);
  return ch === '\n' || ch === '\r' ? ' ' : ch; // decoding must never change the line count
}

/** Visible text of markup: CDATA unwrapped, comments and tags dropped (line breaks kept), entities decoded. */
export function visibleText(markup) {
  return markup
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<!--[\s\S]*?-->/g, keepLineBreaks)
    .replace(/<[^>]*>/g, keepLineBreaks)
    .replace(/&(#[xX][0-9a-fA-F]+|#[0-9]+|[a-zA-Z][a-zA-Z0-9]*);/g, decodeEntity);
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
  const ext = extname(label).toLowerCase();
  const text = BINARY_EXT.has(ext) ? binaryStrings(buf) : buf.toString('utf8');
  const hits = findHits(text, cfg).map((h) => `${shown}:${h.line} [${h.hash}]`);
  if (MARKUP_EXT.has(ext)) hits.push(...findHits(visibleText(text), cfg).map((h) => `${shown}:${h.line} [${h.hash}]`));
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
    // Every pushed commit: identities, names, message, and every blob it adds or changes
    // (a leak removed in a later commit would still be public in history).
    const log = git('log', '--format=%H%x00%ae%x00%ce%x00%an%x00%cn%x00%B%x1e', ...(args.length ? args : ['HEAD']));
    const records = log.split('\x1e').map((r) => r.trim()).filter(Boolean);
    for (const rec of records) {
      const [sha, author, committer, authorName, committerName, body] = rec.split('\0');
      const short = sha.slice(0, 8);
      for (const email of [author, committer]) {
        if (!cfg.allowedEmails.has(email.toLowerCase())) problems.push(`${short} identity not allowlisted (set repo-local user.email)`);
      }
      if (findHits(authorName, cfg).length) problems.push(`${short} author name [denylisted term]`);
      if (findHits(committerName, cfg).length) problems.push(`${short} committer name [denylisted term]`);
      if (findHits(body, cfg).length) problems.push(`${short} commit message [denylisted term]`);
      // -m: a merge commit is diffed against each parent, so files that only the merge introduces are scanned too.
      const changed = [...new Set(git('diff-tree', '-m', '--root', '--no-commit-id', '--name-only', '-r', '--diff-filter=ACMR', '-z', sha).split('\0').filter(Boolean))];
      for (const p of changed) {
        problems.push(...scanBuffer(p, gitBlob(`${sha}:${p}`), cfg).map((h) => `${short} ${h}`));
      }
    }
    scanned = records.length;
  } else if (mode === 'message') {
    // A commit message file (commit-msg hook). Comment lines are scanned too: with `git commit -m`
    // a line starting with # stays in the message.
    if (!args[0]) throw new GuardError('usage: message <file>');
    if (!existsSync(args[0])) throw new GuardError('path not found');
    for (const h of findHits(readFileSync(args[0], 'utf8'), cfg)) problems.push(`commit message:${h.line} [${h.hash}]`);
    scanned = 1;
  } else if (mode === 'text') {
    // Plain strings such as the ref names of a push; only the argument position is ever reported.
    if (!args.length) throw new GuardError('nothing to scan');
    args.forEach((text, i) => {
      for (const h of findHits(text, cfg)) problems.push(`argument ${i + 1} [${h.hash}]`);
    });
    scanned = args.length;
  } else {
    throw new GuardError('unknown mode (expected files, staged, commits, message or text)');
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

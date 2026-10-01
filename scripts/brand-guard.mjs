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
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
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

export function loadConfig(file = process.env.BRAND_GUARD_CONFIG || fileURLToPath(new URL('./brand-guard.denylist.json', import.meta.url))) {
  const raw = JSON.parse(readFileSync(file, 'utf8'));
  return { salt: raw.salt, maxWords: raw.maxWords, hashes: new Set(raw.hashes), allowedEmails: new Set(raw.allowedAuthorEmails) };
}

function walk(path, acc) {
  const st = statSync(path);
  if (st.isDirectory()) {
    for (const name of readdirSync(path)) if (!SKIP_DIRS.has(name)) walk(join(path, name), acc);
  } else acc.push(path);
  return acc;
}

function scanBuffer(label, buf, cfg) {
  const text = BINARY_EXT.has(extname(label).toLowerCase()) ? binaryStrings(buf) : buf.toString('utf8');
  const hits = findHits(text, cfg).map((h) => `${label}:${h.line} [${h.hash}]`);
  if (findHits(label, cfg).length) hits.push(`${label} [file name]`);
  return hits;
}

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

function main([mode = 'files', ...args]) {
  const cfg = loadConfig();
  let problems = [];
  if (mode === 'files') {
    const paths = args.length ? args.flatMap((p) => (existsSync(p) ? walk(p, []) : [])) : git('ls-files', '-z').split('\0').filter(Boolean);
    for (const p of paths) problems.push(...scanBuffer(p, readFileSync(p), cfg));
  } else if (mode === 'staged') {
    for (const p of git('diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z').split('\0').filter(Boolean)) {
      problems.push(...scanBuffer(p, execFileSync('git', ['show', `:${p}`], { maxBuffer: 64 * 1024 * 1024 }), cfg));
    }
  } else if (mode === 'commits') {
    // Every pushed commit: identities, message, and every blob it adds or changes
    // (a leak removed in a later commit would still be public in history).
    const log = git('log', '--format=%H%x00%ae%x00%ce%x00%B%x1e', ...(args.length ? args : ['HEAD']));
    for (const rec of log.split('\x1e').map((r) => r.trim()).filter(Boolean)) {
      const [sha, author, committer, body] = rec.split('\0');
      const short = sha.slice(0, 8);
      for (const email of [author, committer]) {
        if (!cfg.allowedEmails.has(email.toLowerCase())) problems.push(`${short} identity not allowlisted (set repo-local user.email)`);
      }
      if (findHits(body, cfg).length) problems.push(`${short} commit message [denylisted term]`);
      const changed = git('diff-tree', '--root', '--no-commit-id', '--name-only', '-r', '--diff-filter=ACMR', '-z', sha).split('\0').filter(Boolean);
      for (const p of changed) {
        const blob = execFileSync('git', ['show', `${sha}:${p}`], { maxBuffer: 64 * 1024 * 1024 });
        problems.push(...scanBuffer(p, blob, cfg).map((h) => `${short} ${h}`));
      }
    }
  } else {
    console.error(`unknown mode: ${mode}`);
    process.exit(2);
  }
  problems = [...new Set(problems)];
  if (problems.length) {
    console.error(`brand-guard: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`);
    process.exit(1);
  }
  console.log(`brand-guard: clean (${mode})`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main(process.argv.slice(2));

#!/usr/bin/env node
// Content rules for everything that renders: blocks off-limits topics (error),
// flags marketing clichés and watch-list words (warning), and lists "VERIFY:" markers,
// which are claims a founder still has to confirm. With --strict, any VERIFY marker fails
// the run unless ALLOW_UNVERIFIED=1 (`npm run check:launch` uses it before a public launch).
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCAN_DIRS = ['app', 'components', 'content', 'lib'];
const TEXT_EXT = new Set(['.ts', '.tsx', '.js', '.mjs', '.md', '.mdx', '.json', '.css']);

export const tokenize = (text) => text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

/** One { line, term } per term per line, matching whole tokens (phrases match consecutive tokens). */
export function findTermHits(text, terms) {
  const phrases = terms.map((term) => ({ term, tokens: tokenize(term) }));
  const hits = [];
  text.split(/\r?\n/).forEach((lineText, i) => {
    const toks = tokenize(lineText);
    for (const { term, tokens } of phrases) {
      for (let j = 0; j + tokens.length <= toks.length; j++) {
        if (tokens.every((t, k) => toks[j + k] === t)) {
          hits.push({ line: i + 1, term });
          break;
        }
      }
    }
  });
  return hits;
}

export function findVerifyMarkers(text, marker) {
  const out = [];
  text.split(/\r?\n/).forEach((lineText, i) => {
    if (lineText.includes(marker)) out.push({ line: i + 1 });
  });
  return out;
}

export function checkFiles(files, rules) {
  const result = { errors: [], warnings: [], verify: [] };
  const warnTerms = [...rules.topics.warn, ...rules.marketingWords];
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    for (const h of findTermHits(text, rules.topics.error)) result.errors.push({ file, ...h });
    for (const h of findTermHits(text, warnTerms)) result.warnings.push({ file, ...h });
    for (const h of findVerifyMarkers(text, rules.verifyMarker)) result.verify.push({ file, ...h });
  }
  return result;
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : TEXT_EXT.has(extname(p)) ? [p] : [];
  });
}

function main(args) {
  const strict = args.includes('--strict');
  const rules = JSON.parse(readFileSync(new URL('./content-rules.json', import.meta.url), 'utf8'));
  const files = SCAN_DIRS.filter((d) => existsSync(d)).flatMap(walk);
  const { errors, warnings, verify } = checkFiles(files, rules);
  for (const e of errors) console.error(`error   ${e.file}:${e.line} off-limits topic "${e.term}"`);
  for (const w of warnings) console.warn(`warning ${w.file}:${w.line} "${w.term}"`);
  for (const v of verify) console.log(`verify  ${v.file}:${v.line}`);
  const blockVerify = strict && verify.length > 0 && process.env.ALLOW_UNVERIFIED !== '1';
  if (blockVerify) console.error(`check-content: ${verify.length} unconfirmed claim(s) (VERIFY markers) must be confirmed first`);
  console.log(`check-content: ${files.length} files, ${errors.length} error(s), ${warnings.length} warning(s), ${verify.length} VERIFY marker(s)`);
  process.exit(errors.length || blockVerify ? 1 : 0);
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

if (isMainModule()) main(process.argv.slice(2));

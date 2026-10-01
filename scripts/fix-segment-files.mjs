#!/usr/bin/env node
// Next 16 exports one data file per route segment for the client router's prefetcher, named
// like out/guides/__next.guides.__PAGE__.txt. On Windows the segment path keeps the "\"
// separator, so the export writes out/guides/__next.guides/__PAGE__.txt instead and every
// prefetch 404s. This flattens such folders back to the flat names that Linux builds produce
// (on Linux it finds nothing to do), so out/ is the same on every platform.
import { readdirSync, realpathSync, renameSync, rmSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const SEGMENT_PREFIX = '__next.';

function filesUnder(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? filesUnder(join(dir, e.name)) : [join(dir, e.name)],
  );
}

/** Flattens every nested segment folder under outDir. Returns the number of files moved. */
export function flattenSegmentDirs(outDir) {
  let moved = 0;
  for (const entry of readdirSync(outDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === '_next') continue;
    const dir = join(outDir, entry.name);
    if (!entry.name.startsWith(SEGMENT_PREFIX)) {
      moved += flattenSegmentDirs(dir);
      continue;
    }
    for (const file of filesUnder(dir)) {
      const flat = `${entry.name}.${relative(dir, file).split(sep).join('.')}`;
      renameSync(file, join(dirname(dir), flat));
      moved += 1;
    }
    rmSync(dir, { recursive: true, force: true });
  }
  return moved;
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
  const moved = flattenSegmentDirs(process.argv[2] ?? 'out');
  if (moved > 0) console.log(`fix-segment-files: flattened ${moved} segment file(s)`);
}

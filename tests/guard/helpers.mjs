// Shared helpers for the guard tests (not a test file itself).
import { delimiter, dirname } from 'node:path';

export const OK_EMAIL = 'ok@users.noreply.github.com';

/**
 * Environment for a child process: the current one without any BRAND_GUARD_* override (tests stay
 * hermetic even on a machine that has a local denylist), with this Node's own directory first on PATH
 * (so git hooks run the same Node as the test runner, not whatever `node` shim comes first), plus `extra`.
 * A value of undefined removes the variable.
 */
export function envWith(extra = {}) {
  const env = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (!key.startsWith('BRAND_GUARD_')) env[key] = value;
  }
  const pathKey = Object.keys(env).find((key) => key.toLowerCase() === 'path') ?? 'PATH';
  env[pathKey] = `${dirname(process.execPath)}${delimiter}${env[pathKey] ?? ''}`;
  for (const [key, value] of Object.entries(extra)) {
    if (value === undefined) delete env[key];
    else env[key] = value;
  }
  return env;
}

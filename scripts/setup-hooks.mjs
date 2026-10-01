// Enables the repo's git hooks (.githooks/) so brand-guard runs on every commit and push.
// Does nothing outside a git checkout, so `npm ci` on a deploy machine never fails here,
// and only warns (exit code 0) when git itself cannot be run.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

if (existsSync('.git')) {
  try {
    execFileSync('git', ['config', 'core.hooksPath', '.githooks'], { stdio: 'ignore' });
    console.log('git hooks enabled (.githooks)');
  } catch {
    console.warn('warning: could not enable the git hooks (is git installed?). Run "npm run prepare" once it is.');
  }
}

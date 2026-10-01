// Enables the repo's git hooks (.githooks/) so brand-guard runs on every commit and push.
// Does nothing outside a git checkout, so `npm ci` on a deploy machine never fails here.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

if (existsSync('.git')) {
  execFileSync('git', ['config', 'core.hooksPath', '.githooks'], { stdio: 'ignore' });
  console.log('git hooks enabled (.githooks)');
}

# Contributing

## Workflow (fork and pull request)

1. Fork `Me-Bro/RanaBrothers_website` and clone your fork.
2. Add the upstream remote and disable pushing to it:
   `git remote add upstream git@github.com:Me-Bro/RanaBrothers_website.git`
   `git remote set-url --push upstream DISABLED-use-a-pull-request`
3. Set a repo-local identity that uses your GitHub **noreply** email (GitHub → Settings → Emails):
   `git config user.name "Your Name"` and `git config user.email "<id>+<user>@users.noreply.github.com"`
4. Sync, branch, commit, push to your fork, then open a PR against `main`:
   `git fetch upstream && git switch main && git merge --ff-only upstream/main && git push origin main`
   `git switch -c feat/short-name` … commit … `git push -u origin feat/short-name`
5. PRs are squash-merged.

## Rules

- **Hooks are mandatory.** `npm install` enables `.githooks/`. `pre-commit`, `commit-msg` and `pre-push` run `scripts/brand-guard.mjs`. Never bypass them with `--no-verify`.
- **Commit identities are allowlisted** in `scripts/brand-guard.denylist.json` (`allowedAuthorEmails`). New contributors add their noreply email there in their first PR.
- **Never add names, contact details or links of any other business** to code, comments, file names, commit messages or content. The brand guard checks a hashed denylist. If it reports a problem, remove the flagged line; it never prints the term.
- **Content rules** (`npm run check:content`): no off-limits topics; avoid the marketing clichés it warns about. Tag any claim that needs founder confirmation with a `VERIFY:` comment. `npm run check:launch` fails while any remain.
- **Static export only:** no API routes, middleware/proxy, server actions or `next/image`.
- Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `ci:`, `content:`).

## Before opening a PR

Run `npm run verify` and `npm run test:e2e`, then fill in the PR template.

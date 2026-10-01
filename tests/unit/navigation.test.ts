import { describe, expect, it } from 'vitest';
import { footerColumns, groupLinks, primaryLinks } from '@/content/navigation';
import { pages } from '@/content/registry';

const existing = new Set(pages.map((p) => p.path));

describe('navigation', () => {
  it('only links to pages that exist in the registry', () => {
    const all = [
      ...groupLinks('build'),
      ...groupLinks('guidance'),
      ...groupLinks('ai'),
      ...primaryLinks(),
      ...footerColumns().flatMap((c) => c.links),
    ];
    for (const l of all) expect(existing.has(l.href), l.href).toBe(true);
  });

  it('never links to noindex utility pages', () => {
    const hidden = new Set(pages.filter((p) => p.noindex).map((p) => p.path));
    for (const l of footerColumns().flatMap((c) => c.links)) expect(hidden.has(l.href), l.href).toBe(false);
  });

  it('groups every service under exactly one menu', () => {
    const grouped = ['build', 'guidance', 'ai'].flatMap((g) => groupLinks(g as 'build').map((l) => l.href));
    const services = pages.filter((p) => p.kind === 'service').map((p) => p.path);
    expect(grouped.sort()).toEqual(services.sort());
  });
});

import { describe, expect, it } from 'vitest';
import { founderList } from '@/content/founders';
import { pages } from '@/content/registry';
import { articleNode, breadcrumbNode, graph, ids, organizationNode, serviceNode, webPageNode, websiteNode } from '@/lib/schema';

function walk(value: unknown, visit: (obj: Record<string, unknown>) => void) {
  if (Array.isArray(value)) value.forEach((v) => walk(v, visit));
  else if (value && typeof value === 'object') {
    visit(value as Record<string, unknown>);
    Object.values(value).forEach((v) => walk(v, visit));
  }
}

const EXTERNAL_IDS = new Set(founderList.map((f) => f.personId));

function unresolvedRefs(g: { '@graph': unknown[] }) {
  const defined = new Set<string>();
  walk(g['@graph'], (o) => {
    if (typeof o['@id'] === 'string' && Object.keys(o).length > 1) defined.add(o['@id'] as string);
  });
  const missing: string[] = [];
  walk(g['@graph'], (o) => {
    const keys = Object.keys(o);
    if (keys.length === 1 && keys[0] === '@id' && !defined.has(o['@id'] as string) && !EXTERNAL_IDS.has(o['@id'] as string)) {
      missing.push(o['@id'] as string);
    }
  });
  return missing;
}

describe('structured data', () => {
  const siteGraph = graph(organizationNode(), websiteNode(), webPageNode('/'));

  it('describes the organisation with logo, address and founders', () => {
    const org = organizationNode();
    expect(org).toMatchObject({ '@type': 'Organization', '@id': ids.org, name: 'Rana Brothers' });
    expect(org.founder).toEqual(
      expect.arrayContaining(founderList.map((f) => expect.objectContaining({ '@id': f.personId, name: f.name }))),
    );
  });

  it('names the site for search-result site names', () => {
    expect(websiteNode()).toMatchObject({ '@type': 'WebSite', name: 'Rana Brothers', publisher: { '@id': ids.org } });
  });

  it('resolves every @id reference on every page graph', () => {
    for (const p of pages) {
      const nodes = [organizationNode(), websiteNode(), webPageNode(p.path)];
      if (p.path !== '/') nodes.push(breadcrumbNode(p.path));
      if (p.kind === 'service') nodes.push(serviceNode(p.path));
      if (p.kind === 'guide' || p.kind === 'case-study') nodes.push(articleNode(p.path));
      expect(unresolvedRefs(graph(...nodes)), p.path).toEqual([]);
    }
  });

  it('never self-rates (no AggregateRating or Review)', () => {
    expect(JSON.stringify(siteGraph)).not.toMatch(/aggregateRating|"review"|AggregateRating|"Review"/);
  });

  it('builds a one-item breadcrumb for home and a full trail for nested pages', () => {
    expect((breadcrumbNode('/') as { itemListElement: unknown[] }).itemListElement).toHaveLength(1);
    expect((breadcrumbNode('/services/mvp-development') as { itemListElement: unknown[] }).itemListElement).toHaveLength(3);
  });

  it('serialises without undefined values', () => {
    expect(JSON.stringify(siteGraph)).not.toContain('undefined');
  });
});

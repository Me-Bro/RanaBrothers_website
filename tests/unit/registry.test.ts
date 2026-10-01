import { describe, expect, it } from 'vitest';
import { breadcrumbTrail, indexablePages, pageFor, pages } from '@/content/registry';

const PATH = /^\/([a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*)?$/;
const ISO = /^\d{4}-\d{2}-\d{2}$/;
const STOP = new Set(['a', 'an', 'and', 'the', 'for', 'in', 'of', 'to', 'with', 'your', 'on', 'vs']);
const words = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w && !STOP.has(w));

describe('page registry', () => {
  it('has well-formed, unique paths', () => {
    for (const p of pages) expect(p.path, p.path).toMatch(PATH);
    expect(new Set(pages.map((p) => p.path)).size).toBe(pages.length);
  });

  it.each(['title', 'description', 'h1', 'primaryKeyword'] as const)('has unique %s values', (key) => {
    const values = pages.map((p) => p[key].toLowerCase());
    expect(new Set(values).size).toBe(values.length);
  });

  it('keeps titles within 60 characters', () => {
    for (const p of pages) expect(p.title.length, p.path).toBeLessThanOrEqual(60);
  });

  it('keeps descriptions between 110 and 160 characters', () => {
    for (const p of pages) {
      expect(p.description.length, p.path).toBeGreaterThanOrEqual(110);
      expect(p.description.length, p.path).toBeLessThanOrEqual(160);
    }
  });

  it('covers every primary-keyword word in the title or H1', () => {
    for (const p of pages) {
      const have = new Set([...words(p.title), ...words(p.h1)]);
      for (const w of words(p.primaryKeyword)) expect(have.has(w), `${p.path}: "${w}"`).toBe(true);
    }
  });

  it('uses ISO dates and never updates before publishing', () => {
    for (const p of pages) {
      expect(p.published, p.path).toMatch(ISO);
      expect(p.updated, p.path).toMatch(ISO);
      expect(p.updated >= p.published, p.path).toBe(true);
    }
  });

  it('points every parent at an existing page', () => {
    for (const p of pages) if (p.parent) expect(() => pageFor(p.parent!), p.path).not.toThrow();
  });

  it('builds breadcrumb trails from home to the page', () => {
    for (const p of pages) {
      const trail = breadcrumbTrail(p.path);
      expect(trail[0].path).toBe('/');
      expect(trail.at(-1)!.path).toBe(p.path);
      expect(new Set(trail.map((t) => t.path)).size).toBe(trail.length);
    }
  });

  it('gives guides and case studies an author', () => {
    for (const p of pages) if (p.kind === 'guide' || p.kind === 'case-study') expect(p.author, p.path).toBeDefined();
  });

  it('throws on unknown paths', () => {
    expect(() => pageFor('/nope')).toThrow(/No registry entry/);
  });

  it('leaves noindex pages out of indexablePages', () => {
    expect(indexablePages().some((p) => p.noindex)).toBe(false);
    expect(indexablePages().length).toBe(pages.filter((p) => !p.noindex).length);
  });
});

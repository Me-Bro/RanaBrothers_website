import { describe, expect, it } from 'vitest';
import { ogImagePath, pageMeta } from '@/lib/meta';
import { absoluteUrl, site } from '@/lib/site';

describe('absoluteUrl', () => {
  it('returns the bare origin for home and joins other paths', () => {
    expect(absoluteUrl('/')).toBe('https://ranabrothers.online');
    expect(absoluteUrl('/services')).toBe('https://ranabrothers.online/services');
  });
});

describe('ogImagePath', () => {
  it('maps home and nested paths to file names', () => {
    expect(ogImagePath('/')).toBe('/og/home.png');
    expect(ogImagePath('/services/mvp-development')).toBe('/og/services--mvp-development.png');
  });
});

describe('pageMeta("/")', () => {
  const meta = pageMeta('/');
  it('uses the registry title verbatim', () => {
    expect(meta.title).toEqual({ absolute: 'Rana Brothers | Software & AI Development Company, India' });
  });
  it('sets an absolute self-canonical (home = bare origin)', () => {
    expect(meta.alternates?.canonical).toBe(site.url);
  });
  it('mirrors the canonical in og:url and sets the page image', () => {
    const og = meta.openGraph as { url?: string; images?: Array<{ url: string; width: number; height: number }> };
    expect(og.url).toBe(site.url);
    expect(og.images?.[0]).toMatchObject({ url: '/og/home.png', width: 1200, height: 630 });
  });
  it('uses a large Twitter card', () => {
    expect(meta.twitter).toMatchObject({ card: 'summary_large_image' });
  });
  it('is indexable', () => {
    expect(meta.robots).toEqual({ index: true, follow: true });
  });
});

describe('pageMeta for a noindex page', () => {
  it('sets robots noindex', () => {
    expect(pageMeta('/contact/thanks').robots).toEqual({ index: false, follow: true });
  });
});

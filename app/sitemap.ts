import type { MetadataRoute } from 'next';
import { externalUrls } from '@/content/external-urls';
import { indexablePages } from '@/content/registry';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...indexablePages().map((p) => ({ url: absoluteUrl(p.path), lastModified: p.updated })),
    ...externalUrls.map((u) => ({ url: u.url, lastModified: u.lastModified })),
  ];
}

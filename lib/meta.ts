import type { Metadata } from 'next';
import { pageFor } from '@/content/registry';
import { absoluteUrl, site } from '@/lib/site';

export const ogImagePath = (path: string) => `/og/${path === '/' ? 'home' : path.slice(1).replaceAll('/', '--')}.png`;

export function pageMeta(path: string): Metadata {
  const page = pageFor(path);
  const url = absoluteUrl(page.path);
  const image = { url: ogImagePath(page.path), width: 1200, height: 630, alt: page.title };
  const isArticle = page.kind === 'guide' || page.kind === 'case-study';
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    robots: page.noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: isArticle ? 'article' : 'website',
      url,
      title: page.title,
      description: page.description,
      siteName: site.name,
      locale: site.locale,
      images: [image],
      ...(isArticle ? { publishedTime: page.published, modifiedTime: page.updated } : {}),
    },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: [image.url] },
  };
}

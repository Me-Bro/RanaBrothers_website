// JSON-LD nodes with stable @ids. Mark up only what the page visibly says.
import { founderList, founders } from '@/content/founders';
import { breadcrumbTrail, pageFor, type PageKind } from '@/content/registry';
import { ogImagePath } from '@/lib/meta';
import { absoluteUrl, site } from '@/lib/site';

export type JsonLdNode = Record<string, unknown>;

export const ids = {
  org: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  logo: `${site.url}/#logo`,
} as const;

export const pageId = (path: string) => `${absoluteUrl(path)}#webpage`;
export const breadcrumbId = (path: string) => `${absoluteUrl(path)}#breadcrumb`;

const PAGE_TYPE: Record<PageKind, string> = {
  home: 'WebPage',
  hub: 'CollectionPage',
  service: 'WebPage',
  'case-study': 'WebPage',
  guide: 'WebPage',
  about: 'AboutPage',
  process: 'WebPage',
  faq: 'WebPage',
  contact: 'ContactPage',
  legal: 'WebPage',
  utility: 'WebPage',
};

const AREA_SERVED = ['IN', 'Worldwide'];

export function organizationNode(): JsonLdNode {
  return {
    '@type': 'Organization',
    '@id': ids.org,
    name: site.name,
    url: site.url,
    logo: { '@type': 'ImageObject', '@id': ids.logo, url: `${site.url}/brand/rb-logo-1024.png`, width: 1024, height: 1024 },
    description: site.description,
    disambiguatingDescription: site.disambiguatingDescription,
    email: site.email,
    address: { '@type': 'PostalAddress', addressLocality: site.locality, addressRegion: site.region, addressCountry: site.country },
    areaServed: AREA_SERVED,
    founder: founderList.map((f) => ({ '@type': 'Person', '@id': f.personId, name: f.name, jobTitle: f.role, url: f.url })),
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };
}

export function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: site.url,
    name: site.name,
    alternateName: ['Rana Brothers Software & AI Studio', 'ranabrothers.online'],
    publisher: { '@id': ids.org },
    inLanguage: 'en-IN',
  };
}

export function webPageNode(path: string): JsonLdNode {
  const page = pageFor(path);
  return {
    '@type': PAGE_TYPE[page.kind],
    '@id': pageId(path),
    url: absoluteUrl(path),
    name: page.title,
    description: page.description,
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.org },
    inLanguage: 'en-IN',
    datePublished: page.published,
    dateModified: page.updated,
    ...(path === '/' ? {} : { breadcrumb: { '@id': breadcrumbId(path) } }),
  };
}

export function breadcrumbNode(path: string): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId(path),
    itemListElement: breadcrumbTrail(path).map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.label, item: absoluteUrl(p.path) })),
  };
}

export function serviceNode(path: string): JsonLdNode {
  const page = pageFor(path);
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: page.label,
    serviceType: page.primaryKeyword,
    description: page.description,
    url: absoluteUrl(path),
    provider: { '@id': ids.org },
    areaServed: AREA_SERVED,
  };
}

export function articleNode(path: string): JsonLdNode {
  const page = pageFor(path);
  if (!page.author) throw new Error(`articleNode: "${path}" needs an author in the registry`);
  const author = founders[page.author];
  return {
    '@type': page.kind === 'guide' ? 'BlogPosting' : 'Article',
    '@id': `${absoluteUrl(path)}#article`,
    headline: page.h1,
    description: page.description,
    url: absoluteUrl(path),
    mainEntityOfPage: { '@id': pageId(path) },
    image: absoluteUrl(ogImagePath(path)),
    datePublished: page.published,
    dateModified: page.updated,
    author: { '@type': 'Person', '@id': author.personId, name: author.name, url: author.url },
    publisher: { '@id': ids.org },
    inLanguage: 'en-IN',
  };
}

export function faqNode(path: string, items: { q: string; a: string }[]): JsonLdNode {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntityOfPage: { '@id': pageId(path) },
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
}

export function itemListNode(path: string, paths: string[]): JsonLdNode {
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#list`,
    itemListElement: paths.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(p), name: pageFor(p).label })),
  };
}

export function graph(...nodes: JsonLdNode[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

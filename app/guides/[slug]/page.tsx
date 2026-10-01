import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import { pages } from '@/content/registry';
import { cardsForPaths } from '@/content/service-pages';
import { readContentFile } from '@/lib/content-files';
import { renderMarkdown } from '@/lib/markdown';
import { pageMeta } from '@/lib/meta';

const PREFIX = '/guides/';
type Params = { params: Promise<{ slug: string }> };

const guides = pages.filter((p) => p.kind === 'guide');

/** The one commercial page each guide points to, plus a sibling guide. */
const RELATED: Record<string, string[]> = {
  '/guides/how-to-build-an-mvp': ['/services/mvp-development', '/services/fractional-cto', '/guides/how-to-choose-a-software-development-company'],
  '/guides/how-to-choose-a-software-development-company': ['/process', '/services/project-rescue', '/guides/how-to-build-an-mvp'],
};

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.path.slice(PREFIX.length) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return pageMeta(`${PREFIX}${slug}`);
}

export default async function GuideRoute({ params }: Params) {
  const { slug } = await params;
  const guide = guides.find((g) => g.path === `${PREFIX}${slug}`);
  if (!guide) notFound();
  const { html } = renderMarkdown(readContentFile('guides', `${slug}.md`));
  return <ArticleLayout path={guide.path} html={html} related={cardsForPaths(RELATED[guide.path] ?? [])} />;
}

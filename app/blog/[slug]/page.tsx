import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import { pages } from '@/content/registry';
import { cardsForPaths } from '@/content/service-pages';
import { readContentFile } from '@/lib/content-files';
import { renderMarkdown } from '@/lib/markdown';
import { pageMeta } from '@/lib/meta';

const PREFIX = '/blog/';
type Params = { params: Promise<{ slug: string }> };

const posts = pages.filter((p) => p.kind === 'blog');

/** Commercial pages each post points to. */
const RELATED: Record<string, string[]> = {
  '/blog/ai-bubble-technology-is-not-the-business': ['/ai/llm-integration', '/services/software-consulting', '/ai/ai-app-development'],
};

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.path.slice(PREFIX.length) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return pageMeta(`${PREFIX}${slug}`);
}

export default async function BlogPostRoute({ params }: Params) {
  const { slug } = await params;
  const post = posts.find((p) => p.path === `${PREFIX}${slug}`);
  if (!post) notFound();
  const { html } = renderMarkdown(readContentFile('blog', `${slug}.md`));
  return <ArticleLayout path={post.path} html={html} related={cardsForPaths(RELATED[post.path] ?? [])} />;
}

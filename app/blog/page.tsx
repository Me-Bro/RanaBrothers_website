import { HubPage } from '@/components/content/HubPage';
import { blogHub } from '@/content/blog/hub';
import { pages } from '@/content/registry';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('/blog');

export default function BlogHubPage() {
  const items = pages
    .filter((p) => p.kind === 'blog')
    .sort((a, b) => b.published.localeCompare(a.published))
    .map((p) => ({ href: p.path, title: p.label, text: p.description }));
  return <HubPage path="/blog" content={blogHub} groups={[{ title: 'Latest posts', items }]} />;
}

import { HubPage } from '@/components/content/HubPage';
import { guidesHub } from '@/content/guides/hub';
import { pages } from '@/content/registry';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('/guides');

export default function GuidesHubPage() {
  const items = pages.filter((p) => p.kind === 'guide').map((g) => ({ href: g.path, title: g.label, text: g.description }));
  return <HubPage path="/guides" content={guidesHub} groups={[{ title: 'All guides', items }]} />;
}

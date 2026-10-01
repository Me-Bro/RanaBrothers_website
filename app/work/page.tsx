import { HubPage } from '@/components/content/HubPage';
import { pageFor } from '@/content/registry';
import { caseStudies } from '@/content/work/facts';
import { workHub } from '@/content/work/hub';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('/work');

export default function WorkHubPage() {
  const items = caseStudies.map((c) => ({ href: c.path, title: pageFor(c.path).label, text: c.summary }));
  return <HubPage path="/work" content={workHub} groups={[{ title: 'Case studies', items }]} />;
}

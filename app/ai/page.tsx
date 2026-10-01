import { HubPage } from '@/components/content/HubPage';
import { aiHub, cardsFor } from '@/content/service-pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('/ai');

export default function AiHubPage() {
  return <HubPage path="/ai" content={aiHub} groups={[{ title: 'AI solutions', items: cardsFor('ai') }]} />;
}

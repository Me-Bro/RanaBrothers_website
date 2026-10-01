import { HubPage } from '@/components/content/HubPage';
import { cardsFor, servicesHub } from '@/content/service-pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('/services');

export default function ServicesHubPage() {
  return (
    <HubPage
      path="/services"
      content={servicesHub}
      groups={[
        { title: 'Build', items: cardsFor('build') },
        { title: 'Guidance', items: cardsFor('guidance') },
      ]}
    />
  );
}

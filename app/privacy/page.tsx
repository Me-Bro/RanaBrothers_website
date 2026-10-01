import { LegalPage } from '@/components/content/LegalPage';
import { privacy } from '@/content/company/legal';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('/privacy');

export default function PrivacyPage() {
  return <LegalPage path="/privacy" doc={privacy} />;
}

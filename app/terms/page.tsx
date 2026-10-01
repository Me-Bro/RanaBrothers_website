import { LegalPage } from '@/components/content/LegalPage';
import { terms } from '@/content/company/legal';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('/terms');

export default function TermsPage() {
  return <LegalPage path="/terms" doc={terms} />;
}

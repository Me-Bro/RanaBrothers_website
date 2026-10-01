import { PageHeader } from '@/components/content/PageHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { FaqList } from '@/components/sections/FaqList';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { faqGroups } from '@/content/company/faqs';
import { pageMeta } from '@/lib/meta';
import { faqNode, graph, webPageNode } from '@/lib/schema';

export const metadata = pageMeta('/faq');

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function FaqPage() {
  return (
    <>
      <PageHeader
        path="/faq"
        lead={<p>Straight answers to what clients ask before they start: contracts, ownership, payments, working together and life after launch.</p>}
      />
      {faqGroups.map((group) => (
        <Section key={group.title} id={slug(group.title)} title={group.title}>
          <FaqList items={group.items} />
        </Section>
      ))}
      <CtaBand heading="Still have a question?" body="Ask us directly. A short message is enough, and we answer every one ourselves." />
      <JsonLd data={graph(webPageNode('/faq'), faqNode('/faq', faqGroups.flatMap((g) => g.items)))} />
    </>
  );
}

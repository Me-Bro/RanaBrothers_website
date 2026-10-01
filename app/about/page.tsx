import { PageHeader } from '@/components/content/PageHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { FaqList } from '@/components/sections/FaqList';
import { FounderCards } from '@/components/sections/FounderCards';
import { PointList } from '@/components/sections/PointList';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { about } from '@/content/company/about';
import { pageMeta } from '@/lib/meta';
import { graph, webPageNode } from '@/lib/schema';

export const metadata = pageMeta('/about');

export default function AboutPage() {
  const [first, ...rest] = about.story;
  return (
    <>
      <PageHeader path="/about" lead={<p>{first}</p>} />
      <Section id="story" eyebrow="Our story" title="A studio that ships its own products">
        <div className="max-w-measure space-y-5 text-[17px] leading-relaxed text-fg/85">
          {rest.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>
      <Section id="founders" eyebrow="Founders" title="The brothers behind the work">
        <FounderCards />
      </Section>
      <Section id="values" eyebrow="How we work" title="What we hold ourselves to">
        <PointList points={about.values} />
      </Section>
      <Section id="facts" eyebrow="Quick facts" title="Rana Brothers at a glance">
        <dl className="grid max-w-3xl divide-y divide-hairline border-y border-hairline">
          {about.quickFacts.map((f) => (
            <div key={f.label} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr]">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted">{f.label}</dt>
              <dd className="text-[16px] text-fg">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section id="answers" eyebrow="Quick answers" title="Questions about the studio">
        <FaqList items={about.quickAnswers} />
      </Section>
      <CtaBand />
      <JsonLd data={graph(webPageNode('/about'))} />
    </>
  );
}

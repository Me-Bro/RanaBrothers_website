import { CardGrid } from '@/components/sections/CardGrid';
import { CtaBand } from '@/components/sections/CtaBand';
import { FounderCards } from '@/components/sections/FounderCards';
import { HomeHero } from '@/components/sections/HomeHero';
import { NumberedSteps } from '@/components/sections/NumberedSteps';
import { PointList } from '@/components/sections/PointList';
import { ProofRow } from '@/components/sections/ProofRow';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import { processSteps, whyUs } from '@/content/home';
import { hasPage } from '@/content/registry';
import { cardsFor } from '@/content/service-pages';
import { pageMeta } from '@/lib/meta';
import { graph, webPageNode } from '@/lib/schema';

export const metadata = pageMeta('/');

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProofRow />

      <Section
        id="build"
        eyebrow="What we build"
        title="Web apps, mobile apps and custom software, built end to end"
        intro="One small senior team takes your product from a written scope to production: design, frontend, backend, data and deployment, then keeps it healthy after launch."
      >
        <CardGrid items={cardsFor('build')} />
        {hasPage('/services') ? (
          <p className="mt-8">
            <TextLink href="/services">All services and how a project runs</TextLink>
          </p>
        ) : null}
      </Section>

      <Section
        id="ai"
        eyebrow="AI"
        title={
          <>
            AI where it <span className="font-serif italic font-normal text-gold">earns its place</span>
          </>
        }
        intro="Chatbots that answer from your own documents, LLM features inside the product you already have, and new AI-first apps. We measure before we launch, and we say so when a simpler approach is better."
      >
        <CardGrid items={cardsFor('ai')} />
      </Section>

      <Section
        id="guidance"
        eyebrow="Guidance"
        title="Senior technical guidance, before and after you build"
        intro="Not every problem needs a build. Sometimes it needs a second opinion, a part-time technical lead, or a rescue plan for a project that has stalled."
      >
        <CardGrid items={cardsFor('guidance')} />
      </Section>

      <Section id="process" eyebrow="Process" title="How a project runs">
        <NumberedSteps steps={processSteps} />
        {hasPage('/process') ? (
          <p className="mt-8">
            <TextLink href="/process">See how we work</TextLink>
          </p>
        ) : null}
      </Section>

      <Section id="why" eyebrow="Why Rana Brothers" title="What working with us is like">
        <PointList points={whyUs} />
      </Section>

      <Section id="founders" eyebrow="Founders" title="Built by the people you talk to">
        <FounderCards />
      </Section>

      <CtaBand />
      <JsonLd data={graph(webPageNode('/'))} />
    </>
  );
}

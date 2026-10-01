import type { ReactNode } from 'react';
import { ComparisonTable } from '@/components/content/ComparisonTable';
import { PageHeader } from '@/components/content/PageHeader';
import { CardGrid } from '@/components/sections/CardGrid';
import { CtaBand } from '@/components/sections/CtaBand';
import { FaqList } from '@/components/sections/FaqList';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { TextLink } from '@/components/ui/TextLink';
import { cardsForPaths } from '@/content/service-pages';
import type { ServiceContent } from '@/content/types';
import { graph, serviceNode, webPageNode } from '@/lib/schema';

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-title`} className="border-t border-hairline py-14 sm:py-20">
      <Container>
        <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[16px] leading-relaxed text-fg/90">
          <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-gold" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Template for every service and AI page. */
export function ServicePage({ content }: { content: ServiceContent }) {
  const { path } = content;
  return (
    <>
      <PageHeader
        path={path}
        lead={
          <div className="space-y-4">
            {content.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        }
      >
        <ButtonLink href="/contact" arrow>
          Get an estimate
        </ButtonLink>
      </PageHeader>

      <section aria-label="Who it's for and what you get" className="border-t border-hairline py-14 sm:py-20">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Who it&apos;s for</h2>
            <div className="mt-6">
              <Bullets items={content.forWho} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">What you get</h2>
            <div className="mt-6">
              <Bullets items={content.deliverables} />
            </div>
          </div>
        </Container>
      </section>

      <Block id="how" title="How it works">
        <ol className="grid gap-5 md:grid-cols-2">
          {content.steps.map((step, i) => (
            <li key={step.title} className="card p-6">
              <p className="font-mono text-sm text-gold">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block id="tech" title="Technology we use">
        <ul className="flex flex-wrap gap-2">
          {content.tech.map((t) => (
            <li key={t} className="rounded-full border border-hairline px-4 py-1.5 font-mono text-sm text-fg/90">
              {t}
            </li>
          ))}
        </ul>
      </Block>

      <Block id="proof" title="Proof">
        <ul className="grid gap-5 md:grid-cols-2">
          {content.proof.map((item) => (
            <li key={item.label} className="card p-6">
              <h3 className="text-lg font-semibold tracking-tight">
                <TextLink href={item.href}>{item.label}</TextLink>
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {content.comparison ? (
        <Block id="compare" title="Comparing the options">
          <ComparisonTable table={content.comparison} />
        </Block>
      ) : null}

      <Block id="not-for" title="When we're not the right fit">
        <ul className="max-w-3xl space-y-3 text-[16px] leading-relaxed text-muted">
          {content.notFor.map((item) => (
            <li key={item} className="border-l-2 border-hairline pl-4">
              {item}
            </li>
          ))}
        </ul>
      </Block>

      <Block id="faq" title="Questions people ask">
        <FaqList items={content.faqs} />
      </Block>

      {content.related.length ? (
        <Block id="related" title="Related">
          <CardGrid items={cardsForPaths(content.related)} />
        </Block>
      ) : null}

      <CtaBand />
      <JsonLd data={graph(webPageNode(path), serviceNode(path))} />
    </>
  );
}

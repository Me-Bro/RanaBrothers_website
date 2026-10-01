import { ComparisonTable } from '@/components/content/ComparisonTable';
import { PageHeader } from '@/components/content/PageHeader';
import { CardGrid, type CardItem } from '@/components/sections/CardGrid';
import { CtaBand } from '@/components/sections/CtaBand';
import { FaqList } from '@/components/sections/FaqList';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import type { HubContent } from '@/content/types';
import { graph, itemListNode, webPageNode } from '@/lib/schema';

interface Props {
  path: string;
  content: HubContent;
  groups: { title: string; items: CardItem[] }[];
}

/** Template for the hub pages (/services, /ai, /work, /guides): intro, grouped cards, sections, comparison, FAQ, CTA. */
const titleId = (title: string) => `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;

export function HubPage({ path, content, groups }: Props) {
  const allPaths = groups.flatMap((g) => g.items.map((i) => i.href));
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
      />

      {groups.map((g) => (
        <section key={g.title} aria-labelledby={titleId(g.title)} className="border-t border-hairline py-14 sm:py-20">
          <Container>
            <h2 id={titleId(g.title)} className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {g.title}
            </h2>
            <div className="mt-8">
              <CardGrid items={g.items} />
            </div>
          </Container>
        </section>
      ))}

      {content.sections.map((s) => (
        <section key={s.title} aria-label={s.title} className="border-t border-hairline py-14 sm:py-20">
          <Container>
            <h2 className="max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl">{s.title}</h2>
            <div className="mt-6 max-w-measure space-y-4 text-[17px] leading-relaxed text-fg/85">
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Container>
        </section>
      ))}

      {content.comparison ? (
        <section aria-label="Comparison" className="border-t border-hairline py-14 sm:py-20">
          <Container>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Comparing the options</h2>
            <div className="mt-8">
              <ComparisonTable table={content.comparison} />
            </div>
          </Container>
        </section>
      ) : null}

      <section aria-label="Questions people ask" className="border-t border-hairline py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Questions people ask</h2>
          <div className="mt-8">
            <FaqList items={content.faqs} />
          </div>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={graph(webPageNode(path), itemListNode(path, allPaths))} />
    </>
  );
}

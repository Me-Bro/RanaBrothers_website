import type { ReactNode } from 'react';
import { PageHeader } from '@/components/content/PageHeader';
import { CardGrid, type CardItem } from '@/components/sections/CardGrid';
import { CtaBand } from '@/components/sections/CtaBand';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { TextLink } from '@/components/ui/TextLink';
import { founders } from '@/content/founders';
import { pageFor } from '@/content/registry';
import { articleNode, graph, webPageNode } from '@/lib/schema';

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

interface Props {
  path: string;
  html: string;
  facts?: { label: string; value: string }[];
  related?: CardItem[];
  aside?: ReactNode;
}

/** Template for case studies and guides: header, facts, rendered Markdown, author box, related, CTA. */
export function ArticleLayout({ path, html, facts, related, aside }: Props) {
  const page = pageFor(path);
  const author = page.author ? founders[page.author] : undefined;
  return (
    <>
      <PageHeader path={path}>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {author ? <>By {author.name} · </> : null}
          Published <time dateTime={page.published}>{formatDate(page.published)}</time>
          {page.updated !== page.published ? (
            <>
              {' '}
              · Updated <time dateTime={page.updated}>{formatDate(page.updated)}</time>
            </>
          ) : null}
        </p>
      </PageHeader>

      <div className="border-t border-hairline py-14 sm:py-20">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article>
            {facts?.length ? (
              <dl className="mb-12 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.label} className="bg-surface px-5 py-4">
                    <dt className="font-mono text-xs uppercase tracking-wider text-muted">{f.label}</dt>
                    <dd className="mt-1 text-[15px] text-fg">{f.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <div className="prose-rb" dangerouslySetInnerHTML={{ __html: html }} />
          </article>
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {author ? (
              <div data-author-box="" className="card p-6">
                <p className="eyebrow">Written by</p>
                <p className="mt-3 text-lg font-semibold tracking-tight">{author.name}</p>
                <p className="text-sm text-muted">
                  {author.role}, Rana Brothers
                </p>
                <p className="mt-4 text-sm">
                  <TextLink href={author.aboutUrl}>More about {author.firstName}</TextLink>
                </p>
              </div>
            ) : null}
            {aside}
          </aside>
        </Container>
      </div>

      {related?.length ? (
        <section aria-label="Related" className="border-t border-hairline py-14 sm:py-20">
          <Container>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Related</h2>
            <div className="mt-8">
              <CardGrid items={related} />
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand />
      <JsonLd data={graph(webPageNode(path), articleNode(path))} />
    </>
  );
}

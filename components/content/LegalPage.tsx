import { PageHeader } from '@/components/content/PageHeader';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import type { LegalDoc } from '@/content/types';
import { graph, webPageNode } from '@/lib/schema';

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function LegalPage({ path, doc }: { path: string; doc: LegalDoc }) {
  return (
    <>
      <PageHeader path={path}>
        <p data-effective-date="" className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          Effective <time dateTime={doc.effectiveDate}>{formatDate(doc.effectiveDate)}</time>
        </p>
      </PageHeader>
      <div className="border-t border-hairline py-14 sm:py-20">
        <Container>
          <div className="prose-rb">
            {doc.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {doc.sections.map((s) => (
              <section key={s.heading} aria-label={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.list?.length ? (
                  <ul>
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </Container>
      </div>
      <JsonLd data={graph(webPageNode(path))} />
    </>
  );
}

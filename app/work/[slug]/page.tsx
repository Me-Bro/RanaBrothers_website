import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleLayout } from '@/components/content/ArticleLayout';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { cardsForPaths } from '@/content/service-pages';
import { caseStudies } from '@/content/work/facts';
import { readContentFile } from '@/lib/content-files';
import { renderMarkdown } from '@/lib/markdown';
import { pageMeta } from '@/lib/meta';

const PREFIX = '/work/';
type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.path.slice(PREFIX.length) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return pageMeta(`${PREFIX}${slug}`);
}

export default async function CaseStudyRoute({ params }: Params) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.path === `${PREFIX}${slug}`);
  if (!study) notFound();
  const { html } = renderMarkdown(readContentFile('work', `${slug}.md`));
  return (
    <ArticleLayout
      path={study.path}
      html={html}
      facts={study.facts}
      related={cardsForPaths(study.related)}
      aside={
        <div className="card p-6">
          <p className="eyebrow">Try it</p>
          <p className="mt-3 text-lg font-semibold tracking-tight">{study.product}</p>
          <div className="mt-4">
            <ButtonLink href={study.productUrl} variant="ghost">
              Open {study.product}
            </ButtonLink>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {study.stack.map((s) => (
              <li key={s} className="rounded-full border border-hairline px-3 py-1 font-mono text-xs text-muted">
                {s}
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}

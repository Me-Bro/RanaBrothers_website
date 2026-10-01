import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbTrail } from '@/content/registry';
import { breadcrumbNode, graph } from '@/lib/schema';

/** Visible breadcrumb trail plus its BreadcrumbList JSON-LD. */
export function Breadcrumbs({ path }: { path: string }) {
  const trail = breadcrumbTrail(path);
  return (
    <>
      <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((p, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={p.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-fg/80">
                    {p.label}
                  </span>
                ) : (
                  <>
                    <Link href={p.path} className="hover:text-gold">
                      {p.label}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={graph(breadcrumbNode(path))} />
    </>
  );
}

import Link from 'next/link';
import { Mark } from '@/components/brand/Mark';
import { TextLink } from '@/components/ui/TextLink';
import { founderList } from '@/content/founders';
import { footerColumns } from '@/content/navigation';
import { site } from '@/lib/site';

const PRODUCTS = [
  { label: 'DuSu', href: 'https://dusu.ranabrothers.online' },
  { label: 'Edge Verify', href: 'https://ranabrothers.online/edgeverify/' },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto w-full max-w-wide px-4 py-16 min-[400px]:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Link href="/" aria-label="Rana Brothers home" className="inline-flex items-center gap-2.5">
              <Mark id="site-footer" className="h-8 w-8" />
              <span className="text-lg font-semibold tracking-tight">
                Rana <span className="font-serif italic text-xl font-normal text-gold">Brothers</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">{site.description}</p>
            <div className="mt-6 space-y-2 text-sm">
              <p className="eyebrow">Founders</p>
              {founderList.map((f) => (
                <p key={f.id}>
                  <TextLink href={f.url}>{f.name}</TextLink>
                </p>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-sm">
              <p className="eyebrow">Our products</p>
              {PRODUCTS.map((p) => (
                <p key={p.href}>
                  <TextLink href={p.href}>{p.label}</TextLink>
                </p>
              ))}
            </div>
          </div>
          {footerColumns().map((col) => (
            <nav key={col.title} aria-label={`${col.title} links`}>
              <h2 className="eyebrow">{col.title}</h2>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-fg/85 transition-colors hover:text-gold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-hairline pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p>
            {site.descriptor} · {site.locality}, {site.region}, India
          </p>
        </div>
      </div>
    </footer>
  );
}

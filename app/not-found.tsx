import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: { absolute: 'Page not found | Rana Brothers' },
  description: 'This page does not exist. Try the services, AI, work or contact pages instead.',
  // No robots field: Next adds its own noindex to not-found pages, and a second robots meta would conflict.
};

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/ai', label: 'AI' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

export default function NotFound() {
  return (
    <section className="glow-gold">
      <Container className="py-28 sm:py-36">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">This page doesn&apos;t exist</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">The link may be old or mistyped. These pages will get you back on track:</p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex min-h-11 items-center rounded-full border border-hairline px-5 hover:border-gold/50 hover:text-gold">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

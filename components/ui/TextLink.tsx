import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from './Icon';

/** Inline link that opens external URLs in a new tab with an accessible hint. */
export function TextLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  const classes = `text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold ${className}`;
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={`inline-flex items-center gap-1 ${classes}`} target="_blank" rel="noopener">
        {children}
        <Icon name="external" className="h-3.5 w-3.5" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

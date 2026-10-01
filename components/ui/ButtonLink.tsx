import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from './Icon';

const BASE =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors duration-200';
const VARIANTS = {
  primary: 'bg-gold-fill text-on-gold hover:bg-gold',
  ghost: 'border border-hairline text-fg hover:border-gold/50 hover:text-gold',
} as const;

interface Props {
  href: string;
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  arrow?: boolean;
  className?: string;
}

export function ButtonLink({ href, children, variant = 'primary', arrow = false, className = '' }: Props) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;
  const external = /^https?:\/\//.test(href);
  const content = (
    <>
      {children}
      {arrow ? <Icon name="arrow-right" /> : null}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </>
  );
  return external ? (
    <a href={href} className={classes} target="_blank" rel="noopener">
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

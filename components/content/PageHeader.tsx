import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { pageFor } from '@/content/registry';

/** Breadcrumbs (for nested pages), the registry H1, and an optional lead and actions. */
export function PageHeader({ path, lead, eyebrow, children }: { path: string; lead?: ReactNode; eyebrow?: string; children?: ReactNode }) {
  const page = pageFor(path);
  return (
    <header className="glow-gold relative overflow-hidden">
      <Container className="pb-14 pt-12 sm:pb-20 sm:pt-16">
        {path !== '/' ? <Breadcrumbs path={path} /> : null}
        {eyebrow ? <p className="eyebrow mt-8">{eyebrow}</p> : null}
        <h1 className={`${eyebrow ? 'mt-4' : 'mt-8'} max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl`}>{page.h1}</h1>
        {lead ? <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{lead}</div> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </header>
  );
}

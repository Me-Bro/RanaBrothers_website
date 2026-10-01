import type { ReactNode } from 'react';
import { Container } from './Container';

interface Props {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Visually hide the heading (it stays in the document outline). */
  hiddenTitle?: boolean;
}

/** A page section: optional eyebrow, an h2 that labels the section, an optional intro, then content. */
export function Section({ id, eyebrow, title, intro, children, className = '', hiddenTitle = false }: Props) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={`border-t border-hairline py-20 sm:py-28 ${className}`}>
      <Container>
        <div className={hiddenTitle ? 'sr-only' : 'max-w-3xl'}>
          {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
          <h2 id={headingId} className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {intro ? <div className="mt-5 text-lg leading-relaxed text-muted">{intro}</div> : null}
        </div>
        {children ? <div className={hiddenTitle ? '' : 'mt-12'}>{children}</div> : null}
      </Container>
    </section>
  );
}

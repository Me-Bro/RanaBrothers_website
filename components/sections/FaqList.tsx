import type { Faq } from '@/content/types';

/**
 * Native disclosure FAQ (zero JS). The question is plain text inside its summary: browsers expose a summary as a
 * button with presentational children, so a heading there would vanish from the heading outline anyway.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-hairline rounded-2xl border border-hairline bg-surface">
      {items.map((item) => (
        <details key={item.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
            <span className="text-lg font-medium tracking-tight">{item.q}</span>
            <span aria-hidden="true" className="mt-1 font-mono text-gold transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-measure text-[15px] leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

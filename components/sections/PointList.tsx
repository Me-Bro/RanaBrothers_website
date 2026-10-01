import { Icon } from '@/components/ui/Icon';
import type { Step } from '@/content/types';

/** Titled points with a check mark (why-us, values). */
export function PointList({ points }: { points: Step[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {points.map((p) => (
        <li key={p.title} className="flex gap-4">
          <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
            <Icon name="check" className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{p.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

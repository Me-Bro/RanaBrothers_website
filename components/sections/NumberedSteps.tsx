import type { Step } from '@/content/types';

/** Ordered steps with mono numerals 01, 02, … (each item carries data-step for tests). */
export function NumberedSteps({ steps, columns = 5 }: { steps: Step[]; columns?: 3 | 4 | 5 }) {
  const grid = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }[columns];
  return (
    <ol className={`grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 ${grid}`}>
      {steps.map((step, i) => (
        <li key={step.title} data-step="" className="bg-surface p-6">
          <p className="font-mono text-sm text-gold">{String(i + 1).padStart(2, '0')}</p>
          <h3 className="mt-4 text-lg font-semibold tracking-tight">{step.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

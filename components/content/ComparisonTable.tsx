import type { Comparison } from '@/content/types';

export function ComparisonTable({ table }: { table: Comparison }) {
  return (
    // Focusable so keyboard users can scroll the table sideways on narrow screens.
    <div role="region" aria-label={table.caption} tabIndex={0} className="overflow-x-auto rounded-2xl border border-hairline">
      <table className="w-full border-collapse text-left text-[15px]">
        <caption className="border-b border-hairline bg-surface px-5 py-4 text-left text-sm text-muted">{table.caption}</caption>
        <thead>
          <tr>
            {table.columns.map((c) => (
              <th key={c} scope="col" className="border-b border-hairline bg-surface px-5 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.join('|')} className="border-b border-hairline last:border-0">
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="px-5 py-4 align-top font-medium text-fg">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="px-5 py-4 align-top text-muted">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

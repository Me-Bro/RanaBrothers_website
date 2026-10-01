import type { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-wide px-4 min-[400px]:px-6 ${className}`}>{children}</div>;
}

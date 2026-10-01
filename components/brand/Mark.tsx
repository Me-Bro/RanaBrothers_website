import { PETAL_ANGLES, PETAL_PATH } from './petal';

/** Solid gold bloom. `id` must be unique on the page (gradient ids derive from it). */
export function Mark({ id, className, title }: { id: string; className?: string; title?: string }) {
  const gradient = `${id}-gold`;
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="-5" x2="0" y2="-28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F7E9C6" />
          <stop offset=".55" stopColor="#D8B676" />
          <stop offset="1" stopColor="#A87936" />
        </linearGradient>
      </defs>
      <g transform="translate(32 32)">
        {PETAL_ANGLES.map((a) => (
          <path key={a} d={PETAL_PATH} fill={`url(#${gradient})`} transform={`rotate(${a})`} />
        ))}
        <circle r="2.6" fill="#F7E9C6" />
      </g>
    </svg>
  );
}

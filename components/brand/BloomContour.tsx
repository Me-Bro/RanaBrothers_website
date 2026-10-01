import { PETAL_ANGLES, PETAL_PATH } from './petal';

// Three nested outlines per petal, scaled about the petal centre (1.2, -16.5).
const RINGS = [
  { scale: 1, width: 0.9, opacity: 1 },
  { scale: 0.68, width: 1.32, opacity: 0.62 },
  { scale: 0.38, width: 2.37, opacity: 0.34 },
] as const;

/** Line-art bloom: the static poster of the 3D hero and a large decorative mark. Always decorative. */
export function BloomContour({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="#D8B676"
      strokeLinejoin="round"
    >
      <g transform="translate(32 32)">
        {PETAL_ANGLES.map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            {RINGS.map(({ scale, width, opacity }) => (
              <path
                key={scale}
                d={PETAL_PATH}
                strokeWidth={width}
                strokeOpacity={opacity}
                transform={scale === 1 ? undefined : `translate(1.2 -16.5) scale(${scale}) translate(-1.2 16.5)`}
              />
            ))}
          </g>
        ))}
        <circle r="1.9" fill="#D8B676" stroke="none" />
      </g>
    </svg>
  );
}

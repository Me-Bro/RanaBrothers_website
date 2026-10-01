// The Rana Brothers mark as 3D line-art: nested petal outlines plus occluders.
// Pure functions (no three.js) so the shape is unit-testable.
export interface BloomOptions {
  petals: number;
  rings: number;
  segments: number;
  length: number;
  width: number;
  inner: number;
  twist: number;
  cup: number;
  lift: number;
  open: number;
}

export const defaultBloom: BloomOptions = {
  petals: 6,
  rings: 5,
  segments: 24,
  length: 1,
  width: 0.26,
  inner: 0.16,
  twist: 0.1,
  cup: 0.35,
  lift: 0.1,
  open: 0.38,
};

export type Vec3 = [number, number, number];
export type Rgb = [number, number, number];

const ringScales = (rings: number) => Array.from({ length: rings }, (_, i) => 1 - (i * 0.64) / Math.max(1, rings - 1));

/** A point on one petal outline. u: 0 base → 1 tip; side: ±1; scale shrinks the outline about its centre. */
export function outlinePoint(u: number, side: -1 | 1, scale: number, o: BloomOptions, petal = 0): Vec3 {
  const t = 0.5 + (u - 0.5) * scale;
  const half = o.width * scale * Math.sin(Math.PI * u) ** 0.85;
  const x = side * half + o.twist * t * t;
  const y = o.inner + o.length * t;
  const z = o.lift * t * t + (o.cup * half * half) / o.width;
  const yo = y * Math.cos(o.open) - z * Math.sin(o.open);
  const zo = y * Math.sin(o.open) + z * Math.cos(o.open);
  const phi = (petal * 2 * Math.PI) / o.petals;
  return [x * Math.cos(phi) - yo * Math.sin(phi), x * Math.sin(phi) + yo * Math.cos(phi), zo];
}

/** Closed loop for one ring: base → tip along +side, tip → base along -side. */
export function ringLoop(scale: number, o: BloomOptions, petal: number): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i <= o.segments; i++) pts.push(outlinePoint(i / o.segments, 1, scale, o, petal));
  for (let i = o.segments - 1; i >= 1; i--) pts.push(outlinePoint(i / o.segments, -1, scale, o, petal));
  return pts;
}

export interface BloomGeometry {
  /** LineSegments positions (xyz per vertex, 2 vertices per segment). */
  lines: Float32Array;
  /** Per-vertex rgb in 0..1, matching `lines`. */
  colors: Float32Array;
  /** Triangle positions for the background-coloured occluders. */
  occluder: Float32Array;
}

export function buildBloom(
  o: BloomOptions = defaultBloom,
  base: Rgb = [0.353, 0.29, 0.18],
  tip: Rgb = [0.847, 0.714, 0.463],
): BloomGeometry {
  const lines: number[] = [];
  const colors: number[] = [];
  const occluder: number[] = [];
  const scales = ringScales(o.rings);
  for (let p = 0; p < o.petals; p++) {
    scales.forEach((s, ring) => {
      const loop = ringLoop(s, o, p);
      const bright = 1 - (ring / Math.max(1, o.rings - 1)) * 0.55;
      for (let i = 0; i < loop.length; i++) {
        const a = loop[i];
        const b = loop[(i + 1) % loop.length];
        for (const v of [a, b]) {
          lines.push(v[0], v[1], v[2]);
          const along = Math.min(1, Math.max(0, (Math.hypot(v[0], v[1]) - o.inner) / o.length));
          for (let c = 0; c < 3; c++) colors.push((base[c] + (tip[c] - base[c]) * along) * bright);
        }
      }
      if (ring === 0) {
        const centre = outlinePoint(0.5, 1, 0, o, p);
        for (let i = 0; i < loop.length; i++) {
          const a = loop[i];
          const b = loop[(i + 1) % loop.length];
          occluder.push(...centre, ...a, ...b);
        }
      }
    });
  }
  return { lines: new Float32Array(lines), colors: new Float32Array(colors), occluder: new Float32Array(occluder) };
}

import { describe, expect, it } from 'vitest';
import { buildBloom, defaultBloom, outlinePoint, ringLoop } from '@/components/three/bloom-geometry';

describe('bloom geometry', () => {
  const g = buildBloom();
  const loopLen = 2 * defaultBloom.segments;

  it('emits two vertices per segment for every ring of every petal', () => {
    expect(ringLoop(1, defaultBloom, 0)).toHaveLength(loopLen);
    expect(g.lines.length).toBe(defaultBloom.petals * defaultBloom.rings * loopLen * 2 * 3);
    expect(g.colors.length).toBe(g.lines.length);
  });

  it('builds one occluder fan per petal', () => {
    expect(g.occluder.length).toBe(defaultBloom.petals * loopLen * 3 * 3);
  });

  it('closes each petal at its base and tip', () => {
    for (const u of [0, 1]) {
      const a = outlinePoint(u, 1, 1, defaultBloom);
      const b = outlinePoint(u, -1, 1, defaultBloom);
      a.forEach((v, i) => expect(v).toBeCloseTo(b[i], 10));
    }
  });

  it('is symmetric under rotation by one petal step', () => {
    const step = (2 * Math.PI) / defaultBloom.petals;
    for (const u of [0.2, 0.5, 0.8]) {
      const [x, y, z] = outlinePoint(u, 1, 1, defaultBloom, 0);
      const [x1, y1, z1] = outlinePoint(u, 1, 1, defaultBloom, 1);
      expect(x1).toBeCloseTo(x * Math.cos(step) - y * Math.sin(step), 10);
      expect(y1).toBeCloseTo(x * Math.sin(step) + y * Math.cos(step), 10);
      expect(z1).toBeCloseTo(z, 10);
    }
  });

  it('stays inside a bounded radius and opens upwards', () => {
    const limit = (defaultBloom.inner + defaultBloom.length) * 1.2;
    for (let i = 0; i < g.lines.length; i += 3) {
      expect(Math.hypot(g.lines[i], g.lines[i + 1], g.lines[i + 2])).toBeLessThanOrEqual(limit);
    }
    expect(outlinePoint(1, 1, 1, defaultBloom)[2]).toBeGreaterThan(0);
  });

  it('keeps colours in range with tips brighter than bases', () => {
    for (const c of g.colors) {
      expect(c).toBeGreaterThanOrEqual(0);
      expect(c).toBeLessThanOrEqual(1);
    }
    const sum = (i: number) => g.colors[i] + g.colors[i + 1] + g.colors[i + 2];
    expect(sum(3 * defaultBloom.segments)).toBeGreaterThan(sum(0));
  });
});

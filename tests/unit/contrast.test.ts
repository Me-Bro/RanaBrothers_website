import { describe, expect, it } from 'vitest';
import { contrastRatio, relativeLuminance } from '@/lib/contrast';

describe('contrastRatio', () => {
  it('is 21 for black on white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
  });
  it('is 1 for identical colours', () => {
    expect(contrastRatio('#d8b676', '#d8b676')).toBe(1);
  });
  it('is symmetric', () => {
    expect(contrastRatio('#767676', '#ffffff')).toBeCloseTo(contrastRatio('#ffffff', '#767676'), 10);
  });
  it('matches the WCAG reference value for #767676 on white', () => {
    expect(contrastRatio('#767676', '#ffffff')).toBeCloseTo(4.54, 2);
  });
  it('rejects malformed colours', () => {
    expect(() => relativeLuminance('gold')).toThrow();
  });
});

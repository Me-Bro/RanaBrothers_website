import { describe, expect, it } from 'vitest';
import { contrastRatio } from '@/lib/contrast';
import { colors, type ColorToken } from '@/lib/tokens';

const pairs: Array<[string, ColorToken, ColorToken, number]> = [
  ['body text on page', 'fg', 'bg', 7],
  ['body text on cards', 'fg', 'surface', 7],
  ['muted text on page', 'muted', 'bg', 4.5],
  ['muted text on raised cards', 'muted', 'surface2', 4.5],
  ['gold links on page', 'gold', 'bg', 4.5],
  ['gold links on raised cards', 'gold', 'surface2', 4.5],
  ['button label on gold fill', 'onGold', 'goldFill', 4.5],
  ['form field border on page', 'fieldBorder', 'bg', 3],
  ['form field border on cards', 'fieldBorder', 'surface', 3],
];

describe('design tokens meet WCAG contrast', () => {
  it.each(pairs)('%s', (_label, fg, bg, min) => {
    expect(contrastRatio(colors[fg], colors[bg])).toBeGreaterThanOrEqual(min);
  });
});

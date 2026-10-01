import type { Config } from 'tailwindcss';
import { colors } from './lib/tokens';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,mdx}',
    './lib/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        bg: colors.bg,
        surface: colors.surface,
        'surface-2': colors.surface2,
        hairline: colors.hairline,
        'field-border': colors.fieldBorder,
        fg: colors.fg,
        muted: colors.muted,
        gold: colors.gold,
        'gold-fill': colors.goldFill,
        'gold-soft': colors.goldSoft,
        'on-gold': colors.onGold,
        ink: colors.ink,
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      maxWidth: { wide: '75rem', measure: '68ch' },
      keyframes: {
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        'spin-slow': 'spin-slow 90s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;

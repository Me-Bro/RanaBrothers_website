import localFont from 'next/font/local';

// Geist and the serif accent (used by the wordmark in every header) are preloaded; mono labels
// load on demand. display: 'optional' keeps layout shift at zero (the fallback stays if the font is late).
export const sans = localFont({
  src: './fonts/geist-latin-wght.woff2',
  variable: '--font-sans',
  weight: '100 900',
  display: 'optional',
});

export const mono = localFont({
  src: './fonts/geist-mono-latin-wght.woff2',
  variable: '--font-mono',
  weight: '100 900',
  display: 'optional',
  preload: false,
});

export const serif = localFont({
  src: './fonts/instrument-serif-latin-400-italic.woff2',
  variable: '--font-serif',
  weight: '400',
  style: 'italic',
  display: 'optional',
});

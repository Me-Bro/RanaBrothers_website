import type { MetadataRoute } from 'next';
import { colors } from '@/lib/tokens';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rana Brothers',
    short_name: 'Rana Brothers',
    description: 'Software, app and AI development studio.',
    start_url: '/',
    display: 'browser',
    background_color: colors.bg,
    theme_color: colors.bg,
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}

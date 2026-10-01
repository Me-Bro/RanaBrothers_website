// Two modes:
// - NEXT_OUTPUT_EXPORT=1 (every production build): static export to out/.
//   Production headers are served from public/_headers by the host.
// - otherwise (next dev): the dev server applies the same security headers.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Stop `next dev` from writing AGENTS.md/CLAUDE.md into the repo when run from an AI agent's shell.
  agentRules: false,
  ...(process.env.NEXT_OUTPUT_EXPORT === '1'
    ? { output: 'export' }
    : { headers: async () => [{ source: '/:path*', headers: securityHeaders }] }),
};

export default nextConfig;

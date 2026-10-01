import { pages } from '@/content/registry';

export const dynamic = 'force-static';

/** Build-time copy of the page registry for the post-build SEO gate (served with noindex). */
export function GET() {
  return Response.json(pages);
}

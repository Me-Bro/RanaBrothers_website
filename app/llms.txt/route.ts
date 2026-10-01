import { founderList } from '@/content/founders';
import { indexablePages, type PageEntry } from '@/content/registry';
import { absoluteUrl, site } from '@/lib/site';

export const dynamic = 'force-static';

const line = (p: PageEntry) => `- [${p.label}](${absoluteUrl(p.path)}): ${p.description}`;

/** Plain-text summary of the site for AI answer engines, generated from the registry. */
export function GET() {
  const pages = indexablePages();
  const section = (title: string, list: PageEntry[]) => (list.length ? [`## ${title}`, ...list.map(line), ''] : []);
  const body = [
    `# ${site.name}`,
    '',
    `> ${site.disambiguatingDescription}`,
    '',
    site.description,
    '',
    ...section('Services', pages.filter((p) => p.path === '/services' || p.path.startsWith('/services/'))),
    ...section('AI', pages.filter((p) => p.path === '/ai' || p.path.startsWith('/ai/'))),
    ...section('Work', pages.filter((p) => p.path === '/work' || p.path.startsWith('/work/'))),
    ...section('Guides', pages.filter((p) => p.path === '/guides' || p.path.startsWith('/guides/'))),
    ...section('Company', pages.filter((p) => ['/about', '/process', '/faq', '/contact'].includes(p.path))),
    '## Founders',
    ...founderList.map((f) => `- ${f.name}, ${f.role}: ${f.url}`),
    '',
    `Contact: ${site.email}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

// Every /services/* and /ai/* page body, plus the two hub bodies.
import { aiHub } from '@/content/ai/hub';
import { aiPages } from '@/content/ai/pages';
import { pageFor, pagesInGroup, type NavGroup } from '@/content/registry';
import { buildServices } from '@/content/services/build';
import { guidanceServices } from '@/content/services/guidance';
import { servicesHub } from '@/content/services/hub';
import type { ServiceContent } from '@/content/types';

export { aiHub, servicesHub };

export const servicePages: ServiceContent[] = [...buildServices, ...guidanceServices, ...aiPages];

export function serviceContent(path: string): ServiceContent {
  const content = servicePages.find((s) => s.path === path);
  if (!content) throw new Error(`No service content for "${path}"`);
  return content;
}

/** Card data for a navigation group: registry label + content summary. */
export const cardsFor = (group: NavGroup) =>
  pagesInGroup(group).map((p) => ({ href: p.path, title: p.label, text: serviceContent(p.path).summary }));

/** Card data for explicit paths (e.g. related links). */
export const cardsForPaths = (paths: string[]) =>
  paths.map((path) => {
    const page = pageFor(path);
    const content = servicePages.find((s) => s.path === path);
    return { href: path, title: page.label, text: content?.summary ?? page.description };
  });

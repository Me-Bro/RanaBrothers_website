// Navigation is derived from the registry, so menus only ever link to pages that exist.
import { hasPage, pageFor, pagesInGroup, type NavGroup } from '@/content/registry';

export interface NavLink {
  href: string;
  label: string;
}

export interface NavColumn {
  title: string;
  links: NavLink[];
}

const link = (path: string): NavLink => ({ href: path, label: pageFor(path).label });
const existing = (paths: string[]) => paths.filter(hasPage).map(link);

export const groupLinks = (group: NavGroup): NavLink[] => pagesInGroup(group).map((p) => ({ href: p.path, label: p.label }));

/** Plain header links after the Services and AI menus. */
export const primaryLinks = (): NavLink[] => existing(['/work', '/guides', '/about']);

export function footerColumns(): NavColumn[] {
  const columns: NavColumn[] = [
    { title: 'Build', links: groupLinks('build') },
    { title: 'Guidance', links: groupLinks('guidance') },
    { title: 'AI', links: existing(['/ai']).concat(groupLinks('ai')) },
    { title: 'Company', links: existing(['/work', '/process', '/about', '/guides', '/faq', '/contact', '/privacy', '/terms']) },
  ];
  return columns.filter((c) => c.links.length > 0);
}

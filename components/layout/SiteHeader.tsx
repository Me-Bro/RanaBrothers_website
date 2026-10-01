import Link from 'next/link';
import { Mark } from '@/components/brand/Mark';
import { groupLinks, primaryLinks } from '@/content/navigation';
import { hasPage } from '@/content/registry';
import { NavMenus, type Menu } from './NavMenus';

function menus(): Menu[] {
  const all: Menu[] = [
    {
      id: 'services',
      label: 'Services',
      columns: [
        { title: 'Build', links: groupLinks('build') },
        { title: 'Guidance', links: groupLinks('guidance') },
      ].filter((c) => c.links.length > 0),
      overview: hasPage('/services') ? { href: '/services', label: 'All services' } : undefined,
    },
    {
      id: 'ai',
      label: 'AI',
      columns: [{ title: 'AI solutions', links: groupLinks('ai') }].filter((c) => c.links.length > 0),
      overview: hasPage('/ai') ? { href: '/ai', label: 'How we approach AI' } : undefined,
    },
  ];
  return all.filter((m) => m.columns.length > 0);
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-wide items-center justify-between gap-6 px-4 min-[400px]:px-6">
        <Link href="/" aria-label="Rana Brothers home" className="flex items-center gap-2.5 rounded-full">
          <Mark id="site-header" className="h-7 w-7" />
          <span className="text-[17px] font-semibold tracking-tight">
            Rana <span className="font-serif italic text-[19px] font-normal text-gold">Brothers</span>
          </span>
        </Link>
        <NavMenus menus={menus()} links={primaryLinks()} cta={{ href: '/contact', label: 'Get an estimate' }} />
      </div>
    </header>
  );
}

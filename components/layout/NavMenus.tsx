'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState, type FocusEvent } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { NavColumn, NavLink } from '@/content/navigation';

export interface Menu {
  id: string;
  label: string;
  columns: NavColumn[];
  overview?: NavLink;
}

interface Props {
  menus: Menu[];
  links: NavLink[];
  cta: NavLink;
}

const MOBILE = 'mobile';

/**
 * Header navigation: desktop disclosure menus and a mobile panel. A menu closes on Escape (focus returns to its
 * button), on a click outside, when keyboard focus moves out of it, and after navigation.
 */
export function NavMenus({ menus, links, cta }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const panelId = (id: string) => `${uid}-${id}`;
  const triggerId = (id: string) => `${uid}-${id}-trigger`;

  // The header lives in the root layout and never remounts, so close the menu when the route changes
  // (including back and forward).
  const pathname = usePathname();
  const [shownPath, setShownPath] = useState(pathname);
  if (pathname !== shownPath) {
    setShownPath(pathname);
    setOpen(null);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const current = open;
      setOpen(null);
      document.getElementById(`${uid}-${current}-trigger`)?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, uid]);

  useEffect(() => {
    if (open !== MOBILE) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // The panel and its button are hidden from 1024 px up, so a rotation or resize must not leave the page locked.
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (desktop.matches) setOpen(null);
    };
    desktop.addEventListener('change', onChange);
    return () => {
      document.body.style.overflow = previous;
      desktop.removeEventListener('change', onChange);
    };
  }, [open]);

  const toggle = (id: string) => setOpen((current) => (current === id ? null : id));
  const close = () => setOpen(null);
  // Keyboard focus moving outside a menu closes it. A null relatedTarget (a click on plain text inside the
  // panel, or leaving the window) is left to the outside-click handler.
  const closeWhenFocusLeaves = (id: string) => (e: FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget;
    if (next instanceof Node && !e.currentTarget.contains(next)) setOpen((current) => (current === id ? null : current));
  };

  return (
    <div ref={rootRef} className="flex items-center gap-2">
      {/* Desktop */}
      <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
        {menus.map((menu) => (
          <div key={menu.id} className="relative" onBlur={closeWhenFocusLeaves(menu.id)}>
            <button
              id={triggerId(menu.id)}
              type="button"
              aria-expanded={open === menu.id}
              aria-controls={panelId(menu.id)}
              onClick={() => toggle(menu.id)}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[15px] text-fg/90 transition-colors hover:text-gold aria-expanded:text-gold"
            >
              {menu.label}
              <Icon name="chevron-down" className={`h-4 w-4 transition-transform ${open === menu.id ? 'rotate-180' : ''}`} />
            </button>
            <div
              id={panelId(menu.id)}
              hidden={open !== menu.id}
              className="absolute left-0 top-full mt-3 w-max min-w-[18rem] rounded-2xl border border-hairline bg-surface p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
            >
              <div className="flex gap-10">
                {menu.columns.map((col) => (
                  <div key={col.title}>
                    <p className="eyebrow mb-3">{col.title}</p>
                    <ul className="space-y-1">
                      {col.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} onClick={close} className="block rounded-lg px-2 py-1.5 text-[15px] text-fg/90 hover:bg-surface-2 hover:text-gold">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {menu.overview ? (
                <Link href={menu.overview.href} onClick={close} className="mt-5 inline-flex items-center gap-2 border-t border-hairline pt-4 text-sm text-gold">
                  {menu.overview.label}
                  <Icon name="arrow-right" />
                </Link>
              ) : null}
            </div>
          </div>
        ))}
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={close} className="inline-flex min-h-11 items-center rounded-full px-4 text-[15px] text-fg/90 transition-colors hover:text-gold">
            {l.label}
          </Link>
        ))}
        <Link href={cta.href} onClick={close} className="ml-2 inline-flex min-h-11 items-center rounded-full bg-gold-fill px-5 text-[15px] font-medium text-on-gold transition-colors hover:bg-gold">
          {cta.label}
        </Link>
      </nav>

      {/* Mobile */}
      <div className="lg:hidden" onBlur={closeWhenFocusLeaves(MOBILE)}>
        <button
          id={triggerId(MOBILE)}
          type="button"
          aria-expanded={open === MOBILE}
          aria-controls={panelId(MOBILE)}
          onClick={() => toggle(MOBILE)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-4 text-[15px]"
        >
          <Icon name={open === MOBILE ? 'close' : 'menu'} />
          Menu
        </button>
        <div
          id={panelId(MOBILE)}
          hidden={open !== MOBILE}
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-hairline bg-bg px-6 pb-12 pt-8"
        >
          <nav aria-label="Mobile">
            {menus.map((menu) => (
              <div key={menu.id} className="mb-8">
                {menu.columns.map((col) => (
                  <div key={col.title} className="mb-6">
                    <p className="eyebrow mb-3">{menu.columns.length > 1 ? `${menu.label} · ${col.title}` : menu.label}</p>
                    <ul className="space-y-1">
                      {col.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} onClick={close} className="block py-2 text-lg">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                      {menu.overview && col === menu.columns[menu.columns.length - 1] ? (
                        <li>
                          <Link href={menu.overview.href} onClick={close} className="block py-2 text-lg text-gold">
                            {menu.overview.label}
                          </Link>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
            <ul className="space-y-1 border-t border-hairline pt-6">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={close} className="block py-2 text-lg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={cta.href} onClick={close} className="mt-8 inline-flex min-h-11 items-center rounded-full bg-gold-fill px-6 text-base font-medium text-on-gold">
              {cta.label}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

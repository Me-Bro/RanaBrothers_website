import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export interface CardItem {
  href: string;
  title: string;
  text: string;
}

/** Linked cards in a responsive grid (services, AI pages, case studies, guides). */
export function CardGrid({ items, headingLevel = 3 }: { items: CardItem[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="card card-hover group flex h-full flex-col p-7">
            <Heading className="text-xl font-semibold tracking-tight group-hover:text-gold">{item.title}</Heading>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{item.text}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold">
              Learn more
              <Icon name="arrow-right" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

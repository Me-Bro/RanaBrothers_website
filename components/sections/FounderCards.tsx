import { TextLink } from '@/components/ui/TextLink';
import { founderList } from '@/content/founders';

export function FounderCards() {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {founderList.map((f) => (
        <li key={f.id} className="card p-8">
          <p className="eyebrow">{f.role}</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">{f.name}</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{f.bio}</p>
          <p className="mt-6 text-sm">
            <TextLink href={f.aboutUrl}>More about {f.firstName}</TextLink>
          </p>
        </li>
      ))}
    </ul>
  );
}

import { TextLink } from '@/components/ui/TextLink';
import { Container } from '@/components/ui/Container';
import { proof } from '@/content/home';

export function ProofRow() {
  return (
    <section aria-label="Proof" className="border-t border-hairline">
      <Container>
        <ul className="grid divide-y divide-hairline lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {proof.map((item) => (
            <li key={item.label} className="py-7 lg:px-8 lg:first:pl-0">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                {item.href ? <TextLink href={item.href}>{item.label}</TextLink> : item.label}
              </p>
              <p className="mt-2 text-[15px] text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

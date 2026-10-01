import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';

interface Props {
  heading?: string;
  body?: string;
}

export function CtaBand({
  heading = 'Have something to build?',
  body = "Tell us what you're working on. We'll reply with honest next steps, even if that means pointing you elsewhere.",
}: Props) {
  return (
    <section aria-labelledby="cta-band-title" className="border-t border-hairline">
      <Container className="py-20 sm:py-28">
        <div className="glow-gold relative overflow-hidden rounded-3xl border border-hairline bg-surface px-6 py-14 text-center sm:px-12">
          <h2 id="cta-band-title" className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">{body}</p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/contact" arrow>
              Get an estimate
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

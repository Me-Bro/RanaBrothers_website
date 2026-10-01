import { BloomContour } from '@/components/brand/BloomContour';
import { HeroBloom } from '@/components/three/HeroBloom';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/ui/Container';
import { hero } from '@/content/home';
import { hasPage, pageFor } from '@/content/registry';

export function HomeHero() {
  const h1 = pageFor('/').h1;
  const accentAt = h1.lastIndexOf(hero.accent);
  const lead = accentAt > 0 ? h1.slice(0, accentAt) : h1;
  return (
    <section aria-labelledby="hero-title" className="grain glow-gold relative overflow-hidden">
      <Container className="relative grid items-center gap-12 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.08fr_0.92fr] lg:pb-28">
        <div className="relative z-10">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="mt-6 text-[2.75rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.5rem]">
            {lead}
            {accentAt > 0 ? <span className="font-serif italic font-normal text-gold">{hero.accent}</span> : null}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{hero.sub}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact" arrow>
              Get an estimate
            </ButtonLink>
            {hasPage('/work') ? (
              <ButtonLink href="/work" variant="ghost">
                See our work
              </ButtonLink>
            ) : null}
          </div>
        </div>
        <div
          data-bloom-poster=""
          className="pointer-events-none absolute right-[-18%] top-6 h-[22rem] w-[22rem] opacity-20 sm:h-[28rem] sm:w-[28rem] lg:pointer-events-auto lg:relative lg:right-auto lg:top-auto lg:mx-auto lg:h-[32rem] lg:w-[32rem] lg:opacity-100"
        >
          <HeroBloom>
            <BloomContour className="h-full w-full animate-spin-slow" />
          </HeroBloom>
        </div>
      </Container>
    </section>
  );
}

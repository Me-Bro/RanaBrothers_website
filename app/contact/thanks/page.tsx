import { PageHeader } from '@/components/content/PageHeader';
import { CardGrid } from '@/components/sections/CardGrid';
import { Container } from '@/components/ui/Container';
import { cardsForPaths } from '@/content/service-pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta('/contact/thanks');

export default function ThanksPage() {
  return (
    <>
      <PageHeader
        path="/contact/thanks"
        lead={<p>Your project details reached us. We read every message ourselves and reply with questions or next steps.</p>}
      />
      <section aria-label="Worth reading while you wait" className="border-t border-hairline py-14 sm:py-20">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight">Worth reading while you wait</h2>
          <div className="mt-8">
            <CardGrid
              items={cardsForPaths(['/process', '/guides/how-to-build-an-mvp', '/guides/how-to-choose-a-software-development-company'])}
            />
          </div>
        </Container>
      </section>
    </>
  );
}

import { PageHeader } from '@/components/content/PageHeader';
import { ContactForm } from '@/components/forms/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { contact } from '@/content/company/contact';
import { pageMeta } from '@/lib/meta';
import { graph, webPageNode } from '@/lib/schema';
import { absoluteUrl, site } from '@/lib/site';

export const metadata = pageMeta('/contact');

// VERIFY: set NEXT_PUBLIC_WEB3FORMS_KEY in the deploy environment (a Web3Forms key registered to the studio's own email)
const FORM_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '';

export default function ContactPage() {
  return (
    <>
      <PageHeader path="/contact" lead={<p>{contact.intro}</p>} />
      <section aria-label="Project form" className="border-t border-hairline py-14 sm:py-20">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            {FORM_KEY ? (
              <ContactForm accessKey={FORM_KEY} thanksUrl={absoluteUrl('/contact/thanks')} email={site.email} />
            ) : (
              <div className="card p-8">
                <h2 className="text-2xl font-semibold tracking-tight">Email us your project</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-muted">
                  Send a few lines about what you are building, who it is for and when you need it. A short message is enough to start.
                </p>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent('Project enquiry')}`}
                  className="mt-6 inline-flex min-h-11 items-center rounded-full bg-gold-fill px-6 text-[15px] font-medium text-on-gold hover:bg-gold"
                >
                  Email {site.email}
                </a>
              </div>
            )}
          </div>
          <aside aria-label="What happens next" className="card h-fit p-6">
            <h2 className="eyebrow">What happens next</h2>
            <ol className="mt-5 space-y-5">
              {contact.nextSteps.map((s, i) => (
                <li key={s.title}>
                  <p className="font-mono text-sm text-gold">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-1 font-semibold">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-hairline pt-5 text-sm text-muted">
              Or email <a href={`mailto:${site.email}`} className="text-gold underline underline-offset-4">{site.email}</a>
            </p>
          </aside>
        </Container>
      </section>
      <JsonLd data={graph(webPageNode('/contact'))} />
    </>
  );
}

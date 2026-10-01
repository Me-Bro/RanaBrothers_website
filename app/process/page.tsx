import { PageHeader } from '@/components/content/PageHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { FaqList } from '@/components/sections/FaqList';
import { JsonLd } from '@/components/seo/JsonLd';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { processContent } from '@/content/company/process';
import { pageMeta } from '@/lib/meta';
import { graph, webPageNode } from '@/lib/schema';

export const metadata = pageMeta('/process');

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        path="/process"
        lead={
          <div className="space-y-4">
            {processContent.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        }
      />
      <Section id="steps" eyebrow="Five steps" title="From first call to steady support">
        <ol className="space-y-5">
          {processContent.steps.map((step, i) => (
            <li key={step.title} className="card grid gap-6 p-7 md:grid-cols-[14rem_1fr_1fr]">
              <div>
                <p className="font-mono text-sm text-gold">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.summary}</p>
              </div>
              <div>
                <p className="eyebrow">What happens</p>
                <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-fg/90">
                  {step.whatHappens.map((w) => (
                    <li key={w} className="flex gap-2">
                      <span aria-hidden="true" className="text-gold">
                        ·
                      </span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow">You get</p>
                <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-fg/90">
                  {step.youGet.map((y) => (
                    <li key={y} className="flex gap-2">
                      <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-gold" />
                      {y}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <Section id="models" eyebrow="Engagement models" title="Three ways to work together">
        <ul className="grid gap-5 md:grid-cols-3">
          {processContent.engagementModels.map((m) => (
            <li key={m.name} className="card p-7">
              <h3 className="text-xl font-semibold tracking-tight">{m.name}</h3>
              <p className="mt-3 text-[15px] text-gold">{m.bestFor}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{m.howItWorks}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section id="communication" eyebrow="Communication" title="How you stay in the loop">
        <ul className="max-w-measure space-y-3 text-[17px] leading-relaxed text-fg/85">
          {processContent.communication.map((c) => (
            <li key={c} className="border-l-2 border-hairline pl-4">
              {c}
            </li>
          ))}
        </ul>
      </Section>
      <Section id="faq" eyebrow="FAQ" title="Questions about the process">
        <FaqList items={processContent.faqs} />
      </Section>
      <CtaBand />
      <JsonLd data={graph(webPageNode('/process'))} />
    </>
  );
}

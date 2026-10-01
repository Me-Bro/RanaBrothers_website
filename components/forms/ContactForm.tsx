'use client';

import { useRef, useState, type FormEvent } from 'react';

const ENDPOINT = 'https://api.web3forms.com/submit';

const NEEDS = ['New app or software', 'AI solution', 'Guidance / consulting', 'Improve an existing product', 'Something else'];
// VERIFY: budget bands shown on the contact form
const BUDGETS = ['Not sure yet', 'Under ₹2 lakh', '₹2–5 lakh', '₹5–15 lakh', '₹15 lakh or more'];
const TIMELINES = ['As soon as possible', '1–3 months', '3–6 months', 'Just exploring'];

const field =
  'mt-2 block w-full rounded-xl border border-field-border bg-surface px-4 py-3 text-[16px] text-fg placeholder:text-muted/70 focus:border-gold focus:outline-none';
const label = 'block text-[15px] font-medium text-fg';

interface Props {
  accessKey: string;
  thanksUrl: string;
  email: string;
}

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

/** Project enquiry form. Works without JavaScript (native POST); with JavaScript it submits inline. */
export function ContactForm({ accessKey, thanksUrl, email }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<HTMLElement>(':invalid');
      firstInvalid?.focus();
      form.reportValidity();
      return;
    }
    setStatus({ kind: 'sending' });
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!res.ok || json.success === false) throw new Error(json.message || 'The message could not be sent.');
      form.reset();
      setStatus({ kind: 'sent' });
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'The message could not be sent.' });
    }
  };

  return (
    <form ref={formRef} method="POST" action={ENDPOINT} onSubmit={onSubmit} noValidate className="space-y-6">
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="subject" value="New project enquiry — ranabrothers.online" />
      <input type="hidden" name="from_name" value="ranabrothers.online" />
      <input type="hidden" name="redirect" value={thanksUrl} />
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            Name <span className="text-muted">(required)</span>
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>
            Email <span className="text-muted">(required)</span>
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor="cf-phone" className={label}>
            Phone or WhatsApp
          </label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div>
          <label htmlFor="cf-company" className={label}>
            Company
          </label>
          <input id="cf-company" name="company" type="text" autoComplete="organization" className={field} />
        </div>
        <div>
          <label htmlFor="cf-need" className={label}>
            What do you need? <span className="text-muted">(required)</span>
          </label>
          <select id="cf-need" name="need" required defaultValue="" className={field}>
            <option value="" disabled>
              Choose one
            </option>
            {NEEDS.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-budget" className={label}>
            Budget
          </label>
          <select id="cf-budget" name="budget" defaultValue={BUDGETS[0]} className={field}>
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-timeline" className={label}>
            Timeline
          </label>
          <select id="cf-timeline" name="timeline" defaultValue={TIMELINES[3]} className={field}>
            {TIMELINES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={label}>
          Tell us about the project <span className="text-muted">(required)</span>
        </label>
        <textarea id="cf-message" name="message" required rows={6} className={field} />
      </div>

      <div>
        <label htmlFor="cf-source" className={label}>
          How did you hear about us?
        </label>
        <input id="cf-source" name="source" type="text" className={field} />
      </div>

      <div className="flex items-start gap-3">
        <input id="cf-consent" name="consent" type="checkbox" required value="yes" className="mt-1 h-5 w-5 accent-[#c8a15a]" />
        <label htmlFor="cf-consent" className="text-[15px] leading-relaxed text-muted">
          I agree to the{' '}
          <a href="/privacy" className="text-gold underline underline-offset-4">
            privacy policy
          </a>
          . <span className="text-muted">(required)</span>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status.kind === 'sending'}
          className="inline-flex min-h-11 items-center rounded-full bg-gold-fill px-6 text-[15px] font-medium text-on-gold transition-colors hover:bg-gold disabled:opacity-60"
        >
          {status.kind === 'sending' ? 'Sending…' : 'Send project details'}
        </button>
        <p className="text-sm text-muted">
          Prefer email? <a href={`mailto:${email}`} className="text-gold underline underline-offset-4">{email}</a>
        </p>
      </div>

      <div aria-live="polite" role="status" data-form-status="" className="min-h-6 text-[15px]">
        {status.kind === 'sent' ? <p className="text-gold">Thanks, we have your message. We&apos;ll reply with next steps.</p> : null}
        {status.kind === 'error' ? (
          <p className="text-fg">
            {status.message} Please try again, or email us at{' '}
            <a href={`mailto:${email}`} className="text-gold underline underline-offset-4">
              {email}
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}

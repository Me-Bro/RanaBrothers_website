import type { Step } from '@/content/types';

export const hero = {
  eyebrow: 'Software & AI development studio · India',
  accent: 'in production.',
  sub: 'Rana Brothers is a small senior team that designs, builds and runs web apps, mobile apps and AI products for startups and growing businesses, from the first call to launch and the years after.',
};

export const proof = [
  { label: 'DuSu', text: 'Voice-first AI English coach · 200+ users', href: 'https://dusu.ranabrothers.online' },
  { label: 'Edge Verify', text: 'Backtesting on 8 years of NSE data', href: 'https://ranabrothers.online/edgeverify/' },
  { label: 'RootEd', text: 'Multi-tenant school management platform', href: 'https://rooted.ranabrothers.online' },
  { label: 'Founder-led', text: 'You work with the people who build it' },
];

export const processSteps: Step[] = [
  // VERIFY: is the first discovery call free, and is 30 minutes the usual length?
  { title: 'Discovery call', body: '30 minutes on the problem, the users and the constraints.' },
  { title: 'Scope & estimate', body: 'A written scope with milestones, a fixed quote or a time-and-materials estimate, and the risks we see.' },
  // VERIFY: sprint cadence (one to two weeks)
  { title: 'Design & build', body: 'Short sprints, with a working build to review every one to two weeks.' },
  // VERIFY: store submission as part of every launch (store-launch delivery is unconfirmed; see the VERIFY on the mobile app page in registry.ts)
  { title: 'Launch', body: 'Testing, deployment, store submission and monitoring set up before go-live.' },
  { title: 'Support & grow', body: 'Fixes, improvements and a handover your team can follow.' },
];

export const whyUs: Step[] = [
  { title: 'Founders on your project', body: 'You talk to the people who design and write the code.' },
  { title: 'Reliable by design', body: 'Correct, tested and observable before anything is optimised.' },
  { title: 'Built for the next stage', body: 'Architecture sized for where the product is going, not just launch week.' },
  { title: 'No black boxes', body: 'Readable code, written decisions and a clean handover.' },
  { title: 'AI where it earns its place', body: 'We add AI when it measurably helps, and say so when something simpler is better.' },
];

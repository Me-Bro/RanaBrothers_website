// Copy for the /blog hub. The post cards come from the registry; this file holds the prose around them.
import type { HubContent } from '@/content/types';

export const blogHub: HubContent = {
  intro: [
    'This is where the engineers at Rana Brothers write about software and AI as we see them while building products: what is changing, what it costs and what it means for founders and teams who have to make decisions with it.',
    'Posts are dated and written by a named author. They are opinions and notes, not advice for your specific situation, and we say so where a claim comes from a source we did not produce ourselves.',
  ],
  sections: [
    {
      title: 'Blog or guides: which to read',
      body: [
        'The blog is for timely writing: a shift in the market, a pattern we keep seeing, a lesson from a build. A post reflects what we knew on the day it was published, and its date is shown at the top.',
        'The guides are for evergreen how-to material, such as how to build an MVP or how to choose a software development company. If you need steps and a checklist, start there. If you want our view on something that is moving, start here.',
      ],
    },
    {
      title: 'How we write these posts',
      body: [
        'Where a post uses figures from outside sources, it links to them so you can check the original. We treat early reports and forecasts as exactly that, and we mark the difference between what happened and what we expect to happen.',
        'We do not publish statistics we cannot source, and we do not rate or review ourselves. If a post turns out to be wrong, we update it and show the updated date.',
      ],
    },
    {
      title: 'When a post raises a question about your project',
      body: [
        'A post cannot see your product, your budget or your vendors. If one of them makes you want a second opinion on how you use AI, how locked in you are to a single provider or what a feature will cost to run, software consulting is the place to start. If you are ready to add AI to something that already exists, see LLM integration.',
      ],
    },
  ],
  faqs: [
    {
      q: 'How often do you publish?',
      a: 'There is no fixed schedule. We publish when we have something worth saying, and each post shows its publication date.',
    },
    {
      q: 'Who writes the blog?',
      a: 'The founders of Rana Brothers, Vibhanshu Rana and David Singh Rana. Each post names its author.',
    },
    {
      q: 'Is the content on the blog professional advice?',
      a: 'No. Posts are general information and opinion. Financial, legal and similar topics need advice that fits your situation from a qualified professional.',
    },
  ],
};

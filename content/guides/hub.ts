// Copy for the /guides hub. The guide cards come from the registry; this file holds the prose around them.
import type { HubContent } from '@/content/types';

export const guidesHub: HubContent = {
  intro: [
    'These guides answer the questions founders and business owners ask before they spend money on software: how to build a minimum viable product without building too much, and how to tell a dependable development company from a risky one.',
    'Each guide is practical: steps in order, a worksheet or checklist you can use as it stands, and the trade-offs we would point out on a call. They are written by the engineers at Rana Brothers who scope and build these products, and none of them requires you to hire us.',
  ],
  sections: [
    {
      title: 'Which guide to read first',
      body: [
        'If you have an idea and no product yet, start with how to build an MVP. It takes you from validating the problem to measuring a launch in seven steps, and its scope-cutting worksheet helps you decide which features to cut, fake or build.',
        'If you know what to build and are choosing who builds it, read how to choose a software development company. Its 20-point checklist covers proof of work, who does the building, process, contracts and IP, pricing and red flags, and it ends with the questions to ask on a first call.',
        'Most founders need both, in that order: decide what the first version is, then choose who builds it. A clear scope makes every quote you receive easier to compare.',
      ],
    },
    {
      title: 'How we write the guides',
      body: [
        'We write down what we have seen work and say plainly where the answer depends on your situation. There are no invented statistics or price lists. Where costs or timelines come up, the guides explain what drives them, so you can test any quote or schedule you are given.',
        'Each guide names its author and the date it was published, and we update a guide when the advice in it changes.',
      ],
    },
    {
      title: 'When a guide is not enough',
      body: [
        'A guide cannot see your project. If you have worked through the MVP worksheet or the vendor checklist and still have a decision to make, software consulting gives you a second opinion on scope, stack or vendors before you commit. If a build has already stalled, project rescue starts with an audit of what exists and a plan to finish it.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Can I use the worksheet and checklist with another company?',
      a: 'Yes. Use them with any development partner, including one that is not us. They work best when every company you talk to answers the same questions.',
    },
    {
      q: 'Who writes the guides?',
      a: 'The founders of Rana Brothers, Vibhanshu Rana and David Singh Rana, who work hands-on on client projects. Each guide names its author.',
    },
    {
      q: 'Can you review my MVP scope or a proposal from another company?',
      a: 'Yes. Send it through the contact page and say what decision you need to make. A review like this is part of our software consulting work, and we will tell you plainly if the proposal looks sound.',
    },
  ],
};

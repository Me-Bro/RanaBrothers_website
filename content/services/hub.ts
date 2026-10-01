// Copy for the /services hub. The service cards come from the registry; this file holds the prose around them.
import type { HubContent } from '@/content/types';

export const servicesHub: HubContent = {
  intro: [
    'Software development services cover the work of turning a business need into working, maintained software: scoping, design, development, testing, release and support after launch. Rana Brothers is a studio for software, apps and AI, run by two brothers, Vibhanshu Rana and David Singh Rana, from Khatima, Uttarakhand, India, working remotely. The founders do hands-on work on client projects.',
    'This page helps you choose where to start. The build services make something: web apps, mobile apps, MVPs, custom software, cloud and DevOps, and maintenance. The guidance services help you decide what to make, or recover a build that has stalled. Whichever you pick, we put reliability before speed and hand over software that your team can understand and run.',
  ],
  sections: [
    {
      title: 'How to choose the right service',
      body: [
        'Start from your situation, not from the technology. Three questions narrow the choice quickly. What stage is the product at: an idea, a build in progress or a live system? Who uses it, and on which devices? What does it cost you if the first version is wrong?',
        'With an idea and no product, start with MVP development: one core journey, launched to real users. If a process has outgrown spreadsheets and packaged tools, look at custom software. If customers or staff work in a browser, web app development fits. If they live on their phones, mobile app development begins with the choice of route: an installable web app, a native app or a cross-platform one.',
        'If releases are manual, hosting is expensive or failures surprise you, cloud and DevOps is the fix. If something is live and needs looking after, or its original developer has left, maintenance and support covers it. If you cannot tell which of these you need, begin with guidance: software consulting for a decision, a fractional CTO for ongoing technical leadership, or project rescue for a stalled project.',
      ],
    },
    {
      title: 'Engagement models',
      body: [
        'We can work in three ways. This page gives no prices, because a price without a scope is a guess.',
        'Fixed scope. We agree the outcome, a written scope and the milestones, then deliver against them. It suits work you can describe up front, such as an MVP with one core journey, an internal tool for a known process or a migration. Changes after sign-off are scoped and agreed before work on them begins.',
        'Monthly retainer. A recurring arrangement for continuous work: maintenance, a steady flow of small improvements, monitoring and technical advice. We write down what a month covers and prioritise the work with you. It suits live products that need steady care.',
        'Time and materials. You pay for the time spent, with regular reports on what was done. It suits discovery and exploratory work, where the problem is clear but the solution is not, and backlogs that change every week. You steer; the trade-off is that cost is open-ended unless you set a ceiling.',
        'A common pattern is a fixed-scope build followed by a monthly arrangement after launch. If you are unsure which fits, describe the project and we will recommend one in the first conversation.',
      ],
    },
    {
      title: 'What every project includes',
      body: [
        'Three things are constant, whichever model you choose.',
        'A scope document. Before we write code, we write down what we will build and what we will not: users and roles, main journeys, data and integrations, constraints and how the work will be judged finished. We agree it with you before we start, and it is the reference for every later estimate and change.',
        'Demos. You see working software as it is built, not only at the end. Regular demos show real progress, give you the chance to redirect early and keep surprises small.',
        'A handover. Documentation, deployment steps and a walkthrough with your team, so the system is never a black box. Support after launch is available if you want it, and it is optional.',
      ],
    },
  ],
  faqs: [
    {
      q: 'What is included in software development services?',
      a: 'Software development services cover turning a business need into working software: scoping, design, development, testing, deployment and support after launch. With us, every project includes a written scope document, regular demos and a documented handover. Hosting fees, third-party licences and app-store accounts are separate costs, normally paid to those providers directly.',
    },
    {
      q: 'Custom software or off-the-shelf: which is better?',
      a: 'Buy off-the-shelf software when a mature product fits most of your process and its price stays sensible as you grow. Commission custom software when your workflow is the part of the business that makes it different, or when you keep paying for workarounds. If you cannot tell which applies, software consulting can settle the question before you commit to a build.',
    },
    {
      q: 'Which engagement model fits my project?',
      a: 'Fixed scope fits work you can describe up front, a monthly arrangement fits continuous work on a live product, and time and materials fits exploratory work where the answer is not yet known. If the scope is clear but you expect to learn as you go, a fixed-scope build in milestones keeps both flexibility and a boundary.',
    },
    {
      q: 'How long does a typical project take?',
      a: 'There is no honest typical duration, because projects differ mainly in scope. A first release built around one core journey takes far less time than a platform with several user roles and integrations. A schedule follows the scope document, not the other way round, and milestones let you use finished parts early.',
    },
  ],
};

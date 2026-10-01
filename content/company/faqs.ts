import type { FaqGroup } from '@/content/types';

export const faqGroups: FaqGroup[] = [
  {
    title: 'Contracts & IP',
    items: [
      {
        q: 'Will you sign an NDA before I share my idea?',
        // VERIFY: NDA policy (we sign an NDA before details are shared)
        a: 'Yes. We are happy to sign an NDA before you share details. If you would rather start with a general description of the problem, we can begin at that level and bring in the NDA when you are ready to go into specifics.',
      },
      {
        q: 'Who owns the code you write for us?',
        // VERIFY: IP and source-code ownership (client owns custom code once the agreed payments are complete; open-source and pre-existing tools excluded; set out in a written agreement)
        a: 'You do. Once the payments agreed for your project are complete, the source code we write specifically for you belongs to you. Two things sit outside that: open-source and other third-party components, which stay under their own licences, and general-purpose tools we had before your project, which we keep. We set this out in a written agreement before work starts.',
      },
      {
        q: 'What happens if we want to switch to another team later?',
        // VERIFY: handover when switching teams (source code, setup and deployment notes, architecture overview, handover session) and the advice to open accounts in the client name
        a: 'That is fine, and we build with it in mind. We document the system and hand over what a new team needs: the source code, setup and deployment notes, and an overview of the architecture. We can also run a handover session. We suggest that hosting, domain and third-party accounts are opened in your name from the start, so nothing depends on us.',
      },
    ],
  },
  {
    title: 'Payments',
    items: [
      {
        q: 'How do payments work?',
        // VERIFY: payment schedule (milestone-linked for fixed scope, monthly for retainers, periodic for time and materials; whether any advance applies)
        a: 'We agree the payment schedule in writing before work starts, and it follows the engagement model. A fixed-scope project is usually paid in stages linked to milestones. A monthly retainer is paid monthly. Time-and-materials work is paid at regular intervals against the time reported.',
      },
      {
        q: 'Which currencies do you work in?',
        // VERIFY: currencies accepted (INR and USD) and payment methods
        a: 'We can agree payment in Indian rupees (INR) or US dollars (USD), depending on where you are based. We confirm the currency and the payment method when we agree the scope, so both sides know what to expect.',
      },
      {
        q: 'Is anything not included in your estimate?',
        a: 'Our written estimate lists what it covers and what it does not. Costs that commonly sit outside a development estimate include hosting and cloud services, domain names, app-store developer accounts, paid third-party APIs and usage charges from AI model providers. We flag the ones we expect for your project in the scope, so none arrives as a surprise.',
      },
    ],
  },
  {
    title: 'Working together',
    items: [
      {
        q: 'Who will work on my project?',
        a: 'The founders, Vibhanshu Rana and David Singh Rana, work on client projects directly. Vibhanshu works mainly in Python, Ruby on Rails, Node.js and React/Next.js, and builds retrieval-augmented generation (RAG) pipelines. David works across the backend, the front end and DevOps, mostly with FastAPI, WebSockets, Postgres and Docker. You deal with the people doing the work.',
      },
      {
        q: 'Which time zones do you work in?',
        // VERIFY: time-zone coverage (IST base, agreed overlap window for clients elsewhere)
        a: 'We work from India, on Indian Standard Time (UTC+5:30). For clients in other time zones, we agree a regular overlap window for calls and demos at kickoff. Everything else happens in writing, so nobody has to wait for a meeting to move a project forward.',
      },
      {
        q: 'Can you work on an existing product or codebase?',
        a: 'Yes, once we have reviewed it. We read the code, the architecture and the hosting setup, then tell you plainly what is sound, what is risky and whether it makes more sense to build on it, refactor it or rebuild parts of it. The review is part of our technical consulting, and it comes before any commitment to build.',
      },
      {
        q: 'Do you work with early-stage startups?',
        a: 'Yes. We build MVPs for startups, and a clear description of the problem is enough to start the conversation. You do not need a specification. Part of our job is helping you decide what belongs in a first release and what can wait.',
      },
    ],
  },
  {
    title: 'After launch',
    items: [
      {
        q: 'Do you support the product after launch?',
        // VERIFY: post-launch support terms (what is covered, monthly or as-needed, any warranty period)
        a: 'Yes. We offer support after launch and agree with you what it covers, for example fixing defects, applying updates and making small improvements. It can be a monthly arrangement or help when you need it.',
      },
      {
        q: 'What ongoing costs should I expect after launch?',
        a: 'Ongoing costs depend on the design, and they usually come from four places: hosting and infrastructure, third-party services, AI model usage if the product uses AI, and the time needed to maintain it. We estimate them during scoping and design with them in mind. DuSu, our own product, uses the built-in speech features of the browser and lets users bring their own model keys, which is one way to keep running costs down.',
      },
      {
        q: 'Can my own team take over after launch?',
        a: 'Yes. Knowledge transfer to your team is part of how we support products after launch. We document how the system is built and run and walk your engineers through it, so they can take over as much of the day-to-day work as you want. We stay involved for the parts you would rather not run yourselves.',
      },
    ],
  },
  {
    title: 'AI & data',
    items: [
      {
        q: 'Do you use our data to train AI models?',
        // VERIFY: data-use policy (client data is not used to train models; disclosure of which AI providers receive client data)
        a: 'No. We use your data only to do the work you have asked for, and we do not use it to train models. If a project sends data to a third-party AI provider, we tell you which provider receives what before we build it, so you can decide whether that is acceptable.',
      },
      {
        q: 'Which AI models and providers do you work with?',
        a: 'We choose models for the job and avoid tying a product to a single provider. DuSu, for example, runs a chain of Groq, Gemini and OpenRouter, ordered by measured latency. For document question-answering, we build retrieval-augmented generation (RAG) systems, such as CloudDocSense, which answers with cited sources.',
      },
      {
        q: 'What happens when the AI gets something wrong?',
        a: 'We design for it. Language models can be wrong, so we show sources where we can, label estimated outputs as estimates and add checks around anything that matters. CloudDocSense answers with cited sources so that people can verify an answer, and DuSu labels its scores as AI-estimated.',
      },
    ],
  },
];

import type { ProcessContent } from '@/content/types';

export const processContent: ProcessContent = {
  intro: [
    'Our software development process has five steps: a discovery call, scope and estimate, design and build, launch, and support and growth. Each step ends with something you can read, review or run, so you always know where the project stands and what happens next.',
    'The founders work on client projects directly, so the people you speak to in the first call are the people shaping the work. Below, we set out how we build software at each step, what you receive, the ways we can work together and how we keep you informed.',
  ],
  steps: [
    {
      title: 'Discovery call',
      summary:
        'The discovery phase is a conversation about the problem, the people who have it and what success looks like, before anyone proposes a solution. It matters because misunderstandings are cheapest to fix before any code exists.',
      whatHappens: [
        'You tell us what you want to achieve, who will use the product and what is not working today.',
        'We ask about constraints: deadlines, existing systems and data, integrations and any compliance needs.',
        'We say plainly whether we are a good fit, and whether a smaller first step would serve you better.',
        'We agree what we still need to learn before a scope can be written.',
      ],
      youGet: [
        'An honest view of whether and how we can help.',
        'Early notes on risks, options and open questions.',
        'A short list of anything we need from you next.',
      ],
    },
    {
      title: 'Scope & estimate',
      summary: 'We turn the conversation into a written scope that you can read, question and compare.',
      whatHappens: [
        'We write down what is in the first release and what is deliberately left out.',
        'We list assumptions, dependencies and open questions, such as third-party services, data you will supply and decisions still to be made.',
        'We estimate the effort and recommend an engagement model, as described below.',
        'We agree how changes to the scope will be handled.',
      ],
      youGet: [
        'A scope in plain language, with milestones where they help.',
        'An estimate and a recommended engagement model, with our reasoning.',
        'The chance to question every line before any work begins.',
      ],
    },
    {
      title: 'Design & build',
      summary:
        'We design the architecture and the main user flows, then build in short sprints so you can see real progress and steer while changes are still inexpensive.',
      whatHappens: [
        'We settle the architecture and the main user flows first, and we note the trade-offs behind each choice.',
        'We build in short sprints and show working software rather than status slides.',
        'We test as we build, and we write down how the system fits together as we go.',
        'We raise risks and scope questions when we see them, not at the end.',
      ],
      youGet: [
        'Demos of working software that you can try and react to.',
        'Documentation that is written alongside the code.',
        'A say in priorities at every review.',
      ],
    },
    {
      title: 'Launch',
      summary: 'A release is planned, tested and watched, not improvised on the day.',
      whatHappens: [
        'We run a final round of testing against the scope we agreed.',
        'We prepare the production environment, the configuration and a plan for rolling back if a release goes wrong.',
        'We release, then keep a close watch on the product straight afterwards.',
        'We walk your team through how the system runs and where everything lives.',
      ],
      youGet: [
        'A live product that matches the agreed scope.',
        'Handover notes covering deployment, configuration and day-to-day running.',
        'A short list of known issues and suggested next steps.',
      ],
    },
    {
      title: 'Support & grow',
      summary: 'Launch is when real usage starts. We stay on hand to keep the product healthy and to plan what comes next.',
      whatHappens: [
        'We agree what ongoing support covers for your product, such as fixing defects, applying updates and handling small changes.',
        'We review how people actually use the product and propose what to improve next.',
        'We transfer knowledge to your team, so they can take on as much of the running and development as they wish.',
        'We plan the next stage with you, whether that means new features, more users or a change of architecture.',
      ],
      youGet: [
        'A support arrangement that fits what the product needs.',
        'A prioritised list of improvements, based on real usage.',
        'Knowledge your own team can use.',
      ],
    },
  ],
  engagementModels: [
    {
      name: 'Fixed scope',
      bestFor:
        'Work that can be defined up front, such as an MVP, a set of features or a migration, when you want to know what is included before we begin.',
      howItWorks:
        'We agree the scope in writing and split it into milestones. We deliver against each milestone, and we discuss any change to the scope with you, and agree it in writing, before work on the change starts.',
    },
    {
      name: 'Monthly retainer',
      bestFor: 'Ongoing product development, maintenance or support, where priorities shift from month to month.',
      howItWorks:
        'We agree a regular monthly commitment and work through a shared, prioritised list, which you can reorder at each planning point. A project can start with a fixed-scope first release and move to a retainer after launch.',
    },
    {
      name: 'Time and materials',
      bestFor:
        'Exploratory or fast-changing work where the scope cannot be fixed yet, such as early product discovery or a technical investigation.',
      howItWorks:
        'We work on the agreed priorities and report the time spent against what was delivered. We can agree a budget ceiling and review points up front, so the work stays within limits you choose.',
    },
  ],
  communication: [
    // VERIFY: default demo cadence (a working build every one to two weeks) and written updates in between
    'By default, you see a working build every one to two weeks, in a short demo, with a brief written update in between.',
    'We agree the channels and the rhythm at kickoff, and we use the tools you already work in wherever that is practical.',
    'Anything that blocks progress is raised straight away instead of waiting for the next meeting.',
    'Decisions, scope changes and open questions are written down, so there is always a record of what was agreed.',
  ],
  faqs: [
    {
      q: 'What do you need from me to get started?',
      a: 'A clear description of the problem you want to solve, the people who will use the solution and what success looks like. Anything that already exists helps: designs, documents, spreadsheets or access to current systems. It also helps to name one person who can make decisions and give feedback promptly, because a project moves at the pace of its decisions.',
    },
    {
      q: 'How often will I see progress?',
      a: 'Often enough that nothing comes as a surprise. We agree a rhythm of demos and written updates at kickoff, and you see working software as the project moves, not only at the end.',
    },
    {
      q: 'What happens if requirements change?',
      a: 'Change is normal, and we plan for it. When something changes, we talk through what it means for scope, effort and timing before work continues, and we record the decision. In a fixed-scope project that can mean adjusting the scope in writing. In a retainer or a time-and-materials arrangement it usually means reordering priorities at the next planning point.',
    },
    {
      q: 'How long will my project take?',
      a: 'It depends on scope, so we do not quote a duration before we understand the problem. The main drivers are the number of features, the platforms involved, the integrations with other systems, how much design is needed and how quickly decisions and feedback come back. The written scope gives you our estimate for your project.',
    },
  ],
};

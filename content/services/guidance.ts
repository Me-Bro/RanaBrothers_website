import type { ServiceContent } from '@/content/types';

// Guidance services: software consulting, fractional CTO and project rescue.
// Technical due diligence has no page of its own yet, so it is covered inside software consulting
// (one deliverable and one FAQ). Claims that need founder sign-off carry a marker comment on the line above.

export const guidanceServices: ServiceContent[] = [
  {
    path: '/services/software-consulting',
    summary:
      'Technical advice before you spend: tech stack and architecture choices, build-or-buy decisions, discovery and technical due diligence.',
    intro: [
      'Software development consulting is technical advice you can act on, given before you commit money to a build, a vendor or a platform. It settles questions that are cheap to answer early and costly to reverse later. Typical ones: which tech stack fits the product, whether to build or buy, and whether a development quote is sound.',
      'We act as the technical counterpart for founders and small businesses that have no senior engineer in the room. The founders, Vibhanshu Rana (Co-Founder & CTO) and David Singh Rana (Co-Founder & COO), work on client projects directly, so the advice comes from people who build and run production software. We are based in Khatima, Uttarakhand, India, and work remotely.',
      'Our work is written down. You receive a recommendation you can hand to an investor, a developer or a co-founder. It names the options we rejected as well as the one we chose, and it separates what we measured from what we assumed. That is what we mean by no black boxes.',
    ],
    forWho: [
      'Startup founders who need a technology consultant to choose a stack, a vendor or a build approach for a first product.',
      'Small businesses deciding whether to build custom software, buy a SaaS product or combine both.',
      'Teams whose product is slowing down and who want a second pair of eyes on the architecture before paying for a fix.',
      "Founders preparing for investors' technical questions, and owners facing a buyer's technical due diligence.",
      'Anyone holding a development quote they cannot judge and wanting a second opinion before they sign.',
    ],
    deliverables: [
      'A written recommendation: the decision, the options we rejected and why, the main risks, and the evidence that would change our answer.',
      'A tech-stack decision record covering language, framework, database, hosting and any AI layer, with reasons tied to your team, budget and growth plans.',
      'An architecture review of an existing system: what is sound, what is fragile and what to change first, in priority order.',
      'A performance-tuning plan for slow pages, queries or APIs, based on measurements rather than guesses.',
      'A discovery brief: users, journeys, scope and non-goals, integrations, constraints and open questions, precise enough for any team to estimate against.',
      'A technical due-diligence report for founders preparing to raise, and for buyers or investors assessing a product. It covers code, architecture, security basics, running cost, data handling, licence risks and how easily another team could maintain the system.',
    ],
    steps: [
      {
        title: 'Frame the decision',
        body: 'We agree the question, who decides, which constraints are fixed (budget, deadline, team skills) and what a good answer looks like. A vague brief produces vague advice, so this step is short and strict.',
      },
      {
        title: 'Read the system and the evidence',
        body: 'For an existing product we read the code, the infrastructure and the delivery history, and we talk to the people who run it. For a new idea we read the brief, list the integrations and mark every assumption we cannot yet support.',
      },
      {
        title: 'Test the riskiest assumption',
        body: 'Where a small experiment is cheaper than an argument, we run one: a throwaway prototype, a timed test of the one slow query, or a trial call to the one doubtful third-party service.',
      },
      {
        title: 'Write the recommendation',
        body: 'We write the decision, the rejected options, the risks and the costs that grow with scale. Each claim says whether we measured it, read it or assumed it, so you can see how much weight it can bear.',
      },
      {
        title: 'Walk through it and hand over',
        body: 'We go through the document with the people who will act on it. If you want help carrying the decision out, we can work in fixed-scope pieces or on a monthly arrangement. If not, the document stands on its own.',
      },
    ],
    tech: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Ruby on Rails',
      'Python',
      'FastAPI',
      'Postgres',
      'pgvector',
      'RAG pipelines',
      'LangChain',
      'LlamaIndex',
      'Docker',
      'Render',
      'Vercel',
      'Cloudflare',
    ],
    proof: [
      {
        label: 'DuSu: a stack sized to its running cost',
        href: '/work/dusu-ai-english-coach',
        text: 'DuSu helps mobile-first learners in India practise spoken English by voice. David Singh Rana built it, and it has 200+ users and a running cost of about $0/month. Its stack shows the trade-offs we weigh. Browser Web Speech keeps speech on the device. A FastAPI backend serves one WebSocket, with Postgres behind it. One vanilla-JS file ships as a PWA and an Android Trusted Web Activity. LLM calls fail over from Groq to Gemini to OpenRouter, ordered by measured latency.',
      },
      {
        label: 'Edge Verify: assumptions stated, then stress-tested',
        href: '/work/edge-verify-backtesting-platform',
        text: 'Edge Verify is research tooling that backtests strategies on Indian stocks, indices and crypto and paper trades live on NSE prices. David Singh Rana founded and solo-built it, and it is in beta. Trades never execute on the same candle as their signal, and nothing looks ahead. The cost model covers brokerage, STT (securities transaction tax), exchange charges, GST on charges and liquidity-tier slippage. Stress tests apply 2× and 3× slippage plus late and worst-case fills, and the platform warns on samples under 30 trades. We bring that habit to advice: state the assumptions, test the awkward cases, say when the evidence is thin. It is not investment advice.',
      },
    ],
    comparison: {
      caption: 'Build, buy or combine',
      columns: ['Option', 'Choose it when', 'Watch for'],
      rows: [
        [
          'Buy a product',
          'The need is common to every business in your category and a mature product covers it.',
          'Per-user fees that grow with you, limited data export and features you cannot change.',
        ],
        [
          'Configure a platform',
          'A platform covers most of the need and you can live with its model.',
          'Workarounds that pile up, and the platform limit arriving at the worst moment.',
        ],
        [
          'Build custom',
          'The workflow is your advantage, or nothing fits your process or integrations.',
          'Ongoing cost: you own maintenance, security patches and every future change.',
        ],
        [
          'Combine',
          'Buy the commodity parts, such as payments and email, and build what sets you apart.',
          'Integration seams: agree who owns the data and what happens if a vendor changes terms.',
        ],
      ],
    },
    notFor: [
      'You have a settled design and need people to build it. Consulting ends in a recommendation, so our development services are the better starting point.',
      'You want a rubber stamp. We report what the evidence supports, including when it is not what you hoped to hear.',
      'You need legal advice, a penetration test or a compliance certification. We advise on architecture and code, and we will say where a specialist is needed.',
    ],
    faqs: [
      {
        q: 'What does a software consultant do?',
        a: "A software consultant gives technical advice and puts it in writing so that you can act on it. In practice that means reading the system or the brief, testing the claims that matter, comparing realistic options and recommending one, with its risks and costs. For a founder without an in-house engineer, the consultant also translates between business goals and technical choices, so you can question a vendor's quote with confidence.",
      },
      {
        q: 'How much does software development consulting cost?',
        a: 'It depends on the scope, because a review of one system and an ongoing advisory arrangement are different jobs. The main drivers are the size and age of the system, how deep the review goes, how many decisions you need made and whether you want help carrying them out. We agree the scope and the form of the output before we start, and we can work in fixed-scope pieces or on a monthly arrangement. Be wary of any quote that does not say what you will receive.',
      },
      {
        q: 'What is a discovery phase?',
        a: 'A discovery phase is a short, focused stage before development in which the team defines the problem, the users, the scope and the risks, and produces a plan precise enough to estimate. Typical outputs are user journeys, a prioritised feature list with non-goals, the integrations, a draft architecture and a list of open questions. It replaces guesswork in the quote: an estimate made without discovery is a guess with a price attached.',
      },
      {
        q: 'How do I choose the right tech stack?',
        a: "Choose the stack your team can hire for, maintain and ship in, then check it against the product's real constraints. Ask five questions. Who will maintain this in two years? How many developers know it? What does the product need that is unusual, such as real-time updates, offline use or heavy AI calls? What will hosting cost at much higher load? How hard is it to leave? Prefer mature tools, and test the one risky choice with a small prototype. We build with Python and FastAPI, Ruby on Rails, Node.js, React and Next.js on Postgres, and we will say when another tool fits better.",
      },
      {
        q: 'Should I build or buy software?',
        a: 'Buy what every business in your category needs, and build what makes yours different. Buy first when a mature product already covers the need, because you inherit years of fixes and can switch if it stops fitting. Build when the workflow is your advantage, when no product fits your integrations, or when licence fees over several years would exceed the cost of owning the code. The comparison on this page shows the costs to weigh and when to combine the two.',
      },
      {
        q: 'What is technical due diligence, and do you offer it?',
        a: "Technical due diligence is a structured review of a product's code, architecture, security and operations that tells an investor, buyer or founder what they actually hold, and we offer it as an extension of our architecture reviews. It covers code quality and tests, the data model, security basics, hosting cost, open-source licence risks, ownership of code and accounts, and dependence on one person or one vendor. For AI products it also covers reliance on a model provider and the rights to the data used. Founders can prepare with an architecture diagram, repository and cloud access, a dependency list and an incident history. Whoever you choose, ask them to disclose any interest in the outcome. We are also a development studio, so ask us too.",
      },
    ],
    related: ['/services/fractional-cto', '/services/project-rescue', '/services/mvp-development', '/process'],
  },
  {
    path: '/services/fractional-cto',
    summary:
      'Part-time senior technical leadership for startups and small businesses: roadmap, architecture, vendor oversight, hiring input and investor tech questions.',
    intro: [
      'Fractional CTO services give a company part-time senior technical leadership. The fractional CTO owns the technical direction, makes the architecture and vendor decisions, and holds the people building the product to a standard. The role is also called a virtual CTO, an outsourced CTO or CTO as a service. The shape is the same in each case: judgement and accountability for a share of the week, not the full-time cost of an executive.',
      'Founders usually look for this help at one of a few moments. They are about to sign a first development contract and cannot judge what they are being sold. Investors have started asking about architecture, security and who owns the code. Or the founding CTO has left, and the team needs direction until a full-time hire is made.',
      // VERIFY: engagement shape and capacity in the last sentence (time commitment, term and notice period agreed in writing; capacity confirmed before accepting a client)
      'We are based in Khatima, Uttarakhand, India, and work remotely. The founders work on client projects directly, so the person advising you also builds and ships software. We agree the time commitment, the term and the notice period in writing before an engagement starts, and we confirm that we have capacity before we say yes.',
    ],
    forWho: [
      'Non-technical founders outsourcing a build who need someone to judge scope, quotes and delivery on their behalf.',
      'Founders without a technical co-founder who want an alternative while they keep looking, or instead of looking.',
      'Seed-stage teams with a few engineers but no senior person setting direction, reviewing architecture or owning risk.',
      'Startups heading into a funding round or a sale, where investors and buyers will ask about security, scale and ownership of the code.',
      'Small and medium businesses running internal tools or automation with no IT leader, and companies whose CTO has left.',
    ],
    deliverables: [
      'A technical risk register covering security, backups, account ownership, vendor dependence and key-person risk, ranked by likelihood and impact.',
      'A short technical roadmap tied to your next business milestone, stating what to build, buy or defer and why.',
      'Architecture decision records, so the reasoning behind each major choice survives changes of staff or vendor.',
      'Oversight of your developers or agency: code and pull-request review, delivery checks against the plan, and plain-language reports to the founders.',
      'Technical input on hiring: role definitions, interview questions and a scorecard, so the engineers you hire fit what the product needs.',
      'Preparation for investor and buyer questions: an architecture overview, a security summary and the documents a data room needs.',
    ],
    steps: [
      {
        title: 'Listen first',
        body: 'We start by talking to the founders and to the people building the product, then take read-only access to the repositories, cloud accounts, documentation and backlog. We want to understand the business goal before we judge a line of code.',
      },
      {
        title: 'Rank the risks',
        body: 'We review architecture, security basics, deployment, running cost, account ownership and delivery habits, then rank what we find by likelihood and impact. Founders get a short list in plain language, not a wall of findings. Urgent items, such as missing backups, are raised straight away and do not wait for the roadmap.',
      },
      {
        title: 'Agree a roadmap',
        body: 'Ranked risks and business milestones become a short technical roadmap: what to build, what to buy, what to defer and what must be fixed first. Each item states its cost and the decision it depends on.',
      },
      {
        title: 'Run the rhythm',
        body: 'The role then runs on a steady cadence: reviewing pull requests and architecture decisions, checking delivery against the plan, challenging vendor quotes and reporting to the founders in plain language. Decisions are recorded so the reasoning outlives any one person.',
      },
      {
        title: 'Plan the handover',
        body: 'A good fractional CTO works towards being unnecessary. We document decisions, help define the full-time role once the workload justifies one, and pass the context to whoever takes over.',
      },
    ],
    tech: [
      'Python',
      'FastAPI',
      'Node.js',
      'Next.js',
      'React',
      'TypeScript',
      'Ruby on Rails',
      'Postgres',
      'pgvector',
      'RAG pipelines',
      'LangChain',
      'LlamaIndex',
      'Docker',
      'Cloudflare',
      'Render',
      'Vercel',
    ],
    proof: [
      {
        label: 'Edge Verify: no flattering answers',
        href: '/work/edge-verify-backtesting-platform',
        text: "Technical leadership is mostly the discipline of refusing a flattering answer. Edge Verify, founded and solo-built by David Singh Rana and now in beta, is built that way. It does not allow same-candle or look-ahead execution. Costs include brokerage, STT, exchange charges, GST on charges and slippage by liquidity tier. Stress tests cover 2× and 3× slippage, late and worst-case fills, Monte-Carlo runs and bull, bear and sideways market regimes. The platform warns on survivorship bias and on samples under 30 trades. A fractional CTO applies the same standard to a vendor's estimate, a demo or a growth plan. Edge Verify is research tooling and not investment advice.",
      },
      {
        label: 'DuSu: cost and failure designed in',
        href: '/work/dusu-ai-english-coach',
        text: 'DuSu, built by David Singh Rana, coaches spoken English by voice for mobile-first learners in India. It has 200+ users and a running cost of about $0/month. The decisions a CTO owns are visible in it. LLM providers sit in a failover chain (Groq, then Gemini, then OpenRouter) ordered by measured latency, and users can bring their own keys. Speech-to-text and text-to-speech run in the browser, so speech stays on the device. One web app ships as a PWA and as an Android Trusted Web Activity.',
      },
    ],
    comparison: {
      caption: 'Fractional CTO, full-time CTO or agency alone',
      columns: ['Question', 'Fractional CTO', 'Full-time CTO', 'Agency alone'],
      rows: [
        [
          'Time on your product',
          'A fixed share of the week, agreed up front',
          'All working hours',
          'Whatever the contract buys, aimed at delivery',
        ],
        [
          'Cost shape',
          'A recurring fee for the time you buy',
          'Salary, benefits and often equity',
          'Project or team fees, with no leadership layer',
        ],
        [
          'Best stage',
          'Before the team is large, or between full-time hires',
          'A growing team that needs daily leadership',
          'A clearly specified build with a technical owner on your side',
        ],
        [
          'Main risk',
          'Less availability if the workload outgrows the agreed time',
          'A slow search, and a costly mistake if the hire is wrong',
          'Nobody on your side can judge the work',
        ],
        [
          'Exit path',
          'Hand over to a full-time hire when the workload justifies one',
          'Notice period, handover and any equity to unwind',
          'Depends on code access and handover terms in the contract',
        ],
      ],
    },
    notFor: [
      'You need a leader available all week for a large engineering team. That is a full-time role, and we would tell you so.',
      'You want a co-founder who shares the risk and the equity. A fractional CTO is an adviser and decision-maker for technology, not a founding partner.',
      'You need an adviser with no interest in who builds your product. We are also a development studio, so weigh that when you compare options.',
    ],
    faqs: [
      {
        q: 'What is a fractional CTO?',
        a: "A fractional CTO, also called a part-time CTO, is a senior technology leader who owns your company's technical direction for a share of the week, without a full-time contract. They set the roadmap, make architecture and vendor decisions, review the work of your developers or agency, and answer technical questions from investors. The usual difference from a consultant is accountability: a consultant advises, while a fractional CTO owns decisions for the length of the engagement.",
      },
      {
        q: 'How much do fractional CTO services cost in India?',
        // VERIFY: how Rana Brothers prices a fractional CTO engagement (monthly fee or day rate, minimum term) and whether to publish an INR or USD range
        a: 'There is no single market price, because the cost depends on how much time you buy, how senior the person is and whether they also write code. Compare it with the real cost of a full-time hire: salary, equity, benefits, recruiting time and the months it takes to find the right person. Ask for the time commitment, deliverables and notice period in writing, and keep infrastructure bills separate. We quote a fractional engagement after a short conversation about your stage, your team and the time you need, and we do not publish a rate card on this page.',
      },
      {
        q: 'Fractional CTO or full-time CTO: which do I need?',
        a: 'Choose a fractional CTO when you need judgement more than hours, and a full-time CTO when leadership work alone would fill the week. Part-time fits when you outsource most of the build, when the team is small, or when the questions are about direction, risk and quality rather than daily management. Full-time fits when you are managing a growing engineering team, hiring steadily, or building a product whose core technology is the business. A useful test: if you cannot name enough leadership work to fill a week, part-time is the right size. Many companies start fractional and hire full-time later, so plan that handover from the first month.',
      },
      {
        q: 'When does a startup need a CTO?',
        a: 'A startup needs technical leadership as soon as technical decisions become expensive to reverse. Common triggers are a development contract you cannot evaluate, customer or payment data that nobody owns the security of, delivery that is slowing for no clear reason, investors asking technical questions, and the first engineering hires. The role is wider than being the best developer on the team: it covers architecture, security, vendors, hiring and translating between the business and engineering. Before those triggers, a technical co-founder or a trusted adviser may be enough.',
      },
      {
        q: 'What does a fractional CTO do in the first 30 days?',
        a: 'In the first 30 days a fractional CTO listens, reads, ranks risks and agrees a plan. By the end of the month you should have four things. First, access to every system, with a named owner for each account. Second, a ranked list of technical risks in plain language. Third, a short roadmap tied to your next business milestone. Fourth, a working rhythm for reviews and reports. Urgent risks, such as missing backups or a shared admin password, are raised as soon as they are found and do not wait for the roadmap.',
      },
    ],
    related: [
      '/services/software-consulting',
      '/services/mvp-development',
      '/guides/how-to-choose-a-software-development-company',
      '/about',
    ],
  },
  {
    path: '/services/project-rescue',
    summary:
      'Late, buggy or abandoned project? We audit the code, stabilise what works and take over delivery against a written recovery plan.',
    intro: [
      'Software project rescue is the work of taking a late, buggy or stalled project and bringing it to a state where it can ship and be maintained. It starts with access and a code audit, and it ends with delivery. In between, we stabilise what already works and write down what to fix, in order.',
      'A troubled project is not always a lost one. What is often missing is access, visibility and a plan: nobody can say what runs, what is broken or what it would take to finish. We read the code before we judge it, we say what is worth keeping, and we do not recommend a rewrite until the evidence supports one.',
      'We take over work started by another developer, an agency or an in-house team, including a broken app that still has users. The founders work on client projects directly, so your code is read by people who build and ship software themselves. We are based in Khatima, Uttarakhand, India, and work remotely.',
    ],
    forWho: [
      'Founders whose agency or freelancer has missed several deadlines and who cannot tell how much of the product actually works.',
      'Businesses with an abandoned or half-finished app, where the original developer is unreachable or the relationship has ended.',
      'Teams inheriting a codebase with no documentation, no tests and a release process that depends on one person.',
      'Companies whose product is live but unstable: recurring outages, a growing bug backlog, or fixes that break other things.',
      'Owners who suspect they do not control their own code, cloud account or domain.',
    ],
    deliverables: [
      'A written code and architecture audit: what runs, what is broken, what is risky and what is safe to keep. It separates what we ran from what we only read.',
      'An access and ownership check covering the repository, cloud account, domain, app-store listings, secrets and backups, with gaps fixed or flagged.',
      'A recovery plan: findings ranked by risk, a refactor-or-rewrite recommendation backed by evidence, and the scope of each milestone.',
      'Stabilisation work: a build that reproduces from a clean checkout, a working deployment, backups, error monitoring and tests around the flows that matter most.',
      'Targeted technical-debt cleanup where it blocks delivery, and feature work in small milestones with a demo each time.',
      'Handover documentation and knowledge transfer, so your team or the next developer can run and extend the system without us.',
    ],
    steps: [
      {
        title: 'Secure access and stop the bleeding',
        body: 'We first confirm who controls the repository, cloud account, domain, app-store listings, secrets and backups, and work to put control in your hands where it is not. Urgent exposure, such as leaked credentials or a lapsing domain, comes first. So does anything that only the previous developer holds.',
      },
      {
        title: 'Audit the code, data and delivery',
        body: 'We build the project from a clean checkout, run it, then read it: structure, tests, dependencies, the data model, security basics, deployment and the pattern of past bugs. We record what we verified by running it, what we only read, and what we could not check.',
      },
      {
        title: 'Write the recovery plan',
        body: 'The audit becomes a short, ranked plan: what to fix now, what to keep, what to refactor and, only if the evidence supports it, what to replace. Each item has a reason, an effort range and the risk of leaving it. You decide before we continue.',
      },
      {
        title: 'Stabilise the core',
        body: 'We fix what blocks releases or puts users and data at risk: a reproducible build, a working deployment, backups, error monitoring and tests around the flows that matter most. New feature work starts once the base is safe to change.',
      },
      {
        title: 'Deliver in milestones, then hand over',
        body: 'Delivery resumes in small milestones, each demonstrated and documented as it lands. Before we finish we write the handover and transfer knowledge to your team or the next developer, so the project no longer depends on us.',
      },
    ],
    tech: [
      'Ruby on Rails',
      'Node.js',
      'Python',
      'FastAPI',
      'React',
      'Next.js',
      'TypeScript',
      'Postgres',
      'Docker',
      'Render',
      'Vercel',
      'Cloudflare',
    ],
    proof: [
      {
        label: 'Edge Verify: proof over promises',
        href: '/work/edge-verify-backtesting-platform',
        text: "An audit is a verification exercise, and so is Edge Verify, whose tagline is 'No signals, just proof.' David Singh Rana founded and solo-built it, and it is in beta. Trades cannot fill on the candle that triggered them or use future data. Costs include brokerage, STT, exchange charges, GST on charges and slippage by liquidity tier. Stress tests push slippage to 2× and 3×, and the platform warns on samples under 30 trades. In a rescue we apply the same habits: reproduce the fault, measure before and after, and flag any conclusion that rests on too little data. It is research tooling, not investment advice.",
      },
      {
        label: 'DuSu: built to survive a failing dependency',
        href: '/work/dusu-ai-english-coach',
        text: 'DuSu is an AI coach for spoken English, built by David Singh Rana, with 200+ users and a running cost of about $0/month. Its architecture answers the questions we ask in an audit: what happens when a dependency is slow or down, and what does each user cost? LLM providers sit in a failover chain (Groq, then Gemini, then OpenRouter) ordered by measured latency. Speech stays on the device through browser Web Speech. Scores are labelled AI-estimated, so the product does not claim more certainty than it has.',
      },
    ],
    comparison: {
      caption: 'Rewrite vs refactor',
      columns: ['Signal', 'Refactor', 'Rewrite'],
      rows: [
        [
          'Data model',
          'The schema mostly matches how the business works and needs local fixes.',
          'The core entities cannot express the business, and every feature fights the schema.',
        ],
        [
          'Behaviour you must keep',
          'Users rely on rules nobody has written down. Pin them with tests, then change the code.',
          'The required behaviour is small, documented or easy to specify from scratch.',
        ],
        [
          'Platform and dependencies',
          'Frameworks and libraries are supported and can be upgraded step by step.',
          'The platform is end-of-life with no upgrade path, or a core dependency is abandoned.',
        ],
        [
          'Structure',
          'Seams exist: modules or services that can be changed one at a time.',
          'Everything depends on everything, so no change can be made or tested in isolation.',
        ],
        [
          'Tests and runnability',
          'It builds and runs, and tests can be added around the main flows.',
          'It cannot be built or run reliably even after a fair effort to fix it.',
        ],
        [
          'Business pressure',
          'Live users and revenue depend on it, so change must be gradual and reversible.',
          'You can run old and new side by side and move users over in stages.',
        ],
      ],
    },
    notFor: [
      'You need a date and a fixed price before anyone has read the code. An honest estimate for a rescue comes after the audit.',
      'There is no code yet, only an idea or a design. That is a new build, and our MVP and development services fit better.',
      'You are in a dispute with a previous vendor and want legal help. We can write a technical report on what the code contains, but we do not give legal advice.',
    ],
    faqs: [
      {
        q: 'How do I know my software project needs rescuing?',
        a: 'A project needs rescuing when it keeps missing dates and nobody can explain why, or when it works today but cannot be changed safely. Common signs are skipped or staged demos, no staging environment, and no access to the repository or cloud account. The bug backlog grows faster than it shrinks. Releases are dreaded. One person understands everything. Cost rises without visible progress. Two or three of these together justify an audit, which then tells you whether you need a rescue or only a course correction.',
      },
      {
        q: 'Can you take over a project from another developer?',
        a: 'Yes, after an audit, because taking over a codebase we have not read would be a guess. We need read access to the code, the cloud account, the database and any documentation, plus a conversation with the previous developer if they are reachable. If they are not, the audit shows what can be reconstructed from the repository and the running system. Ownership of the code is a contract question between you and the previous vendor, and a lawyer should advise on it. If a codebase cannot be taken over responsibly, we say so and explain why.',
      },
      {
        q: 'What does a code audit cost and include?',
        a: 'The cost depends on the size of the codebase and how deep you need us to go, so we agree the scope before we start. A code audit should check that the project builds and runs from a clean checkout. It should review structure, tests, dependency age and known vulnerabilities, the data model, deployment and backups, performance hot spots and the pattern of past bugs. It should also cover security basics such as secrets and access control. You receive a written report that separates what we ran from what we only read, with findings ranked by risk.',
      },
      {
        q: 'How long does a software project rescue take?',
        a: 'It depends on what the audit finds, which is why we estimate after reading the code and not before. A rescue has three phases of very different length: access and audit, which is short compared with the rest; stabilisation, which takes as long as the problems found; and delivery, which continues until the scope is finished. Be wary of anyone who promises a date for a codebase they have not opened.',
      },
      {
        q: 'Should we rewrite or refactor?',
        a: 'Refactor by default, and rewrite only when the evidence says the foundation cannot carry the product. A full rewrite of legacy code risks discarding years of embedded rules and fixes, usually takes longer than planned, and leaves you without new features while it runs. When replacement is justified, the safer pattern is incremental: wrap the old system, move one capability at a time to new code and retire old parts as they empty out. The comparison on this page lists the signals we weigh.',
      },
    ],
    related: [
      '/services/software-consulting',
      '/services/maintenance-support',
      '/services/fractional-cto',
      '/services/custom-software-development',
    ],
  },
];

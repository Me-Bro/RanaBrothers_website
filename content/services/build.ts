// Copy for the six build service pages. Titles, H1s, descriptions and keywords live in content/registry.ts.
// Claims about the studio come from the confirmed facts only; anything else is flagged for founder sign-off.
import type { ServiceContent } from '@/content/types';

export const buildServices: ServiceContent[] = [
  // ---------------------------------------------------------------------------
  // P03 Custom software development
  // ---------------------------------------------------------------------------
  {
    path: '/services/custom-software-development',
    summary:
      'Internal tools, portals, dashboards and integrations built around your workflows, scoped in writing first and delivered in milestones.',
    intro: [
      'Custom software development is the design and build of software around one organisation’s own workflows, data and rules, instead of adapting the organisation to a product made for everyone. We are a custom software development company based in Khatima, Uttarakhand, India, working remotely with founders and teams. The founders work on client projects directly.',
      'Typical work includes internal tools, order and approval workflows, customer or partner portals, dashboards over data that lives in several systems, and integrations between tools you already pay for. Custom is not always the answer. If a mature product covers most of your process, buy it. Custom software earns its cost when the workflow is what makes your business different, or when the workarounds around a packaged tool cost more than owning the system.',
      'We put reliability before speed. The scope is agreed before we write code, the data model is designed to scale from the start, and the result is documented so that nothing about it is a black box. Your team, or any competent engineer, can pick it up.',
    ],
    forWho: [
      'Operations teams running on spreadsheets, shared inboxes and manual hand-offs that have started to break under volume.',
      'Founders whose process is the product, and for whom no packaged tool models it properly.',
      'Businesses paying for several tools that do not talk to each other, who need one system of record.',
      'Teams that want an internal tool, portal or dashboard built and then handed over, so their own staff can run it.',
      'Businesses that need reporting across sales, stock or operations that no single tool provides.',
      'Organisations with an ageing system that still works but can no longer be changed safely.',
    ],
    deliverables: [
      'A written scope document: users and roles, workflows, data, integrations, and what is deliberately left out.',
      'Working software released in milestones, with a demo of each so you see progress as it happens.',
      'The application itself: front end, backend and database, plus the integrations agreed in the scope, built with retries and clear error handling.',
      'Role-based access and an audit trail for changes to important records.',
      'A documented data model and API, written so that another engineer can read and extend them.',
      'Data migration from spreadsheets or the system you are replacing, checked against the originals.',
      'Deployed environments with repeatable releases, on hosting we agree with you.',
      'Handover: documentation, a walkthrough with your team, and support after launch if you want it.',
    ],
    steps: [
      {
        title: 'Map the workflow as it really runs',
        body: 'We talk to the people who do the work and trace a job from start to finish, including the exceptions and the spreadsheets nobody mentions. Exceptions are where packaged tools fail, so they decide what is worth building.',
      },
      {
        title: 'Write the scope down',
        body: 'The map becomes a scope document: roles, screens, data, integrations, constraints and what is out. We agree it before we start, then split the work into fixed-scope milestones or a monthly arrangement, whichever suits the job.',
      },
      {
        title: 'Model the data and the rules',
        body: 'Before any screens, we design the database schema and the business rules, and test them against real records with personal details removed. Many custom-software problems begin as data-model problems, so this is where we go slowest on purpose.',
      },
      {
        title: 'Build in milestones you can use',
        body: 'Each milestone ends with working software and a demo for the people who will use it. Their feedback shapes the next milestone, so the scope changes in a controlled way and not by surprise.',
      },
      {
        title: 'Migrate, launch and hand over',
        body: 'We move your existing data, run old and new side by side where that lowers the risk, and document how everything works. Your team gets a walkthrough, and we stay on for support if you want us to.',
      },
    ],
    tech: ['Python', 'FastAPI', 'Node.js', 'Ruby on Rails', 'React', 'Next.js', 'TypeScript', 'Postgres', 'WebSockets', 'Docker'],
    proof: [
      {
        label: 'Edge Verify case study',
        href: '/work/edge-verify-backtesting-platform',
        text: 'A domain-heavy product built around a research workflow: testing a trading idea honestly. It pairs five-minute NSE equity candles for 428 symbols, from 2018 to 2026, with a cost model for brokerage, STT, exchange charges and liquidity-tier slippage, and it never executes on the same candle or with look-ahead.',
      },
      {
        label: 'Edge Verify, live in beta',
        href: 'https://ranabrothers.online/edgeverify/',
        text: 'Backtesting plus paper trading on NSE prices for Indian stocks, indices and crypto, founded and solo-built by David. Its tagline is “No signals, just proof”. It is research tooling, not investment advice.',
      },
    ],
    comparison: {
      caption: 'Custom and off-the-shelf software compared for a business with its own way of working',
      columns: ['Factor', 'Off-the-shelf software', 'Custom software'],
      rows: [
        ['Fit to your process', 'Good for common processes; you adapt to the product', 'Built around your process, exceptions included'],
        ['Time to first use', 'Fast: sign up and configure', 'Slower: scope and build come first'],
        ['Upfront cost', 'Low', 'Higher'],
        ['Cost as you grow', 'Per-seat or per-usage fees that rise with the team', 'Hosting and maintenance, with no per-seat licence'],
        ['Changing it later', 'Limited to what the vendor allows and plans', 'You set the roadmap'],
        ['Integrations', 'The ones the vendor supports', 'Any system that exposes an interface'],
        ['Data and exit', 'Export formats set by the vendor', 'A database and schema you can read and move'],
        ['Best when', 'The process is standard and a mature tool covers most of it', 'The workflow is your advantage, or workarounds cost more than ownership'],
      ],
    },
    notFor: [
      'A packaged product already covers your process. Buy it, and spend the budget on adoption rather than on building.',
      'You need a fixed price before anything is defined. We agree the scope first, then price against it.',
      'You need working software within days. Custom work starts with a written scope, and the first milestone follows it.',
    ],
    faqs: [
      {
        q: 'What is custom software development?',
        a: 'Custom software development is the design, build and upkeep of software made for one organisation’s specific workflows, rather than a product sold to many customers. In practice, the features follow your process, the data model reflects your business and you decide the roadmap. Typical examples are internal tools, CRMs shaped around a sales process, portals, and integrations that connect systems you already use.',
      },
      {
        q: 'How much does custom software cost in India?',
        a: 'The cost depends on scope, so we give a figure only after the scope is written down; a price before that is a guess. The main drivers are the number of user roles, how many separate workflows are involved, integrations with other systems, data migration, reporting needs and how much must work in real time. Building in India changes the hourly rate, not what drives the effort. A good estimate lists what is in scope, what is out, the assumptions behind the figure and what would change it, and it prices the build and the running costs separately.',
      },
      {
        q: 'Custom vs off-the-shelf software: which is better?',
        a: 'Off-the-shelf software is better when a mature product already covers most of your process, and custom software is better when your workflow is what sets you apart or the workarounds cost more than ownership would. A practical test is to write down the workarounds a packaged tool would need. A short, stable list means buy. A long or growing list means custom is worth scoping. Often the answer is both: buy the commodity functions and build the part that is yours.',
      },
      {
        q: 'How long does custom software take to build?',
        a: 'It depends on scope, and we do not quote a duration until the scope document exists. The schedule is driven by the number of workflows, integrations and user roles, how clean your existing data is, and how quickly decisions are made on your side. Because we deliver in milestones, you can use finished parts before the whole system is done.',
      },
      {
        q: 'Who owns the source code?',
        // VERIFY: confirm the IP policy: client owns the code written for them, repository access, any payment condition, and the open-source licence note in the handover documents.
        a: 'You do. The code written for your project belongs to you, it lives in a repository you can access, and the agreement says so before work starts. Open-source libraries we use keep their own licences, and we list them in the handover documentation.',
      },
      {
        q: 'Do you support the software after launch?',
        a: 'Yes. We support software after launch, and we hand over documentation and a walkthrough so that your team can run the system without needing us. Support can be a monthly arrangement covering fixes, updates and small improvements, or it can end at handover if your own team takes over.',
      },
    ],
    related: [
      '/services/web-app-development',
      '/services/mvp-development',
      '/services/maintenance-support',
      '/services/software-consulting',
    ],
  },

  // ---------------------------------------------------------------------------
  // P04 Mobile app development
  // ---------------------------------------------------------------------------
  {
    path: '/services/mobile-app-development',
    summary:
      'Installable web apps and Android apps with the backend behind them, plus an honest comparison of native iOS and cross-platform routes.',
    intro: [
      'Mobile app development is the design, build and release of software that people install on their phones, together with the backend, data and admin tools behind it. We are a mobile app development company in India, working remotely from Khatima, Uttarakhand.',
      'The route we have shipped is an installable web app (a PWA) paired with an Android Trusted Web Activity (TWA). A TWA is a thin Android app that opens your web app full-screen in the browser engine, so it installs and launches like any other app. DuSu, the English-speaking coach David built for mobile-first learners in India, is delivered this way and has 200+ users. Its Android app is written in Kotlin.',
      'Native iOS, Flutter and React Native are real options, and we discuss them openly instead of defaulting to one. Where a requirement goes beyond what we have shipped, we say so before you commit. Choosing the delivery route is the first decision, and it shapes cost, speed and what your users can do.',
    ],
    forWho: [
      'Founders who need a first version on users’ phones quickly and want to learn from real use before committing to a full native build.',
      'Businesses whose users are mobile-first, often on mid-range Android phones and mobile data, where install size, speed and offline behaviour decide whether an app gets used.',
      'Teams with a web product who want an installable, app-like experience on Android without a second code base.',
      'Organisations that need field or staff apps, such as inspections, orders or attendance, running on their people’s phones.',
    ],
    deliverables: [
      'A delivery-route recommendation covering an installable web app, a native build and a cross-platform build, with the trade-offs written down.',
      'Core journeys designed for small screens, touch and slow networks.',
      'The app itself, tested on real devices, including mid-range Android phones.',
      'The backend behind it: APIs, authentication, a Postgres database and an admin view for managing users and content.',
      'An Android Trusted Web Activity package when the product needs an Android install.',
      'A release plan for the route you choose: who holds the developer accounts, what store review involves and how updates ship.',
      'Documentation and a handover session; support after launch is optional.',
    ],
    steps: [
      {
        title: 'Choose the delivery route',
        body: 'We compare an installable web app, a native build and a cross-platform build against your must-have device features, offline needs, store requirements and budget. You get a one-page recommendation with the trade-offs, so the choice is yours and not a default.',
      },
      {
        title: 'Shape the one journey that must work',
        body: 'We define the single path a new user takes to reach first value, then design it for thumbs, small screens and unreliable networks. We walk through a clickable prototype with you before building anything.',
      },
      {
        title: 'Agree the contract between app and backend',
        body: 'The API is specified first, so the app and the backend can be built side by side without guessing. Authentication, error states and offline behaviour are decided here, while changing them is cheap.',
      },
      {
        title: 'Test on the phones your users own',
        body: 'We test on real devices: mid-range Android phones, poor connections, interrupted sessions and low battery. We agree the device list with you and fix what breaks there first, because emulators hide many of these failures.',
      },
      {
        title: 'Release, watch and update',
        body: 'We plan the release for the route you chose, watch errors and usage after launch, and schedule updates around operating-system changes, store rules and what real users actually do.',
      },
    ],
    tech: ['PWA', 'Kotlin (Android TWA)', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'FastAPI', 'Node.js', 'WebSockets', 'Postgres', 'Docker'],
    proof: [
      {
        label: 'DuSu: a PWA and an Android TWA',
        href: '/work/dusu-ai-english-coach',
        text: 'A voice-first AI speaking coach that helps learners in India practise English on their phones, with 200+ users. One single-file web app reaches phones in two forms: a PWA, and an Android app built as a Trusted Web Activity in Kotlin. FastAPI, one WebSocket and Postgres sit behind it. The case study explains the decisions.',
      },
      {
        label: 'Open DuSu on your phone',
        href: 'https://dusu.ranabrothers.online',
        text: 'The live product. Speech-to-text and text-to-speech use the browser’s Web Speech API, and replies come from an LLM chain ordered by measured latency.',
      },
    ],
    comparison: {
      caption: 'Native, cross-platform and installable web app routes compared',
      columns: ['Factor', 'Native (Kotlin or Swift)', 'Cross-platform (Flutter or React Native)', 'PWA with an Android TWA'],
      rows: [
        ['Code base', 'One per platform', 'One shared, with native code where needed', 'One web app; the Android package is a thin wrapper'],
        ['Device features', 'Full, with immediate access to new OS features', 'Broad through plugins; unusual features need native code', 'What the browser exposes; narrower on iOS than on Android'],
        ['Offline use', 'Full control', 'Full control', 'Possible with a service worker, and designed deliberately'],
        ['Store listing', 'Google Play and the App Store', 'Google Play and the App Store', 'Android package possible; iOS users install from the browser'],
        ['Shipping an update', 'Store review for most releases', 'Store review for most releases', 'Deploy to the server; users get it on their next visit'],
        ['Effort for a first version', 'Highest when you need both platforms', 'Moderate', 'Lowest'],
        ['Best when', 'Heavy graphics, deep hardware access or platform-specific design', 'You need both stores and a near-native feel from one team', 'Content and workflow apps, MVPs and Android-first audiences'],
        ['Our position', 'An option we assess with you', 'An option we assess with you', 'Our default, shipped in DuSu'],
      ],
    },
    notFor: [
      'Your product depends on heavy 3D graphics, advanced camera processing or deep hardware access. A native build is the right tool there, and we would say so rather than stretch a web app.',
      'You need a fixed launch date on both stores. Store review is outside anyone’s control, so we plan for it instead of promising dates.',
      'You want the lowest quote for a long feature list. We scope a first release around one core journey and add to it.',
    ],
    faqs: [
      {
        q: 'Native or cross-platform: which should I choose?',
        a: 'Choose an installable web app or a cross-platform build unless your product depends on deep device features, heavy graphics or platform-specific behaviour, in which case choose native. Starting native on two platforms before you know what users want doubles the build for the same learning. Our default is the lightest route that meets your must-haves, which for many first versions is a PWA with an Android package.',
      },
      {
        q: 'Flutter or React Native?',
        a: 'Choose React Native if your team already works in React and TypeScript, and Flutter if you want one custom-drawn interface that looks identical on every device. Flutter, from Google, uses the Dart language and draws its own widgets. React Native, from Meta, uses JavaScript or TypeScript and renders native components. Both are mature, so the deciding factors are your team’s skills, the interface you need and the libraries for your device features.',
      },
      {
        q: 'How much does it cost to build an app in India?',
        a: 'A fair price needs a written scope first; there is no honest figure for “an app”. What moves the price is the number of screens and user roles, the backend and admin tools behind the app (a large part of the work), integrations such as payments and notifications, the number of platforms, and offline needs. Building in India changes the rate, not those drivers. Budget for hosting, store fees and maintenance as well.',
      },
      {
        q: 'How long does it take to build a mobile app?',
        a: 'It depends on scope, but the useful measure is how soon real users can try a first release. A first version built around one core journey reaches users far sooner than a full product. Platform count, backend work, design iterations, third-party approvals and store review all move the date, so we give a schedule only after the scope is written.',
      },
      {
        q: 'Will you publish the app on the Play Store and App Store?',
        a: 'Store release is part of the launch plan from the start, and the developer accounts should be registered in your own name so the listing and its reviews stay yours. On Android, a Trusted Web Activity package can be listed on Google Play; DuSu’s Android app is a TWA written in Kotlin. An App Store listing means a native or cross-platform iOS build, and Apple reviews every submission, so we scope that route separately before quoting.',
      },
      {
        q: 'What happens after launch?',
        a: 'After launch we watch errors and usage, fix what real users hit first, and plan updates around what the data shows. Operating systems, browsers and store rules change every year, so an app that is not maintained slowly stops working. Support can continue with us month to month, or you can take the app in-house using the documentation and walkthrough we hand over.',
      },
    ],
    related: ['/services/web-app-development', '/services/mvp-development', '/services/maintenance-support'],
  },

  // ---------------------------------------------------------------------------
  // P05 Web application development
  // ---------------------------------------------------------------------------
  {
    path: '/services/web-app-development',
    summary:
      'Customer portals, dashboards and PWAs on React or Next.js, with Node.js or Python services and Postgres behind them, released through an automated pipeline.',
    intro: [
      'Web application development is the practice of building software that runs in the browser and does work for its users: they sign in, create and change data, and see results that depend on who they are. We are a web application development company working remotely from Khatima, Uttarakhand, India.',
      'We build customer portals, dashboards, internal tools and progressive web apps (PWAs). The front end is React or Next.js with TypeScript. Behind it sit Node.js or Python services and a Postgres database. We choose a stack your team can maintain, not the one that is fashionable this year. We also choose the rendering model page by page: static where content rarely changes, server-rendered where search visibility matters, client-side where the page is a working tool.',
      'Two products show the range. DuSu is a voice-first coach delivered as a web app, a PWA and an Android package, with 200+ users. Edge Verify is a data-heavy backtesting and paper-trading platform, in beta. David built both, and both follow the same habit we bring to client work: a small, well-understood architecture with room to grow.',
    ],
    forWho: [
      'Companies whose customers or partners need to sign in, see their own data and act on it.',
      'Teams that need dashboards over data scattered across several systems.',
      'Founders whose product lives in the browser and who want to launch without waiting for app-store review.',
      'Products with live behaviour, such as status updates, chat or voice, that need WebSockets rather than page reloads.',
      'Organisations whose current web app is slow, fragile or hard to change, and who want a rebuild they can maintain.',
    ],
    deliverables: [
      'An architecture note: routes, data model, roles and permissions, API shape and hosting plan.',
      'The application: a responsive front end, a backend API, a database and background jobs where the scope calls for them.',
      'Authentication and role-based access, built to the permissions matrix agreed in the scope.',
      'Automated tests around the main journeys, such as sign-in and the actions that change data.',
      'A performance and accessibility pass before release, measured against targets we agree with you.',
      'Deployment to Vercel, Render or Cloudflare through an automated release pipeline, with Docker where it helps.',
      'Documentation and a walkthrough for your team, with optional support after launch.',
    ],
    steps: [
      {
        title: 'Model users, data and permissions',
        body: 'We start with who does what to which data, and write it down as a roles-and-permissions matrix and a data model. Many security and reporting problems are settled here, long before any screen exists.',
      },
      {
        title: 'Choose rendering and hosting',
        body: 'Static pages, server rendering, a single-page app or a mix: each suits different content, audiences and search needs. We pick one, decide where state lives and match the hosting to it, for example Vercel or Cloudflare for the front end and Render for the API.',
      },
      {
        title: 'Ship one thin slice end to end',
        body: 'The first milestone is a single real journey through every layer: interface, API, database and deployment. The riskiest integration is exercised first, while changing it is still cheap.',
      },
      {
        title: 'Harden before widening',
        body: 'We add input validation, session handling, rate limits, dependency review, accessibility checks and page-speed measurement, then widen the feature set on a base that has been tested.',
      },
      {
        title: 'Release, monitor and iterate',
        body: 'Releases go through an automated pipeline. Once the app is live, errors and real-world speed are monitored, and the backlog is reordered with you according to what real use reveals.',
      },
    ],
    tech: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'three.js',
      'Node.js',
      'Python',
      'FastAPI',
      'Ruby on Rails',
      'WebSockets',
      'Postgres',
      'Docker',
      'Vercel',
      'Render',
      'Cloudflare',
      'PWA',
    ],
    proof: [
      {
        label: 'DuSu: a voice-first web app',
        href: '/work/dusu-ai-english-coach',
        text: 'A single-file vanilla-JS web app with a FastAPI backend, one WebSocket and Postgres, serving four practice modes. The same code reaches users as a PWA and, wrapped in Kotlin, as an Android Trusted Web Activity. 200+ users rely on it.',
      },
      {
        label: 'Edge Verify, a data-heavy web platform',
        href: 'https://ranabrothers.online/edgeverify/',
        text: 'Backtesting and live paper trading across Indian stocks, indices and crypto, in beta and built solo by David. Its warnings cover survivorship bias and any sample of under 30 trades, which is the behaviour a research tool needs.',
      },
    ],
    comparison: {
      caption: 'Website or web application: how to tell them apart',
      columns: ['Question', 'Website', 'Web application'],
      rows: [
        ['Main job', 'Present information so people can find and read it', 'Let people do something: sign in, create, change and track data'],
        ['Examples', 'A company profile, a blog, a landing page', 'A customer portal, a booking system, a dashboard'],
        ['Who sees what', 'Everyone sees the same pages', 'Each user sees data and actions based on their role'],
        ['Where the logic lives', 'Mostly in the content and the page templates', 'In application code and a database, behind an API'],
        ['Typical build', 'A content system or a static or server-rendered site', 'A front-end app, an API, a database and authentication'],
        ['Security surface', 'Mostly public content', 'User accounts, personal data and permissions that must be enforced on the server'],
        ['What matters most', 'Search visibility, speed and clear content', 'Correct data, security and reliable behaviour under load'],
        ['Ongoing work', 'Content updates and the occasional redesign', 'Releases, bug fixes, monitoring, and dependency and security updates'],
      ],
    },
    notFor: [
      'You need a brochure site with no sign-in, data or workflow. A web application is more than the job needs.',
      'A subscription product already does the job. Use it, and keep the build budget for what is unique to you.',
      'Your product depends on deep hardware access or heavy graphics on the phone. A native app is the better route.',
    ],
    faqs: [
      {
        q: 'What is the difference between a website and a web application?',
        a: 'A website presents information that is the same for everyone, while a web application lets signed-in users create, change and track data that depends on who they are. The line is blurry, but a useful test is whether the page does work for the user or only tells them something. Applications need a database, authentication and an API behind the interface, and they need ongoing releases and monitoring, which is where much of the cost difference comes from.',
      },
      {
        q: 'What is a PWA and do I need one?',
        a: 'A progressive web app (PWA) is a web app that can be installed on the home screen, opens in its own window and can work offline, using a web app manifest and a service worker. You need one if installability, offline use or push notifications matter and you do not want a separate native app. You do not need one for a content site or a desktop-only tool. DuSu is delivered as a PWA and, from the same web app, as an Android package.',
      },
      {
        q: 'Which tech stack is best for a web app?',
        a: 'There is no single best stack; the best one is a stack your team can maintain, that suits how users will interact with the app, and that has a healthy ecosystem. For interactive products we start from React or Next.js with TypeScript, a Node.js or Python (FastAPI) API, Postgres for data and Docker for repeatable deploys. For a conventional, data-driven product, Ruby on Rails can get you there faster. We recommend once we know the users, the data and your team.',
      },
      {
        q: 'How much does a web application cost?',
        a: 'It depends on scope, so we price only once a written scope exists. Price depends on the number of user roles, distinct workflows, integrations and data migrations, and on how much must update in real time or work offline. Running cost follows design too: a product with 200+ users can cost about $0 a month to run, as DuSu does. Compare quotes on what they include, such as authentication, testing, deployment and documentation, not only the headline figure.',
      },
      {
        q: 'Can a web app work offline?',
        a: 'Yes, a web app can work offline, but offline behaviour has to be designed and is not a switch you turn on. A service worker can cache the app shell and recent data so the app opens without a connection. Reading cached data is straightforward. Creating or editing data offline means deciding how changes merge when the connection returns, and that is where much of the effort goes. We scope offline needs per feature, not per app.',
      },
    ],
    related: ['/services/mobile-app-development', '/services/custom-software-development', '/services/cloud-devops'],
  },

  // ---------------------------------------------------------------------------
  // P07 MVP development
  // ---------------------------------------------------------------------------
  {
    path: '/services/mvp-development',
    summary:
      'Launch the smallest product that tests your riskiest assumption: scoped to one core journey, built in milestones with demos, on foundations that can grow.',
    intro: [
      'MVP development is the work of designing and building a minimum viable product: the smallest live product that lets real users complete one valuable job, so you can test an assumption before paying to build the rest. We are an MVP development company that works with founders from the first scoping conversation through launch and the learning that follows.',
      'An MVP is not a prototype, and it is not a cut-down copy of the final product. It is real software with real users and real data, covering one core journey. The discipline lies in deciding what to leave out and writing down how you will know whether it worked.',
      'We build MVPs on foundations meant to grow: a sound data model, tests around the core journey and documented deployment. DuSu shows what a small architecture can carry: a single-file web app, a FastAPI backend with one WebSocket, and Postgres serve four practice modes and 200+ users.',
    ],
    forWho: [
      'Founders with a validated problem and no product yet, who need something real in users’ hands.',
      'Non-technical founders who want a technical partner to make build decisions and explain the trade-offs plainly.',
      'Teams inside an established company testing a new product line without risking the core system.',
      'Founders whose no-code prototype has hit its limits on permissions, performance or integrations.',
    ],
    deliverables: [
      'A one-page product brief: the user, the problem, the one core journey and the measure of success.',
      'A feature list sorted into launch, later and not now, with the reasoning written down.',
      'Clickable designs for the core journey, agreed before building starts.',
      'A live, deployed MVP: sign-in, the core journey, a simple admin view and basic usage analytics.',
      'Instrumentation that answers your launch question, for example how many sign-ups reach first value.',
      'A post-launch plan: what to measure, what to fix first and what the next milestone might be.',
      'Documentation and a handover walkthrough.',
    ],
    steps: [
      {
        title: 'Name the riskiest assumption',
        body: 'Every MVP exists to test something that might be false: that people will pay, that they will come back, that the workflow can be automated. We write that assumption down first and design the product to test it.',
      },
      {
        title: 'Cut the scope to one journey',
        body: 'We list every feature you want, then ask of each one: can a user still complete the core job without it? If yes, it waits. The result is a short launch list and an explicit “later” list with the reason for each item, so nothing is lost and nothing creeps in.',
      },
      {
        title: 'Choose a build that can change',
        body: 'No-code or custom code, which stack, which hosting. We choose for speed now and a low cost of change later. The decision goes into a short note: what we chose, what we rejected and what would make us revisit it, so that you can challenge it.',
      },
      {
        title: 'Build in short, demonstrated milestones',
        body: 'Each milestone is working software that you can click through. Demos replace status reports, and the feedback goes straight into what we build next.',
      },
      {
        title: 'Launch to a few users, measure, decide',
        body: 'We release to a small group first and watch the measure set in the first step. Then we help you decide: iterate, change direction or invest in scale.',
      },
    ],
    tech: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Python',
      'FastAPI',
      'Ruby on Rails',
      'Postgres',
      'Docker',
      'Vercel',
      'Render',
      'Cloudflare',
      'LLM integrations (Groq, Gemini, OpenRouter)',
    ],
    proof: [
      {
        label: 'DuSu: a focused product with 200+ users',
        href: '/work/dusu-ai-english-coach',
        text: 'An AI English-speaking coach that works by voice, built for mobile-first learners in India. One small architecture covers four modes (Talk, Interview, Learn and Daily Talk), a CEFR A0–B2 level test, a 7-level roadmap and learner memory, and runs at about $0 a month.',
      },
      {
        label: 'Edge Verify, in beta',
        href: 'https://ranabrothers.online/edgeverify/',
        text: 'A research platform for backtesting and paper trading, solo-built by David and currently in beta. Its tagline, “No signals, just proof”, states a narrow promise: show whether an idea survives costs and stress tests.',
      },
    ],
    comparison: {
      caption: 'No-code and custom code compared for a first version',
      columns: ['Factor', 'No-code or low-code', 'Custom code'],
      rows: [
        ['Speed to a first version', 'Fastest for simple forms, lists and workflows', 'Slower to start: environment, data model and deployment come first'],
        ['Upfront cost', 'Low', 'Higher'],
        ['Unusual business logic', 'Hard once the rules outgrow what the builder supports', 'No built-in ceiling'],
        ['Performance and scale', 'Bound by the platform’s limits and pricing tiers', 'You choose the architecture'],
        ['Integrations', 'Through the connectors the platform offers', 'Any system with an interface'],
        ['Data and portability', 'Data lives in the platform; exports can be partial', 'A database and schema you control'],
        ['Cost as usage grows', 'Platform fees often rise with users, records or runs', 'Hosting cost, which careful design keeps low'],
        ['Best when', 'You are testing demand with a simple flow and can discard the build', 'The logic, data or experience is the product, or you intend to keep the build'],
      ],
    },
    notFor: [
      'You want a finished platform with every feature on day one. An MVP is the opposite, and a full build needs a different scope.',
      'You have not yet spoken to the people who would use the product. Talk to them first; a build will not answer a question you have not asked.',
      'You want the cheapest possible build whatever it leaves out. We cut features, not testing, security or documentation.',
    ],
    faqs: [
      {
        q: 'What is an MVP?',
        a: 'An MVP, or minimum viable product, is the smallest live product that lets real users complete one valuable job, built to test an assumption and not to impress. It differs from a prototype, which real users cannot rely on, and from a full launch, which carries every planned feature. A good MVP is narrow, usable and instrumented, so every week it is live teaches you something.',
      },
      {
        q: 'How much does an MVP cost?',
        a: 'It depends on how many things the MVP must do well, so we price after a written scope and never before. Cost follows the number of user roles, the complexity of the core journey, integrations such as payments or messaging, data migration and any AI features. Cost also follows ambition: the longer the “later” list gets, the further the build drifts from minimum.',
      },
      {
        q: 'How long does it take to build an MVP?',
        a: 'It depends on scope, but a well-cut MVP is delivered as a sequence of working milestones and not as one long wait, and we give a schedule only once the scope is written. The schedule moves with the number of user roles, third-party integrations and approvals, and how fast feedback arrives from your side. Three things shorten it: one person who can decide for the business, content and data that are ready when the build needs them, and a scope that stays still between milestones.',
      },
      {
        q: 'Which features belong in an MVP?',
        a: 'Only the features the core journey cannot work without, plus whatever you need to measure whether it works. For each feature, ask whether a user can still complete the core job if it is removed; if so, it waits. Usually in: sign-in, the core action, a way to pay or sign up if you are testing willingness to pay, basic analytics and a simple admin view. Usually out: complex roles, settings pages, notification preferences, multiple languages and advanced reporting.',
      },
      {
        q: 'No-code or custom code for an MVP?',
        a: 'Use no-code when you are testing demand with a simple flow and are happy to discard the build. Use custom code when the logic, data or experience is the product, or when you already expect to outgrow a builder. A practical test: if your first three feature requests need something the builder cannot do, you have found its ceiling. Moving from no-code to custom later is possible, but it is a rebuild and not a migration.',
      },
      {
        q: 'What happens after the MVP launches?',
        a: 'You review the results against the success measure set before the build, then choose to iterate, change direction or invest in scale. We can stay on in a monthly arrangement for fixes and the next milestones, or hand over to your team with documentation and a walkthrough. Because the MVP has a sound data model, tests around the core journey and documented deployment, the next stage can build on it rather than start again.',
      },
    ],
    related: [
      '/services/custom-software-development',
      '/services/web-app-development',
      '/services/mobile-app-development',
      '/guides/how-to-build-an-mvp',
    ],
  },

  // ---------------------------------------------------------------------------
  // P11 Cloud and DevOps
  // ---------------------------------------------------------------------------
  {
    path: '/services/cloud-devops',
    summary:
      'Docker, CI/CD, monitoring and cost-aware hosting on Cloudflare, Vercel and Render, sized for startups and small teams rather than enterprises.',
    intro: [
      'Cloud and DevOps work covers everything between a developer’s laptop and a reliable running product: where the app is hosted, how code reaches production, how you find out when something breaks and what all of it costs each month. Our cloud and DevOps services for startups aim to make releases routine and the bill understandable.',
      'We deploy on Cloudflare, Vercel and Render, package services with Docker and keep data in Postgres. That combination can carry an early product at a modest running cost: DuSu serves 200+ users at about $0 a month. We start with the simplest setup that meets your needs, because every extra moving part is something a person has to operate.',
      'We also design cloud and microservices architectures, and we are cautious with them. A well-structured single service is easier to run than five services split too early. We separate services when there is a reason, such as independent scaling or separate team ownership, and not before.',
    ],
    forWho: [
      'Startups that deploy by hand, from a laptop or over SSH, and dread release day.',
      'Teams whose cloud bill is growing faster than their usage and cannot say why.',
      'Founders choosing hosting for a new product who want the simplest setup that will not need rebuilding.',
      'Teams moving a product between hosting platforms, or splitting a service that has outgrown itself.',
    ],
    deliverables: [
      'A short hosting and architecture recommendation, with the trade-offs and an estimate of monthly running cost.',
      'Containerised services, with Dockerfiles and reproducible local and production environments.',
      'Environment configuration kept in version control, so an environment that is lost or broken can be rebuilt from files.',
      'A CI/CD pipeline that tests, builds and deploys every change, with a documented rollback.',
      'Monitoring, logging and alerts tied to user-visible symptoms, plus backups with a restore test.',
      'Secrets and access set up on least-privilege lines, with a short security checklist.',
      'Runbooks and a handover: how to deploy, roll back, scale and recover, written for your team.',
    ],
    steps: [
      {
        title: 'Audit what runs and what it costs',
        body: 'We inventory services, environments, deploy steps, past incidents and the last few bills. The output is a baseline: what exists, what is fragile and where the money goes.',
      },
      {
        title: 'Package and standardise',
        body: 'Services move into containers, configuration and secrets move out of the code, and local, staging and production are made to behave alike. This removes many “works on my machine” failures.',
      },
      {
        title: 'Automate build, test and deploy',
        body: 'Every change runs through tests and a build, then deploys to staging and production from the same pipeline, with a rollback ready. Releases become small and frequent instead of large and rare.',
      },
      {
        title: 'Make failures visible',
        body: 'We add logs, uptime checks and error tracking, with alerts that fire on user-visible symptoms rather than on every metric. We also restore a backup once, because an untested backup is only a hope.',
      },
      {
        title: 'Rehearse the failures that matter',
        body: 'We walk through the failures that hurt most: a bad release, a full disk, an expired certificate, a provider outage. Each gets a documented response, and the rollback is tried at least once before anyone needs it.',
      },
      {
        title: 'Right-size and document',
        body: 'We tune instance sizes, schedules and retention against real usage, set budget alerts and write runbooks. Then we hand over, so your team can operate what we built.',
      },
    ],
    tech: ['Cloudflare', 'Vercel', 'Render', 'Docker', 'Postgres', 'FastAPI', 'Node.js', 'Next.js', 'WebSockets'],
    proof: [
      {
        label: 'Edge Verify, a data-heavy platform',
        href: '/work/edge-verify-backtesting-platform',
        text: 'Backtests run on eight years of five-minute NSE candles across 428 equity symbols. Stress tests include Monte-Carlo runs and 2×/3× slippage, and paper trading runs live on NSE prices. A workload like this makes storage layout, compute cost and reliability real design decisions.',
      },
      {
        label: 'DuSu: about $0 a month for 200+ users',
        href: 'https://dusu.ranabrothers.online',
        text: 'A cost-aware design in production. The server side is FastAPI with one WebSocket and Postgres, and providers are tried in order of measured latency: Groq, then Gemini, then OpenRouter, with users able to bring their own keys.',
      },
    ],
    comparison: {
      caption: 'Hosting options for a startup, compared by what they suit and what they ask of you',
      columns: [
        'Factor',
        'Edge and front-end hosting (Cloudflare, Vercel)',
        'Managed app hosting (Render)',
        'Large cloud providers (AWS, Google Cloud, Azure)',
      ],
      rows: [
        ['Suits', 'Static and server-rendered front ends, edge functions, caching and DNS', 'APIs, WebSocket services, background workers and managed Postgres', 'Large, regulated or highly customised workloads with many managed services'],
        ['Setup effort', 'Low: connect a repository', 'Low to moderate: a Docker image or native runtime, plus configuration', 'Highest: accounts, networking, permissions and many services to choose from'],
        ['Operations load', 'Low', 'Low to moderate', 'High unless you lean on managed services'],
        ['Cost shape', 'Low entry cost; usage-based beyond plan limits', 'Priced per service and instance, so easy to predict', 'Pay-per-use across many line items; needs active cost management'],
        ['Lock-in', 'Moderate: platform-specific edge features', 'Low if services are packaged with Docker', 'Depends on which managed services you adopt'],
        ['Typical fit', 'Web front end, marketing pages and global delivery', 'An API, workers and a database for an MVP or a small product', 'When scale, compliance or integrations demand it'],
        ['Our position', 'We deploy here', 'We deploy here', 'An option we weigh with you, not our default'],
      ],
    },
    notFor: [
      'You already have a platform team and a mature pipeline. A review might help, but you do not need us to run it.',
      'Your organisation needs formal compliance certification or an audit. That is specialist work, and we would say so.',
      'You want a large cloud-provider setup or Kubernetes because it is expected, not because a workload needs it. We will recommend the smaller setup first.',
    ],
    faqs: [
      {
        q: 'What does DevOps do for a startup?',
        a: 'DevOps gives a startup fast, safe releases and early warning when something breaks, so engineers spend their time on the product instead of on deployments and firefighting. In practice that means automated tests and deploys, matching environments, managed secrets, monitoring with sensible alerts, backups that have been restored at least once, and a monthly cost that someone can explain. For a small team it is mostly about removing manual steps.',
      },
      {
        q: 'How can I reduce my AWS bill?',
        a: 'Start by finding what you pay for and do not use: idle instances, oversized databases, unattached disks, forgotten test environments, logs kept forever and data transfer you did not plan for. Then right-size what remains, switch non-production environments off outside working hours, set budgets with alerts, and consider commitments only for steady, predictable workloads. These levers apply on any provider. For many early products the biggest saving comes from asking whether a simpler managed platform would do the job.',
      },
      {
        q: 'Do I need Kubernetes?',
        a: 'Almost certainly not at the start. Kubernetes solves the problem of running many services across many machines, and a startup with one or two services is better served by a managed platform or a few containers. It begins to earn its cost when you have several teams, many services, or scheduling and scaling needs that a platform cannot meet, plus someone to operate it. Docker on its own already gives you reproducible builds.',
      },
      {
        q: 'What is CI/CD?',
        a: 'CI/CD stands for continuous integration and continuous delivery: automation that builds, tests and ships every code change, so releases are routine and not risky events. On each change the pipeline installs dependencies, runs linting and tests, builds the app and, if everything passes, deploys it with a rollback ready. Platforms such as Vercel and Render can deploy straight from a Git push, which gives a small team a working pipeline early.',
      },
      {
        q: 'AWS, GCP or Azure for a startup?',
        a: 'Choose the provider your team can operate well, not the one with the longest service list; for most startups the differences matter less than keeping the setup simple and the bill visible. Compare where your data must live, which managed services you actually need (a database, queues, storage), your team’s existing skills, the startup credits on offer and how hard it would be to leave. Before choosing any of the three, ask whether Cloudflare, Vercel or Render is enough. For many early products it is.',
      },
    ],
    related: ['/services/maintenance-support', '/services/web-app-development', '/services/custom-software-development'],
  },

  // ---------------------------------------------------------------------------
  // P12 Maintenance and support
  // ---------------------------------------------------------------------------
  {
    path: '/services/maintenance-support',
    summary:
      'Bug fixes, security and dependency updates, monitoring and small improvements for software we built or inherited, under a written scope.',
    intro: [
      'Software maintenance and support services keep a live product secure, compatible and useful after launch: fixing bugs, applying security patches, updating dependencies and platform versions, watching the system and shipping small improvements. We support software after launch, with documentation and knowledge transfer so that your own team can take over whenever you choose.',
      'Software does not stay finished. Browsers, operating systems, libraries and the third-party services you depend on change underneath it, and an unmaintained product slowly stops working. DuSu is a live product with 200+ users and about $0 a month in running cost. Keeping a product like that healthy is a matter of habit: watch it, update it and fix what real users hit.',
      // VERIFY: confirm the studio takes over maintenance of software built by other teams; this also covers the "original developer has moved on" audience line and the "Can you maintain an app another company built?" answer.
      'We maintain software we built and software other teams built. For an inherited codebase we start with a review of the code, hosting and deployment, tell you what we find and agree what is covered before we take it on. We are most at home in React, Next.js, Node.js, Python, FastAPI and Ruby on Rails with Postgres. If your software is on something else, we say so after the review.',
    ],
    forWho: [
      'Founders whose original developer has moved on, leaving a live product that nobody is looking after.',
      'Businesses with software that works but is collecting ageing dependencies, security updates and expiring certificates.',
      'Teams without in-house engineers who need someone to take bug reports and small changes.',
      'Products with growing usage that need monitoring and a steady improvement cycle.',
    ],
    deliverables: [
      'A written maintenance scope: what is covered, what counts as a new feature and how requests are raised and prioritised.',
      'Bug fixes, each with a regression check so the fix does not break something else.',
      'Security and dependency updates for libraries, runtimes and frameworks, reviewed before release.',
      'Compatibility updates for browsers, mobile operating systems and changes in the third-party services you rely on.',
      'Monitoring, error alerts and backup checks, including a restore test.',
      'For any incident, a fix and a short written note on what happened and what changed.',
      'A regular summary of what was done, what was found and what we recommend next.',
      'Small improvements within the agreed scope, with larger features scoped separately as milestones.',
    ],
    steps: [
      {
        title: 'Review what you have',
        body: 'We read the code, check how it builds and deploys, look at hosting, backups, access and dependencies, and list the known bugs. You receive a written health report with the risks ranked by likelihood and impact.',
      },
      {
        title: 'Stabilise first',
        body: 'Before routine work we secure access, make sure backups run and restore, put basic monitoring in place and fix anything critical. We also make deployments repeatable, so later fixes are safe to ship.',
      },
      {
        title: 'Agree what is covered',
        body: 'We write down what the monthly work includes and excludes, how requests arrive, how they are prioritised and what you can expect from us in return. Both sides work from the same page.',
      },
      {
        title: 'Run the monthly cycle',
        body: 'Each month we triage the backlog, fix bugs, apply patches, release and report. Security updates and breakages go to the front of the queue; improvements follow your priorities.',
      },
      {
        title: 'Handle incidents and learn from them',
        body: 'When something breaks, we triage by user impact, restore service first and find the cause second. Afterwards you get a short written note: what happened, why, and what changed so it is less likely to happen again.',
      },
      {
        title: 'Review, adjust or hand over',
        body: 'We review the arrangement with you as the product changes. You can widen the scope, reduce it or move the work in-house with documentation and a walkthrough.',
      },
    ],
    tech: [
      'Python',
      'FastAPI',
      'Node.js',
      'Ruby on Rails',
      'React',
      'Next.js',
      'TypeScript',
      'Postgres',
      'Docker',
      'Render',
      'Vercel',
      'Cloudflare',
      'Kotlin (Android TWA)',
    ],
    proof: [
      {
        label: 'DuSu in operation',
        href: 'https://dusu.ranabrothers.online',
        text: 'A live product with 200+ users and about $0 a month in running cost. It has several moving parts to keep healthy: a PWA, an Android Trusted Web Activity, a FastAPI backend, a WebSocket, Postgres and a chain of three LLM providers.',
      },
      {
        label: 'DuSu case study',
        href: '/work/dusu-ai-english-coach',
        text: 'How the product is built and the decisions behind its running cost: speech in the browser, one WebSocket, FastAPI, Postgres, and two delivery routes, a PWA and an Android Trusted Web Activity.',
      },
    ],
    comparison: {
      caption: 'Ways to arrange software maintenance',
      columns: ['Factor', 'Fix on request', 'Monthly maintenance', 'Annual contract (AMC)'],
      rows: [
        ['How it works', 'You report a problem; it is quoted and fixed', 'A recurring monthly scope covers fixes, updates and monitoring', 'A yearly agreement for a defined scope and fee'],
        ['Cost shape', 'Pay per job, with spikes when things break', 'A steady monthly amount, with scope you can adjust', 'A fixed yearly amount; scope changes need renegotiation'],
        ['Proactive work (patches, monitoring)', 'Rarely included', 'Included in the scope', 'Included in the scope'],
        ['Flexibility', 'Highest', 'High: scope can change month to month', 'Lower: term and scope are fixed up front'],
        ['Best when', 'The software is stable and rarely changes', 'The product is live and evolving', 'Procurement needs one annual contract and the scope is stable'],
        ['Watch for', 'Slow starts and nobody watching the system', 'Vague scope: insist on a written list of what is covered', 'Paying for cover you do not use, and unclear exclusions'],
      ],
    },
    notFor: [
      'You need engineers on site. We work remotely.',
      'Your software runs on a stack outside React, Next.js, Node.js, Python, FastAPI and Ruby on Rails with Postgres. We say so after the review instead of taking it on blind.',
      'You want a fixed annual price for software nobody has looked at yet. We review first, then agree the scope.',
    ],
    faqs: [
      {
        q: 'How much does app maintenance cost per year?',
        a: 'It depends on the app, so we agree a monthly scope and fee only after reviewing the code and how it runs; a flat rate for every app would be wrong for most of them. Cost follows the size and age of the code base, the number of third-party services it relies on, how often the platforms underneath it change, traffic and data volume, and how quickly you need problems handled. Hosting and third-party fees are separate from the maintenance work.',
      },
      {
        q: 'What does software maintenance include?',
        a: 'Software maintenance covers four kinds of work: corrective (fixing bugs), adaptive (keeping up with changing browsers, operating systems and dependencies), preventive (security patches, refactoring and monitoring) and perfective (small improvements). A good scope names which of these are included and where new features begin, so neither side is surprised. Ours is written down before the work starts.',
      },
      {
        q: 'Can you maintain an app another company built?',
        a: 'Yes, once a review of the code, hosting and deployment shows us what we would be taking on. The review checks that the app builds from scratch, how it is deployed, whether tests exist, how old the dependencies are, where secrets are kept and whether backups restore. You receive the findings in writing, with what we would fix first. If the app needs more than maintenance, project rescue is the right engagement.',
      },
      {
        q: 'What is an SLA?',
        a: 'An SLA (service level agreement) is a written commitment about how a service will perform, usually how quickly problems are acknowledged and fixed and how much of the time the system is available. Tighter targets cost more, because they need people on hand at set times. Whether you need one depends on how critical the software is: a back-office tool rarely does, a revenue-critical system might. We do not publish response times on this page; what we commit to is agreed in writing for each arrangement.',
      },
      {
        q: 'What is a software AMC?',
        a: 'A software AMC (annual maintenance contract) is a yearly agreement under which a provider keeps a system running and updated for a defined scope and fee. It suits stable software and buyers who need one annual contract for procurement. Check what is excluded, how new features are handled and whether you are paying for cover you do not use. We work on a monthly arrangement, which lets the scope change as the product does.',
      },
    ],
    related: ['/services/cloud-devops', '/services/custom-software-development', '/services/project-rescue'],
  },
];

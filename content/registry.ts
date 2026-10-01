import type { FounderId } from '@/content/founders';

export type PageKind =
  | 'home'
  | 'hub'
  | 'service'
  | 'case-study'
  | 'guide'
  | 'about'
  | 'process'
  | 'faq'
  | 'contact'
  | 'legal'
  | 'utility';

export type NavGroup = 'build' | 'guidance' | 'ai';

export interface PageEntry {
  /** Lowercase, hyphenated, no trailing slash. */
  path: string;
  /** Short name for navigation, breadcrumbs and cards. */
  label: string;
  /** At most 60 characters, unique; used verbatim (no template suffix). */
  title: string;
  /** 110–160 characters, unique. */
  description: string;
  h1: string;
  kind: PageKind;
  group?: NavGroup;
  primaryKeyword: string;
  secondaryKeywords: string[];
  published: string;
  updated: string;
  parent?: string;
  author?: FounderId;
  noindex?: boolean;
}

const D = '2026-10-01';

export const pages: PageEntry[] = [
  {
    path: '/',
    label: 'Home',
    title: 'Rana Brothers | Software & AI Development Company, India',
    description:
      'Senior-led software and AI studio from Uttarakhand, India. We build web and mobile apps, MVPs and AI products for founders and growing businesses.',
    h1: 'Software, app and AI development that holds up in production.',
    kind: 'home',
    primaryKeyword: 'software and AI development company',
    secondaryKeywords: ['app development company India', 'AI development company India', 'software development company for startups'],
    published: D,
    updated: D,
  },

  // Services
  {
    path: '/services',
    label: 'Services',
    title: 'Software Development Services | Rana Brothers',
    description:
      'Custom software, web and mobile apps, MVPs, cloud, maintenance and technical guidance: what we build, how a project runs and how to start.',
    h1: 'Software development services',
    kind: 'hub',
    primaryKeyword: 'software development services',
    secondaryKeywords: ['app development services', 'custom software development services India', 'web and mobile app development services'],
    published: D,
    updated: D,
  },
  {
    path: '/services/custom-software-development',
    label: 'Custom software',
    title: 'Custom Software Development Company | Rana Brothers',
    description:
      'Custom software built around how your business really works: internal tools, portals, CRMs and integrations, designed and built by a senior team.',
    h1: 'Custom software development, built around your workflows',
    kind: 'service',
    group: 'build',
    primaryKeyword: 'custom software development company',
    secondaryKeywords: ['custom software development company India', 'custom CRM development', 'internal tools development', 'business process software'],
    published: D,
    updated: D,
    parent: '/services',
  },
  {
    path: '/services/mobile-app-development',
    label: 'Mobile apps',
    title: 'Mobile App Development Company in India | Rana Brothers',
    // VERIFY: iOS and store-launch delivery experience (proven today: PWA + Android Trusted Web Activity)
    description:
      'Android and iOS apps, cross-platform or installable web apps, from MVP to store launch, with the backend and admin tools behind them.',
    h1: 'Mobile app development for Android, iOS and cross-platform',
    kind: 'service',
    group: 'build',
    primaryKeyword: 'mobile app development company India',
    secondaryKeywords: ['app development company India', 'Android app development company India', 'cross-platform app development', 'app developer for small business'],
    published: D,
    updated: D,
    parent: '/services',
  },
  {
    path: '/services/web-app-development',
    label: 'Web apps',
    title: 'Web Application Development Company | Rana Brothers',
    description:
      'Fast, secure web applications: customer portals, dashboards, marketplaces and PWAs, built with React or Next.js and Node or Python backends.',
    h1: 'Web application development',
    kind: 'service',
    group: 'build',
    primaryKeyword: 'web application development company',
    secondaryKeywords: ['progressive web app development company', 'custom web application development', 'website vs web application'],
    published: D,
    updated: D,
    parent: '/services',
  },
  {
    path: '/services/mvp-development',
    label: 'MVP development',
    title: 'MVP Development Company for Startups | Rana Brothers',
    description:
      'Go from idea to a launched MVP with a senior team: discovery, design, build and launch in clear milestones, with regular demos and code you own.',
    h1: 'MVP development for founders who need to launch and learn',
    kind: 'service',
    group: 'build',
    primaryKeyword: 'MVP development company',
    secondaryKeywords: ['MVP development company India', 'MVP development services for startups', 'MVP development cost', 'no-code vs custom development'],
    published: D,
    updated: D,
    parent: '/services',
  },
  {
    path: '/services/cloud-devops',
    label: 'Cloud & DevOps',
    title: 'Cloud & DevOps Services for Startups | Rana Brothers',
    // VERIFY: AWS delivery experience (proven today: Cloudflare, Vercel, Render, Docker, Postgres)
    description:
      'CI/CD, containers, monitoring and sensible hosting choices on Cloudflare, Vercel, Render or AWS, sized for startups and SMBs rather than enterprises.',
    h1: 'Cloud and DevOps for startups and growing teams',
    kind: 'service',
    group: 'build',
    primaryKeyword: 'cloud and DevOps services for startups',
    secondaryKeywords: ['DevOps services for startups India', 'CI/CD setup', 'cloud cost optimisation for startups'],
    published: D,
    updated: D,
    parent: '/services',
  },
  {
    path: '/services/maintenance-support',
    label: 'Maintenance & support',
    title: 'Software Maintenance & Support Services | Rana Brothers',
    description:
      'Ongoing maintenance for software we built or inherited: bug fixes, security patches, dependency and OS updates, monitoring and small improvements.',
    h1: 'Software maintenance and support',
    kind: 'service',
    group: 'build',
    primaryKeyword: 'software maintenance and support services',
    secondaryKeywords: ['app maintenance services India', 'website maintenance services India', 'app maintenance cost per year'],
    published: D,
    updated: D,
    parent: '/services',
  },
  {
    path: '/services/software-consulting',
    label: 'Software consulting',
    title: 'Software Development Consulting | Rana Brothers',
    description:
      'Senior advice before you spend: product discovery, tech stack and architecture choices, vendor selection and build-vs-buy decisions.',
    h1: 'Software development consulting for founders and SMBs',
    kind: 'service',
    group: 'guidance',
    primaryKeyword: 'software development consulting',
    secondaryKeywords: ['software development consulting services India', 'technology consultant for startups', 'how to choose a tech stack for a startup', 'technical due diligence'],
    published: D,
    updated: D,
    parent: '/services',
  },
  {
    path: '/services/fractional-cto',
    label: 'Fractional CTO',
    title: 'Fractional CTO Services for Startups | Rana Brothers',
    description:
      "Senior technical leadership without a full-time CTO: roadmap, architecture, hiring help, vendor oversight and answers for investors' tech questions.",
    h1: 'Fractional CTO services for startups and SMBs',
    kind: 'service',
    group: 'guidance',
    primaryKeyword: 'fractional CTO services',
    secondaryKeywords: ['fractional CTO India', 'CTO as a service', 'virtual CTO services India', 'part-time CTO for startup'],
    published: D,
    updated: D,
    parent: '/services',
  },
  {
    path: '/services/project-rescue',
    label: 'Project rescue',
    title: 'Software Project Rescue & Code Takeover | Rana Brothers',
    description:
      'Stuck with a late, buggy or abandoned project? We audit the code, stabilise what works and take over delivery with a written recovery plan.',
    h1: 'Software project rescue: audit, stabilise, deliver',
    kind: 'service',
    group: 'guidance',
    primaryKeyword: 'software project rescue',
    secondaryKeywords: ['code audit services', 'take over app development from another developer', 'rewrite vs refactor legacy code'],
    published: D,
    updated: D,
    parent: '/services',
  },

  // AI
  {
    path: '/ai',
    label: 'AI',
    title: 'AI Development Company in India | Rana Brothers',
    description:
      'Production AI for real workflows: chatbots, retrieval over your documents, LLM features inside your app and new AI products, measured before launch.',
    h1: 'AI development for real business workflows',
    kind: 'hub',
    primaryKeyword: 'AI development company India',
    secondaryKeywords: ['AI development services', 'AI solutions for small business', 'hire AI developers India', 'AI agents for business'],
    published: D,
    updated: D,
  },
  {
    path: '/ai/ai-chatbot-development',
    label: 'AI chatbots',
    title: 'AI Chatbot Development Company | Rana Brothers',
    description:
      'Custom AI chatbots for websites and apps that answer from your own documents, hand off to humans and log every conversation for review.',
    h1: 'AI chatbot development, grounded in your business data',
    kind: 'service',
    group: 'ai',
    primaryKeyword: 'AI chatbot development company',
    secondaryKeywords: ['AI chatbot development company India', 'custom AI chatbot for website', 'custom chatbot vs SaaS chatbot', 'AI chatbot development cost India'],
    published: D,
    updated: D,
    parent: '/ai',
  },
  {
    path: '/ai/rag-development',
    label: 'RAG on your data',
    title: 'RAG Development Services: AI on Your Data | Rana Brothers',
    description:
      'Retrieval-augmented generation that answers from your documents with citations: ingestion, search, evaluation and access control in your cloud.',
    h1: 'RAG development: AI that answers from your own data',
    kind: 'service',
    group: 'ai',
    primaryKeyword: 'RAG development services',
    secondaryKeywords: ['chat with your documents AI for business', 'RAG vs fine-tuning', 'retrieval-augmented generation'],
    published: D,
    updated: D,
    parent: '/ai',
  },
  {
    path: '/ai/llm-integration',
    label: 'LLM integration',
    title: 'LLM Integration Services: Add AI to Your App | Rana Brothers',
    description:
      'Add GPT, Claude, Gemini or open-source models to your product: AI search, summaries, copilots and data extraction, with cost limits and fallbacks.',
    h1: 'LLM integration: add AI features to your existing product',
    kind: 'service',
    group: 'ai',
    primaryKeyword: 'LLM integration services',
    secondaryKeywords: ['OpenAI API integration services', 'add AI features to existing app', 'LLM failover'],
    published: D,
    updated: D,
    parent: '/ai',
  },
  {
    path: '/ai/ai-app-development',
    label: 'AI apps',
    title: 'AI App Development Company: GenAI Products | Rana Brothers',
    description:
      'From idea to launched AI product: generative AI apps, AI MVPs and voice-first experiences built end to end, like our AI English coach, DuSu.',
    h1: 'AI app development: generative AI products from idea to launch',
    kind: 'service',
    group: 'ai',
    primaryKeyword: 'AI app development company',
    secondaryKeywords: ['generative AI app development company', 'AI app development company India', 'AI MVP development'],
    published: D,
    updated: D,
    parent: '/ai',
  },

  // Work
  {
    path: '/work',
    label: 'Work',
    title: 'Our Work: Software & AI Case Studies | Rana Brothers',
    description:
      'Case studies of products we designed, built and launched: a voice-first AI English coach and a backtesting platform for Indian markets.',
    h1: 'Our work',
    kind: 'hub',
    primaryKeyword: 'our work',
    secondaryKeywords: ['software and AI case studies', 'AI app case study', 'backtesting platform case study'],
    published: D,
    updated: D,
  },
  {
    path: '/work/dusu-ai-english-coach',
    label: 'DuSu',
    title: 'DuSu Case Study: AI English-Speaking Coach | Rana Brothers',
    description:
      'How we built DuSu, a voice-first AI English coach with 200+ users: browser speech, FastAPI and a multi-provider LLM chain with latency failover.',
    h1: 'DuSu: building a voice-first AI English-speaking coach',
    kind: 'case-study',
    primaryKeyword: 'AI English-speaking coach',
    secondaryKeywords: ['voice AI app case study', 'LLM failover', 'PWA and Android TWA'],
    published: D,
    updated: D,
    parent: '/work',
    author: 'david',
  },
  {
    path: '/work/edge-verify-backtesting-platform',
    label: 'Edge Verify',
    title: 'Edge Verify: Building an NSE Backtester | Rana Brothers',
    description:
      'How we built Edge Verify: 8 years of 5-minute NSE data on 428 symbols, a realistic Indian cost model, no-lookahead execution and stress tests.',
    h1: 'Edge Verify: building an honest backtesting platform for Indian markets',
    kind: 'case-study',
    primaryKeyword: 'backtesting platform',
    secondaryKeywords: ['NSE backtester', 'trading software development', 'backtesting software development'],
    published: D,
    updated: D,
    parent: '/work',
    author: 'david',
  },

  // Guides
  {
    path: '/guides',
    label: 'Guides',
    title: 'Software Guides for Founders | Rana Brothers',
    description:
      'Plain-English guides for founders: how to build an MVP step by step and how to choose a software development company, written by engineers.',
    h1: 'Guides for founders and business owners',
    kind: 'hub',
    primaryKeyword: 'guides for founders',
    secondaryKeywords: ['software development guides', 'MVP guide', 'how to hire a software development company'],
    published: D,
    updated: D,
  },
  {
    path: '/guides/how-to-build-an-mvp',
    label: 'How to build an MVP',
    title: 'How to Build an MVP: Step-by-Step Guide (2026)',
    description:
      "A founder's step-by-step MVP guide: validate the problem, cut scope, choose no-code or code, build in sprints, then launch and measure. Checklist inside.",
    h1: 'How to build an MVP, step by step',
    kind: 'guide',
    primaryKeyword: 'how to build an MVP',
    secondaryKeywords: ['MVP development process step by step', 'what features should an MVP have', 'how to validate a startup idea'],
    published: D,
    updated: D,
    parent: '/guides',
    author: 'vibhanshu',
  },
  {
    path: '/guides/how-to-choose-a-software-development-company',
    label: 'Choosing a software company',
    title: 'How to Choose a Software Development Company (Checklist)',
    description:
      'A 20-point checklist for vetting a software or app development company: real proof of work, who builds it, contracts, IP, pricing and red flags.',
    h1: 'How to choose a software development company: a 20-point checklist',
    kind: 'guide',
    primaryKeyword: 'how to choose a software development company',
    secondaryKeywords: ['questions to ask before hiring an app development company', 'software outsourcing red flags', 'vetting a development partner'],
    published: D,
    updated: D,
    parent: '/guides',
    author: 'david',
  },

  // Company
  {
    path: '/about',
    label: 'About',
    title: 'About Rana Brothers: Senior-Led Studio from Uttarakhand',
    description:
      'Meet the brothers behind Rana Brothers, a remote-first software and AI studio from Khatima, Uttarakhand, building for clients in India and worldwide.',
    h1: 'About Rana Brothers',
    kind: 'about',
    primaryKeyword: 'about Rana Brothers',
    secondaryKeywords: ['Rana Brothers software', 'software studio Uttarakhand', 'founders'],
    published: D,
    updated: D,
  },
  {
    path: '/process',
    label: 'Process',
    title: 'Our Software Development Process | Rana Brothers',
    description:
      'How a project runs with us: discovery, scope and estimate, design and build in short sprints, testing, launch and support, with regular demos.',
    h1: 'How we build software',
    kind: 'process',
    primaryKeyword: 'build software',
    secondaryKeywords: ['software development process', 'how long does it take to build an app', 'discovery phase software development'],
    published: D,
    updated: D,
  },
  {
    path: '/faq',
    label: 'FAQ',
    title: 'FAQ: Contracts, IP, Payments & Support | Rana Brothers',
    description:
      'Straight answers on contracts, NDAs, IP and source-code ownership, payments in INR or USD, time zones, communication and support after launch.',
    h1: 'Frequently asked questions',
    kind: 'faq',
    primaryKeyword: 'frequently asked questions',
    secondaryKeywords: ['who owns the source code', 'NDA software development', 'working with a software studio'],
    published: D,
    updated: D,
  },
  {
    path: '/contact',
    label: 'Contact',
    title: 'Contact Rana Brothers: Get a Project Estimate',
    description:
      'Tell us about your project and we will reply with next steps, and a call if it is a fit. Share as much or as little as you know so far.',
    h1: 'Start a project',
    kind: 'contact',
    primaryKeyword: 'project estimate',
    secondaryKeywords: ['contact Rana Brothers', 'hire app developers', 'get a software quote'],
    published: D,
    updated: D,
  },
  {
    path: '/contact/thanks',
    label: 'Thanks',
    title: 'Thanks, We Have Your Message | Rana Brothers',
    description:
      'Your project details reached us. Here is what happens next, plus a few guides worth reading while you wait to hear back from the team.',
    h1: 'Thanks, we have your message',
    kind: 'utility',
    primaryKeyword: 'thanks message',
    secondaryKeywords: [],
    published: D,
    updated: D,
    parent: '/contact',
    noindex: true,
  },
  {
    path: '/privacy',
    label: 'Privacy',
    title: 'Privacy Policy | Rana Brothers',
    description:
      'How Rana Brothers collects, uses and protects the personal data you share through this website, and how to reach us about your data rights.',
    h1: 'Privacy policy',
    kind: 'legal',
    primaryKeyword: 'privacy policy',
    secondaryKeywords: [],
    published: D,
    updated: D,
  },
  {
    path: '/terms',
    label: 'Terms',
    title: 'Terms of Use | Rana Brothers',
    description:
      'The terms that apply when you use the Rana Brothers website, including content ownership, acceptable use, liability limits and governing law.',
    h1: 'Terms of use',
    kind: 'legal',
    primaryKeyword: 'terms of use',
    secondaryKeywords: [],
    published: D,
    updated: D,
  },
];

const byPath = new Map(pages.map((p) => [p.path, p]));

export function pageFor(path: string): PageEntry {
  const page = byPath.get(path);
  if (!page) throw new Error(`No registry entry for "${path}" (add it to content/registry.ts)`);
  return page;
}

export const hasPage = (path: string) => byPath.has(path);

export const indexablePages = () => pages.filter((p) => !p.noindex);

/** Home → … → page, following `parent` links (pages without a parent hang off home). */
export function breadcrumbTrail(path: string): PageEntry[] {
  const trail: PageEntry[] = [];
  let current: PageEntry | undefined = pageFor(path);
  while (current) {
    if (trail.some((t) => t.path === current!.path)) throw new Error(`Breadcrumb cycle at "${current.path}"`);
    trail.unshift(current);
    current = current.path === '/' ? undefined : pageFor(current.parent ?? '/');
  }
  return trail;
}

export const pagesInGroup = (group: NavGroup) => pages.filter((p) => p.group === group);

import type { AboutContent } from '@/content/types';

export const about: AboutContent = {
  story: [
    'Rana Brothers is a software and AI development studio run by brothers Vibhanshu Rana and David Singh Rana in Khatima, Uttarakhand. Vibhanshu is Co-Founder and CTO, and David is Co-Founder and COO. We both work on client projects directly, so the people you talk to about your project are the people working on it. Between us we cover front-end and back-end development, cloud infrastructure and AI engineering.',
    'We build web and mobile apps, dashboards and internal tools, along with the cloud and microservices architecture behind them. For startups, we build MVPs. We automate repetitive work, add AI features such as document question-answering and language-model integrations where they help, and advise on architecture, performance and technology choices. After launch, we support the product and pass on knowledge to your team.',
    'We work remotely, and we put decisions in writing. We agree the scope with you before we start, build in small steps you can see, and keep documentation where you can read it. When a careful choice and a fast one conflict, we recommend the careful one and explain the trade-off. We design systems to grow with the product, so early decisions do not force a rewrite later.',
    'We also design, build and run our own products. It is the best way to learn what things cost, what breaks and what is worth maintaining, and it keeps our advice grounded. DuSu, built by David, is a voice-first AI English-speaking coach for Indian, mobile-first learners. It has 200+ users, a running cost of about $0 a month and a language-model chain ordered by measured latency. Edge Verify, founded and built by David and now in beta, is a backtesting and paper-trading platform for Indian stocks, indices and crypto. It rules out same-candle and look-ahead execution, and it warns when a sample has fewer than 30 trades. It is research tooling, not investment advice. CloudDocSense, built by Vibhanshu, is a retrieval-augmented document-intelligence system that answers with cited sources. Our case studies describe how DuSu and Edge Verify were built.',
  ],
  values: [
    {
      title: 'The founders do the work',
      body: 'Both founders work on client projects directly. You speak to the people making the technical decisions, so nothing is lost between the first conversation and the build.',
    },
    {
      title: 'Reliability before speed',
      body: 'When the careful option and the fast one conflict, we explain the trade-off and recommend the careful one. A smaller release that works every day beats a larger one that works most days.',
    },
    {
      title: 'Designed to grow',
      body: 'We think about the next stage while building the first. That means clear structure and boundaries inside the system and no shortcuts that block growth, without building for scale you do not need yet.',
    },
    {
      title: 'Documented and handed over',
      body: 'We write down how the system works and hand over what your team needs to run, change or extend it. If we make a decision on your behalf, we can tell you why.',
    },
    {
      title: 'AI only where it helps',
      body: 'We use AI where it measurably improves a product, and we say so when a simpler approach does the job better. Where AI is involved, we show our working: DuSu labels its scores as AI-estimated, and CloudDocSense answers with cited sources.',
    },
  ],
  quickFacts: [
    { label: 'Based in', value: 'Khatima, Uttarakhand, India' },
    { label: 'Founded by', value: 'Vibhanshu Rana (Co-Founder & CTO) and David Singh Rana (Co-Founder & COO)' },
    { label: 'Focus', value: 'Web and mobile apps, cloud and microservices, MVPs, automation, AI features and technical consulting' },
    { label: 'Products', value: 'DuSu, Edge Verify (beta) and CloudDocSense' },
    { label: 'Works with', value: 'Startups and growing businesses, remotely' },
  ],
  quickAnswers: [
    {
      q: 'Who runs Rana Brothers?',
      a: 'Brothers Vibhanshu Rana (Co-Founder and CTO) and David Singh Rana (Co-Founder and COO) run the studio. Both work on client projects directly.',
    },
    {
      q: 'Where are you based?',
      a: 'We are based in Khatima, Uttarakhand, India. We work remotely, so you do not need to be near us to work with us.',
    },
    {
      q: 'Do you work remotely?',
      a: 'Yes. We work remotely and keep a project moving with calls, written updates and working builds you can try. We agree how and when we communicate before the build begins.',
    },
    {
      q: 'What have you built?',
      // VERIFY: confirm past client engagements a prospect could be referred to
      a: 'Alongside client work, we build our own products: DuSu, a voice-first AI English-speaking coach with 200+ users; Edge Verify, a beta platform for backtesting and paper-trading strategies on Indian markets; and CloudDocSense, a retrieval-augmented document-intelligence system that answers with cited sources. We have written case studies for DuSu and Edge Verify.',
    },
  ],
};

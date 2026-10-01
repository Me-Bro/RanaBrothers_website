// Copy for the /work hub. The case-study cards come from facts.ts; this file holds the prose around them.
import type { HubContent } from '@/content/types';

export const workHub: HubContent = {
  intro: [
    'These are products we designed, built and run ourselves: DuSu, a voice-first AI English-speaking coach used by 200+ learners, and Edge Verify, a beta platform for backtesting and paper-trading strategies on Indian markets, built on eight years of 5-minute NSE data.',
    'Each case study follows the same structure: the problem, the context and constraints, our role, the architecture, the key decisions and their trade-offs, the hard problems that remain, the results and what we would do next. Numbers are stated as of writing, and estimates are labelled as estimates.',
  ],
  sections: [
    {
      title: 'What the two products show',
      body: [
        'DuSu is a voice AI product built to stay fast and cheap. The browser’s built-in speech service handles speech, so no audio reaches DuSu’s servers and speech costs nothing to run. Replies come from a chain of three language-model providers ordered by measured latency, and one codebase ships as an installable web app and as an Android app. Its running cost is about $0 a month at 200+ users. It is the closest match if you are planning an AI app, an LLM integration or a mobile-first product.',
        'Edge Verify is data-heavy software where correctness matters more than speed of delivery. It tests trading strategies on 428 symbols with a realistic Indian cost model, never executes on the same candle that produced a signal, and treats stress tests as part of the product rather than an extra. It is the closest match if you need custom software that has to be right, such as a calculation engine, a reporting system or a platform built on large datasets.',
      ],
    },
    {
      title: 'Other products we have built',
      body: [
        'Vibhanshu built two more products that do not have case studies yet. CloudDocSense is a retrieval-augmented document-intelligence system: it answers questions from a set of documents and shows the sources behind each answer. RootEd is a multi-tenant school management platform, one platform serving many schools, built with React, Node.js, MongoDB and Docker. Ask us about either on a call.',
      ],
    },
    {
      title: 'Why the case studies are about our own products',
      body: [
        // VERIFY: confirm past client engagements a prospect could be referred to
        'Because the products are ours, we can publish the architecture, the decisions and the numbers in full, including the trade-offs and the problems that are still open. Client work is usually covered by confidentiality, so we publish a client case study only with the client’s written permission.',
        'On a call we can talk through work similar to yours within those limits, and show the products running. Both are live: DuSu at dusu.ranabrothers.online and Edge Verify, in beta, at ranabrothers.online/edgeverify.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Can I see the products running?',
      a: 'Yes. DuSu is live at dusu.ranabrothers.online, and Edge Verify runs in beta at ranabrothers.online/edgeverify. Each case study links to its product, so you can compare what we wrote with what we shipped.',
    },
    {
      q: 'Do you build products like these for clients?',
      a: 'Yes. The same work is available to clients: AI apps and language-model features, as in DuSu, and data-heavy custom software with strict correctness rules, as in Edge Verify. The services and AI pages describe how each kind of engagement works.',
    },
    {
      q: 'Who wrote these case studies?',
      a: 'The engineers who built the products. Each case study names its author and the date it was published, and it is updated when the facts change.',
    },
  ],
};

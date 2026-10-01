// Shapes for page content. Copy lives in typed modules (and Markdown for long articles);
// metadata (title, description, H1, keywords, dates) lives only in content/registry.ts.

export interface Faq {
  q: string;
  a: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface ProofItem {
  label: string;
  href: string;
  text: string;
}

export interface Comparison {
  caption: string;
  columns: string[];
  rows: string[][];
}

/** A service or AI page (/services/* and /ai/*). */
export interface ServiceContent {
  /** Must exist in the registry with kind 'service'. */
  path: string;
  /** Card one-liner, at most 160 characters. */
  summary: string;
  /** 1–3 paragraphs; the first sentence defines the service. */
  intro: string[];
  forWho: string[];
  deliverables: string[];
  /** 4–6 steps specific to this service. */
  steps: Step[];
  /** Only technologies the founders actually use. */
  tech: string[];
  /** At least one real proof point (case study or product). */
  proof: ProofItem[];
  comparison?: Comparison;
  /** When we are not the right fit (2–4). */
  notFor: string[];
  /** 4–6 questions people ask, each answered in its first sentence. */
  faqs: Faq[];
  /** 2–4 registry paths. */
  related: string[];
}

/** Body of a hub page (/services, /ai). */
export interface HubContent {
  intro: string[];
  sections: { title: string; body: string[] }[];
  comparison?: Comparison;
  faqs: Faq[];
}

export interface CaseStudyFacts {
  path: string;
  product: string;
  productUrl: string;
  summary: string;
  facts: { label: string; value: string }[];
  stack: string[];
  related: string[];
}

export interface AboutContent {
  story: string[];
  values: Step[];
  quickFacts: { label: string; value: string }[];
  quickAnswers: Faq[];
}

export interface ProcessContent {
  intro: string[];
  steps: { title: string; summary: string; whatHappens: string[]; youGet: string[] }[];
  engagementModels: { name: string; bestFor: string; howItWorks: string }[];
  communication: string[];
  faqs: Faq[];
}

export interface FaqGroup {
  title: string;
  items: Faq[];
}

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalDoc {
  effectiveDate: string;
  intro: string[];
  sections: LegalSection[];
}

export interface ContactContent {
  intro: string;
  nextSteps: Step[];
}

import type { CaseStudyFacts } from '@/content/types';

// Structured facts for the two case-study pages. The long-form copy lives in the sibling
// Markdown files (dusu-ai-english-coach.md, edge-verify-backtesting-platform.md).
export const caseStudies: CaseStudyFacts[] = [
  {
    path: '/work/dusu-ai-english-coach',
    product: 'DuSu',
    productUrl: 'https://dusu.ranabrothers.online',
    summary:
      'A voice-first AI English-speaking coach for Indian learners with 200+ users: on-device speech, FastAPI and an LLM chain ordered by measured latency.',
    facts: [
      { label: 'Users', value: '200+' },
      { label: 'Running cost', value: 'About $0/month' },
      { label: 'Modes', value: '4: Talk, Interview, Learn, Daily Talk' },
      { label: 'Levels', value: 'CEFR A0–B2 test, 7-level roadmap' },
      { label: 'Speech', value: 'Browser Web Speech, stays on the device' },
      { label: 'LLM chain', value: 'Groq → Gemini → OpenRouter, by measured latency' },
      { label: 'Ships as', value: 'PWA and Android Trusted Web Activity' },
    ],
    stack: [
      'FastAPI',
      'WebSocket',
      'Postgres',
      'Vanilla JavaScript',
      'PWA',
      'Android Trusted Web Activity (Kotlin)',
      'Web Speech API',
      'Groq',
      'Gemini',
      'OpenRouter',
    ],
    related: ['/services/mobile-app-development', '/ai/llm-integration', '/ai/ai-app-development'],
  },
  {
    path: '/work/edge-verify-backtesting-platform',
    product: 'Edge Verify',
    productUrl: 'https://ranabrothers.online/edgeverify/',
    summary:
      'A beta platform for backtesting and paper-trading strategies on Indian markets: 8 years of 5-minute NSE data, 428 symbols and no look-ahead execution.',
    facts: [
      { label: 'Status', value: 'Beta' },
      { label: 'Data', value: '8 years of 5-minute NSE equity data (2018–2026)' },
      { label: 'Symbols', value: '428' },
      { label: 'Markets', value: 'Indian stocks, indices and crypto' },
      { label: 'Costs modelled', value: 'Brokerage, STT, exchange charges, GST on charges, liquidity-tier slippage' },
      { label: 'Execution', value: 'No same-candle or look-ahead execution' },
      { label: 'Stress tests', value: '2×/3× slippage, late and worst-case fills, Monte-Carlo, bull/bear/sideways regimes' },
    ],
    // VERIFY: Edge Verify's languages, frameworks and hosting are not in the verified facts; add them once David confirms (the entries below name documented data and methods only)
    stack: ['NSE 5-minute equity data', 'Indian cost model', 'Monte-Carlo simulation', 'Live paper trading'],
    related: ['/services/custom-software-development', '/services/cloud-devops', '/services/web-app-development'],
  },
];

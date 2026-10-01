import type { HubContent } from '@/content/types';

// Copy for the /ai hub (SEO map P18).
// The sections on agents, automation and WhatsApp assistants describe how we would approach the work.
// They make no claim of delivered projects, so nothing in this file needs founder sign-off.

export const aiHub: HubContent = {
  intro: [
    'If you are looking for an AI development company in India, the useful question is not which model to use but which workflow to improve. We are a software, app and AI development studio in Khatima, Uttarakhand, run by brothers Vibhanshu Rana and David Singh Rana. We use AI where it measurably helps, and sometimes the right answer is a few rules and a database query.',
    'Chatbots, retrieval over your own documents (RAG), large language model (LLM) integration into an existing product and complete AI apps each have their own page. Agents, automation and WhatsApp assistants are sections below, where we describe how we would approach the work. Our proof today is DuSu, an AI coach for spoken English, and CloudDocSense, a document-intelligence system that answers with cited sources.',
  ],
  sections: [
    {
      title: 'AI agents',
      body: [
        'A chatbot answers questions. An agent carries out a task: it chooses the steps, calls tools such as your CRM or inventory system, and carries on until the job is done or it needs a person. An agent beats a chatbot when the path depends on what turns up, for example a refund that touches an order system, a policy and a ticket. If the user only needs an answer, a chatbot is cheaper and safer.',
        "Tools make a model's mistakes expensive, so guardrails matter more than the model. We would give an agent the narrowest permissions that do the job and require human approval before anything that spends money, messages a customer or is hard to undo. Every step is logged so a person can replay it, and step and spend limits stop runaway loops.",
      ],
    },
    {
      title: 'AI automation',
      body: [
        'AI automation uses a language model for the steps that need judgement about messy text, and ordinary code for the rest. Three patterns are common. Document processing extracts fields from invoices, forms or contracts into a fixed schema, checks them against rules and sends anything doubtful to a person. Follow-ups draft replies to enquiries and reminders for stale leads or unpaid invoices, with a person approving the first batch. Reports compute every number in code and let the model write only the narrative around them.',
      ],
    },
    {
      title: 'WhatsApp assistants',
      body: [
        // Source for the Meta statements below: https://about.fb.com/news/2026/05/introducing-business-ai-on-whatsapp-for-small-businesses-in-india/ (Meta, 14 May 2026).
        // Source for the WhatsApp Business app features: Meta help centre pages on greeting messages (https://faq.whatsapp.com/501866148528310),
        // away messages (https://faq.whatsapp.com/2565868990219715) and quick replies (https://faq.whatsapp.com/1791149784551042).
        // Link the sources in the page if the renderer supports inline links.
        "Start with Meta's own tools. The WhatsApp Business app already offers greeting and away messages, quick replies and a catalogue. On 14 May 2026 Meta also introduced Business AI for small businesses in India: an assistant you set up inside the app from your catalogue and documents, which answers common questions and lets you take over a conversation. Eligibility rules apply and features change, so check Meta's current documentation. For a small business with modest volume and someone who can step in, these tools may be all you need.",
        'A custom assistant makes sense when you hit a limit you can name: answers that need live data from your systems, shared conversations with audit logs, details flowing into a CRM, or Hinglish that needs testing. It would be built on the official WhatsApp Business Platform, which has its own onboarding, messaging rules and charges set by Meta. We would read the current terms before designing anything.',
        'Source: Meta, "Introducing Business AI on WhatsApp for Small Businesses in India", 14 May 2026.',
      ],
    },
    {
      title: 'How we decide if AI is worth it',
      body: [
        'We start from the workflow, not the technology. Who does this task today, how often, and how long does it take? What does a wrong answer cost? Could rules, a search page or a form do the job? The comparison table on this page lists the options in the order we try them, because each step costs more to run and carries a different risk.',
        'Next we build a small test set from real cases and run it before building anything large, and we estimate the cost of each task as well as of the build. If the test does not clear the bar, we say so and stop. The model comes last: GPT, Claude, Gemini or an open-weight model is an output of that test, not an input to it.',
      ],
    },
  ],
  comparison: {
    caption: 'Four ways to automate a task, in the order we try them',
    columns: ['Approach', 'Best when', 'Cost to run', 'Main risk'],
    rows: [
      [
        'Rules and scripts',
        'The logic is explicit and stable: validation, routing, calculations.',
        'Lowest. Negligible compute.',
        'Brittle when inputs vary; rules grow hard to maintain.',
      ],
      [
        'Classic machine learning',
        'You have labelled history and one narrow, repeated prediction, such as churn or demand.',
        'Low per prediction; data preparation and retraining take effort.',
        'Needs enough clean labelled data; drifts as the world changes.',
      ],
      [
        'LLM prompting',
        'Language is the input or output: summaries, drafts, messy text, field extraction, conversation.',
        'Paid per token, so it grows with volume and prompt length.',
        'Confident wrong answers, variable output, provider changes.',
      ],
      [
        'RAG (LLM plus retrieval)',
        'Answers must come from your own, changing documents and be checkable against a source.',
        'LLM cost plus indexing, storage and pipeline upkeep.',
        'Poor retrieval or stale documents give wrong answers that look well sourced.',
      ],
    ],
  },
  faqs: [
    {
      q: 'What does an AI development company do?',
      a: 'It designs, builds and runs software whose core behaviour comes from a machine-learning model, most often a large language model: chatbots, document search, automation, agents and AI features inside an existing product. Most of the work is engineering around the model: retrieval, testing, safety limits and cost control. A good one also tells you when a simpler tool will do.',
    },
    {
      q: 'How much does AI development cost?',
      a: 'It depends on scope, so we scope before we price, and we can work in fixed-scope milestones or a monthly arrangement. The main drivers are data sources and integrations, the accuracy you need, the channels (web, app, WhatsApp) and the testing the use case requires. Running cost is separate from build cost: hosting plus model usage.',
    },
    {
      q: 'Where should a small business start with AI?',
      a: "Start with one repetitive, text-heavy task that someone already does every week, time it today and try the simplest tool that could work. Often an existing product is enough, such as Meta's own WhatsApp tools or a SaaS chatbot. Build custom only when you can name the limit you have hit: an integration, a language, data control or cost.",
    },
    {
      q: 'Is my data safe with AI models?',
      a: "It depends on what you send, to whom and under which terms, so the design decides, not the model. Send the minimum the task needs, keep keys on the server and read the retention, training-use and region terms of the exact plan you will use. In our own products, DuSu's speech stays on the device, its users can bring their own keys, and CloudDocSense shows the sources behind each answer.",
    },
  ],
};

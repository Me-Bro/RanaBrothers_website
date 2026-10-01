import type { ServiceContent } from '@/content/types';

// Copy for the four /ai/* service pages (SEO map P19, P23, P24, P25).
// Claims about Rana Brothers come only from the verified facts about DuSu and CloudDocSense.
// Everything else is general engineering explanation. Anything beyond that is flagged for founder sign-off.

export const aiPages: ServiceContent[] = [
  {
    path: '/ai/ai-chatbot-development',
    summary:
      'Custom AI chatbots that answer from your own documents, cite their sources, say so when they do not know and hand over to a person.',
    intro: [
      'AI chatbot development is the work of building an assistant that holds a conversation and answers from your own material (help articles, policies, product data, order records) instead of from whatever a general model remembers. The result behaves like a well-briefed member of staff: it knows your content, stays on topic and says so when it cannot help.',
      'Choosing an AI chatbot development company comes down to three questions. Where do the answers come from? What is the bot allowed to say? What happens when it is wrong? We design around those three. Answers are retrieved from your documents, shown with their sources and refused when nothing supports them. Anything the bot should not decide alone goes to a person.',
      'Our proof is two working systems rather than a demo reel. DuSu is an AI coach for spoken English: learners talk to it and it talks back. CloudDocSense answers questions from a document set and cites its sources. A website or in-app chatbot joins those two skills: natural conversation, grounded in your documents.',
    ],
    forWho: [
      'Businesses whose team keeps answering the same questions, and whose answers already exist in help pages, policy documents or a product database.',
      "Product teams that want an assistant inside their app: one that explains features, guides set-up or searches the customer's own data.",
      'Founders for whom the chatbot is a core feature of the product rather than a widget bolted on, and who want one team to own the design.',
      'Teams that have tried a SaaS chatbot and reached its limits on integrations, languages, data control or cost.',
    ],
    deliverables: [
      'A written scope: the questions the bot must handle, the ones it must refuse, the sources it may use and the channels it will live in.',
      'An ingestion pipeline that turns your documents and web pages into searchable passages and keeps them current.',
      'The chatbot itself: a web chat widget or in-app panel with streaming replies and the sources shown beside each answer.',
      'Hand-off rules: when the bot passes the conversation, with its transcript, to a person.',
      // VERIFY: confirm a reviewable conversation log is part of standard chatbot scope (the page metadata promises logging) and who controls how long it is kept.
      'A conversation log your team can search and review, so that failures turn into fixes.',
      'A test set built from your real questions, scored automatically and re-run after every change.',
      "Optional voice mode using the browser's speech-to-text and text-to-speech, as in DuSu.",
      'Documentation and handover: how the pieces fit, how to add content or change the model, and how to run the system without us.',
    ],
    steps: [
      {
        title: 'Collect the real questions',
        body: 'We start from what customers actually ask: support tickets, chat transcripts, search queries, sales-call notes. We group them and sort each group into three piles: the bot answers, the bot routes to a person or a form, the bot refuses. That sorting becomes the scope and the first draft of the test set.',
      },
      {
        title: 'Prepare the knowledge',
        body: 'A chatbot repeats what it is given, so the content comes first. We remove out-of-date pages, resolve contradictions and give each source an owner. Passages are split along headings and clauses and tagged with product, language and date, so retrieval can filter.',
      },
      {
        title: 'Build the conversation layer',
        body: 'Retrieval finds the relevant passages, the model writes from them alone and the interface shows the sources. Around that core we add the rules. The bot refuses when nothing relevant is found. Transactions such as order status follow fixed routes. Hindi, Hinglish and English are handled, and clear triggers pass the chat to a person.',
      },
      {
        title: 'Test against your own questions',
        body: 'We score the bot on questions you recognise: ones it should answer, ones it should refuse and ones designed to trick it, such as off-topic requests and attempts to override its instructions. Each failure becomes a new test, and a change ships only if the score does not fall.',
      },
      {
        title: 'Release narrowly, then widen',
        body: 'The first release covers one page, one audience or a small share of traffic. We read real conversations, fix gaps in the content before touching prompts, and widen only when the remaining failures are ones you accept.',
      },
      {
        title: 'Hand over and keep improving',
        body: 'You receive the documentation and the test set, and your team is shown how to add content, read the logs and change the model. We can support the system after launch, with knowledge transfer to your team, or leave you to run it.',
      },
    ],
    tech: [
      'Python',
      'FastAPI',
      'LlamaIndex',
      'LangChain',
      'pgvector',
      'Postgres',
      'WebSockets',
      'Next.js',
      'React',
      'TypeScript',
      'Groq',
      'Gemini',
      'OpenRouter',
    ],
    proof: [
      {
        label: 'DuSu: conversational voice AI',
        href: '/work/dusu-ai-english-coach',
        text: 'DuSu coaches spoken English for learners in India, and learners talk to it in four modes: Talk, Interview, Learn and Daily Talk. It keeps a memory of each learner, its scores are labelled AI-estimated, and its Learn mode starts from Hindi or Hinglish. More than 200 people use it.',
      },
      {
        label: 'CloudDocSense: answers with cited sources',
        href: '/ai/rag-development',
        text: 'A retrieval-augmented document-intelligence system built by Vibhanshu with Python, FastAPI, LlamaIndex and pgvector. It answers from a document set and shows the sources behind each answer. It has no public demo, so our RAG page explains how a system like it is built.',
      },
    ],
    comparison: {
      caption: 'Custom AI chatbot or SaaS chatbot: how they differ',
      columns: ['Factor', 'SaaS chatbot platform', 'Custom-built chatbot'],
      rows: [
        [
          'Time to a first working bot',
          'Short. You configure rather than build: point it at your site, pick a theme, test.',
          'Longer. Design, build and testing come before launch.',
        ],
        [
          'Where answers can come from',
          "Your website, uploaded files and the vendor's fixed list of connectors.",
          'Any system you can query: documents, a database, order or booking APIs, with permissions per user.',
        ],
        [
          'Hindi, Hinglish and other languages',
          "Whatever the vendor's model handles, usually with limited room to tune it.",
          'We choose and test models on your real messages in each language.',
        ],
        [
          'Data and vendor terms',
          "Conversations sit on the vendor's platform under the vendor's terms.",
          'Where it runs, what is stored and which model providers see it are design decisions made with you.',
        ],
        [
          'How the cost behaves',
          'A subscription that usually grows with seats, conversations or features.',
          'A build cost, then hosting, model usage and upkeep that you can see line by line.',
        ],
        [
          'Best when',
          'Your questions are standard, your content is on a public site and you need something live quickly.',
          'Answers depend on your own systems, permissions or languages, or the chatbot is part of your product.',
        ],
      ],
    },
    notFor: [
      'Your questions have a small, fixed set of answers, such as opening hours, a price list or an order status. A clear FAQ page or a rule-based menu is cheaper, faster and fully predictable, and we will tell you so.',
      'Your documents are out of date, contradict each other or do not exist yet. A chatbot repeats what it is given, so the content has to be fixed first.',
      'A wrong answer could cause serious harm and nobody will review it, for example medical or legal guidance given straight to the public. We would want a person in the loop, or we would advise against it.',
      'You need something live immediately for a standard set of questions. A SaaS chatbot is configured rather than built and will get you there sooner.',
    ],
    faqs: [
      {
        q: 'How much does AI chatbot development cost in India?',
        a: 'It depends on scope, so we quote after reading your documents and mapping the channels instead of guessing a figure here. Four things move the price most: the number and cleanliness of your knowledge sources, the systems the bot must connect to (CRM, orders, bookings), the languages it must handle and the testing the use case demands. Running cost is a separate line of hosting and model usage that grows with traffic. We can work in fixed-scope milestones or on a monthly arrangement.',
      },
      {
        q: 'Custom chatbot or SaaS chatbot: which is better?',
        a: 'Neither is better in general. A SaaS chatbot wins when your questions are standard and your content sits on a public website. A custom chatbot wins when answers depend on your own systems, permissions or languages. SaaS tools are quicker to start and cheaper to trial; their costs appear later as limits on integrations, data control and tuning. Custom work costs more up front and needs upkeep. If you are unsure, trial a SaaS tool first and build only when you can name the limit you hit. The table on this page compares them side by side.',
      },
      {
        q: 'Can a chatbot be trained on my documents?',
        a: "Yes, though 'trained' is the wrong word. Some people call this a custom ChatGPT for business. The chatbot retrieves the passages that match each question and writes its answer from them, so no model is retrained and a corrected document is reflected once it is re-indexed. It can work from PDFs, Word files, web pages, help-centre articles and exported spreadsheets, and from database records through a query. Quality follows the documents: scanned pages need text extraction, and stale or contradictory files give stale or contradictory answers. Our RAG page covers the method in more depth.",
      },
      {
        q: 'How do you stop a chatbot from making things up?',
        a: 'You cannot reduce it to zero, but you can make it rare and visible. The chatbot is told to answer only from retrieved passages, must cite them and refuses when retrieval finds nothing relevant. We also check that each citation points to a passage that was really retrieved, test with questions that have known answers and questions that have none, and review real conversations after launch. CloudDocSense answers with cited sources so a reader can check each claim, and DuSu labels its scores as AI-estimated instead of presenting them as fact.',
      },
      {
        q: 'Can the chatbot reply in Hindi and Hinglish?',
        a: "Yes. Current language models can read and write Hindi in Devanagari and Hinglish (Hindi in Roman script), and DuSu's Learn mode already starts from Hindi or Hinglish. Quality still differs between models and topics, and a Hinglish question must still find an English document. So we test candidate models and the retrieval step on real messages in each language before choosing. If your customers mix languages inside one message, the test set should too.",
      },
    ],
    related: ['/ai', '/ai/rag-development', '/ai/llm-integration', '/work/dusu-ai-english-coach'],
  },
  {
    path: '/ai/rag-development',
    summary:
      'Retrieval-augmented generation that answers from your documents and cites its sources: ingestion, search, evaluation and access rules, built and handed over.',
    intro: [
      'RAG development means building a system that answers a question by first retrieving the most relevant passages from your own documents. A language model then writes the answer from those passages and says where each part came from. RAG stands for retrieval-augmented generation.',
      'The reason to do it is control. A model answering from memory cannot show where a claim came from. Its knowledge goes out of date, and it has never read your contracts, manuals or tickets. Retrieval gives it your current material at the moment of the question. An answer can then be checked against a source, and a wrong answer is fixed by correcting a document instead of retraining a model.',
      'CloudDocSense is our working example: a document-intelligence system built on Python, FastAPI, LlamaIndex and pgvector that answers with cited sources. Our RAG development services cover the path from document audit to handover. This page explains how a system like it is built, how it fails and how we measure it.',
    ],
    forWho: [
      'Teams with a large body of knowledge (policies, manuals, contracts, tickets, research) that people struggle to search.',
      'Support and operations teams who answer from documents and need every answer to be traceable to a source.',
      "Product owners adding 'chat with your documents' to an application, where each customer's data must stay separate from every other customer's.",
      'Organisations that tried a general chatbot on their files and found that it invented details or could not show where an answer came from.',
    ],
    deliverables: [
      'A document inventory: what you have, in which formats, who owns each source, how often it changes and who may read it.',
      'An ingestion pipeline: parsing, cleaning, splitting into passages, metadata and embeddings, with re-indexing when a source changes or is withdrawn.',
      'A retrieval layer on a vector database (pgvector in Postgres, as in CloudDocSense), combined with keyword search and re-ranking where testing shows a gain.',
      'Answer generation that cites the passages it used, checks that each citation was really retrieved and declines when nothing relevant is found.',
      // VERIFY: confirm permission-aware retrieval (per-user or per-tenant filtering) is part of standard RAG scope; the page metadata promises access control.
      'Access rules: each passage carries the groups allowed to read it, and retrieval filters on them before the model sees anything.',
      'An evaluation harness: questions with known answers, scores for retrieval and for faithfulness, and a re-run after every change.',
      'Documentation and handover: how to add sources, re-index, read the scores and change the model.',
    ],
    steps: [
      {
        title: 'Audit the sources',
        body: 'We list every source with its format, owner, update frequency, language and readers. Text extraction is tested on real files first: scanned pages need optical character recognition (OCR), tables and diagrams need separate handling, and a source that cannot be parsed cleanly is better left out than guessed at.',
      },
      {
        title: 'Design passages and metadata',
        body: 'Documents are split along their structure (headings, clauses, table rows) instead of at a fixed length alone. Each passage keeps its source, section, date, language and access group, because citations, filters and freshness rules all depend on that metadata.',
      },
      {
        title: 'Get retrieval right on its own',
        body: 'Before any answer is written we test search alone: for each test question, does the right passage appear among the top results? We compare embedding models, hybrid keyword and vector search, and re-ranking. Many wrong answers start here, so it is fixed first.',
      },
      {
        title: 'Generate with citations',
        body: 'The model receives the question and the retrieved passages and is told to answer only from them. Every claim carries a citation, we check that each cited passage was really retrieved, and when the evidence is weak or conflicting the system says so instead of picking a side.',
      },
      {
        title: 'Measure faithfulness',
        body: 'We score the whole pipeline on your question set: was the right passage found, is every statement supported by the passages cited, is the answer correct, and did the system decline what it should. We change one variable at a time (passage size, model, re-ranker) so every result has a cause.',
      },
      {
        title: 'Keep the index true',
        body: 'Documents change and get withdrawn. We build the re-indexing job, make sure vectors are removed when a source is deleted, track the questions that went unanswered and hand over a runbook so your team can operate it.',
      },
    ],
    tech: ['Python', 'FastAPI', 'LlamaIndex', 'LangChain', 'pgvector', 'Postgres', 'Docker'],
    proof: [
      {
        label: 'CloudDocSense: answers with cited sources',
        href: '/ai/ai-chatbot-development',
        text: 'Built by Vibhanshu with Python, FastAPI, LlamaIndex and pgvector, CloudDocSense answers questions from a document set and shows the sources behind each answer. It has no public demo, so this page describes the method instead of a screen recording. The chatbot page shows how the same grounding works behind a chat interface.',
      },
    ],
    comparison: {
      caption: 'RAG development choices: RAG, fine-tuning or long-context prompting',
      columns: ['Approach', 'Best when', 'Weak at', 'Keeping knowledge current'],
      rows: [
        [
          'RAG',
          'Answers must come from a large or changing set of documents and be checked against a source.',
          'Changing how a model writes or reasons. If retrieval misses the right passage, the answer is wrong.',
          'Re-index the changed document. No model is retrained.',
        ],
        [
          'Fine-tuning',
          'You need a consistent style, format or task behaviour that prompting cannot achieve, such as a strict output schema.',
          'Adding facts reliably. It does not reliably cite a source, and what it learned is frozen at training time.',
          'Prepare new examples and train again.',
        ],
        [
          'Long-context prompting',
          'The whole source fits in one prompt, volume is low and you want no extra infrastructure.',
          'Cost and speed: the documents are sent again with every question. Details buried in very long inputs can be missed.',
          'Replace the text in the prompt.',
        ],
        [
          'RAG plus fine-tuning',
          'Answers need your documents and also a precise house style or output format.',
          'More moving parts to build, test and maintain.',
          'Re-index for facts. Retrain only when the style or format must change.',
        ],
      ],
    },
    notFor: [
      'Your data is mostly structured records, such as sales figures or stock levels. A database query or a report answers those exactly, and retrieval over text is the wrong tool.',
      'You have a few short documents that fit in a single prompt. Pasting them in is simpler and cheaper to build; add retrieval only when volume or cost demands it.',
      'You need a guaranteed answer every time. RAG reduces unsupported answers and shows its evidence, but it cannot promise perfection, and anything high-stakes needs a person to check the result.',
      'The documents are not yours to use, or nobody has decided who may read what. Settle that first: the system can enforce permissions but cannot decide them.',
    ],
    faqs: [
      {
        q: 'What is RAG in AI?',
        a: 'Retrieval-augmented generation (RAG) is a technique in which a system first retrieves relevant passages from a knowledge source and then has a language model write its answer from those passages. In practice, your documents are indexed so they can be searched by meaning as well as by keyword. Each question pulls back the few passages most likely to hold the answer. The model answers from them and cites them. It is not retrained, so its knowledge is as current as your index.',
      },
      {
        q: 'RAG or fine-tuning: which is better?',
        a: 'For answering questions from your documents, RAG is usually the better first choice, because fine-tuning changes how a model behaves but is not a reliable way to teach it facts. RAG shows its sources and updates when a document changes. Fine-tuning earns its place when you need a consistent style or output format that prompting cannot produce, and the two can be combined. The comparison table on this page sets out the trade-offs, with long-context prompting as a third option.',
      },
      {
        q: 'How accurate is a RAG chatbot?',
        a: 'It is as accurate as its retrieval and its source material allow, and the only honest way to know is to measure it on your own questions. A single accuracy figure quoted without reference to your documents tells you little. We measure three things separately: whether the right passage was found, whether every statement is supported by the cited passages, and whether the system declines questions it cannot answer. The scores are re-run after every change, so you can see the effect of each one.',
      },
      {
        q: 'What kinds of data can RAG use?',
        a: 'Almost any content that can be turned into text: PDFs, Word files, web pages, wikis, help articles, emails, tickets, transcripts and exported spreadsheets. Scanned documents need OCR first, and tables, charts and diagrams need extra handling or their content is lost. Structured records in a database are usually better queried directly than embedded as text, and a model can be given that query as a tool alongside retrieval. That is why we start with an audit of your sources: their format and quality drive much of the effort.',
      },
      // VERIFY: confirm we will deploy RAG systems into a client-owned cloud account, and which regions or providers (including any India region) we can commit to.
      {
        q: 'Can RAG run on India-hosted or private infrastructure?',
        a: "Technically yes, because the parts are ordinary: a vector store such as pgvector in Postgres, a Python API and a language model endpoint, and each can run on infrastructure you choose. The model endpoint decides where your text is processed. A hosted model API processes prompts in the provider's own regions. To keep everything in India or fully private, you either choose a provider endpoint that offers it or run an open-weight model on hardware you control. The second route adds hardware and upkeep costs, and its quality must be tested against your questions. We can build the retrieval and API layers in a cloud account you own and in a region you name, and we would settle the model endpoint with you during scoping.",
      },
    ],
    related: [
      '/ai/ai-chatbot-development',
      '/ai/llm-integration',
      '/ai/ai-app-development',
      '/services/software-consulting',
    ],
  },
  {
    path: '/ai/llm-integration',
    summary:
      'Add AI features to a product you already run: search, summaries, copilots and data extraction, with a provider layer, cost limits, fallbacks and tests.',
    intro: [
      'LLM integration is the engineering work of connecting a large language model (LLM) to a product that already exists. The aim is a feature, such as AI search, summaries, a copilot inside the app, classification or data extraction, that works reliably inside your real workflows and not only in a demo.',
      'Calling a model API takes an afternoon. LLM integration services are really about everything else, because that decides whether the feature survives real users. You need outputs your code can parse, timeouts and retries, and a fallback when a provider is slow or down. You also need a ceiling on spend, a test that runs before each change and a rule for what data may leave your system. We build those parts around the model call.',
      'Our reference is DuSu. Its model calls follow a chain of providers (Groq, then Gemini, then OpenRouter) ordered by measured latency, users can bring their own keys, and the scores a model produces are labelled AI-estimated. Failover, who pays for model usage and honest labelling of model output are the habits we bring to your product.',
    ],
    forWho: [
      'Product teams with a live web or mobile app who want one or two AI features without rebuilding the product around them.',
      'Founders whose prototype calls a single provider and who need it to survive real traffic, provider outages and a monthly budget.',
      'Teams whose AI bill or response time has grown beyond plan and who need measurement before optimisation.',
      "Engineering leads who want an independent review of an AI feature's design: prompts, structured output, evaluation and data flow.",
    ],
    deliverables: [
      'A feature specification: the user-facing behaviour, the data the model may see, the output format and what counts as a correct result.',
      'A provider layer: one internal interface in front of the model APIs, so changing model or vendor does not mean rewriting the feature.',
      'Structured outputs: schemas, validation and automatic repair, so downstream code receives data it can trust.',
      'Failover, timeouts and retry rules, plus spending limits per user, per feature and per month.',
      'An evaluation set and a regression test that runs on every change to a prompt or a model.',
      'Handover notes: prompts under version control, how to add a provider and how to read the cost and latency figures.',
    ],
    steps: [
      {
        title: 'Pick one feature and define correct',
        body: 'We choose the narrowest feature with measurable value, such as ticket summaries, contract data extraction or an in-app search box. We write down examples of good and bad output and set targets for response time and cost per use before any model is chosen.',
      },
      {
        title: 'Map the data flow',
        body: 'We list which fields the model needs, which must be masked or never sent, where outputs are stored and who can see logs. The terms of each candidate provider are checked for the plan you would really use. The data flow is written down and reviewed with you before the first request is sent.',
      },
      {
        title: 'Compare models on your task',
        body: 'We shortlist hosted models from several providers and, where data control demands it, open-weight models. Each runs on the same examples. We record quality, response time and cost per successful task, then choose the cheapest model that clears the bar and keep a second one as the fallback.',
      },
      {
        title: 'Build the provider layer',
        body: "One interface, several providers. Requests carry timeouts and retry with backoff, a slow or failing provider hands over to the next in the chain, and keys stay on the server. Where users should pay for their own usage, the same layer accepts a user's own key.",
      },
      {
        title: 'Add limits and guardrails',
        body: 'Outputs are validated against a schema and inputs are size-limited. Each user and feature has a spending cap. Text from outside sources is treated as data, never as instructions, and any model-triggered action that changes records waits for confirmation.',
      },
      {
        title: 'Release behind a flag and watch',
        body: 'The feature ships to a small group first. We watch response-time percentiles, error rate, cost per task and how often users correct the output, and we re-run the evaluation whenever a provider updates or retires a model.',
      },
    ],
    tech: [
      'Python',
      'FastAPI',
      'Node.js',
      'TypeScript',
      'Next.js',
      'WebSockets',
      'Postgres',
      'Docker',
      'Groq',
      'Gemini',
      'OpenRouter',
    ],
    proof: [
      {
        label: 'DuSu: a provider chain ordered by measured latency',
        href: '/work/dusu-ai-english-coach',
        text: "DuSu's language-model calls follow a chain: Groq first, then Gemini, then OpenRouter, an order set by measured latency rather than by preference. Users can bring their own provider keys, so usage on those requests is billed to their accounts. The interview scores the models produce are labelled AI-estimated instead of presented as fact. DuSu has 200+ users and about $0/month running cost.",
      },
    ],
    comparison: {
      caption: 'LLM integration options: where the model runs',
      columns: ['Option', 'Best when', 'Watch out for', 'Data control'],
      rows: [
        [
          'Hosted model from a major provider',
          'The task is hard (reasoning, long documents) and volume is moderate.',
          'Per-token cost that grows with usage, and a vendor that can change or retire a model.',
          "Set by the provider's terms for your plan: check retention, training use and region.",
        ],
        [
          'Smaller or faster hosted model',
          'The task is narrow, such as classification, extraction or short replies, or speed matters most.',
          'A lower quality ceiling. Test it on your own examples before trusting a benchmark.',
          'The same as above: it depends on the provider and the plan.',
        ],
        [
          'Open-weight model you host',
          'Data must stay on infrastructure you control, or volume is high and steady.',
          'You carry GPU capacity, scaling, updates and monitoring.',
          'Highest: prompts never leave your environment.',
        ],
        [
          'Gateway to many providers, such as OpenRouter',
          'You want one API for many models and easy switching or fallback.',
          'An extra hop, another set of terms, and less visibility into the underlying provider.',
          'Your text passes through the gateway and the provider it routes to.',
        ],
      ],
    },
    notFor: [
      'The answer can be computed exactly: tax, unit conversion, stock levels. Use code or a query. A model adds cost and a chance of error.',
      'You need identical output every time. Models are probabilistic. We can constrain and validate the output, but we cannot make it deterministic.',
      'You want AI added everywhere at once. We prefer one feature that measurably helps, shipped and measured, before the next.',
      'You plan to send regulated or sensitive personal data to a third-party model and have not cleared it with your legal adviser. We can design the data flow, but that decision is yours.',
    ],
    faqs: [
      {
        q: 'How do I integrate ChatGPT into my app?',
        a: "Call the model provider's API from your own server, never from the browser, and put your own interface in front of that call so the feature does not depend on one vendor. ChatGPT is OpenAI's consumer app; developers integrate the underlying models through the API. The working parts are a server-side key, a request that carries the instructions and the user's input, a streamed response, output validation, a timeout with a retry, and a spending limit. The model call itself is the smallest part of the job.",
      },
      {
        q: 'Which LLM is best for my use case?',
        a: 'There is no best model in general; the right one is the cheapest model that passes your own test set at an acceptable response time. Public rankings of GPT, Claude, Gemini and open-weight models change often and measure general ability, not your documents, your languages or your output format. So we shortlist a few hosted and open-weight candidates, run them on the same real examples and compare quality, speed and cost per successful task. A second model stays configured as the fallback.',
      },
      {
        q: 'How much do LLM APIs cost per month?',
        a: "The bill is roughly requests per month, multiplied by tokens per request, multiplied by the provider's per-token price. It can be negligible for an internal tool and significant for a busy consumer feature. Output tokens are usually priced higher than input tokens, and a chat resends its history on every turn, so long conversations cost more per message. Prices change often, so we do not print them here. We estimate from your expected traffic and measured token counts, then set limits to match. DuSu runs at about $0/month with 200+ users.",
      },
      {
        q: 'How do you control AI cost and latency?',
        a: 'By measuring both on every request, choosing the smallest model that passes your tests, and capping what any one user or feature can spend. The main levers are model routing (easy requests go to a small model), shorter prompts and capped replies, caching, streaming so people see words sooner, and a provider order set by measured latency, as in DuSu. Alerts on spend and on slow responses tell you early when something drifts.',
      },
      {
        q: 'Is it safe to send customer data to an LLM?',
        a: "It can be, if you decide what is sent, under which provider terms and what is stored before the first request. It is not safe if nobody decided. Send the minimum the task needs and mask the rest. Keep keys on the server, and read the retention, training-use and region terms of the exact plan you will use, because they differ between providers and between free and paid tiers. Personal data also carries legal duties, so involve your legal adviser.",
      },
    ],
    related: [
      '/work/dusu-ai-english-coach',
      '/ai/rag-development',
      '/services/web-app-development',
      '/services/software-consulting',
    ],
  },
  {
    path: '/ai/ai-app-development',
    summary:
      'Generative AI products from idea to launch: AI MVPs and voice-first apps built end to end, the way we built our AI English coach, DuSu.',
    intro: [
      'AI app development is the end-to-end work of turning an idea into a launched product whose core value comes from a model: a generative AI app, an AI MVP or a voice-first experience. It covers the interface, backend, data, evaluation and release, not only the model call.',
      'DuSu is the clearest example we can show. David built it at Rana Brothers as a spoken-English coach for learners in India who mostly use their phones. It has 200+ users and about $0/month running cost, and it runs as an installable web app and as an Android app. Its interview mode returns a scored report that is labelled AI-estimated.',
      'An AI product is still a product. When you choose an AI app development company, look at how it handles the usual questions. Who is the product for? What is the smallest version that proves the idea? What does each user cost to serve? How will you know it works? We answer those first and bring in AI where it measurably helps.',
    ],
    forWho: [
      'Founders with an idea for a product whose core feature is generated, conversational or spoken, and who need a first version in front of real users.',
      'Businesses starting a new AI-first product line rather than adding a feature to an existing one.',
      'Teams with a prototype in a notebook or a no-code tool who need it turned into a product with accounts, data and a release process.',
      'Teams building for Indian, mobile-first users, where network quality, device limits, language mix and price sensitivity shape the design.',
    ],
    deliverables: [
      'A product brief: the user, the job they hire the product for, the one core loop and what is out of scope for version one.',
      'A working AI core you can test early: prompts, model choice, evaluation examples and a measured cost per session.',
      'The application around it: an installable web app (PWA), backend, database, accounts and an admin view. As with DuSu, an Android app can wrap the web app.',
      'Cost and abuse controls: usage limits, provider failover and, where it suits your users, bring-your-own keys.',
      'Monitoring from day one: errors, response time, cost per user and a way to collect corrections.',
      'Documentation, handover and support after launch, with knowledge transfer to your team.',
    ],
    steps: [
      {
        title: 'Define the core loop',
        body: 'One user, one action they repeat and one definition of a good result. We write the success measure and a cost-per-session budget now, because both shape every later choice, including which model you can afford.',
      },
      {
        title: 'Prove the model can do the job',
        body: 'Before building an app we test the idea with a throwaway prototype: real inputs, candidate models and a handful of scored examples. If the model cannot do the job at acceptable quality and cost, we change the idea while it is still cheap to change.',
      },
      {
        title: 'Design for the device and the network',
        body: "Mobile-first means slow networks, modest phones and mixed languages. We set a response-time budget, stream replies, keep the client light and decide what runs on the device. DuSu is a single-file web app, and the browser's built-in speech service handles its speech.",
      },
      {
        title: 'Build one thin slice end to end',
        body: 'We build the whole loop once: sign-in, the AI core, storage, a basic interface and usage limits, connected to a real backend. The first users try it before anything is polished. A thin slice exposes integration problems that screens alone cannot.',
      },
      {
        title: 'Measure with real users',
        body: 'We track cost per session, response time, failure types and where users correct or abandon the output. Judgements made by a model, such as scores, are labelled as AI estimates so users do not read them as facts. What we learn decides the next release.',
      },
      {
        title: 'Launch and hand over',
        body: 'The app ships as an installable web app and, if needed, an Android wrapper. You receive the documentation, a runbook and the evaluation set, and your team is shown how to change prompts and models. Support after launch is available, with knowledge transfer.',
      },
    ],
    tech: [
      'Python',
      'FastAPI',
      'WebSockets',
      'Postgres',
      'Docker',
      'Next.js',
      'TypeScript',
      'Progressive web apps (PWA)',
      'Android Trusted Web Activity (Kotlin)',
      'Browser Web Speech',
      'Groq',
      'Gemini',
      'OpenRouter',
      'Render',
      'Vercel',
      'Cloudflare',
    ],
    proof: [
      {
        label: 'DuSu: the live product',
        href: 'https://dusu.ranabrothers.online',
        text: 'An AI coach for spoken English, aimed at learners in India who use their phones first. More than 200 people use it. It has four modes: Talk, Interview, Learn and Daily Talk. Interview ends with a scored report on grammar, fluency, confidence, communication, vocabulary and professionalism, and a stronger version of your answer. Learn starts from Hindi or Hinglish. You can try it yourself.',
      },
      {
        label: 'DuSu: how it was built',
        href: '/work/dusu-ai-english-coach',
        text: "The backend is FastAPI with a single WebSocket, backed by Postgres. The client is one vanilla-JS file, shipped as a PWA and wrapped as an Android Trusted Web Activity written in Kotlin. Speech is handled by the browser's Web Speech, so only text travels to the backend. Language-model calls follow a chain of Groq, then Gemini, then OpenRouter, ordered by measured latency, and users can bring their own keys.",
      },
      {
        label: 'CloudDocSense: answers from documents',
        href: '/ai/rag-development',
        text: 'A retrieval-augmented document-intelligence system built by Vibhanshu with Python, FastAPI, LlamaIndex and pgvector. It answers with cited sources, which is the pattern to follow when an AI product must be checkable. It has no public demo.',
      },
    ],
    comparison: {
      caption: "AI app development: levers that keep an AI app's running cost down",
      columns: ['Lever', 'What it changes', 'Trade-off'],
      rows: [
        [
          'Bring-your-own keys',
          "Requests made with a user's own key are billed to that user's provider account, not to you.",
          'Extra set-up for users, so it suits technical or motivated audiences. DuSu offers it.',
        ],
        [
          'Browser speech',
          "The browser's built-in speech service handles recognition and speech output, so you need no hosted speech service and pay nothing for speech. DuSu works this way.",
          "Quality and language coverage depend on the user's browser and phone, and the browser decides how the audio is processed.",
        ],
        [
          'Right-sized models',
          'Easy requests go to a small, cheap model and only hard ones reach a larger one.',
          'Needs a router and tests that confirm the small model is good enough.',
        ],
        [
          'Shorter prompts and capped replies',
          'Fewer tokens in and out on every request.',
          'Too little context lowers answer quality, so measure before trimming.',
        ],
        [
          'Caching',
          'Repeated questions are answered from a cache, and some providers charge less for repeated prompt prefixes.',
          'Stale answers if the underlying facts change, so entries need sensible expiry.',
        ],
        [
          'Usage limits per user',
          'Caps what one account, or one abuser, can spend.',
          'Limits that are too tight frustrate the users you most want to keep.',
        ],
        [
          'Retrieval instead of long prompts',
          'Only the relevant passages are sent with each question.',
          'Adds an index to build and maintain.',
        ],
      ],
    },
    notFor: [
      'The idea works as a spreadsheet, a form or a search box. If a simpler tool solves the problem, use it.',
      'AI is a nice-to-have and the budget is tight. AI features need evaluation work that conventional features do not, so start with a conventional product and add AI where it earns its place.',
      'The product depends on a model being right every time, such as diagnosis or legal decisions, with no person reviewing the output. We would advise against building it that way.',
      'You want a model trained from scratch. Almost no first product needs one, and starting from hosted models costs far less.',
    ],
    faqs: [
      {
        q: 'How much does it cost to build an AI app?',
        a: 'It depends on scope, so we scope before we price, and we can work in fixed-scope milestones or a monthly arrangement. The price follows five things: user roles and screens, how hard the AI core is to get right, integrations, platforms (an installable web app, Android) and the accuracy you require. Running cost is a separate line, and the lever table on this page shows what moves it.',
      },
      {
        q: 'How long does an AI MVP take?',
        a: 'It depends on the core loop and the integrations, so we agree milestones after a short scoping step instead of promising a number in advance. What shortens it: one core loop, one platform first, a hosted model instead of a trained one, and quick decisions. What lengthens it: several user roles, payments, many integrations, strict accuracy needs, and data that must be prepared first. Because the AI core is tested early with a throwaway prototype, you learn whether the idea works before most of the cost is spent.',
      },
      {
        q: 'Do I need to train my own AI model?',
        a: "Almost never for a first version. Most AI products begin by prompting a hosted model, add retrieval when answers must come from your data, and consider fine-tuning only once real usage shows a gap that prompting cannot close. DuSu's language-model calls go to hosted providers (Groq, then Gemini, then OpenRouter). Training a model from scratch needs large data, specialist skills and serious compute, and it is rarely the right place to spend an early budget.",
      },
      {
        q: "How do you keep an AI app's running costs low?",
        a: "By designing the cost in from the start: choose the smallest model that passes your tests, send fewer tokens, let the user's browser do work it already can, such as speech, and cap what any account can spend. DuSu applies two of these levers: the browser's built-in speech service handles its speech, and users can bring their own provider keys. Its provider chain is ordered by measured latency. It runs at about $0/month for 200+ users. The lever table on this page gives the full list and the trade-off of each.",
      },
      {
        q: 'Can you build voice AI in Indian languages?',
        a: "Yes in principle, with one caveat: how well each language works depends on the speech and language models available for it, so we test your languages before committing. DuSu is a voice-first coach for Indian learners, and its Learn mode starts from Hindi or Hinglish. For any other language we would test speech recognition, speech output and the language model with real recordings, including accents and mixed-language sentences, because those are where voice systems most often struggle.",
      },
    ],
    related: [
      '/work/dusu-ai-english-coach',
      '/services/mvp-development',
      '/guides/how-to-build-an-mvp',
      '/ai/llm-integration',
    ],
  },
];

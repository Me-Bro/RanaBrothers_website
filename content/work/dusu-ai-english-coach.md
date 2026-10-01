DuSu is a voice-first AI English-speaking coach app for Indian, mobile-first learners, built at Rana Brothers. At the time of writing it has 200+ users and costs about $0 a month to run. This case study covers the problem, the architecture, the decisions that keep DuSu fast and cheap, and the parts that are still hard. You can try the product at [dusu.ranabrothers.online](https://dusu.ranabrothers.online).

## The problem

Speaking is the part of English that depends most on repetition, and it is hard to practise alone. Reading and writing can happen in silence. Speaking needs a partner who is available when you are, listens without judging and tells you what to fix.

A language model can play that partner at any hour. A naive build has two weaknesses. It answers slowly, which breaks the rhythm of a conversation. And it is costly to run, because speech recognition, speech synthesis and model calls are typically billed by usage. The goal for DuSu was a coach that answers quickly and whose running cost does not rise with every new learner.

## Context and constraints

The audience is Indian learners who reach for their phone first. That shapes the product. It has to feel like a conversation, run well on a phone and cope with Hindi and Hinglish, the everyday mix of Hindi and English, as well as English.

### What an AI English-speaking coach app has to do

- Voice first: the learner speaks and listens, and so does the coach.
- Mobile first: it runs as an installable web app (a PWA) and as an Android app.
- Two languages: Learn mode takes Hindi or Hinglish and answers in English.
- Continuity: a level test on the CEFR scale (A0 to B2), a 7-level roadmap, XP, streaks and learner memory carry progress from one session to the next.
- Honest feedback: Interview mode scores answers, and every score is labelled AI-estimated.
- Cheap to run: about $0 a month at 200+ users.

CEFR is the Common European Framework of Reference for Languages, a scale for describing language proficiency.

## Our role

David built DuSu at Rana Brothers, so the whole product sat with us: the four learning modes, the FastAPI backend, the web client, the Android wrapper and the routing across language models. There was no hand-off between design and engineering. That is how we work on client projects too, because the founders work on the build directly.

### How long did it take?

We have not published a build time for DuSu, and we would rather not guess one. Duration follows scope, and DuSu's scope is narrow by design: one WebSocket, one client file, speech handled by the browser and no model hosting. For client work we agree the scope before we start. We can work in fixed-scope milestones or on a monthly arrangement, so a timeline comes from a scoped list and not from another project's calendar.

## Architecture

DuSu keeps its moving parts few. In one turn, the learner speaks, the browser turns speech into text, the text travels over a WebSocket to a FastAPI backend, the first available provider in the LLM chain writes the reply, and the browser speaks it.

- Client: a single-file web app in vanilla JavaScript, installable as a PWA.
- Android shell: a Trusted Web Activity (TWA) written in Kotlin that opens the same web app inside an Android app.
- Speech: the browser's Web Speech support does speech-to-text and text-to-speech, and speech stays on the device.
- Backend: FastAPI with one WebSocket that carries the conversation.
- Data: Postgres for persistent state.
- LLM chain: Groq, then Gemini, then OpenRouter, ordered by measured latency, with bring-your-own keys.
- Learning layer: four modes (Talk, Interview, Learn, Daily Talk), the level test and roadmap, XP and streaks, and learner memory.
- Scoring: Interview mode returns a report on grammar, fluency, confidence, communication, vocabulary and professionalism, plus a better answer.

The model writes replies and feedback. XP and streaks are ordinary application logic. We use AI where it helps and plain code elsewhere. For a deeper engineering walk-through, read [the DuSu engineering write-up](https://david.ranabrothers.online/work/dusu).

## Key decisions

### Run speech on the device

DuSu uses the browser's Web Speech support for speech-to-text and text-to-speech, so speech stays on the device. That takes a hosted speech service off the bill and removes an audio upload from every turn.

The trade-off: the browser and operating system decide which recogniser and which voices a learner gets. Quality and language support vary between devices, and we cannot tune the engine. We accept that for a product that must run at close to zero cost. A product that needed guaranteed recognition accuracy would justify a hosted speech service.

### Order the LLM chain by measured latency

Replies come from a chain of providers: Groq, then Gemini, then OpenRouter. The order comes from measured latency. In a voice conversation the delay before the reply is what the learner feels, so speed sets the order, and a provider that fails or is unavailable hands over to the next one. That is LLM failover with a deliberate order.

The trade-off: three integrations to maintain, and three models that behave differently. Prompts and output parsing have to tolerate those differences. A measured order also goes stale as providers change, so it needs re-checking.

### Keep AI costs low as usage grows

Move usage-billed work off the studio's account. Speech runs on the device. Language-model calls use bring-your-own keys, so quota and billing sit with whoever holds the key. In a voice product those are the two places where cost normally grows with minutes of practice. Together with a deliberately small backend, moving them keeps DuSu's running cost at about $0 a month with 200+ users.

The trade-off: friction. Someone has to obtain a provider key and add it, which is a harder start than signing in and talking. Keys are credentials and need careful handling. We chose a cost that does not track usage over the easiest possible onboarding. Hosting and the database are the costs we would watch as numbers climb.

### One WebSocket, one client file, two ways to ship

A conversation is a stream of turns in both directions, which suits one persistent WebSocket better than a new request per turn. The client is a single vanilla JavaScript file with no framework to maintain. It installs as a PWA and is wrapped in a Kotlin Trusted Web Activity for Android, so one codebase serves both.

The trade-off: a single file gets harder to navigate as features grow, and it has no component model or type checks to lean on. A long-lived socket must survive mobile networks and holds server resources for every open session. Android-specific features are limited to what a Trusted Web Activity and the web platform allow.

## Hard problems

### Latency and failover

A voice product has a short patience budget. Speech recognition and synthesis run on the device, so the step we can influence is the model call. The chain is ordered by measured latency, and the next provider takes over when one fails. A fallback also has to treat "too slow" as a failure, not only "returned an error". That is a path we want to test on purpose.

### Scores from a language model

Interview mode reports six dimensions and offers a better answer. A model's scores are estimates. They can differ between models, and a fallback provider can change the strictness part-way through a session. A speech-recognition error can also be marked against the learner. So every score is labelled AI-estimated, and the better answer carries value that does not depend on the number.

### Speech you do not control

Browser recognisers are configured for one language at a time, while Hinglish mixes two inside a single sentence. Learn mode accepts Hindi and Hinglish, so mixed-language speech is a hard case for this design. It is a limit of using the browser's engine, and we accepted it in exchange for on-device speech.

## Results

The facts at the time of writing:

| Measure | Value |
| --- | --- |
| Users | 200+ |
| Running cost | About $0 per month |
| Learning modes | 4: Talk, Interview, Learn, Daily Talk |
| Level test and roadmap | CEFR A0–B2 test, 7-level roadmap |
| Interview report | 6 scored dimensions, plus a better answer |
| LLM providers in the chain | 3: Groq, Gemini, OpenRouter |
| Ships as | PWA and Android Trusted Web Activity |

Read these for what they are. A base of 200+ users shows that the cost design holds at that size. It does not prove that it holds at every size. We make no claim about learning outcomes: the scores are AI-estimated practice feedback, not a certified assessment.

## What we would do next

These are plans, not commitments, and none has a date.

- Keep the provider order honest: re-measure latency regularly and reorder the chain when the numbers change.
- Exercise the failure path on purpose: simulate a slow or failing provider and confirm the learner still gets a reply.
- Check AI-estimated scores for consistency across providers, and compare a sample against human ratings.
- Set a threshold for splitting the single client file into modules, so that simplicity does not turn into a maintenance burden.

## Related services

If you are planning a voice AI app or a similar product, these are the services closest to this work.

- [Mobile app development](/services/mobile-app-development): mobile-first apps, from installable web apps to an Android wrapper.
- [LLM integration](/ai/llm-integration): provider routing, failover and cost control for language-model features.
- [AI app development](/ai/ai-app-development): AI products built end to end, from the interface to the data layer.

You can try [DuSu](https://dusu.ranabrothers.online) yourself, or [tell us what you are building](/contact).

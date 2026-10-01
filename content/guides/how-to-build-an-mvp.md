> **Short answer:** A minimum viable product (MVP) is the smallest working version of a product that lets you test one important assumption with real users. To build one: validate the problem, cut scope to a single core job, choose a build path, design and test the flow, build in short sprints, then measure activation and retention.

An MVP only works if you know what it is meant to test. This guide explains how to build an MVP in seven steps, from validating the problem to deciding what to do with the results. It includes a scope-cutting worksheet with a worked example that you can copy for your own product.

## How to build an MVP: the seven steps at a glance

| Step | What you do | You are done when |
|---|---|---|
| 1. Validate the problem | Interview people who have it. Test demand with a page, a waitlist or a pre-sale. | People have committed time, money or access, not just compliments. |
| 2. Cut the scope | Name one core job. Run every feature through the worksheet below. | You hold a written cut list. |
| 3. Choose the build path | Pick no-code, an AI app builder or custom code. | The choice is written down with its limits. |
| 4. Design and test the flow | Sketch the flow, build a clickable prototype, watch five people use it. | The problems that stop people are fixed. |
| 5. Set the time-box | Fix the date, then flex the scope. | The must-haves fit the time-box. |
| 6. Build in sprints | Work in two-week cycles, with a demo each time and analytics from the start. | Real users can finish the core job. |
| 7. Launch and measure | Track activation and repeat use. Talk to users. | You have decided: iterate, pivot or stop. |

## What is an MVP, and what isn't?

[Eric Ries's definition](https://www.startuplessonslearned.com/2009/08/minimum-viable-product-guide.html), published in 2009, defines an MVP as "that version of a new product which allows a team to collect the maximum amount of validated learning about customers with the least effort". Two phrases carry the weight: validated learning and least effort. An MVP exists to answer a question.

"Minimum" describes scope, not quality. "Viable" means a real person can use it to finish the core job. An MVP is not:

- A prototype. A prototype shows or tests an idea. An MVP is used by real people for real work.
- A beta. A beta checks the stability of a finished product. An MVP checks whether the product should exist.
- Version one with everything. If the first release needs your whole roadmap, you are building the product, not testing it.
- A careless build. Cut features, not care.

Mobile adds a platform rule. Apple's [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) expect submissions to be final versions without placeholder content (guideline 2.1), and say demos and betas belong in TestFlight, not on the App Store (guideline 2.2). An iOS MVP can be small, but it has to be finished.

## Step 1: How do I validate my idea before building?

Validation means finding out whether the problem is real, frequent and costly enough that people will change what they do. Do it first, because it is the cheapest step.

### Talk to people who have the problem

Ask people who have the problem about the last time it came up. What did they try? What did it cost? What do they use or pay for now? Ask about the past, not about your idea. Opinions about a product that does not exist are cheap, and past behaviour is evidence. Plan for around ten conversations, and keep going until new ones stop changing what you hear.

### Test demand with something cheap

- A landing page that states the outcome and asks for a commitment: an email address, a booked call or a deposit.
- A pre-sale or letter of intent. This is a stronger signal than a waitlist.
- A concierge test. Deliver the service by hand to a few customers, using a spreadsheet and messages.
- A model check, if the core job depends on AI. Run real examples through the model by hand and judge the output before you build screens around it.

### What counts as evidence

Compliments are not evidence. Commitments are: time (a second call), access (their data or their team), money (a pre-payment) or reputation (an introduction). Write down the evidence behind each feature as you go.

## Step 2: Which features belong in an MVP?

Start with one core job: the outcome a user hires the product to deliver. Write it as a sentence: "A [user] can [do the job] without [the current pain]." Then define the first test: the smallest real use that would show whether the core job works. Every other feature is a candidate for the cut list.

### The MVP scope-cutting worksheet

For each candidate feature, answer two questions in writing. Does the first test fail without it? What evidence says so? Then give it one verdict: build, fake or cut. Write the evidence before the verdict. No evidence means the default verdict is Cut.

The example is an imaginary scheduling tool for a small home-repair business. The hypothesis: a shared schedule removes double bookings and missed visits. The first test: one business runs its real jobs through the tool. The evidence is imaginary too, so paste your own interview notes into your copy.

| Feature | Must-have for the first test? | Why / evidence | Cut, fake or build |
|---|---|---|---|
| Shared job calendar with technician assignment | Yes | The core job. Interviews: owners juggle this by phone and chat. No calendar, no test. | Build |
| Customer request form (name, phone, address, issue) | Yes | Jobs have to enter the system somehow. A web form is enough. | Build |
| Owner and technician sign-in | Yes | Addresses and phone numbers are personal data, so access control is not optional. | Build, with a managed sign-in service |
| "Today's jobs" view for technicians | Yes | Observation: technicians already work from their phones. A mobile web page tests the same behaviour. | Build |
| Visit reminders to customers | Yes | Missed visits are the pain under test, but a person can send reminders by message for now. | Fake |
| Weekly report of missed and double-booked visits | Yes | You need it to judge the test. A spreadsheet filled in by hand will do. | Fake |
| Online payment collection | No | Interviews: customers already pay technicians directly, and payment setup adds onboarding time. Revisit when customers ask to pay in the tool. | Cut |
| Customer ratings and reviews | No | Nothing to rate until jobs flow, and an owner can ask for feedback by message. Revisit once finished jobs are steady. | Cut |
| Route optimisation | No | It improves a schedule nobody uses yet and needs data you do not have. Revisit when the calendar is in daily use. | Cut |
| Native iOS and Android apps | No | A mobile web page tests the same behaviour. Store review and two codebases would slow the first test. | Cut |

### Cut, fake or build: how to decide

- Cut when the first test still works without the feature, or when nothing shows anyone needs it.
- Fake when users need the outcome but not yet the software. A person sends the reminder or fills in the spreadsheet. You learn what the automation must do before you pay to build it.
- Build when the behaviour under test is the software itself, or when a manual route would distort the answer. Sign-in, personal data and payments are built properly or not at all.

A "Yes" does not always mean "Build": two of the "Yes" rows above are faked. If your team already sorts work into Must, Should, Could and Won't (MoSCoW), treat this worksheet as a stricter version. Only what the test needs is built, and the Won't list stays written down and visible.

## Step 3: Should my MVP be no-code?

Sometimes. If a no-code tool lets you run the test you designed, use it: it is the cheapest way to learn. Choose custom code when the test needs something the tools cannot do, or when their limits would distort the answer.

| Build path | Fits when | Watch for |
|---|---|---|
| No-code builder | The product is forms, lists, simple workflows and standard payment or email integrations. | Limits on custom logic, performance and permissions. Pricing that grows with usage. |
| AI app builder | You need a working demo quickly, to show users or investors. | Generated code that nobody has reviewed. Security, data handling and who will maintain it. |
| Custom code | The core job needs custom logic, integrations, scale or compliance, or you expect to keep building. | A longer start and a higher upfront cost. A team that can maintain it. |

Whatever you choose, ask three questions first. Can I export every record in a standard format? Whose name is on the accounts? What happens if the vendor changes its pricing or closes? Move to custom code when the tool's limits, not your idea, are what you are fighting.

Custom does not have to mean heavy. DuSu, the voice-first English coach David built at Rana Brothers (see the [case study](/work/dusu-ai-english-coach)), uses browser Web Speech for speech-to-text and text-to-speech, and reaches Android as a web app in a Trusted Web Activity. It has 200+ users and runs at about $0 a month. Choosing which parts to build and which to borrow is a tech-stack decision, the kind our [software consulting](/services/software-consulting) work covers.

## Step 4: Design the flow and test a prototype

Draw the path from first visit to a finished core job, and nothing else. List each screen, what the user does, what they see when it works and what they see when it fails. Turn that into a clickable prototype, then watch five people try to finish the core job without help.

[Jakob Nielsen's analysis](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/) found that after the fifth user you mostly see the same findings again, and recommends several small tests over one large one. Fix what stops people, then test again with fresh people.

## Step 5: How long should an MVP take?

There is no honest universal number. The calendar depends on scope, and scope is the part you control. So fix the date first and let the scope flex: choose a time-box, list the must-haves from the worksheet, and cut until the list fits.

Common causes of delay:

- More user roles. Each needs its own screens, permissions and tests.
- Payments. Gateway onboarding, refunds and reconciliation take time.
- Integrations. You depend on another party's documentation, access and limits.
- Approvals and changes of mind. Each loop adds days.
- Store release. Review queues and account rules sit outside your control.

On Google Play, for example, personal developer accounts created after 13 November 2023 [must run a closed test with at least 12 opted-in testers for 14 continuous days](https://support.google.com/googleplay/android-developer/answer/14151465) before applying for production access. Check the current rule when you plan. A web app opened in the browser has no store review at all.

After two sprints you will have measured your team's real pace, a better basis for a date than any early estimate. A studio can give you a range once the scope is written down. Nobody can give a trustworthy number from a one-line idea.

## Step 6: Build in two-week sprints

Work in short cycles that each end with a working demo. The [Agile Manifesto](https://agilemanifesto.org/principles.html) asks for working software delivered frequently, preferring the shorter timescale, and calls it the primary measure of progress. Two weeks is long enough to finish something and short enough to change course.

Set these up in the first sprint:

- A repository, staging environment and automated deployment that you own or can fully access.
- The cut list, pinned beside the backlog. Check every new idea against it.
- Analytics events for the core job (sign-up, first success, repeat success), defined before the screens.
- Managed services for the plumbing, such as sign-in, email and payments. Do not write what you can rent.
- A demo on staging at the end of every sprint, shown to a likely user.

## Step 7: What should I measure after launch?

Measure whether people do the core job, and whether they come back to do it again.

| Measure | Question it answers | How to read it |
|---|---|---|
| Activation | Do new users complete the core job once? | Define "once" precisely before launch. |
| Retention | Do they come back and do it again, week after week? | A curve that flattens above zero matters more than any total. |
| Commitment | Do they pay, pre-pay, refer someone or share their data? | Money and time outweigh survey scores. |
| Reasons | Why did people stay or leave? | Talk to both groups within days, while they remember. |

Decide before launch what result means iterate, pivot or stop, and write it down. Iterate when the core job works for some users and the gaps are specific. Pivot when users value something other than what you built. Stop when honest effort finds nobody who keeps coming back. Without a written threshold, every result can be explained away. Ignore vanity numbers such as downloads and page views.

## Common MVP mistakes

- Validating with friends. Friends compliment you. Strangers who have the problem commit.
- Serving every segment. Pick one type of user for the first test.
- Polishing the admin side. A spreadsheet can serve internal needs for a while.
- Discovering a no-code limit late. Check data export and permissions in step 3.
- Never deciding. Write the iterate, pivot or stop thresholds before launch.

## Next step: turn the worksheet into a plan

Copy the four columns into a spreadsheet, list your candidate features and fill in the evidence column from your own interviews. The rows marked Build are your first-pass scope.

If you would like an engineer to challenge it, we build MVPs for startups at Rana Brothers, and we agree the scope before we start. Read about our [MVP development](/services/mvp-development) service. If you are comparing studios first, use our [checklist for choosing a software development company](/guides/how-to-choose-a-software-development-company).

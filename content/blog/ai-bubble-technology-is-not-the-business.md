<!-- VERIFY: every market figure, date and quote below comes from the source briefing and the links in "Sources"; re-check each against its source before launch, and refresh the "as of" date if the post is published later than 13 November 2026 -->
<!-- VERIFY: the Nvidia leadership item is kept to the resignation only; the briefing's reported personal allegations were left out on purpose -->

> **Short answer:** AI as a technology can keep getting better while AI companies, prices and jobs go through a painful reset. The dot-com era shows the pattern: the internet won, and most early companies still lost. If you build with AI, the practical response is to own something a model provider cannot copy, keep your costs measurable and avoid depending on a single vendor.

Worry about an AI bubble has moved from tech blogs into everyday conversation. This post, written as of 13 November 2026, sets out where things stand, what the dot-com bust tells us, and what it means for developers and for businesses that buy AI. It is a view, not a forecast we can stand behind, and experts disagree.

## Where do things stand?

These are the recent items that put the question in the news:

- **2 November:** The Nasdaq closed in correction territory, down 10% from its 6 October record.
- **29 October:** Alphabet fell 12.6%, its worst day since its 2004 listing.
- **Late October:** China's AI stocks crashed, losing about $480 billion. AI had grown to 42% of China's total stock market value.
- **6 November:** A University of Michigan survey found households worried about a possible AI bubble.
- **12 November:** Nvidia's CEO resigned, days before the company's earnings report.
- **17 November:** Nvidia reports quarterly earnings, the next big test for the AI trade.

Not everyone agrees it is a bubble. Forrester's October model, built on audited financials, concluded that a burst is not imminent. A CFA Institute writer set out to prove AI was a bubble and ended up more bullish. Experts are split, and any honest summary has to say so.

## What did the dot-com bubble teach us?

The dot-com bubble had a real technology, huge excitement, valuations based on attention instead of profit, and then a crash. The Nasdaq peaked near 5,000 in March 2000 and fell about 78% by late 2002. These are widely cited historical figures.

- **Pets.com:** Famous ads, an IPO in early 2000 and liquidation within the year. It sold pet supplies at a loss, so growth made things worse.
- **Webvan:** Online grocery delivery that built warehouses far ahead of demand. Bankrupt in 2001.
- **Boo.com and eToys:** Heavy spending with weak unit economics. Both collapsed.
- **Cisco:** Briefly among the most valuable companies in the world, then fell more than 80%. The company survived, but the stock took years to recover.
- **Telecom and fiber:** Companies borrowed to lay far more fiber than demand needed, among them Global Crossing and WorldCom. Much of it sat unused for years. The infrastructure was eventually useful, just not to the people who paid for it.
- **Amazon:** Fell around 90% from its peak and survived. It is the standard example of a real business with an overpriced stock.

The lesson for AI is that the internet won but most early companies lost. The fiber story is the closest match to today's debate about debt-funded data centers.

## Why are wrapper companies exposed?

A wrapper is a product built mostly on someone else's model API, with little of its own underneath. Their position is weak for four reasons:

- Their biggest cost is set by the model provider.
- The labs can add the same feature to their own products.
- If a rival can copy the product in a weekend, there is no pricing power.
- Billing is shifting. GitHub Copilot moved from flat monthly plans to per-token billing on 1 June 2026, and the gap lands on the builders in the middle.

The products likely to survive tend to have proprietary data, deep workflow integration that is hard to rip out, strong distribution and customer relationships, and domain expertise that a model alone cannot match.

## Will token costs rise or fall?

The evidence points both ways, and both can be true at once.

**Reasons prices could rise:**

- OpenAI is projected to lose about $14 billion in 2026, and both major labs are expected to go public.
- One analysis estimated that a $200 monthly plan could burn thousands of dollars of tokens at list prices. That is an estimate, not the labs' true cost.
- Sonnet 5 launched at promotional prices of $2 and $10 per million input and output tokens, rising to $3 and $15 from September.

**Reasons prices could fall:**

- Since 1 August, OpenAI's effective price has fallen 38% and Anthropic's has fallen 22%.
- Chinese labs are in a brutal price war.
- Customers are trading down to cheaper, simpler models.

The likely outcome is a split market. Frontier models stay premium and more metered, while good-enough models get cheaper. Plan for both.

### What would a token bill look like?

To make the sensitivity concrete, take a hypothetical workload of 500 million input tokens and 100 million output tokens a month, priced per million tokens as above. The third row is a hypothetical 50% increase, not a prediction.

| Scenario | Input / output price per million tokens | Monthly bill |
|---|---|---|
| Promotional | $2 / $10 | $2,000 |
| Standard | $3 / $15 | $3,000 |
| Hypothetical +50% | $4.50 / $22.50 | $4,500 |

The point is not the exact numbers. It is that a price move you do not control changes your margin directly, so you want to know your usage before the invoice arrives.

## What does it mean for developers?

The question shifts from "can we use AI?" to "can we use it affordably and reliably?"

- **Cost awareness becomes a core skill.** Token budgets, caching, routing simple tasks to cheaper models and usage monitoring will matter as much as raw quality.
- **Avoid lock-in.** Put an abstraction layer between your code and any single provider, so you can switch or use open-source models.
- **Flat-rate tools may become metered.** Do not build habits or budgets around "unlimited."
- **Fundamentals get more valuable.** Understanding the problem, system design and reviewing AI output outlast any one tool.
- **Expect job-market effects.** AI startups may cut staff or fold. Demand should remain for people who ship reliable, cost-efficient AI features.

## What does it mean for businesses?

Budgets and vendor choices will face more scrutiny.

- **ROI gets tested.** Uber and other enterprises have publicly said that compute budgets far exceed initial projections.
- **Vendor risk is real.** A startup you depend on may vanish or be acquired. Ask about contract terms, data export and fallbacks.
- **Likely winners** are companies using AI to improve real processes with measurable savings.
- **Likely losers** are companies that bought AI for the headline with no clear use case.
- **Debt risk spreads.** Morgan Stanley flagged up to $300 billion in bonds financing "neocloud" data center builds as vulnerable if token prices do not keep up.

## Will layoffs "because of AI" balance out?

Probably in how cuts are explained, and less clearly in how many there are. One tracker found that 56% of 2026 layoff events cite AI or automation, while the biggest tech firms plan about $700 billion of AI infrastructure spending. At the same time, Sam Altman, Forrester and others say some firms blame AI for cuts they would have made anyway, a practice called "AI washing." Oxford Economics found no significant worker replacement at scale.

A bust could make "we are investing in AI" harder to use as an explanation, and companies that cut too deep may find the tools cannot replace the people. It will not fix everything. A bust causes its own layoffs at AI startups, data center builders and suppliers, and real automation of some roles, such as support and routine coding, continues. This section is a forecast, and nobody knows how it will play out.

## Questions to ask your own team

- **Are we building a wrapper, or do we own something the model providers cannot copy?** Think about data, integrations, customer relationships and domain knowledge. What is hard for a competitor or a model lab to reproduce?
- **If our AI costs doubled, which features would we keep?** Rank features by value to users, and ask which could run on a cheaper model with little loss.
- **How quickly could we switch model providers?** Check for provider-specific prompts, tools and data formats. Is there an abstraction layer, and have we ever tested a second provider?
- **Which of our skills are tool-specific, and which will last?** Separate "how to use tool X" from problem solving, system design, testing and communication.
- **How much "AI efficiency" talk in our company is real, and how much is cost-cutting?** What measurable gains do we have, and what would convince us either way?

If those questions surface a decision you want a second opinion on, see [software consulting](/services/software-consulting) or [LLM integration](/ai/llm-integration).

## Sources

- [Yardeni Quicktakes: Air Coming Out Of AI Bubble](https://www.yardeniquicktakes.com/global-markets-call-air-coming-out-of-ai-bubble/)
- [Forrester: The AI Bubble Isn't Bursting Yet](https://www.forrester.com/blogs/the-ai-bubble-isnt-bursting-yet-heres-what-to-watch-using-our-model/)
- [CFA Institute: I Tried to Prove AI Was a Bubble](https://rpc.cfainstitute.org/blogs/enterprising-investor/2026/i-tried-to-prove-ai-was-a-bubble)
- [Finshots: Has China's AI bubble already burst?](https://finshots.in/archive/has-chinas-ai-bubble-already-burst/)
- [Techweez: China's AI Bubble Bursts](https://techweez.com/2026/10/28/china-ai-bubble-burst-market-crash/)
- [Action News Jax: Nvidia CEO resigns](https://www.actionnewsjax.com/news/trending/nvidia-ceo-jensen-huang-resigns/CRYPPVLKQRCAJCEIXVGK3GBLAM/)
- [Fortune: AI compute tokens cheaper](https://fortune.com/2026/09/09/ai-compute-tokens-cheaper-boom/)
- [Axios: Don't get used to cheap AI](https://www.axios.com/2026/03/12/ai-models-costs-ipo-pricing?stream=top)
- [Token Pricing Squeeze (yage.ai)](https://yage.ai/share/token-pricing-squeeze-en-20260702.html)
- [DSHR blog: AI's affordability crisis](https://blog.dshr.org/2026/06/ais-affordability-crisis.html?m=1)
- [TechRadar: Altman on "AI washing"](https://www.techradar.com/pro/sam-altman-says-some-companies-are-ai-washing-by-blaming-unrelated-layoffs-on-the-technology-but-admits-things-may-get-worse-soon)
- [The Interview Guys: 56% of 2026 layoffs blame AI](https://blog.theinterviewguys.com/?p=16367)
- [HR Director: AI blamed for 112,713 job cuts](https://www.hcamag.com/us/specialization/transformation/ai-blamed-for-112713-job-cuts-but-the-labor-data-isnt-buying-it/594129)

This post is discussion material, not financial advice.

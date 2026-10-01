Edge Verify is a backtesting platform with paper trading for Indian stocks, indices and crypto. David founded it and built it solo, and it is in beta. This case study explains how the Edge Verify backtesting platform is built to be honest about its results. It combines 8 years of 5-minute NSE equity data across 428 symbols, a cost model for Indian trading charges, execution with no look-ahead and stress tests. Its tagline is "No signals, just proof." You can try it at [ranabrothers.online/edgeverify](https://ranabrothers.online/edgeverify/).

## The problem

A backtest is an argument for a strategy, and a careless one argues too well. A strategy tested on history with loose timing, thin costs and few trades will usually look better than it can trade. The result is confidence that the evidence has not earned.

The usual flaws are execution that uses information from the future, costs that are left out or understated, and conclusions drawn from too little data. Indian markets add a fourth. Charges come in layers, and liquidity differs sharply between symbols, so a flat fee misleads in both directions. Edge Verify exists to test an idea against those flaws before money is involved.

## Context and constraints

The scope is Indian stocks, indices and crypto. At the core is an NSE (National Stock Exchange of India) backtester. Five-minute data matters because daily bars cannot test intraday timing or intraday costs.

### What the Edge Verify backtesting platform has to prove

- Timing: nothing executes on information it could not have had.
- Costs: the Indian charges stack and liquidity-aware slippage are part of every run.
- Robustness: a result is stressed, not taken from a single run.
- Limits: the platform warns when the evidence is weak.
- Boundaries: it is research tooling, with no signals and no advice.
- Scope: one builder, so every rule has to be small enough to keep correct.
- Stage: beta, so behaviour can still change.

## Our role

David founded Edge Verify and built it solo, end to end. He is a full-stack and backend engineer who also works in DevOps and AI development, and he brings 3+ years of systematic financial-markets research to the product. It lives on the Rana Brothers site, and it shows how we approach a data-heavy build: write the assumptions down, put evidence before claims and leave no black boxes.

## Architecture

Edge Verify runs a strategy through history, applies the cost model, stresses the result and says how far to trust it. We describe it as seven parts, each by what it guarantees, because the guarantees are the product.

- Market data: 8 years of 5-minute NSE equity candles (2018–2026) for 428 symbols.
- Backtest engine: replays the strategy under test through history, with no same-candle or look-ahead execution.
- Cost model: brokerage, Securities Transaction Tax (STT), exchange charges, GST on charges and liquidity-tier slippage.
- Stress-test suite: 2× and 3× slippage, late and worst-case fills, Monte-Carlo analysis, and bull, bear and sideways regimes.
- Evidence warnings: flags for survivorship bias and for samples under 30 trades.
- Paper-trading engine: forward testing on live NSE prices.
- Web product: the beta interface at ranabrothers.online/edgeverify.

For more engineering detail, read [the Edge Verify engineering write-up](https://david.ranabrothers.online/work/edge-verify).

## Key decisions

### Execution: how Edge Verify avoids look-ahead bias

Edge Verify allows no same-candle execution and no look-ahead execution. A trade cannot fill inside the candle that produced its signal, and no fill can use information that did not yet exist.

The reasoning is simple. A signal that reads a candle's close cannot also trade at that candle's price, because the close does not exist until the candle ends. An engine that fills at the signal candle's own prices quietly borrows from the future.

The trade-off: results look worse than a looser engine's. Strategies that lean on the price that triggered them lose that apparent advantage in the test, and anyone comparing tools will see lower numbers here. We prefer a lower number we can defend.

### Costs: which trading costs are modelled

The cost model covers five components: brokerage, STT, exchange charges, GST on charges and liquidity-tier slippage. This page lists the components, not the rates.

| Component | What it represents |
| --- | --- |
| Brokerage | The fee the broker charges on an order |
| STT | Securities Transaction Tax, levied on transactions in listed securities |
| Exchange charges | Transaction charges levied by the exchange |
| GST on charges | Goods and Services Tax charged on brokerage and other fees |
| Liquidity-tier slippage | The gap between the expected price and the fill, set by the symbol's liquidity tier |

On 5-minute bars a strategy can trade often, and costs accumulate with every trade. The components differ in kind, and slippage depends on the stock. One flat percentage misstates both a liquid large-cap and a thinly traded small-cap.

The trade-off: a cost model is a set of assumptions that someone has to keep current as charges are revised. Tiered slippage is also an approximation of fills, not a record of them.

### Stress tests are part of the product

Edge Verify re-runs a result under harsher conditions instead of relying on a single run. The tests cover slippage at 2× and 3× the assumption, late fills and worst-case fills, Monte-Carlo analysis, and bull, bear and sideways regimes.

A single backtest is one path through history under one set of assumptions. Stress tests ask what happens when those assumptions are wrong or the market changes character. Late fills delay execution past the intended moment, and worst-case fills assume the least favourable price the data allows. Monte-Carlo analysis re-runs the result under many random variations, to show how much of the outcome depended on one sequence of trades.

The trade-off: more output and more computation per run, and a harder job explaining all of it plainly.

### Warnings when the evidence is weak

Edge Verify warns about survivorship bias and about samples under 30 trades. Survivorship bias appears when a test covers only symbols that still exist, which leaves out the ones that failed or were delisted and flatters the history. A tool that stays silent invites over-reading.

Thirty trades is a rule of thumb, not a proof. Passing it does not make a result reliable.

The trade-off: the platform can tell people that a result is not yet convincing. That is friction, and we accept it.

## Hard problems

### Look-ahead has many entrances

Same-candle fills are one way the future leaks into a test. Others are bar timestamps that mix open-time and close-time conventions, and statistics computed over the whole history instead of the past only. A claim of no look-ahead is only as strong as the weakest entrance, so the rule has to be structural rather than a review checklist. We state the rule exactly (no same-candle or look-ahead execution) and claim no more than that.

### Costs are assumptions, not observations

Candle data records prices, not the quality of anyone's fill, so slippage by liquidity tier is a model. Charges are also revised from time to time, so a history running from 2018 to 2026 raises the question of which rate applied when. Two things help. The 2× and 3× slippage tests show how sensitive a result is to the assumption. Live paper trading on NSE prices gives a forward check, which narrows the gap between a backtest and live trading but cannot close it.

### Backtests get read as forecasts

A tidy chart invites the reader to extrapolate, and the product has to resist that. Edge Verify issues no signals, reports robustness rather than promises, warns when the evidence is weak and says plainly that it is research tooling. Where people may act on numbers with their own money, restraint in the copy matters as much as correctness in the engine. The rule is simple: never suggest that a past result will repeat.

## Results

| Measure | Value |
| --- | --- |
| Market data | 8 years of 5-minute NSE equity data (2018–2026) |
| Symbols | 428 |
| Cost components modelled | 5 |
| Slippage stress multiples | 2× and 3× |
| Market regimes checked | 3: bull, bear, sideways |
| Evidence warnings | 2: survivorship bias, samples under 30 trades |
| Status | Beta |

This page reports no strategy results, on purpose. These numbers describe the platform's coverage and rigour. They say nothing about how any strategy will perform, and past results do not predict future ones.

## What we would do next

These are plans, not commitments, and none has a date.

- Test the no-look-ahead property on every release: decisions up to a given time should not change when the data after that time is removed.
- Review cost assumptions whenever charges are revised, and compare paper-trading fills with the backtest's assumptions to see where the model is too kind or too harsh.
- Look at the data side of survivorship bias, since better data is a stronger answer than a warning.
- Define what leaving beta means, as a documented rule set with the tests that enforce it.

## Related services

Edge Verify is a data-heavy product with strict rules. If you need backtesting software development or something similar, these are the services closest to this work.

- [Custom software development](/services/custom-software-development): products built around a domain's own rules, such as a cost model or an execution engine.
- [Cloud and DevOps](/services/cloud-devops): cloud and microservices architecture, and the deployment work around it.
- [Web app development](/services/web-app-development): web products and dashboards that present complex results clearly.

You can try [Edge Verify](https://ranabrothers.online/edgeverify/) yourself, or [tell us what you are building](/contact).

Edge Verify is research tooling only. It is not investment advice, and we are not registered with the Securities and Exchange Board of India (SEBI). Backtest and paper-trading results do not predict future results.

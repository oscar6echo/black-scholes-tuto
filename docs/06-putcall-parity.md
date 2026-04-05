# Put/Call Parity

Put/call parity is a **model-free** result: it holds for any pricing model consistent
with no-arbitrage, not just Black-Scholes. It links call and put prices through
the forward price of the underlying.

## The No-Arbitrage Argument

Consider two portfolios at time $t$, both maturing at $T$:

| Portfolio | Composition | Value at $T$ if $S_T > K$ | Value at $T$ if $S_T \leq K$ |
|-----------|------------|--------------------------|------------------------------|
| **A** | Long call $C$, short put $P$ | $S_T - K$ | $-(K - S_T) = S_T - K$ |
| **B** | Long forward $F = S\,e^{(r-q)(T-t)}$, short $K\,e^{-r(T-t)}$ cash | $S_T - K$ | $S_T - K$ |

Both portfolios have identical payoffs in all scenarios. Therefore they must have
the same price today:

$$\boxed{C - P = S\,e^{-qT} - K\,e^{-rT}}$$

The right-hand side is the **present value of the forward** (long stock net of dividends,
short the discounted strike).

## Algebraic Verification from BS

Starting from the BS formulas:

$$C = S\,e^{-qT} N(d_1) - K\,e^{-rT} N(d_2)$$
$$P = K\,e^{-rT} N(-d_2) - S\,e^{-qT} N(-d_1)$$

Using $N(x) + N(-x) = 1$:

$$C - P = S\,e^{-qT}[N(d_1) + N(-d_1)] - K\,e^{-rT}[N(d_2) + N(-d_2)]$$
$$= S\,e^{-qT} - K\,e^{-rT} \checkmark$$

This shows that the BS formulas are internally consistent with no-arbitrage.

## A Put is a Call with a Short Forward

Rearranging:

$$P = C - S\,e^{-qT} + K\,e^{-rT}$$

A put equals a call, plus a short position in the (dividend-adjusted) stock,
plus the discounted strike in cash. In other words:
**a put is a call plus a short forward**.

<!-- TODO: embed PutCallParity.vue payoff diagram here -->
<!-- <PutCallParity /> -->

## Practical Consequences

- **One price pins the other:** knowing $C$ and the forward, you know $P$.
  Any gap is an arbitrage opportunity.
- **Model-free calibration:** if market call and put prices violate parity,
  it signals market friction (bid-ask spread, borrow cost, early exercise for American options).
- **Greeks by parity:** $\Delta_P = \Delta_C - e^{-qT}$, $\Gamma_P = \Gamma_C$, $\nu_P = \nu_C$.
  Gamma and Vega are the same for calls and puts with the same strike and maturity.

**Next:** [Implied Vol & the Vol Surface →](./07-vol-surface)

# Greeks as Geometry

Each Greek is a sensitivity of the option price to one market parameter.
With the four-panel picture from [Section 4](./04-pricing-intuition) in mind,
every Greek has a geometric interpretation as a **deformation of the contribution curve**.

## Delta — Δ

$$\Delta = \frac{\partial C}{\partial S} = e^{-qT}\,N(d_1)$$

**Geometric meaning:** shifting $S$ (i.e. the centre of the lognormal distribution) to the right
increases the area under the contribution curve. $\Delta$ measures how fast the area grows.

- Deep ITM ($S \gg K$): $N(d_1) \to 1$, $\Delta \to e^{-qT}$ — the option moves one-for-one with the stock
- Deep OTM ($S \ll K$): $N(d_1) \to 0$, $\Delta \to 0$ — the option barely moves
- ATM: $\Delta \approx 0.5$

::: info Probabilistic interpretation
$N(d_1)$ is the ITM probability under the **share measure** — not the physical or risk-neutral
probability. See [Section 3](./03-lognormal) for the distinction.
:::

## Gamma — Γ

$$\Gamma = \frac{\partial^2 C}{\partial S^2} = \frac{e^{-qT}\,N'(d_1)}{S\,\sigma\,\sqrt{T}}$$

**Geometric meaning:** $\Gamma$ is the curvature of $C$ as a function of $S$ — how fast $\Delta$ changes.
It is the derivative of $\Delta$, and thus the rate at which the "lever" of the distribution moves.

$\Gamma$ peaks **at-the-money** and near expiry: this is when a small move in $S$ most dramatically
shifts the proportion of the distribution above the strike.

A long option position is always long Gamma (positive curvature).

## Vega — ν

$$\nu = \frac{\partial C}{\partial \sigma} = S\,e^{-qT}\,N'(d_1)\,\sqrt{T}$$

**Geometric meaning:** increasing $\sigma$ widens the lognormal distribution.
A wider distribution has a fatter right tail — more probability above $K$ and at high payoff levels.
This increases the area under the contribution curve.

- Peaks ATM: the extra width helps most when the option is on the fence
- Proportional to $\sqrt{T}$: longer maturity means more time for vol to work

Note $\nu = S\,e^{-qT}\,N'(d_1)\,\sqrt{T} = K\,e^{-rT}\,N'(d_2)\,\sqrt{T}$ — both forms are useful.

## Theta — Θ

$$\Theta = -\frac{\partial C}{\partial T} = -\frac{S\,e^{-qT}\,N'(d_1)\,\sigma}{2\sqrt{T}} - r\,K\,e^{-rT}\,N(d_2) + q\,S\,e^{-qT}\,N(d_1)$$

**Geometric meaning:** as $T$ decreases (time passes), the distribution collapses toward $S_0$.
Less time means less uncertainty means less area under the contribution curve.
$\Theta$ is typically negative for long options — **time decay**.

The three terms represent: (1) the contraction of the distribution, (2) the increasing
present-value of the strike payment, and (3) the dividend yield effect.

## Rho — ρ

$$\rho = \frac{\partial C}{\partial r} = K\,T\,e^{-rT}\,N(d_2) \quad > 0 \text{ for calls}$$

**Geometric meaning:** higher $r$ has two competing effects on the contribution curve:

1. The forward price $F = S\,e^{(r-q)T}$ increases → distribution shifts right → more area
2. The discount factor $e^{-rT}$ decreases → future payoffs are worth less today

The net effect favours calls (positive $\rho$) because the forward-price effect dominates.

## Summary Table

<!-- TODO: add interactive deformation viz per Greek -->

| Greek | Formula | Peaks at | Sign (call) |
|-------|---------|----------|------------|
| $\Delta$ | $e^{-qT} N(d_1)$ | — | $+$ |
| $\Gamma$ | $e^{-qT} N'(d_1) / (S\sigma\sqrt{T})$ | ATM, near expiry | $+$ |
| $\nu$ | $S\,e^{-qT} N'(d_1)\sqrt{T}$ | ATM | $+$ |
| $\Theta$ | (see above) | ATM, near expiry | $-$ |
| $\rho$ | $KT\,e^{-rT} N(d_2)$ | Deep ITM, long maturity | $+$ |

**Next:** [Put/Call Parity →](./06-putcall-parity)

# Change of Measure

In [Section 3](./03-lognormal), the option price is expressed as an expectation under $\mathbb{Q}$,
and the formula is split into two terms involving $N(d_2)$ and $N(d_1)$ — two different
probabilities of the same event, under two different measures.
This page explains what "measure" means and how changing it works.

## What Is a Probability Measure?

A probability measure $\mathbb{P}$ is an assignment of probabilities to events.
Two measures $\mathbb{P}$ and $\mathbb{Q}$ are **equivalent** if they agree on which
events are possible (probability zero vs non-zero), but assign different numerical
probabilities to those events.

Concretely, in the BS setting:

- $\mathbb{P}$ (the **physical** or real-world measure): the stock drifts at $\mu$
- $\mathbb{Q}$ (the **risk-neutral** measure): the stock drifts at $r - q$

Both agree that any future stock price $S_T > 0$ is possible.
They differ in which prices are considered likely.

## The Radon-Nikodym Derivative

If $\mathbb{P}$ and $\mathbb{Q}$ are equivalent, there exists a strictly positive
random variable $\frac{d\mathbb{Q}}{d\mathbb{P}}$ (the **Radon-Nikodym derivative**) such that:

$$\mathbb{E}^{\mathbb{Q}}[X] = \mathbb{E}^{\mathbb{P}}\!\left[X \cdot \frac{d\mathbb{Q}}{d\mathbb{P}}\right]$$

for any random variable $X$. The Radon-Nikodym derivative is the "weight" that converts
$\mathbb{P}$-expectations to $\mathbb{Q}$-expectations. It measures how much more (or less)
likely events are under $\mathbb{Q}$ than under $\mathbb{P}$.

## Girsanov's Theorem: From $\mathbb{P}$ to $\mathbb{Q}$

Under $\mathbb{P}$, the stock has drift $\mu$:

$$dS = \mu S\,dt + \sigma S\,dW^{\mathbb{P}}$$

To price options, we want drift $r - q$ instead. Define the **market price of risk**:

$$\lambda = \frac{\mu - (r-q)}{\sigma}$$

Girsanov's theorem states that the measure $\mathbb{Q}$ defined by the Radon-Nikodym derivative:

$$\frac{d\mathbb{Q}}{d\mathbb{P}}\bigg|_T = \exp\!\left(-\lambda W_T^{\mathbb{P}} - \frac{1}{2}\lambda^2 T\right)$$

has the following property: the process

$$W_t^{\mathbb{Q}} = W_t^{\mathbb{P}} + \lambda t$$

is a **standard Brownian motion under $\mathbb{Q}$**.

::: info Integrated vs. differential form
The equation $W_t^{\mathbb{Q}} = W_t^{\mathbb{P}} + \lambda t$ is the *integrated* form:
at each time $t$, the new path equals the old path plus the deterministic drift $\lambda t$.
Differentiating gives the equivalent *infinitesimal* form:

$$dW^{\mathbb{Q}} = dW^{\mathbb{P}} + \lambda\,dt$$

Inverting: $dW^{\mathbb{P}} = dW^{\mathbb{Q}} - \lambda\,dt$.
The Radon-Nikodym derivative is what *defines* $\mathbb{Q}$; Girsanov's theorem is the
guarantee that with this specific choice the shifted process is indeed a BM.
:::

Substituting $dW^{\mathbb{P}} = dW^{\mathbb{Q}} - \lambda\,dt$ into the stock dynamics:

$$dS = (r - q)\,S\,dt + \sigma S\,dW^{\mathbb{Q}}$$

Under $\mathbb{Q}$, the drift has changed from $\mu$ to $r-q$, and $\lambda$ has disappeared.
This is why option prices do not depend on $\mu$.

## The Risk-Neutral Pricing Formula

The fundamental theorem of asset pricing states that in a complete, arbitrage-free market,
there exists a unique equivalent measure $\mathbb{Q}$ under which all discounted asset prices
are martingales. Under this measure:

$$C = e^{-rT}\,\mathbb{E}^{\mathbb{Q}}\!\left[\max(S_T - K,\, 0)\right]$$

## Two Integrals, Two Measures

Expanding the call payoff:

$$C = e^{-rT}\int_K^{\infty} (S_T - K)\,f_{\mathbb{Q}}(S_T)\,dS_T$$

Split into two terms:

$$C = \underbrace{e^{-rT}\int_K^{\infty} S_T\,f_{\mathbb{Q}}(S_T)\,dS_T}_{I_1} - \underbrace{K\,e^{-rT}\int_K^{\infty} f_{\mathbb{Q}}(S_T)\,dS_T}_{I_2}$$

**Second term $I_2$** is straightforward:

$$I_2 = K\,e^{-rT}\,\mathbb{Q}(S_T > K) = K\,e^{-rT}\,N(d_2)$$

$N(d_2)$ is the **risk-neutral probability** of finishing in-the-money.

**First term $I_1$** requires a change of measure. The factor $S_T$ inside the integral
suggests using the stock itself as numeraire. Define the **share measure** $\mathbb{Q}^S$ via:

$$\frac{d\mathbb{Q}^S}{d\mathbb{Q}} = \frac{S_T}{S_0\,e^{(r-q)T}}$$

This is a strictly positive martingale (the discounted, dividend-adjusted stock price
is a $\mathbb{Q}$-martingale), so it is a valid Radon-Nikodym derivative.

Applying the change of measure to $I_1$:

$$I_1 = e^{-rT}\int_K^{\infty} S_T\,f_{\mathbb{Q}}(S_T)\,dS_T = S_0\,e^{-qT}\,\mathbb{Q}^S(S_T > K)$$

Under $\mathbb{Q}^S$, by another application of Girsanov, the Brownian motion shifts by $\sigma$:

$$W_t^{\mathbb{Q}^S} = W_t^{\mathbb{Q}} - \sigma t$$

so the log-stock has drift $r - q + \sigma^2 - \tfrac{1}{2}\sigma^2 = r - q + \tfrac{1}{2}\sigma^2$
(instead of $r - q - \tfrac{1}{2}\sigma^2$ under $\mathbb{Q}$).

Computing the probability:

$$\mathbb{Q}^S(S_T > K) = \mathbb{Q}^S\!\left(\ln S_T > \ln K\right) = N(d_1)$$

where $d_1$ uses $r - q + \tfrac{1}{2}\sigma^2$ in the numerator — one $\sigma^2 T$ more than $d_2$.

## Summary

$$\boxed{N(d_2) = \mathbb{Q}(S_T > K), \qquad N(d_1) = \mathbb{Q}^S(S_T > K)}$$

| Quantity | Measure | Drift of $\ln S_T$ | Interpretation |
|----------|---------|-------------------|----------------|
| $N(d_2)$ | Risk-neutral $\mathbb{Q}$ | $r - q - \tfrac{1}{2}\sigma^2$ | Probability of ITM (discounted numeraire) |
| $N(d_1)$ | Share measure $\mathbb{Q}^S$ | $r - q + \tfrac{1}{2}\sigma^2$ | Probability of ITM (stock numeraire) |

The gap $d_1 - d_2 = \sigma\sqrt{T}$ is the Itô correction from the $e^{\sigma W_T}$ factor
in the Radon-Nikodym derivative $d\mathbb{Q}^S/d\mathbb{Q}$.

::: info Intuition
$N(d_1)$ is larger than $N(d_2)$ because the share measure overweights scenarios where $S_T$ is large
(those scenarios are multiplied by a large $S_T/S_0\,e^{(r-q)T}$ weight).
Conditioning on those scenarios being more likely, the probability of finishing ITM is higher.
This is why $\Delta = e^{-qT} N(d_1) > e^{-rT} N(d_2)$ for a call.
:::

**See also:** [Itô's Lemma ←](./A1-ito-lemma) · [Lognormal & Risk-Neutral Measure ↑](./03-lognormal)

# Lognormal Distribution & Risk-Neutral Measure

The BS formula can also be derived without ever writing down a PDE,
by working directly with the distribution of the terminal stock price.
This approach — **risk-neutral pricing** — gives a cleaner probabilistic
interpretation of $d_1$, $d_2$, and $N(\cdot)$.

## The Risk-Neutral Measure Q

The delta-hedging argument in [Section 1](./01-bs-pde) showed that $\mu$ drops out of option prices.
This means we can price as if the stock drifts at the risk-free rate:

$$dS = (r - q)\,S\,dt + \sigma\,S\,dW^{\mathbb{Q}}$$

where $W^{\mathbb{Q}}$ is a Brownian motion under the risk-neutral measure $\mathbb{Q}$.
The switch from $\mathbb{P}$ (real world, drift $\mu$) to $\mathbb{Q}$ (pricing world, drift $r-q$)
is formalised by Girsanov's theorem.

::: tip Role of q
$q$ lowers the effective drift of $S$ under $\mathbb{Q}$: the forward price $F = S\,e^{(r-q)T}$
reflects dividends reducing the stock price. The discount factor $e^{-rT}$ is separate —
it is the cost of borrowing at $r$, unaffected by $q$.
:::

## Terminal Distribution of $S_T$

**Itô's lemma** (reminder from [Appendix A1](./A1-ito-lemma)):
for any twice-differentiable $f(S)$,

$$df = f'(S)\,dS + \tfrac{1}{2}f''(S)\,(dS)^2$$

**Apply to $f(S) = \ln S$**, with $f' = 1/S$ and $f'' = -1/S^2$:

$$d(\ln S) = \frac{1}{S}\,dS - \frac{1}{2S^2}\,(dS)^2$$

**Substitute the GBM** $dS = (r-q)S\,dt + \sigma S\,dW^{\mathbb{Q}}$,
using $(dS)^2 = \sigma^2 S^2\,dt$:

$$d(\ln S)
= \frac{(r-q)S\,dt + \sigma S\,dW^{\mathbb{Q}}}{S}
  - \frac{\sigma^2 S^2\,dt}{2S^2}$$

$$= \underbrace{(r-q)\,dt + \sigma\,dW^{\mathbb{Q}}}_{\text{from }dS/S}
  \underbrace{{}-\tfrac{1}{2}\sigma^2\,dt}_{\text{Itô correction}}$$

$$= \left(r - q - \tfrac{1}{2}\sigma^2\right)dt + \sigma\,dW^{\mathbb{Q}}$$

**Integrate from $0$ to $T$.**
Since $W_T^{\mathbb{Q}} \sim \mathcal{N}(0, T)$, the log-return is Gaussian:

$$\ln\frac{S_T}{S_0} \sim \mathcal{N}\!\left(\left(r-q-\tfrac{1}{2}\sigma^2\right)T,\;\sigma^2 T\right)$$

Therefore $S_T$ is **lognormally distributed** under $\mathbb{Q}$, with density:

$$f_{\mathbb{Q}}(S_T) = \frac{1}{S_T\,\sigma\sqrt{2\pi T}}
  \exp\!\left(-\frac{1}{2}\left(\frac{\ln(S_T/S_0)-(r-q-\tfrac{1}{2}\sigma^2)T}{\sigma\sqrt{T}}\right)^{\!2}\right)$$

Note the $-\tfrac{1}{2}\sigma^2$ correction: this is the **Itô term**, a direct consequence
of the nonlinearity of the log. It is the same term that separates $d_1$ from $d_2$.

## Option Price as an Expectation

The fundamental theorem of asset pricing states that the price of any derivative equals
the discounted risk-neutral expectation of its payoff:

$$C = e^{-rT}\,\mathbb{E}^{\mathbb{Q}}\!\left[\max(S_T - K,\, 0)\right]$$

Writing this out as an integral:

$$C = e^{-rT} \int_K^{\infty} (S_T - K)\, f_{\mathbb{Q}}(S_T)\, dS_T$$

This integral is evaluated by the same "complete the square" algebra as in [Section 2](./02-pde-solution),
and yields the BS formula. This is the probabilistic route to the same destination.

## What $d_1$ and $d_2$ Mean

::: tip Background
This section uses a change of probability measure. See [Appendix A2](./A2-change-of-measure)
for a full derivation of the Radon-Nikodym derivative and the share measure $\mathbb{Q}^S$.
:::

Split the integral:

$$C = e^{-rT}\int_K^{\infty} S_T\,f_{\mathbb{Q}}(S_T)\,dS_T - K\,e^{-rT}\int_K^{\infty} f_{\mathbb{Q}}(S_T)\,dS_T$$

- **Second term:** $K\,e^{-rT} \cdot \mathbb{Q}(S_T > K) = K\,e^{-rT}\,N(d_2)$
  — the discounted strike times the risk-neutral probability that the option expires in-the-money.

- **First term:** involves a change of measure from $\mathbb{Q}$ to the **share measure** $\mathbb{Q}^S$
  (Radon-Nikodym derivative $e^{-rT}S_T/S_0$), giving $S\,e^{-qT}\,N(d_1)$.
  Here $N(d_1)$ is the probability of finishing ITM under the *share measure*, not $\mathbb{Q}$.

::: info Summary
$$N(d_2) = \mathbb{Q}(S_T > K) \quad \text{(risk-neutral ITM probability)}$$
$$N(d_1) = \mathbb{Q}^S(S_T > K) \quad \text{(share-measure ITM probability)}$$

The gap $d_1 - d_2 = \sigma\sqrt{T}$ comes from the Itô correction when changing measure.
:::

## Notebook

[`02_lognormal.ipynb`](../notebooks/02_lognormal.ipynb) simulates geometric brownian motion (GBM) paths under $\mathbb{Q}$,
plots the terminal distribution, and overlays the theoretical lognormal density.
Sliders let you vary $\sigma$, $T$, and $q$ to build intuition about how the distribution changes.

**Next:** [Monte Carlo & Physical Intuition →](./04-pricing-intuition)

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

**Evaluating the integral:**  
Change variable $y = \ln(S_T / S_0)$, so $S_T = S_0 e^y$ and the lower limit $K$ becomes
$y_0 = \ln(K/S_0)$. The integral splits into two terms:

$$I_1 = e^{-rT} S_0 \int_{y_0}^{\infty}
  e^y \cdot \frac{e^{-(y - \mu T)^2/(2\sigma^2 T)}}{\sigma\sqrt{2\pi T}}\,dy$$

$$I_2 = e^{-rT} K \int_{y_0}^{\infty}
  \frac{e^{-(y - \mu T)^2/(2\sigma^2 T)}}{\sigma\sqrt{2\pi T}}\,dy$$

where $\mu = r - q - \tfrac{1}{2}\sigma^2$.
These are **structurally identical** to $I_1$ and $I_2$ in [Section 2](./02-pde-solution).
$I_2$ is a Gaussian tail integral that gives $K\,e^{-rT}N(d_2)$ directly.
$I_1$ carries the extra $e^y$ factor: combining it with the Gaussian exponent gives
$y - (y - \mu T)^2/(2\sigma^2 T)$, and "completing the square" in $y$ means
rewriting this as a perfect square plus a constant — the constant yields the prefactor
$S_0 e^{(r-q)T}$, the shifted Gaussian gives $N(d_1)$, and the shift of $\sigma^2 T$
in the mean is exactly what separates $d_1$ from $d_2$.

**Same algebra, different framing:**  
The probabilistic route does not require a different calculation.
Once the expectation is written as an integral, the evaluation is identical to the
heat-equation convolution of Section 2.
What differs is the starting point — a PDE versus a risk-neutral expectation —
and the conceptual language: the PDE approach produces $d_1$, $d_2$ as artefacts of
change-of-variables, while the probabilistic approach reveals them as probabilities of
finishing in-the-money under two different measures (see next section).

::: info Historical order
Black and Scholes (1973) derived the formula via the PDE route — reducing it to the
heat equation and inverting. The risk-neutral pricing framework came slightly later:
Cox and Ross (1976) introduced the principle explicitly, and Harrison, Kreps, and
Pliska (1979–1981) provided the rigorous martingale foundations.
Today the probabilistic approach is considered more fundamental because it generalises
to models where no closed-form PDE solution exists — but for lognormal dynamics the
two routes are computationally equivalent.
:::

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

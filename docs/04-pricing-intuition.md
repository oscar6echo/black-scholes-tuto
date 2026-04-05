# Monte Carlo & Physical Intuition

The option price is an integral. The four panels below make that integral visible —
each panel adds one layer, and by the end the option price is a concrete geometric object:
the area under a curve.

<!-- TODO: embed FourPanelViz.vue scroll component here -->
<!-- <FourPanelViz /> -->

## The Four Panels

Scroll through the panels to build up the picture step by step.

### Panel A — Future price distribution

The lognormal density $f_{\mathbb{Q}}(S_T)$ under the risk-neutral measure:

$$f_{\mathbb{Q}}(S_T) = \frac{1}{S_T\,\sigma\sqrt{2\pi T}}\exp\!\left(-\frac{(\ln S_T - m)^2}{2\sigma^2 T}\right), \quad m = \ln S_0 + (r-q-\tfrac{1}{2}\sigma^2)T$$

This tells us **how likely each future price scenario is** under the pricing measure.

### Panel B — Discounted density

Multiply by the discount factor $e^{-rT}$:

$$e^{-rT} \cdot f_{\mathbb{Q}}(S_T)$$

This is the **present-value weight** attached to each scenario. The discount factor
shifts probability mass from the future to today — the distribution is the same shape,
just scaled down.

### Panel C — Payoff overlay

The call payoff $\max(S_T - K, 0)$ is zero left of the strike $K$ and rises linearly to the right.
Overlaying it on Panel B shows **which scenarios contribute** (right of $K$) and
which contribute nothing (left of $K$).

### Panel D — Contribution curve (the key picture)

Multiply the payoff by the discounted density:

$$\text{contribution}(S_T) = \max(S_T - K,\, 0) \cdot e^{-rT} \cdot f_{\mathbb{Q}}(S_T)$$

The **option price is the area under this curve**:

$$C = \int_0^{\infty} \max(S_T - K,\, 0)\cdot e^{-rT}\cdot f_{\mathbb{Q}}(S_T)\,dS_T$$

Each point on this curve is the contribution of a specific future price scenario to
today's option value — weighted by its probability and discounted to the present.

## Monte Carlo Is Sampling This Integral

Monte Carlo pricing is nothing more than **numerically approximating this integral**:

1. Draw $N$ samples $S_T^{(i)}$ from the lognormal distribution (Panel A)
2. Evaluate the payoff $\max(S_T^{(i)} - K, 0)$ for each (Panel C)
3. Average and discount: $\hat{C} = e^{-rT} \cdot \frac{1}{N}\sum_{i=1}^N \max(S_T^{(i)} - K, 0)$

By the law of large numbers, $\hat{C} \to C$ as $N \to \infty$.

The notebook [`03_monte_carlo.ipynb`](../notebooks/03_monte_carlo.ipynb) compares
MC estimates to the exact BS price and shows convergence at the expected $1/\sqrt{N}$ rate.

## Interactive Controls

<!-- TODO: add slider controls tied to FourPanelViz component -->

After the four panels are revealed, sliders for $K$, $\sigma$, $T$, $r$, $q$ let you
deform the contribution curve in real time:

| Parameter | Effect on Panel D |
|-----------|------------------|
| ↑ K | Cutoff moves right → smaller area → lower price |
| ↑ σ | Distribution widens → fatter tails → larger area → higher price |
| ↑ T | Distribution spreads further → more uncertainty → higher price |
| ↑ r | Forward price increases, discount factor decreases (competing effects) |
| ↑ q | Lowers forward price → distribution shifts left → lower call price |

**Next:** [Greeks as Geometry →](./05-greeks)

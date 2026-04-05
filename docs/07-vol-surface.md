# Implied Vol & the Vol Surface

Black-Scholes assumes a single constant volatility $\sigma$. Markets disagree:
options at different strikes and maturities trade at prices that imply
different $\sigma$ values. This section explores what that means and what it tells us
about the market's true risk-neutral distribution.

## Implied Volatility

Given a market price $C_\text{mkt}$ for a European call, the **implied volatility** $\sigma_\text{impl}$
is the unique $\sigma$ such that the BS formula reproduces the market price:

$$\text{BS}(S, K, T, r, q,\; \sigma_\text{impl}) = C_\text{mkt}$$

Since BS is strictly increasing in $\sigma$, this equation has at most one solution,
and it is found numerically (Newton-Raphson using Vega as the derivative).

Under Black-Scholes assumptions, $\sigma_\text{impl}$ should be **constant** across all
strikes $K$ and maturities $T$ for a given underlying. In practice, it is not.

## The Smile and Skew

Plotting $\sigma_\text{impl}$ vs strike (or log-moneyness $\ln(K/F)$) for a fixed maturity $T$
reveals the **volatility smile** (or **skew** for equity indices):

- OTM puts ($K < S$) trade at **higher implied vol** than ATM options
- OTM calls ($K > S$) may also be richer — producing a symmetric smile, common in FX
- For equity indices, the smile is typically asymmetric: a **negative skew** (left wing elevated)

The negative skew reflects the market's fear of large downward moves — the risk-neutral
distribution has a **fat left tail** and **negative skew** relative to the lognormal.

## Breeden-Litzenberger: The Smile Encodes the Density

The key theorem connecting the smile to the distribution:

$$\boxed{f_{\mathbb{Q}}(K) = e^{rT}\,\frac{\partial^2 C}{\partial K^2}}$$

The second derivative of the call price with respect to strike **is** (up to a constant)
the risk-neutral density of the terminal stock price.

<!-- TODO: embed VolSurface.vue component here -->
<!-- <VolSurface /> -->

### Derivation

Starting from the risk-neutral pricing formula:

$$C(K) = e^{-rT} \int_0^{\infty} (S_T - K)^+\, f_{\mathbb{Q}}(S_T)\, dS_T = e^{-rT} \int_K^{\infty} (S_T - K)\, f_{\mathbb{Q}}(S_T)\, dS_T$$

Differentiating under the integral sign with respect to $K$:

$$\frac{\partial C}{\partial K} = -e^{-rT} \int_K^{\infty} f_{\mathbb{Q}}(S_T)\, dS_T = -e^{-rT}\,\mathbb{Q}(S_T > K)$$

$$\frac{\partial^2 C}{\partial K^2} = e^{-rT}\, f_{\mathbb{Q}}(K)$$

Hence $f_{\mathbb{Q}}(K) = e^{rT}\,\partial^2 C / \partial K^2$.

### Visualization

Given a vol smile $\sigma_\text{impl}(K)$, we can:

1. Compute $C(K) = \text{BS}(K,\, \sigma_\text{impl}(K))$ across a range of strikes
2. Numerically differentiate twice to get $f_{\mathbb{Q}}(K)$
3. Compare against the flat-vol lognormal density

The implied density will show:

- **Fatter left tail** than lognormal (negative skew)
- Possibly fatter right tail too (leptokurtosis)

This closes the loop with [Section 4](./04-pricing-intuition): the four-panel contribution
picture still holds, but with $f_{\mathbb{Q}}$ replaced by the true implied density.
**The smile is the market's correction to the lognormal approximation.**

## The 3D Vol Surface

Extending to all maturities gives the **implied vol surface** $\sigma_\text{impl}(K, T)$:

- **Term structure (fixed K):** short-dated vol tends to be spikier; long-dated vol smoother
- **Skew (fixed T):** negative slope for equity indices; smile shape for FX
- **Wings:** far OTM options often trade at elevated IV due to jump/tail risk

::: info Further reading
Fitting a parametric model to the surface (SVI, SABR, Heston, local vol) is the next step —
outside the scope of this project, but the Breeden-Litzenberger picture above is the
foundation for any such calibration.
:::

**Next:** [Calculator →](./08-calculator)

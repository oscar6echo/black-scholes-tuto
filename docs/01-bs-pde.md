# The Black-Scholes PDE

The Black-Scholes partial differential equation (PDE) governs the price of any derivative
on a non-dividend-paying asset in frictionless markets. Remarkably, the equation
does not depend on the asset's real-world expected return — only on its volatility
and the risk-free rate.

## Setup

Let $V(S, t)$ be the value of a derivative at time $t$ when the underlying price is $S$.
The underlying follows the GBM stochastic differential equation (SDE) under the physical measure $\mathbb{P}$:

$$dS = \mu S\, dt + \sigma S\, dW$$

where $\mu$ is the (unobserved) drift, $\sigma$ is the volatility, and $W$ is a standard Brownian motion.

## Applying Itô's Lemma

::: tip Background
Unfamiliar with Itô's lemma?  
See [Appendix A1](./A1-ito-lemma) for a self-contained introduction.
:::

Since $V$ is a smooth function of $S$ and $t$, Itô's lemma gives:

$$dV = \frac{\partial V}{\partial t}\,dt + \frac{\partial V}{\partial S}\,dS + \frac{1}{2}\frac{\partial^2 V}{\partial S^2}\,(dS)^2$$

Substituting $dS$ and using $(dW)^2 = dt$:

$$dV = \left(\frac{\partial V}{\partial t} + \mu S\frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2}\right)dt + \sigma S\frac{\partial V}{\partial S}\,dW$$

## Delta Hedging

Construct a portfolio $\Pi$ that is long one derivative and short $\Delta$ units of the underlying:

$$\Pi = V - \Delta \cdot S$$

The change in portfolio value over $dt$ is:

$$d\Pi = dV - \Delta\, dS$$

Substitute $dV$ and $dS$ explicitly:

$$d\Pi = \left(\frac{\partial V}{\partial t} + \mu S\frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2}\right)dt + \sigma S\frac{\partial V}{\partial S}\,dW - \Delta\left(\mu S\,dt + \sigma S\,dW\right)$$

Collect $dt$ and $dW$ terms:

$$d\Pi = \left(\frac{\partial V}{\partial t} + \mu S\frac{\partial V}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} - \mu S\Delta\right)dt + \sigma S\left(\frac{\partial V}{\partial S} - \Delta\right)dW$$

Choose $\Delta = \partial V / \partial S$. Two things happen simultaneously:

- **The $dW$ term vanishes:** $\sigma S\!\left(\tfrac{\partial V}{\partial S} - \Delta\right) = 0$.
- **The $\mu$ terms cancel:** $\mu S\tfrac{\partial V}{\partial S} - \mu S\Delta = 0$.

$$d\Pi = \left(\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2}\right)dt$$

Note that $\mu$ — the unobservable real-world drift — has dropped out entirely.  
The riskless $d\Pi$ depends only on $\sigma$, $r$, and the shape of $V$ (its $t$ and $S^2$ derivatives),
none of which require a view on the market direction.  

::: info What "riskless" means here
**Riskless** means $d\Pi$ is deterministic over $[t,\, t+dt]$: it contains no $dW$ term,
so its value over the next instant is known with certainty given $(S, t)$.

This does *not* mean the portfolio is static or has constant value.
$V$ still depends on $S$ and $t$, and $\Delta = \partial V/\partial S$ must be
continuously rebalanced as $S$ moves. The hedge is **instantaneously** perfect.
:::

## No-Arbitrage Condition

A riskless portfolio must earn the risk-free rate $r$ to prevent arbitrage.
If it earned more, one could borrow at $r$ and buy it; if less, one could short it and lend at $r$ — both riskless profits. So:

$$d\Pi = r\Pi\,dt$$

Substituting $\Pi = V - \Delta S$ and $\Delta = \partial V/\partial S$:

$$d\Pi = r\left(V - \frac{\partial V}{\partial S}\,S\right)dt$$

Now equate this with the expression for $d\Pi$ obtained from delta hedging:

$$\left(\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2}\right)dt = r\left(V - \frac{\partial V}{\partial S}\,S\right)dt$$

Divide both sides by $dt$ and move all terms to the left:

$$\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} - rV + rS\frac{\partial V}{\partial S} = 0$$

$$\boxed{\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} + rS\frac{\partial V}{\partial S} - rV = 0}$$

This is the **Black-Scholes PDE**.

## Adding a Dividend Yield

If the underlying pays a continuous dividend yield $q$, the cost of carrying the hedge changes.
The drift $\mu$ in the physical dynamics is replaced by $r - q$ in the risk-neutral dynamics,
and the PDE becomes:

$$\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} + (r-q)S\frac{\partial V}{\partial S} - rV = 0$$

::: tip Role of q
$q$ separates two distinct effects: the **forward growth rate** $(r - q)$ appearing in the
drift term, and the **discount rate** $r$ appearing in the $-rV$ term. This distinction
will recur throughout the formula.
:::

## Boundary Conditions

The PDE must be solved subject to the terminal payoff condition at maturity $T$:

| Derivative | Condition |
|-----------|-----------|
| Call | $V(S, T) = \max(S - K,\, 0)$ |
| Put  | $V(S, T) = \max(K - S,\, 0)$ |

Together with the spatial boundary conditions $V(0, t) = 0$ (call) and $V \to S$ as $S \to \infty$ (call),
these uniquely determine the solution.

## Key Insight

::: info The arbitrage pricing miracle
The real-world drift $\mu$ has completely disappeared from the PDE.
Two investors who agree on $\sigma$ but disagree on $\mu$ will assign the **same** price to any
derivative — as long as both accept the no-arbitrage argument.
This is the foundation of risk-neutral pricing.
:::

**Next:** [Solving the PDE →](./02-pde-solution)

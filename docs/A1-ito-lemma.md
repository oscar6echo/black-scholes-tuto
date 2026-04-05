# Itô's Lemma

Ordinary calculus assumes that the derivative of a smooth path is well-defined
and that second-order terms vanish. Neither is true for Brownian motion.
Itô's lemma is the correct chain rule for stochastic processes.

## Brownian Motion

A standard Brownian motion $W_t$ is a continuous stochastic process with:

1. $W_0 = 0$
2. Increments are independent: $W_t - W_s \perp W_s - W_0$ for $t > s > 0$
3. Increments are Gaussian: $W_t - W_s \sim \mathcal{N}(0,\, t - s)$
4. Paths are continuous (but nowhere differentiable)

The shorthand $dW_t$ is an increment over an infinitesimal interval $dt$.
It has mean zero and variance $dt$: roughly, $dW_t \sim \sqrt{dt}\cdot Z$ where $Z \sim \mathcal{N}(0,1)$.

## The Quadratic Variation Rule

The key property that distinguishes stochastic calculus from ordinary calculus is:

$$\boxed{(dW_t)^2 = dt}$$

More precisely, over any partition of $[0, T]$, the sum of squared increments converges to $T$
almost surely. This is the **quadratic variation** of $W$.

In ordinary calculus, $(dx)^2$ is of order $(dt)^2$ and discarded. Here $(dW)^2 \sim dt$
and must be retained. This is why a second-order correction appears in Itô's formula.

The product rules follow directly:
$$dt \cdot dt = 0, \qquad dt \cdot dW = 0, \qquad dW \cdot dW = dt$$

## Itô's Formula

Let $X_t$ be an Itô process driven by the SDE:

$$dX = a(X, t)\,dt + b(X, t)\,dW$$

For a twice continuously differentiable function $f(x, t)$, expand $df$ by Taylor:

$$df = \frac{\partial f}{\partial t}\,dt + \frac{\partial f}{\partial x}\,dX + \frac{1}{2}\frac{\partial^2 f}{\partial x^2}\,(dX)^2 + \frac{1}{6}\frac{\partial^3 f}{\partial x^3}\,(dX)^3 + \cdots$$

Expanding $(dX)^2 = [a\,dt + b\,dW]^2$ into three types of terms:

| Term | Order | Keep? |
|---|---|---|
| $b^2\,(dW)^2 = b^2\,dt$ | $O(dt)$ | **yes** |
| $2ab\,dt\,dW$ | $O(dt^{3/2})$ | drop |
| $a^2\,(dt)^2$ | $O(dt^2)$ | drop |

Higher-order Taylor terms $(dX)^3, \ldots$ are $O(dt^{3/2})$ or higher and also drop. So $(dX)^2 \approx b^2\,dt$. Substituting:

$$df = \frac{\partial f}{\partial t}\,dt + \frac{\partial f}{\partial x}(a\,dt + b\,dW) + \frac{1}{2}\frac{\partial^2 f}{\partial x^2}\cdot b^2\,dt$$

$$\boxed{df = \left(\frac{\partial f}{\partial t} + a\frac{\partial f}{\partial x} + \frac{1}{2}b^2\frac{\partial^2 f}{\partial x^2}\right)dt + b\frac{\partial f}{\partial x}\,dW}$$

The $\tfrac{1}{2}b^2 \partial^2 f/\partial x^2$ term is the **Itô correction** — it has no analogue
in ordinary calculus and comes entirely from $(dW)^2 = dt$.

## Key Application: Log of a GBM

Let $S_t$ follow geometric Brownian motion (GBM):

$$dS = \mu S\,dt + \sigma S\,dW$$

Apply Itô's formula to $f(S) = \ln S$. Here $a = \mu S$, $b = \sigma S$, and:

$$\frac{\partial f}{\partial t} = 0, \quad \frac{\partial f}{\partial S} = \frac{1}{S}, \quad \frac{\partial^2 f}{\partial S^2} = -\frac{1}{S^2}$$

Plug into the boxed formula above:

$$d(\ln S) = \left(\frac{\partial f}{\partial t} + a\frac{\partial f}{\partial S} + \frac{1}{2}b^2\frac{\partial^2 f}{\partial S^2}\right)dt + b\frac{\partial f}{\partial S}\,dW$$

$$= \left(0 + \mu S \cdot \frac{1}{S} + \frac{1}{2}\sigma^2 S^2 \cdot \left(-\frac{1}{S^2}\right)\right)dt + \sigma S \cdot \frac{1}{S}\,dW$$

$$= \underbrace{\mu\,dt + \sigma\,dW}_{\text{from }dS/S}
\underbrace{{}-\,\tfrac{1}{2}\sigma^2\,dt}_{\text{Itô correction}}$$

$$d(\ln S) = \left(\mu - \frac{1}{2}\sigma^2\right)dt + \sigma\,dW$$

Integrating:

$$\ln\frac{S_T}{S_0} = \left(\mu - \frac{1}{2}\sigma^2\right)T + \sigma W_T$$

Since $W_T \sim \mathcal{N}(0, T)$, this gives $S_T$ a **lognormal** distribution.

::: warning The Itô correction
Without the $-\tfrac{1}{2}\sigma^2$ term (i.e. using ordinary calculus), you would incorrectly
conclude that $\mathbb{E}[\ln S_T] = \mu T + \ln S_0$.
The correct result is $\mathbb{E}[\ln S_T] = (\mu - \tfrac{1}{2}\sigma^2)T + \ln S_0$.

This correction propagates everywhere: it separates $d_1$ from $d_2$, and is the reason
the risk-neutral drift in $d_1$ is $r - q + \tfrac{1}{2}\sigma^2$ while in $d_2$ it is $r - q - \tfrac{1}{2}\sigma^2$.
:::

## Multidimensional Form

For completeness, if $f$ depends on multiple Itô processes $X^1, \ldots, X^n$:

$$df = \frac{\partial f}{\partial t}\,dt + \sum_i \frac{\partial f}{\partial x_i}\,dX^i + \frac{1}{2}\sum_{i,j} \frac{\partial^2 f}{\partial x_i \partial x_j}\,dX^i\,dX^j$$

where the quadratic covariation $dX^i\,dX^j$ is computed using the product rules above.
This is used, for example, when pricing derivatives on multiple underlyings.

**See also:** [Change of Measure →](./A2-change-of-measure)

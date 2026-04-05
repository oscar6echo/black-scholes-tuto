# Solving the PDE

The BS PDE is a second-order parabolic PDE. It can be reduced to the **heat equation**
via a chain of three substitutions, each with a clear geometric meaning.
The heat equation has a well-known fundamental solution — a Gaussian — and applying it
to the call payoff boundary condition yields the BS formula.

## Step 1 — Log-space and time-to-maturity

Introduce $x = \ln(S/K)$ and $\tau = T - t$.

Under this change of variables, the multiplicative $S^2$ and $S$ coefficients in the
PDE become constant coefficients. The domain $S \in (0, \infty)$ maps to $x \in (-\infty, \infty)$.

The call payoff becomes $V(x, 0) = K(\,e^x - 1)^+$.

## Step 2 — Remove discounting

Write $V = e^{-r\tau}\,u$. This substitutes out the $-rV$ term, giving a PDE for $u$
without a zero-order term.

## Step 3 — Remove the drift

Write $\tilde{x} = x + (r - q - \tfrac{1}{2}\sigma^2)\tau$. This is a shift that
centres the drift: after this substitution, the first-derivative term $\partial u / \partial \tilde{x}$
vanishes.

The quantity $r - q - \tfrac{1}{2}\sigma^2$ is precisely the **Itô-corrected log-drift**
of the stock price — the same term that appears in $d_2$.

## Result: the Heat Equation

After all three substitutions, the BS PDE reduces to:

$$\frac{\partial u}{\partial \tau} = \frac{1}{2}\sigma^2 \frac{\partial^2 u}{\partial \tilde{x}^2}$$

This is the classical heat equation (or diffusion equation) with diffusivity $\tfrac{1}{2}\sigma^2$.

## Solving the Heat Equation

The fundamental solution (Green's function) of the heat equation is a Gaussian:

$$G(\tilde{x}, \tau) = \frac{1}{\sigma\sqrt{2\pi\tau}}\exp\!\left(-\frac{\tilde{x}^2}{2\sigma^2\tau}\right)$$

The solution $u$ for a given initial condition $u_0(\tilde{x})$ is the convolution:

$$u(\tilde{x}, \tau) = \int_{-\infty}^{\infty} u_0(y)\, G(\tilde{x} - y,\, \tau)\, dy$$

## Applying the Call Payoff

The initial condition (at $\tau = 0$, i.e. at maturity) in the transformed coordinates is:

$$u_0(\tilde{x}) = K\bigl(e^{\tilde{x}} - 1\bigr)^+$$

The convolution integral splits at $\tilde{x} = 0$ (i.e. $S = K$):

$$u = \underbrace{\int_0^{\infty} K e^y\, G(\tilde{x}-y,\tau)\,dy}_{\text{first integral}} - \underbrace{\int_0^{\infty} K\, G(\tilde{x}-y,\tau)\,dy}_{\text{second integral}}$$

Each integral is evaluated by **completing the square** in the exponent.
The first integral introduces a shift that generates $d_1$; the second generates $d_2$.

## The Black-Scholes Formula

Reversing all three substitutions gives the famous result:

$$\boxed{C = S\,e^{-qT} N(d_1) - K\,e^{-rT} N(d_2)}$$

$$d_1 = \frac{\ln(S/K) + (r - q + \tfrac{1}{2}\sigma^2)T}{\sigma\sqrt{T}}, \qquad d_2 = d_1 - \sigma\sqrt{T}$$

By put/call parity (see [Section 6](./06-putcall-parity)), the put price is:

$$P = K\,e^{-rT} N(-d_2) - S\,e^{-qT} N(-d_1)$$

::: tip $d_1$ and $d_2$
$d_2$ is the Itô-corrected log-moneyness normalised by $\sigma\sqrt{T}$ —
it naturally appears from removing the drift in Step 3.
$d_1 = d_2 + \sigma\sqrt{T}$ comes from the extra $e^y$ factor in the first integral.
Their probabilistic interpretation will be explained in [Section 4](./04-pricing-intuition).
:::

## SymPy Verification

The algebra above can be verified symbolically. The notebook
[`01_sympy_verify.ipynb`](../notebooks/01_sympy_verify.ipynb) does the following:

- Defines $C$ symbolically in SymPy
- Computes $\partial C/\partial t$, $\partial C/\partial S$, $\partial^2 C/\partial S^2$
- Substitutes into the BS PDE and verifies the residual simplifies to zero
- Computes the Greeks $\Delta$, $\Gamma$, $\nu$, $\theta$, $\rho$ as exact symbolic derivatives

This is the machine-proof companion to the derivation above.

**Next:** [Lognormal Distribution & Risk-Neutral Measure →](./03-lognormal)

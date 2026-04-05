# Solving the PDE

The BS PDE is a second-order parabolic PDE. It can be reduced to the **heat equation**
via a chain of three substitutions, each with a clear geometric meaning.
The heat equation has a well-known fundamental solution — a Gaussian — and applying it
to the call payoff boundary condition yields the BS formula.

## Step 1 — Log-space and time-to-maturity

Introduce $x = \ln(S/K)$ and $\tau = T - t$, so $S = Ke^x$ and $t = T - \tau$.

The chain rule gives the partial derivatives:

$$\frac{\partial V}{\partial t} = -\frac{\partial V}{\partial \tau}, \qquad
\frac{\partial V}{\partial S} = \frac{1}{S}\frac{\partial V}{\partial x}, \qquad
\frac{\partial^2 V}{\partial S^2} = \frac{1}{S^2}\left(\frac{\partial^2 V}{\partial x^2} - \frac{\partial V}{\partial x}\right)$$

Substituting into the BS PDE:

$$\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} + (r-q)S\frac{\partial V}{\partial S} - rV = 0$$

and cancelling powers of $S$:

$$-\frac{\partial V}{\partial \tau} + \frac{1}{2}\sigma^2\frac{\partial^2 V}{\partial x^2}
- \frac{1}{2}\sigma^2\frac{\partial V}{\partial x}
+ (r-q)\frac{\partial V}{\partial x} - rV = 0$$

Rearranging (and writing $\alpha \equiv r - q - \tfrac{1}{2}\sigma^2$):

$$\frac{\partial V}{\partial \tau} = \frac{1}{2}\sigma^2\frac{\partial^2 V}{\partial x^2}
+ \alpha\,\frac{\partial V}{\partial x} - rV$$

The coefficients are now **constant** — the $S^2$ and $S$ factors are gone.
The domain $S \in (0, \infty)$ maps to $x \in (-\infty, \infty)$,
and the call payoff becomes $V(x, 0) = K(e^x - 1)^+$.

## Step 2 — Remove discounting

Write $V = e^{-r\tau}\,u$. Then:

$$\frac{\partial V}{\partial \tau} = -r\,e^{-r\tau}\,u + e^{-r\tau}\frac{\partial u}{\partial \tau}, \qquad
\frac{\partial V}{\partial x} = e^{-r\tau}\frac{\partial u}{\partial x}, \qquad
\frac{\partial^2 V}{\partial x^2} = e^{-r\tau}\frac{\partial^2 u}{\partial x^2}$$

Substituting into the PDE from Step 1 and dividing through by $e^{-r\tau}$:

$$\underbrace{-ru}_{\text{from }\partial_\tau V} + \frac{\partial u}{\partial \tau}
= \frac{1}{2}\sigma^2\frac{\partial^2 u}{\partial x^2}
+ \alpha\,\frac{\partial u}{\partial x} \underbrace{- ru}_{\text{from }-rV}$$

The $-ru$ terms cancel:

$$\frac{\partial u}{\partial \tau} = \frac{1}{2}\sigma^2\frac{\partial^2 u}{\partial x^2}
+ \alpha\,\frac{\partial u}{\partial x}$$

The zero-order term is gone.

## Step 3 — Remove the drift

Write $\tilde{x} = x + \alpha\tau$ (with $\alpha = r - q - \tfrac{1}{2}\sigma^2$ as before), and let
$u(x,\tau) = \tilde{u}(\tilde{x},\tau)$. Since $\tilde{x}$ depends on $\tau$ at fixed $x$
(namely $\partial\tilde{x}/\partial\tau\big|_x = \alpha$), the chain rule gives:

$$\frac{\partial u}{\partial \tau}\bigg|_x = \frac{\partial\tilde{u}}{\partial\tau}\bigg|_{\tilde{x}} + \alpha\,\frac{\partial\tilde{u}}{\partial\tilde{x}}, \qquad
\frac{\partial u}{\partial x} = \frac{\partial\tilde{u}}{\partial\tilde{x}}, \qquad
\frac{\partial^2 u}{\partial x^2} = \frac{\partial^2\tilde{u}}{\partial\tilde{x}^2}$$

Substituting, the $\alpha\,\partial\tilde{u}/\partial\tilde{x}$ terms cancel on both sides:

$$\frac{\partial\tilde{u}}{\partial\tau} + \alpha\,\frac{\partial\tilde{u}}{\partial\tilde{x}}
= \frac{1}{2}\sigma^2\frac{\partial^2\tilde{u}}{\partial\tilde{x}^2} + \alpha\,\frac{\partial\tilde{u}}{\partial\tilde{x}}
\quad\Longrightarrow\quad
\frac{\partial\tilde{u}}{\partial\tau} = \frac{1}{2}\sigma^2\frac{\partial^2\tilde{u}}{\partial\tilde{x}^2}$$

The quantity $\alpha = r - q - \tfrac{1}{2}\sigma^2$ is precisely the **Itô-corrected log-drift**
of the stock price — the same term that appears in $d_2$.

## Result: the Heat Equation

After all three substitutions the BS PDE has reduced to:

$$\frac{\partial \tilde{u}}{\partial \tau} = \frac{1}{2}\sigma^2 \frac{\partial^2 \tilde{u}}{\partial \tilde{x}^2}$$

This is the classical heat equation (or diffusion equation) with diffusivity $\tfrac{1}{2}\sigma^2$.

## Solving the Heat Equation

The fundamental solution (Green's function) of the heat equation is a Gaussian:

$$G(\tilde{x}, \tau) = \frac{1}{\sigma\sqrt{2\pi\tau}}\exp\!\left(-\frac{\tilde{x}^2}{2\sigma^2\tau}\right)$$

The solution $u$ for a given initial condition $u_0(\tilde{x})$ is the convolution:

$$u(\tilde{x}, \tau) = \int_{-\infty}^{\infty} u_0(y)\, G(\tilde{x} - y,\, \tau)\, dy$$

## Applying the Call Payoff

The initial condition in the transformed coordinates (at $\tau = 0$, i.e. at maturity) is:

$$u_0(\tilde{x}) = K\bigl(e^{\tilde{x}} - 1\bigr)^+$$

(At $\tau = 0$ the substitutions reduce to $u = V$ and $\tilde{x} = x$,
so the call payoff $K(e^x-1)^+$ carries over directly.)

Since $u_0(y) > 0$ only for $y > 0$, writing out $G$ explicitly and splitting the payoff:

$$I_1 = K\int_0^{\infty} e^y \cdot
  \frac{1}{\sigma\sqrt{2\pi\tau}}
  \exp\!\left(-\frac{(\tilde{x}-y)^2}{2\sigma^2\tau}\right)dy$$

$$I_2 = K\int_0^{\infty}
  \frac{1}{\sigma\sqrt{2\pi\tau}}
  \exp\!\left(-\frac{(\tilde{x}-y)^2}{2\sigma^2\tau}\right)dy$$

so that $u(\tilde{x},\tau) = I_1 - I_2$.

::: info The standard normal CDF $N(\cdot)$ and PDF $n(\cdot)$
$N(x)$ is the cumulative distribution function of the standard normal distribution:

$$N(x) = \int_{-\infty}^{x} \frac{1}{\sqrt{2\pi}}\,e^{-t^2/2}\,dt$$

Its derivative is the standard normal PDF:

$$n(x) = N'(x) = \frac{1}{\sqrt{2\pi}}\,e^{-x^2/2}$$

$N$ is related to the error function by
$N(x) = \tfrac{1}{2}\!\left[1 + \operatorname{erf}\!\left(\tfrac{x}{\sqrt{2}}\right)\right]$,
but is **not** the same as $\operatorname{erf}$.
The key identity used below is $\int_a^{\infty} n(t)\,dt = N(-a)$.
:::

**Second integral $I_2$:**  
Substitute $z = (y - \tilde{x})\,/\,(\sigma\sqrt{\tau})$, $dy = \sigma\sqrt{\tau}\,dz$.
The lower limit $y=0$ becomes $z = -\tilde{x}/(\sigma\sqrt{\tau})$:

$$I_2 = K\int_{-\tilde{x}/(\sigma\sqrt{\tau})}^{\infty}
  \frac{1}{\sqrt{2\pi}}e^{-z^2/2}\,dz
  = K\,N\!\left(\frac{\tilde{x}}{\sigma\sqrt{\tau}}\right)$$

**First integral $I_1$:**  
Write the combined exponent $f(y) = y - \tfrac{(\tilde{x}-y)^2}{2\sigma^2\tau}$.
Expand and collect in $y$:

$$f(y) = -\frac{1}{2\sigma^2\tau}
  \Bigl[y^2 - 2(\tilde{x}+\sigma^2\tau)\,y + \tilde{x}^2\Bigr]$$

Complete the square (writing $\mu_1 = \tilde{x}+\sigma^2\tau$):

$$f(y) = -\frac{(y-\mu_1)^2}{2\sigma^2\tau}
  + \frac{\mu_1^2 - \tilde{x}^2}{2\sigma^2\tau}$$

Since $\mu_1^2 - \tilde{x}^2 = 2\tilde{x}\sigma^2\tau + \sigma^4\tau^2$, the constant term simplifies:

$$\frac{\mu_1^2-\tilde{x}^2}{2\sigma^2\tau}
  = \tilde{x} + \frac{\sigma^2\tau}{2}$$

So:

$$e^{f(y)} = e^{\,\tilde{x}+\sigma^2\tau/2}
  \cdot\exp\!\left(-\frac{(y-\mu_1)^2}{2\sigma^2\tau}\right)$$

The first factor is a constant in $y$ and factors out of the integral.
The remaining Gaussian is centred at $\mu_1 = \tilde{x}+\sigma^2\tau$;
the same substitution as in $I_2$ (but shifted by $\sigma^2\tau$) gives:

$$I_1 = K\,e^{\tilde{x}+\sigma^2\tau/2}
  \cdot N\!\left(\frac{\tilde{x}+\sigma^2\tau}{\sigma\sqrt{\tau}}\right)$$

**Reversing the substitutions.** Recall the definitions from the three steps:

$$\tilde{x} = x + \alpha\tau, \quad
x = \ln(S/K), \quad
\alpha = r-q-\tfrac{1}{2}\sigma^2, \quad
\tau = T$$

The $N(\cdot)$ argument of $I_2$:

$$\frac{\tilde{x}}{\sigma\sqrt{\tau}}
= \frac{\ln(S/K)+(r-q-\tfrac{1}{2}\sigma^2)\,T}{\sigma\sqrt{T}}
= d_2$$

The $N(\cdot)$ argument of $I_1$ (the $\sigma^2\tau$ shift adds $\sigma^2\sqrt{\tau}$ to the numerator):

$$\frac{\tilde{x}+\sigma^2\tau}{\sigma\sqrt{\tau}}
= \frac{\ln(S/K)+(r-q+\tfrac{1}{2}\sigma^2)\,T}{\sigma\sqrt{T}}
= d_1$$

This shift, generated by completing the square on the $e^y$ factor, is
the sole difference between $d_1$ and $d_2$.

The prefactor of $I_1$, using $\alpha + \tfrac{1}{2}\sigma^2 = r-q$:

$$K\,e^{\tilde{x}+\sigma^2\tau/2}
= K\,e^{\ln(S/K)+(r-q)T}
= S\,e^{(r-q)T}$$

So, before reversing Step 2 ($V = e^{-r\tau}u$):

$$u = S\,e^{(r-q)T}N(d_1) - K\,N(d_2)$$

Multiplying by $e^{-rT}$ (Step 2):

$$C = e^{-rT}\cdot S\,e^{(r-q)T}\,N(d_1) - K\,e^{-rT}\,N(d_2)
  = S\,e^{-qT}\,N(d_1) - K\,e^{-rT}\,N(d_2)$$

## The Black-Scholes Formula

$$\boxed{C = S\,e^{-qT} N(d_1) - K\,e^{-rT} N(d_2)}$$

$$d_1 = \frac{\ln(S/K) + (r - q + \tfrac{1}{2}\sigma^2)T}{\sigma\sqrt{T}}$$

$$d_2 = d_1 - \sigma\sqrt{T}$$

By put/call parity (see [Section 6](./06-putcall-parity)), the put price is:

$$P = K\,e^{-rT} N(-d_2) - S\,e^{-qT} N(-d_1)$$

::: tip $d_1$ and $d_2$
$d_2$ is the Itô-corrected log-moneyness normalised by $\sigma\sqrt{T}$ —
it naturally appears from removing the drift in Step 3.
$d_1 = d_2 + \sigma\sqrt{T}$ comes from the extra $e^y$ factor in the first integral.
Their probabilistic interpretation will be explained in [Section 4](./04-pricing-intuition).
:::

## SymPy Verification

The notebook [`01_sympy_verify.ipynb`](../notebooks/01_sympy_verify.ipynb)
verifies the four results below. The first three are confirmed by exact symbolic
simplification (`sp.simplify` returns 0); the PDE is verified numerically.

### Key Identity

$$S\,e^{-qT}\,n(d_1) = K\,e^{-rT}\,n(d_2)$$

**Proof:**  
Start from $n(x) = e^{-x^2/2}/\sqrt{2\pi}$ and compute $d_1^2 - d_2^2$.
Factor as $(d_1-d_2)(d_1+d_2)$, using $d_1 - d_2 = \sigma\sqrt{T}$:

$$d_1 + d_2 = \frac{2\ln(S/K) + 2(r-q)T}{\sigma\sqrt{T}}$$

$$d_1^2 - d_2^2
= \sigma\sqrt{T} \cdot \frac{2\ln(S/K) + 2(r-q)T}{\sigma\sqrt{T}}
= 2\ln(S/K) + 2(r-q)T$$

Therefore:

$$\frac{n(d_1)}{n(d_2)}
= \exp\!\left(-\frac{d_1^2-d_2^2}{2}\right)
= e^{-\ln(S/K)-(r-q)T}
= \frac{K}{S}\,e^{-(r-q)T}$$

Multiplying both sides by $S\,e^{-qT}$ gives the identity. It is used in every
Greek derivation to cancel the cross-terms in $\partial d_1/\partial x$ vs $\partial d_2/\partial x$.

### Greeks

All five Greeks are obtained from $C$ as exact symbolic derivatives in the notebook.

| Greek | Definition | Closed-form |
|-------|-----------|-------------|
| $\Delta$ | $\partial C/\partial S$ | $e^{-qT}\,N(d_1)$ |
| $\Gamma$ | $\partial^2 C/\partial S^2$ | $\dfrac{e^{-qT}\,n(d_1)}{S\,\sigma\sqrt{T}}$ |
| $\nu$ (Vega) | $\partial C/\partial \sigma$ | $S\,e^{-qT}\,n(d_1)\,\sqrt{T}$ |
| $\Theta$ | $-\partial C/\partial T$ | $-\dfrac{S\,e^{-qT}\,n(d_1)\,\sigma}{2\sqrt{T}} - r\,K\,e^{-rT}\,N(d_2) + q\,S\,e^{-qT}\,N(d_1)$ |
| $\rho$ | $\partial C/\partial r$ | $K\,T\,e^{-rT}\,N(d_2)$ |

$\Theta$ is the **negative** of the time-to-maturity derivative (so it is negative for calls:
value erodes as time passes). The key identity ensures that $\partial d_1$ and $\partial d_2$
terms cancel in $\Delta$, $\Gamma$, and $\nu$, leaving the compact forms above.

### PDE Residual

The BS PDE written in time-to-maturity $\tau = T$ reads:

$$\frac{\partial C}{\partial \tau}
= \frac{1}{2}\sigma^2 S^2\,\Gamma + (r-q)S\,\Delta - rC$$

The notebook verifies this **numerically** using centred finite differences at the
reference parameters ($S=100$, $K=100$, $T=1$, $r=5\%$, $q=2\%$, $\sigma=20\%$).
The residual is $O(10^{-8})$, consistent with second-order truncation error.

### Put-Call Parity

$$C - P = S\,e^{-qT} - K\,e^{-rT}$$

This follows from $N(x) + N(-x) = 1$ applied to each term. SymPy verifies it
symbolically — the simplification returns exactly zero.

**Next:** [Lognormal Distribution & Risk-Neutral Measure →](./03-lognormal)

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

::: tip $d_1$ and $d_2$
$d_2$ is the Itô-corrected log-moneyness normalised by $\sigma\sqrt{T}$ —
it naturally appears from removing the drift in Step 3.
$d_1 = d_2 + \sigma\sqrt{T}$ comes from the extra $e^y$ factor in the first integral.
Their probabilistic interpretation will be explained in [Section 4](./04-pricing-intuition).
:::

## Key Identity

$$\boxed{S\,e^{-qT}\,n(d_1) = K\,e^{-rT}\,n(d_2)}$$

This identity links the PDF evaluated at $d_1$ and $d_2$. It is used in every Greek
derivation: when differentiating $C$ with respect to $S$, $\sigma$, etc., the terms
$\partial d_1/\partial x$ and $\partial d_2/\partial x$ would naively leave a mess, but this
identity makes them cancel exactly, yielding the compact closed forms below.

**Proof:**  
Start from $n(x) = e^{-x^2/2}/\sqrt{2\pi}$ and compute $d_1^2 - d_2^2 = (d_1-d_2)(d_1+d_2)$.  
Using $d_1 - d_2 = \sigma\sqrt{T}$:

$$d_1 + d_2 = \frac{2\ln(S/K) + 2(r-q)T}{\sigma\sqrt{T}}$$

The $\sigma\sqrt{T}$ factors cancel:

$$d_1^2 - d_2^2
= 2\ln(S/K) + 2(r-q)T$$

Therefore:

$$\frac{n(d_1)}{n(d_2)}
= \exp\!\left(-\frac{d_1^2-d_2^2}{2}\right)
= e^{-\ln(S/K)-(r-q)T}
= \frac{K}{S}\,e^{-(r-q)T}$$

Rearranging:

$$S\,n(d_1) = K\,e^{-(r-q)T}\,n(d_2)$$  

Multiplying both sides by $e^{-qT}$:  

$$S\,e^{-qT}\,n(d_1) = K\,e^{-rT}\,n(d_2) \qquad\square$$

## Greeks

The Greeks measure the sensitivity of $C$ to each input. They are obtained by
differentiating the BS formula. The key identity above ensures that the
$n(d_1)\,\partial d_1/\partial x$ and $n(d_2)\,\partial d_2/\partial x$ cross-terms cancel
in every case, leaving the compact forms in the table.

| Greek | Definition | Closed-form (call) |
|-------|-----------|-------------|
| $\Delta$ | $\partial C/\partial S$ | $e^{-qT}\,N(d_1)$ |
| $\Gamma$ | $\partial^2 C/\partial S^2$ | $\dfrac{e^{-qT}\,n(d_1)}{S\,\sigma\sqrt{T}}$ |
| $\nu$ (Vega) | $\partial C/\partial \sigma$ | $S\,e^{-qT}\,n(d_1)\,\sqrt{T}$ |
| Voma | $\partial \nu/\partial \sigma = \partial^2 C/\partial \sigma^2$ | $\nu\,\dfrac{d_1 d_2}{\sigma}$ |
| $\Theta$ | $-\partial C/\partial T$ | $-\dfrac{S\,e^{-qT}\,n(d_1)\,\sigma}{2\sqrt{T}} - r\,K\,e^{-rT}\,N(d_2) + q\,S\,e^{-qT}\,N(d_1)$ |
| $\rho$ | $\partial C/\partial r$ | $K\,T\,e^{-rT}\,N(d_2)$ |

$\Theta$ is the **negative** of the time-to-maturity derivative (negative for calls:
value erodes as time passes).

**Voma derivation:**  
Starting from $\nu = S\,e^{-qT}\,n(d_1)\,\sqrt{T}$,
differentiate with respect to $\sigma$.  
Using $n'(x) = -x\,n(x)$ and
$\partial d_1/\partial\sigma = -d_2/\sigma$ (shown below):

$$\frac{\partial \nu}{\partial \sigma}
= S\,e^{-qT}\,\sqrt{T}\cdot n'(d_1)\cdot\frac{\partial d_1}{\partial\sigma}
= S\,e^{-qT}\,\sqrt{T}\cdot(-d_1\,n(d_1))\cdot\left(-\frac{d_2}{\sigma}\right)
= \nu\,\frac{d_1 d_2}{\sigma}$$

To see that $\partial d_1/\partial\sigma = -d_2/\sigma$, write
$d_1 = A/(\sigma\sqrt{T}) + \tfrac{1}{2}\sigma\sqrt{T}$ where $A = \ln(S/K)+(r-q)T$:

$$\frac{\partial d_1}{\partial\sigma}
= -\frac{A}{\sigma^2\sqrt{T}} + \frac{\sqrt{T}}{2}
= -\frac{1}{\sigma}\left(\frac{A}{\sigma\sqrt{T}} - \frac{\sigma\sqrt{T}}{2}\right)
= -\frac{d_2}{\sigma}$$

## Put-Call Parity

$$\boxed{C - P = S\,e^{-qT} - K\,e^{-rT}}$$

**Why it must hold:**  
At maturity, $(S_T - K)^+ - (K - S_T)^+ = S_T - K$ always
(the long call minus short put exactly replicates the forward payoff regardless of $S_T$).
Discounting under $\mathbb{Q}$:
$C - P = e^{-rT}\,\mathbb{E}^{\mathbb{Q}}[S_T - K] = e^{-rT}(S\,e^{(r-q)T} - K) = S\,e^{-qT} - K\,e^{-rT}$.
This holds **without** ever using the formula — it is a pure no-arbitrage statement.

**Algebraic proof from the formula:**  

Expand $C - P$ directly:

$$C - P
= \bigl[S\,e^{-qT}N(d_1) - K\,e^{-rT}N(d_2)\bigr]
- \bigl[K\,e^{-rT}N(-d_2) - S\,e^{-qT}N(-d_1)\bigr]$$

Collect the $S$ and $K$ terms:

$$= S\,e^{-qT}\bigl[N(d_1) + N(-d_1)\bigr]
  - K\,e^{-rT}\bigl[N(d_2) + N(-d_2)\bigr]$$

Since $N(x) + N(-x) = 1$ for any $x$ (the normal CDF is symmetric about 0):

$$= S\,e^{-qT}\cdot 1 - K\,e^{-rT}\cdot 1
= S\,e^{-qT} - K\,e^{-rT} \qquad \square$$

The put price follows immediately:

$$\boxed{P = K\,e^{-rT} N(-d_2) - S\,e^{-qT} N(-d_1)}$$

## SymPy Verification

The notebook [`01_sympy_verify.ipynb`](../notebooks/01_sympy_verify.ipynb)
contains the symbolic verification that:
+ the Key Identity holds
+ the value of $C$ is a solution to the BS PDE
+ the Greeks formulae given above are correct
+ the Put-Call parity holds

### PDE Residual

To show that $C$ is a solution of the BS PDE, show that:
for time-to-maturity $\tau = T$:

$$\frac{\partial C}{\partial \tau}
- \frac{1}{2}\sigma^2 S^2\,\Gamma - (r-q)S\,\Delta + rC =  0$$

**Next:** [Lognormal Distribution & Risk-Neutral Measure →](./03-lognormal)

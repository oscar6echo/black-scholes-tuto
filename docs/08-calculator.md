# Interactive Calculator

A modernized version of the original
[`black-scholes-calculator`](https://oscar6echo.github.io/black-scholes-calculator),
embedded here as a Vue component.

<!-- TODO: embed Calculator.vue component here -->
<!-- <Calculator /> -->

## Parameters

| Symbol | Parameter | Default |
|--------|-----------|---------|
| $S$ | Spot price | 100 |
| $K$ | Strike price | 100 |
| $T$ | Maturity (years) | 1 |
| $\sigma$ | Volatility | 20% |
| $r$ | Risk-free rate | 3% |
| $q$ | Dividend yield | 0% |

## Outputs

**Price:**
$$C = S\,e^{-qT} N(d_1) - K\,e^{-rT} N(d_2), \qquad P = K\,e^{-rT} N(-d_2) - S\,e^{-qT} N(-d_1)$$

**Greeks:**

| Greek | Call | Put |
|-------|------|-----|
| $\Delta$ | $e^{-qT} N(d_1)$ | $-e^{-qT} N(-d_1)$ |
| $\Gamma$ | $e^{-qT} N'(d_1) / (S\sigma\sqrt{T})$ | same as call |
| $\nu$ | $S\,e^{-qT} N'(d_1)\sqrt{T}$ | same as call |
| $\Theta$ | see [Section 5](./05-greeks) | see [Section 5](./05-greeks) |
| $\rho$ | $KT\,e^{-rT} N(d_2)$ | $-KT\,e^{-rT} N(-d_2)$ |

## Visualizations

**2D sensitivity curves** (Observable Plot): select any parameter on the x-axis and
plot price or any Greek as a function of it.

**3D surface** (D3): select two parameters for x/y axes and any output for the z-axis.

---
layout: home

hero:
  name: Black-Scholes Explorer
  text: Option pricing from first principles
  tagline: >
    A layered journey from the BS differential equation through Monte Carlo intuition
    to the vol surface — built for quants who want to understand the "why".
  actions:
    - theme: brand
      text: Start — The BS PDE
      link: /01-bs-pde
    - theme: alt
      text: Jump to intuition
      link: /04-pricing-intuition

features:
  - title: 1. The BS PDE
    details: >
      Derive the Black-Scholes PDE from Itô's lemma and delta-hedging.
      Understand why the real-world drift μ drops out entirely.
    link: /01-bs-pde
  - title: 2. Solving the PDE
    details: >
      Three changes of variables reduce the PDE to the heat equation.
      The BS formula emerges from a Gaussian convolution integral.
    link: /02-pde-solution
  - title: 3. Lognormal & Risk-Neutral Measure
    details: >
      Under the risk-neutral measure Q, stock prices are lognormal.
      Option pricing is an expectation over this distribution.
    link: /03-lognormal
  - title: 4. Monte Carlo & Physical Intuition
    details: >
      A four-panel scroll visualization: future price distribution,
      discounted density, payoff overlay, and the contribution curve
      whose area equals the option price.
    link: /04-pricing-intuition
  - title: 5. Greeks as Geometry
    details: >
      Delta, Gamma, Vega, Theta, Rho — each one is a geometric
      property of the contribution curve. See how the formula moves.
    link: /05-greeks
  - title: 6. Put/Call Parity
    details: >
      A model-free result: C − P = forward price.
      A put is a call with a short forward.
    link: /06-putcall-parity
  - title: 7. Implied Vol & Vol Surface
    details: >
      The market smile encodes the risk-neutral density via
      Breeden-Litzenberger. The four-panel picture, but with
      the true implied distribution.
    link: /07-vol-surface
  - title: 8. Calculator
    details: >
      The modernized interactive calculator: price, Greeks,
      sensitivity curves, 3D surface.
    link: /08-calculator
---

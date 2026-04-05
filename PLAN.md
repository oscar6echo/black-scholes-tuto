# black-scholes-explo — Project Plan

> **Living document.** Update as the project evolves.

## Goal

Build an educational exploration of Black-Scholes option pricing for a quant/finance-student audience. The objective is physical intuition: a reader should understand *why* the formula looks the way it does, not just how to use it.

The project extends the existing `black-scholes-calculator` (which gives answers without derivations) into a multi-section site that builds from first principles through Monte Carlo intuition to the full Greeks and vol surface.

---

## Technology Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Site framework | **VitePress** | Multi-page, markdown-first, Vue components for embedded viz |
| Math rendering | **KaTeX** (VitePress plugin) | Fast inline/display LaTeX |
| Scrollytelling (Section 4 only) | **Scrollama + D3** | Scroll-triggered reveal of four panels |
| Charts (narrative) | **Observable Plot** | Distribution curves, payoff overlays |
| Charts (custom) | **D3.js** | Integral contribution viz, 3D vol surface |
| Interactive calculator | **Vue component** | Modernized existing calculator |
| Notebooks | **Jupyter** | Hosted on **notebook.link** (JupyterLite/Pyodide) |
| Symbolic math | **SymPy** | PDE verification + symbolic Greeks in notebooks |

**Why multi-page, not full scrollytelling:** The PDE derivation, solution steps, and Greeks are reference-heavy — readers jump around non-linearly. VitePress sidebar is more natural. Scrollytelling is used *only* in Section 4, where progressively revealing panels A→B→C→D maps perfectly to the scroll interaction.

**Why notebook.link:** numpy, scipy, sympy, and plotly all run in Pyodide (JupyterLite). Notebooks are static, browser-executable, and shareable without a backend.

---

## Project Structure

```
black-scholes-explo/
├── PLAN.md                          ← this file
├── package.json                     ← VitePress + KaTeX
├── .vitepress/
│   └── config.ts                    ← sidebar nav, KaTeX plugin
├── docs/
│   ├── index.md                     ← landing page
│   ├── 01-bs-pde.md                 ← BS PDE derivation
│   ├── 02-pde-solution.md           ← Change of vars → heat eq → BS formula
│   ├── 03-lognormal.md              ← GBM, lognormal, risk-neutral measure
│   ├── 04-pricing-intuition.md      ← MC pricing + four-panel scroll viz
│   ├── 05-greeks.md                 ← Greeks as geometric properties of integral
│   ├── 06-putcall-parity.md         ← Put/call parity: derivation + viz
│   ├── 07-vol-surface.md            ← Implied vol, smile, Breeden-Litzenberger density
│   └── 08-calculator.md             ← Embedded interactive calculator
├── components/
│   ├── FourPanelViz.vue             ← Section 4 scroll viz (Scrollama + D3)
│   ├── GBMPaths.vue                 ← GBM path simulation
│   ├── PutCallParity.vue            ← Parity payoff diagram
│   ├── VolSurface.vue               ← 3D implied vol surface (D3)
│   └── Calculator.vue               ← Modernized BS calculator
└── notebooks/
    ├── 01_sympy_verify.ipynb        ← PDE verification + symbolic Greeks
    ├── 02_lognormal.ipynb           ← GBM paths, lognormal distribution
    └── 03_monte_carlo.ipynb         ← MC vs exact pricing, convergence
```

---

## Section Content Plan

### 1 — The BS PDE `docs/01-bs-pde.md`

**Narrative:**

1. V(S,t) = derivative value. Asset dynamics: dS = μS dt + σS dW (physical measure P)
2. Apply Itô's lemma to V(S,t) → express dV
3. Construct delta-hedged portfolio Π = V − (∂V/∂S)·S; Δ = ∂V/∂S cancels dW
4. No-arbitrage: dΠ = rΠ dt → μ drops out entirely
5. Add dividend yield q: replace μ with r−q in the drift; discount stays at r
6. **The BS PDE:**

$$\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} + (r-q)S\frac{\partial V}{\partial S} - rV = 0$$

1. Boundary conditions: call V(S,T) = max(S−K,0); put V(S,T) = max(K−S,0)

**Key insight:** μ (real-world drift) cancels — option pricing is drift-independent. The risk-neutral pricing miracle. q cleanly separates *forward growth* (r−q) from *discounting* (r).

---

### 2 — Solving the PDE `docs/02-pde-solution.md`

Change-of-variables chain (each step explicit):

| Step | Substitution | Effect |
|------|-------------|--------|
| 1 | x = ln(S/K), τ = T−t | Log-space; removes multiplicative S² structure |
| 2 | V = e^{−rτ} u | Removes discounting term −rV |
| 3 | x̃ = x + (r−q−½σ²)τ | Removes first-derivative drift term |
| 4 | — | Result: heat equation ∂u/∂τ = ½σ² ∂²u/∂x̃² |

Fundamental solution (Gaussian Green's function) convolved with call payoff boundary:

- Split integral at K, complete the square in each part
- d₁ and d₂ emerge naturally from the exponent algebra

**Result:**
$$C = S\,e^{-qT} N(d_1) - K\,e^{-rT} N(d_2)$$
$$d_1 = \frac{\ln(S/K) + (r - q + \tfrac{1}{2}\sigma^2)T}{\sigma\sqrt{T}}, \quad d_2 = d_1 - \sigma\sqrt{T}$$

**SymPy notebook** `notebooks/01_sympy_verify.ipynb`:

- Substitute C into PDE, simplify residual → verify = 0 (machine proof)
- Compute Δ, Γ, ν, θ, ρ as exact symbolic derivatives
- Companion to the hand derivation, not a replacement

---

### 3 — Lognormal Distribution & Risk-Neutral Measure `docs/03-lognormal.md`

1. Change of measure: under Q, replace μ with r−q → dS = (r−q)S dt + σS dW^Q
2. Itô on ln S: d(ln S) = (r − q − ½σ²) dt + σ dW^Q
3. Terminal distribution: ln(S_T/S₀) ~ N((r−q−½σ²)T, σ²T) → **S_T is lognormal**
4. Role of q: the *forward price* F = S·e^{(r−q)T} combines both (r−q) into one quantity
5. Option price as risk-neutral expectation:

$$C = e^{-rT} \mathbb{E}^Q\!\left[\max(S_T - K,\, 0)\right] = e^{-rT}\int_K^\infty (S_T - K)\,f_Q(S_T)\,dS_T$$

**Notebook** `notebooks/02_lognormal.ipynb`: GBM path simulation, terminal distribution, vary σ, T, q (Plotly).

---

### 4 — Monte Carlo & Physical Intuition `docs/04-pricing-intuition.md`

**The four-panel scroll visualization** — the conceptual core of the project.

Panels revealed one by one as the reader scrolls (Scrollama + D3):

| Scroll step | Panel | What it shows |
|-------------|-------|--------------|
| 1 | **A** | PDF of S_T under Q — the lognormal future price distribution |
| 2 | **B** | e^{−rT}·f_Q(S_T) — present-value-weighted density |
| 3 | **C** | Payoff max(S_T−K,0) overlaid on panel B |
| 4 | **D** | **Contribution curve:** payoff × e^{−rT}·f_Q(S_T); its area = option price C |

Panel D is the key physical picture: each future price scenario contributes to today's price proportional to its (payoff) × (discounted probability density). The option price is the area under this curve.

**After full reveal:** interactive sliders for K, σ, T, r, q. Watch the distribution shift and the integral area change. This is how the formula *moves*.

**Monte Carlo connection:** sampling from panel A, evaluating panel C, averaging with the e^{−rT} from panel B. MC is the four-panel picture turned into an algorithm.

**Notebook** `notebooks/03_monte_carlo.ipynb`: MC vs exact, convergence, antithetic variates (Plotly).

---

### 5 — Greeks as Geometry `docs/05-greeks.md`

Each Greek is a property of the *shape* of the contribution curve (panel D):

| Greek | Formula | Geometric meaning |
|-------|---------|------------------|
| **Δ** | e^{−qT}·N(d₁) | S_T-weighted tail probability above K; shifts as S moves |
| **Γ** | e^{−qT}·N'(d₁)/(Sσ√T) | Rate of change of Δ; curvature of C in S; peaks ATM near expiry |
| **ν (Vega)** | S·e^{−qT}·N'(d₁)·√T | Spreading σ widens distribution → larger area; peaks ATM |
| **θ (Theta)** | (complex expression) | Shrinking T collapses distribution → less tail area |
| **ρ** | K·T·e^{−rT}·N(d₂) | Higher r → forward shifts right + smaller discount factor |

Each Greek gets a small embedded viz showing the deformation of the contribution curve.

---

### 6 — Put/Call Parity `docs/06-putcall-parity.md`

1. No-arbitrage argument: C − P = S·e^{−qT} − K·e^{−rT} (model-free)
2. Verify algebraically from BS formula using N(x) + N(−x) = 1
3. Interpretation: a put is a call plus a short forward position

**Visualization:** layered payoff diagram showing C − P = Forward payoff. The stacked view makes the decomposition visually obvious.

---

### 7 — Implied Vol & the Vol Surface `docs/07-vol-surface.md`

**Part A — Implied vol concept:**

- Given a market option price C_mkt, find σ_impl such that BS(σ_impl) = C_mkt
- Under BS: σ_impl should be constant across K and T — in practice it's not

**Part B — The smile/skew:**

- Plot σ_impl vs K/S (moneyness) for fixed T
- OTM puts trade richer (higher IV) than ATM → negative skew
- Risk-neutral interpretation: the market embeds fat left tails beyond what lognormal allows

**Part C — Breeden-Litzenberger:**
$$f_Q(K) = e^{rT}\,\frac{\partial^2 C}{\partial K^2}$$
The smile *encodes* the full risk-neutral density. Visualization:

- Compute ∂²C/∂K² from a smile (numerical differentiation)
- Overlay the implied density vs the flat-vol lognormal → see the fat tails and skew
- This closes the loop with Section 4: same four-panel picture, but now with the *true* implied distribution

**Part D — The 3D surface:**

- σ_impl(K, T) as an interactive D3 surface
- Structural features: term structure, skew, wings

**Scope:** concept + visualization only. Calibration models (SVI, Heston, local vol, SABR) are mentioned as natural extensions, not implemented here.

---

### 8 — Calculator `docs/08-calculator.md`

Modernized version of the existing `black-scholes-calculator` as a Vue component embedded in VitePress:

- Parameters: S, K, T, σ, r, q (same as original)
- Outputs: option value + full Greeks table
- 2D sensitivity charts: Observable Plot
- Optional 3D surface: D3

---

## Phased Delivery

| Phase | Deliverable | Status |
|-------|------------|--------|
| **0** | PLAN.md | ✓ done |
| **1** | VitePress scaffold: package.json, config.ts, KaTeX, doc stubs | — |
| **2** | Sections 1–3: full LaTeX in markdown | — |
| **3** | Notebooks: SymPy + lognormal + MC → uploaded to notebook.link | — |
| **4** | Four-panel scroll viz component (Scrollama + D3) | — |
| **5** | Greeks viz + put/call parity viz | — |
| **6** | Vol surface: smile → B-L density → 3D surface | — |
| **7** | Modernized calculator component | — |

---

## Open / Future

- Scrollytelling for the landing page intro? (short animated teaser leading into multi-page content)
- Include local vol / Dupire formula as Section 8 extension?
- Dark mode support in VitePress theme?

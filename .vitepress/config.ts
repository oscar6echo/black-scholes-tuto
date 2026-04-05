import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Black-Scholes Explorer',
  description: 'Option pricing from first principles — PDE, lognormal, Monte Carlo, Greeks, vol surface',

  srcDir: './docs',

  ignoreDeadLinks: true,

  markdown: {
    math: true,
    footnote: true,
  },

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Calculator', link: '/08-calculator' },
    ],

    sidebar: [
      { text: 'Overview', link: '/' },
      {
        text: 'Theory',
        items: [
          { text: '1. The BS PDE', link: '/01-bs-pde' },
          { text: '2. Solving the PDE', link: '/02-pde-solution' },
          { text: '3. Lognormal & Risk-Neutral Measure', link: '/03-lognormal' },
        ],
      },
      {
        text: 'Intuition',
        items: [
          { text: '4. Monte Carlo & Physical Intuition', link: '/04-pricing-intuition' },
          { text: '5. Greeks as Geometry', link: '/05-greeks' },
        ],
      },
      {
        text: 'Extensions',
        items: [
          { text: '6. Put/Call Parity', link: '/06-putcall-parity' },
          { text: '7. Implied Vol & Vol Surface', link: '/07-vol-surface' },
        ],
      },
      { text: 'Calculator', link: '/08-calculator' },
      {
        text: 'Appendices',
        items: [
          { text: "A1. Itô's Lemma", link: '/A1-ito-lemma' },
          { text: 'A2. Change of Measure', link: '/A2-change-of-measure' },
          { text: 'A3. Acronyms', link: '/A3-acronyms' },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/oscar6echo/black-scholes-explo',
      },
    ],
  },
})

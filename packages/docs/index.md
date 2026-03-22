---
layout: home

hero:
  name: Santi020k ESLint
  text: Flat-config docs with a real product experience
  tagline: Composable ESLint 10+ configs for TypeScript, React, Next.js, Astro, Vue, and more, documented with guided setup instead of a symbol dump.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: GitHub Repo
      link: https://github.com/santi020k/eslint-config-basic
    - theme: alt
      text: santi020k.me
      link: https://santi020k.me

features:
  - title: Modular by design
    details: Keep the base package lean and opt into frameworks or optional integrations only when you need them.
  - title: Playground-driven
    details: Every major integration is backed by a real playground package so docs and behavior stay grounded in actual projects.
  - title: API reference included
    details: TypeDoc still generates the API reference, but now it lives inside a VitePress site built for humans first.
---

<div class="santi-home-grid">
  <a class="santi-link-card" href="/guide/getting-started">
    <span class="santi-kicker">Start here</span>
    <strong>Get running fast</strong>
    Learn the main package, the preset model, and the CLI workflow before drilling into framework-specific packages.
  </a>
  <a class="santi-link-card" href="/frameworks/react">
    <span class="santi-kicker">Frameworks</span>
    <strong>Use dedicated framework guides</strong>
    React, Next.js, Astro, Vue, Svelte, Solid, Angular, NestJS, Expo, and TypeScript all have their own focused pages.
  </a>
  <a class="santi-link-card" href="/api/">
    <span class="santi-kicker">Reference</span>
    <strong>Browse the generated API</strong>
    The generated reference remains part of the docs site, so package READMEs can stay small and canonical links stay stable.
  </a>
</div>

> [!TIP]
> The public docs currently target GitHub Pages, and the production destination is planned for `eslint.santi020k.me`.

## Why this docs site exists

The old generated docs were accurate but hard to use as product documentation. This site keeps the generated API reference while adding a better top-level experience for:

- installation
- framework-specific setup
- presets and strict mode
- CLI scaffolding
- package-level entry points
- internal playground and test references

## Project links

- Repository: [github.com/santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Website: [santi020k.me](https://santi020k.me)
- npm: [@santi020k/eslint-config-basic](https://www.npmjs.com/package/@santi020k/eslint-config-basic)

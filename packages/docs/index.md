---
layout: home

hero:
  name: Santi020k ESLint
  text: Composable ESLint for Real Projects
  tagline: Documentation for the @santi020k/eslint-config-basic monorepo, covering setup, packages, frameworks, optional tooling, playgrounds, and API reference.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Browse Tooling
      link: /tooling/overview
    - theme: alt
      text: GitHub Repo
      link: https://github.com/santi020k/eslint-config-basic

features:
  - title: Modular By Design
    details: Keep the base package lean and enable frameworks or optional integrations only when the project needs them.
  - title: Playground Driven
    details: Every major integration is checked against a real playground package, not only config snapshots.
  - title: Explicit Framework Contracts
    details: React, Next.js, Astro, Vue, Svelte, Solid, Angular, NestJS, Expo, and TypeScript all have dedicated setup pages.
  - title: Monorepo Transparency
    details: Guides point back to the repository, package folders, and playground examples so the documentation stays grounded in the real codebase.
  - title: API Reference Included
    details: TypeDoc still generates the reference, but it now lives inside a curated VitePress site with practical guides first.
---

<div class="santi-home-grid">
  <a class="santi-link-card" href="/guide/getting-started">
    <span class="santi-kicker">Start here</span>
    <strong>Get Running Fast</strong>
    Learn the main package, the preset model, the CLI workflow, and the first config file you should create.
  </a>
  <a class="santi-link-card" href="/frameworks/react">
    <span class="santi-kicker">Frameworks</span>
    <strong>Use Dedicated Framework Guides</strong>
    Every supported framework has its own page with installation notes, config examples, and package relationships.
  </a>
  <a class="santi-link-card" href="/tooling/overview">
    <span class="santi-kicker">Tooling</span>
    <strong>Enable Optional Integrations</strong>
    Libraries, testing tools, file formats, standalone tools, and extension packs are documented in one place.
  </a>
  <a class="santi-link-card" href="/packages/basic">
    <span class="santi-kicker">Packages</span>
    <strong>Understand the Monorepo Layout</strong>
    Learn what the main package owns, what lives in core or optionals, and where playgrounds and tests fit into the release process.
  </a>
  <a class="santi-link-card" href="/api/">
    <span class="santi-kicker">Reference</span>
    <strong>Browse the Generated API</strong>
    The generated reference stays inside the docs site, so package READMEs can stay light and canonical links remain stable.
  </a>
</div>

## What This Site Covers

- Installation and first-use setup for the main package.
- Package-level guidance for the main package, core utilities, optionals, playgrounds, and tests.
- Explicit framework setup for React, Next.js, Astro, Vue, Svelte, Solid, Angular, NestJS, Expo, and TypeScript.
- Optional tooling across libraries, testing environments, non-code formats, standalone tools, and extension packs.
- Operational guides for the CLI, inspector, presets, strict mode, and playgrounds.
- Generated API reference for the public packages.

## Supported Frameworks

- React, Next.js, Astro, Vue, Svelte, Solid, Angular, NestJS, Expo, and TypeScript all have dedicated documentation pages.
- Framework packages stay explicit, even when project detection knows a framework is present.
- React is documented as a required dependency for Next.js and Expo, matching the runtime contract of the library.

## Supported Tooling

- Libraries: Tailwind CSS, I18next, Stencil, TanStack Query, TanStack Router, Storybook.
- Testing: Vitest, Playwright, Jest, Cypress, Testing Library.
- Formats: Markdown, MDX, JSONC, YAML, TOML, GraphQL.
- Tools: Prettier, CSpell, JSDoc, Swagger.
- Extensions: RegExp, Unicorn, SonarJS, Security, Perfectionist.

## Start With the Right Page

- Use [Getting Started](/guide/getting-started) if you are new to the library.
- Use [Configuration](/guide/configuration) if you want to compose a custom config.
- Use [Frameworks](/frameworks/typescript) if you already know the application stack.
- Use [Optional Tooling](/tooling/overview) if you want integrations such as Tailwind, Vitest, Markdown, Prettier, or Unicorn.
- Use [Packages](/packages/basic) if you want to understand the monorepo layout before contributing or extending the library.

## Project Links

- Repository: [github.com/santi020k/eslint-config-basic](https://github.com/santi020k/eslint-config-basic)
- Website: [santi020k.me](https://santi020k.me)
- Main Package: [@santi020k/eslint-config-basic](https://www.npmjs.com/package/@santi020k/eslint-config-basic)

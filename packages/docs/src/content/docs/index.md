---
title: Santi020k ESLint Config - Intelligent Flat Config for Modern Web Teams
description: The ultimate composable ESLint flat-config toolkit for JavaScript and TypeScript teams. Eliminate peer dependency conflicts, get framework-aware rules, and enforce predictable CI rollouts.
template: splash
hero:
  title: Santi020k ESLint Config
  tagline: Stop wrestling with configuration. Compose intelligent, strict, and framework-aware ESLint rules across React, Next.js, Astro, Vue, Svelte, and 10+ modern frameworks instantly.
  image:
    html: '<div class="s2k-hero-visual" aria-hidden="true"><div class="s2k-hero-visual__brand"><span class="s2k-hero-visual__mark"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="1.6rem" height="1.6rem"><polygon points="64,18 104,41 104,87 64,110 24,87 24,41" fill="none" stroke="white" stroke-width="14" stroke-linejoin="round"/><rect x="36" y="40" width="56" height="20" rx="10" fill="white"/><circle cx="82" cy="50" r="6" fill="#6319be"/><rect x="36" y="68" width="56" height="20" rx="10" fill="white" fill-opacity="0.4"/><circle cx="46" cy="78" r="6" fill="white"/></svg></span><span>@santi020k/eslint-config-basic</span></div><div class="s2k-hero-visual__terminal"><span class="s2k-hero-visual__line">$ pnpm lint</span><span class="s2k-hero-visual__line s2k-hero-visual__ok">0 errors - strict mode ready</span><span class="s2k-hero-visual__line">flat config composed in CI</span></div><div class="s2k-hero-visual__layers"><span>Base JavaScript + TypeScript</span><span>Framework guides and presets</span><span>Testing, formats, libraries, extensions</span></div></div>'
  actions:
    - text: Start with the guide
      link: /guide/getting-started
      icon: right-arrow
    - text: Configure manually
      link: /guide/configuration
      variant: secondary
    - text: Migrate from v1
      link: /guide/migration-v1-to-v2
      variant: minimal
---

import { Card, CardGrid, LinkCard, Icon } from '@astrojs/starlight/components';

<section data-animate>
  <h2 class="s2k-stats-kicker">BUILT FOR REAL REPOSITORIES</h2>
  
  <div class="s2k-stats-grid">
    <div class="s2k-stat-card">
      <strong>ESLint 9/10+</strong>
      <span>flat config</span>
    </div>
    <div class="s2k-stat-card">
      <strong>13</strong>
      <span>framework guides</span>
    </div>
    <div class="s2k-stat-card">
      <strong>26</strong>
      <span>optional integrations</span>
    </div>
    <div class="s2k-stat-card">
      <strong>CI</strong>
      <span>rollout patterns</span>
    </div>
  </div>
</section>

<br/>

<section data-animate>
  <h2 class="s2k-home-kicker">Developer Experience First</h2>
  
  <CardGrid>
    <LinkCard
      title="01 - Install Seamlessly"
      description="Wrangle the base package and get a robust, working flat config before setup becomes a bottleneck."
      href="/guide/getting-started"
    />
    <LinkCard
      title="02 - Compose Deliberately"
      description="Choose strict modes, project auto-detection, specific framework layers, and integrations without bloat."
      href="/guide/configuration"
    />
    <LinkCard
      title="03 - Rollout Predictably"
      description="Use playground fixtures and CI-friendly checks before enforcing rules into production repositories."
      href="/guide/playgrounds"
    />
  </CardGrid>
</section>

<br/>

<section data-animate>
  <h2 class="s2k-home-kicker">Seamless Ecosystem Integrations</h2>
  
  <div class="s2k-framework-grid">
    <a href="/frameworks/typescript"><Icon name="document" size="1.2rem" class="s2k-icon"/> TypeScript</a>
    <a href="/frameworks/react"><Icon name="star" size="1.2rem" class="s2k-icon"/> React</a>
    <a href="/frameworks/next"><Icon name="rocket" size="1.2rem" class="s2k-icon"/> Next.js</a>
    <a href="/frameworks/astro"><Icon name="moon" size="1.2rem" class="s2k-icon"/> Astro</a>
    <a href="/frameworks/vue"><Icon name="puzzle" size="1.2rem" class="s2k-icon"/> Vue</a>
    <a href="/frameworks/svelte"><Icon name="sun" size="1.2rem" class="s2k-icon"/> Svelte</a>
    <a href="/frameworks/solid"><Icon name="seti:hex" size="1.2rem" class="s2k-icon"/> Solid</a>
    <a href="/frameworks/angular"><Icon name="error" size="1.2rem" class="s2k-icon"/> Angular</a>
    <a href="/frameworks/nest"><Icon name="setting" size="1.2rem" class="s2k-icon"/> NestJS</a>
    <a href="/frameworks/hono"><Icon name="node" size="1.2rem" class="s2k-icon"/> Hono</a>
    <a href="/frameworks/expo"><Icon name="apple" size="1.2rem" class="s2k-icon"/> Expo</a>
    <a href="/frameworks/remix"><Icon name="seti:html" size="1.2rem" class="s2k-icon"/> Remix</a>
  </div>
</section>

<br/>

<section data-animate>
  <h2 class="s2k-home-kicker">Deep Dive Documentation</h2>
  
  <CardGrid>
    <LinkCard
      title="TypeScript-First Architecture"
      description="Compose language, import, and runtime rules dynamically without locking every team into identical stacks."
      href="/frameworks/typescript"
    />
    <LinkCard
      title="Granular Tooling"
      description="Add Prettier, Jest, Vitest, Playwright, Tailwind, and GraphQL integrations precisely where they belong."
      href="/tooling/overview"
    />
    <LinkCard
      title="Automated Scaffolding"
      description="Generate starter configurations, inspect underlying choices, and simplify monorepo linting via the CLI."
      href="/guide/cli"
    />
  </CardGrid>
</section>

<br/>

<section data-animate>
  <h2 class="s2k-home-kicker">Project Reference</h2>
  
  <CardGrid>
    <LinkCard
      title="Package Boundaries"
      description="Understand the core module, internal framework packages, integrations, playgrounds, and the testing suite."
      href="/packages/basic"
    />
    <LinkCard
      title="Generated API Reference"
      description="Consult the TypeDoc reference when standard guides are not enough for complex implementation details."
      href="/api/"
    />
    <LinkCard
      title="Version 1 Legacy Archive"
      description="Keep older projects unblocked and stable while newly developed work transitions through the v2 migration path."
      href="/v1/"
    />
  </CardGrid>
</section>

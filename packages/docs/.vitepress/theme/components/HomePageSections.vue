<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, withBase } from 'vitepress'

import { getDocsPrefix, type DocsPrefix, withDocsPrefix } from '../../nav-builders.js'

const route = useRoute()
const docsPrefix = computed<DocsPrefix>(() => getDocsPrefix(route.path))

function docHref(path: string): string {
  return withBase(withDocsPrefix(docsPrefix.value, path))
}

const migrationHref = computed(() => withBase('/guide/migration-v1-to-v2'))
</script>

<template>
  <div class="santi-home-root">
    <a class="santi-home-upgrade santi-home-reveal" :href="migrationHref">
      <span class="santi-home-upgrade__label">From v1</span>
      <span class="santi-home-upgrade__title">Migrating to v2?</span>
      <span class="santi-home-upgrade__meta">
        See breaking changes, config mapping, and the shortest path to a clean upgrade.
      </span>
      <span class="santi-home-upgrade__cta">
        Open migration guide
        <span class="santi-home-upgrade__arrow" aria-hidden="true">→</span>
      </span>
    </a>

    <section class="santi-home-panel mb-20 santi-home-reveal santi-home-reveal--delay-1">
      <div class="santi-home-panel__grid">
        <div class="santi-home-intro">
          <p class="santi-home-eyebrow">Why this library exists</p>
          <h2>Lower lint setup friction without shipping a giant monolith.</h2>
          <p class="santi-home-lede">
            <code>@santi020k/eslint-config-basic</code> was built for the kind of projects teams actually maintain:
            JavaScript and TypeScript apps, framework-heavy frontends, monorepos, and codebases that need strong
            defaults without turning every setup into a custom linting project.
          </p>
          <p v-if="docsPrefix === '/v1'">
            This documentation site is the fastest way to choose the right package, compose a flat config, and roll the
            setup across React, Next.js, Astro, Vue, Svelte, Solid, Angular, NestJS, Hono, Expo, Qwik, Remix, and
            modern tooling using explicit framework packages and the integrations your repo actually uses.
          </p>
          <p v-else>
            This documentation site is the fastest way to choose the right package, compose a flat config, and roll
            the setup across React, Next.js, Astro, Vue, Svelte, Solid, Angular, NestJS, Hono, Expo, Qwik, Remix, and
            modern tooling—now with a clearer v2 composition model.
          </p>
        </div>

        <div class="santi-home-metrics">
          <article class="santi-home-metric santi-home-metric--pulse">
            <strong>13</strong>
            <span>framework guides</span>
            <p>Explicit packages for the stacks you actually ship, not vague one-size-fits-all presets.</p>
          </article>
          <article class="santi-home-metric">
            <strong>26</strong>
            <span>optional integrations</span>
            <p>Tailwind CSS, Vitest, Playwright, Markdown, Prettier, Storybook, i18next, and more.</p>
          </article>
          <article class="santi-home-metric">
            <strong>DX-first</strong>
            <span>from install to CI</span>
            <p>Auto-detection, strict mode, real playgrounds, and docs that stay tied to the working codebase.</p>
          </article>
          <article class="santi-home-metric">
            <strong>ESLint 9/10+</strong>
            <span>flat config ready</span>
            <p>Built around modern ESLint workflows instead of legacy config patterns teams are trying to leave behind.</p>
          </article>
        </div>
      </div>
    </section>

    <div class="santi-home-links">
      <a class="santi-link-card santi-home-reveal santi-home-reveal--delay-2" :href="docHref('/guide/getting-started')">
        <span class="santi-kicker">Start here</span>
        <strong>Get running in minutes</strong>
        <p class="santi-link-card__body">
          Learn the base package, the first config file, the auto-detection model, and the right next page for your
          stack.
        </p>
        <span class="santi-link-card__cta">Open guide</span>
      </a>
      <a class="santi-link-card santi-home-reveal santi-home-reveal--delay-3" :href="docHref('/frameworks/react')">
        <span class="santi-kicker">Frameworks</span>
        <strong>Choose the exact framework package</strong>
        <p class="santi-link-card__body">
          Every supported framework has its own page with install notes, config examples, and package relationships.
        </p>
        <span class="santi-link-card__cta">Browse frameworks</span>
      </a>
      <a class="santi-link-card santi-home-reveal santi-home-reveal--delay-4" :href="docHref('/tooling/overview')">
        <span class="santi-kicker">Tooling</span>
        <strong>Layer in optional integrations</strong>
        <p class="santi-link-card__body">
          Libraries, testing tools, file formats, standalone tools, and extension packs are documented in one place.
        </p>
        <span class="santi-link-card__cta">See tooling</span>
      </a>
      <a class="santi-link-card santi-home-reveal santi-home-reveal--delay-5" :href="docHref('/packages/basic')">
        <span class="santi-kicker">Packages</span>
        <strong>Understand the monorepo layout</strong>
        <p class="santi-link-card__body">
          See what the main package owns, what lives in core or optionals, and how the repo stays composable.
        </p>
        <span class="santi-link-card__cta">Inspect packages</span>
      </a>
      <a class="santi-link-card santi-home-reveal santi-home-reveal--delay-6" :href="docHref('/guide/playgrounds')">
        <span class="santi-kicker">Examples</span>
        <strong>Validate ideas against playgrounds</strong>
        <p class="santi-link-card__body">
          Jump into real framework and tooling playground packages before you adopt a new stack or integration.
        </p>
        <span class="santi-link-card__cta">Open playgrounds</span>
      </a>
      <a class="santi-link-card santi-home-reveal santi-home-reveal--delay-7" :href="docHref('/api/')">
        <span class="santi-kicker">Reference</span>
        <strong>Browse the generated API</strong>
        <p class="santi-link-card__body">
          Keep guides, package docs, and generated reference in the same place so canonical links stay stable.
        </p>
        <span class="santi-link-card__cta">Read API docs</span>
      </a>
    </div>

    <section class="santi-home-panel santi-home-reveal santi-home-reveal--delay-8">
      <p class="santi-home-eyebrow">Build the right linting stack</p>
      <div class="santi-home-stack">
        <article class="santi-home-stack-card">
          <h3>Framework packages stay explicit on purpose.</h3>
          <p>
            Use dedicated framework packages when the runtime actually requires them. That keeps the final config
            readable, makes package boundaries obvious, and reduces hidden behavior for teams onboarding into an
            existing repo.
          </p>
          <ul class="santi-home-chip-list">
            <li>React</li>
            <li>Next.js</li>
            <li>Astro</li>
            <li>Vue</li>
            <li>Svelte</li>
            <li>Solid</li>
            <li>Angular</li>
            <li>NestJS</li>
            <li>Hono</li>
            <li>Expo</li>
            <li>Qwik</li>
            <li>Remix</li>
            <li>TypeScript</li>
          </ul>
        </article>

        <article class="santi-home-stack-card">
          <h3>Optional tooling is grouped the way teams think about work.</h3>
          <p>
            Instead of memorizing custom preset names, enable categories that mirror real project needs: libraries,
            testing, formats, standalone tools, and extension packs.
          </p>
          <ul class="santi-home-chip-list">
            <li>Tailwind CSS</li>
            <li>Vitest</li>
            <li>Playwright</li>
            <li>Testing Library</li>
            <li>Markdown</li>
            <li>MDX</li>
            <li>Prettier</li>
            <li>CSpell</li>
            <li>Storybook</li>
            <li>i18next</li>
            <li>Unicorn</li>
            <li>Security</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="santi-home-panel santi-home-outro santi-home-reveal santi-home-reveal--delay-9">
      <p class="santi-home-eyebrow">Choose the fastest path</p>
      <h2>Use the docs like a product guide, not just a file index.</h2>
      <p class="santi-home-lede">
        Start with <a :href="docHref('/guide/getting-started')">Getting Started</a> if you are new to the library,
        jump to <a :href="docHref('/guide/configuration')">Configuration</a> if you already know the shape of the
        final config, or go straight to <a :href="docHref('/tooling/overview')">Optional Tooling</a> and
        <a :href="docHref('/frameworks/typescript')">Framework Guides</a> when the application stack is already
        defined.
      </p>
      <p v-if="docsPrefix !== '/v1'">
        Upgrading from v1? Read <a :href="migrationHref">Migration from v1 to v2</a> first so
        imports, framework wiring, and defaults match what the ecosystem expects today.
      </p>
      <p v-else>
        Ready to move forward? Read <a :href="migrationHref">Migration from v1 to v2</a> for imports, framework wiring,
        and defaults that match the current ecosystem.
      </p>
      <p>
        The generated <a :href="docHref('/api/')">API reference</a>, package docs, and playground guidance all stay
        inside the same site so contributors, tech leads, and individual developers can move from install to real repo
        decisions without losing context.
      </p>
    </section>
  </div>
</template>

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

    <section class="santi-home-panel santi-home-story santi-home-reveal santi-home-reveal--delay-1">
      <p class="santi-home-eyebrow">Build once, scale intentionally</p>
      <h2>v2 keeps lint configuration explicit, composable, and easier to maintain.</h2>
      <p class="santi-home-lede">
        The docs now follow the same mental model as the code: start with a clean base, add only the framework package
        your app needs, then layer optional integrations by category.
      </p>
      <div class="santi-home-pillars">
        <article class="santi-home-pillar">
          <h3>Clear composition model</h3>
          <p>No hidden presets or surprising merges. Teams can reason about every config layer in review.</p>
        </article>
        <article class="santi-home-pillar">
          <h3>Real project defaults</h3>
          <p>Auto-detection and strict mode are tuned for JavaScript and TypeScript repos shipping real products.</p>
        </article>
        <article class="santi-home-pillar">
          <h3>Migration without guesswork</h3>
          <p>v1 users get direct guidance so upgrades are predictable and can be rolled out safely in stages.</p>
        </article>
      </div>
    </section>

    <section class="santi-home-panel santi-home-reveal santi-home-reveal--delay-2">
      <div class="santi-home-panel__grid">
        <div class="santi-home-intro">
          <p class="santi-home-eyebrow">Coverage that matches production stacks</p>
          <h2>Everything needed to go from install to team-wide adoption.</h2>
          <p>
            Use framework-specific packages to avoid one-size-fits-all tradeoffs, then enable tooling integrations only
            where they add value. The result is simpler config ownership and cleaner CI behavior.
          </p>
          <p v-if="docsPrefix !== '/v1'">
            If you are already running v1, start with
            <a :href="migrationHref">Migration from v1 to v2</a> before introducing framework or optional changes.
          </p>
        </div>

        <div class="santi-home-metrics">
          <article class="santi-home-metric santi-home-metric--pulse">
            <strong>13</strong>
            <span>framework guides</span>
            <p>React, Next.js, Astro, Vue, Svelte, Solid, Angular, NestJS, Hono, Expo, Qwik, Remix, and TypeScript.</p>
          </article>
          <article class="santi-home-metric">
            <strong>26</strong>
            <span>optional integrations</span>
            <p>Testing, formatting, libraries, tools, and extension packs documented with one consistent structure.</p>
          </article>
          <article class="santi-home-metric">
            <strong>DX-first</strong>
            <span>from local dev to CI</span>
            <p>Strict mode, playground-backed guidance, and defaults that optimize team velocity.</p>
          </article>
          <article class="santi-home-metric">
            <strong>ESLint 9/10+</strong>
            <span>flat config native</span>
            <p>Purpose-built for modern ESLint workflows instead of legacy compatibility layers.</p>
          </article>
        </div>
      </div>
    </section>

    <div class="santi-home-links">
      <a class="santi-link-card santi-home-reveal santi-home-reveal--delay-3" :href="docHref('/guide/getting-started')">
        <span class="santi-kicker">Start here</span>
        <strong>Install and compose your first config</strong>
        <p class="santi-link-card__body">
          Learn the base package flow, defaults, and framework wiring in the shortest path.
        </p>
        <span class="santi-link-card__cta">Open guide</span>
      </a>
      <a class="santi-link-card santi-home-reveal santi-home-reveal--delay-4" :href="docHref('/frameworks/react')">
        <span class="santi-kicker">Frameworks</span>
        <strong>Pick the exact framework package</strong>
        <p class="santi-link-card__body">
          Each framework guide includes package setup, examples, and boundaries with the base config.
        </p>
        <span class="santi-link-card__cta">Browse frameworks</span>
      </a>
      <a class="santi-link-card santi-home-reveal santi-home-reveal--delay-5" :href="docHref('/tooling/overview')">
        <span class="santi-kicker">Tooling</span>
        <strong>Add integrations by category</strong>
        <p class="santi-link-card__body">
          Enable testing, libraries, formats, and tools with explicit categories your team can review quickly.
        </p>
        <span class="santi-link-card__cta">See tooling</span>
      </a>
      <a class="santi-link-card santi-home-reveal santi-home-reveal--delay-6" :href="docHref('/packages/basic')">
        <span class="santi-kicker">Packages</span>
        <strong>Understand package boundaries</strong>
        <p class="santi-link-card__body">
          See what `basic`, `core`, and `optionals` own so architecture choices stay transparent.
        </p>
        <span class="santi-link-card__cta">Inspect packages</span>
      </a>
      <a class="santi-link-card santi-home-reveal santi-home-reveal--delay-7" :href="docHref('/api/')">
        <span class="santi-kicker">Reference</span>
        <strong>Use generated API reference</strong>
        <p class="santi-link-card__body">
          Keep implementation docs and generated API pages in a single canonical source of truth.
        </p>
        <span class="santi-link-card__cta">Read API docs</span>
      </a>
      <a class="santi-link-card santi-home-reveal santi-home-reveal--delay-8" :href="docHref('/guide/playgrounds')">
        <span class="santi-kicker">Playgrounds</span>
        <strong>Validate decisions before rollout</strong>
        <p class="santi-link-card__body">
          Test framework and tooling combinations against real playgrounds before adopting changes in your monorepo.
        </p>
        <span class="santi-link-card__cta">Open playgrounds</span>
      </a>
    </div>

    <section class="santi-home-panel santi-home-reveal santi-home-reveal--delay-9">
      <p class="santi-home-eyebrow">Build the right stack for your repo</p>
      <div class="santi-home-stack">
        <article class="santi-home-stack-card">
          <h3>Framework packages stay explicit on purpose.</h3>
          <p>
            Bring in dedicated framework config only when the runtime needs it. This keeps the final config readable,
            reviewable, and easier to evolve as the product architecture changes.
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
          <h3>Optional tooling follows team workflows.</h3>
          <p>
            Instead of memorizing preset names, enable categories that map to real project concerns: testing, tooling,
            file formats, libraries, and extension packs.
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

    <section class="santi-home-panel santi-home-outro santi-home-reveal santi-home-reveal--delay-10">
      <p class="santi-home-eyebrow">Choose your path</p>
      <h2>Navigate by outcome, not by guesswork.</h2>
      <p class="santi-home-lede">
        Start with <a :href="docHref('/guide/getting-started')">Getting Started</a> if you are evaluating the stack,
        move to <a :href="docHref('/guide/configuration')">Configuration</a> when adopting in production, and use
        <a :href="docHref('/guide/playgrounds')">Playgrounds</a> to validate framework or tooling decisions safely.
      </p>
      <p v-if="docsPrefix !== '/v1'">
        Upgrading from v1? Read <a :href="migrationHref">Migration from v1 to v2</a> first so imports, framework
        wiring, and defaults align with the current composition model.
      </p>
      <p v-else>
        Ready to move forward? Read <a :href="migrationHref">Migration from v1 to v2</a> for imports, framework
        wiring, and defaults that match the current ecosystem.
      </p>
      <p>
        The generated <a :href="docHref('/api/')">API reference</a>, package docs, and guide content stay in one site
        so contributors can move from install to CI policy with less context switching.
      </p>
    </section>
  </div>
</template>

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
    <section class="santi-home-proof" aria-label="Documentation proof points">
      <span><strong>ESLint 9/10+</strong> flat config</span>
      <span><strong>13</strong> framework guides</span>
      <span><strong>26</strong> optional integrations</span>
      <span><strong>CI</strong> rollout patterns</span>
    </section>

    <p v-if="docsPrefix !== '/v1'" class="santi-home-migrate">
      On v1 today?
      <a :href="migrationHref">Migration guide</a>
      — imports, presets, and rollout order.
    </p>

    <section class="santi-home-steps" aria-labelledby="santi-home-steps-title">
      <h2 id="santi-home-steps-title" class="visually-hidden">Next steps</h2>
      <ul class="santi-home-steps__list">
        <li>
          <a class="santi-home-step" :href="docHref('/guide/getting-started')">
            <span class="santi-home-step__number">01</span>
            <span class="santi-home-step__label">Install</span>
            <span class="santi-home-step__text">Wire the base package and your first framework.</span>
          </a>
        </li>
        <li>
          <a class="santi-home-step" :href="docHref('/guide/configuration')">
            <span class="santi-home-step__number">02</span>
            <span class="santi-home-step__label">Configure</span>
            <span class="santi-home-step__text">Options, strict mode, and project detection.</span>
          </a>
        </li>
        <li>
          <a class="santi-home-step" :href="docHref('/guide/playgrounds')">
            <span class="santi-home-step__number">03</span>
            <span class="santi-home-step__label">Verify</span>
            <span class="santi-home-step__text">Use playgrounds before you ship changes to CI.</span>
          </a>
        </li>
      </ul>
    </section>

    <section class="santi-home-paths" aria-labelledby="santi-home-paths-title">
      <div class="santi-home-section-head">
        <p class="santi-home-eyebrow">Pick your rollout path</p>
        <h2 id="santi-home-paths-title">Docs that meet teams where they are</h2>
        <p>
          Start small, add framework rules deliberately, then turn on stricter checks once the repo is ready.
        </p>
      </div>

      <div class="santi-home-paths__grid">
        <a class="santi-home-path" :href="docHref('/frameworks/typescript')">
          <span class="santi-home-path__tag">Base</span>
          <strong>TypeScript-first setup</strong>
          <span>Compose language, import, and runtime rules without locking every team into the same stack.</span>
        </a>
        <a class="santi-home-path" :href="docHref('/tooling/overview')">
          <span class="santi-home-path__tag">Integrations</span>
          <strong>Tools only when needed</strong>
          <span>Add testing, formats, libraries, and extensions as opt-in layers instead of one noisy preset.</span>
        </a>
        <a class="santi-home-path" :href="docHref('/guide/cli')">
          <span class="santi-home-path__tag">Automation</span>
          <strong>CLI-assisted adoption</strong>
          <span>Generate starter config, inspect choices, and make monorepo linting easier to reason about.</span>
        </a>
      </div>
    </section>

    <section class="santi-home-frameworks" aria-labelledby="santi-home-frameworks-title">
      <div class="santi-home-section-head">
        <p class="santi-home-eyebrow">Framework coverage</p>
        <h2 id="santi-home-frameworks-title">One linting system across your app surface</h2>
      </div>

      <div class="santi-home-frameworks__list">
        <a :href="docHref('/frameworks/react')">React</a>
        <a :href="docHref('/frameworks/next')">Next.js</a>
        <a :href="docHref('/frameworks/vue')">Vue</a>
        <a :href="docHref('/frameworks/svelte')">Svelte</a>
        <a :href="docHref('/frameworks/astro')">Astro</a>
        <a :href="docHref('/frameworks/nest')">NestJS</a>
        <a :href="docHref('/frameworks/hono')">Hono</a>
        <a :href="docHref('/frameworks/expo')">Expo</a>
      </div>
    </section>

    <section class="santi-home-catalog" aria-labelledby="santi-home-catalog-title">
      <div class="santi-home-catalog__head">
        <p class="santi-home-eyebrow">Documentation map</p>
        <h2 id="santi-home-catalog-title" class="santi-home-catalog__title">Browse</h2>
        <p class="santi-home-catalog__sub">
          Go from setup to rollout with docs written for engineering teams, maintainers, and CI owners.
        </p>
      </div>

      <div class="santi-home-catalog__grid">
        <div class="santi-home-catalog__block">
          <h3>Guides</h3>
          <ul>
            <li><a :href="docHref('/guide/getting-started')">Getting Started</a></li>
            <li><a :href="docHref('/guide/configuration')">Configuration</a></li>
            <li><a :href="docHref('/guide/playgrounds')">Playgrounds</a></li>
            <li><a :href="migrationHref">Migration v1 → v2</a></li>
            <li><a :href="docHref('/guide/changelog')">Changelog</a></li>
          </ul>
        </div>

        <div class="santi-home-catalog__block">
          <h3>Stacks</h3>
          <ul>
            <li><a :href="docHref('/frameworks/typescript')">Framework guides</a></li>
            <li><a :href="docHref('/tooling/overview')">Integrations</a></li>
            <li><a :href="docHref('/packages/basic')">Package boundaries</a></li>
          </ul>
        </div>

        <div class="santi-home-catalog__block">
          <h3>Reference</h3>
          <ul>
            <li><a :href="docHref('/api/')">API</a></li>
            <li><a href="https://github.com/santi020k/eslint-config-basic">GitHub</a></li>
            <li>
              <a href="https://www.npmjs.com/package/@santi020k/eslint-config-basic">npm</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

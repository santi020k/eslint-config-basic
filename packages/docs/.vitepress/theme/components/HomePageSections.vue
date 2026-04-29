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
    <p class="santi-home-stats" aria-hidden="true">
      <span class="santi-home-stats__item"><strong>13</strong> frameworks</span>
      <span class="santi-home-stats__dot" aria-hidden="true" />
      <span class="santi-home-stats__item"><strong>26</strong> optionals</span>
      <span class="santi-home-stats__dot" aria-hidden="true" />
      <span class="santi-home-stats__item"><strong>ESLint</strong> 9 &amp; 10+</span>
    </p>

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
            <span class="santi-home-step__label">Install</span>
            <span class="santi-home-step__text">Wire the base package and your first framework.</span>
          </a>
        </li>
        <li>
          <a class="santi-home-step" :href="docHref('/guide/configuration')">
            <span class="santi-home-step__label">Configure</span>
            <span class="santi-home-step__text">Options, strict mode, and project detection.</span>
          </a>
        </li>
        <li>
          <a class="santi-home-step" :href="docHref('/guide/playgrounds')">
            <span class="santi-home-step__label">Verify</span>
            <span class="santi-home-step__text">Use playgrounds before you ship changes to CI.</span>
          </a>
        </li>
      </ul>
    </section>

    <section class="santi-home-catalog" aria-labelledby="santi-home-catalog-title">
      <div class="santi-home-catalog__head">
        <h2 id="santi-home-catalog-title">Browse</h2>
        <p class="santi-home-catalog__sub">
          Jump to guides, stacks, or generated reference—everything lives in this site.
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
            <li><a :href="docHref('/tooling/overview')">Optional tooling</a></li>
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

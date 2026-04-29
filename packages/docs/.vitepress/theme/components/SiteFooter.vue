<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

import { getDocsPrefix, type DocsPrefix, withDocsPrefix } from '../../nav-builders.js'

const { site } = useData()
const route = useRoute()

const docsPrefix = computed<DocsPrefix>(() => getDocsPrefix(route.path))
const editionLabel = computed(() => (docsPrefix.value === '/v1' ? 'v1 docs' : 'v2 docs'))

function docHref(path: string): string {
  return withBase(withDocsPrefix(docsPrefix.value, path))
}
</script>

<template>
  <footer class="santi-site-footer">
    <div class="santi-site-footer__container">
      <section class="santi-site-footer__brand" aria-label="Project information">
        <p class="santi-site-footer__eyebrow">Documentation</p>
        <h2>{{ site.title }}</h2>
        <p>
          Composable ESLint flat config documentation for modern JavaScript and TypeScript teams shipping production
          applications.
        </p>
        <span class="santi-site-footer__badge">{{ editionLabel }}</span>
      </section>

      <nav class="santi-site-footer__links" aria-label="Documentation links">
        <section>
          <p class="santi-site-footer__heading">Get Started</p>
          <a :href="docHref('/guide/getting-started')">Getting Started</a>
          <a :href="docHref('/guide/configuration')">Configuration</a>
          <a :href="docHref('/guide/playgrounds')">Playgrounds</a>
          <a :href="docHref('/guide/changelog')">Changelog</a>
        </section>
        <section>
          <p class="santi-site-footer__heading">Explore</p>
          <a :href="docHref('/frameworks/typescript')">Framework Guides</a>
          <a :href="docHref('/tooling/overview')">Optional Tooling</a>
          <a :href="docHref('/packages/basic')">Package Docs</a>
          <a :href="docHref('/api/')">API Reference</a>
        </section>
        <section>
          <p class="santi-site-footer__heading">Community</p>
          <a href="https://github.com/santi020k/eslint-config-basic">GitHub</a>
          <a href="https://www.npmjs.com/package/@santi020k/eslint-config-basic">NPM Package</a>
          <a href="https://santi020k.com">Author Website</a>
        </section>
      </nav>
    </div>
  </footer>
</template>

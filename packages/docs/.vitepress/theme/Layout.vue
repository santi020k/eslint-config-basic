<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { buildThemeNav, getDocsPrefix, logoLinkForPrefix } from '../nav-builders.js'

const { frontmatter, site } = useData()
const route = useRoute()

const isHome = computed(() => frontmatter.value.layout === 'home')
const editionBadge = computed(() => (getDocsPrefix(route.path) === '/v1' ? 'v1' : 'v2'))

watchEffect(() => {
  const prefix = getDocsPrefix(route.path)
  const tc = site.value.themeConfig
  tc.nav = buildThemeNav(prefix, route.path)
  tc.logoLink = logoLinkForPrefix(prefix)
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-info-before>
      <div v-if="isHome" class="santi-hero-kicker">
        <span class="santi-hero-kicker__badge" aria-label="Documentation edition">{{ editionBadge }}</span>
        <span class="santi-hero-kicker__dot" aria-hidden="true"></span>
        <span>Built for JavaScript and TypeScript teams shipping production apps</span>
      </div>
    </template>

    <template #home-hero-info-after>
      <div v-if="isHome" class="santi-hero-strip" aria-label="Product highlights">
        <span class="santi-hero-strip__label">Core</span>
        <span class="santi-hero-strip__item">Flat config</span>
        <span class="santi-hero-strip__item">Auto-detection</span>
        <span class="santi-hero-strip__item">Framework packages</span>
        <span class="santi-hero-strip__item">Playground-backed docs</span>
        <span class="santi-hero-strip__item">v1 to v2 migration</span>
      </div>
    </template>

    <template #home-hero-image>
      <div v-if="isHome" class="santi-hero-visual" aria-hidden="true">
        <div class="santi-hero-visual__mesh"></div>
        <div class="santi-hero-visual__grid"></div>
        <div class="santi-hero-visual__halo"></div>
        <div class="santi-hero-visual__ring santi-hero-visual__ring--outer"></div>
        <div class="santi-hero-visual__ring santi-hero-visual__ring--inner"></div>

        <img
          alt="Santi020k ESLint emblem"
          class="santi-hero-visual__logo"
          :src="withBase('/cover.webp')"
        />

        <div class="santi-hero-note santi-hero-note--left">
          <p class="santi-hero-note__label">Base</p>
          <p class="santi-hero-note__body">Composable defaults for JS, TS, runtimes, and strict CI-ready linting.</p>
        </div>

        <div class="santi-hero-note santi-hero-note--right">
          <p class="santi-hero-note__label">Coverage</p>
          <p class="santi-hero-note__body">13 framework guides, 26 integrations, API reference, and migration docs.</p>
        </div>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SiteFooter from './components/SiteFooter.vue'

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
        <span class="santi-hero-strip__label">Highlights</span>
        <span class="santi-hero-strip__item">Flat config</span>
        <span class="santi-hero-strip__item">Composable packages</span>
        <span class="santi-hero-strip__item">Strict mode</span>
        <span class="santi-hero-strip__item">Playgrounds</span>
      </div>
    </template>

    <template #home-hero-image>
      <div v-if="isHome" class="santi-hero-visual" aria-hidden="true">
        <div class="santi-hero-visual__mesh"></div>
        <div class="santi-hero-visual__halo"></div>

        <img
          alt=""
          class="santi-hero-visual__logo"
          :src="withBase('/cover.webp')"
        />
      </div>
    </template>

    <template #layout-bottom>
      <SiteFooter />
    </template>
  </DefaultTheme.Layout>
</template>

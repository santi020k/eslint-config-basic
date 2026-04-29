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
      <div v-if="isHome">
        <div class="santi-hero-strip" aria-label="Product highlights">
          <span class="santi-hero-strip__label">Highlights</span>
          <span class="santi-hero-strip__item">ESLint 9/10+</span>
          <span class="santi-hero-strip__item">Framework-ready</span>
          <span class="santi-hero-strip__item">CI-safe rollouts</span>
        </div>
        <p class="santi-hero-trust" aria-label="Adoption proof points">
          <span><strong>13</strong> frameworks</span>
          <span><strong>26</strong> integrations</span>
          <span><strong>DX-first</strong> defaults</span>
        </p>
      </div>
    </template>

    <template #home-hero-image>
      <div v-if="isHome" class="santi-hero-visual" aria-hidden="true">
        <div class="santi-hero-visual__mesh"></div>
        <div class="santi-hero-visual__halo"></div>
        <div class="santi-hero-visual__ring"></div>
        <div class="santi-hero-visual__chip santi-hero-visual__chip--one">Flat Config</div>
        <div class="santi-hero-visual__chip santi-hero-visual__chip--two">Strict Mode</div>
        <div class="santi-hero-visual__chip santi-hero-visual__chip--three">26 Integrations</div>
        <div class="santi-hero-visual__terminal">
          <div class="santi-hero-visual__terminal-top">
            <span></span><span></span><span></span>
          </div>
          <div class="santi-hero-visual__terminal-body">
            <span class="santi-hero-visual__line">$ pnpm lint</span>
            <span class="santi-hero-visual__line santi-hero-visual__line--ok">✓ 0 errors</span>
            <span class="santi-hero-visual__line santi-hero-visual__line--muted">strict mode enabled</span>
          </div>
        </div>

        <img
          alt=""
          class="santi-hero-visual__logo"
          :src="withBase('/cover.webp')"
        />
      </div>
    </template>

    <template #doc-after>
      <SiteFooter v-if="!isHome" />
    </template>

    <template #layout-bottom>
      <SiteFooter v-if="isHome" />
    </template>
  </DefaultTheme.Layout>
</template>

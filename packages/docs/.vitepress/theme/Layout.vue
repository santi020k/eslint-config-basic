<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { frontmatter } = useData()
const isHome = computed(() => frontmatter.value.layout === 'home')
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-info-before>
      <div v-if="isHome" class="santi-hero-kicker">
        <span class="santi-hero-kicker__dot" aria-hidden="true"></span>
        <span>Designed in the visual language of santi020k.me</span>
      </div>
    </template>

    <template #home-hero-info-after>
      <div v-if="isHome" class="santi-hero-strip" aria-label="Product highlights">
        <span class="santi-hero-strip__label">Focus</span>
        <span class="santi-hero-strip__item">Flat config</span>
        <span class="santi-hero-strip__item">Zero-config auto-detection</span>
        <span class="santi-hero-strip__item">Framework packages</span>
        <span class="santi-hero-strip__item">Playground-backed docs</span>
      </div>
    </template>

    <template #home-hero-image>
      <div v-if="isHome" class="santi-hero-visual">
        <div class="santi-hero-visual__halo" aria-hidden="true"></div>
        <div class="santi-hero-visual__ring santi-hero-visual__ring--outer" aria-hidden="true"></div>
        <div class="santi-hero-visual__ring santi-hero-visual__ring--inner" aria-hidden="true"></div>

        <img
          alt="Santi020k logo"
          class="santi-hero-visual__logo"
          :src="withBase('/logo-square.webp')"
        />

        <div class="santi-hero-note santi-hero-note--left">
          <p class="santi-hero-note__label">Base</p>
          <p class="santi-hero-note__body">JavaScript, TypeScript, runtime presets, and strict mode.</p>
        </div>

        <div class="santi-hero-note santi-hero-note--right">
          <p class="santi-hero-note__label">Scale</p>
          <p class="santi-hero-note__body">12 frameworks, 26 integrations, docs, API, and playgrounds.</p>
        </div>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

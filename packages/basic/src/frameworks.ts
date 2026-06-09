import { angularConfig } from '@santi020k/eslint-config-angular'
import astro from '@santi020k/eslint-config-astro'
import {
  type DetectedFrameworkName,
  type FlatConfigArray,
  type Runtime
} from '@santi020k/eslint-config-core'
import { expoConfig } from '@santi020k/eslint-config-expo'
import { hono } from '@santi020k/eslint-config-hono'
import { nestConfig } from '@santi020k/eslint-config-nest'
import { nextConfig } from '@santi020k/eslint-config-next'
import { qwik } from '@santi020k/eslint-config-qwik'
import { reactConfig } from '@santi020k/eslint-config-react'
import { remix } from '@santi020k/eslint-config-remix'
import { slidev } from '@santi020k/eslint-config-slidev'
import { solidConfig } from '@santi020k/eslint-config-solid'
import { svelteConfig } from '@santi020k/eslint-config-svelte'
import { vite } from '@santi020k/eslint-config-vite'
import { vueConfig } from '@santi020k/eslint-config-vue'

export type FrameworkFlags = Partial<Record<FrameworkName, true>>

export type FrameworkName = DetectedFrameworkName

export interface FrameworkOptions {
  [key: string]: unknown
  hasReact?: boolean
  hasSolid?: boolean
  hasSvelte?: boolean
  hasVue?: boolean
  runtime?: Runtime
}

export const createDetectedFrameworkFlags = (
  detectedFrameworks: DetectedFrameworkName[] = []
): FrameworkFlags => Object.fromEntries(
  detectedFrameworks.map(framework => [framework, true])
)

export const getBundledFrameworkConfig = (
  frameworkName: FrameworkName,
  options?: FrameworkOptions
): FlatConfigArray => {
  switch (frameworkName) {
    case 'angular':
      return angularConfig

    case 'astro':
      return astro(options)

    case 'expo':
      return expoConfig

    case 'hono':
      return hono(options)

    case 'nest':
      return nestConfig

    case 'next':
      return nextConfig

    case 'qwik':
      return qwik

    case 'react':
      return reactConfig

    case 'remix':
      return remix

    case 'slidev':
      return slidev(options)

    case 'solid':
      return solidConfig

    case 'svelte':
      return svelteConfig

    case 'vite':
      return vite(options)

    case 'vue':
      return vueConfig
  }
}

export {
  angularConfig,
  astro,
  expoConfig,
  hono,
  nestConfig,
  nextConfig,
  qwik,
  reactConfig,
  remix,
  slidev,
  solidConfig,
  svelteConfig,
  vite,
  vueConfig
}

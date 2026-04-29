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
import { solidConfig } from '@santi020k/eslint-config-solid'
import { svelteConfig } from '@santi020k/eslint-config-svelte'
import { vueConfig } from '@santi020k/eslint-config-vue'

export type FrameworkName = DetectedFrameworkName

export interface FrameworkOptions {
  hasReact?: boolean
  hasVue?: boolean
  hasSvelte?: boolean
  hasSolid?: boolean
  runtime?: Runtime
}

export type FrameworkFlags = Partial<Record<FrameworkName, true>>

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
    case 'react':
      return reactConfig

    case 'next':
      return nextConfig

    case 'astro':
      return astro(options)

    case 'expo':
      return expoConfig

    case 'vue':
      return vueConfig

    case 'svelte':
      return svelteConfig

    case 'solid':
      return solidConfig

    case 'angular':
      return angularConfig

    case 'nest':
      return nestConfig

    case 'hono':
      return hono(options)

    case 'qwik':
      return qwik

    case 'remix':
      return remix
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
  solidConfig,
  svelteConfig,
  vueConfig
}

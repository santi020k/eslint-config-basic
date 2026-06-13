import {
  type DetectedFrameworkName,
  type FlatConfigArray,
  type Runtime
} from '@santi020k/eslint-config-core'

import { loadModule } from './lazy.js'

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

/**
 * A loaded framework config: either a ready flat-config array or a factory
 * that produces one from framework options.
 */
type FrameworkConfigInput =
  ((options?: FrameworkOptions) => FlatConfigArray) |
  FlatConfigArray

type FrameworkLoader = () => Promise<FrameworkConfigInput>

export const createDetectedFrameworkFlags = (
  detectedFrameworks: DetectedFrameworkName[] = []
): FrameworkFlags => Object.fromEntries(
  detectedFrameworks.map(framework => [framework, true])
)

/**
 * Lazy loaders for every bundled framework package. Framework plugin
 * packages (angular-eslint, vue-eslint-parser, eslint-plugin-svelte, …) are
 * only imported when their framework is actually enabled, keeping config
 * startup cheap for projects that use none or few of them.
 */
const frameworkLoaders = new Map<FrameworkName, FrameworkLoader>([
  ['angular', async () => (await loadModule<{ angularConfig: FlatConfigArray }>('@santi020k/eslint-config-angular')).angularConfig],
  ['astro', async () => (await loadModule<{ default: (options?: FrameworkOptions) => FlatConfigArray }>('@santi020k/eslint-config-astro')).default],
  ['expo', async () => (await loadModule<{ expoConfig: FlatConfigArray }>('@santi020k/eslint-config-expo')).expoConfig],
  ['hono', async () => (await loadModule<{ hono: (options?: FrameworkOptions) => FlatConfigArray }>('@santi020k/eslint-config-hono')).hono],
  ['lit', async () => (await loadModule<{ lit: FlatConfigArray }>('@santi020k/eslint-config-lit')).lit],
  ['nest', async () => (await loadModule<{ nestConfig: FlatConfigArray }>('@santi020k/eslint-config-nest')).nestConfig],
  ['next', async () => (await loadModule<{ nextConfig: FlatConfigArray }>('@santi020k/eslint-config-next')).nextConfig],
  ['nuxt', async () => (await loadModule<{ nuxt: FlatConfigArray }>('@santi020k/eslint-config-nuxt')).nuxt],
  ['preact', async () => (await loadModule<{ preactConfig: FlatConfigArray }>('@santi020k/eslint-config-preact')).preactConfig],
  ['qwik', async () => (await loadModule<{ qwik: FlatConfigArray }>('@santi020k/eslint-config-qwik')).qwik],
  ['react', async () => (await loadModule<{ reactConfig: FlatConfigArray }>('@santi020k/eslint-config-react')).reactConfig],
  ['react-router', async () => (await loadModule<{ reactRouter: FlatConfigArray }>('@santi020k/eslint-config-react-router')).reactRouter],
  ['remix', async () => (await loadModule<{ default: FlatConfigArray }>('@santi020k/eslint-config-remix')).default],
  ['slidev', async () => (await loadModule<{ slidev: (options?: FrameworkOptions) => FlatConfigArray }>('@santi020k/eslint-config-slidev')).slidev],
  ['solid', async () => (await loadModule<{ solidConfig: FlatConfigArray }>('@santi020k/eslint-config-solid')).solidConfig],
  ['svelte', async () => (await loadModule<{ svelteConfig: FlatConfigArray }>('@santi020k/eslint-config-svelte')).svelteConfig],
  ['tanstack-start', async () => (await loadModule<{ tanstackStart: FlatConfigArray }>('@santi020k/eslint-config-tanstack-start')).tanstackStart],
  ['vite', async () => (await loadModule<{ vite: (options?: FrameworkOptions) => FlatConfigArray }>('@santi020k/eslint-config-vite')).vite],
  ['vue', async () => (await loadModule<{ vueConfig: FlatConfigArray }>('@santi020k/eslint-config-vue')).vueConfig]
])

const frameworkConfigCache = new Map<FrameworkName, Promise<FrameworkConfigInput>>()

const loadFrameworkConfigInput = (frameworkName: FrameworkName): Promise<FrameworkConfigInput> => {
  const cached = frameworkConfigCache.get(frameworkName)

  if (cached) return cached

  const loader = frameworkLoaders.get(frameworkName)

  if (!loader) return Promise.resolve([])

  const pending = loader().catch((error: unknown) => {
    throw new Error(
      `Unable to load optional framework config "${frameworkName}". ` +
      `Install "@santi020k/eslint-config-${frameworkName}" when using @santi020k/eslint-config-lite, ` +
      'or remove that framework from your eslintConfig options.',
      { cause: error }
    )
  })

  frameworkConfigCache.set(frameworkName, pending)

  return pending
}

export const getBundledFrameworkConfig = async (
  frameworkName: FrameworkName,
  options?: FrameworkOptions
): Promise<FlatConfigArray> => {
  const input = await loadFrameworkConfigInput(frameworkName)

  return typeof input === 'function' ? input(options) : input
}

const createBundledFramework = (
  frameworkName: FrameworkName
): ((options?: FrameworkOptions) => Promise<FlatConfigArray>) =>
  async (options?: FrameworkOptions): Promise<FlatConfigArray> => getBundledFrameworkConfig(frameworkName, options)

// Public framework factories (v2 naming: bare framework names).
// Each lazily imports its framework package on first call.
export const angular = createBundledFramework('angular')
export const astro = createBundledFramework('astro')
export const expo = createBundledFramework('expo')
export const hono = createBundledFramework('hono')
export const lit = createBundledFramework('lit')
export const nest = createBundledFramework('nest')
export const next = createBundledFramework('next')
export const nuxt = createBundledFramework('nuxt')
export const preact = createBundledFramework('preact')
export const qwik = createBundledFramework('qwik')
export const react = createBundledFramework('react')
export const reactRouter = createBundledFramework('react-router')
export const slidev = createBundledFramework('slidev')
export const solid = createBundledFramework('solid')
export const svelte = createBundledFramework('svelte')
export const tanstackStart = createBundledFramework('tanstack-start')
export const vite = createBundledFramework('vite')
export const vue = createBundledFramework('vue')

/**
 * @deprecated Remix merged into React Router v7. Use `reactRouter` (the
 * `react-router` framework key) instead. This alias loads the legacy Remix
 * config and will be removed in the next major version.
 */
export const remix = createBundledFramework('remix')

/** @deprecated Use `angular` instead. */
export const angularConfig = angular

/** @deprecated Use `expo` instead. */
export const expoConfig = expo

/** @deprecated Use `nest` instead. */
export const nestConfig = nest

/** @deprecated Use `next` instead. */
export const nextConfig = next

/** @deprecated Use `preact` instead. */
export const preactConfig = preact

/** @deprecated Use `react` instead. */
export const reactConfig = react

/** @deprecated Use `solid` instead. */
export const solidConfig = solid

/** @deprecated Use `svelte` instead. */
export const svelteConfig = svelte

/** @deprecated Use `vue` instead. */
export const vueConfig = vue

import { GLOB_JS_TS } from '@santi020k/eslint-config-core'
import pluginTanstackQuery from '@tanstack/eslint-plugin-query'
import pluginTanstackRouter from '@tanstack/eslint-plugin-router'
import type { TSESLint } from '@typescript-eslint/utils'

type PluginWithConfigs = TSESLint.FlatConfig.Plugins[string] & {
  configs: Record<string, TSESLint.FlatConfig.Config & { rules?: TSESLint.FlatConfig.Rules }>
}

const routerPlugin = pluginTanstackRouter as unknown as PluginWithConfigs
const queryPlugin = pluginTanstackQuery as unknown as PluginWithConfigs

/**
 * TanStack Start ESLint configuration
 * Bundles TanStack Router and TanStack Query rules for TanStack Start apps
 * (React or Solid). Pair it with the React or Solid framework config —
 * auto-detection enables the right one for you.
 */
export const tanstackStart: TSESLint.FlatConfig.ConfigArray = [
  {
    files: GLOB_JS_TS,
    name: 'eslint-config-tanstack-start/router',
    plugins: {
      '@tanstack/router': routerPlugin
    },
    rules: {
      ...routerPlugin.configs.recommended.rules
    }
  },
  {
    files: GLOB_JS_TS,
    name: 'eslint-config-tanstack-start/query',
    plugins: {
      '@tanstack/query': queryPlugin
    },
    rules: {
      ...queryPlugin.configs.recommended.rules
    }
  }
]

export default tanstackStart

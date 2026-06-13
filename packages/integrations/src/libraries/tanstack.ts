import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

/**
 * TanStack Query ESLint configuration
 */
export const tanstackQuery: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('tanstack-query', async () => {
  const pluginQuery = await loadDefault<PluginWithConfigs<'recommended'>>('@tanstack/eslint-plugin-query')

  return [
    {
      files: GLOB_JS_TS_ALL,
      name: 'eslint-config-integrations/tanstack-query',
      plugins: {
        '@tanstack/query': pluginQuery
      },
      rules: {
        ...pluginQuery.configs.recommended.rules
      }
    }
  ]
})

/**
 * TanStack Router ESLint configuration
 */
export const tanstackRouter: () => Promise<TSESLint.FlatConfig.ConfigArray> = defineLazyConfig('tanstack-router', async () => {
  const pluginRouter = await loadDefault<PluginWithConfigs<'recommended'>>('@tanstack/eslint-plugin-router')

  return [
    {
      files: GLOB_JS_TS_ALL,
      name: 'eslint-config-integrations/tanstack-router',
      plugins: {
        '@tanstack/router': pluginRouter
      },
      rules: {
        ...pluginRouter.configs.recommended.rules
      }
    }
  ]
})

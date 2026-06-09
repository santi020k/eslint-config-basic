import { defineLazyConfig, loadDefault, type PluginWithConfigs } from '../lazy.js'

import { GLOB_JS_TS_ALL } from '@santi020k/eslint-config-core'
import type { TSESLint } from '@typescript-eslint/utils'

/**
 * TanStack Query ESLint configuration
 */
export const tanstackQuery: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('tanstack-query', () => {
  const pluginQuery = loadDefault<PluginWithConfigs<'recommended'>>('@tanstack/eslint-plugin-query')

  return [
    {
      name: 'eslint-config-integrations/tanstack-query',
      files: GLOB_JS_TS_ALL,
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
export const tanstackRouter: TSESLint.FlatConfig.ConfigArray = defineLazyConfig('tanstack-router', () => {
  const pluginRouter = loadDefault<PluginWithConfigs<'recommended'>>('@tanstack/eslint-plugin-router')

  return [
    {
      name: 'eslint-config-integrations/tanstack-router',
      files: GLOB_JS_TS_ALL,
      plugins: {
        '@tanstack/router': pluginRouter
      },
      rules: {
        ...pluginRouter.configs.recommended.rules
      }
    }
  ]
})
